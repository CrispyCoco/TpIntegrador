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
                        <a href="artists.html" class="artist">${info.artist.name}</a>
                        <p class="sideBar">/</p>
                        <a href="album.html" class="album">${info.album.title}</a>
                    </div>
                    
                    <div class="button">
                        <a href="sequel.html" class="add">Add to playlist</a>
                    </div>
                    <div class="duration"><h5>${info.duration}</h5></div>
                </div>
            </div>`
            track.innerHTML+=toAdd;
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
                        <div class="musica">
                            <h5>Top Tracks</h5>
                            <ol>
                            <li><a href="track.html">Circles</a></li>
                            <li><a href="track.html">Rockstar</a></li>
                            <li><a href="track.html">Sunflower</a></li>
                            <li><a href="track.html">Wow.</a></li>
                            <li><a href="track.html">Goodbyes</a></li>
                            <li id="last"><a href="track.html">Saint-Tropez</a></li>
                            </ol>
                        </div>
                    </div>
                 </div>`;
            artist.innerHTML+=toAdd;
            
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
                        <h5>${info.release_date}- 18 canciones, 1h 4min</h5>
                    </div>
                </div>
            </div>
            <div class="music">
                    <h5>Tracks</h5>
                    <div class="track"><a href="track.html">Paranoid</a></div>
                    <div class="track"><a href="track.html">Spoil my night</a></div>
                    <div class="track"><a href="track.html">Rich & Sad</a></div>
                    <div class="track"><a href="track.html">Zack and Codeine</a></div>
                    <div class="track"><a href="track.html">Takin' Shots</a></div>
                    <div class="track"><a href="track.html">Rockstar</a></div>
                    <div class="track"><a href="track.html">Over Now</a></div>
                    <div class="track"><a href="track.html">Psycho</a></div>
            </div>`
            album.innerHTML+=toAdd;
        })
        .catch(function(error){
            console.log('el error fue: '+ error);
        })

        // PAGINA DE GENRE
    }else if (queryStringObj.has('genreId')){
        var id = queryStringObj.get('genreId');
        fetch('https://cors-anywhere.herokuapp.com/http//api.deezer.com/genre/' + id)
        .then(function(response){
            return response.json();
        })
        .then(function(info){
            console.log(info);
            var genre = document.querySelector(".container-genre");
            genre.style.display = "flex";
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
