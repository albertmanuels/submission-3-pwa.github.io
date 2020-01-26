importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
 
if (workbox){
    workbox.precaching.precacheAndRoute([
        {url: '/', revision: '1'},
        {url: '/index.html', revision: '1'},
        {url: '/nav.html', revision: '1'},
        {url: '/push.js', revision: '1'},
        {url: '/css/materialize.min.css', revision: '1'},
        {url: '/js/materialize.min.js', revision: '1'},
        {url: '/js/db.js', revision: '1'},
        {url: '/js/favorite.js', revision: '1'},
        {url: '/js/idb.js', revision: '1'},
        {url: '/js/matches.js', revision: '1'},
        {url: '/js/nav.js', revision: '1'},
        {url: '/js/teams.js', revision: '1'},
        {url: '/pages/favorite.html', revision: '1'},
        {url: '/pages/matches.html', revision: '1'},
        {url: '/pages/teams.html', revision: '1'},
        {url: '/manifest.json', revision: '1'},
        {url: '/img/empty_badge.svg', revision: '1'},
        {url: '/img/icon-72x72.png', revision: '1'},
        {url: '/img/icon-96x96.png', revision: '1'},
        {url: '/img/icon-128x128.png', revision: '1'},
        {url: '/img/icon-144x144.png', revision: '1'},
        {url: '/img/icon-152x152.png', revision: '1'},
        {url: '/img/icon-192x192.png', revision: '1'},
        {url: '/img/icon-384x384.png', revision: '1'},
        {url: '/img/icon-512x512.png', revision: '1'},
        {url: '/img/menu.png', revision: '1'},
        {url: '/img/no_image.png', revision: '1'},
        {url: '/img/save-black.png', revision: '1'},
        {url: '/img/save-red.png', revision: '1'},
        {url: 'https://fonts.googleapis.com/icon?family=Material+Icons', revision: '1'},    
    ]);
    
    workbox.routing.registerRoute(
        new RegExp('/pages/'),
          workbox.strategies.staleWhileRevalidate({
              cacheName: 'pages'
          }),
    );


    // Menyimpan Cache image selama 30 hari
    workbox.routing.registerRoute(
        /\.(?:png|gif|jpg|jpeg|webp|svg)$/,
        new workbox.strategies.CacheFirst({
          cacheName: 'images',
          plugins: [
            new workbox.expiration.Plugin({
              maxEntries: 60,
              maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
            }),
          ],
        })
      );
    
    // menyimpan cache dari api football
    workbox.routing.registerRoute(
        new RegExp("https://api.football-data.org/v2/"),
        new workbox.strategies.NetworkFirst({
            networkTimeoutSeconds: 7,
            cacheName: 'workbox-runtime',
            plugin: [
                new workbox.expiration.Plugin({
                    maxEntries: 30,
                    maxAgeSeconds: 30 * 24 * 60 * 60 // Durasi 30 hari
                }),
            ],
        })
    );
    
    // Menyimpan cache Google Font
    workbox.routing.registerRoute(
        /^https:\/\/fonts\.googleapis\.com/,
        workbox.strategies.staleWhileRevalidate()
    );

    workbox.routing.registerRoute(
        /^https:\/\/fonts\.gstatic\.com/,
        new workbox.strategies.CacheFirst({
          cacheName: 'google-fonts-webfonts',
          plugins: [
            new workbox.cacheableResponse.Plugin({
              statuses: [0, 200],
            }),
            new workbox.expiration.Plugin({
              maxAgeSeconds: 60 * 60 * 24 * 365,
              maxEntries: 30,
            }),
          ],
        })
      );


      workbox.routing.registerRoute(
        /.*(?:googleapis|gstatic)\.com/,
        new workbox.strategies.StaleWhileRevalidate(),
      );
    
      workbox.routing.registerRoute(
        /\.(?:js|css)$/,
        new workbox.strategies.StaleWhileRevalidate({
          cacheName: 'static-resources',
        })
      );
  console.log(`Workbox berhasil dimuat`);
}
else{
    console.log(`Workbox gagal dimuat`);
}



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

