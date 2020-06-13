window.onload = function(){
    
    fetch(' https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart/0')
    
        .then(function(response){
            return response.json();
        })
    
        .then(function(info){
            // console.log(info);
        
            // Variables generales para las 3 secciones
            var listTrack = document.querySelector('.list-track');
            var listArtist = document.querySelector('.list-artist');
            var listPodcast = document.querySelector('.list-podcast');
            var artistsId = [];
            var slider = document.querySelector('.uk-slider-items')

            var toAdd;
            
            // Seccion top tracks 
            for (let i = 0; i < info.tracks.data.length; i++) {
                let element = info.tracks.data[i];
                let name = element.artist.name;
                let albumTitle = element.album.title;
                let title = element.title;
                
                if (title.length > 24) {
                    let titlePart = title.slice(0,23);
                    title = titlePart + '...';
                }
                if(name.length > 16){
                    // console.log(name);
                    
                    let namePart = name.slice(0, 15);
                    name = namePart + '...'                    
                }
                if (albumTitle.length > 16) {
                    titlePart = element.album.title.slice(0, 15);
                    albumTitle = titlePart + '...'
                }
                toAdd = `<div class="trackBox">
                                <div><a href="details.html?trackId=${element.id}" class="ellipsis" speed="160">${title}</a></div>
                                <div class="extraInfo"><a href="details.html?artistId=${element.artist.id}" class="ellipsis" speed="160">${name}</a></div>
                                <div class="extraInfo"><a href="details.html?albumId=${element.album.id}" class="ellipsis" speed="160">${albumTitle}</a></div>
                            </div>`;
                listTrack.innerHTML += toAdd;
            }
            
            // Seccion top Artists
            for (let i = 0; i < info.artists.data.length; i++) {
                let element = info.artists.data[i];
                artistsId = element.id;
                fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/' + artistsId)
                    .then(function(response){
                        return response.json();
                    })
                
                    .then(function(info){
                        let name = info.name;
                        if (name.length > 24) {
                            let namePart = name.slice(0, 23);
                            name = namePart + '...';
                        }
                        let fans = numberWithCommas(info.nb_fan);
                        toAdd = `<div class="trackBox">
                                    <div><a href="details.html?artistId=${info.id}">${name}</a></div>
                                    <div class="extraInfo"><p class="pFans">${fans} fans</p></div>
                                </div>`;
                        
                        listArtist.innerHTML += toAdd;                        
                    })

                    .catch(function(error){
                        console.log('El error fué: ' + error);
                    })

            }
            // console.log(artistsId);
            // Seccion top Podcasts
            for (let i = 0; i < info.albums.data.length; i++) {
                let element = info.albums.data[i];
                let title = element.title;
                if (title.length > 24) {
                    let titlePart = title.slice(0,23);
                    title = titlePart + '...';
                }
                let artistName = element.artist.name;
                if (artistName.length > 16) {
                    let namePart = artistName.slice(0,15);
                    artistName = namePart + '...';
                }
                // console.log(element);
                
                toAdd = `<div class="trackBox">
                            <div><a href="details.html?albumId=${element.id}">${title}</a></div>
                            <div class="fans extraInfo"><a href="details.html?artistId=${element.artist.id}">${artistName}</a></div>
                        </div>`;
                listPodcast.innerHTML += toAdd;
            }
            slider.innerHTML += `<li>
                                    <a href="details.html?trackId=${info.tracks.data[0].id}">
                                        <img src="images/Top track slider.jpg" alt="">
                                        <div class="uk-position-center uk-panel"><h1>Best Track</h1></div>
                                    </a>
                                </li>
                                <li>
                                    <a href="details.html?artistId=${info.artists.data[0].id}">
                                        <img src="images/Top Artist Slider.jpg" alt="">
                                        <div class="uk-position-center uk-panel"><h1>Best Artist</h1></div>
                                    </a>
                                </li>
                                <li>
                                    <a href="details.html?albumId=${info.albums.data[0].id}">
                                        <img src="images/Top Album.jpg" alt="">
                                        <div class="uk-position-center uk-panel"><h1>Best Album</h1></div>
                                    </a>
                                </li>`
            
        })
    
        .catch(function(error){
            console.log('El error fué: ' + error);
        })

}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
// Mio