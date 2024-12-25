window.onload = function(){
    setTimeout(function(){
        var loader = document.getElementsByClassName("loader-wrapper")[0];
        loader.style.display = "none";
    },8000)
}


  // Redirect to the main page after 3 seconds
  setTimeout(function () {
    window.location.href = 'mainweb/'; // Redirect to the main page (index.php or index.html)
}, 10000); // 3 seconds delay
