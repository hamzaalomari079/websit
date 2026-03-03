const $ = (s, p = document) => p.querySelector(s);
const $$ = (s, p = document) => [...p.querySelectorAll(s)];

function setActiveNav() {
  const path = location.pathname.split("/").pop() || "index.html";
  $$(".nav-links a").forEach(a => {
    const href = a.getAttribute("href");
    if (href === path) a.classList.add("active");
  });
}

function mobileMenu() {
  const btn = $("#menuBtn");
  const links = $("#navLinks");
  if (!btn || !links) return;

  btn.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    btn.setAttribute("aria-expanded", String(open));
  });
}

function contactValidation() {
  const form = $("#contactForm");
  if (!form) return;

  const success = $("#successMsg");
  const errBox = $("#formError");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (errBox) errBox.style.display = "none";
    if (success) success.style.display = "none";

    const name = $("#name")?.value.trim() || "";
    const email = $("#email")?.value.trim() || "";
    const message = $("#message")?.value.trim() || "";

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (name.length < 2 || !emailOk || message.length < 10) {
      if (errBox) {
        errBox.style.display = "block";
        errBox.textContent = "تحقق من الاسم والبريد والرسالة (الرسالة يجب أن تكون 10 أحرف على الأقل).";
      }
      return;
    }

    if (success) {
      success.style.display = "block";
      success.textContent = "تم ارسال طلبك بنجاح وسيتم التواصل معك قريبا.";
    }

    form.reset();
  });
}

function packagesFilter() {
  const select = $("#packageFilter");
  const cards = $$(".pkg-card");
  if (!select || cards.length === 0) return;

  select.addEventListener("change", () => {
    const v = select.value;
    cards.forEach(c => {
      const type = c.getAttribute("data-type");
      c.style.display = (v === "all" || v === type) ? "block" : "none";
    });
  });
}

function galleryModal() {
  const modal = $("#modal");
  const modalImg = $("#modalImg");
  const modalTitle = $("#modalTitle");
  const closeBtn = $("#modalClose");
  const items = $$(".gallery button");

  if (!modal || !modalImg || items.length === 0) return;

  const open = (src, title) => {
    modalImg.src = src;
    modalTitle.textContent = title || "صورة";
    modal.style.display = "flex";
    modal.setAttribute("aria-hidden", "false");
    closeBtn && closeBtn.focus();
  };

  const close = () => {
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    modalImg.src = "";
  };

  items.forEach(btn => {
    btn.addEventListener("click", () => open(btn.dataset.full, btn.dataset.title));
  });

  closeBtn && closeBtn.addEventListener("click", close);
  modal.addEventListener("click", (e) => { if (e.target === modal) close(); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.display === "flex") close();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setActiveNav();
  mobileMenu();
  contactValidation();
  packagesFilter();
  galleryModal();
});