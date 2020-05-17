window.onload = function(){
    fetch('https://api.deezer.com/chart/0')
    
    .then(function(response){
	    return response.json();
    })
    
    .then(function(information){
	    console.log(information);
    })
    
    .catch(function(error){
	    console.log('El error fué: ' + error);
    })

}