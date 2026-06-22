const navToggleButton = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");
const anchorLinks = document.querySelectorAll('a[href^="#"]');
const tradeinForm = document.getElementById("tradein-form");
const estimateOutput = document.getElementById("estimate-output");
const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

if (navToggleButton && nav) {
  navToggleButton.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
}

anchorLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");
    if (!href || href === "#") {
      return;
    }

    const target = document.querySelector(href);
    if (!target) {
      return;
    }

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    nav?.classList.remove("open");
  });
});

if (tradeinForm && estimateOutput) {
  tradeinForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(tradeinForm);
    const model = String(formData.get("model") || "").trim();
    const year = Number(formData.get("year"));
    const mileage = Number(formData.get("mileage"));
    const condition = String(formData.get("condition") || "good");

    const currentYear = new Date().getFullYear();
    const age = Math.max(0, currentYear - year);

    let basePrice = 2200000;
    if (age > 8) {
      basePrice = 850000;
    } else if (age > 5) {
      basePrice = 1300000;
    } else if (age > 2) {
      basePrice = 1800000;
    }

    const conditionFactor = {
      excellent: 1,
      good: 0.9,
      fair: 0.78,
      poor: 0.6,
    };

    const mileagePenalty = Math.max(0, mileage - 60000) * 2.2;
    const agePenalty = age * 45000;
    const estimate = Math.max(
      250000,
      Math.round((basePrice * (conditionFactor[condition] || 0.9) - mileagePenalty - agePenalty) / 1000) * 1000
    );

    estimateOutput.textContent = `Предварительная оценка ${model}: ${estimate.toLocaleString("ru-RU")} ₽`;
  });
}

if (contactForm && formMessage) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();

    if (name.length < 2) {
      formMessage.textContent = "Пожалуйста, укажите имя корректно.";
      formMessage.style.color = "#b42318";
      return;
    }

    formMessage.textContent = `${name}, спасибо! Мы свяжемся с вами в течение 15 минут.`;
    formMessage.style.color = "#146c2e";
    contactForm.reset();
  });
}
