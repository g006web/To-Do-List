let toDo_textInput = document.getElementById("to-do_text-input");
let toDo_ul = document.getElementById("to-do_ul");
let progressImg = document.getElementById("progress-img");
let toDo_array = [];
let toDo_done_array = [];
let progress_images_url =[
    "https://img.pngio.com/download-free-png-seed-png-dlpngcom-seed-tree-png-400_306.png",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSvw0bzOH0y-4YgD7jSwzni39vVzit5Wd1L_bUGaGMKV6olkbNN&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQKOwhaiv_v-xNmgUxTgjcT2ems93efeLHJ06heOqjBH-juNmbL&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS9roJO4l4j5tpu9WrYG-NBMt7IPq432oxILrSPNCBcWjjAsqm_&usqp=CAU",
];
    let task_done = 0;
// Read and add task
exportArrayFromLocalStorage();
for (let i = 0; i<toDo_array.length; i++){
    create_toDo_li(toDo_array[i], toDo_done_array[i]);
}
progress();

// function importArrayInLocalStorage saved arrays in local storage
function importArrayInLocalStorage(){
    localStorage.setItem("toDo_array",
    JSON.stringify(toDo_array) // convert to string (in local storage saved only string)
    );
    localStorage.setItem("toDo_done_array",
    JSON.stringify(toDo_done_array) // convert to string (in local storage saved only string)
    );
    progress();
}
// Function exportArrayFromLocalStorage() tekes arrays from local storage 
function exportArrayFromLocalStorage(){
    toDo_array = JSON.parse(localStorage.getItem("toDo_array")) || [];
    toDo_done_array = JSON.parse(localStorage.getItem("toDo_done_array")) || [];
}
// function add works when button who has class add-button clicks in HTML file
function add(){
    let toDo_text = toDo_textInput.value; // value input who has id to-do_text-input in HTML file
    if(toDo_text.trim().length === 0){ // if input value has only white spaces  return
        return;
    }
    toDo_textInput.value = "";
    create_toDo_li(toDo_text,false);
    toDo_array.push(toDo_text);
    toDo_done_array.push(false);
    importArrayInLocalStorage();

    
  
    
   
}
// create li in ul who has id to-do_ul(in HTML file)
function create_toDo_li(text, done){
    let toDo_textNode = document.createTextNode(text);
    // create input:checkbox 
    let checkboxInput = document.createElement("input");
    checkboxInput.setAttribute("type", "checkbox");
    checkboxInput.setAttribute("onclick", "toDo_check(this)"); 
    checkboxInput.checked = done; 
    // create element label and add to it checkbox and text Node
    let toDo_label = document.createElement("label");
    toDo_label.classList.add("toDo-labelStyle");
    toDo_label.appendChild(checkboxInput);
    toDo_label.appendChild(toDo_textNode);
    // add label class toDoLabelPressed if task done
    if(done === true){
        toDo_label.classList.add("toDoLabelPressed");
    }
    else{
        toDo_label.classList.remove("toDoLabelPressed");
    }
    // create delete button
    let deleteButton = document.createElement("button");
    deleteButton.setAttribute("onclick", "toDo_delete_click(this);"); 
    deleteButton.innerHTML="X";
    deleteButton.classList.add("deleteButton_style");
     // create element li and add to it label and delete button
    let toDo_Li = document.createElement("li");
    toDo_Li.appendChild(toDo_label);
    toDo_Li.appendChild(deleteButton);
    toDo_ul.appendChild(toDo_Li);
}
// function toDo_delete_click work when pressed deleteButton
function toDo_delete_click(pressedDeleteButton){
 let pressedLi = pressedDeleteButton.parentElement; //decide pressedLi
 let deleteIndex  = liIndexInUL(pressedLi);//decide li  index in ul 
 toDo_array.splice(deleteIndex, 1); // delete element in array toDo_array
 toDo_done_array.splice(deleteIndex, 1);
 importArrayInLocalStorage();
 pressedLi.remove();
 
}
// function liIndexInUL deside li index in ul
function liIndexInUL(li){
    let index = Array.prototype.slice.call(li.parentElement.children).indexOf(li);
    return index;
}
// function toDo_check work if check checkboxInput
function toDo_check(pressedCheckbox){
     let pressedLabel = pressedCheckbox.parentElement;
     let pressedLi = pressedLabel.parentElement;
     let pressedIndex = liIndexInUL(pressedLi);

     if(pressedCheckbox.checked === true){
        pressedLabel.classList.add("toDoLabelPressed");
        toDo_done_array[pressedIndex] = true;
     }
     else{
        pressedLabel.classList.remove("toDoLabelPressed");
        toDo_done_array[pressedIndex] = false;
     }
     importArrayInLocalStorage();
     
}
function progress(){
let all_tasks = toDo_done_array.length;
let done_tasks = 0;

    for(let i = 0; i<all_tasks; i++){
        if(toDo_done_array[i] === true){
            done_tasks++;
        }
    }
    let done_persent = 0;
    if (all_tasks !== 0){
        done_persent = done_tasks / all_tasks;
    }
    let index = Math.floor(done_persent * (progress_images_url.length - 1));
    progressImg.src = progress_images_url[index];

    
}