// هذا الملف يدير سلوك الواجهة مثل القائمة والحركات البسيطة
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');

// فتح واغلاق القائمة في الجوال
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
  });

  navItems.forEach((item) => {
    item.addEventListener('click', () => {
      navLinks.classList.remove('active');
      hamburger.classList.remove('active');
    });
  });
}

// اضافة ظل للهيدر عند النزول في الصفحة
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  if (!header) return;
  header.classList.toggle('scrolled', window.scrollY > 50);
});

// تمييز رابط الصفحة الحالية في القائمة
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  navItems.forEach((link) => {
    const href = link.getAttribute('href');
    link.classList.toggle('active', href === currentPage);
  });
}

document.addEventListener('DOMContentLoaded', setActiveNavLink);

// تشغيل حركة بسيطة للعناصر عند ظهورها
const animationTargets = document.querySelectorAll('.card, .feature-card, .package-card, .testimonial-card');
if (animationTargets.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('slide-up');
        }
      });
    },
    { threshold: 0.1 }
  );

  animationTargets.forEach((el) => observer.observe(el));
}

// تحريك عدادات الارقام
function animateCounter(element, target, duration = 2000) {
  let current = 0;
  const increment = target / (duration / 16);
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
      return;
    }
    element.textContent = Math.floor(current);
  }, 16);
}

const statsSections = document.querySelectorAll('.stats-section');
if (statsSections.length > 0) {
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.querySelectorAll('[data-count]').forEach((counter) => {
          animateCounter(counter, parseInt(counter.dataset.count, 10));
        });
        counterObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.5 }
  );

  statsSections.forEach((section) => counterObserver.observe(section));
}

// فتح سؤال واحد فقط في صفحة الاسئلة
const accordions = document.querySelectorAll('.accordion');
const accordionButtons = document.querySelectorAll('.accordion-button');
accordionButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const accordion = button.parentElement;
    const isActive = accordion.classList.contains('active');
    accordions.forEach((acc) => acc.classList.remove('active'));
    if (!isActive) accordion.classList.add('active');
  });
});
