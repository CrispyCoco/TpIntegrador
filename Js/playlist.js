window.onload = function(){
    if (window.localStorage.getItem('playlist') === null) {
        
    } else {
        let playlist = JSON.parse(window.localStorage.getItem('playlist'));
        let playlistTrack = document.querySelector('.playlistTrack');
        let toAdd = ``;
        playlist.forEach(track => {
            toAdd +=`<div class="track">
                        <div class="albumContainer"><img src="${track.album.cover}" alt="Album cover"></div>
                        <div class="trackName tag"><a href="details.html?trackId=${track.id}">${track.title}</a></div>
                        <div class="trackArtist tag notMobile"><a href="details.html?artistId=${track.artist.id}" class="notMobile">${track.artist.name}</a></div>
                        <div class="trackAlbum tag notMobile"><a href="details.html?albumId=${track.album.id}" class="notMobile">${track.album.title}</a></div>
                        <div class="moreOptions tag"><a href="sequel.html"><i class="fas fa-ellipsis-h"></i></a></div>
                    </div>`
        });

        playlistTrack.innerHTML += toAdd;
        console.log(playlist);
        
    }
}