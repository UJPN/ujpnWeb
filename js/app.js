const scrollToTopBtn = document.getElementById("scrollToTopBtn");

window.onscroll = function () {
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
};

scrollToTopBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

window.addEventListener('DOMContentLoaded', () => {
  fetch('navbar.html')
    .then(res => res.text())
    .then(data => {
      document.getElementById('navbar-container').innerHTML = data;
    });
});




let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    if (i === index) {
      slide.classList.add('active');
    }
  });

  dots.forEach((dot, i) => {
    dot.classList.remove('active');
    if (i === index) {
      dot.classList.add('active');
    }
  });

  currentSlide = index;
}

function nextSlide() {
  let next = (currentSlide + 1) % slides.length;
  showSlide(next);
}

function goToSlide(index) {
  showSlide(index);
}

setInterval(nextSlide, 5000);



// Contact form handler
const contactForm = document.getElementById("contactForm");
/*if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: contactForm.name.value,
        email: contactForm.email.value,
        message: contactForm.message.value,
      }),
    });
    const data = await res.json();
    document.getElementById("contact-status").textContent = data.message;
    contactForm.reset();
  });
}
*/
// Donate form handler
/*const donateForm = document.getElementById("donateForm");
if (donateForm) {
  donateForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = donateForm.donorName.value;
    const email = donateForm.email.value;
    const amount = donateForm.amount.value;

    try {
      const res = await fetch("http://localhost:5000/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, amount, email }),
      });

      const data = await res.json();
      document.getElementById("donate-status").textContent =
        `Thank you, ${name}! We've received your pledge of KES ${amount}. You'll receive a confirmation at ${email}. 💛`;

      donateForm.reset();
    } catch (err) {
      document.getElementById("donate-status").textContent =
        "Oops! Something went wrong. Please try again later.";
    }
  });
}
*/

// Temporarily disable donate form submission
if (donateForm) {
  donateForm.addEventListener("submit", (e) => {
    e.preventDefault();
    document.getElementById("donate-status").textContent =
      "This form is currently in test mode. Donations are not being processed right now.";
  });
}




// Preset amount button handler
document.querySelectorAll(".preset-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const amount = btn.getAttribute("data-amount");
    document.getElementById("amount").value = amount;
  });
});


