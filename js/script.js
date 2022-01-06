'use strict';
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list';
let html = '';


const titleClickHandler = function (event) {
  const clickedElement = this;
  console.log('Link was clicked!');
  event.preventDefault();
  console.log(event);

  /*[DONE] remove class 'active' from all article links  */
  const activeLink = document.querySelector('.titles a.active');
  if (activeLink) activeLink.classList.remove('active');

  /*[DONE] add class 'active' to the clicked link */

  clickedElement.classList.add('active');
  console.log('clickedElement:', clickedElement);

  /* [DONE]remove class 'active' from all articles */
  const activeArticle = document.querySelector('.posts .post.active');

  if (activeArticle) activeArticle.classList.remove('active');

  /* [IN PROGRESS] get 'href' attribute from the clicked link */

  const hrefValue = clickedElement.getAttribute('href');
  console.log(hrefValue);

  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(hrefValue);
  console.log('Correct article:', targetArticle);

  /*[IN PROGRESS] add class 'active' to the correct article */
  targetArticle.classList.add('active');

};

function generateTitleLinks(customSelector = ''){

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  for (let article of articles) {
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
  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }

}

generateTitleLinks();

function generateTags() {

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector); // [article, aricle2, article]

  /* START LOOP: for every article: */
  for (let article of articles) {
    console.log(article);

    /* find tags wrapper */
    const tagsList = article.querySelector(optArticleTagsSelector);
    tagsList.innerHTML = '';

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags'); // 'plant sport'
    console.log('Target tag is:', articleTags);

    /* split tags into array */
    const articleTagsArray = articleTags.split(' '); // 'plant sport' -> ['plant', 'sport']
    console.log('articleTagsArray :', articleTagsArray); 

    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      console.log('each tag of articleTagsArray :', articleTagsArray);

      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      console.log('created link html:', linkHTML);

      /* add generated code to html variable */
      html = html + linkHTML
    }

    // html = '<li><a href="#tag-plant>plant</a></li><li><a href="#tag-plant>sport</a></li>"

  
    /* insert HTML of all the links into the tags wrapper */
    tagsList.innerHTML = html;
  }

}

generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const hrefValue = clickedElement.getAttribute('href');
  console.log(hrefValue);

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log('tag extracted from the href constant:' , tag);

  /* find all tag links with class active */
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */
  for (let link of activeTags){

    /* remove class active */
    link.classList.remove('active');

  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const linksWithMathingTags = document.querySelectorAll('a[href="' + href + '"]');
  console.log('Links with matching tag:', linksWithMathingTags);

  /* START LOOP: for each found tag link */
  for (let link of linksWithMathingTags){

    /* add class active */
    link.classList.add('active');

  /* END LOOP: for each found tag link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* find all links to tags */
  const linksToTags = document.querySelectorAll('a.[href^="#tag-"]');

  /* START LOOP: for each link */
  for (let link of linksToTags){

    /* add tagClickHandler as event listener for that link */
    const tagClickHandler = function (event){
      const clickedElement = this;
      console.log('Tag was clicked!');
    }
  /* END LOOP: for each link */
  }
}

addClickListenersToTags();