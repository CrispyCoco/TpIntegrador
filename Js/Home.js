window.onload = function(){
    fetch(' https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart/0')
    
    .then(function(response){
	    return response.json();
    })
    
    .then(function(info){
        console.log(info);
        
        var listTrack = document.querySelector('.list-track');
        var listArtist = document.querySelector('.list-artist');
        for (let i = 0; i < info.tracks.data.length; i++) {
            var element = info.tracks.data[i];
            var toAdd = '<div class="trackBox">';
            toAdd += '<div><a href="track.html">' + element.title +'</a></div>';
            toAdd += '<div class="extraInfo"><a href="artists.html">' + element.artist.name + '</a></div>';
            toAdd += '<div class="extraInfo"><a href="album.html">' + element.album.title + '</a></div>';
            toAdd += '</div>';
            listTrack.innerHTML += toAdd;
        }

        for (let i = 0; i < info.artists.data.length; i++) {
            var element = info.artists.data[i];
            var toAdd = '<div class="trackBox">';
            toAdd += '<div><a href="track.html">' + element.name +'</a></div>';
            toAdd += '<div class="extraInfo"><a href="artists.html">' + element.artist.name + '</a></div>';
            toAdd += '</div>';
            listArtist.innerHTML += toAdd;
        }
    })
    
    .catch(function(error){
	    console.log('El error fué: ' + error);
    })

}