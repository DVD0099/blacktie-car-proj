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

document.querySelector('#trackForm').addEventListener('submit', event => {
  event.preventDefault();
  const code = document.querySelector('#rideCode').value.trim();
  document.querySelector('#trackStatus').textContent = code
    ? 'Demo mode: connect this field to the live tracking provider before launch.'
    : 'Enter the reservation code from your confirmation message.';
});

document.querySelector('#bookingForm').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.checkValidity()) { form.reportValidity(); return; }
  document.querySelector('#bookingStatus').textContent = 'Thanks — your demo request is ready. A booking and payment provider can be connected here for launch.';
  form.querySelector('button[type="submit"]').textContent = 'Request received ✓';
});
