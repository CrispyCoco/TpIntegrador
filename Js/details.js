window.onload = function(){

    var queryString = location.search;
    var queryStringObj = new URLSearchParams(queryString);
    if (queryStringObj.has('trackId')){
        var id = queryStringObj.get('trackId');
        fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/track/' + id )
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
            // QUERYSELECTOR DE LA CLASE QUE QUIERA MOSTRAR(TRACK)
            var track = document.querySelector(".container-track");
            track.style.display = "flex";
        })
        .catch(function(error){
            console.log('el error fue: '+ error);
        })
    }else if (queryStringObj.has('artistId')){
        var id = queryStringObj.get('artistId');
        fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/' + id)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
            var artist = document.querySelector(".container-artist");
            artist.style.display = "flex";
        })
        .catch(function(error){
            console.log('el error fue: '+ error);
        })
    } else if (queryStringObj.has('albumId')){
        var id = queryStringObj.get('albumId');
        fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/album/' + id)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
            var album= document.querySelector(".container-album");
            album.style.display = "flex";
        })
        .catch(function(error){
            console.log('el error fue: '+ error);
        })
    }else if (queryStringObj.has('genreId')){
        var id = queryStringObj.get('genreId');
        fetch('https://cors-anywhere.herokuapp.com/http//api.deezer.com/genre/' + id)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
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
