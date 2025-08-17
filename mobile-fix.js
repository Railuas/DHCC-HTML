
(function(){
  var btn = document.getElementById('menuToggle');
  var nav = document.getElementById('nav');
  if(btn && nav){
    btn.addEventListener('click', function(){ nav.classList.toggle('open'); });
  }
})();
