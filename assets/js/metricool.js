/* Metricool : mesure d'audience, chargée UNIQUEMENT si le visiteur a accepté les cookies.
   Le choix est lu dans localStorage ('cookie_consent'), écrit par le bandeau du site. */
(function () {
  var charge = false;

  function consentementAccepte() {
    try { return localStorage.getItem('cookie_consent') === 'accepted'; } catch (e) { return false; }
  }

  function chargerMetricool() {
    if (charge || !consentementAccepte()) return;
    charge = true;
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = 'https://tracker.metricool.com/resources/be.js';
    s.onload = function () {
      if (window.beTracker) window.beTracker.t({ hash: '8c596017fc19ab80c29d0cad7fb9924d' });
    };
    document.getElementsByTagName('head')[0].appendChild(s);
  }

  // Visiteur ayant déjà accepté lors d'une visite précédente
  chargerMetricool();

  // Visiteur qui vient d'accepter via le bandeau (le bandeau enregistre son choix, puis on charge)
  document.addEventListener('click', function (e) {
    if (e.target && e.target.closest && e.target.closest('#cookieAccept')) {
      setTimeout(chargerMetricool, 0);
    }
  });
})();
