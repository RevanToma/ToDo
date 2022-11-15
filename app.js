const addIcon = document.getElementById('add-icon');
const todoItems = document.querySelector('.items');
const input = document.getElementById('new-item');

let editState = false;

addIcon.addEventListener('click', () => {
    addItem()
})
input.addEventListener('keydown', (e) => {

    if (e.key === 'Enter') {
        addItem()
    }
})

// <input type="checkbox" class="checkbox">

function addItem() {
    let inputValue = input.value;
    if (inputValue) {
        const todoItem = document.createElement('div');
        todoItem.classList.add('item')
        let mark = document.createElement('input');

        mark.setAttribute('type', 'checkbox');
        mark.classList.add('completed');

        todoItem.innerHTML =
            ` <div class="item-icon"><span class="edit-icon"><i class="far fa-edit" id="edit-icon"></i></span><i class="far fa-check-circle" id="check-icon"></i></div>
          <div class="item-desc"><p>${inputValue}</p><span class="times-icon"><i class="fas fa-times" id="times-icon"></i></span></div>
        `

        todoItem.append(mark);
        todoItems.appendChild(todoItem);
        input.value = '';
        deleteItems();
        editItems();
        markChecked();
    }
}

function deleteItems() {
    let deleteIcon = document.getElementsByClassName('times-icon');
    for (let i = 0; i < deleteIcon.length; i++) {
        deleteIcon[i].onclick = function () {
            let div = this.parentElement.parentElement;
            div.remove();
        }
    }
}
function markChecked() {
    let completed = document.querySelectorAll('.completed');
    for (let i = 0; i < completed.length; i++) {
        completed[i].onclick = function () {
            let div = this.parentNode;
            div.style = "color: green";
            if (!this.checked) {
                div.style = "color: black";
            }
        }
    }
}

function editItems() {
    let editIcon = document.getElementsByClassName('edit-icon');
    for (let i = 0; i < editIcon.length; i++) {
        editIcon[i].onclick = function () {
            let itemDesc_div = this.parentElement.nextSibling.nextSibling;
            if (!Boolean(itemDesc_div.state) && !editState) {
                let itemDesc = itemDesc_div.firstChild.firstChild.textContent;
                let item = itemDesc_div.parentElement;
                itemDesc_div.style.display = 'none';
                let editBox = document.createElement('div');
                editBox.innerHTML = `<input type='text' id='edit-item' placeholder='${itemDesc}...'><i class="fas fa-plus" id="edit-add-icon"></i>`
                editBox.classList.add('edit-input');
                item.appendChild(editBox);






                let editAddIcon = editBox.lastChild;
                let inputTag = editBox.firstChild
                editAddIcon.addEventListener('click', () => {
                    editAddItems({ inputTag, itemDesc_div, itemDesc, editBox })
                });

                inputTag.addEventListener('keydown', (ev) => {
                    if (ev.keyCode === 13) {
                        editAddItems({ inputTag, itemDesc_div, itemDesc, editBox })
                    }
                })
                itemDesc_div.state = true;
                editState = true;
            }
        }

    }
}

function editAddItems({ inputTag, itemDesc, itemDesc_div, editBox }) {
    let newItem = inputTag.value;
    itemDesc_div.firstChild.firstChild.textContent = newItem || itemDesc_div.firstChild.firstChild.textContent;
    itemDesc = newItem || itemDesc_div.firstChild.firstChild.textContent

    editBox.style.display = 'none'
    itemDesc_div.style.display = 'flex'
    itemDesc_div.state = false;
    editState = false;
}
