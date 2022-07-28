var postsArr = [];
var insertMode = true;
var postToEditTitle;
var noDuplicateTitles = true;

function removePosts() {
    let currentPosts = document.querySelectorAll('.posts-div');
    currentPosts.forEach((post) => { post.remove(); });
}

function makePostSection() {

    postsArr = JSON.parse(localStorage.getItem('posts'));

    if(postsArr == null) {
        postsArr = [];
    }

    for(let i = 0; i < postsArr.length; i++) {
        let post = postsArr[i];

        const postsDiv = document.createElement('div');
        postsDiv.className = "posts-div";
        postsDiv.dataset.title = post.title;

        const postTitleBtn = document.createElement('button');
        postTitleBtn.innerHTML = '<strong>' + post.title + '</strong>';
        postTitleBtn.className = 'post-titleBtn';
        postTitleBtn.style.padding = '1rem';
        postTitleBtn.style.cursor = 'pointer';

        const tabSpace = document.createElement('span');
        tabSpace.innerHTML = '&nbsp; &nbsp;';

        const editBtn = document.createElement('icon');
        editBtn.className = 'fa-solid fa-pencil';
        editBtn.style = 'padding:1rem; cursor:pointer;'

        const deleteBtn = document.createElement('icon');
        deleteBtn.className = 'fa-solid fa-trash-can';
        deleteBtn.style = 'padding:1rem; cursor:pointer;'

        postsDiv.appendChild(postTitleBtn);
        postsDiv.appendChild(tabSpace);
        postsDiv.appendChild(editBtn);
        postsDiv.appendChild(deleteBtn);
        postsDiv.appendChild(document.createElement('br'));
        postsDiv.appendChild(document.createElement('br'));

        document.getElementById('all-posts').appendChild(postsDiv)
    }
}

function addTitleListeners() {
    let titleBtns = document.querySelectorAll('.post-titleBtn');
    for(let i = titleBtns.length-1; i >= 0; i--) {
        let button = titleBtns[i];

        button.addEventListener('click', e => {
            document.getElementById('single-post-dialog').showModal();
            document.getElementById('singlepost-title').textContent = postsArr[i].title;
            document.getElementById('singlepost-date').textContent = postsArr[i].date;
            document.getElementById('singlepost-summary').textContent = postsArr[i].summary;
        });
    }
}

function addEditListeners() {
    let editBtns = document.querySelectorAll('.fa-pencil');
    for(let i = editBtns.length-1; i >= 0; i--) {
        let button = editBtns[i];

        button.addEventListener('click', e => {
            insertMode = false;
            postToEditTitle = e.target.parentElement.dataset.title;
            console.log("post to edit: " + postToEditTitle);

            document.getElementById('post-form-dialog').showModal();

            document.getElementById('post-title').value = postsArr[i].title;
            document.getElementById('post-date').value = postsArr[i].date;
            document.getElementById('post-summary').value = postsArr[i].summary;
        });
        
    }
}

function addDeleteListeners() {
    let deleteBtns = document.querySelectorAll('.fa-trash-can');
    deleteBtns.forEach(button => {
        button.addEventListener('click', e => {

            let postToDelete = button.parentElement; 
            console.log("post to delete : " + postToDelete.dataset.title);
        
            postsArr = JSON.parse(localStorage.getItem('posts'));
            let index = -1;
        
            for (let i = 0; i < postsArr.length; i++) {
                if (postsArr[i].title === postToDelete.dataset.title) {
                    index = i;
                    break;
                }
            }
        
            if(index != -1) {
                postsArr.splice(index, 1);
            }
        
            localStorage.setItem('posts', JSON.stringify(postsArr));
            postToDelete.remove();
            displayPosts();
        });
    });

}

function addPostListeners() {
    addTitleListeners();
    addEditListeners();
    addDeleteListeners();
}

function displayPosts() {
    removePosts();
    makePostSection();
    addPostListeners();
}

document.addEventListener('DOMContentLoaded', () => {

    displayPosts();

    document.querySelectorAll('.fa-pencil').forEach(btn => {
        btn.addEventListener('mouseover', () => {
            btn.style.backgroundColor = '#a239ca';
        });
    });

    document.querySelectorAll('.fa-pencil').forEach(btn => {
        btn.addEventListener('mouseout', () => {
            btn.style.backgroundColor = '#0e0b16';
        });
    });

    document.querySelectorAll('.fa-trash-can').forEach(btn => {
        btn.addEventListener('mouseover', () => {
            btn.style.backgroundColor = '#a239ca';
        });
    });

    document.querySelectorAll('.fa-trash-can').forEach(btn => {
        btn.addEventListener('mouseout', () => {
            btn.style.backgroundColor = '#0e0b16';
        });
    });

    document.getElementById('add-postbtn').addEventListener('click', () => {
        console.log('add post btn clicked');
        insertMode = true;
        document.getElementById('post-title').value = '';
        document.getElementById('post-date').value = '';
        document.getElementById('post-summary').value = '';
        document.getElementById('post-form-dialog').showModal();

    });

    document.getElementById('cancel-post-btn').addEventListener('click', () => {
        document.getElementById('post-form-dialog').close();
    });

    document.getElementById('singlepost-closebtn').addEventListener('click', () => {
        document.getElementById('single-post-dialog').close(); 
    });

    document.getElementById('submit-post-btn').addEventListener('click', () => {

        let postTitle = document.getElementById('post-title').value;
        let postDate = document.getElementById('post-date').value; 
        let postSummary = document.getElementById('post-summary').value;

        if(insertMode) {
            console.log("insert mode");
            
            for(let i = 0; i < postsArr.length; i++) {
                let post = postsArr[i];
                if(post.title === postTitle) {
                    alert("Post with same title already exits. Either delete old post or rename new post.");
                    noDuplicateTitles = false;
                    break;
                }    
            }

            // insert the new post
            if(noDuplicateTitles) {

                let postToAdd = {
                    title: postTitle,
                    date: postDate,
                    summary: postSummary
                };
            
                postsArr.unshift(postToAdd);
                localStorage.setItem('posts', JSON.stringify(postsArr));
            
                displayPosts();
            }
        }
        else {
            console.log("edit mode");

            postsArr = JSON.parse(localStorage.getItem('posts'));

            for (let i = 0; i < postsArr.length; i++) {
                if (postsArr[i].title === postToEditTitle) {
                    postsArr[i].title = postTitle;
                    postsArr[i].date = postDate;
                    postsArr[i].summary = postSummary;
                }
            }
        
            localStorage.setItem("posts", JSON.stringify(postsArr));
            displayPosts();

            insertMode = true;
        }

        document.getElementById('post-form-dialog').close();
    });

});