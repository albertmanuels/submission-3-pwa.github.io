const CACHE_NAME = "football-v1";
var urlsToCache=[
    "/",
    "/index.html",
    "/nav.html",
    "/manifest.json",
    "./pages/matches.html",
    "./pages/teams.html",
    "./pages/favorite.html",
    "./js/matches.js",
    "./js/teams.js",
    "./js/idb.js",
    "./js/db.js",    
    "./js/nav.js",
    "/push.js",
    "./js/favorites.js",
    "./js/materialize.js",
    "./js/materialize.min.js",
    "./css/materialize.css",
    "./css/materialize.min.css",
    "./img/icon-192x192.png",
    "./img/icon-512x512.png"
];
// Untuk menginstall SW
self.addEventListener("install", function(event){
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache){
            return cache.addAll(urlsToCache);
        })
    );
});

// Untuk melakukan fetch SW
self.addEventListener("fetch", function(event){
    if(event.request.url.includes("football-data.org")){
        event.respondWith(async function(){
            const cache = await caches.open(CACHE_NAME);
            const cachedResponse = await cache.match(event.request);
            if(cachedResponse) return cachedResponse;
            const networkResponse = await fetch(event.request);
            event.waitUntil(
                cache.put(event.request, networkResponse.clone())
            );
            return networkResponse;
        }());
    }
    else{
        event.respondWith(
            caches.match(event.request).then(function(response){
                return response || fetch(event.request);
            })
        )
    }
});

// Mengaktifkan sw
self.addEventListener("activate", function(event){
    event.waitUntil(
        caches.keys().then(function(cacheName){
            return Promise.all(
                cacheName.map(function(cacheName){
                    if(cacheName != CACHE_NAME && cacheName.startsWith("football")){
                        console.log("ServiceWorker: cache " + cacheName + " telah dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});


// Untuk notifikasi
self.addEventListener('push', function(event){
    var body;
    if(event.data){
        body = event.data.text();
    }
    else{
        body = 'Push message no payload';
    }

    var options = {
        body: body,
        icon: './img/icon-512x512.png',
        vibrate: [100,50,100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});

