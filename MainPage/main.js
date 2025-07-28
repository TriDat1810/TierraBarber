// --- Gallery Shelf Auto-Cycle & Modal ---
const galleryShelfImages = [
  {src: '/TierraBarber/Pic/pic1.png', caption: 'Skin Fade'},
  {src: '/TierraBarber/Pic/pic2.png', caption: 'Classic Cut'},
  {src: '/TierraBarber/Pic/pic3.png', caption: 'Crew Cut'},
  {src: '/TierraBarber/Pic/pic4.png', caption: 'Pompadour'},
  {src: '/TierraBarber/Pic/pic5.png', caption: 'Undercut'},
  {src: '/TierraBarber/Pic/pic6.png', caption: 'Buzz Cut'},
  {src: '/TierraBarber/Pic/pic7.png', caption: 'Taper Fade'}
];
const shelfBlocks = [
  document.querySelector('.gallery-shelf-img-block.shelf-pos-0'),
  document.querySelector('.gallery-shelf-img-block.shelf-pos-1'),
  document.querySelector('.gallery-shelf-img-block.shelf-pos-2')
];
let shelfStart = 0;
let shelfInterval = null;
let shelfPaused = false;
function updateGalleryShelf(activeIdx = null) {
  for (let i = 0; i < 3; i++) {
    const imgData = galleryShelfImages[(shelfStart + i) % galleryShelfImages.length];
    if (shelfBlocks[i]) {
      const img = shelfBlocks[i].querySelector('img');
      const caption = shelfBlocks[i].querySelector('.gallery-shelf-caption');
      img.src = imgData.src;
      img.alt = imgData.caption;
      caption.textContent = imgData.caption;
      shelfBlocks[i].setAttribute('data-caption', imgData.caption);
      shelfBlocks[i].classList.remove('active');
    }
  }
  if (activeIdx !== null && shelfBlocks[activeIdx]) {
    shelfBlocks[activeIdx].classList.add('active');
  }
}
function startShelfAuto() {
  if (shelfInterval) clearInterval(shelfInterval);
  shelfInterval = setInterval(() => {
    shelfStart = (shelfStart + 1) % galleryShelfImages.length;
    updateGalleryShelf();
  }, 2500);
}
function stopShelfAuto() {
  if (shelfInterval) clearInterval(shelfInterval);
}
// Modal logic
const galleryModal = document.getElementById('gallery-modal');
const galleryModalImg = document.getElementById('gallery-modal-img');
const galleryModalCaption = document.getElementById('gallery-modal-caption');
// Shelf click logic: click to focus/enlarge, click again to restore cycling
shelfBlocks.forEach((block, idx) => {
  block.addEventListener('click', function(e) {
    if (block.classList.contains('active')) {
      // If already active, restore cycling
      shelfPaused = false;
      updateGalleryShelf();
      startShelfAuto();
    } else {
      shelfPaused = true;
      stopShelfAuto();
      updateGalleryShelf(idx);
    }
  });
});
startShelfAuto();
updateGalleryShelf();
// --- Home Section Slideshow & Sub Slogan ---
const homeBgImages = document.querySelectorAll('.home-bg-image');
const homeSubSlogan = document.querySelector('.subslogan');
const subSlogans = [
  'Empower Your Look | Define Yourself | Be Legendary',
  'Classic tools | Modern style | Modern Looks',
  'Relax | Refresh | Renew'
];
let homeCurrent = 0;
function showHomeSlide(idx) {
  homeBgImages.forEach((img, i) => {
    img.style.opacity = (i === idx % homeBgImages.length) ? '1' : '0';
  });
  if (homeSubSlogan) {
    homeSubSlogan.textContent = subSlogans[idx % subSlogans.length];
  }
}
setInterval(() => {
  homeCurrent = (homeCurrent + 1) % homeBgImages.length;
  showHomeSlide(homeCurrent);
}, 4000);
showHomeSlide(homeCurrent);
// Highlight nav link for current section
const navLinks = document.querySelectorAll('.nav-link-h2');
const sections = ['home','gallery','about','price-list','faqs','location'].map(id => document.getElementById(id));
function updateActiveNav() {
  let current = '';
  const scrollPos = window.scrollY + 130; // header height offset for accurate highlight
  sections.forEach(section => {
    if (section && scrollPos >= section.offsetTop) {
      current = section.id;
    }
  });
  // If at the bottom of the page, always highlight the last section (Find Us)
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 2) {
    current = 'location';
  }
  navLinks.forEach(link => {
    link.classList.remove('active-nav');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active-nav');
    }
  });
}
window.addEventListener('scroll', updateActiveNav);
// FAQ toggle (only one open at a time)
document.querySelectorAll('.faqs-list .faq-question').forEach(q => {
    q.addEventListener('click', function() {
        const item = this.parentElement;
        const allItems = document.querySelectorAll('.faqs-list .faq-item');
        allItems.forEach(i => { if(i !== item) i.classList.remove('active'); });
        item.classList.toggle('active');
    });
});
// Smooth scroll with header offset
function scrollWithOffset(e) {
  const header = document.querySelector('.header');
  const targetId = this.getAttribute('href').slice(1);
  const target = document.getElementById(targetId);
  if (target) {
    e.preventDefault();
    const headerHeight = header.offsetHeight || 0;
    const targetTop = target.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({
      top: targetTop - headerHeight + 2,
      behavior: 'smooth'
    });
    // Wait for scroll to finish, then update nav highlight
    setTimeout(updateActiveNav, 500);
  }
}

document.querySelectorAll('.nav-link-h2').forEach(link => {
  link.addEventListener('click', scrollWithOffset);
});
// Mobile nav hamburger menu functionality
const navToggle = document.querySelector('.nav-toggle');
const navLinksMenu = document.querySelector('.nav-links');
if (navToggle && navLinksMenu) {
  navToggle.addEventListener('click', function() {
    navLinksMenu.classList.toggle('open');
    navToggle.classList.toggle('open');
  });
  // Close menu when a link is clicked (for better UX)
  navLinksMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinksMenu.classList.remove('open');
      navToggle.classList.remove('open');
    });
  });
}
