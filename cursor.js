(function() {
  var isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isCoarse = window.matchMedia('(pointer: coarse)').matches;
  if (isTouch || prefersReduced || isCoarse) return;

  var dot = document.createElement('div');
  dot.id = 'cursor-dot';
  var ring = document.createElement('div');
  ring.id = 'cursor-ring';
  document.body.appendChild(dot);
  document.body.appendChild(ring);

  document.documentElement.classList.add('custom-cursor');

  var mouseX = -100, mouseY = -100, dotX = -100, dotY = -100, ringX = -100, ringY = -100;
  var isHovering = false, isVisible = false;

  var darkSections = [
    document.getElementById('contacto'),
    document.getElementById('metodo'),
    document.querySelector('footer')
  ];
  var onDark = false;

  document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX; mouseY = e.clientY;
    if (!isVisible) { isVisible = true; dot.style.opacity = '1'; ring.style.opacity = '1'; }
    var overDark = false;
    darkSections.forEach(function(sec) {
      if (sec) { var r = sec.getBoundingClientRect(); if (e.clientY >= r.top && e.clientY <= r.bottom) overDark = true; }
    });
    if (overDark !== onDark) {
      onDark = overDark;
      dot.style.background = onDark ? 'rgba(255,255,255,0.9)' : '#233b61';
      ring.style.borderColor = onDark ? 'rgba(255,255,255,0.5)' : 'rgba(35,59,97,0.4)';
      if (onDark) document.body.classList.add('cursor-on-dark'); else document.body.classList.remove('cursor-on-dark');
    }
  });

  document.addEventListener('mouseleave', function() {
    isVisible = false; dot.style.opacity = '0'; ring.style.opacity = '0';
  });

  var interactives = 'a, button, select, input, textarea, .cursor-pointer, [onclick], .group';
  document.addEventListener('mouseover', function(e) {
    if (e.target.closest(interactives)) { document.body.classList.add('cursor-hover'); isHovering = true; }
  });
  document.addEventListener('mouseout', function(e) {
    if (e.target.closest(interactives)) { document.body.classList.remove('cursor-hover'); isHovering = false; }
  });

  (function render() {
    dotX += (mouseX - dotX) * 0.25; dotY += (mouseY - dotY) * 0.25;
    dot.style.transform = 'translate3d(' + (dotX - 3) + 'px, ' + (dotY - 3) + 'px, 0)';
    ringX += (mouseX - ringX) * 0.12; ringY += (mouseY - ringY) * 0.12;
    var ringOffset = isHovering ? 32 : 16;
    ring.style.transform = 'translate3d(' + (ringX - ringOffset) + 'px, ' + (ringY - ringOffset) + 'px, 0)';
    requestAnimationFrame(render);
  })();
})();
