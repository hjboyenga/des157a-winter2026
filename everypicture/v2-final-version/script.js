(function(){
    'use strict'
    console.log("running js");
    window.addEventListener('scroll', updatePage);
    updatePage();
    function updatePage() {

      // SECTION 1: GLACIER

      var glacierSection = document.querySelector('#glacier-section');
      var glacierImages = document.querySelectorAll('#glacier-images .layer');
      var glacierYear = document.querySelector('#glacier-year');
      var glacierBox = document.querySelector('#glacier-images');


      var scrollY = window.scrollY;

      var hint = document.querySelector('#hint');
      if (scrollY > 100) {
       hint.style.opacity = '0';
      } else {
      hint.style.opacity = '1';
      }

      var sectionStart = glacierSection.offsetTop;
      var scrollableRange = glacierSection.offsetHeight - window.innerHeight;
      var progress = (scrollY - sectionStart) / scrollableRange;


      if (progress < 0) progress = 0;
      if (progress > 1) progress = 1;


      // Show the image container only while we're inside this section
      if (scrollY >= sectionStart && scrollY < sectionStart + glacierSection.offsetHeight) {
        glacierBox.style.display = 'block';
      } else {
        glacierBox.style.display = 'none';
      }

      // Struggled with this part down until section 2, but finally got it to work after I saw other examples online.
      var glacierIndex = Math.floor(progress * glacierImages.length);
      // Make sure the index doesn't go past the last image
      if (glacierIndex >= glacierImages.length) glacierIndex = glacierImages.length - 1;
      // Loop through pictures and hide them all
      for (var i = 0; i < glacierImages.length; i++) {
        glacierImages[i].style.opacity = '0';  // hide this image
      }
      glacierImages[glacierIndex].style.opacity = '1';  // show only the active image

      // Update the year to match the image
      glacierYear.textContent = glacierImages[glacierIndex].getAttribute('data-year');

      // Show/hide each glacier text panel based on scroll progress
      document.querySelector('#text-1984').style.right = (progress >= 0.00 && progress < 0.12) ? '40px' : '-420px';
      document.querySelector('#text-1994').style.right = (progress >= 0.25 && progress < 0.40) ? '40px' : '-420px';
      document.querySelector('#text-2004').style.right = (progress >= 0.50 && progress < 0.62) ? '40px' : '-420px';
      document.querySelector('#text-2014').style.right = (progress >= 0.73 && progress < 0.88) ? '40px' : '-420px';
      document.querySelector('#text-2020').style.right = (progress >= 0.90 && progress <= 1.00) ? '40px' : '-420px';

      // SECTION 2: Las Vegas
     
      var vegasSection = document.querySelector('#vegas-section');
      var vegasImages = document.querySelectorAll('#vegas-images .layer');
      var vegasYear = document.querySelector('#vegas-year');
      var vegasBox = document.querySelector('#vegas-images');

      var vegasStart = vegasSection.offsetTop;
      var vegasScrollable = vegasSection.offsetHeight - window.innerHeight;
      var vegasProgress = (scrollY - vegasStart) / vegasScrollable;

      if (vegasProgress < 0) vegasProgress = 0;
      if (vegasProgress > 1) vegasProgress = 1;

      if (scrollY >= vegasStart && scrollY < vegasStart + vegasSection.offsetHeight) {
        vegasBox.style.display = 'block';
      } else {
        vegasBox.style.display = 'none';
      }

      var vegasIndex = Math.floor(vegasProgress * vegasImages.length);
      if (vegasIndex >= vegasImages.length) vegasIndex = vegasImages.length - 1;

      for (var j = 0; j < vegasImages.length; j++) {
        vegasImages[j].style.opacity = '0';
      }
      vegasImages[vegasIndex].style.opacity = '1';

      vegasYear.textContent = vegasImages[vegasIndex].getAttribute('data-year');

      document.querySelector('#vegas-text-1984').style.right = (vegasProgress >= 0.00 && vegasProgress < 0.15) ? '40px' : '-420px';
      document.querySelector('#vegas-text-2002').style.right = (vegasProgress >= 0.45 && vegasProgress < 0.60) ? '40px' : '-420px';
      document.querySelector('#vegas-text-2020').style.right = (vegasProgress >= 0.88 && vegasProgress <= 1.00) ? '40px' : '-420px';


    }
})();

