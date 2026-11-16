// Portfolio Projects Data (Real Business Examples)
const portfolioProjects = [
  {
    id: 1,
    title: "Smileo Dental Clinic",
    category: "business",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=800&auto=format&fit=crop",
    description: "A modern, sleek website designed for a dental clinic featuring online appointment booking, service breakdown, and dynamic client testimonials.",
    client: "Smileo Dental Clinic",
    techStack: ["HTML5", "CSS3", "JavaScript"],
    liveUrl: "https://example.com/smileo"
  },
  {
    id: 2,
    title: "Urban Wear E-Commerce",
    category: "ecommerce",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop",
    description: "An interactive online store layout with dynamic product displays, filtering options, and seamless responsive design for mobile shopping.",
    client: "Urban Trends Co.",
    techStack: ["HTML5", "CSS3", "JavaScript"],
    liveUrl: "https://example.com/urban"
  },
  {
    id: 3,
    title: "Savoria Fine Dining",
    category: "landing",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop",
    description: "An elegant, high-conversion landing page for a luxury restaurant featuring table reservation systems and interactive digital menus.",
    client: "Savoria Restaurant",
    techStack: ["HTML5", "CSS3", "JavaScript"],
    liveUrl: "https://example.com/savoria"
  },
  {
    id: 4,
    title: "Nova Agency Business Site",
    category: "business",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    description: "A corporate agency landing page designed to show service offerings, case studies, and integrated contact channels for business growth.",
    client: "Nova Tech",
    techStack: ["HTML5", "CSS3", "JavaScript"],
    liveUrl: "https://example.com/nova"
  },
  {
    id: 5,
    title: "Glow & Care Cosmetics Store",
    category: "ecommerce",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop",
    description: "E-Commerce solution focused on beauty and skincare products with direct WhatsApp ordering and fast load speed.",
    client: "Glow & Care Ltd.",
    techStack: ["HTML5", "CSS3", "JavaScript"],
    liveUrl: "https://example.com/glow"
  },
  {
    id: 6,
    title: "SaaS App Product Launch",
    category: "landing",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    description: "Clean and high-converting landing page built for software and mobile app feature showcase.",
    client: "TechPulse Inc.",
    techStack: ["HTML5", "CSS3", "JavaScript"],
    liveUrl: "https://example.com/saas"
  }
];

// DOM Elements
const portfolioGrid = document.getElementById('portfolioGrid');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectModal = document.getElementById('projectModal');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');

// Function to Render Cards Dynamically (All Details & Preview Button inside Container)
function renderPortfolio(items) {
  if (!portfolioGrid) return;
  
  if (items.length === 0) {
    portfolioGrid.innerHTML = `<p style="color: #fff; text-align: center; grid-column: 1/-1;">No projects found.</p>`;
    return;
  }

  portfolioGrid.innerHTML = items.map(project => `
    <div class="portfolio-card reveal active" data-id="${project.id}">
      <div class="card-image">
        <img src="${project.image}" alt="${project.title}" loading="lazy">
      </div>
      <div class="card-info">
        <span class="card-category">${project.category.toUpperCase()}</span>
        <h3 class="card-title">${project.title}</h3>
        <p class="card-client"><i class="fa-solid fa-building"></i> <strong>Client:</strong> ${project.client}</p>
        <p class="card-desc">${project.description}</p>
        
        <div class="tech-tags">
          ${project.techStack.map(tech => `<span class="tag">${tech}</span>`).join('')}
        </div>

        <div class="card-actions">
          <a href="${project.liveUrl}" class="btn btn-primary btn-sm btn-preview" target="_blank">
            <span>Live Preview</span>
            <i class="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
          <button class="btn btn-secondary btn-sm" onclick="openModal(${project.id})" title="Expand Details">
            <i class="fa-solid fa-expand"></i>
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// Filtering Functionality
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    if (filter === 'all') {
      renderPortfolio(portfolioProjects);
    } else {
      const filtered = portfolioProjects.filter(p => p.category === filter);
      renderPortfolio(filtered);
    }
  });
});

// Modal Logic
function openModal(id) {
  const project = portfolioProjects.find(p => p.id === id);
  if (!project) return;

  modalBody.innerHTML = `
    <div class="modal-project">
      <img src="${project.image}" alt="${project.title}" class="modal-img">
      <div class="modal-details">
        <h2>${project.title}</h2>
        <p class="modal-client"><strong>Client:</strong> ${project.client}</p>
        <p class="modal-desc">${project.description}</p>
        
        <div class="tech-tags">
          ${project.techStack.map(tech => `<span class="tag">${tech}</span>`).join('')}
        </div>

        <div class="modal-actions">
          <a href="${project.liveUrl}" class="btn btn-primary btn-sm" target="_blank">
            <span>Visit Live Website</span>
            <i class="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
        </div>
      </div>
    </div>
  `;

  projectModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Close Modal
if (modalClose) {
  modalClose.addEventListener('click', closeModal);
}

if (projectModal) {
  projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) closeModal();
  });
}

function closeModal() {
  projectModal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

// Initial Render
document.addEventListener('DOMContentLoaded', () => {
  renderPortfolio(portfolioProjects);
});