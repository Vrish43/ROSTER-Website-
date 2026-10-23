// Shared behaviour for the Roster pages: waitlist forms, sport toggle, small DOM helpers.
window.Roster = (function () {
  // Waitlist forms have no backend yet: validate, then confirm in place.
  document.querySelectorAll('form[data-waitlist]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = form.querySelector('input[type="email"]');
      var status = form.querySelector('.form-status');
      if (!input.checkValidity()) {
        input.reportValidity();
        return;
      }
      status.textContent = "You're on the list. We'll email " + input.value + ' to verify you.';
      form.reset();
    });
  });

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function setText(id, text) {
    document.getElementById(id).textContent = text;
  }

  // Calls render(sport) now and whenever the Football / Basketball toggle changes.
  function onSportChange(render) {
    var group = document.querySelector('[data-sport-toggle]');
    var buttons = group.querySelectorAll('button[data-sport]');
    function select(sport) {
      buttons.forEach(function (b) {
        b.setAttribute('aria-pressed', String(b.dataset.sport === sport));
      });
      render(sport);
    }
    buttons.forEach(function (b) {
      b.addEventListener('click', function () { select(b.dataset.sport); });
    });
    select('football');
  }

  return { el: el, setText: setText, onSportChange: onSportChange };
})();
