// Перемикання вкладок
const tabBtns = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        tabBtns.forEach(item => item.classList.remove("active"));
        tabContents.forEach(item => item.classList.remove("active"));

        btn.classList.add("active");

        const tabId = btn.getAttribute("data-tab");
        document.getElementById(tabId).classList.add("active");
    });
});

// Модальне вікно
const modal = document.getElementById("my-modal");
const openBtn = document.getElementById("open-modal-btn");
const closeBtn = document.querySelector(".close-modal");

// Відкриття
openBtn.addEventListener("click", () => {
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
});

// Закриття
function closeModal() {
    modal.classList.remove("open");
    document.body.style.overflow = "";
}

closeBtn.addEventListener("click", closeModal);

// Закриття при кліку на затемнений фон
modal.addEventListener("click", event => {
    if (event.target === modal) {
        closeModal();
    }
});

// Закриття клавішею Escape
document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeModal();
    }
});

// Демонстраційна обробка форми
document.getElementById("contact-form")
    .addEventListener("submit", event => {
        event.preventDefault();

        document.getElementById("form-message").textContent =
            "Демонстраційна форма: дані не надсилаються.";
    });