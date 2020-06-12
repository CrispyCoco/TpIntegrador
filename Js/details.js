window.onload = function(){

    var queryString = location.search;
    var queryStringObj = new URLSearchParams(queryString);
    
    // PAGINA DE TRACK
    if (queryStringObj.has('trackId')){
        var id = queryStringObj.get('trackId');
        fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/track/' + id )
        .then(function(response){
            return response.json();
        })
        .then(function(info){
            console.log(info);
            // QUERYSELECTOR DE LA CLASE QUE QUIERA MOSTRAR(TRACK)
            var track = document.querySelector(".container-track");
            track.style.display = "flex";
            toAdd=
            `<div class="track">
                <div class="imgContainer">
                    <div class="overImage">
                        
                    </div>
                    <img src="${info.album.cover_big}" alt="" class="imagen">
                </div>
        
                <div class="info">
                    <h3 class="title">${info.title}</h3>
                    <div class="moreInfo">
                        <a href="details.html?artistId=${info.artist.id}" class="artist">${info.artist.name}</a>
                        <p class="sideBar">/</p>
                        <a href="details.html?albumId=${info.album.id}" class="album">${info.album.title}</a>
                    </div>
                    
                    <div class="button">
                        <a href="playlist.html" class="add">Add to playlist</a>
                    </div>
                    <div class="duration"><h5>${info.duration}</h5></div>
                </div>
            </div>`
            track.innerHTML+=toAdd;
            //ENVIAR INFO AL LOCAL STORAGE
            let agregarCancion = document.querySelector(".button")
            let playlist = [info]

            agregarCancion.addEventListener("click",function(){
                if (window.localStorage.getItem("playlist")=== null) {
                    window.localStorage.setItem("playlist", JSON.stringify(playlist))
                }else {
                   let cancionObjeto=JSON.parse(window.localStorage.getItem("playlist"))
                    cancionObjeto.push(info) 
                    window.localStorage.setItem("playlist", JSON.stringify(cancionObjeto))
                    console.log (cancionObjeto)






                }

            })












        })



        .catch(function(error){
            console.log('el error fue: '+ error);
        })

        // PAGINA DE ARTIST
    }else if (queryStringObj.has('artistId')){
        var id = queryStringObj.get('artistId');
        fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/' + id)
        .then(function(response){
            return response.json();
        })
        .then(function(info){
            console.log(info);
            var artist = document.querySelector(".container-artist");
            artist.style.display = "flex";
            let image = info.picture_big;
            let name = info.name;
            let fans = info.nb_fan;
            toAdd = 
                `<div class="artist">
                    <div class="imgContainer">
                        <img src="${image}" alt="">
                    </div>
                    <div class="info">
                        <div class="headline">
                            <h3>${name}</h3>
                            <h4>${fans} Fans</h4>
                        </div>
                        <div class="music">
                            <h5>Top Tracks</h5>
                            <ol>
                            </ol>
                        </div>
                    </div>
                 </div>`;
            artist.innerHTML+=toAdd;
            
            fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/'+ id +'/top')
            .then(function(response){
                return response.json();
            })
            .then(function(info){
                console.log(info.data);
                var musicol = document.querySelector(".music ol");
                let artistArray=info.data
                var divColumna=''

                for (let i = 0; i < artistArray.length; i++) {
                    const element = info.data[i];

                    divColumna+='<li><a href="details.html?trackId=' + artistArray[i].id + '"' + ' class="music"> ' + artistArray[i].title +'</a></li>';
                
                }
                musicol.innerHTML=divColumna;   
            })
            .catch(function(error){
                console.log('el error fue: '+ error);
            })
            
            
        })
        .catch(function(error){
            console.log('el error fue: '+ error);
        })

        // PAGINA DE ALBUM
    } else if (queryStringObj.has('albumId')){
        var id = queryStringObj.get('albumId');
        fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/album/' + id)
        .then(function(response){
            return response.json();
        })
        .then(function(info){
            console.log(info);
            var album= document.querySelector(".container-album");
            album.style.display = "flex";
            toAdd=
            `<div class="album">
                <div class="imgContainer">
                    <img src="${info.cover_big}" alt="">
                </div>
                <div class="info">
                    <h3>${info.title}</h3>
                    <div class="moreInfo">
                        <a href="sequel.html" class="artist">${info.artist.name}</a>
                        <h5>${info.release_date}- ${info.duration}</h5>
                    </div>
                </div>
            </div>
            <div class="music">
                    <h5>Tracks</h5>
                    
            </div>`
            album.innerHTML+=toAdd;

            fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/album/'+ id +'/tracks')
            .then(function(response){
                return response.json();
            })
            .then(function(info){
                console.log(info);
                var lista = document.querySelector('.music');
                let albumArray=info.data
                var divColumna=''

                for (let i = 0; i < 8; i++) {
                    const element = info.data[i];

                    divColumna+= 
                    '<div class="track"><a href="details.html?trackId='+ albumArray[i].id +'">'+ albumArray[i].title +'</a></div>';
                    
                }
            lista.innerHTML=divColumna;    
            })

            .catch(function(error){
                console.log('el error fue: '+ error);
            })

        })
        .catch(function(error){
            console.log('el error fue: '+ error);
        })

        // PAGINA DE GENRE
    }else if (queryStringObj.has('genreId')){
        var id = queryStringObj.get('genreId');
        fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/genre/' + id)
        .then(function(response){
            return response.json();
        })
        .then(function(info){
            console.log(info);
            var genre = document.querySelector(".container-genre");
            genre.style.display = "flex";
            toAdd=
            `<div class="genre">
                <div class="imgContainer">
                    <img src="${info.picture_big}" alt="">
                </div>
                <div class="info">
                    <h3>${info.name}</h3>
                    <div class="slider">
                        <h4>Top artists</h4>
                        <div class="uk-position-relative uk-visible-toggle uk-light slider-content" tabindex="-1" uk-slider>
                            <ul class="uk-slider-items uk-child-width-1-2 uk-child-width-1-3@m uk-grid">
                                <li>
                                    <div class="uk-panel">
                                    
                                    </div>
                                </li>
                                
                            </ul>
                            <a class="uk-position-center-left uk-position-small uk-hidden-hover" href="#" uk-slidenav-previous uk-slider-item="previous"></a>
                            <a class="uk-position-center-right uk-position-small uk-hidden-hover" href="#" uk-slidenav-next uk-slider-item="next"></a>
                        </div>
                    </div>
                </div>
            </div>`
            genre.innerHTML+=toAdd;

            fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/genre/' + id + '/artists')
            .then(function(response){
                return response.json();
            })
            .then(function(info){
                console.log(info.data);
                var lista = document.querySelector('.slider ul');
                let artistArray=info.data
                var divColumna=''

                for (let i = 0; i < 10; i++) {
                    const element = info.data[i];

                    divColumna += 
                    '<li>' +
                    '<img src="' + artistArray[i].picture_small +'" alt="">' +
                    '</li>';
                     
                }
                lista.innerHTML=divColumna;
            })
            .catch(function(error){
                console.log('el error fue: '+ error);
            })

        })
        .catch(function(error){
            console.log('el error fue: '+ error);
        })
    }
    





}      
    










// var artist = document.querySelector(".container-artist");
        // var album = document.querySelector(".container-album");
        // var genre = document.querySelector(".container-genre");
        // var track = document.querySelector(".container-track");

       
        // if (visualizar == "artist") {
        //     artist.style.display = "flex";
        // } else if (visualizar == 'album') {
        //     album.style.display = 'flex';
        // } else if (visualizar == 'genre') {
        //     genre.style.display = 'flex';
        // } else if (visualizar == 'track') {
        //     track.style.display = 'flex';
        // }
