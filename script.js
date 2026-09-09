const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('#site-nav');
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  nav.classList.toggle('open', !open);
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

const dateField = document.querySelector('#date');
dateField.min = new Date().toISOString().split('T')[0];

document.querySelector('#bookingForm').addEventListener('submit', async event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.checkValidity()) { form.reportValidity(); return; }
  const status = document.querySelector('#bookingStatus');
  const submitButton = form.querySelector('button[type="submit"]');
  const originalButtonContent = submitButton.innerHTML;

  form.setAttribute('aria-busy', 'true');
  submitButton.disabled = true;
  submitButton.textContent = 'Sending request…';
  status.className = 'form-status';
  status.textContent = '';

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    });
    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      const message = result.errors?.map(error => error.message).join(' ') || 'Unable to send your request.';
      throw new Error(message);
    }

    form.reset();
    status.classList.add('success');
    status.textContent = 'Thank you. Your ride request was sent to Antonio. He will contact you to confirm availability and pricing.';
  } catch (error) {
    status.classList.add('error');
    status.textContent = `${error.message} Please try again or call Antonio at 215-595-5389.`;
  } finally {
    form.removeAttribute('aria-busy');
    submitButton.disabled = false;
    submitButton.innerHTML = originalButtonContent;
  }
});
