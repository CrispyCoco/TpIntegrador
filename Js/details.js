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
        })
        .catch(function(error){
            console.log('el error fue: '+ error);
        })
    }else if (queryStringObj.has('artistaId')){
        var id = queryStringObj.get('artistId');
        fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/' + id)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
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
        })
        .catch(function(error){
            console.log('el error fue: '+ error);
        })
    }else if (queryStringObj.has('genreId')){
        var id = queryStringObj.get('genreId');
        fetch('https://cors-anywhere.herokuapp.com/http//api.deezer.com/genre/' + id)
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
