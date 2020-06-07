window.onload = function(){

    // Variables principales
    var artist = document.querySelector(".container-artist");
    var album = document.querySelector(".container-album");
    var genre = document.querySelector(".container-genre");
    var track = document.querySelector(".container-track");
    var durationMin;
    var durationSec;
    var trackList = ``;

    var queryString = location.search;
    var queryStringObj = new URLSearchParams(queryString);
    var id;
    var fans;
    var toAdd = ``;
    
    // **************************************************************************
    // Detalles de tracks

    if (queryStringObj.has('trackId')) {
        // console.log('Es una track');
        
        id = queryStringObj.get('trackId');
        
        fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/track/' + id)
            .then(function(response){
                return response.json();
            })
            .then(function(data){
                console.log(data);
                playlist = [data];
                // console.log(track);
                durationMin = Math.floor(data.duration/60);
                durationSec = data.duration - durationMin*60;
                // console.log(durationSec);
                if (durationSec < 10) {
                    durationSec = '0' + durationSec;
                }
                let trackTitle = data.title;
                let albumTitle = data.album.title;
                let artistName = data.artist.name;
                console.log(trackTitle.length);
                
                if (trackTitle.length > 30) {
                    let titlePart = data.title.slice(0,29);
                    trackTitle = titlePart + '...';
                    console.log(trackTitle);
                }
                
                if (albumTitle.length > 30) {
                    let titlePart = data.album.title.slice(0,29);
                    albumTitle = titlePart + '...';
                    console.log(albumTitle);
                    
                }
                if (artistName.length > 30) {
                    let titlePart = data.artist.name.slice(0,29);
                    albumTitle = titlePart + '...';
                    console.log(artistName);
                }
                toAdd = `<div class="track">
                            <div class="imgContainer">
                                <div class="overImage">
                        
                                </div>
                                <img src="${data.album.cover_big}" alt="" class="imagen">
                            </div>
        
                            <div class="info">
                                <h3 class="title">${trackTitle}</h3>
                                <div class="moreInfo">
                                    <a href="details.html?artistId=${data.artist.id}" class="artist">${artistName}</a>
                                    <a href="details.html?albumId=${data.album.id}" class="album">${albumTitle}</a>
                                </div>
                    
                                <div class="button">
                                    <button class="add"><span><span uk-icon="icon: bookmark"></span> Add to playlist</button>
                                    <button class="added"><span><span uk-icon="icon: check" class="tick"></span> Added</button>
                                </div>
                                <div class="duration"><h5>${durationMin} : ${durationSec}</h5></div>
                                </div>
                            </div>`;
                track.innerHTML += toAdd;
                track.style.display = 'flex';

                let add = document.querySelector('.add');
                let added = document.querySelector('.added');
                add.addEventListener('click', function(){

                    if(window.localStorage.getItem('playlist') === null){
                        window.localStorage.setItem('playlist', JSON.stringify(playlist));
                    } else {
                        playlist = JSON.parse(window.localStorage.getItem('playlist'));
                        playlist.push(data);
                        window.localStorage.setItem('playlist', JSON.stringify(playlist));
                        console.log(JSON.parse(window.localStorage.getItem('playlist')));
                    }
                    add.style.display = 'none';
                    added.style.display = 'block';
                })
            })
            .catch(function(error){
                console.log('El error fué: ' + error);
            })
    
    // ******************************************************************************************************
    // Detalles de artistas

    } else if(queryStringObj.has('artistId')){
        console.log('Es un artista');
    
        id = queryStringObj.get('artistId');
        
        fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/' + id)
            .then(function(response){
                return response.json();
            })
            .then(function(data){
                console.log(data);
                
                let artistName = data.name;
                if (artistName.length > 30) {
                    let titlePart = data.name.slice(0,29);
                    albumTitle = titlePart + '...';
                    console.log(artistName);
                }

                fans = numberWithCommas(data.nb_fan);
                toAdd = `<div class="artist">
                            <div class="imgContainer">
                                <img src="${data.picture_big}" alt="">
                            </div>
                            <div class="info">
                                <div class="headline">
                                    <h3>${artistName}</h3>
                                    <h4>${fans} fans</h4>
                                </div>
                                <div class="music">
                                    <h5>Top Tracks</h5>
                                    <ol>
                                    </ol>
                                </div>
                            </div>
                        </div>`;
                artist.innerHTML += toAdd;
                artist.style.display = 'flex';
                var musicOl = document.querySelector(".music ol");

                // Lista de canciones

                fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/'+ data.id +'/top?limit=50')
                    .then(function(response){
                        return response.json();
                    })
                    .then(function(data){
                        console.log(typeof data);

                        for (let i = 0; i < 6; i++) {
                            const element = data.data[i];

                            let trackTitle = element.title;
                            if (trackTitle.length > 30) {
                                let titlePart = element.title.slice(0,29);
                                trackTitle = titlePart + '...';
                                console.log(trackTitle);
                            }

                            if (i < 5) {
                                toAdd = ` <li><a href="details.html?trackId=${element.id}">${i + 1}. ${trackTitle}</a></li>`;
                            } else{
                                toAdd = ` <li id="last"><a href="details.html?trackId=${element.id}">${i + 1}. ${trackTitle}</a></li>`;
                            }
                            musicOl.innerHTML += toAdd;
                        }
                    })
                    .catch(function(error){
                        console.log('El error fué: ' + error);
                    })

                // *****************************************************************************
            })
            .catch(function(error){
                console.log('El error fué: ' + error);
            })

    // *************************************************************************************************
    // Detalles de album

    } else if (queryStringObj.has('albumId')) {
        console.log('Es un album');
        
        id = queryStringObj.get('albumId');

        fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/album/' + id)
            .then(function(response){
                return response.json();
            })
            .then(function(data){
                console.log(data);
                
                durationMin = Math.floor(data.duration/60);
                durationSec = data.duration - durationMin*60;
                // console.log(durationSec);
                if (durationSec < 10) {
                    durationSec = '0' + durationSec;
                }
                // console.log(typeof duration);
                console.log(durationSec);
                console.log(durationMin);
                // console.log(durationHr);
                
                data.tracks.data.forEach(element => {
                    let trackTitle = element.title;
                    if (trackTitle.length > 20) {
                        let titlePart = element.title.slice(0,19);
                        trackTitle = titlePart + '...';
                        console.log(trackTitle);
                    }
                    trackList += `<div class="track"><a href="details.html?trackId=${element.id}">${trackTitle}</a></div>`;
                });
                // console.log(trackList);
                let albumTitle = data.title;
                let artistName = data.artist.name;
                
                
                if (albumTitle.length > 30) {
                    let titlePart = data.album.title.slice(0,29);
                    albumTitle = titlePart + '...';
                    console.log(albumTitle);
                    
                }
                if (artistName.length > 30) {
                    let titlePart = data.artist.name.slice(0,29);
                    albumTitle = titlePart + '...';
                    console.log(artistName);
                }

                toAdd = `  <div class="album-content">
                <div class="album">
                    <div class="imgContainer">
                        <img src="${data.cover_big}" alt="">
                    </div>
                    <div class="info">
                        <div class="title">
                            <h3>${albumTitle}</h3>
                        </div>
                        <div class="moreInfo">
                            <a href="details.html?artistId=${data.artist.id}" class="artistName">${artistName}</a>
                            <h5>${data.release_date} | ${data.nb_tracks} tracks | ${durationMin} : ${durationSec}</h5>
                        </div>
                    </div>
                </div>
                <div class="music">
                        <h5>Tracks</h5>
                </div>
            </div>`;
                album.innerHTML += toAdd;
                album.style.display = 'flex';
                
                let albumMusic = document.querySelector('.container-album .music');
                albumMusic.innerHTML += trackList; 
            })

            .catch(function(error){
                console.log('El error fué: ' + error);
            })

    // *********************************************************************************************
    // Detalles de genre

    } else if (queryStringObj.has('genreId')) {
        console.log('Es un genero');
        
        id = queryStringObj.get('genreId');

        fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/genre/' + id)
            .then(function(response){
                return response.json();
            })
            .then(function(data){
                // console.log(data);

                toAdd = `<div class="genre">
                            <div class="imgContainer">
                                <img src="${data.picture_big}" alt="">
                            </div>
                            <div class="info">
                                <h3>${data.name}</h3>
                                <div class="slider">
                                    <h4>Top artists</h4>
                                    <div class="uk-position-relative uk-visible-toggle uk-light slider-content" tabindex="-1" uk-slider>
                
                                        <ul class="uk-slider-items uk-child-width-1-2 uk-child-width-1-3@m uk-grid slider-ul">
                                            <li>
                                                <a href="home.html">
                                                    <div class="uk-panel">
                                                        <img src="images/Top artists genre .jpg" alt="" class="generic">
                                                        <h4>Top Artists </h4>
                                                    </div>
                                                </a>
                                            </li>
                                        </ul>
                                    
                                        <a class="uk-position-center-left uk-position-small uk-hidden-hover" href="#" uk-slidenav-previous uk-slider-item="previous"></a>
                                        <a class="uk-position-center-right uk-position-small uk-hidden-hover" href="#" uk-slidenav-next uk-slider-item="next"></a>
                                    </div>
                                </div>
                            </div>
                        </div>`;
            genre.innerHTML += toAdd;
            var sliderUl = document.querySelector('.slider-ul');
            genre.style.display = 'flex';
            
            fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/genre/' + id + '/artists')
	            .then(function(response){
	                return response.json();
                })
                
                .then(function(data){
                    console.log(data);
                    
                    let addArtist = ``;
                    for (let i = 0; i < 10; i++) {
                        const element = data.data[i];
                        addArtist += `<li>
                                        <a href="details.html?artistId=${element.id}">
                                            <div class="uk-panel">
                                                <img src="${element.picture_big}" alt="">
                                                <h4>${element.name}</h4>
                                            </div>
                                        </a>
                                    </li>`
                        
                    }

                    sliderUl.innerHTML += addArtist;
                })
                
                .catch(function(error){
	                console.log('El error fué: ' + error);
                })

            })
            .catch(function(error){
                console.log('El error fué: ' + error);
            })
    
    // **************************************************************************************************
    // Extras

    } else {
        console.log('No es nada');

        id = queryStringObj.get('trackId');
        
    }

// No borrar
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
