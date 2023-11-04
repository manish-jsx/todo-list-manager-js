const addForm = document.querySelector('.add');
const tasks = document.querySelector('.tasks');
const clearAll = document.querySelector('.clear');
const messageSpan = document.querySelector('.message span');
const searchForm = document.querySelector('.search');



function updateMessage(){
    const textLength = tasks.children.length;
    console.log(textLength);
    messageSpan.textContent = `You have ${textLength} pending tasks`;
}
updateMessage()

addForm.addEventListener('submit', e => {
    e.preventDefault();
    console.log(addForm.task.value);
    const value = addForm.task.value.trim();

    if (value.length) {
        console.log(value);
        tasks.innerHTML += `<li>
                                <span>${value}</span>
                                <i class="bi bi-trash-fill delete"></i>
                            </li>`;
        addForm.reset();
        updateMessage()
    }
});

tasks.addEventListener('click', e => {
    if (e.target.classList.contains('delete')) {
        e.target.parentElement.remove();
        updateMessage()
    }
});


clearAll.addEventListener('click', e  => {
    const taskItems = tasks.querySelectorAll('li');
    taskItems.forEach(item => {
        item.remove();
    });
    updateMessage()
});

// clearAll.addEventListener('click', () => {
//     tasks.innerHTML = '';
// });

function filterTask(term){
    Array.from(tasks.children).filter((task) => {
        return !task.textContent.toLowerCase().includes(term);
    })
    .forEach((task) => {
            task.classList.add('hide');
    });

    Array.from(tasks.children).filter((task) => {
        return task.textContent.toLowerCase().includes(term);
    })
    .forEach((task) => {
            task.classList.remove('hide');
    }); 
        
}

searchForm.addEventListener('keyup', e => {
    const term = searchForm.task.value.trim().toLowerCase();
    filterTask(term);
});

searchForm.addEventListener('click', e => {
    if (e.target.classList.contains('reset')) {
        searchForm.reset();
        filterTask('');
    }

});

