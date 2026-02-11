import './style.css'

// JavaScript for mobile menu toggle or other interactions can go here
console.log('Abuna Ginde Beret Woreda site loaded');

// Simple mobile menu toggle if needed
const menuButton = document.querySelector('header button');
const nav = document.querySelector('header nav');

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    nav.classList.toggle('hidden');
    nav.classList.toggle('flex');
    nav.classList.toggle('flex-col');
    nav.classList.toggle('absolute');
    nav.classList.toggle('top-20');
    nav.classList.toggle('left-0');
    nav.classList.toggle('w-full');
    nav.classList.toggle('bg-white');
    nav.classList.toggle('p-4');
    nav.classList.toggle('shadow-lg');
  });
}
