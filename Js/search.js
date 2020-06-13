window.onload = function(){
    let queryString = location.search;
    let queryStringObj = new URLSearchParams(queryString);
    let search = queryStringObj.get('search');
    console.log(search);
    
    let artistList = document.querySelector('.artist-list');
    let trackList = document.querySelector('.track-list');
    let albumList = document.querySelector('.album-list');

    fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/search/artist?q='+ search)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            let toAdd = ``;
            console.log(data);
            if (data.data.length > 9) {
                
                for (let i = 0; i < 9; i++) {
                    const element = data.data[i];
                    toAdd += `<a href="details.html?artistId=${element.id}" class="artistLink">
                                <div class="artist">
                                    <div class="imgContainer">
                                        <img src="${element.picture_big}" alt="">
                                    </div>
                                    <h4>${element.name}</h4>
                                </div>
                            </a>`;
                }
            } else {
                data.data.forEach(element => {
                    toAdd += `<a href="details.html?artistId=${element.id}" class="artistLink">
                                <div class="artist">
                                    <div class="imgContainer">
                                        <img src="${element.picture_big}" alt="">
                                    </div>
                                    <h4>${element.name}</h4>
                                </div>
                            </a>`;
                });
            }

            artistList.innerHTML += toAdd
            
        })
        .catch(function(error){
            console.log(error);
            
        })

    fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/search/track?q='+ search)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        let toAdd = ``;
        console.log(data);
        
        if (data.data.length > 15) {
            for (let i = 0; i < 15; i++) {
                const element = data.data[i];
                durationMin = Math.floor(element.duration/60);
                durationSec = element.duration - durationMin*60;
                console.log(durationSec);
                if (durationSec < 10) {
                    durationSec = '0' + durationSec;
                }

                toAdd += `<a href="details.html?trackId=${element.id}" class="trackLink">
                            <div class="track">
                                <div class="imgContainer">
                                    <img src="${element.album.cover_big}" alt="">
                                </div>
                                <h4>${element.title}</h4>
                                <p>${element.artist.name} | ${durationMin} : ${durationSec}</p>
                            </div>
                        </a>`;
            }
        } else {
            data.data.forEach(element => {
                durationMin = Math.floor(data.duration/60);
                durationSec = data.duration - durationMin*60;
                // console.log(durationSec);
                if (durationSec < 10) {
                    durationSec = '0' + durationSec;
                }
                toAdd += `<a href="details.html?trackId=${element.id}" class="trackLink">
                            <div class="track">
                                <div class="imgContainer">
                                    <img src="${element.album.cover_big}" alt="">
                                </div>
                                <h4>${element.title}</h4>
                                <p>${element.artist.name} | ${durationMin} : ${durationSec}</p>
                            </div>
                        </a>`;
            });
        }
        trackList.innerHTML += toAdd
    })
    .catch(function(error){
        console.log(error);
        
    })
    
    fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/search/album?q='+ search)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
            let toAdd = ``;
            if (data.data.length > 9) {
                for (let i = 0; i < 9; i++) {
                    const element = data.data[i];
                    durationMin = Math.floor(element.duration/60);
                    durationSec = element.duration - durationMin*60;
                    // console.log(durationSec);
                    if (durationSec < 10) {
                        durationSec = '0' + durationSec;
                    }
                    toAdd += `<a href="details.html?albumId=${element.id}" class="albumLink">
                                <div class="album">
                                    <div class="imgContainer">
                                        <img src="${element.cover_big}" alt="">
                                    </div>
                                    <h4>${element.title}</h4>
                                    <p>${element.artist.name} | ${durationMin} : ${durationSec}</p>
                                </div>
                            </a>`;
                }
            } else {
                data.data.forEach(element => {
                    toAdd += `<a href="details.html?trackId=${element.id}" class="trackLink">
                                <div class="track">
                                    <div class="imgContainer">
                                        <img src="${element.cover_big}" alt="">
                                    </div>
                                    <h4>${element.title}</h4>
                                    <p>${element.artist.name} | ${durationMin} : ${durationSec}</p>
                                </div>
                            </a>`;
                });
            }

            albumList.innerHTML += toAdd;
        })
        .catch(function(error){
            console.log(error);
            
        })
}

// Mio