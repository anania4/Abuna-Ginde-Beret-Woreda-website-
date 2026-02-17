import './style.css'
import { fetchProjects, fetchNews, fetchSectors, fetchFAQs, fetchAdminMessage, fetchGlobalSettings, fetchKebeles, fetchGallery } from './api'

console.log('Abuna Ginde Beret Woreda site loaded');

// --- Global Data Store ---
let projectsCache = {};

// --- Helper: Format Date ---
function formatDate(dateStr) {
  if (!dateStr) return '';
  const opts = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateStr).toLocaleDateString('en-US', opts);
}

// --- Helper: Render Loading State ---
function renderLoading(containerId) {
  const container = document.getElementById(containerId);
  if (container) {
    container.innerHTML = `<div class="col-span-full flex justify-center py-10"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-woreda-green"></div></div>`;
  }
}

// --- Render Functions ---

async function renderAdminMessage() {
  const data = await fetchAdminMessage();
  if (!data) return;

  const nameEl = document.getElementById('admin-name');
  const roleEl = document.getElementById('admin-role');
  const msgEl = document.getElementById('admin-message');
  const avatarContainer = document.getElementById('admin-avatar-container');

  if (nameEl) nameEl.innerText = data.administratorName;
  if (roleEl) roleEl.innerText = data.role;
  if (msgEl) msgEl.innerText = `"${data.message}"`;

  // If there's an image, replace the avatar container content
  if (data.image && avatarContainer) {
    avatarContainer.innerHTML = `<img src="${data.image}" alt="${data.administratorName}" class="w-full h-full object-cover rounded-full">`;
    avatarContainer.classList.remove('bg-green-200', 'text-woreda-green'); // Remove placeholder styles if needed, or keep for fallback
  }
}

async function renderGlobalSettings() {
  const data = await fetchGlobalSettings();
  if (!data) return;

  // Footer text
  const footerTextEl = document.getElementById('footer-text');
  if (footerTextEl) footerTextEl.innerText = data.footerText;

  // We could also update stats here if we wanted strictly global settings to drive them, 
  // but stats are often hardcoded design elements or specialized components.
}

async function renderStats() {
  // Stats are currently hardcoded in HTML. 
  // If we fetch them from GlobalSettings, we would identify them by ID here.
  // For now, let's leave them or update specific ones if GlobalSettings has them.
  const data = await fetchGlobalSettings();
  if (!data) return;

  // Example: Update if we added IDs to stats numbers
  // document.getElementById('stat-residents').innerText = data.residentCount;
}

async function renderNews() {
  renderLoading('news-container');
  const news = await fetchNews();
  const container = document.getElementById('news-container');
  if (!container) return;

  if (news.length === 0) {
    container.innerHTML = `<p class="col-span-full text-center text-gray-500">No news updates available at the moment.</p>`;
    return;
  }

  container.innerHTML = news.map(item => `
    <article class="bg-gray-50/90 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 group hover-card-3d">
      <div class="h-48 bg-gray-200 overflow-hidden relative">
        ${item.img ? `<img src="${item.img}" alt="${item.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">` :
      `<div class="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-200">
          <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
        </div>`}
        <div class="absolute top-4 left-4 bg-woreda-green text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
          ${item.category}
        </div>
      </div>
      <div class="p-6">
        <div class="text-xs text-gray-500 mb-2">${formatDate(item.date)}</div>
        <h3 class="text-xl font-bold text-gray-900 mb-2 group-hover:text-woreda-green transition-colors line-clamp-2">
          ${item.title}
        </h3>
        <p class="text-gray-600 line-clamp-3">
          ${item.content ? item.content.substring(0, 100) + '...' : ''}
        </p>
        <a href="#" class="inline-block mt-4 text-woreda-blue font-medium hover:underline">Read more &rarr;</a>
      </div>
    </article>
  `).join('');

  // Re-initialize 3D hover effect for new elements
  init3DCardEffect();
}

