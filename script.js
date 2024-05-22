let currentIndex = 0;
const images = document.querySelectorAll('.carousel img');
const totalImages = images.length;

images.forEach((img, index) => {
    img.style.left = index === 0 ? '0' : '100%';
});

function changeImage() {
    const previousIndex = currentIndex;
    currentIndex = (currentIndex + 1) % totalImages;

    images[previousIndex].style.left = '-100%';
    images[currentIndex].style.left = '0';

    images[previousIndex].style.left = '100%';
}

setInterval(changeImage, 3000);

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  var scrollBtn = document.getElementById("scrollBtn");
  if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
    scrollBtn.style.display = "block";
  } else {
    scrollBtn.style.display = "none";
  }
}

function scrollToTop() {
  var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
  if (currentScroll > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, currentScroll - (currentScroll / 10));
  }
}
