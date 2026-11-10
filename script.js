
document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("main section[id]");

    // Menu navigasi HP
    menuToggle.addEventListener("click", function () {
        const isOpen = navMenu.classList.toggle("show");

        menuToggle.setAttribute("aria-expanded", isOpen);
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Tutup menu navigasi" : "Buka menu navigasi"
        );

        menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    // Tutup menu setelah link diklik
    document.querySelectorAll("#navMenu a").forEach(function (link) {
        link.addEventListener("click", function () {
            navMenu.classList.remove("show");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Buka menu navigasi");
            menuToggle.textContent = "☰";
        });
    });

    // Tandai menu sesuai bagian yang sedang terlihat
    function updateActiveLink() {
        let currentSection = "home";

        sections.forEach(function (section) {
            const sectionTop = section.offsetTop - 150;

            if (window.scrollY >= sectionTop) {
                currentSection = section.id;
            }
        });

        navLinks.forEach(function (link) {
            link.classList.toggle(
                "active",
                link.getAttribute("href") === "#" + currentSection
            );
        });
    }

    window.addEventListener("scroll", updateActiveLink);
    updateActiveLink();

    // Tahun footer otomatis
    document.getElementById("year").textContent =
        new Date().getFullYear();

    // Animasi sederhana ketika elemen muncul
    const animatedElements = document.querySelectorAll(
        ".product-card, .benefit-card"
    );

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12 }
        );

        animatedElements.forEach(function (element) {
            element.classList.add("reveal");
            observer.observe(element);
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
  // 1. Tahun otomatis di footer
  document.querySelectorAll(".year").forEach(function (element) {
    element.textContent = new Date().getFullYear();
  });

  // 2. Menu navigasi untuk HP
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
      const isOpen = navLinks.classList.toggle("open");

      menuToggle.textContent = isOpen ? "✕" : "☰";
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Tutup menu setelah tautan dipilih
    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        menuToggle.textContent = "☰";
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });

    // Tutup menu jika pengguna menekan Escape
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        navLinks.classList.remove("open");
        menuToggle.textContent = "☰";
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // 3. Animasi elemen saat muncul di layar
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries, currentObserver) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealElements.forEach(function (element) {
      observer.observe(element);
    });
  } else {
    // Cadangan untuk browser lama
    revealElements.forEach(function (element) {
      element.classList.add("in-view");
    });
  }

  // 4. Filter produk berdasarkan kategori
  const filterButtons = document.querySelectorAll(".filter-btn");
  const plantCards = document.querySelectorAll(".plant-card");

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const selectedCategory = button.dataset.filter;

      filterButtons.forEach(function (item) {
        item.classList.remove("active");
      });

      button.classList.add("active");

      plantCards.forEach(function (card) {
        const category = card.dataset.category;
        const shouldShow =
          selectedCategory === "all" ||
          category === selectedCategory;

        card.classList.toggle("hidden", !shouldShow);
      });
    });
  });

  // 5. Formulir kontak membuka aplikasi email
  const contactForm = document.querySelector("#contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const name = document.querySelector("#name").value.trim();
      const email = document.querySelector("#email").value.trim();
      const topic = document.querySelector("#topic").value;
      const message = document.querySelector("#message").value.trim();

      if (!name || !email || !message) {
        alert("Mohon lengkapi semua kolom yang wajib diisi.");
        return;
      }

      // Ganti dengan alamat email bisnis GreenVibe yang sebenarnya
      const businessEmail = "emailkamu@example.com";

      const subject = encodeURIComponent(
        "Pesan GreenVibe - " + topic
      );

      const body = encodeURIComponent(
        "Nama: " + name +
        "\nEmail: " + email +
        "\nTopik: " + topic +
        "\n\nPesan:\n" + message
      );

      window.location.href =
        "mailto:" + businessEmail +
        "?subject=" + subject +
        "&body=" + body;
    });
  }

  // 6. Efek gerak ringan pada kartu produk
  document.querySelectorAll(".plant-card").forEach(function (card) {
    card.addEventListener("pointerenter", function () {
      card.style.transform = "translateY(-5px)";
    });

    card.addEventListener("pointerleave", function () {
      card.style.transform = "";
    });
  });
});
const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("in-view");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12 }
    );

    revealItems.forEach(item => observer.observe(item));
}

const filterButtons = document.querySelectorAll(".filter-btn");
const productCards = document.querySelectorAll(
    ".plant-card[data-category]"
);

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(item =>
            item.classList.remove("active")
        );

        button.classList.add("active");

        const filter = button.dataset.filter;

        productCards.forEach(card => {
            const show =
                filter === "all" ||
                card.dataset.category === filter;

            card.classList.toggle("is-hidden", !show);
        });
    });
});
