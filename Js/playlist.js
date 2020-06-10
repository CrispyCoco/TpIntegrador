
window.onload=function () {
//traigo la info del local storage para aplicarla en la playlist

    let canciones=    JSON.parse (window.localStorage.getItem("playlist"))


let containerplaylist= document.querySelector(".playlistTrack")

console.log (canciones)

let clearAll= document.querySelector (".Borrar")
clearAll.addEventListener ("click", function(){
    window.localStorage.clear ("playlist")
})


canciones.forEach(track => {
    containerplaylist.innerHTML += `
    <div class="track">
                        <div class="albumContainer"><img src="${track.album.cover_small}" alt="Album de prueba"></div>
                        <div class="trackName tag"><a href="sequel.html">${track.title_short}</a></div>
                        <div class="trackArtist tag notMobile"><a href="details.html" class="notMobile">${track.artist.name}</a></div>
                        <div class="trackAlbum tag notMobile"><a href="details.html" class="notMobile">${track.album.title}</a></div>
                        <div class="moreOptions tag"><a href="sequel.html"><i class="fas fa-ellipsis-h"></i></a></div>
    </div>
    ` 









    
});



























    
}