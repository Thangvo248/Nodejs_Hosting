
var item =  document.getElementsByClassName('item-cat');
var itemName = document.getElementsByClassName('item-name')
for(let i = 0; i < itemName.length; i++){

    itemName[i].onclick = () =>{
        if (item[i].style.display === "none") {
            item[i].style.display = "block";
        } else {
            item[i].style.display = "none";
        }
    }
}

var page3 = document.getElementById('page3');
var page2 = document.getElementById('page2');
var page1 = document.getElementById('page1');
var contentPage3 = document.getElementById('content-page3');
var contentPage2 = document.getElementById('content-page2');
var contentPage1 = document.getElementById('content-page1');

page1.onclick = () =>{
    page2.classList.remove('active');
    page3.classList.remove('active');
    page1.classList.toggle('active');
    contentPage2.style.display="none";
    contentPage3.style.display="none";
    contentPage1.style.display="grid"
}

page2.onclick = () => {
    page1.classList.remove('active');
    page2.classList.toggle('active');
    page3.classList.remove('active');
    contentPage1.style.display="none";
    contentPage2.style.display="grid"
    contentPage3.style.display="none";
}

page3.onclick = () => {
    page1.classList.remove('active');
    page3.classList.toggle('active');
    page2.classList.remove('active');
    contentPage2.style.display="none";
    contentPage3.style.display="grid"
    contentPage1.style.display="none";
}

