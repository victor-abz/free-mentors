
    // When the user scrolls the page, execute stickyHeader function 
window.onscroll = function() {stickyHeader()};

// Get the header
var header = document.getElementById("appHeader");

// Get the offset position of the navbar
var sticky = header.offsetTop;

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
const stickyHeader = () => {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky-header");
  } else {
    header.classList.remove("sticky-header");
  }
}


// Login functions
function toggleSignUp() {
  document.getElementById("login-toggle").style.backgroundColor="#fff";
  document.getElementById("login-toggle").style.color="#222";
  document.getElementById("signup-toggle").style.backgroundColor="#57b846";
  document.getElementById("signup-toggle").style.color="#fff";
  document.getElementById("signin-form").style.display="none";
  document.getElementById("signup-form").style.display="block";
}
    
function toggleLogIn() {
  document.getElementById("login-toggle").style.backgroundColor="#57B846";
  document.getElementById("login-toggle").style.color="#fff";
  document.getElementById("signup-toggle").style.backgroundColor="#fff";
  document.getElementById("signup-toggle").style.color="#222";
  document.getElementById("signup-form").style.display="none";
  document.getElementById("signin-form").style.display="block";
}




// POP UP

// Get the modal
var modal = document.getElementById("requestSession");

// Get the button that opens the modal
var btn = document.getElementById("requestButton");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
