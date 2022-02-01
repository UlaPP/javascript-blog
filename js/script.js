'use strict';
const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  //tagCloudLink: ;
 // authorsListLink: ;
}
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = 5,
  optAuthorsListSelector = '.authors.list';
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
  let html = '';
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  for (let article of articles) {
    console.log(article);

    /* get the article id */
    const articleId = article.getAttribute('id');

    /* find the title element */

    /* get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* create HTML of the link */
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);
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

  function calculateTagsParams(tags) {
    const params = {
      min: 99999,
      max: 0
    };

    for(const tag in tags) {
      if(tags[tag] > params.max){
        params.max = tags[tag];
      }
      if (tags[tag] < params.min){
        params.min = tags[tag];
      }
    }

    return params;
  }

  function calculateTagClass(count, params) {
    const normalizedCount = count - params.min; // 4 - 2 = 2
    const normalizedMax = params.max - params.min; // 8 - 2 = 6
    const percentage = normalizedCount / normalizedMax; // 2/6 = 1/3
    const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );

    return 'tag-size-' + classNumber;
  }

  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};
  console.log('allTags:', allTags );

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
      const linkHTMLData = {tag: tag};
      const linkHTML = templates.tagLink(linkHTMLData);
      console.log('created link html:', linkHTML);

      /* add generated code to html variable */
      html = html + linkHTML
      /* [NEW] check if this link is NOT already in allTags
      Sprawdzamy, czy dokładnie taki link mamy już w tablicy allTags Zwróć uwagę, że w warunku użyliśmy wykrzyknika (!), czyli zastosowaliśmy negację. Dlatego warunek czytamy jako "jeśli allTags NIE MA klucza tag".*/
      if(!allTags[tag]) {
      /* [NEW] add tag to allTags object
      Jeśli go nie mamy, dodajemy go do tej tablicy */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    }

    // html = '<li><a href="#tag-plant>plant</a></li><li><a href="#tag-plant>sport</a></li>"


    /* insert HTML of all the links into the tags wrapper */
    tagsList.innerHTML = html;

  }
  /* [NEW] find list of tags in right column
  Na końcu funkcji znajdujemy listę tagów i dodajemy do niej wszystkie linki znajdujące się w tablicy*/
  const tagList = document.querySelector(optTagsListSelector);

  /* [NEW] create variable for all links HTML code */
  const allTagsHTMLData = {tags: []};

  const tagsParams = calculateTagsParams(allTags);
  for(let tag in allTags){
    /* [NEW] generate code of a link and add it to allTagsHTML */
    /*allTagsHTML += '<li><a href="#tag-' + tag +'" class="' + calculateTagClass(allTags[tag], tagsParams) + '">' + tag + '</a></li>';*/
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });
  }
  /* [NEW] END LOOP: for each tag in allTags: */

  /*[NEW] add HTML from allTagsHTML to tagList */
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
  console.log('allTagsData:', allTagsData);

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
  const tag = hrefValue.replace('#tag-', '');
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

  /* [NEW] create a new variable allTags with an empty array */
  const allAuthors = {};

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for (let article of articles) {
    console.log(article);

    /* find authors wrapper*/
    const authorWrapper = article.querySelector(optAuthorSelector);
    /*tagsList.innerHTML = '';*/

    /* get authors from data-author attribute */
    const author = article.getAttribute('data-author');
    console.log('Target author is:', author);
    /* generate HTML of the link */
    const linkHTMLData = {author: author};
    const linkHTML = templates.authorLink(linkHTMLData);
    console.log('created author link html:', authorlinkHTML);

    /* [NEW] check if this link is NOT already in allAuthors*/
    if(!allAuthors[author]) {
    /* [NEW] add tag to allAuthors object */
      allAuthors[author] = 1;
    } else {
      allAuthors[author]++;
    }
    /* insert HTML of all the authors into the authors wrapper */
    authorWrapper.innerHTML = authorlinkHTML;
  }

  /* [NEW] find list of authors in right column */
  const authorsList = document.querySelector(optAuthorsListSelector);

  /* [NEW] create variable for all links HTML code */
  const allAuthorsData = {author: []};

  for(let author in allAuthors){
    /* [NEW] generate code of a link and add it to allAuthorsHTML */
    /*allAuthorsHTML += '<li><a href="#author-' + author + '"><span>' + author + ' (' + allAuthors[author] + ')</span></a></li>';*/
    allAuthorsData.authorsList.push({
      author: author,
      count: allAuthors[author],
    });
  }
  /* [NEW] END LOOP: for each tag in allAuthors: */

  /*[NEW] add HTML from allAuthorsHTML to authorList */
  authorsList.innerHTML = templates.authorsListLink(allAuthorsData);
  console.log('allAuthorsData:', allAuthorsData)
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
  const author = hrefValue.replace('#author-', '');
  console.log('author extracted from the href constant:' , author);

  /* find all author links with class active */
  const activeAuthors = document.querySelectorAll('a.active[href^="#author"]');

  /* START LOOP: for each active author link */
  for (let link of activeAuthors){

    /* remove class active */
    link.classList.remove('active');

  /* END LOOP: for each active author link */
  }
  /* find all author links with "href" attribute equal to the "href" constant */
  const authorRelatedLinks = document.querySelectorAll('a[href="#author' + author +'"]');
  console.log('Author related links:', authorRelatedLinks);

  /* START LOOP: for each found author link */
  for (let author of authorRelatedLinks){

    /* add class active */
    author.classList.add('active');

  /* END LOOP: for each found author link */
  }

  /* execute function "generateTitleLinks" with author selector as argument */
  // #3: filtrujemy listę artykułów wg autorów
  generateTitleLinks('[data-author="' + author + '"]');
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