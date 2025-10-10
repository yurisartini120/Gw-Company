/* ============================
   🌌 GW Company - Interações JS
   ============================ */

// Efeito suave ao aparecer os detalhes dos planos
document.querySelectorAll(".plan-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    const details = card.querySelector(".plan-details");
    details.style.transition = "opacity 0.6s ease, transform 0.4s ease";
    details.style.opacity = "1";
    details.style.transform = "translateY(0)";
  });

  card.addEventListener("mouseleave", () => {
    const details = card.querySelector(".plan-details");
    details.style.opacity = "0";
    details.style.transform = "translateY(10px)";
  });
});

// Scroll reveal leve
const revealElements = document.querySelectorAll(".plan-card, header, section h1, section p");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in");
    }
  });
});

revealElements.forEach((el) => observer.observe(el));

// Animação de fade
const style = document.createElement("style");
style.innerHTML = `
.fade-in {
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 1s ease forwards;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}`;
document.head.appendChild(style);


