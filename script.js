
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modal-content");

function openProject(id){
  const p = PROJECTS.find(x => x.id === id);
  if(!p) return;
  modalContent.innerHTML = `
    <div class="case-kicker">${p.num} / ${p.category.toUpperCase()}</div>
    <h2 class="case-title">${p.title}</h2>
    <p class="case-summary">${p.summary}</p>
    <div class="case-tags">${p.tags.map(t => `<span>${t}</span>`).join("")}</div>
    <div class="case-grid">
      ${p.details.map(([label, detail]) => `
        <div class="case-item">
          <h4>${label}</h4>
          <p>${detail}</p>
        </div>`).join("")}
    </div>
    <div class="case-links">
      <a class="button primary" href="${p.github}" target="_blank" rel="noopener">GitHub ↗</a>
      <a class="button ghost" href="projects/${p.folder}/README.md" target="_blank" rel="noopener">Project README ↗</a>
    </div>
  `;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden","false");
  document.body.style.overflow="hidden";
}

function closeProject(){
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden","true");
  document.body.style.overflow="";
}

document.querySelectorAll(".project-card").forEach(card=>{
  card.addEventListener("click",()=>openProject(card.dataset.id));
});

document.querySelectorAll("[data-close]").forEach(el=>{
  el.addEventListener("click",closeProject);
});

document.addEventListener("keydown",e=>{
  if(e.key==="Escape") closeProject();
});

document.querySelectorAll(".filter").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;
    document.querySelectorAll(".project-card").forEach(card=>{
      card.style.display = (filter==="all" || card.dataset.priority===filter) ? "" : "none";
    });
  });
});
