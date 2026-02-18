(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function t(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(o){if(o.ep)return;o.ep=!0;const a=t(o);fetch(o.href,a)}})();const B="http://localhost:1337";async function i(n,e={}){const t=new URL(`/api${n}`,B);Object.entries(e).forEach(([r,o])=>{o!=null&&t.searchParams.set(r,String(o))});try{const r=await fetch(t.toString());if(!r.ok)throw new Error(`Strapi API error: ${r.status}`);return await r.json()}catch(r){return console.error(`[Strapi] Failed to fetch ${n}:`,r),null}}function p(n){if(!n)return"";const e=n?.url||n?.data?.attributes?.url||n?.data?.url||"";return e.startsWith("http")?e:`${B}${e}`}async function S(){const n=await i("/projects",{populate:"*"});return n?.data?n.data.map(e=>{const t=e.attributes||e;return{id:e.id,documentId:e.documentId||e.id,title:t.title,status:t.status||"Unknown",statusColor:t.statusColor||"bg-blue-500",date:t.dateRange||"",budget:t.budget||"N/A",beneficiaries:t.beneficiaries||"N/A",category:t.category||"General",percent:t.percent?`${t.percent}%`:"0%",progressWidth:t.percent?`${t.percent}%`:"0%",img:p(t.img),description:t.description||"",milestones:(t.milestones||[]).map(r=>({date:r.date||"",text:r.text||""}))}}):[]}async function C(){const n=await i("/news-articles",{populate:"*","sort[0]":"date:desc"});return n?.data?n.data.map(e=>{const t=e.attributes||e;return{id:e.id,title:t.title,content:t.content||"",date:t.date||"",category:t.category||"",img:p(t.img)}}):[]}async function A(){const n=await i("/sectors",{populate:"*","sort[0]":"order:asc"});return n?.data?n.data.map(e=>{const t=e.attributes||e;return{id:e.id,name:t.name,icon:t.icon||"🏛️",category:t.category||"government",description:t.description||""}}):[]}async function N(){const n=await i("/faqs",{"sort[0]":"order:asc"});return n?.data?n.data.map(e=>{const t=e.attributes||e;return{id:e.id,question:t.question,answer:t.answer}}):[]}async function P(){const n=await i("/admin-message",{populate:"*"});if(!n?.data)return null;const e=n.data.attributes||n.data;return{title:e.title||"",administratorName:e.administratorName||"",role:e.role||"",message:e.message||"",image:p(e.image)}}async function H(){const n=await i("/global-setting",{populate:"*"});if(!n?.data)return null;const e=n.data.attributes||n.data;return{siteName:e.siteName||"Abuna Ginde Beret Woreda",residentCount:e.residentCount||"150k+",agriculturePercentage:e.agriculturePercentage||"90%",schoolCount:e.schoolCount||"12",areaSize:e.areaSize||"",footerText:e.footerText||""}}async function q(){const n=await i("/galleries",{populate:"*","sort[0]":"order:asc"});return n?.data?n.data.map(e=>{const t=e.attributes||e;return{id:e.id,title:t.title,description:t.description||"",category:t.category||"Community",image:p(t.image),order:t.order||0}}):[]}console.log("Abuna Ginde Beret Woreda site loaded");let h={};function D(n){if(!n)return"";const e={year:"numeric",month:"long",day:"numeric"};return new Date(n).toLocaleDateString("en-US",e)}function j(n){const e=document.getElementById(n);e&&(e.innerHTML='<div class="col-span-full flex justify-center py-10"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-woreda-green"></div></div>')}async function O(){const n=await P();if(!n)return;const e=document.getElementById("admin-name"),t=document.getElementById("admin-role"),r=document.getElementById("admin-message"),o=document.getElementById("admin-avatar-container");e&&(e.innerText=n.administratorName),t&&(t.innerText=n.role),r&&(r.innerText=`"${n.message}"`),n.image&&o&&(o.innerHTML=`<img src="${n.image}" alt="${n.administratorName}" class="w-full h-full object-cover rounded-full">`,o.classList.remove("bg-green-200","text-woreda-green"))}async function _(){const n=await H();if(!n)return;const e=document.getElementById("footer-text");e&&(e.innerText=n.footerText)}async function G(){j("news-container");const n=await C(),e=document.getElementById("news-container");if(e){if(n.length===0){e.innerHTML='<p class="col-span-full text-center text-gray-500">No news updates available at the moment.</p>';return}e.innerHTML=n.map(t=>`
    <article class="bg-gray-50/90 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 group hover-card-3d">
      <div class="h-48 bg-gray-200 overflow-hidden relative">
        ${t.img?`<img src="${t.img}" alt="${t.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">`:`<div class="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-200">
          <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
        </div>`}
        <div class="absolute top-4 left-4 bg-woreda-green text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
          ${t.category}
        </div>
      </div>
      <div class="p-6">
        <div class="text-xs text-gray-500 mb-2">${D(t.date)}</div>
        <h3 class="text-xl font-bold text-gray-900 mb-2 group-hover:text-woreda-green transition-colors line-clamp-2">
          ${t.title}
        </h3>
        <p class="text-gray-600 line-clamp-3">
          ${t.content?t.content.substring(0,100)+"...":""}
        </p>
        <a href="#" class="inline-block mt-4 text-woreda-blue font-medium hover:underline">Read more &rarr;</a>
      </div>
    </article>
  `).join(""),f()}}async function Y(){j("projects-container");const n=await S(),e=document.getElementById("projects-container");if(e){if(n.length===0){e.innerHTML='<p class="col-span-full text-center text-gray-500">No development projects to display.</p>';return}n.forEach(t=>h[t.id]=t),n.forEach(t=>h[t.documentId]=t),e.innerHTML=n.map(t=>`
    <div class="group relative bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-100 p-1 hover:border-woreda-green/30 transition-all hover-card-3d overflow-hidden shadow-lg shadow-gray-200/50">
      <div class="h-64 bg-gray-100 rounded-2xl overflow-hidden relative">
        <img src="${t.img||"https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800"}" 
             alt="${t.title}" 
             class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80">
        <div class="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
        <div class="absolute top-4 left-4 px-3 py-1 ${t.statusColor||"bg-blue-500"} text-white text-[10px] font-black uppercase tracking-tighter rounded-md">
          ${t.status}
        </div>
      </div>
      <div class="p-8">
        <h3 class="text-2xl font-bold text-gray-900 mb-3 line-clamp-1">${t.title}</h3>
        <p class="text-gray-600 text-sm mb-8 line-clamp-2">${t.description}</p>

        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-bold text-gray-400 uppercase tracking-widest">Progress</span>
          <span class="text-sm font-black text-woreda-green">${t.percent}</span>
        </div>
        <div class="w-full bg-gray-100 h-2 rounded-full mb-8 overflow-hidden">
          <div class="bg-woreda-green h-full rounded-full shadow-[0_0_15px_rgba(34,197,94,0.3)]" style="width: ${t.progressWidth}"></div>
        </div>

        <button onclick="openProjectModal('${t.documentId}')" 
          class="w-full py-4 bg-gray-900 hover:bg-black text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 group-hover:shadow-[0_10px_20px_rgba(0,0,0,0.1)]">
          View Project Details
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>
    </div>
  `).join(""),f()}}async function U(){const n=await A();document.getElementById("sectors-desktop-container")&&n.length>0;const t=document.getElementById("sectors-mobile-container");t&&n.length>0&&(t.innerHTML=n.map((r,o)=>`
      <div class="p-4 bg-white rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
        <div class="w-8 h-8 bg-woreda-green/10 rounded-lg flex items-center justify-center text-woreda-green text-xs font-bold">
          ${(o+1).toString().padStart(2,"0")}
        </div>
        <span class="font-bold text-gray-800">${r.name}</span>
      </div>
    `).join("")+`
      <div class="p-4 bg-gray-50/50 rounded-xl border border-dashed border-gray-200 text-center col-span-full">
        <span class="text-sm text-gray-500 font-medium">And more...</span>
      </div>
    `)}async function W(){const n=await N(),e=document.getElementById("faq-container");!e||n.length===0||(e.innerHTML=n.map(t=>`
    <div class="bg-white rounded-lg shadow-sm p-4 cursor-pointer hover:bg-gray-50" onclick="this.querySelector('p').classList.toggle('hidden'); this.querySelector('svg').classList.toggle('rotate-180')">
      <h3 class="font-bold text-gray-900 flex justify-between items-center select-none">
        ${t.question}
        <svg class="w-5 h-5 text-gray-400 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </h3>
      <p class="text-gray-600 mt-2 text-sm hidden transition-all duration-300">
        ${t.answer}
      </p>
    </div>
  `).join(""))}async function R(){const n=await q(),e=document.getElementById("gallery-grid");if(e){if(n.length===0){e.innerHTML=`
      <div class="col-span-full text-center py-10">
        <p class="text-gray-500">No gallery images available yet.</p>
        <p class="text-sm text-gray-400 mt-2">Add photos in Strapi admin to populate the gallery.</p>
      </div>
    `;return}e.innerHTML=n.map(t=>`
    <div class="aspect-square bg-gray-200 rounded-lg overflow-hidden relative group cursor-pointer hover-card-3d">
      ${t.image?`<img src="${t.image}" alt="${t.title}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">`:`<div class="absolute inset-0 bg-gray-400 flex items-center justify-center text-white font-medium">${t.category}</div>`}
      <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-4">
        <p class="font-bold text-lg mb-1">${t.title}</p>
        ${t.description?`<p class="text-sm text-center line-clamp-2">${t.description}</p>`:""}
        <span class="mt-2 text-xs bg-white/20 px-3 py-1 rounded-full">${t.category}</span>
      </div>
    </div>
  `).join(""),f()}}async function X(){const n=await fetchEvents(),e=document.getElementById("event-card");if(!e)return;const t=n.filter(c=>c.status==="Upcoming");if(t.length===0){e.innerHTML=`
      <div class="bg-white rounded-2xl shadow-lg p-8 text-center">
        <p class="text-gray-500">No upcoming events at the moment.</p>
        <p class="text-sm text-gray-400 mt-2">Check back soon for community events!</p>
      </div>
    `;return}const r=t[0],o=new Date(r.eventDate),a=o.getDate(),s=o.toLocaleDateString("en-US",{month:"long"}),l=o.getFullYear();e.innerHTML=`
    <div class="md:w-1/3 bg-woreda-orange text-white p-8 flex flex-col items-center justify-center text-center">
      <div class="text-5xl font-bold mb-2">${a}</div>
      <div class="text-xl uppercase tracking-wider mb-4">${s}</div>
      <div class="text-sm opacity-80">${l}</div>
    </div>
    <div class="p-8 md:w-2/3">
      <div class="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full mb-4">
        ${r.category}
      </div>
      <h3 class="text-2xl font-bold text-gray-900 mb-2">${r.title}</h3>
      <p class="text-gray-600 mb-6">${r.description?r.description.substring(0,200)+"...":""}</p>
      <div class="flex items-center text-sm text-gray-500 mb-6">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
        </svg>
        ${r.location}
      </div>
      <button class="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-black transition-colors">Event Details</button>
    </div>
  `}async function z(){await Promise.all([O(),_(),G(),Y(),U(),W(),R(),X()]);const n=localStorage.getItem("preferredLang")||"am";v(n)}z();const x=document.getElementById("mobile-menu-btn"),w=document.getElementById("close-menu-btn"),b=document.getElementById("mobile-menu"),F=document.querySelectorAll(".mobile-link");function y(){b&&b.classList.toggle("translate-x-full")}x&&w&&b&&(x.addEventListener("click",y),w.addEventListener("click",y),F.forEach(n=>{n.addEventListener("click",y)}));document.addEventListener("mousemove",n=>{const e=document.querySelectorAll(".animate-blob"),t=n.clientX/window.innerWidth,r=n.clientY/window.innerHeight;e.forEach((o,a)=>{const s=(a+1)*20,l=(t-.5)*s,c=(r-.5)*s;o.style.transform=`translate(${l}px, ${c}px) scale(${1+a*.1})`})});const u=document.querySelector("header");window.addEventListener("scroll",()=>{window.scrollY>50?(u.classList.add("bg-white/90","shadow-md","backdrop-blur-md"),u.classList.remove("bg-transparent","py-4")):(u.classList.remove("bg-white/90","shadow-md","backdrop-blur-md"),u.classList.add("bg-transparent","py-4"))});const Q=document.querySelectorAll(".reveal"),V=new IntersectionObserver((n,e)=>{n.forEach(t=>{t.isIntersecting&&(t.target.classList.add("active"),e.unobserve(t.target))})},{threshold:.15});Q.forEach(n=>V.observe(n));function f(){document.querySelectorAll(".hover-card-3d").forEach(e=>{e.addEventListener("mousemove",t=>{const r=e.getBoundingClientRect(),o=t.clientX-r.left,a=t.clientY-r.top,s=r.width/2,l=r.height/2,c=(a-l)/l*-10,M=(o-s)/s*10;e.style.transform=`perspective(1000px) rotateX(${c}deg) rotateY(${M}deg) scale(1.05)`}),e.addEventListener("mouseleave",()=>{e.style.transform="perspective(1000px) rotateX(0) rotateY(0) scale(1)"})})}f();const g=document.getElementById("project-modal"),m=document.getElementById("modal-container"),E=document.getElementById("modal-close-btn"),L=document.getElementById("modal-backdrop");window.openProjectModal=function(n){const e=h[n];if(!e||!g)return;document.getElementById("modal-title").innerText=e.title;const t=document.getElementById("modal-status");t.innerText=e.status,t.className=`inline-block px-3 py-1 text-white text-[10px] font-black uppercase tracking-tighter rounded-md mb-4 shadow-lg ${e.statusColor}`,document.getElementById("modal-date").innerText=e.date,document.getElementById("modal-budget").innerText=e.budget,document.getElementById("modal-beneficiaries").innerText=e.beneficiaries,document.getElementById("modal-status-text").innerText=e.status,document.getElementById("modal-category").innerText=e.category,document.getElementById("modal-percent").innerText=e.percent,document.getElementById("modal-progress-bar").style.width=e.progressWidth;const r=document.getElementById("modal-img");r&&e.img&&(r.src=e.img);const o=document.getElementById("modal-milestones");o&&e.milestones&&(o.innerHTML="",e.milestones.forEach(a=>{const s=document.createElement("div");s.className="flex gap-4 items-start",s.innerHTML=`
        <div class="w-2 h-2 rounded-full bg-woreda-green mt-2 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
        <div class="text-left">
            <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest">${a.date}</p>
            <p class="text-sm text-gray-900 font-medium">${a.text}</p>
        </div>
      `,o.appendChild(s)})),g.classList.remove("hidden"),setTimeout(()=>{m.classList.remove("scale-95","opacity-0"),m.classList.add("scale-100","opacity-100")},10)};window.closeProjectModal=function(){g&&(m.classList.add("scale-95","opacity-0"),m.classList.remove("scale-100","opacity-100"),setTimeout(()=>{g.classList.add("hidden")},300))};E&&(E.onclick=window.closeProjectModal);L&&(L.onclick=window.closeProjectModal);const k=document.getElementById("lang-toggle-desktop"),$=document.getElementById("lang-toggle-mobile"),I=document.getElementById("lang-label");let d=localStorage.getItem("preferredLang")||"am";function v(n){document.querySelectorAll(".lang-switchable").forEach(t=>{const r=t.getAttribute(`data-${n}`);r&&(t.innerText=r)}),I&&(I.innerText=n==="am"?"AM / OM":"OM / AM")}function T(){d=d==="am"?"om":"am",localStorage.setItem("preferredLang",d),v(d)}k&&k.addEventListener("click",T);$&&$.addEventListener("click",T);v(d);
