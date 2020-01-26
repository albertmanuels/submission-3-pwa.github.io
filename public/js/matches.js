var KEY = '50346ab082d444c6a486631e14971028'
var api_url = "https://api.football-data.org/v2/"
var ID = 2001;
var matchesUrl = `${api_url}competitions/${ID}/matches?status=SCHEDULED`;

// Variabel Global
var dataMatch;

//Blok yang akan dipanggil jika fetch berhasil
function status(response) {
    if (response.status !== 200) {
        console.log("Error:" + response.status);

        //Method Reject() akan membuat blok catch terpanggil
        return Promise.reject(new Error(response.statusText));
    } else {
        //Mengubah suatu objek menjadi promise agar bisa di-then-kan
        return Promise.resolve(response);
    }
}

//Block code untuk memparsing json menjadi array js
function json(response) {
    return response.json();
}

// Blok kode untuk meng-handle kesalahan di block catch
function error(error) {
    console.log("Error:" + error);
}

// Blok  kode untuk melakukan request data json
function getMatches(){
    if('caches' in window){
      caches.match(matchesUrl)
      .then(function(response){
        if(response){
          response.json().then(function(data){
            console.log(data);
            dataMatch = data;
  
            var matchesHTML = '';
            var num = 0;
            var detailMatches = '';
  
            data.matches.forEach(function( matches){
              detailMatches += `
                <tr>
                  <td>${num+=1}</td>
                  <td>${matches.awayTeam.name}</td>
                  <td>${matches.homeTeam.name}</td>
                  <td>${matches.stage}</td>
                  <td>${dmy(new Date(matches.utcDate))}</td>
                  <td>
                  <div><a class="waves-effect waves-light" id="save" onClick="watchLater(${matches.id})">
                  <img src="/img/save-black.png" class="max-width: 100%; height: auto;"></a></div>
                  </td>
                </tr>
              `;
            })
  
            matchesHTML += `
              <div class="col s12 m12">
              <div class="card">
              <div class="card-content">
              <h3 class="center">Upcoming Matches</h3>
              <table class = "responsive-table striped white-text light-blue darken-4">
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
  
              <tbody>` + detailMatches + `</tbody>
              </table>
              </div>
              </div>
              </div>
              `;
  
              document.getElementById("body-content").innerHTML = matchesHTML;
          })
        }
      })
    }

    // reloadPage();
    fetch(matchesUrl, {
      method: 'GET',
      headers:{
        'X-Auth-Token':KEY
      }
    })
    .then(status)
    .then(json)
    .then(function(data){
      dataMatch = data;
      console.log(data);
  
      var matchesHTML = '';
      var detailMatches = '';
      var num = 0;
  
      data.matches.forEach(function(matches){
        detailMatches += `
          <tr>
            <td>${num+=1}</td>
            <td>${matches.awayTeam.name}</td>
            <td>${matches.homeTeam.name}</td>
            <td>${matches.stage}</td>
            <td>${dmy(new Date(matches.utcDate))}</td>
            <td>
            <div><a class="waves-effect waves-light" onclick="watchLater(${matches.id})">
            <img src="/img/save-black.png" class="max-width: 100%; height: auto;"></a></div>
            </td>
          </tr>
        `;
      })
  
      matchesHTML += `
        <div class="col s12 m12">
        <div class="card">
        <div class="card-content">
        <h3 class="center">Upcoming Matches</h3>
        <table class = "responsive-table striped white-text light-blue darken-4">
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
  
        <tbody>` + detailMatches + `</tbody>
        </table>
        </div>
        </div>
        </div>
        `;
  
        document.getElementById("body-content").innerHTML = matchesHTML;
    })
    .catch(error);
  }

  // Fungsi keterangan tanggal
function dmy(date) {
    return `${date.getDate()}-${date.getMonth()+ 1}-${date.getFullYear()}`;
}

// function reloadPage(){
//   document.getElementById("body-content").innerHTML = `
//   <div class="center">
//   <h4>Upcoming Matches<i class=" medium material-icons">query_builder</i></h4></div>
//   <div class="progress">
//   <div class="indeterminate blue"></div>
//   </div>
//   `
// }
