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

            var toAdd;

            
            // Seccion top tracks 
            for (let i = 0; i < info.tracks.data.length; i++) {
                let element = info.tracks.data[i];
                let name = element.artist.name
                let title = element.album.title;
                
                // if(name.length > 16){
                //     console.log(name);
                    
                //     let namePart = name.slice(0, 15);
                //     name = namePart + '...'                    
                // }
                // if (title.length > 16) {
                //     titlePart = element.album.title.slice(0, 15);
                //     title = titlePart + '...'
                // }
                toAdd = `<div class="trackBox">
                                <div><a href="details.html?trackId=${element.id}">${element.title}</a></div>
                                <div class="extraInfo"><a href="details.html?artistId=${element.artist.id}">${name}</a></div>
                                <div class="extraInfo"><a href="details.html?albumId=${element.album.id}">${title}</a></div>
                            </div>`;
                listTrack.innerHTML += toAdd;
            }
            
            // Seccion top Artists
            for (let i = 0; i < info.artists.data.length; i++) {
                var element = info.artists.data[i];
                artistsId = element.id;
                fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/' + artistsId)
                    .then(function(response){
                        return response.json();
                    })
                
                    .then(function(info){

                        toAdd = `<div class="trackBox">
                                    <div><a href="details.html?artistId=${info.id}">${info.name}</a></div>
                                    <div class="extraInfo"><p class="pFans">${info.nb_fan} fans</p></div>
                                </div>`;
                        
                        listArtist.innerHTML += toAdd;                        
                    })

                    .catch(function(error){
                        console.log('El error fué: ' + error);
                    })

            }
            // console.log(artistsId);
            // Seccion top Podcasts
            for (let i = 0; i < info.podcasts.data.length; i++) {
                var element = info.podcasts.data[i];
                toAdd = `<div class="trackBox">
                            <div><a href="details.html?podcastId=${element.id}">${element.title}</a></div>
                            <div class="fans"><p class="pFans">${element.fans} fans</p></div>
                        </div>`;
                listPodcast.innerHTML += toAdd;
            }
            
        })
    
        .catch(function(error){
            console.log('El error fué: ' + error);
        })

}