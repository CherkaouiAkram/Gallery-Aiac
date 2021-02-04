/**local storage */
storeData = JSON.parse(localStorage.storeData|| "[]");
console.log(JSON.parse(localStorage['storeData']));
var inputText = document.getElementById('input-text-id');
var buttonAddInput = document.getElementById('button-add-id');

buttonAddInput.addEventListener('click',addData);


function addData(event){
    console.log(storeData);
       if(inputText.value!=""){
        storeData.push({
            imageUrl:inputText.value,
            comment:[],
           });
           inputText.value = '';
           displayData();
       }
       localStorage.setItem('storeData',JSON.stringify(storeData));
}


function addComment(){

    var commentInput = document.getElementsByClassName('input-to-add-comment')[0];

    if(commentInput.value!=""){
        storeData[commentInput.id.split('-')[1]].comment.push(commentInput.value);
        commentInput.value = '';
        showComment();
    }
    localStorage.setItem('storeData',JSON.stringify(storeData));

}

function deleteCommentImage(event){

    storeData[event.target.id.split('-')[1]].comment.splice(event.target.id.split('-')[2],1);
    console.log(storeData);
    showComment(event);
    localStorage.setItem('storeData',JSON.stringify(storeData));

}

function displayData(){

    var flexBox = document.getElementById('flex-box');
    flexBox.innerHTML = '';

    for(var i=0;i<storeData.length;i++){


        var newDivImage = document.createElement('div');
        newDivImage.className = 'media';

        var newA = document.createElement('a');


        var newImage = document.createElement('img');
        newImage.className = 'image-'+i;

        newImage.style.objectFit = 'cover';
        newImage.src = storeData[i].imageUrl;


        newA.appendChild(newImage);
        newDivImage.appendChild(newA);
        flexBox.appendChild(newDivImage);
        console.log(flexBox);

    }
}

function off(){
    document.getElementById("div-overlay-container").style.visibility = "hidden";
}

var containerComment = document.getElementById('container-Comment');

function showSingleImage(event){

    if (event.target.localName == "img"){

        var image = document.getElementById("overlayImage");
        image.src = storeData[event.target.className.split('-')[1]].imageUrl;

        var commentInput = document.getElementsByClassName('input-to-add-comment')[0];
        commentInput.id='input-'+event.target.className.split('-')[1];

        var buttonAddComment = document.getElementsByClassName('button-to-add-comment')[0];
        buttonAddComment.id='button-'+event.target.className.split('-')[1];

        buttonAddComment.onclick =addComment;
        showComment();


        document.getElementById("div-overlay-container").style.visibility = "visible";
    }
}

document.getElementById("flex-box").addEventListener("click", showSingleImage);

var divCommentList = document.createElement('div');
divCommentList.id = 'div-Comment-List';
function showComment(){

    var buttonAddComment = document.getElementsByClassName('button-to-add-comment')[0];

    divCommentList.innerHTML = '';
    var ulDiv  =document.createElement('ul');
    ulDiv.className = 'ulDivClass';
    ulDiv.id='ulDiv-'+buttonAddComment.id.split('-')[1];
    
    for(var j=0;j<storeData[buttonAddComment.id.split('-')[1]].comment.length;j++){
    
         var ilInputElement = document.createElement('il')
         ilInputElement.className ='ilInputElement';
         ilInputElement.id = 'divInputElement-'+buttonAddComment.id.split('-')[1]+"-"+j;
    
         var divContaner = document.createElement('div');
         divContaner.className = 'divContaner-comment-button';
         divContaner.id ='divContaner-'+buttonAddComment.id.split('-')[1]+"-"+j;
    
         var labelComment = document.createElement('label')
         labelComment.id = 'labelComment-'+buttonAddComment.id.split('-')[1]+"-"+j;
         labelComment.innerHTML = storeData[buttonAddComment.id.split('-')[1]].comment[j];
    
         var deleteComment = document.createElement('button');
         deleteComment.className = 'delete-Comment-click';
         deleteComment.innerText = 'X';
         deleteComment.id = 'deleteComment-'+buttonAddComment.id.split('-')[1]+"-"+j;
         deleteComment.onclick = deleteCommentImage;


         divContaner.appendChild(labelComment);
         divContaner.appendChild(deleteComment);
    
         ilInputElement.appendChild(divContaner);
         ulDiv.appendChild(ilInputElement);
    }
    divCommentList.appendChild(ulDiv);
    containerComment.appendChild(divCommentList);
}

$('.navTrigger').click(function () {
    $(this).toggleClass('active');
    console.log("Clicked menu");
    $("#mainListDiv").toggleClass("show_list");
    $("#mainListDiv").fadeIn();

});

/*hadi bach n7iyfo padding u nzido back ground lk7el dial nav bar */

$(window).scroll(function() {
    if ($(document).scrollTop() > 50) {
        $('.nav').addClass('affix');
        console.log("OK");
    } else {
        $('.nav').removeClass('affix');
    }
});

/** replace button by enter key for my comment */

var input = document.getElementsByClassName('input-to-add-comment')[0];

input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
     document.getElementsByClassName('button-to-add-comment')[0].click();
    }
  });

displayData();