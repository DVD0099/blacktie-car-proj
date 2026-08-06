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

document.querySelector('#bookingForm').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.checkValidity()) { form.reportValidity(); return; }
  const fields = Object.fromEntries(new FormData(form).entries());
  const subject = encodeURIComponent(`Ride request from ${fields.name}`);
  const body = encodeURIComponent([
    `Name: ${fields.name}`,
    `Phone: ${fields.phone}`,
    `Email: ${fields.email}`,
    `Service: ${fields.service}`,
    `Pickup: ${fields.pickup}`,
    `Destination: ${fields.destination}`,
    `Date: ${fields.date}`,
    `Pickup time: ${fields.time}`
  ].join('\n'));
  document.querySelector('#bookingStatus').textContent = 'Opening your email app with the request ready to send…';
  window.location.href = `mailto:1BlackTieLuxury@gmail.com?subject=${subject}&body=${body}`;
});
