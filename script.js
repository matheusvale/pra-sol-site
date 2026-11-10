let budgetReference = "";
const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
const navLinks = document.querySelectorAll(".main-nav a");
const faqItems = document.querySelectorAll(".faq-list details");

// Mobile navigation stays small and reversible for a static site.
function closeMenu() {
  document.body.classList.remove("menu-open");
  mainNav?.classList.remove("is-open");
  menuToggle?.setAttribute("aria-expanded", "false");
}

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("is-open");
    document.body.classList.toggle("menu-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

faqItems.forEach((item) => {
  item.addEventListener("toggle", () => {
    if (!item.open) return;

    // Keep one FAQ open at a time so the section remains easy to scan on mobile.
    faqItems.forEach((otherItem) => {
      if (otherItem !== item) {
        otherItem.removeAttribute("open");
      }
    });
  });
});

const budgetForm = document.querySelector("[data-budget-form]");

if (budgetForm) {
  const steps = Array.from(budgetForm.querySelectorAll("[data-budget-step]"));
  const stepLabel = budgetForm.querySelector("[data-step-label]");
  const progressBar = budgetForm.querySelector("[data-progress-bar]");
  const prevButton = budgetForm.querySelector("[data-prev-step]");
  const nextButton = budgetForm.querySelector("[data-next-step]");
  const submitButton = budgetForm.querySelector("[data-submit-step]");
  const controls = budgetForm.querySelector(".quote-controls");
  const errorBox = budgetForm.querySelector("[data-form-error]");
  const successBox = budgetForm.querySelector("[data-form-success]");
  const logoChoice = budgetForm.querySelector(".logo-choice");
  const logoRadios = Array.from(budgetForm.querySelectorAll('input[name="tem_logo"]'));
  const uploadBox = budgetForm.querySelector("[data-upload-box]");
  const uploadLabel = budgetForm.querySelector("[data-upload-label]");
  const logoInput = budgetForm.querySelector("[data-logo-input]");
  const whatsappNumber = "5584981725425";
  const maxLogoSize = 5 * 1024 * 1024;
  const allowedLogoTypes = ["image/png", "image/jpeg", "application/pdf"];
  let currentStep = 0;

  const fields = {
    whatsapp: budgetForm.elements.whatsapp,
    nome: budgetForm.elements.nome,
    email: budgetForm.elements.email,
    quantidade: budgetForm.elements.quantidade,
    tipo: budgetForm.elements.tipo,
    finalidade: budgetForm.elements.finalidade,
  };

  function onlyDigits(value) {
    return value.replace(/\D/g, "");
  }

  function formatBrazilPhone(value) {
    const digits = onlyDigits(value).slice(0, 11);

    if (digits.length <= 2) {
      return digits ? `(${digits}` : "";
    }

    if (digits.length <= 6) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    }

    if (digits.length <= 10) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    }

    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  }

  function isValidEmail(value) {
    return /\S+@\S+\.\S+/.test(value);
  }

  function clearError() {
    errorBox.textContent = "";
  }

  function clearInvalidState() {
    Object.values(fields).forEach((field) => field?.removeAttribute("aria-invalid"));
    logoChoice?.classList.remove("is-invalid");
    logoInput?.removeAttribute("aria-invalid");
  }

  function showError(message, field) {
    errorBox.textContent = message;

    if (field) {
      field.setAttribute("aria-invalid", "true");
      field.focus();
    }
  }

  function getLogoAnswer() {
    return budgetForm.querySelector('input[name="tem_logo"]:checked')?.value || "";
  }

  function validateLogoFile(file) {
    if (!file) {
      return "";
    }

    const extension = file.name.split(".").pop()?.toLowerCase();
    const allowedExtensions = ["png", "jpg", "jpeg", "pdf"];

    if (!allowedLogoTypes.includes(file.type) && !allowedExtensions.includes(extension)) {
      return "Use um arquivo PNG, JPG ou PDF.";
    }

    if (file.size > maxLogoSize) {
      return "O arquivo precisa ter no máximo 5 MB.";
    }

    return "";
  }

  function validateCurrentStep() {
    clearError();
    clearInvalidState();

    if (currentStep === 0) {
      const digits = onlyDigits(fields.whatsapp.value);

      if (digits.length < 10 || digits.length > 11) {
        showError("Informe um WhatsApp com DDD.", fields.whatsapp);
        return false;
      }

      if (fields.nome.value.trim().length < 3) {
        showError("Informe seu nome com pelo menos 3 letras.", fields.nome);
        return false;
      }

      if (!isValidEmail(fields.email.value.trim())) {
        showError("Informe um e-mail válido.", fields.email);
        return false;
      }
    }

    if (currentStep === 1) {
      if (!fields.quantidade.value) {
        showError("Escolha uma quantidade aproximada.", fields.quantidade);
        return false;
      }

      if (!fields.tipo.value) {
        showError("Escolha o tipo de produto desejado.", fields.tipo);
        return false;
      }

      if (!fields.finalidade.value) {
        showError("Escolha a finalidade dos bonés.", fields.finalidade);
        return false;
      }
    }

    if (currentStep === 2) {
      const logoAnswer = getLogoAnswer();

      if (!logoAnswer) {
        logoChoice?.classList.add("is-invalid");
        errorBox.textContent = "Informe se você já tem a logo.";
        logoRadios[0]?.focus();
        return false;
      }

      if (logoAnswer === "sim" && logoInput.files[0]) {
        const fileError = validateLogoFile(logoInput.files[0]);

        if (fileError) {
          logoInput.setAttribute("aria-invalid", "true");
          errorBox.textContent = fileError;
          uploadBox?.focus();
          return false;
        }
      }
    }

    return true;
  }

  function updateLogoUploadState() {
    const shouldUpload = getLogoAnswer() === "sim";

    if (!logoInput || !uploadBox || !uploadLabel) return;

    logoInput.disabled = !shouldUpload;
    uploadBox.classList.toggle("is-disabled", !shouldUpload);

    if (!shouldUpload) {
      logoInput.value = "";
      uploadLabel.textContent = "Escolher arquivo";
      uploadBox.classList.remove("has-file");
    }
  }

  function updateStep() {
    const total = steps.length;

    steps.forEach((step, index) => {
      step.classList.toggle("is-active", index === currentStep);
    });

    stepLabel.textContent = `Etapa ${currentStep + 1} de ${total}`;
    progressBar.style.width = `${((currentStep + 1) / total) * 100}%`;

    prevButton.classList.toggle("is-hidden", currentStep === 0);
    nextButton.classList.toggle("is-hidden", currentStep === total - 1);
    submitButton.classList.toggle("is-visible", currentStep === total - 1);
    controls.classList.toggle("is-start", currentStep === 0);
    controls.classList.toggle("is-final", currentStep === total - 1);

    clearError();
    clearInvalidState();
  }

  function getFormSummary() {
    const logoAnswer = getLogoAnswer();
    const fileName = logoInput.files[0]?.name;
    let logoText = "Ainda não tenho logo";
    if (logoAnswer === "sim") {
      logoText = fileName
        ? `Tenho a logo (${fileName} - anexando aqui na conversa)`
        : "Tenho a logo para enviar (vou anexar aqui na conversa)";
    }

    return [
      "Olá! Vim pelo site da Bonés PraSol e gostaria de solicitar um orçamento de bonés personalizados.",
      "",
      "Meus dados:",
      `Nome: ${fields.nome.value.trim()}`,
      `WhatsApp: +55 ${fields.whatsapp.value.trim()}`,
      `E-mail: ${fields.email.value.trim()}`,
      `Quantidade aproximada: ${fields.quantidade.value}`,
      `Tipo de produto: ${fields.tipo.value}`,
      `Finalidade dos bonés: ${fields.finalidade.value}`,
      `Logo/arte: ${logoText}`,
      "",
      budgetReference ? `Referência de trabalho: ${budgetReference}` : "",
      "Gostaria de receber um orçamento.",
    ].join("\n");
  }

  fields.whatsapp.addEventListener("input", () => {
    fields.whatsapp.value = formatBrazilPhone(fields.whatsapp.value);
    fields.whatsapp.removeAttribute("aria-invalid");
    clearError();
  });

  Object.values(fields).forEach((field) => {
    field.addEventListener("input", () => {
      field.removeAttribute("aria-invalid");
      clearError();
    });

    field.addEventListener("change", () => {
      field.removeAttribute("aria-invalid");
      clearError();
    });
  });

  logoRadios.forEach((radio) => {
    radio.addEventListener("change", () => {
      logoChoice?.classList.remove("is-invalid");
      updateLogoUploadState();
      clearError();
    });
  });

  logoInput?.addEventListener("change", () => {
    const file = logoInput.files[0];
    const fileError = validateLogoFile(file);

    if (fileError) {
      logoInput.value = "";
      uploadBox?.classList.remove("has-file");
      uploadLabel.textContent = "Escolher arquivo";
      errorBox.textContent = fileError;
      return;
    }

    uploadBox?.classList.add("has-file");
    uploadLabel.textContent = file.name;
    clearError();
  });

  nextButton.addEventListener("click", () => {
    if (!validateCurrentStep()) return;

    currentStep = Math.min(currentStep + 1, steps.length - 1);
    updateStep();
  });

  prevButton.addEventListener("click", () => {
    currentStep = Math.max(currentStep - 1, 0);
    updateStep();
  });

  budgetForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!validateCurrentStep()) return;

    if (currentStep < steps.length - 1) {
      currentStep += 1;
      updateStep();
      return;
    }

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(getFormSummary())}`;

    successBox.hidden = false;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  });

  updateLogoUploadState();
  updateStep();
}

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

const observer = new IntersectionObserver(
  ([entry]) => {
    header?.classList.toggle("is-scrolled", !entry.isIntersecting);
  },
  { threshold: 0.02 }
);

const hero = document.querySelector(".hero");

if (hero) {
  observer.observe(hero);
}

// Realized work: filters and a single accessible photo viewer.
const workDialog = document.querySelector('.work-dialog');
const workPhoto = document.querySelector('[data-dialog-photo]');
const photoStage = document.querySelector('[data-photo-stage]');
const thumbnails = document.querySelector('.photo-thumbnails');
let activeWork = null;
let activePhoto = 0;
let workTrigger = null;
function displayWorkPhoto(index) {
  if (!activeWork) return;
  activePhoto = (index + activeWork.photos.length) % activeWork.photos.length;
  workPhoto.src = `assets/images/ambientadas/peca-${activeWork.photos[activePhoto]}.webp`;
  workPhoto.alt = `${activeWork.name}, foto ${activePhoto + 1} de ${activeWork.photos.length}, peça produzida pela PraSol`;
  document.querySelector('[data-photo-counter]').textContent = `${activePhoto + 1} / ${activeWork.photos.length}`;
  thumbnails.querySelectorAll('button').forEach((button, i) => button.setAttribute('aria-pressed', String(i === activePhoto)));
}
function openWork(id, trigger, startPhoto = 0) {
  activeWork = PRASOL_WORKS.find(work => work.id === id);
  if (!activeWork || !workDialog) return;
  workTrigger = trigger;
  document.querySelector('#work-dialog-title').textContent = activeWork.name;
  document.querySelector('[data-work-title]').textContent = activeWork.title;
  document.querySelector('[data-work-description]').textContent = activeWork.description;
  document.querySelector('[data-work-category]').textContent = activeWork.category === 'bones' ? 'Boné personalizado' : 'Viseira personalizada';
  photoStage.className = `dialog-stage stage-${activeWork.tone}`;
  thumbnails.replaceChildren();
  activeWork.photos.forEach((photo, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('aria-label', `Ver foto ${index + 1} de ${activeWork.name}`);
    const img = document.createElement('img');
    img.src = `assets/images/ambientadas/peca-${photo}-card.webp`;
    img.alt = '';
    button.append(img);
    button.addEventListener('click', () => displayWorkPhoto(index));
    thumbnails.append(button);
  });
  document.querySelectorAll('.photo-arrow').forEach(button => button.hidden = activeWork.photos.length < 2);
  displayWorkPhoto(startPhoto);
  workDialog.showModal();
  document.body.classList.add('work-opened');
}
document.querySelectorAll('[data-work]').forEach(button => button.addEventListener('click', () => openWork(button.dataset.work, button, Number(button.dataset.startPhoto || 0))));
document.querySelector('.dialog-close')?.addEventListener('click', () => workDialog.close());
workDialog?.addEventListener('close', () => { document.body.classList.remove('work-opened'); workTrigger?.focus(); });
workDialog?.addEventListener('click', event => { if (event.target === workDialog) { const box = workDialog.getBoundingClientRect(); if(event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) workDialog.close(); } });
workDialog?.addEventListener('keydown', event => { if(event.key === 'ArrowRight') { event.preventDefault(); displayWorkPhoto(activePhoto + 1); } if(event.key === 'ArrowLeft') { event.preventDefault(); displayWorkPhoto(activePhoto - 1); } });
document.querySelector('.photo-next')?.addEventListener('click', () => displayWorkPhoto(activePhoto + 1));
document.querySelector('.photo-prev')?.addEventListener('click', () => displayWorkPhoto(activePhoto - 1));
let touchStartX = 0;
photoStage?.addEventListener('touchstart', event => { touchStartX = event.changedTouches[0].clientX; }, {passive:true});
photoStage?.addEventListener('touchend', event => { const delta = event.changedTouches[0].clientX - touchStartX; if(Math.abs(delta)>55) displayWorkPhoto(activePhoto + (delta<0 ? 1 : -1)); }, {passive:true});
document.querySelector('[data-dialog-quote]')?.addEventListener('click', () => {
  budgetReference = activeWork?.name || '';
  document.querySelector('[data-reference-name]').textContent = budgetReference;
  document.querySelector('[data-quote-reference]').hidden = !budgetReference;
  workDialog.close();
});
document.querySelector('[data-clear-reference]')?.addEventListener('click', () => {
  budgetReference = '';
  document.querySelector('[data-quote-reference]').hidden = true;
});
let workFilter = 'all';
let showAllWorks = false;
function updateWorkList() {
  const cards = [...document.querySelectorAll('.work-card')];
  const matching = cards.filter(card => workFilter === 'all' || card.dataset.category === workFilter);
  cards.forEach(card => card.hidden = true);
  matching.forEach((card, index) => card.hidden = !showAllWorks && index >= 6);
  const remaining = Math.max(0, matching.length - 6);
  const more = document.querySelector('[data-more-works]');
  more.hidden = showAllWorks || remaining === 0;
  more.textContent = `Ver mais trabalhos (${remaining}) ↓`;
  document.querySelector('[data-work-status]').textContent = `${showAllWorks ? matching.length : Math.min(6, matching.length)} de ${matching.length} trabalhos exibidos`;
}
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  workFilter = button.dataset.filter;
  showAllWorks = false;
  document.querySelectorAll('[data-filter]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  updateWorkList();
}));
document.querySelector('[data-more-works]')?.addEventListener('click', () => {
  showAllWorks = true;
  updateWorkList();
  const next = [...document.querySelectorAll('.work-card:not([hidden])')][6]?.querySelector('button');
  next?.focus({preventScroll:true});
});
updateWorkList();
document.querySelectorAll('[data-hero-work]').forEach(button => button.addEventListener('click', () => {
  const work = PRASOL_WORKS.find(item => item.id === button.dataset.heroWork);
  const heroProduct = document.querySelector('#hero-product');
  heroProduct.src = `assets/images/ambientadas/peca-${work.photos[0]}.webp`;
  heroProduct.alt = `Peça personalizada para ${work.name}, produzida pela PraSol`;
  document.querySelector('#hero-client').textContent = work.name;
  document.querySelector('.hero-scene').dataset.heroTone = work.tone;
  const inspect = document.querySelector('.hero-inspect');
  inspect.dataset.work = work.id;
  inspect.setAttribute('aria-label', `Ver de perto o trabalho ${work.name}`);
  document.querySelectorAll('[data-hero-work]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
}));

// Show a quiet mobile quote shortcut after the opening; hide it at the form.
let openingAbove = false;
let quoteVisible = false;
const quoteShortcut = document.querySelector('.mobile-quote');
function updateQuoteShortcut() { quoteShortcut?.classList.toggle('is-visible', openingAbove && !quoteVisible); }
const quoteShortcutObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.target.id === 'inicio') openingAbove = !entry.isIntersecting && entry.boundingClientRect.bottom < 0;
    if(entry.target.id === 'orcamento') quoteVisible = entry.isIntersecting;
  });
  updateQuoteShortcut();
}, {threshold:0});
['inicio','orcamento'].forEach(id => {const section=document.getElementById(id);if(section)quoteShortcutObserver.observe(section);});
