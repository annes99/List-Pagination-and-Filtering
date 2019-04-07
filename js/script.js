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

   //func to prevent unwanted pagelinks showing after click & pageup events
  const link = document.querySelector('.pagination');
  if(document.contains(link)) {
    link.remove();
  }

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

// ***** click & keyup eventhandler for searchbar ********

const  eventHandler = () => {
    
   let searchBarInput;
   // checking if it's a mouseEvent to give correct value to searchBarInput
   // also input/output to lowerCase, so case would not be an issue
   MouseEvent ? searchBarInput = search.value.toLowerCase() : searchBarInput = event.target.value.toLowerCase();
   // creating a array to store search results 
   let searchResults = [];
   // getting all students names
   const people = document.querySelector(".student-list").getElementsByTagName('h3');
     for(let i = 0; i < people.length; i++){
       let name = people[i].textContent;
       students[i].style.display = 'none';
       
         // cheking if the searchbar input includes part of student name
         // if yes, store it searchResults, it's used for displaying correct students & pagenumbers
       if (name.toLowerCase().includes(searchBarInput)) {
         searchResults.push(students[i]);
         } 
     }
 
   // if search ends whith no results a message will be displayed
  alert.style.display = searchResults.length === 0 ? 'block' : 'none';
 
  // call showPage to display student info according to search results
 showPage(searchResults, pageNumbers(searchResults.length));
 // call appendPageLinks to display page numbers according to search results
 appendPageLinks(searchResults);
 // call showPage again to show initial page (all students) if search input is deleted
 showPage(searchResults, 1); 
};



const search = document.querySelector('.searchInput');
const buttonId = document.querySelector('#button');

buttonId.addEventListener('click', eventHandler);
search.addEventListener('keyup', eventHandler);

 // calling showPage & appendPageLinks so when page loads first time
// it shows info of max 10 students and page links to others if there's more
showPage(students, 1);
appendPageLinks(students);