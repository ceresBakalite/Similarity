function getMarkdown(ms, target)
{
  switch (target)
  {
    case 'shell':
      refreshMarkdown_Shell();
      break;

    case 'repos':
      refreshMarkdown_Repos();
      refreshMarkdown_Logo();
      break;

    default:
      refreshMarkdown_Shell();
  }

  var interval = setInterval(waitForMarkdown, ms);
}

function refreshMarkdown_Shell()
{
  document.getElementsById("shell").setAttribute("file", "https://ceresbakalite.github.io/similarity/shell/README.md?" + getRandomInteger(10000,1000000));
}

function refreshMarkdown_Repos()
{
  document.getElementsById("repos").setAttribute("file", "https://ceresbakalite.github.io/similarity/README.md?" + getRandomInteger(10000,1000000));
}

function waitForMarkdown()
{
  document.getElementById("shell").style.display = "block";
  document.getElementById("repos").style.display = "block";
  document.getElementById("site-footer-display").style.display = "block";
}

function getRandomInteger(min, max)
{
  return Math.floor(Math.random() * (max - min) ) + min;
}

function refreshMarkdown_Logo()
{
  document.getElementsByTagName("img")[0].setAttribute("src", "https://ceresbakalite.github.io/similarity/images/NAVSimilarityLogoShell.png");
}
