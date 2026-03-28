document.addEventListener('DOMContentLoaded', function () {

  // --- Mobile Navigation Toggle ---
  const navToggle = document.querySelector('.nav__toggle');
  const navList = document.querySelector('.nav__list');

  if (navToggle && navList) {
    navToggle.addEventListener('click', function () {
      navToggle.classList.toggle('active');
      navList.classList.toggle('open');
    });

    // Close menu when a link is clicked
    navList.querySelectorAll('.nav__link').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.classList.remove('active');
        navList.classList.remove('open');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
      if (!navToggle.contains(e.target) && !navList.contains(e.target)) {
        navToggle.classList.remove('active');
        navList.classList.remove('open');
      }
    });
  }

  // --- Active Nav Highlighting ---
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('nav__link--active');
    }
  });

  // --- Scroll-triggered Header Shadow ---
  var header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 0) {
        header.classList.add('header--scrolled');
      } else {
        header.classList.remove('header--scrolled');
      }
    }, { passive: true });
  }

  // --- Fade-in Animations ---
  var fadeElements = document.querySelectorAll('.fade-in');
  if (fadeElements.length > 0 && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    fadeElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show all elements immediately
    fadeElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // --- Contact Form Handling ---
  var contactForm = document.getElementById('contact-form');
  var formSuccess = document.getElementById('form-success');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Clear previous errors
      contactForm.querySelectorAll('.form-group').forEach(function (group) {
        group.classList.remove('has-error');
      });

      var isValid = true;

      // Validate required fields
      var name = contactForm.querySelector('#name');
      var email = contactForm.querySelector('#email');
      var subject = contactForm.querySelector('#subject');
      var message = contactForm.querySelector('#message');

      if (!name.value.trim()) {
        name.closest('.form-group').classList.add('has-error');
        isValid = false;
      }

      if (!email.value.trim() || !isValidEmail(email.value)) {
        email.closest('.form-group').classList.add('has-error');
        isValid = false;
      }

      if (!subject.value.trim()) {
        subject.closest('.form-group').classList.add('has-error');
        isValid = false;
      }

      if (!message.value.trim()) {
        message.closest('.form-group').classList.add('has-error');
        isValid = false;
      }

      if (isValid) {
        // Hide form & show success message
        contactForm.style.display = 'none';
        formSuccess.style.display = 'block';

        // To integrate with a form service (e.g., Formspree), replace the above with:
        // fetch('https://formspree.io/f/YOUR_FORM_ID', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({
        //     name: name.value,
        //     email: email.value,
        //     phone: contactForm.querySelector('#phone').value,
        //     subject: subject.value,
        //     message: message.value
        //   })
        // }).then(function () {
        //   contactForm.style.display = 'none';
        //   formSuccess.style.display = 'block';
        // });
      }
    });
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

});
