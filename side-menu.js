function toggleMenu() {
    const sidebar = document.getElementById("sidebar");
    const mainContent = document.querySelector(".main-content");
    
    sidebar.classList.toggle("closed");
    
    mainContent.classList.toggle("expanded");
}


function setActive(clickedElement) {
   
    event.preventDefault();

   
    const menuLinks = document.querySelectorAll('.menu-link');
    
   
    menuLinks.forEach(link => {
        link.classList.remove('active');
    });
    
  
    clickedElement.classList.add('active');
}


function logoutAlert() {
    event.preventDefault();
    alert("You have been successfully logged out!");
}
