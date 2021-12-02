'use strict';

/*document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
  });*/
const titleClickHandler = function(event){
  const clickedElement = this;    
  console.log('Link was clicked!');
  event.preventDefault();
  console.log(event)
  
    /*[DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  
    /*[DONE] add class 'active' to the clicked link */

  clickedElement.classList.add('active');
  console.log('clickedElement:', clickedElement);

    /* [DONE]remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts .post');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
  
    /* [IN PROGRESS] get 'href' attribute from the clicked link */
 
  const articleSelector = clickedElement.getElementbyId('href');
  console.log (articleSelector);

    /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.getElementbyId('href')
    /*[IN PROGRESS] add class 'active' to the correct article */
    
  const clickedArticle = clickedElement.document.querySelectorAll('.posts .post');
  clickedArticle.classList.add('active');
}
  
const links = document.querySelectorAll('.titles a');
  
for(let link of links){
  link.addEventListener('click', titleClickHandler);
}
  