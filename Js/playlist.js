window.onload = function(){
    var playlistTrack = document.querySelector('.playlistTrack');

    playlistTrack.style.display = 'content';
    if (window.localStorage.getItem('ListIds') === null) {
        
    } else {
        let ids= JSON.parse(window.localStorage.getItem('ListIds'));
        let toAdd = ``;
        for (let i = 0; i < ids.length; i++) {
            const id = ids[i];
            
            let track = JSON.parse(window.localStorage.getItem(`Id ${id}`));
            toAdd +=`<div class="track" track="${id}">
                        <div class="albumContainer"><img src="${track.album.cover}" alt="Album cover"></div>
                        <div class="trackName tag"><a href="details.html?trackId=${track.id}">${track.title}</a></div>
                        <div class="trackArtist tag notMobile"><a href="details.html?artistId=${track.artist.id}" class="notMobile">${track.artist.name}</a></div>
                        <div class="trackAlbum tag notMobile"><a href="details.html?albumId=${track.album.id}" class="notMobile">${track.album.title}</a></div>
                        <div class="moreOptions tag"><span class="remove" songId="${id}"><i class="fas fa-ellipsis-h"></i></span></div>
                    </div>`;
        }
        playlistTrack.innerHTML += toAdd;
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
                
            })
            
        }
        
// Clear **************************************************************************************************
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
