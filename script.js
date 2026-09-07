/**
 * RIDHIMA CHAVAN — PORTFOLIO JAVASCRIPT
 * Handles mobile navigation, smooth scrolling, active section tracking,
 * interactive lightbox modal for portfolio pieces, and clipboard copy.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initSmoothScroll();
  initActiveNavSpy();
  initLightbox();
  initCopyEmail();
  initBackToTop();
});

/* --------------------------------------------------------------------------
   1. MOBILE NAVIGATION DRAWER
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !mobileNav) return;

  function toggleMenu(open) {
    const shouldOpen = open !== undefined ? open : !mobileNav.classList.contains('open');
    toggleBtn.classList.toggle('active', shouldOpen);
    mobileNav.classList.toggle('open', shouldOpen);
    toggleBtn.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
    document.body.style.overflow = shouldOpen ? 'hidden' : '';
  }

  toggleBtn.addEventListener('click', () => toggleMenu());

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggleMenu(false);
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
      toggleMenu(false);
    }
  });
}

/* --------------------------------------------------------------------------
   2. SMOOTH ANCHOR SCROLLING WITH OFFSET
   -------------------------------------------------------------------------- */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  const header = document.querySelector('.site-header');

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#' || !targetId) return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - headerHeight - 16;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Set URL hash without jump
        if (history.pushState) {
          history.pushState(null, null, targetId);
        }
      }
    });
  });
}

/* --------------------------------------------------------------------------
   3. ACTIVE NAVIGATION INTERSECTION OBSERVER
   -------------------------------------------------------------------------- */
function initActiveNavSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/* --------------------------------------------------------------------------
   4. LIGHTBOX MODAL (KEYBOARD ACCESSIBLE, MULTI-ITEM)
   -------------------------------------------------------------------------- */
function initLightbox() {
  const modal = document.getElementById('lightbox-modal');
  const modalImg = document.getElementById('lightbox-img');
  const modalTitle = document.getElementById('lightbox-title');
  const modalCategory = document.getElementById('lightbox-category');
  const modalCaption = document.getElementById('lightbox-caption');
  const modalCounter = document.getElementById('lightbox-counter');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');

  const cards = Array.from(document.querySelectorAll('.project-card'));
  if (!modal || !cards.length) return;

  let currentIndex = 0;
  let lastActiveElement = null;

  function getProjectData(index) {
    const card = cards[index];
    if (!card) return null;
    return {
      src: card.getAttribute('data-image') || card.querySelector('img')?.src || '',
      title: card.getAttribute('data-title') || card.querySelector('.project-title')?.textContent.trim() || 'Project Title',
      category: card.getAttribute('data-category') || card.querySelector('.project-category-badge')?.textContent.trim() || 'Design',
      caption: card.getAttribute('data-caption') || card.querySelector('.project-desc')?.textContent.trim() || ''
    };
  }

  function updateModalContent(index) {
    currentIndex = index;
    const data = getProjectData(index);
    if (!data) return;

    modalImg.src = data.src;
    modalImg.alt = data.title;
    modalTitle.textContent = data.title;
    modalCategory.textContent = data.category;
    modalCaption.textContent = data.caption;
    modalCounter.textContent = `${index + 1} / ${cards.length}`;
  }

  function openModal(index) {
    lastActiveElement = document.activeElement;
    updateModalContent(index);
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastActiveElement) {
      lastActiveElement.focus();
    }
  }

  function showNext() {
    const nextIndex = (currentIndex + 1) % cards.length;
    updateModalContent(nextIndex);
  }

  function showPrev() {
    const prevIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateModalContent(prevIndex);
  }

  // Card click triggers
  cards.forEach((card, idx) => {
    card.addEventListener('click', (e) => {
      // Don't trigger if clicked on an external link or specific button with other behavior
      if (e.target.closest('a') && !e.target.closest('.view-card-trigger')) return;
      openModal(idx);
    });

    // Support Enter or Space key when card is focused
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(idx);
      }
    });
  });

  // Modal controls
  closeBtn.addEventListener('click', closeModal);
  nextBtn.addEventListener('click', showNext);
  prevBtn.addEventListener('click', showPrev);

  // Close on clicking backdrop outside dialog
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Keyboard navigation inside lightbox
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('open')) return;

    if (e.key === 'Escape') {
      closeModal();
    } else if (e.key === 'ArrowRight') {
      showNext();
    } else if (e.key === 'ArrowLeft') {
      showPrev();
    }
  });
}

/* --------------------------------------------------------------------------
   5. EMAIL COPY-TO-CLIPBOARD WITH TOAST
   -------------------------------------------------------------------------- */
function initCopyEmail() {
  const copyBtn = document.getElementById('copy-email-btn');
  const toast = document.getElementById('toast-notification');
  const toastText = document.getElementById('toast-message');

  if (!copyBtn) return;

  copyBtn.addEventListener('click', async () => {
    const email = copyBtn.getAttribute('data-email') || 'EMAIL@PLACEHOLDER.com';

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(email);
      } else {
        // Fallback for non-https or older browsers
        const tempInput = document.createElement('input');
        tempInput.value = email;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
      }

      showToast(`Copied ${email} to clipboard!`);
    } catch (err) {
      showToast('Click email to open your mail client');
    }
  });

  function showToast(message) {
    if (!toast) return;
    toastText.textContent = message;
    toast.classList.add('show');

    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }
}

/* --------------------------------------------------------------------------
   6. BACK TO TOP BUTTON
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const topBtn = document.getElementById('back-to-top');
  if (!topBtn) return;

  topBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
