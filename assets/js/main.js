/*===== MENU SHOW =====*/
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId);

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("show");
    });
  }
};
showMenu("nav-toggle", "nav-menu");

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove("show");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll("section[id]");

const scrollActive = () => {
  const scrollDown = window.scrollY;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute("id"),
      sectionsClass = document.querySelector(
        ".nav__menu a[href*=" + sectionId + "]"
      );

    if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
      sectionsClass.classList.add("active-link");
    } else {
      sectionsClass.classList.remove("active-link");
    }
  });
};
window.addEventListener("scroll", scrollActive);

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2000,
  delay: 200,
  //     reset: true
});

sr.reveal(".home__data, .about__img, .skills__subtitle, .skills__text", {});
sr.reveal(".home__img, .about__subtitle, .about__text, .skills__img", {
  delay: 400,
});
sr.reveal(".home__social-icon", { interval: 200 });
sr.reveal(".skills__data, .work__img, .contact__input", { interval: 200 });

/*===== CONTACT BUTTON FUNCTIONALITY =====*/
const contactButton = document.getElementById("contact-button");
const contactSection = document.getElementById("contact");

if (contactButton && contactSection) {
  contactButton.addEventListener("click", () => {
    // Scroll to contact section
    contactSection.scrollIntoView({ behavior: "smooth" });

    // Optional: if you want to highlight the contact section or perform other actions
    contactSection.classList.add("highlight");

    // Remove highlight after a few seconds (optional)
    setTimeout(() => {
      contactSection.classList.remove("highlight");
    }, 3000); // Adjust time as needed
  });
}

const contactform = document.getElementById("contact-form");
contactform.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("form submitted");
  const formdata = new FormData(e.target);
  const body = Object.fromEntries(formdata);
  const url = "https://api.emailjs.com/api/v1.0/email/send";
  fetch(url, {
    method: "POST", // Specify the method
    headers: {
      "Content-Type": "application/json", // Specify the content type
    },
    body: JSON.stringify({
      service_id: "service_v2n71bv",
      template_id: "template_92gd2ur",
      user_id: "SAIBplBKSLiEaGPUZ",
      template_params: {
        from_name: body.name,
        to_name: "Supriya Mugeraya",
        reply_to: body.email,
        to_email: "mugerayasupriya@gmail.com",
        message: body.message,
      },
    }), // Convert data to a JSON string
  })
    .then((response) => {
      if (response.status != 200) {
        throw new Error("Network response was not ok");
      }
      return response.json(); // Parse the JSON response
    })
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
