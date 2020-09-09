var ceres = {};
(function(slideview)
{
    slideview.defaultStylesheet = 'https://ceresbakalite.github.io/similarity/stylesheets/similaritysheetslide.css';
    slideview.container = 'ceres-slideview';
    slideview.imagelist = 'ceres-csv';

    window.customElements.define(slideview.container, class extends HTMLElement
    {
        async connectedCallback()
        {
            let src = this.getAttribute('src');
            this.innerHTML = (src) ? (src.length > 0) ? await (await fetch(src)).text() : null : null;
        }

    });

    let progenitor = null; // parent slideview place holder
    let attributes = null; // slideview element item attributes array
    let trace = false; // default element attribute - enable the trace environment directive
    let ptr = true; // default element attribute - display slideview item pointers
    let sub = true; // default element attribute - display slideview item subtitles
    let sur = true; // default element attribute - display slideview item surtitles
    let css = true; // default element attribute - use the default slideview stylesheet

    let index = 1;

    slideview.openImageTab = function(el) { window.open(el.getAttribute('src'), 'image'); };
    slideview.getSlide = function(target, calc) { displaySlide(index = (calc) ? index += target : target); };

    slideview.slideViewer = function()
    {
        progenitor = (document.getElementById(slideview.container)) ? document.getElementById(slideview.container) : document.getElementsByTagName(slideview.container)[0];
        attributes = getSlideViewAttributes();

        composeAttribute(slideview.container, 'style', 'display: none;');

        if (attributes) getSlideViewer();

        function getSlideViewAttributes()
        {
            if (progenitor)
            {
                trace = (progenitor.getAttribute('trace')) ? getBoolean(progenitor.getAttribute('trace')) : trace;
                ptr = (progenitor.getAttribute('ptr')) ? getBoolean(progenitor.getAttribute('ptr')) : ptr;
                sub = (progenitor.getAttribute('sub')) ? getBoolean(progenitor.getAttribute('sub')) : sub;
                sur = (progenitor.getAttribute('sur')) ? getBoolean(progenitor.getAttribute('sur')) : sur;
                css = (progenitor.getAttribute('css')) ? getBoolean(progenitor.getAttribute('css')) : css;

                let imageList = getImageList();

                if (trace) console.log(resource('NOTIFY_ImageListMarkup', imageList));

                return (imageList) ? imageListToArray(imageList) : errorHandler('ERROR_NotFoundImageList');

            } else {

                return errorHandler('ERROR_NotFoundProgenitor');

            }

            function imageListToArray(str)
            {
                return str.replace(/((<([^>]+)>))/gi, '').trim().replace(/\r\n|\r|\n/gi, ';').split(';');
            }

            function getMarkupImageList()
            {
                return (document.getElementById(slideview.imagelist)) ? document.getElementById(slideview.imagelist).innerHTML : null;
            }

            function getImageList()
            {
                let list = (progenitor.innerHTML.length > 0) ? progenitor.innerHTML : getMarkupImageList();

                if (!list) return syncRetryAttempt();

                function syncRetryAttempt()
                {
                    let retryAttempt = 0;
                    let retryLimit = 5;
                    let interval = setInterval(lookAgain, 200);

                    function lookAgain()
                    {
                        list = (progenitor.innerHTML.length > 0) ? progenitor.innerHTML : null;
                        if (list)
                        {
                          clearInterval(interval);
                          return list;
                        }

                        if (retryAttempt == retryLimit) clearInterval(interval);

                        if (trace) console.log('Image list search retry attempt [' + slideview.imagelist + ']: ' + (retryAttempt + 1));

                        retryAttempt++;
                    }

                    return list;
               }

            }

        }

    }

    function displaySlide(targetIndex)
    {
        const slides = document.querySelectorAll(".slideview");
        const pointers = document.querySelectorAll(".ptr");

        index = (targetIndex < 1) ? slides.length : (targetIndex > slides.length) ? 1 : index;

        slides.forEach(slide => { slide.style.display = 'none';	} );
        slides[index-1].style.display = 'block';

        if (ptr)
        {
            pointers.forEach(pointer => { pointer.className = pointer.className.replace(' active', '');	} );
            pointers[index-1].className += ' active';
        }

    }

    function activateSlideViewer()
    {
        displaySlide();

        setTimeout(function()
        {
            composeAttribute(slideview.container, 'style', 'display: block;');

        }, 500);

    }

    function composeAttribute(id, type, value)
    {
        let el = document.getElementById(id);

        if (el)
        {
            let attribute = document.createAttribute(type);
            attribute.value = value;

            el.setAttributeNode(attribute);
        }

    }

    function getBoolean(symbol)
    {
        let token = symbol.trim().toUpperCase();

        if (!token) return false;

        switch (token)
        {
            case 'TRUE': return true;
            case 'T': return true;
            case 'YES': return true;
            case 'Y': return true;
            case '1': return true;
            default: return false;
        }

    }

    function errorHandler(name)
    {
        let err = resource(name) + '. DateTime: ' + new Date().toLocaleString();

        console.log(err);
        alert(err);

        return null;
    }

    function resource(name, str)
    {
        let newline = '\n';

        switch (name)
        {
          case 'ERROR_NotFoundImageList': return 'Error: The ' + slideview.container + ' document element was found but the ' + slideview.imagelist + ' image list could not be read';
          case 'ERROR_NotFoundProgenitor': return 'Error: Unable to find the ' + slideview.container + ' document element';
          case 'NOTIFY_LinkOnload': return 'Link default stylesheet insert [' + slideview.container + ']: onload listener';
          case 'NOTIFY_LinkAddEventListener': return 'Link default stylesheet insert [' + slideview.container + ']: addEventListener';
          case 'NOTIFY_LinkStylesheetCount': return 'Link default stylesheet insert [' + slideview.container + ']: styleSheets.length increment';
          case 'NOTIFY_LinkOnReadyState': return 'Link default stylesheet insert [' + slideview.container + ']: onreadystatechange event';
          case 'NOTIFY_ProgenitorInnerHTML': return 'Progenitor innerHTML [' + slideview.container + ']: ' + newline + progenitor.innerHTML;
          case 'NOTIFY_ImageListMarkup': return 'Image list markup [' + slideview.container + ']: ' + newline + str;
          default: return 'An unexpected error has occurred - ' + slideview.container + ' has stopped';
        }

    }

    function getSlideViewer()
    {
        if (css) importSlideViewStylesheet();

        createSlideViewContainer();
        activateSlideViewer();

        function createSlideViewContainer()
        {
            progenitor.innerHTML = null;

            const imageElement = document.createElement('div');
            let progeny = null;

            imageElement.id = slideview.container + '-image-container';
            progenitor.appendChild(imageElement);

            composeAttribute(imageElement.id, 'class', 'slideview-image-container');

            for (let item = 0; item < attributes.length; item++)
            {
                var arrayItem = attributes[item].split(',');
                let qualifier = item + 1;

                let svcname = 'slideview' + qualifier;
                let surName = 'slideview-sur' + qualifier;
                let imgName = 'slideview-img' + qualifier;
                let subName = 'slideview-sub' + qualifier;

                composeElementDIV(svcname, 'slideview fade', imageElement, null);

                progeny = document.getElementById(svcname);

                if (sur) composeElementDIV(surName, 'surtitle', progeny, getSurtitle(qualifier));
                composeElementIMG(imgName, 'ceres.openImageTab(this);', progeny);
                if (sub) composeElementDIV(subName, 'subtitle', progeny, getSubtitle());
            }

            composeElementA('slideview-prev', 'prev', 'ceres.getSlide(-1, true)', imageElement, '&#10094;');
            composeElementA('slideview-next', 'next', 'ceres.getSlide(1, true)', imageElement, '&#10095;');

            createSlideViewPointerContainer();

            function createSlideViewPointerContainer()
            {
                if (!ptr) return;

                progenitor.appendChild(document.createElement('br'));

                const pointerElement = document.createElement('div');

                pointerElement.id = slideview.container + '-pointer-container';
                progenitor.appendChild(pointerElement);

                composeAttribute(pointerElement.id, 'class', 'slideview-pointer-container');

                for (let item = 0; item < attributes.length; item++)
                {
                    let qualifier = item + 1;
                    let svpname = 'slideview-ptr' + qualifier;

                    setSpanElement(svpname, 'ptr', getClickEventValue(qualifier), pointerElement);
                }

                progenitor.appendChild(document.createElement('br'));

                if (trace) console.log(resource('NOTIFY_ProgenitorInnerHTML'));

                function getClickEventValue(indexItem)
                {
                    return 'ceres.getSlide(' + indexItem + ')';
                }

                function setSpanElement(id, classValue, onClickEventValue, parent)
                {
                    let el = document.createElement('span');

                    el.id = id;
                    parent.appendChild(el);

                    composeAttribute(el.id, 'class', classValue);
                    composeAttribute(el.id, 'onclick', onClickEventValue);
                }

            }

            function getURL()
            {
                return (arrayItem[0]) ? arrayItem[0].trim() : null;
            }

            function getSurtitle(indexItem)
            {
                return (sur) ? indexItem + ' / ' + attributes.length : null;
            }

            function getSubtitle()
            {
                return (sub) ? (arrayItem[1]) ? arrayItem[1].trim() : null : null;
            }

            function composeElementDIV(id, classValue, parent, markup)
            {
                let el = document.createElement('div');

                el.id = id;
                parent.appendChild(el);

                composeAttribute(el.id, 'class', classValue);

                if (markup) document.getElementById(el.id).innerHTML = markup;
            }

            function composeElementIMG(id, onClickEventValue, parent)
            {
                let el = document.createElement('img');

                el.id = id;
                parent.appendChild(el);

                composeAttribute(el.id, 'onclick', onClickEventValue);
                composeAttribute(el.id, 'src', getURL());
            }

            function composeElementA(id, classValue, onClickEventValue, parent, markup)
            {
                let el = document.createElement('a');

                el.id = id;
                parent.appendChild(el);

                composeAttribute(el.id, 'class', classValue);
                composeAttribute(el.id, 'onclick', onClickEventValue);
                composeAttribute(el.id, 'src', getURL());

                if (markup) document.getElementById(el.id).innerHTML = markup;
            }

        }

        function importSlideViewStylesheet()
        {
            if (!css) return;

            const link = document.createElement('link');

            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = slideview.defaultStylesheet;
            link.as = 'style';

            onloadListener();
            addEventListener();
            styleSheetsLengthListener();
            onReadyStateChangeListener();

            document.head.appendChild(link);

            function onloadListener()
            {
                link.onload = function ()
                {
                    if (trace) console.log(resource('NOTIFY_LinkOnload'));
                }

            }

            function addEventListener()
            {
                if (link.addEventListener)
                {
                    link.addEventListener('load', function()
                    {
                        if (trace) console.log(resource('NOTIFY_LinkAddEventListener'));
                    }, false);

                }

            }

            function styleSheetsLengthListener()
            {
                var cssnum = document.styleSheets.length;

                var ti = setInterval(function()
                {
                    if (document.styleSheets.length > cssnum)
                    {
                        clearInterval(ti);
                        if (trace) console.log(resource('NOTIFY_LinkStylesheetCount'));
                    }

                }, 10);

            }

            function onReadyStateChangeListener()
            {
                link.onreadystatechange = function()
                {
                    var state = link.readyState;

                    if (state === 'loaded' || state === 'complete')
                    {
                        link.onreadystatechange = null;
                        if (trace) console.log(resource('NOTIFY_LinkOnReadyState'));
                    }

                };

            }

        }

    }

})(ceres);
