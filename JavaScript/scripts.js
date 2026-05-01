const btnOpen = document.querySelector('#btnOpen');
const btnClose = document.querySelector('#btnClose');
const media = window.matchMedia('(width < 65em)'); 

// functions for hamburger menu
function openMobileMenu() {
    btnOpen.setAttribute('aria-expanded', 'true');
}

function closeMobileMenu() {
    btnOpen.setAttribute('aria-expanded', 'false');
}

function setupTopNav(e) {
    if (!e.matches) {
        // forces menu to close if screen suddenly changes in the size
        closeMobileMenu(); 
    }
}

// event listeners
btnOpen.addEventListener('click', openMobileMenu);
btnClose.addEventListener('click', closeMobileMenu);
media.addEventListener('change', setupTopNav);


//Accordian 

// Grabs all the buttons with class accordion
var acc = document.getElementsByClassName("accordion");
var i;

// Loops through each object using for loop
for (i = 0; i < acc.length; i++) {
    
    acc[i].addEventListener("click", function() {
        // Find the panel directly next to the button
        var panel = this.nextElementSibling;
        
        // function checking if its currently opened or closed
        if (panel.style.display === "block") {
            panel.style.display = "none";
            
            //makes aria to false
            this.setAttribute('aria-expanded', 'false');
            
            // Swaps arrows
            this.firstElementChild.classList.remove('up');
            this.firstElementChild.classList.add('down');
            
        } else {
            // 
            panel.style.display = "block";
            
            // aria to true
            this.setAttribute('aria-expanded', 'true');
            
            // Swap the arrows
            this.firstElementChild.classList.remove('down');
            this.firstElementChild.classList.add('up');
        }
    });
}