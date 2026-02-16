(function (){
    'use strict'
    console.log('reading js');

    const oldImage = document.querySelector('#old-image');
    const middleImage = document.querySelector('#middle-image');
    const newImage = document.querySelector('#new-image');

    const text1 = document.querySelector('#text-1');
    const text2 = document.querySelector('#text-2');
    const text3 = document.querySelector('#text-3');

    const hint = document.querySelector('#hint');

    window.addEventListener('scroll', function() {
            

    const scrollPosition = window.pageYOffset; 
    const pageHeight = document.documentElement.scrollHeight - window.innerHeight; 
    const scrollPercent = scrollPosition / pageHeight; 

            if (scrollPercent > 0.05) {
                hint.style.opacity = 0; 
            } else {
                hint.style.opacity = 1;
            }

            
            if (scrollPercent < 0.33) {
                oldImage.style.opacity = 1;
                middleImage.style.opacity = scrollPercent * 3; 
                newImage.style.opacity = 0;
            }
            else if (scrollPercent < 0.66) {
                const middleProgress = (scrollPercent - 0.33) / 0.33; 
                
                oldImage.style.opacity = 0.3; 
                middleImage.style.opacity = 1;
                newImage.style.opacity = middleProgress * 0.8; 
            }
          
            else {
                const endProgress = (scrollPercent - 0.66) / 0.34;
                
                oldImage.style.opacity = 0;
                middleImage.style.opacity = 0.3 - (endProgress * 0.3); 
                newImage.style.opacity = 1;
            }


            if (scrollPercent < 0.2) {
                text1.style.opacity = 1; 
            } else {
                text1.style.opacity = 0; 
            }

            
            if (scrollPercent > 0.4 && scrollPercent < 0.6) {
                text2.style.opacity = 1;
            } else {
                text2.style.opacity = 0;
            }

            if (scrollPercent > 0.75) {
                text3.style.opacity = 1;
            } else {
                text3.style.opacity = 0;
            }
        });
// I am still working on the scroll effect. But this is a good starting point.
        window.dispatchEvent(new Event('scroll'));
})();       
        