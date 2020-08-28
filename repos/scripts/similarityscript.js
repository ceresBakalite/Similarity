function getMarkdown(ms, target)
{
  switch (target)
  {
    case 'shell':
      refreshMarkdown_Shell();
      break;

    case 'repos':
      alert('repose');
      refreshMarkdown_Repos();
      resetMarkdown_Logo("https://ceresbakalite.github.io/similarity/images/NAVSimilarityLogoRepos.png");
      alert('end repose');
      break;

    default:
      refreshMarkdown_Shell();
  }

  var interval = setInterval(waitForMarkdown, ms);
}

function refreshMarkdown_Shell()
{
  document.getElementsByTagName("zero-md")[0].setAttribute("file", "https://ceresbakalite.github.io/similarity/shell/README.md?" + getRandomInteger(10000,1000000));
}

function refreshMarkdown_Repos()
{
  document.getElementsByTagName("zero-md")[0].setAttribute("file", "https://ceresbakalite.github.io/similarity/README.md?" + getRandomInteger(10000,1000000));
}

function resetMarkdown_Logo(url)
{
  url = (url == null) ? "https://ceresbakalite.github.io/similarity/images/NAVSimilarityLogoRepos.png" : url;

  alert('url: ' + url);

  WebComponents.waitFor(() =>
  {
    let el = document.createElement('img');
    el.id = "logo-reset";
    el.align = "right";
    el.src = url;
    document.getElementById("logo-container").appendChild(el);
  });

  //document.getElementById("logo-default").setAttribute("src", "https://ceresbakalite.github.io/similarity/images/NAVSimilarityLogoRepos.png");
  alert('src: ' + el.src);
}

function waitForMarkdown()
{
  document.getElementById("site-footer-display").style.display = "block";
}

function getRandomInteger(min, max)
{
  return Math.floor(Math.random() * (max - min) ) + min;
}
