/**
 * Created by shmuel-d on 17.2.2016.
 */
    console.log("hello");
var form = document.getElementById('form');

function addElement (name,text,time) {
    // create a new div element
    // and give it some content
    var newDiv = document.createElement("div");
    var newContent = document.createTextNode(time+" name:"+name+" text:"+text);
    newDiv.appendChild(newContent); //add the text node to the newly created div.

    // add the newly created element and its content into the DOM

    form.appendChild(newDiv);
}

form.addEventListener("submit",function(e){
    e.preventDefault();
    var text = textArea.value;
    var name = document.getElementById('name').value;
    var date = new Date;
    var minutes = date.getMinutes();

    var hour = date.getHours();
    var time = hour+":"+minutes;
    addElement(name,text,time);
});
var submitBTN = document.getElementById('submitBTN');
var textArea =  document.getElementById('message');
var errorMessage = document.getElementById('error');
console.log(textArea);
textArea.onkeyup = function(){
    var text = textArea.value;
    console.log(text.length);
    if (text.length >= 100){
        textArea.className = "too-long";
        errorMessage.innerHTML = "this is too long!";
        submitBTN.disabled = true;
    }
    else{
        textArea.className = "";
        submitBTN.removeAttribute('disabled');
        errorMessage.innerHTML = "";
    }
}