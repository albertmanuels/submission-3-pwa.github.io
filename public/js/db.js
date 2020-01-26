// Blok untuk membuat database
var dbPromised = idb.open("footballDb", 1, function(upgradeDb){
    var matchesObjectStore = upgradeDb.createObjectStore("matchesSaved", {
        keyPath: 'id', autoIncerement: true
    });
    matchesObjectStore.createIndex("post_title", "post_title", {
        unique: false
    });
});

// Blok untuk fungsi simpan matches ke favorite
function watchLater(matchesData){

    var matchesFav = dataMatch.matches.filter(el => el.id == matchesData)[0];

    dbPromised.then(function(db){
        var tx = db.transaction('matchesSaved', 'readwrite');
        var store = {
            id:matchesFav.id,
            away:matchesFav.awayTeam.name,
            home:matchesFav.homeTeam.name,
            stage:matchesFav.stage,
        };
        tx.objectStore('matchesSaved').put(matchesFav);
        matchesFav.createdAt = new Date().getTime();
        return tx.complete;
    })
    .then(function(){
        console.log('Matches berhasil disimpan ke Watch Later');
        M.toast({html: "Match berhasil disimpan!"});
    })
    .catch(function(err){
        console.error('Matches gagal disimpan!', err);
    });
}

// Blok untuk funsi menghapus matches dari favorite
function deleteWatchLater(matchesData){
    var cfrm = confirm("Ingin menghapus matches dari watch later?");
    if(cfrm==true){
        dbPromised.then(function(db){
            var tx = db.transaction('matchesSaved', 'readwrite');
            var store = tx.objectStore('matchesSaved');
            store.delete(matchesData);
            return tx.complete;
        })
        .then(function(){
            M.toast({html:'Matches telah dihapus dari watch later!'});
            console.log('Matches berhasil dihapus')
            getFavoritesMatches();
        })
        .catch(function(err){
            console.error(err);
        })
    }
}

// Blok untuk mengambil seluruh data dari IndexedDB
function getAll(){
    return new Promise(function(resolve, reject){
        dbPromised
        .then(function(db){
            var tx = db.transaction('matchesSaved', 'readonly');
            var store = tx.objectStore('matchesSaved');
            return store.getAll();
        })
        .then(function(matchesSaved){
            resolve(matchesSaved);
        });
    });
}

// Blok untuk mengambil satu data dari indexedDB berdasarkan ID
function getById(id){
    return new Promise(function(resolve, reject){
        dbPromised
        .then(function(db){
            var tx = db.transaction('matchesSaved', 'readonly');
            var store = tx.objectStore('matchesSaved');
            return store.get(id);
        })
        .then(function(matchesFav){
            resolve(matchesFav);
        });
    });
}