window.onload = function() {
   
   const ellipsisElements = document.getElementsByClassName('ellipsis');
   console.log(ellipsisElements);
   
   for (const element of ellipsisElements) {
      console.log(element);
      
      element.innerHTML = `<span style>${element.innerText}</span>`;
      const span = element.getElementsByTagName('span')[0];
      
      element.addEventListener('mouseover', () => {
         console.log('#');
         const speed = parseInt(element.getAttribute('speed'));
         const length = span.getBoundingClientRect().width - element.getBoundingClientRect().width;
         const time = length / speed;
         span.style.transition = `left ${time}s linear`;
         span.style.left = `-${length}px`;
      });

      element.addEventListener('mouseout', () => {
         span.setAttribute('style', '');
      });

      element.addEventListener('click', () => {
         if (span.getAttribute('style')) {
            span.setAttribute('style', '');
         } else {
            const speed = parseInt(element.getAttribute('speed'));
            const length = span.getBoundingClientRect().width - element.getBoundingClientRect().width;
            const time = length / speed;
            span.style.transition = `left ${time}s linear`;
            span.style.left = `-${length}px`;
         }
      });
   }
}

// Mio