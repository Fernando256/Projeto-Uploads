let comment = document.querySelector('#comment').innerText;
let editComment = document.getElementsByClassName('edit-comment');
let viewComment = document.getElementsByClassName('view-comment');
console.log(editComment);
console.log(viewComment);

function actionEdit(id) {
    for (let i = 0; i < editComment.length; i++){
        if (editComment[i].dataset.id == id) {
            viewComment[i].style.display = 'none';
            editComment[i].style.display = 'inline';
            break;
        }
    }
}

function actionCancel(id) {
    for (let i = 0; i < editComment.length; i++){
        if (editComment[i].dataset.id == id) {
            viewComment[i].style.display = 'inline';
            editComment[i].style.display = 'none';
            break;
        }
    }
}