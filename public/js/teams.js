var KEY = '50346ab082d444c6a486631e14971028'
var api_url = "https://api.football-data.org/v2/"
var ID = 2001;
var teamsUrl = `${api_url}competitions/${ID}/teams`;

// Variabel Global
var dataTeams;

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

function getTeams() {
    if ('caches' in window) {
        caches.match(teamsUrl)
            .then(function (response) {
                if (response) {
                    response.json().then(function (data) {
                        console.log(data);

                        dataTeam = data;
                        console.log(data);

                        var detailTeams = '';
                        var number = 0;
                        var TeamsHTML = '';

                        data.teams.forEach(function (teams) {
                            // blok untuk menampilkan no_image.png saat url logo === null dan mengubah url logo dari http menjadi https
                            if(teams.crestUrl === null){
                                var logo = '/img/no_image.png';
                            }
                            else{
                                logo = teams.crestUrl.replace(/^http:\/\//i, 'https://');
                            }
                            detailTeams += `
                        <tr>
                        <td>${number+=1}</td>
                        <td><img width="20px;" height="20px;" class="responsive-img" src="${logo}"/></td>
                        <td>${teams.name}</td>
                        <td>${teams.founded}</td>
                        <td>${teams.venue}</td>
                        <td><a href="${teams.website}" class="white-text">
                        <img src="/img/search.png" max-width:100%; height:auto;></a></td>
                        </td>
                        </tr>`;
                        })

                        TeamsHTML += `
                    <div class="col s12 m12 offset-m3">
                    <div class="card large">
                    <div class="card-content">
                    <h2 class="center">Teams</h2>
                    <table class="responsive-table striped white-text light-blue darken-4">
                    <thead>
                    <tr>
                    <th>No.</th>
                    <th>Logo</th>
                    <th>Team Name</th>
                    <th>Founded</th>
                    <th>Venue</th>
                    <th>Website</th>
                    </tr>
                    </thead>
                    <tbody>` + detailTeams + `</tbody>
                    </table>
                    </div>
                    </div>
                    </div>`;
                        document.getElementById("body-content").innerHTML = TeamsHTML;
                    })
                }
            })
    }
    // reloadPageTeams();
    fetch(teamsUrl, {
        method: 'GET',
            headers: {
                'X-Auth-Token': KEY
            }
        })
        .then(status)
        .then(json)
        .then(function (data) {
            dataTeam = data;
            console.log(data);

            var detailTeams = '';
            var number = 0;
            var TeamsHTML = '';

            data.teams.forEach(function (teams) {
                if(teams.crestUrl === null){
                    var logo = '/img/no_image.png';
                }
                else{
                    logo = teams.crestUrl.replace(/^http:\/\//i, 'https://');
                }
                detailTeams += `
        <tr>
        <td>${number+=1}</td>
        <td><img width="20px;" height="20px;" class="responsive-img" src="${logo}"/></td>
        <td>${teams.name}</td>
        <td>${teams.founded}</td>
        <td>${teams.venue}</td>
        <td><a href="${teams.website}" class="white-text">
        <img src="/img/search.png" max-width:100%; height:auto;></a></td></a></td>
        </td>
        </tr>`;
            })

            TeamsHTML += `
    <div class="col s12 m12 offset-m3">
    <div class="card">
    <div class="card-content">
    <h2 class="center">Teams</h2>
    <table class="responsive-table striped white-text light-blue darken-4">
    <thead>
    <tr>
    <th>No.</th>
    <th>Logo</th>
    <th>Team Name</th>
    <th>Founded</th>
    <th>Venue</th>
    <th>Website</th>
    </tr>
    </thead>
    <tbody>` + detailTeams + `</tbody>
    </table>
    </div>
    </div>
    </div>`;
            document.getElementById("body-content").innerHTML = TeamsHTML;
        })
        .catch(error);
}

// function reloadPageTeams(){
//     document.getElementById("body-content").innerHTML = `
//     <div class="center">
//     <h4>Teams<i class="medium material-icons">pan_tool</i></h4>
//     <div class="progress">
//     <div class="indeterminate blue"></div>
//     </div>
//     </div>`;
// }