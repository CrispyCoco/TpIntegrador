window.onload = function(){
    
    fetch(' https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart/0')
    
        .then(function(response){
            return response.json();
        })
    
        .then(function(info){
            console.log(info);
        
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
                var element = info.artists.data[i];
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
                        toAdd = `<div class="trackBox">
                                    <div><a href="details.html?artistId=${info.id}">${name}</a></div>
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
                let title = element.title;
                if (title.length > 24) {
                    let titlePart = title.slice(0,23);
                    title = titlePart + '...';
                }
                console.log(title);
                
                toAdd = `<div class="trackBox">
                            <div><a href="details.html?podcastId=${element.id}">${title}</a></div>
                            <div class="fans extraInfo"><p class="pFans">${element.fans} fans</p></div>
                        </div>`;
                listPodcast.innerHTML += toAdd;
            }

                // const ellipsisElements = document.getElementsByClassName('ellipsis');
                // // console.log(ellipsisElements);
                
                // for (const element of ellipsisElements) {
                //    console.log(element);
                   
                //    element.innerHTML = `<span style>${element.innerText}</span>`;
                //    const span = element.getElementsByTagName('span')[0];
                   
                //    element.addEventListener('mouseover', () => {
                //       console.log('#');
                //       const speed = parseInt(element.getAttribute('speed'));
                //       const length = span.getBoundingClientRect().width - element.getBoundingClientRect().width;
                //       const time = length / speed;
                //       span.style.transition = `left ${time}s linear`;
                //       span.style.left = `-${length}px`;
                //    });
             
                //    element.addEventListener('mouseout', () => {
                //       span.setAttribute('style', '');
                //    });
             
                //    element.addEventListener('click', () => {
                //       if (span.getAttribute('style')) {
                //          span.setAttribute('style', '');
                //       } else {
                //          const speed = parseInt(element.getAttribute('speed'));
                //          const length = span.getBoundingClientRect().width - element.getBoundingClientRect().width;
                //          const time = length / speed;
                //          span.style.transition = `left ${time}s linear`;
                //          span.style.left = `-${length}px`;
                //       }
                //    });
                // }

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
                                </li>
                                <li>
                                    <a href="details.html?podcastId=${info.podcasts.data[0].id}">
                                        <img src="images/Best Podcast.jpg" alt="">
                                        <div class="uk-position-center uk-panel"><h1>Best Podcast</h1></div>
                                    </a>
                                </li>
                                <li>
                                    <a href="details.html?playlistId=${info.playlists.data[0].id}">
                                        <img src="images/Top playlist.jpg" alt="">
                                        <div class="uk-position-center uk-panel"><h1>Best Playlist</h1></div>
                                    </a>
                                </li>`
            
        })
    
        .catch(function(error){
            console.log('El error fué: ' + error);
        })

}