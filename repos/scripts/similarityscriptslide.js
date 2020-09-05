var ceres = {};
(function(slideview)
{
    var index = 1;
    var dot = true;
    var txt = true;

    customElements.define('ceres-directive', class extends HTMLElement
    {
        async connectedCallback()
        {
            let src = this.getAttribute('src');
            this.innerHTML = await (await fetch(src)).text();
        }

    });

    slideview.openImageTab = function(el) { window.open(el.getAttribute('src'), 'image'); };

    slideview.getSlide = function(i) { slideview.startSlideViewer(index += i); };

    slideview.setSlide = function(i) { slideview.startSlideViewer(index = i); };

    slideview.startSlideViewer = function(n)
    {
        let slides = document.getElementsByClassName('slideview');
        let dots = document.getElementsByClassName('dot');

        index = (n < 1) ? slides.length : (n > slides.length) ? 1 : index;

        for (let i = 0; i < slides.length; i++) { slides[i].style.display = 'none'; }
        for (let i = 0; i < dots.length; i++) { dots[i].className = dots[i].className.replace(' active', ''); }

        slides[index-1].style.display = 'block';
        dots[index-1].className += ' active';
    };

    slideview.slideViewer = function()
    {
        slideview.buildSlideViewer();
        slideview.startSlideViewer();
    }

    slideview.testCeresAttributes = function()
    {
        let el = (document.getElementById("ceres-directive")) ? document.getElementById("ceres-directive") : document.getElementsByTagName('ceres-directive')[0];
        let regex = /<noscript>|<\/noscript>/gi;
        let list = el.innerHTML.trim().replace(/<noscript>|<\/noscript>/gi, '')

        dot = (el.getAttribute('dot')) ? el.getAttribute('dot') : dot;
        txt = (el.getAttribute('txt')) ? el.getAttribute('txt') : txt;
        regex = /\r|\n|,| |/gi;

        return list.trim().replace(regex, ';').split(';');
    }

    slideview.getCeresAttributes = function()
    {
        let el = (document.getElementById("ceres")) ? document.getElementById("ceres") : document.getElementsByTagName('ceres')[0];

        dot = (el.getAttribute('dot')) ? el.getAttribute('dot') : dot;
        txt = (el.getAttribute('txt')) ? el.getAttribute('txt') : txt;

        return el.getAttribute('src').split(',');
    }

    slideview.buildSlideViewer = function()
    {
        let ar = slideview.testCeresAttributes();

        for (let el = 0; el < ar.length; ++el)
        {
            alert(ar[el].trim());
        }

    }

})(ceres);
