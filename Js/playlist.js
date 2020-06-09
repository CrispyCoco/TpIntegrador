window.onload = function(){
    var playlistTrack = document.querySelector('.playlistTrack');

    playlistTrack.style.display = 'content';
    if (window.localStorage.getItem('ListIds') === null) {
        
    } else {
        let ids= JSON.parse(window.localStorage.getItem('ListIds'));
        let toAdd = ``;
        ids.forEach(id => {
            let track = JSON.parse(window.localStorage.getItem(`Id ${id}`));
            toAdd +=`<div class="track">
                        <div class="albumContainer"><img src="${track.album.cover}" alt="Album cover"></div>
                        <div class="trackName tag"><a href="details.html?trackId=${track.id}">${track.title}</a></div>
                        <div class="trackArtist tag notMobile"><a href="details.html?artistId=${track.artist.id}" class="notMobile">${track.artist.name}</a></div>
                        <div class="trackAlbum tag notMobile"><a href="details.html?albumId=${track.album.id}" class="notMobile">${track.album.title}</a></div>
                        <div class="moreOptions tag"><span class="remove" cancionId=${id}><i class="fas fa-ellipsis-h"></i></span></div>
                    </div>`
        });
        playlistTrack.innerHTML += toAdd;
        // console.log(track);
        let remove = document.querySelector('.remove');
        // function mostrar() {
        //     console.log(this.cancionId);
        // }
        // remove.mostrar();
        // Clear *******************************************************************************
        let more = document.getElementById('more');

        more.addEventListener('click', function(){
            let clear = confirm('Estas seguro que queres borrar la playlist?');
            if (clear) {
                window.localStorage.clear();
                playlistTrack.style.display = 'none';
            }
        })
    }
}

 function mostrar() {
     console.log(this.cancionId);
    
 }