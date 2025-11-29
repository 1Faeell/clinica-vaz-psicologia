// Funções do Modal (Globais para acesso via HTML)
const modal = document.getElementById("service-modal");
const modalContent = document.getElementById("modal-content");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");

function openModal(title, description) {
  modalTitle.textContent = title;
  modalDesc.textContent = description;

  modal.classList.remove("hidden");
  // Timeout pequeno para permitir a transição CSS
  setTimeout(() => {
    modalContent.classList.remove("scale-95", "opacity-0");
    modalContent.classList.add("scale-100", "opacity-100");
  }, 10);

  document.body.classList.add("modal-open");
}

function closeModal() {
  modalContent.classList.remove("scale-100", "opacity-100");
  modalContent.classList.add("scale-95", "opacity-0");

  setTimeout(() => {
    modal.classList.add("hidden");
  }, 300); // Espera a animação terminar

  document.body.classList.remove("modal-open");
}
document
  .getElementById("close-modal-btn")
  .addEventListener("click", closeModal);

// Funções de Animação de Scroll (MANTIDO)
function reveal() {
  const reveals = document.querySelectorAll(".reveal");

  for (let i = 0; i < reveals.length; i++) {
    const windowHeight = window.innerHeight;
    const elementTop = reveals[i].getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    }
  }
}

window.addEventListener("scroll", reveal);
// Chama uma vez no carregamento caso o elemento já esteja visível
reveal();

// Função para Animar Contadores (NOVO - Para a Seção de Estatísticas)
function countUp(el) {
  let count = 0;
  const target = parseInt(el.dataset.countTarget);
  const counter = el.querySelector(".stat-counter");
  const duration = 2000; // 2 segundos
  const steps = Math.ceil(duration / 10); // 10ms por passo

  const step = target / steps;

  const interval = setInterval(() => {
    count += step;
    if (count >= target) {
      clearInterval(interval);
      count = target;
    }
    // Usa Math.round para evitar casas decimais indesejadas
    counter.textContent = Math.round(count);
  }, 10);
}

// Observador para iniciar animações
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll("[data-count-target]");

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5, // Aciona quando 50% do elemento está visível
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        countUp(entry.target);
        observer.unobserve(entry.target); // Para a observação depois de animar
      }
    });
  }, options);

  counters.forEach((counter) => {
    observer.observe(counter);
  });
});

// Função para o Header Glassmorphism (MANTIDO)
window.onscroll = function () {
  const header = document.getElementById("main-header");
  const scrollThreshold = 50; // Altura do scroll para mudar o header

  if (window.scrollY > scrollThreshold) {
    header.classList.add("glass-header", "shadow-md", "py-4");
    header.classList.remove("py-5");
  } else {
    header.classList.remove("glass-header", "shadow-md", "py-4");
    header.classList.add("py-5");
  }
};

// Toggle do Menu Mobile (MANTIDO)
document.getElementById("mobile-btn").addEventListener("click", function () {
  const menu = document.getElementById("mobile-menu");
  menu.classList.toggle("hidden");
});

// Fechar menu mobile ao clicar no link (MANTIDO)
document.querySelectorAll(".mobile-link").forEach((link) => {
  link.addEventListener("click", () => {
    document.getElementById("mobile-menu").classList.add("hidden");
  });
});
