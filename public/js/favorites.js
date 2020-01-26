function getFavoritesMatches(){
    var htmlMatches ='';
    var matchesDetail = '';
    var numMatches = 0;

    var matchesDb = dbPromised.then(function(db){
        var tx = db.transaction('matchesSaved', 'readonly');
        var store = tx.objectStore('matchesSaved');
        return store.getAll();
    });

    matchesDb.then(function(data){
        console.log(data);
        data.forEach(function(matchesFav){
            matchesDetail +=`
            <tr>
            <td>${numMatches+=1}</td>
            <td>${matchesFav.awayTeam.name}</td>
            <td>${matchesFav.homeTeam.name}</td>
            <td>${matchesFav.stage}</td>
            <td>${dmy(new Date(matchesFav.utcDate))}</td>
            <td>
            <div><a class="waves-effect waves-light" onclick="deleteWatchLater(${matchesFav.id})">
            <img src="/img/save-red.png" class="max-width: 100%; height: auto;"></a></div>
            </td>
            </tr>
            `;
        })

        htmlMatches +=`
        <div class="col s12 m12">
        <div class="card">
        <div class="card-content">
        <h3 class="center">Watch Later List</h3>
        <table class = "responsive-table striped black-text light-blue darken-4">
        <thead>
          <tr>
            <th>No</th>
            <th>Away</th>
            <th>Home</th>
            <th>Stage</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>

        <tbody>`+matchesDetail+`</tbody>
        </table>
        </div>
        </div>
        </div>
        `;
        
        document.getElementById("body-content").innerHTML = htmlMatches;
    });
    
}
function dmy(date) {
    return `${date.getDate()}-${date.getMonth()+ 1}-${date.getFullYear()}`;
}