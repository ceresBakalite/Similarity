
customElements.define('include-directive', class extends HTMLElement
{
  async connectedCallback()
  {
    let src = this.getAttribute('src');
    this.innerHTML = await (await fetch(src)).text();
  }

});

function getQueryString()
{
  const urlParams = new URLSearchParams(window.location.search);
  const mdd = urlParams.get('mdd')

  if (mdd != null) selectMarkdownDocument(mdd);
}

function onloadPrimary()
{
    getQueryString();
    scrollEventListener();
}

function scrollEventListener()
{
  return;

  let iframe = document.getElementById('frame-container');

  let placeholder = iframe.contentWindow || iframe.contentDocument;

  if (placeholder.document)
  {

    //placeholder.addEventListener('scroll', function(event))
    //{
    //  alert(event);
    //});

  }

}

function isValidSource(md)
{
    if (parent.document.getElementById('primary-container')) return true;

    window.location.href = 'https://ceresbakalite.github.io/similarity/?mdd=' + md;

    return false;
}

function onloadComplete(ms, md)
{
  if (isValidSource(md))
  {
    switch (md)
    {
      case 'index':
        setTimeout(function(){ waitForMarkdown('index-md'); }, ms);
        break;

      case 'shell':
        setTimeout(function(){ waitForMarkdown('shell-md'); }, ms);
        break;

      case 'repos':
        setTimeout(function(){ waitForMarkdown('repos-md'); }, ms);
        break;

      default:
        setTimeout(function(){ waitForMarkdown('index-md'); }, ms);
        break;

    }

  }

}

function selectMarkdownDocument(md)
{
  switch (md)
  {
    case 'index':
      getMarkdownDocument('index', 'https://ceresbakalite.github.io/similarity/repos/scripts/SyncIndex.html');
      break;

    case 'shell':
      getMarkdownDocument('shell', 'https://ceresbakalite.github.io/similarity/repos/scripts/SyncShell.html');
      break;

    case 'repos':
      getMarkdownDocument('repos', 'https://ceresbakalite.github.io/similarity/repos/scripts/SyncRepos.html');
      break;

    default:
      getMarkdownDocument('index', 'https://ceresbakalite.github.io/similarity/repos/scripts/SyncIndex.html');
      break;

  }

}

function getMarkdownDocument(id, target)
{
    document.getElementById('frame-container').setAttribute('src', target);
    document.getElementById(id).blur();
}

function waitForMarkdown(target)
{
    document.getElementById('site-footer-display').style.display = 'block';
    document.getElementById('footer-content').style.display = 'block';

    refreshMarkdown(target);

    window.onscroll = function() { myFunction() };
}

function myFunction()
{
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    alert('greater then 50px');
  } else {
    alert('less than 50px');
  }

}

function refreshMarkdown(target)
{
  if (document.getElementById(target))
  {
    document.getElementById(target).setAttribute('src', document.getElementById(target).getAttribute('src') + '?' + getRandomInteger(10000,1000000));

  } else if (document.getElementsByTagName('zero-md')[0]) {
    document.getElementsByTagName('zero-md')[0].setAttribute('src', document.getElementsByTagName('zero-md')[0].getAttribute('src') + '?' + getRandomInteger(10000,1000000));

  } else {
    return false;

  }

  return true;
}

function getRandomInteger(min, max)
{
  return Math.floor(Math.random() * (max - min) ) + min;
}

function adjustHeaderDisplay(attribute)
{
  document.getElementById('site-header-display').style.display = attribute;
}
