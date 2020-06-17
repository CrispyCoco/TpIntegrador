window.onload = function(){
    var playlistTrack = document.querySelector('.playlistTrack');
    let qTracks = document.querySelector('.titles h5');
    let tracksAmmount = 0;

    playlistTrack.style.display = 'content';
    if (window.localStorage.getItem('ListIds') === null) {
        qTracks.innerHTML = `${tracksAmmount} tracks`;
    } else {
        let ids= JSON.parse(window.localStorage.getItem('ListIds'));
        let toAdd = ``;
        for (let i = 0; i < ids.length; i++) {
            const id = ids[i];
            
            let track = JSON.parse(window.localStorage.getItem(`Id ${id}`));
            console.log(track);
            
                console.log(track.title);
                let trackTitle = track.title;
                let albumTitle = track.album.title;
                let artistName = track.artist.name;
                
                if (trackTitle.length > 16) {
                    let titlePart = trackTitle.slice(0,15);
                    trackTitle = titlePart + '...';
                    console.log(trackTitle);
                }
                
                if (albumTitle.length > 16) {
                    let titlePart = albumTitle.slice(0,15);
                    albumTitle = titlePart + '...';
                    console.log(albumTitle);
                    
                }
                if (artistName.length > 16) {
                    let titlePart = artistName.slice(0,15);
                    artistName = titlePart + '...';
                    console.log(artistName);
                }
            toAdd +=`<div class="track" track="${id}">
                        <div class="albumContainer" track="${id}"><span uk-icon="icon: play" class="play-button"></span><img src="${track.album.cover}" alt="Album cover"></div>
                        <div class="trackName tag"><a href="details.html?trackId=${track.id}">${trackTitle}</a></div>
                        <div class="trackArtist tag notMobile"><a href="details.html?artistId=${track.artist.id}" class="notMobile">${artistName}</a></div>
                        <div class="trackAlbum tag notMobile"><a href="details.html?albumId=${track.album.id}" class="notMobile">${albumTitle}</a></div>
                        <div class="moreOptions tag"><span class="remove" songId="${id}"><span class="minus" uk-icon="icon: minus-circle"></span></span></div>
                        

                    </div>`;
            tracksAmmount ++;
        }
        playlistTrack.innerHTML += toAdd;
        qTracks.innerHTML = `${tracksAmmount} tracks`;
        // console.log(track);
        let removes = document.getElementsByClassName('remove');
        
        // console.log(removes);
        for (let i = 0; i < removes.length; i++) {
            
            removes[i].addEventListener('click', function(){
                // console.log(removes.length);
                console.log(ids);
                
                let songId = this.getAttribute("songId");
                console.log(songId);
                for (let i = 0; i < ids.length; i++) {
                    const element = ids[i];
                    if(element == songId){
                        ids.splice(i, 1)
                    }
                }
                console.log(ids);
                
                window.localStorage.removeItem('Id ' + songId);
                
                if (ids.length == 0) {
                    window.localStorage.removeItem('ListIds')
                } else{
                    window.localStorage.setItem('ListIds', JSON.stringify(ids));
                }
                let trackList = document.getElementsByClassName('track');
                for (let i = 0; i < trackList.length; i++) {
                    const track = trackList[i];
                    if (track.getAttribute('track') == songId) {
                        track.style.display = 'none';
                    }
                }
                tracksAmmount --;
                qTracks.innerHTML = `${tracksAmmount} tracks`
            })
            
        }
        
// Clear **************************************************************************************************
        let more = document.getElementById('more');
        let trackPlayer = document.querySelector('.track-player');


        more.addEventListener('click', function(){
            let clear = confirm('Estas seguro que queres borrar la playlist?');
            if (clear) {
                window.localStorage.clear();
                playlistTrack.style.display = 'none';
                tracksAmmount = 0;
                qTracks.innerHTML = `${tracksAmmount} tracks`;
                trackPlayer.innerHTML = ``;
            }
        })

// Play*******************************************************************************************************

        let footer = document.querySelector('.footer');
        let trackList = document.getElementsByClassName('albumContainer')

        for (let i = 0; i < trackList.length; i++) {
            const track = trackList[i];
            let trackId = track.getAttribute('track');
            track.addEventListener('click', function(){
                trackPlayer.innerHTML = `<iframe scrolling="yes" frameborder="0" allowTransparency="true" src="https://www.deezer.com/plugins/player?format=classic&autoplay=true&playlist=true&width=1350&height=350&color=4b1aab&layout=dark&size=medium&type=tracks&id=${trackId}&app_id=1" width="1350" height="92" class="player"></iframe>`
                // footer.style.display = 'none';
            })
        }


    }
}

 function mostrar() {
     console.log(this.cancionId);
    
 }

//  Mio
