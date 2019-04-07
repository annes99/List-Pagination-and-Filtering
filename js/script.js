/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

const students = document.getElementsByClassName('student-item');
const itemsToShow = 10;

// func to calculate correct number of page links (max 10 per page)
const pageNumbers = number => Math.ceil(number / itemsToShow);

// func to display only 10 items per page
const showPage = (list, page) => {
  const startIndex = (page * itemsToShow) - itemsToShow;
  const endIndex = page * itemsToShow;  

  for (let i = 0; i < list.length; i++) {  
    if ([i] >= startIndex && [i] < endIndex) {
      list[i].style.display = 'block';
    } else {
      list[i].style.display = 'none';
    }
  }
};

const appendPageLinks = list => {

   // create <div> container with nested <ul> tags
   const div = document.createElement('div');
   div.setAttribute('class', 'pagination');
   div.setAttribute('id', 'pageNumbers');
   const mainDiv = document.querySelector('.page');
   mainDiv.appendChild(div);
   const ul = document.createElement('ul');
   div.appendChild(ul);
   
 
   // for every page add one <li> with nested <a> tag to <ul>
   for(let i = 1; i <= pageNumbers(list.length); i++){
     const li = document.createElement('li');
     ul.appendChild(li); 
     const a = document.createElement('a');
     li.appendChild(a);
     // adding number and href to <a> tag
     a.setAttribute('href', '#');
     a.textContent = [i];
     // make first a tag  active
     const aTag = document.querySelector('a');
     aTag.classList.add('active');
   }
   const a = document.getElementsByTagName('a');
   // looping over <a> tag first all active tags are removed
   // then active tag is added to link that was just clicked
   for(let i = 0; i < a.length; i++) {
     
     a[i].addEventListener('click', (event) =>{
 
       for(let i = 0; i < a.length; i++) {
         a[i].classList.remove('active');
       } 
 
       let pageNum = a[i].textContent;
       event.target = a[i].classList.add('active');
       showPage(list, pageNum);
     });
   }
   
 };

 // **** creating HTML elements for searchbar ****

// creating <div> container for <input> field and <button>
const searcDiv = document.querySelector('.page-header');
const div = document.createElement('div');
searcDiv.appendChild(div);
div.setAttribute('class', 'student-search');

// creating <input> field with placeholder text
const input = document.createElement('input');
div.appendChild(input);
input.setAttribute('placeholder', 'Search for students...');
input.setAttribute('class', 'searchInput');
input.type = 'text';

// creating a <button>
const button = document.createElement('button');
button.textContent = 'Search';
button.type =  'button';
button.setAttribute('id', 'button');
div.appendChild(button);

// alert if no search results 

const alert = document.createElement('h1');
alert.textContent = "Sorry, we couldn't find a match for you this time 😿";
alert.setAttribute('id', 'alert');
searcDiv.appendChild(alert);
alert.style.display = 'none';

 // calling showPage & appendPageLinks so when page loads first time
// it shows info of max 10 students and page links to others if there's more
showPage(students, 1);
appendPageLinks(students);