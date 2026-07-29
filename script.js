// Intersection Observer for Entrance Animations
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, observerOptions);
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// High-End Liquid Cursor Logic
const dot = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
const glow = document.getElementById('cursor-glow');
let mouseX = -100, mouseY = -100, dotX = -100, dotY = -100, ringX = -100, ringY = -100, glowX = -100, glowY = -100;
let isHovering = false, isVisible = false;

if (dot && ring && glow) {
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX; mouseY = e.clientY;
        if (!isVisible) { isVisible = true; dot.style.opacity = '1'; ring.style.opacity = '1'; glow.style.opacity = '1'; }
    });

    document.addEventListener('mouseleave', () => {
        isVisible = false; dot.style.opacity = '0'; ring.style.opacity = '0'; glow.style.opacity = '0';
    });

    const interactives = 'a, button, select, input, textarea, .cursor-pointer, [onclick], .group';
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest(interactives)) { document.body.classList.add('cursor-hover'); isHovering = true; }
    });
    document.addEventListener('mouseout', (e) => {
        if (e.target.closest(interactives)) { document.body.classList.remove('cursor-hover'); isHovering = false; }
    });

    function render() {
        dotX += (mouseX - dotX) * 0.25; dotY += (mouseY - dotY) * 0.25;
        dot.style.transform = `translate3d(${dotX - 3}px, ${dotY - 3}px, 0)`;
        ringX += (mouseX - ringX) * 0.12; ringY += (mouseY - ringY) * 0.12;
        const ringOffset = isHovering ? 32 : 16;
        ring.style.transform = `translate3d(${ringX - ringOffset}px, ${ringY - ringOffset}px, 0)`;
        glowX += (mouseX - glowX) * 0.08; glowY += (mouseY - glowY) * 0.08;
        glow.style.left = `${glowX}px`; glow.style.top = `${glowY}px`;
        requestAnimationFrame(render);
    }
    render();
}

// Magnetic Effect
document.querySelectorAll('.magnetic').forEach(el => {
    el.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        this.style.transform = `translate3d(${x * 0.15}px, ${y * 0.15}px, 0)`;
    });
    el.addEventListener('mouseleave', function() { this.style.transform = `translate3d(0px, 0px, 0)`; });
});

// Parallax Effect
document.addEventListener('mousemove', (e) => {
    const targets = document.querySelectorAll('.parallax-target');
    const x = (window.innerWidth - e.pageX * 2) / 100;
    const y = (window.innerHeight - e.pageY * 2) / 100;
    targets.forEach(target => {
        const speed = target.getAttribute('data-speed') || 0.02;
        target.style.transform = `translate3d(${x * speed * 20}px, ${y * speed * 20}px, 0)`;
    });
});

// Accordion Logic
let activeAccordion = 0;

function toggleAccordion(index) {
    const items = document.querySelectorAll('.method-accordion-item');
    const isClosing = activeAccordion === index;

    items.forEach((item, i) => {
        const body = item.querySelector('.method-accordion-body');
        const icon = item.querySelector('.method-toggle-icon');
        if (i === index && !isClosing) {
            body.style.maxHeight = body.scrollHeight + 'px';
            body.style.opacity = '1';
            body.style.overflow = 'visible';
            body.style.paddingBottom = '2rem';
            icon.textContent = '−';
        } else {
            body.style.maxHeight = '0';
            body.style.opacity = '0';
            body.style.overflow = 'hidden';
            body.style.paddingBottom = '0';
            icon.textContent = '+';
        }
    });
    activeAccordion = isClosing ? -1 : index;
}

// Functional Filter System
function filterProjects(category, button) {
    const items = document.querySelectorAll('.filter-item');
    const buttons = document.querySelectorAll('.project-filter');

    buttons.forEach(btn => {
        btn.classList.remove('bg-primary', 'text-on-primary', 'shadow-lg');
        btn.classList.add('text-on-surface-variant');
    });
    button.classList.add('bg-primary', 'text-on-primary', 'shadow-lg');
    button.classList.remove('text-on-surface-variant');

    items.forEach(item => {
        if (category === 'todos' || item.getAttribute('data-category') === category) {
            item.classList.remove('hidden');
            void item.offsetWidth;
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
        } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            setTimeout(() => {
                item.classList.add('hidden');
            }, 600);
        }
    });
}

// Modal Interaction Logic
function openProjectModal(title, category, mainImage) {
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-category-label').innerText = category;
    document.getElementById('modal-main-image').querySelector('img').src = mainImage;
    document.getElementById('modal-description').innerText = "Residencia de alta gama con enfoque en sostenibilidad y materiales nobles. Superficie: 450m2. Ubicación: Zona Norte.";

    const gallery = document.getElementById('modal-gallery');
    const galleryImages = [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ];
    gallery.innerHTML = galleryImages.map(src => `
        <div class="aspect-square rounded-2xl overflow-hidden cursor-pointer hover:opacity-80 transition-opacity" onclick="document.getElementById('modal-main-image').querySelector('img').src = '${src}'">
            <img src="${src}" class="w-full h-full object-cover">
        </div>
    `).join('');

    document.body.classList.add('modal-active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.body.classList.remove('modal-active');
    document.body.style.overflow = 'auto';
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});
