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
            
            // Seccion top tracks 
            for (let i = 0; i < info.tracks.data.length; i++) {
                let element = info.tracks.data[i];
                let name = element.artist.name
                let title = element.album.title;
                
                if(name.length > 16){
                    console.log(name);
                    
                    let namePart = name.slice(0, 15);
                    name = namePart + '...'
                    console.log(namePart);
                    
                }
                if (title.length > 16) {
                    titlePart = element.album.title.slice(0, 15);
                    title = titlePart + '...'
                }
                var toAdd = `<div class="trackBox">
                                <div><a href="details.html">${element.title}</a></div>
                                <div class="extraInfo"><a href="details.html">${name}</a></div>
                                <div class="extraInfo"><a href="details.html">${title}</a></div>
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
                                    <div><a href="details.html">${info.name}</a></div>
                                    <div class="extraInfo"><a href="sequel.html">${info.nb_fan} fans</a></div>
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
                            <div><a href="details.html">${element.title}</a></div>
                            <div class="fans"><a href="sequel.html">${element.fans} fans</a></div>
                        </div>`;
                listPodcast.innerHTML += toAdd;
            }
            
        })
    
        .catch(function(error){
            console.log('El error fué: ' + error);
        })

}