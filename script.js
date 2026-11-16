/* ==========================================================================
   NOVA TECH AGENCY — FULLY RESPONSIVE JAVASCRIPT ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------------
     1. CUSTOM ANIME GLOWING CURSOR (Desktop Only with Resize Check)
     ------------------------------------------------------------------------ */
  let cursorDot = document.getElementById('cursorDot');
  let cursorOutline = document.getElementById('cursorOutline');

  function initCursor() {
    if (window.innerWidth > 768) {
      if (!cursorDot) {
        cursorDot = document.createElement('div');
        cursorDot.id = 'cursorDot';
        cursorDot.className = 'anime-cursor';
        document.body.appendChild(cursorDot);
      }
      if (!cursorOutline) {
        cursorOutline = document.createElement('div');
        cursorOutline.id = 'cursorOutline';
        cursorOutline.className = 'anime-cursor-follower';
        document.body.appendChild(cursorOutline);
      }

      let mouseX = 0, mouseY = 0;
      let outlineX = 0, outlineY = 0;

      window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        if (cursorDot) {
          cursorDot.style.left = `${mouseX}px`;
          cursorDot.style.top = `${mouseY}px`;
        }
      });

      function renderCursor() {
        if (window.innerWidth <= 768) return;
        outlineX += (mouseX - outlineX) * 0.18;
        outlineY += (mouseY - outlineY) * 0.18;

        if (cursorOutline) {
          cursorOutline.style.left = `${outlineX}px`;
          cursorOutline.style.top = `${outlineY}px`;
        }
        requestAnimationFrame(renderCursor);
      }
      renderCursor();

      const hoverables = document.querySelectorAll('a, button, .service-card, .project-card, .filter-btn, input, textarea, select, .btn');
      hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => {
          if (cursorDot) cursorDot.classList.add('active');
          if (cursorOutline) cursorOutline.classList.add('active');
        });
        el.addEventListener('mouseleave', () => {
          if (cursorDot) cursorDot.classList.remove('active');
          if (cursorOutline) cursorOutline.classList.remove('active');
        });
      });
    }
  }

  initCursor();

  /* ------------------------------------------------------------------------
     2. PARTICLES CANVAS BACKGROUND (Responsive Resize)
     ------------------------------------------------------------------------ */
  const canvas = document.getElementById('bgCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    const numberOfParticles = window.innerWidth < 768 ? 20 : 45;

    function setCanvasDimensions() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    setCanvasDimensions();
    window.addEventListener('resize', () => {
      setCanvasDimensions();
      initParticles();
    });

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.color = Math.random() > 0.5 ? '#7C3AED' : '#00D9FF';
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    function initParticles() {
      particlesArray = [];
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesArray.forEach(p => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();
  }

  /* ------------------------------------------------------------------------
     3. NAVBAR SCROLL EFFECT & RESPONSIVE MOBILE MENU
     ------------------------------------------------------------------------ */
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const navLinkItems = document.querySelectorAll('.nav-link');

  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }

      let currentSection = '';
      const sections = document.querySelectorAll('section');
      sections.forEach(sec => {
        const sectionTop = sec.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
          currentSection = sec.getAttribute('id');
        }
      });

      navLinkItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
          link.classList.add('active');
        }
      });
    });
  }

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    navLinkItems.forEach(item => {
      item.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }

  /* ------------------------------------------------------------------------
     4. INTERSECTION OBSERVER (SCROLL REVEAL & COUNTERS)
     ------------------------------------------------------------------------ */
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.getAttribute('data-delay') || 0;
        setTimeout(() => {
          entry.target.classList.add('active');
        }, delay);

        const numbers = entry.target.querySelectorAll('.stat-number');
        if (numbers.length > 0) {
          numbers.forEach(num => animateCounter(num));
        }

        const progressFills = entry.target.querySelectorAll('.progress-fill');
        if (progressFills.length > 0) {
          progressFills.forEach(fill => {
            fill.style.width = fill.getAttribute('data-progress');
          });
        }
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => revealObserver.observe(el));

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'));
    if (el.classList.contains('counted') || isNaN(target)) return;
    el.classList.add('counted');

    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        el.textContent = target;
        clearInterval(timer);
      } else {
        el.textContent = Math.ceil(start);
      }
    }, 16);
  }

  /* ------------------------------------------------------------------------
     5. RESPONSIVE PORTFOLIO FILTERING SYSTEM
     ------------------------------------------------------------------------ */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category');
        if (filterValue === 'all' || (categories && categories.includes(filterValue))) {
          card.classList.remove('hide');
          card.style.display = 'block';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.classList.add('hide');
          card.style.display = 'none';
        }
      });
    });
  });



  /* ------------------------------------------------------------------------
     7. TESTIMONIAL SLIDER WITH TOUCH / SWIPE SUPPORT
     ------------------------------------------------------------------------ */
  const testimonialSlider = document.getElementById('testimonialSlider');
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const prevBtn = document.getElementById('prevTestimonial');
  const nextBtn = document.getElementById('nextTestimonial');
  const sliderDots = document.getElementById('sliderDots');

  if (testimonialSlider && testimonialCards.length > 0) {
    let currentSlide = 0;
    const totalSlides = testimonialCards.length;

    if (sliderDots) {
      sliderDots.innerHTML = '';
      for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot-item');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        sliderDots.appendChild(dot);
      }
    }

    const dots = document.querySelectorAll('.dot-item');

    function goToSlide(index) {
      currentSlide = index;
      testimonialSlider.style.transform = `translateX(-${currentSlide * 100}%)`;
      dots.forEach((d, i) => {
        d.classList.toggle('active', i === currentSlide);
      });
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % totalSlides;
      goToSlide(currentSlide);
    }

    function prevSlide() {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      goToSlide(currentSlide);
    }

    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    let touchStartX = 0;
    let touchEndX = 0;

    testimonialSlider.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    testimonialSlider.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 50) nextSlide();
      if (touchEndX - touchStartX > 50) prevSlide();
    }, { passive: true });

    let autoSlide = setInterval(nextSlide, 6000);

    const sliderContainer = document.querySelector('.testimonial-slider-container');
    if (sliderContainer) {
      sliderContainer.addEventListener('mouseenter', () => clearInterval(autoSlide));
      sliderContainer.addEventListener('mouseleave', () => {
        autoSlide = setInterval(nextSlide, 6000);
      });
    }
  }

  /* ------------------------------------------------------------------------
     8. CONTACT FORM VALIDATION & HANDLING
     ------------------------------------------------------------------------ */
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;
      const fullName = document.getElementById('fullName') || document.getElementById('name');
      const email = document.getElementById('email');
      const service = document.getElementById('service');
      const message = document.getElementById('message');

      document.querySelectorAll('.form-group').forEach(g => g.classList.remove('invalid', 'error'));

      if (fullName && !fullName.value.trim()) {
        setError(fullName);
        isValid = false;
      }

      const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/i;
      if (email && (!email.value.trim() || !email.value.match(emailPattern))) {
        setError(email);
        isValid = false;
      }

      if (service && service.value === '') {
        setError(service);
        isValid = false;
      }

      if (message && !message.value.trim()) {
        setError(message);
        isValid = false;
      }

      if (isValid) {
        contactForm.style.display = 'none';
        if (formSuccess) formSuccess.classList.add('active');
        contactForm.reset();
        
        setTimeout(() => {
          contactForm.style.display = 'flex';
          if (formSuccess) formSuccess.classList.remove('active');
        }, 6000);
      }
    });
  }

  function setError(inputEl) {
    const group = inputEl.closest('.form-group');
    if (group) group.classList.add('invalid', 'error');
  }

  /* ------------------------------------------------------------------------
     9. BACK TO TOP BUTTON
     ------------------------------------------------------------------------ */
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ------------------------------------------------------------------------
     10. AUTO-SELECT SERVICE FROM URL PARAMETER
     ------------------------------------------------------------------------ */
  const serviceSelect = document.getElementById('service');
  if (serviceSelect) {
    const urlParams = new URLSearchParams(window.location.search);
    const selectedService = urlParams.get('service');
    if (selectedService) {
      serviceSelect.value = selectedService;
    }
  }

});