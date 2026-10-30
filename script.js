// Menú móvil y animación de entrada (el contenido es visible aunque este script no cargue)
(function () {
  var root = document.documentElement;
  var nav = document.querySelector('.nav');
  var toggle = document.getElementById('menu-toggle');

  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  document.querySelectorAll('.nav__links a').forEach(function (a) {
    a.addEventListener('click', function () {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  document.getElementById('year').textContent = new Date().getFullYear();

  // Formulario de contacto: mismo servicio (Web3Forms) y casilla que la landing de LubriControl
  var form = document.getElementById('contact-form');
  var status = document.getElementById('form-status');
  var submit = document.getElementById('submit-btn');
  var submitHtml = submit.innerHTML;

  function mostrarEstado(ok, texto) {
    status.textContent = texto;
    status.className = 'form__status ' + (ok ? 'is-ok' : 'is-error');
    status.hidden = false;
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    submit.disabled = true;
    submit.innerHTML = '<span>Enviando…</span>';
    status.hidden = true;

    fetch(form.action, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(Object.fromEntries(new FormData(form)))
    })
      .then(function (res) {
        return res.json().then(function (data) { return { ok: res.ok && data.success !== false, data: data }; });
      })
      .then(function (r) {
        if (r.ok) {
          form.reset();
          mostrarEstado(true, '¡Gracias! Recibimos tu mensaje y te respondemos a la brevedad.');
          submit.innerHTML = '<span>Mensaje enviado</span>';
        } else {
          mostrarEstado(false, (r.data && r.data.message) || 'No pudimos enviar el mensaje. Probá de nuevo o escribinos por WhatsApp.');
          submit.disabled = false;
          submit.innerHTML = submitHtml;
        }
      })
      .catch(function () {
        mostrarEstado(false, 'No pudimos enviar el mensaje. Probá de nuevo o escribinos por WhatsApp.');
        submit.disabled = false;
        submit.innerHTML = submitHtml;
      });
  });

  if (!('IntersectionObserver' in window)) return;
  root.classList.add('js');
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
})();
