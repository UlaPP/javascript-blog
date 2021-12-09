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
  console.log ('Correct article:', targetArticle)

    /*[IN PROGRESS] add class 'active' to the correct article */  
  targetArticle.classList.add('active');

}
  
const links = document.querySelectorAll('.titles a');  
for(let link of links){
  link.addEventListener('click', titleClickHandler);
}
  