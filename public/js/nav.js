document.addEventListener("DOMContentLoaded", function(){
    var elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
    loadNav();
    function loadNav(){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
            if(this.readyState == 4){
                if(this.status != 200)
                return;

                //untuk memuat daftar tautan menu
                document.querySelectorAll(".topnav, .sidenav").forEach(function(elm){
                    elm.innerHTML = xhttp.responseText;
                });

                //Daftarkan event listener untuk setiap tautan menu
                document.querySelectorAll(".topnav a, .sidenav a").forEach(function(elm){
                    elm.addEventListener("click", function(event){
                        // tutup sidenav
                        var sidenav = document.querySelector(".sidenav");
                        M.Sidenav.getInstance(sidenav).close();

                        //Muat konten halaman yang dipanggil
                        page = event.target.getAttribute("href").substr(1);
                        loadPage(page);
                    });
                });
            }
        };
        xhttp.open("GET", "nav.html", true);
        xhttp.send();
    }
    // Load Page content
    var page = window.location.hash.substr(1);
    if(page == "") page = "matches";
    loadPage(page);

    function loadPage(page){
       var xhttp = new XMLHttpRequest();
       xhttp.onreadystatechange = function(){
            if (this.readyState == 4){
               var content = document.querySelector("#body-content");

                if(page == "matches"){
                    getMatches();
                }
                else if(page == "teams"){
                    getTeams();
                }
                else if(page == "favorite"){
                    getFavoritesMatches();
                }
            }
        };
        xhttp.open("GET", "pages/" + page + ".html", true);
        xhttp.send();
    }
});