async function renderProjects() {
  renderLoading('projects-container');
  const projects = await fetchProjects();
  const container = document.getElementById('projects-container');
  if (!container) return;

  if (projects.length === 0) {
    container.innerHTML = `<p class="col-span-full text-center text-gray-500">No development projects to display.</p>`;
    return;
  }

  // Cache/Store for Modal
  projects.forEach(p => projectsCache[p.id] = p);
  projects.forEach(p => projectsCache[p.documentId] = p); // Store by both IDs just in case

  container.innerHTML = projects.map(p => `
    <div class="group relative bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-100 p-1 hover:border-woreda-green/30 transition-all hover-card-3d overflow-hidden shadow-lg shadow-gray-200/50">
      <div class="h-64 bg-gray-100 rounded-2xl overflow-hidden relative">
        <img src="${p.img || 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800'}" 
             alt="${p.title}" 
             class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80">
        <div class="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
        <div class="absolute top-4 left-4 px-3 py-1 ${p.statusColor || 'bg-blue-500'} text-white text-[10px] font-black uppercase tracking-tighter rounded-md">
          ${p.status}
        </div>
      </div>
      <div class="p-8">
        <h3 class="text-2xl font-bold text-gray-900 mb-3 line-clamp-1">${p.title}</h3>
        <p class="text-gray-600 text-sm mb-8 line-clamp-2">${p.description}</p>

        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-bold text-gray-400 uppercase tracking-widest">Progress</span>
          <span class="text-sm font-black text-woreda-green">${p.percent}</span>
        </div>
        <div class="w-full bg-gray-100 h-2 rounded-full mb-8 overflow-hidden">
          <div class="bg-woreda-green h-full rounded-full shadow-[0_0_15px_rgba(34,197,94,0.3)]" style="width: ${p.progressWidth}"></div>
        </div>

        <button onclick="openProjectModal('${p.documentId}')" 
          class="w-full py-4 bg-gray-900 hover:bg-black text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 group-hover:shadow-[0_10px_20px_rgba(0,0,0,0.1)]">
          View Project Details
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>
    </div>
  `).join('');

  init3DCardEffect();
}

async function renderSectors() {
  const sectors = await fetchSectors();

  // Desktop Container
  const desktopContainer = document.getElementById('sectors-desktop-container');
  if (desktopContainer && sectors.length > 0) {
    // Clear existing hardcoded items if any, though we might want to keep the "murder board" layout logic.
    // The "murder board" layout relies on specific absolute positioning classes (top-%, left-%, rotate).
    // To make this dynamic and look good requires a smart layout algorithm or pre-defined slots.
    // For now, let's keep the hardcoded HTML for the "murder board" visual effect as it's complex to generate dynamically without ruining the design.
    // However, we CAN update the Mobile Container list easily.
  }

  // Mobile Container
  const mobileContainer = document.getElementById('sectors-mobile-container');
  if (mobileContainer && sectors.length > 0) {
    mobileContainer.innerHTML = sectors.map((s, index) => `
      <div class="p-4 bg-white rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
        <div class="w-8 h-8 bg-woreda-green/10 rounded-lg flex items-center justify-center text-woreda-green text-xs font-bold">
          ${(index + 1).toString().padStart(2, '0')}
        </div>
        <span class="font-bold text-gray-800">${s.name}</span>
      </div>
    `).join('') + `
      <div class="p-4 bg-gray-50/50 rounded-xl border border-dashed border-gray-200 text-center col-span-full">
        <span class="text-sm text-gray-500 font-medium">And more...</span>
      </div>
    `;
  }
}

async function renderFAQs() {
  const faqs = await fetchFAQs();
  const container = document.getElementById('faq-container');
  if (!container || faqs.length === 0) return;

  container.innerHTML = faqs.map(faq => `
    <div class="bg-white rounded-lg shadow-sm p-4 cursor-pointer hover:bg-gray-50" onclick="this.querySelector('p').classList.toggle('hidden'); this.querySelector('svg').classList.toggle('rotate-180')">
      <h3 class="font-bold text-gray-900 flex justify-between items-center select-none">
        ${faq.question}
        <svg class="w-5 h-5 text-gray-400 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </h3>
      <p class="text-gray-600 mt-2 text-sm hidden transition-all duration-300">
        ${faq.answer}
      </p>
    </div>
  `).join('');
}

