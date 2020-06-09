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
            artist.innerHTML = 
            // '<img alt="'+ name +'" src="'+ image +'">';
            
                `<div class="artist">
                    <div class="imgContainer">
                        <img src="${image}" alt="">
                    </div>
                    <div class="info">
                        <div class="headline">
                            <h3>${name}</h3>
                            <h4>Populares</h4>
                        </div>
                        <div class="musica">
                            <h5>Top Tracks</h5>
                            <ul>
                                <li><a href="track.html">Circles</a></li>
                                <li><a href="track.html">Rockstar</a></li>
                                <li><a href="track.html">Sunflower</a></li>
                                <li><a href="track.html">Wow.</a></li>
                                <li><a href="track.html">Goodbyes</a></li>
                                <li><a href="track.html">Saint-Tropez</a></li>
                            </ul>
                        </div>
                    </div>
                
                 </div>`
            
            
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
