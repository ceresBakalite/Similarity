const slideInterval = 2000;
const slideRepeatInterval = 20000;

var slideIndex = 1;
var slideRepeat = null;
var slideRepeatTrigger = false;

function getSlide(n)
{
    startSlideViewer(slideIndex += n);
}

function setSlide(n)
{
    startSlideViewer(slideIndex = n);
}

function startSlideViewer(n = 1)
{
    checkElapsedTime();

    slideRepeatTrigger = false;

    let slides = document.getElementsByClassName('slideview');
    let dots = document.getElementsByClassName('dot');

    if (n > slides.length) slideIndex = 1;

    if (n < 1) slideIndex = slides.length;

    for (let i = 0; i < slides.length; i++) { slides[i].style.display = 'none'; }
    for (let i = 0; i < dots.length; i++) { dots[i].className = dots[i].className.replace(' active', ''); }

    slides[slideIndex-1].style.display = 'block';
    dots[slideIndex-1].className += ' active';
}

function startSlideViewerRepeat()
{
    slideRepeatTrigger = true;

    let slides = document.getElementsByClassName('slideview');

    for (let i = 0; i < slides.length; i++) { slides[i].style.display = 'none'; }

    slideIndex++;

    if (slideIndex > slides.length) slideIndex = 1;
    slides[slideIndex-1].style.display = 'block';

    slideRepeat = setTimeout(startSlideViewerRepeat, slideInterval);
}

function relocateImage(el)
{
    window.open(el.getAttribute('src'), 'image');
}

function checkElapsedTime()
{
    if (!slideRepeatTrigger)
    {
        // if elapsed time > slideRepeatInterval startSlideViewerRepeat
    }
}
