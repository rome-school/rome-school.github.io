// Mobile navigation toggle. The menu is fully usable without this script;
// below the breakpoint it simply starts collapsed.
(function () {
  var toggle = document.querySelector('.nav__toggle');
  var menu = document.getElementById('nav-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', function () {
    var open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    menu.classList.toggle('is-open', !open);
  });

  menu.addEventListener('click', function (event) {
    if (event.target.tagName !== 'A') return;
    toggle.setAttribute('aria-expanded', 'false');
    menu.classList.remove('is-open');
  });
})();
