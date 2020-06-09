window.onload = function() {
    
    fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/genre')
        
        .then(function(response){
            return response.json();
        })
        
        .then(function(info){
            console.log(info);

            var toAdd = ``;
            var content = document.querySelector('.content');
            
            for (let i = 1; i < info.data.length; i++) {
                const element = info.data[i];
                
                console.log(element);
                
                toAdd += ` <div class="genre">
                                <a href="details.html?genreId=${element.id}">
                                    <div class="imgContainer">
                                        <img src="${element.picture}" alt="">
                                        <h2>${element.name}</h2>
                                    </div>
                                    <div class="title">
                                        <h6>${element.name}</h6>
                                    </div>
                                </a>
                            </div>`;
                
                // console.log(toAdd);
                
                content.innerHTML = toAdd;
            }
        })
        
        .catch(function(error){
            console.log('El error fué: ' + error);
        })

/////////////////////////// NO TOCAR
}