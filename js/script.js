'use strict';

/*document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
  });*/
const titleClickHandler = function(event){
  const clickedElement = this;
  console.log('Link was clicked!');
  event.preventDefault();
  console.log(event);

  /*[DONE] remove class 'active' from all article links  */
  const activeLink = document.querySelector('.titles a.active');
  if(activeLink) activeLink.classList.remove('active');

  /*[DONE] add class 'active' to the clicked link */

  clickedElement.classList.add('active');
  console.log('clickedElement:', clickedElement);

  /* [DONE]remove class 'active' from all articles */
  const activeArticle = document.querySelector('.posts .post.active');

  if(activeArticle) activeArticle.classList.remove('active');

  /* [IN PROGRESS] get 'href' attribute from the clicked link */

  const hrefValue = clickedElement.getAttribute('href');
  console.log (hrefValue);

  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(hrefValue);
  console.log ('Correct article:', targetArticle);

  /*[IN PROGRESS] add class 'active' to the correct article */
  targetArticle.classList.add('active');

};

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list';
let html = '';



function generateTitleLinks(){

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector);
  for(let article of articles){
    console.log(article);

    /* get the article id */
    const articleId = article.getAttribute('id');

    /* find the title element */

    /* get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log('created link html:', linkHTML);

    /* insert link into titleList */
    /* insert link into html variable */

    html = html + linkHTML;
  }
  titleList.innerHTML = html;
  console.log(html);

  const links = document.querySelectorAll('.titles a');
  console.log(links);
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}
generateTitleLinks();

function generateTags(){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for(let article of articles){
    console.log(article);

  /* find tags wrapper */
  const tagsList = article.querySelector(optArticleTagsSelector);
  tagsList.innerHTML = '';

  /* make html variable with empty string */
  let html = '';

  /* get tags from data-tags attribute */
  const articleTags = article.querySelector(hrefValue);
  console.log ('Target tag is:', articleTags);

  /* split tags into array */
  const articleTagsArray = articleTags.split(' ');
  console.log('articleTagsArray :', articleTagsArray);

  /* START LOOP: for each tag */
  for(let tag of articleTagsArray){
    console.log('each tag of articleTagsArray :', articleTagsArray);

  /* generate HTML of the link */
  const linkHTML = '<li><a href="#tag-' + tag + '"></a></li>';
  console.log('created link html:', linkHTML);

  /* add generated code to html variable */

  
  }

  /* END LOOP: for each tag */

  /* insert HTML of all the links into the tags wrapper */

  /* END LOOP: for every article: */
}

generateTags();
