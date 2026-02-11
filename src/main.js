import './style.css'

// JavaScript for mobile menu toggle or other interactions can go here
console.log('Abuna Ginde Beret Woreda site loaded');

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

// Parallax Effect for Hero Section
document.addEventListener('mousemove', (e) => {
  const blobs = document.querySelectorAll('.animate-blob');
  const floatingBadges = document.querySelectorAll('.animate-float, .animate-float-delayed');

  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;

  blobs.forEach((blob, index) => {
    const speed = (index + 1) * 20; // Different speeds for depth
    const xOffset = (x - 0.5) * speed;
    const yOffset = (y - 0.5) * speed;
    blob.style.transform = `translate(${xOffset}px, ${yOffset}px) scale(${1 + (index * 0.1)})`;
  });

  floatingBadges.forEach((badge, index) => {
    const speed = (index + 1) * 10;
    const xOffset = (x - 0.5) * speed;
    const yOffset = (y - 0.5) * speed;
    // Maintain the float animation by adding to the transform, requires careful handling or just subtle shifts
    // For simplicity, we'll apply a slight tilt effect to the container perspective if possible, 
    // or just move these elements slightly.
    // Actually, let's keep it simple to avoid conflicting with CSS animations:
    // shifting the background is safer. 
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

// Scroll Reveal Animation (Intersection Observer)
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target); // Reveal only once
    }
  });
}, {
  root: null,
  threshold: 0.15, // Trigger when 15% of the element is visible
  rootMargin: "0px"
});

revealElements.forEach(el => revealObserver.observe(el));


// 3D Card Tilt Effect
const cards = document.querySelectorAll('.hover-card-3d');

cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10; // Max 10deg rotation
    const rotateY = ((x - centerX) / centerX) * 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
  });
});

// --- Project Modal Logic ---
const projectData = {
  oms: {
    title: "Office Management System",
    status: "Halted",
    statusColor: "bg-red-500",
    date: "2026-02-19 - 2026-03-25",
    budget: "25,000 ETB",
    beneficiaries: "N/A",
    category: "General",
    percent: "0%",
    progressWidth: "0%",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    description: "An Office Management System (OMS) is a comprehensive software solution designed to automate, organize, and streamline the daily administrative and operational tasks of a modern office environment. Its primary purpose is to enhance productivity, improve communication, manage resources efficiently, and provide a centralized platform for all office activities.",
    milestones: [
      { date: "2026-02-19 - 2026-03-25", text: "Project Initialization" }
    ]
  },
  sms: {
    title: "School Management System",
    status: "In Progress",
    statusColor: "bg-blue-500",
    date: "2025-11-30 - 2026-06-30",
    budget: "20,000 ETB",
    beneficiaries: "12 Schools",
    category: "Education",
    percent: "30%",
    progressWidth: "30%",
    img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800",
    description: "The AI-Powered Attendance Tracking System is an intelligent solution designed to automate and streamline the process of monitoring student and staff attendance in rural schools. By leveraging facial recognition and real-time data analysis, the system aims to reduce absenteeism and improve educational outcomes.",
    milestones: [
      { date: "2025-11-30", text: "Environment Setup" },
      { date: "2026-01-15", text: "Database Design Completed" },
      { date: "2026-02-28", text: "Core Module Dev (Current)" }
    ]
  }
};

const modal = document.getElementById('project-modal');
const modalContainer = document.getElementById('modal-container');
const modalCloseBtn = document.getElementById('modal-close-btn');
const modalBackdrop = document.getElementById('modal-backdrop');

window.openProjectModal = function (id) {
  const data = projectData[id];
  if (!data || !modal) return;

  // Fill content
  document.getElementById('modal-title').innerText = data.title;
  document.getElementById('modal-status').innerText = data.status;
  document.getElementById('modal-status').className = `inline-block px-3 py-1 text-white text-[10px] font-black uppercase tracking-tighter rounded-md mb-4 shadow-lg ${data.statusColor}`;
  document.getElementById('modal-date').innerText = data.date;
  document.getElementById('modal-budget').innerText = data.budget;
  document.getElementById('modal-beneficiaries').innerText = data.beneficiaries;
  document.getElementById('modal-status-text').innerText = data.status;
  document.getElementById('modal-category').innerText = data.category;
  document.getElementById('modal-percent').innerText = data.percent;
  document.getElementById('modal-progress-bar').style.width = data.progressWidth;
  document.getElementById('modal-desc').innerText = data.description;
  document.getElementById('modal-img').src = data.img;

  // Milestones
  const milestonesList = document.getElementById('modal-milestones');
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

  // Show modal
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

  // Update Toggle Button label
  if (langLabel) {
    langLabel.innerText = lang === 'am' ? 'AM / OM' : 'OM / AM';
  }
}

function toggleLanguage() {
  currentLang = currentLang === 'am' ? 'om' : 'am';
  localStorage.setItem('preferredLang', currentLang);
  applyLanguage(currentLang);
}

if (langToggleDesktop) {
  langToggleDesktop.addEventListener('click', toggleLanguage);
}

if (langToggleMobile) {
  langToggleMobile.addEventListener('click', toggleLanguage);
}

// Apply immediately on script load
applyLanguage(currentLang);
