// Smooth scroll functionality
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
  
  // Fade-in animation
  window.addEventListener('scroll', function() {
    let elements = document.querySelectorAll('.fade-in');
    let windowHeight = window.innerHeight;
    elements.forEach(function(element) {
      let position = element.getBoundingClientRect().top;
      if (position < windowHeight) {
        element.classList.add('visible');
      }
    });
  });
  