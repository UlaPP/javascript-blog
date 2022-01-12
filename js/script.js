'use strict';
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list';
  optAuthorSelector = '.data-author';
  optPostAuthor = '.post-author';/*nowy selector nie wiem czy sensowny*/
  optTagsListSelector = '.tags.list'
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
  console.log(this); // <a href="#tag-sport">sport</a>, <a href="#tag-cooking">cooking</a>

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
  const relatedLinks = document.querySelectorAll('a[href="#tag-' + tag +'"]');
  console.log('Related links:', relatedLinks);

  /* START LOOP: for each found tag link */
  for (let link of relatedLinks){

    /* add class active */
    link.classList.add('active');

  /* END LOOP: for each found tag link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  // #3: filtrujemy listę artykułów wg tagów
  generateTitleLinks('[data-tags~="' + tag + '"]');//[data-tags~="cat"]

}

function addClickListenersToTags(){
  /* find all links to tags */
  const linksToTags = document.querySelectorAll('a[href^="#tag-"]');

  /* START LOOP: for each link */
  for (let link of linksToTags){

    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);

  /* END LOOP: for each link */
  }
}

addClickListenersToTags();

function generateAuthors() {

  /* find all authors */
  const authors = document.querySelectorAll(optAuthorSelector); 

  /* START LOOP: for every article: */
  for (let author of authors) {
    console.log(author);

    /* find authors wrapper */
    const authorsList = author.querySelector(optPostAuthorSelector);
    tagsList.innerHTML = '';

    /* make html variable with empty string */
    let html = '';

    /* get authors from data-author attribute */
    const author = article.getAttribute('data-author'); 
    console.log('Target author is:', author);
      /* generate HTML of the link */
      const authorlinkHTML = '<p class="post-author">by <a href="#author' + author'">"author'</a></p>’;
      console.log('created author link html:', authorlinkHTML);
      /* add generated code to html variable */
      author = author + authorlinkHTML
    }

    /* insert HTML of all the authors into the authors wrapper */
    authorsList.innerHTML = author;
  }

}

generateAuthors();

function authorClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log(this);


  /* make a new constant "href" and read the attribute "href" of the clicked element */
  
  const hrefValue = clickedElement.getAttribute('href');
  console.log(hrefValue);
  
  /* make a new constant "author" and extract author from the "href" constant */
  const author = href.replace('#author', '');
  console.log('author extracted from the href constant:' , author);

  /* find all author links with class active */
  const activeAuthor = document.querySelectorAll('a.active[href^="#author"]');

  /* START LOOP: for each active author link */
  for (let author of activeAuthors){

    /* remove class active */
    link.classList.remove('active');

  /* END LOOP: for each active author link */
  }
  /* find all author links with "href" attribute equal to the "href" constant */
  const authorRelatedLinks = document.querySelectorAll('a[href="#author' + author'"]');
  console.log('Author related links:', AuthorRelatedLinks);

  /* START LOOP: for each found author link */
  for (let author of authorRelatedLinks){

    /* add class active */
    author.classList.add('active');

  /* END LOOP: for each found author link */
  }

  /* execute function "generateTitleLinks" with author selector as argument */
  // #3: filtrujemy listę artykułów wg autorów
  generateTitleLinks('[data-author="' + author'"]');
}

function addClickListenersToAuthors(){
  /* find all links to authors */
  const linksToAuthors = document.querySelectorAll('a[href^="#author"]');

  /* START LOOP: for each link */
  for (let link of linksToAuthors){

    /* add authorClickHandler as event listener for that link */
    link.addEventListener('click', authorClickHandler);

  /* END LOOP: for each link */
  }
}
addClickListenersToAuthors();

function generateTags(){
  /* [NEW] create a new variable allTags with an empty array */
  let allTags = [];

  /* find all articles */

  /* START LOOP: for every article: */

    /* find tags wrapper */

    /* make html variable with empty string */

    /* get tags from data-tags attribute */

    /* split tags into array */

    /* START LOOP: for each tag */

      /* generate HTML of the link */

      /* add generated code to html variable */

      /* [NEW] check if this link is NOT already in allTags */
      if(allTags.indexOf(linkHTML) == -1){
        /* [NEW] add generated code to allTags array */
        allTags.push(linkHTML);
      }

    /* END LOOP: for each tag */

    /* insert HTML of all the links into the tags wrapper */

  /* END LOOP: for every article: */

  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);

  /* [NEW] add html from allTags to tagList */
  tagList.innerHTML = allTags.join(' ');
}