async function renderGallery() {
  const gallery = await fetchGallery();
  const container = document.getElementById('gallery-grid');
  if (!container) return;

  if (gallery.length === 0) {
    container.innerHTML = `
      <div class="col-span-full text-center py-10">
        <p class="text-gray-500">No gallery images available yet.</p>
        <p class="text-sm text-gray-400 mt-2">Add photos in Strapi admin to populate the gallery.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = gallery.map(item => `
    <div class="aspect-square bg-gray-200 rounded-lg overflow-hidden relative group cursor-pointer hover-card-3d">
      ${item.image ? 
        `<img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">` :
        `<div class="absolute inset-0 bg-gray-400 flex items-center justify-center text-white font-medium">${item.category}</div>`
      }
      <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-4">
        <p class="font-bold text-lg mb-1">${item.title}</p>
        ${item.description ? `<p class="text-sm text-center line-clamp-2">${item.description}</p>` : ''}
        <span class="mt-2 text-xs bg-white/20 px-3 py-1 rounded-full">${item.category}</span>
      </div>
    </div>
  `).join('');

  // Re-initialize 3D hover effect for gallery items
  init3DCardEffect();
}

async function renderEvents() {
  const events = await fetchEvents();
  const container = document.getElementById('event-card');
  if (!container) return;

  // Filter for upcoming events only
  const upcomingEvents = events.filter(e => e.status === 'Upcoming');
  
  if (upcomingEvents.length === 0) {
    container.innerHTML = `
      <div class="bg-white rounded-2xl shadow-lg p-8 text-center">
        <p class="text-gray-500">No upcoming events at the moment.</p>
        <p class="text-sm text-gray-400 mt-2">Check back soon for community events!</p>
      </div>
    `;
    return;
  }

  // Show the first upcoming event
  const event = upcomingEvents[0];
  const eventDate = new Date(event.eventDate);
  const day = eventDate.getDate();
  const month = eventDate.toLocaleDateString('en-US', { month: 'long' });
  const year = eventDate.getFullYear();

  container.innerHTML = `
    <div class="md:w-1/3 bg-woreda-orange text-white p-8 flex flex-col items-center justify-center text-center">
      <div class="text-5xl font-bold mb-2">${day}</div>
      <div class="text-xl uppercase tracking-wider mb-4">${month}</div>
      <div class="text-sm opacity-80">${year}</div>
    </div>
    <div class="p-8 md:w-2/3">
      <div class="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full mb-4">
        ${event.category}
      </div>
      <h3 class="text-2xl font-bold text-gray-900 mb-2">${event.title}</h3>
      <p class="text-gray-600 mb-6">${event.description ? event.description.substring(0, 200) + '...' : ''}</p>
      <div class="flex items-center text-sm text-gray-500 mb-6">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
        </svg>
        ${event.location}
      </div>
      <button class="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-black transition-colors">Event Details</button>
    </div>
  `;
}

// --- Initialization ---

async function initData() {
  await Promise.all([
    renderAdminMessage(),
    renderGlobalSettings(),
    renderNews(),
    renderProjects(),
    renderSectors(),
    renderFAQs(),
    renderGallery(),
    renderEvents()
  ]);

  // Re-apply language settings after dynamic content load
  const savedLang = localStorage.getItem('preferredLang') || 'am';
  applyLanguage(savedLang);
}

// Start fetching data
initData();

// --- Existing Logic (Navigation, Animations, Modal, Language) ---

// Mobile Menu Logic
const mobileBtn = document.getElementById('mobile-menu-btn');
const closeBtn = document.getElementById('close-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

function toggleMenu() {
  if (mobileMenu) {
    mobileMenu.classList.toggle('translate-x-full');
  }
}

if (mobileBtn && closeBtn && mobileMenu) {
  mobileBtn.addEventListener('click', toggleMenu);
  closeBtn.addEventListener('click', toggleMenu);
  mobileLinks.forEach(link => {
    link.addEventListener('click', toggleMenu);
  });
}

// Parallax Effect
document.addEventListener('mousemove', (e) => {
  const blobs = document.querySelectorAll('.animate-blob');
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;

  blobs.forEach((blob, index) => {
    const speed = (index + 1) * 20;
    const xOffset = (x - 0.5) * speed;
    const yOffset = (y - 0.5) * speed;
    blob.style.transform = `translate(${xOffset}px, ${yOffset}px) scale(${1 + (index * 0.1)})`;
  });
});

// Scroll Header Effect
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('bg-white/90', 'shadow-md', 'backdrop-blur-md');
    header.classList.remove('bg-transparent', 'py-4');
  } else {
    header.classList.remove('bg-white/90', 'shadow-md', 'backdrop-blur-md');
    header.classList.add('bg-transparent', 'py-4');
  }
});

// Scroll Reveal
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealElements.forEach(el => revealObserver.observe(el));

// 3D Card Tilt Effect (Wrapped in function for re-init)
function init3DCardEffect() {
  const cards = document.querySelectorAll('.hover-card-3d');
  cards.forEach(card => {
    // Remove old listeners to prevent duplicates if called multiple times (simple way: clone node? No, let's just add if not present or rely on simple overwrite if possible. 
    // Better: keep it simple. Browsers handle multiple listeners fine, but best to avoid.
    // For this demo, just adding is okay as we run it after render.)

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
  });
}
init3DCardEffect();

// --- Project Modal Logic ---
const modal = document.getElementById('project-modal');
const modalContainer = document.getElementById('modal-container');
const modalCloseBtn = document.getElementById('modal-close-btn');
const modalBackdrop = document.getElementById('modal-backdrop');

window.openProjectModal = function (id) {
  const data = projectsCache[id]; // Fetch from global cache
  if (!data || !modal) return;

  document.getElementById('modal-title').innerText = data.title;
  const statusEl = document.getElementById('modal-status');
  statusEl.innerText = data.status;
  statusEl.className = `inline-block px-3 py-1 text-white text-[10px] font-black uppercase tracking-tighter rounded-md mb-4 shadow-lg ${data.statusColor}`;

  document.getElementById('modal-date').innerText = data.date;
  document.getElementById('modal-budget').innerText = data.budget;
  document.getElementById('modal-beneficiaries').innerText = data.beneficiaries;
  document.getElementById('modal-status-text').innerText = data.status;
  document.getElementById('modal-category').innerText = data.category;
  document.getElementById('modal-percent').innerText = data.percent;
  document.getElementById('modal-progress-bar').style.width = data.progressWidth;
  // Use description if available, else standard text
  // document.getElementById('modal-desc').innerText = data.description; 
  // No explicit desc ID in partial HTML view, need to ensure HTML has it or add it.

  const imgEl = document.getElementById('modal-img');
  if (imgEl && data.img) imgEl.src = data.img;

  // Milestones (Assuming HTML container exists, referenced in previous code)
  // Need to ensure the HTML structure for milestones exists in the modal markup.
  // The previous main.js had code for it.
  // "milestonesList" was "modal-milestones"

  // NOTE: I need to verify modal HTML structure for milestones ID.
  // Assuming it is 'modal-milestones' as per previous main.js read.
  const milestonesList = document.getElementById('modal-milestones');
  // Wait, I didn't see 'modal-milestones' in the index.html snippet (stopped at 1600).
  // Assuming it exists or I should add check.

  if (milestonesList && data.milestones) {
    milestonesList.innerHTML = '';
    data.milestones.forEach(m => {
      const div = document.createElement('div');
      div.className = 'flex gap-4 items-start';
      div.innerHTML = `
        <div class="w-2 h-2 rounded-full bg-woreda-green mt-2 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
        <div class="text-left">
            <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest">${m.date}</p>
            <p class="text-sm text-gray-900 font-medium">${m.text}</p>
        </div>
      `;
      milestonesList.appendChild(div);
    });
  }

  // Show
  modal.classList.remove('hidden');
  setTimeout(() => {
    modalContainer.classList.remove('scale-95', 'opacity-0');
    modalContainer.classList.add('scale-100', 'opacity-100');
  }, 10);
};

window.closeProjectModal = function () {
  if (!modal) return;
  modalContainer.classList.add('scale-95', 'opacity-0');
  modalContainer.classList.remove('scale-100', 'opacity-100');
  setTimeout(() => {
    modal.classList.add('hidden');
  }, 300);
};

if (modalCloseBtn) modalCloseBtn.onclick = window.closeProjectModal;
if (modalBackdrop) modalBackdrop.onclick = window.closeProjectModal;

// --- Language Toggle Logic ---
const langToggleDesktop = document.getElementById('lang-toggle-desktop');
const langToggleMobile = document.getElementById('lang-toggle-mobile');
const langLabel = document.getElementById('lang-label');

let currentLang = localStorage.getItem('preferredLang') || 'am';

function applyLanguage(lang) {
  const elements = document.querySelectorAll('.lang-switchable');
  elements.forEach(el => {
    const text = el.getAttribute(`data-${lang}`);
    if (text) {
      el.innerText = text;
    }
  });

  if (langLabel) {
    langLabel.innerText = lang === 'am' ? 'AM / OM' : 'OM / AM';
  }
}

function toggleLanguage() {
  currentLang = currentLang === 'am' ? 'om' : 'am';
  localStorage.setItem('preferredLang', currentLang);
  applyLanguage(currentLang);
}

if (langToggleDesktop) langToggleDesktop.addEventListener('click', toggleLanguage);
if (langToggleMobile) langToggleMobile.addEventListener('click', toggleLanguage);

applyLanguage(currentLang);
