/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

const students = document.getElementsByClassName('student-item');
const searcDiv = document.querySelector('.page-header');

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

// **** creating page numbers at the bottom of the page ****

const appendPageLinks = list => {

  //remove unwanted page numbers after every click, keyeup & cut events
  const link = document.querySelector('.pagination');
  if(link) {
    link.parentNode.removeChild(link);
  }

  // create <div> container with nested <ul> tags
  const div = document.createElement('div');
  div.setAttribute('class', 'pagination');
  div.setAttribute('id', 'pageNumbers');
  const mainDiv = document.querySelector('.page');
  mainDiv.appendChild(div);
  const ul = document.createElement('ul');
  div.appendChild(ul);
   
  // for every page add one <li> including nested <a> tag to <ul>
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

const createElement = (elementName, setAtt, attValue) => {
  const element = document.createElement(elementName);
  element.setAttribute(setAtt, attValue);
  return element;
};
  
const appendToSearchDiv = (elementName, setAtt, attValue) => {
  const element = createElement(elementName, setAtt, attValue);
  searcDiv.appendChild(element);
  return element;
};

// creating <div> container for <input> field and <button>
const div = appendToSearchDiv('div', 'class', 'student-search');

// creating <input> field with placeholder text
const input  = createElement('input', 'placeholder', 'Search for students...');
div.appendChild(input);
input.setAttribute('class', 'searchInput');
input.type = 'text';

// creating a <button>
const button = createElement('button', 'id', 'button');
div.appendChild(button);
button.textContent = 'Search';
button.type =  'button';

// // creating <h1> for alert message if there's no search results 
const h1 = appendToSearchDiv('h1', 'id', 'alert');
h1.textContent = "Sorry, we couldn't find a match for you this time 😿";
h1.style.display = 'none';


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
  h1.style.display = searchResults.length === 0 ? 'block' : 'none';
 
    // call showPage to display student info according to search results
  showPage(searchResults, pageNumbers(searchResults.length));
  // call appendPageLinks to display page numbers according to search results
  appendPageLinks(searchResults);
  // call showPage again to show initial page (all students) if search input is deleted
  showPage(searchResults, 1); 
};

// activate click, keyup & cut event listeners
const search = document.querySelector('.searchInput');
const buttonId = document.querySelector('#button');

buttonId.addEventListener('click', eventHandler);
search.addEventListener('keyup', eventHandler);

// in case searchbar input text is deleted using mouse or keyboard "cut"
// page returns to initial setup
search.addEventListener("cut", () =>{
  h1.style.display = 'none';
  showPage(students, 1);
  appendPageLinks(students);
});

// calling showPage & appendPageLinks so when page loads first time
// it shows info of max 10 students and page links to others if there's more
showPage(students, 1);
appendPageLinks(students);