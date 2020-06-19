window.onload = function () {
    let queryString = location.search;
    let queryStringObj = new URLSearchParams(queryString);
    let search = queryStringObj.get('search');
    console.log(search);

    let artistList = document.querySelector('.artist-list');
    let trackList = document.querySelector('.track-list');
    let albumList = document.querySelector('.album-list');

    fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/search/artist?q=' + search)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            let toAdd = ``;
            console.log(data);
            if (data.data.length > 9) {

                for (let i = 0; i < 9; i++) {
                    const element = data.data[i];
                    let artistName = element.name;

                    if (artistName.length > 16) {
                        let titlePart = artistName.slice(0, 15);
                        artistName = titlePart + '...';
                        console.log(artistName);
                    }
                    toAdd += `<a href="details.html?artistId=${element.id}" class="artistLink">
                                <div class="artist">
                                    <div class="imgContainer">
                                        <img src="${element.picture_big}" alt="">
                                    </div>
                                    <h4>${artistName}</h4>
                                </div>
                            </a>`;
                }
            } else if (data.data.length > 0) {
                data.data.forEach(element => {
                    let artistName = element.name;

                    if (artistName.length > 16) {
                        let titlePart = artistName.slice(0, 15);
                        artistName = titlePart + '...';
                        console.log(artistName);
                    }
                    toAdd += `<a href="details.html?artistId=${element.id}" class="artistLink">
                                <div class="artist">
                                    <div class="imgContainer">
                                        <img src="${element.picture_big}" alt="">
                                    </div>
                                    <h4>${element.name}</h4>
                                </div>
                            </a>`;
                });
            } else {
                toAdd = '<h2>No hay ningun artista con ese nombre</h2>'
            }

            artistList.innerHTML = toAdd

        })
        .catch(function (error) {
            console.log(error);

        })

    fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/search/track?q=' + search)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            let toAdd = ``;
            console.log(data);

            if (data.data.length > 15) {
                for (let i = 0; i < 15; i++) {
                    const element = data.data[i];
                    let trackTitle = element.title;

                    if (trackTitle.length > 16) {
                        let titlePart = trackTitle.slice(0, 15);
                        trackTitle = titlePart + '...';
                        console.log(trackTitle);
                    }
                    let artistName = element.artist.name;
                
                    if (artistName.length > 16) {
                        let titlePart = artistName.slice(0,15);
                        artistName = titlePart + '...';
                        console.log(artistName);
                    }
                    durationMin = Math.floor(element.duration / 60);
                    durationSec = element.duration - durationMin * 60;
                    console.log(durationSec);
                    if (durationSec < 10) {
                        durationSec = '0' + durationSec;
                    }

                    toAdd += `<a href="details.html?trackId=${element.id}" class="trackLink">
                            <div class="track">
                                <div class="imgContainer">
                                    <img src="${element.album.cover_big}" alt="">
                                </div>
                                <h4>${trackTitle}</h4>
                                <p>${artistName} | ${durationMin} : ${durationSec}</p>
                            </div>
                        </a>`;
                }
            } else if (data.data.length > 0) {
                data.data.forEach(element => {
                    durationMin = Math.floor(data.duration / 60);
                    durationSec = data.duration - durationMin * 60;
                    // console.log(durationSec);
                    if (durationSec < 10) {
                        durationSec = '0' + durationSec;
                    }
                    let trackTitle = element.title;
                
                    if (trackTitle.length > 16) {
                        let titlePart = trackTitle.slice(0,15);
                        trackTitle = titlePart + '...';
                        console.log(trackTitle);
                    }
                    let artistName = element.artist.name;
                
                    if (artistName.length > 16) {
                        let titlePart = artistName.slice(0,15);
                        artistName = titlePart + '...';
                        console.log(artistName);
                    }
                    toAdd += `<a href="details.html?trackId=${element.id}" class="trackLink">
                            <div class="track">
                                <div class="imgContainer">
                                    <img src="${element.album.cover_big}" alt="">
                                </div>
                                <h4>${trackTitle}</h4>
                                <p>${artistName} | ${durationMin} : ${durationSec}</p>
                            </div>
                        </a>`;
                });
            } else {
                toAdd = '<h2>No hay ninguna track con ese nombre</h2>'
            }
            trackList.innerHTML = toAdd
        })
        .catch(function (error) {
            console.log(error);

        })

    fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/search/album?q=' + search)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            let toAdd = ``;
            if (data.data.length > 9) {
                for (let i = 0; i < 9; i++) {
                    const element = data.data[i];
                    durationMin = Math.floor(element.duration / 60);
                    durationSec = element.duration - durationMin * 60;
                    // console.log(durationSec);
                    if (durationSec < 10) {
                        durationSec = '0' + durationSec;
                    }
                    let albumTitle = element.title;
                    
                
                    if (albumTitle.length > 16) {
                        let titlePart = albumTitle.slice(0,15);
                        albumTitle = titlePart + '...';
                        console.log(albumTitle);
                    }
                    let artistName = element.artist.name;
                
                    if (artistName.length > 16) {
                        let titlePart = artistName.slice(0,15);
                        artistName = titlePart + '...';
                        console.log(artistName);
                    }
                    toAdd += `<a href="details.html?albumId=${element.id}" class="albumLink">
                                <div class="album">
                                    <div class="imgContainer">
                                        <img src="${element.cover_big}" alt="">
                                    </div>
                                    <h4>${albumTitle}</h4>
                                    <p>${artistName} | ${element.nb_tracks} tracks</p>
                                </div>
                            </a>`;
                }
            } else if (data.data.length > 0) {
                data.data.forEach(element => {
                    let albumTitle = element.title;
                
                    if (albumTitle.length > 16) {
                        let titlePart = albumTitle.slice(0,15);
                        albumTitle = titlePart + '...';
                        console.log(albumTitle);
                    }
                    let artistName = element.artist.name;
                
                    if (artistName.length > 16) {
                        let titlePart = artistName.slice(0,15);
                        artistName = titlePart + '...';
                        console.log(artistName);
                    }
                    toAdd += `<a href="details.html?albumId=${element.id}" class="albumLink">
                                <div class="album">
                                    <div class="imgContainer">
                                        <img src="${element.cover_big}" alt="">
                                    </div>
                                    <h4>${albumTitle}</h4>
                                    <p>${artistName} | ${element.nb_tracks} tracks</p>
                                </div>
                            </a>`;
                });
            } else {
                toAdd = '<h2>No hay ningun album con ese nombre</h2>'
            }

            albumList.innerHTML = toAdd;
        })
        .catch(function (error) {
            console.log(error);

        })
}

// Mio