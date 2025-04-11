// ===========================================================
// ====================== Info from Learn ====================
// ===========================================================
// The information below is a reference to what you'll
// find in Learn.

// The application has a 3 key features:

// 1. Display all posts: When the user clicks on the "Get All Posts" button,
// 2. Display all posts for a specific user: When the user selects a user from the dropdown and clicks on the "Get User's Post" button
// 3. Display the body of a specific post: When the user clicks on a post, the body of the post is displayed

// Below is the breakdown of the features and the high level steps.
// PASTE EACH STEP INTO LEARN before to proceed to the next step.

// You can write your code below each step, but be aware that some
// steps are dependent on others, you'll need to come back to code in previous
// steps.


// ===========================================================
// ====================== FEATURE 1 ==========================
// ===========================================================
// ====     Feature 1: User clicks on 'Get All Posts'     ====


// ==== Feature 1a: Get All Posts Button ====
// 1. Add an event listener to the "Get All Posts" button
// 2. Inside the event listener, console log "works!" to test the event listener

//const getAllPostsButton = document.getElementById('get-all-posts-button');
//getAllPostsButton.addEventListener('click', async () => {
//        try {
//                const response = await fetch('https://jsonplaceholder.typicode.com/posts');
//                if (!response.ok) {
//                        const error = new Error(`${response.status}`);
//                        console.error(error);
//                        throw error;
//                };
//                const posts = await response.json();
//                displayPosts(posts)
//
//        } catch (e) {
//                console.error(e);
//        };
//});


// ==== Feature 1b: Fetch all posts from the API ====
// 1. Write code that fetches all posts from the API
// 2. Use the fetch API to make a GET request to "https://jsonplaceholder.typicode.com/posts"
// 3. Parse the response as JSON
// 4. console.log the title of the first post
// Note: In the Learn test, you have a 'test_id' variable that is
// already defined, that you'll reference instead of the first post





// ==== Feature 1c: Display all posts ====
// 1. Write code that loops through an array of posts and creates a new li element for each post
// 2. Add the post title text to the li element
// 3. Add the post id to the li element as a data attribute
// Hint: Use element.dataset.postId = post.id
// 4. Append the li element to the posts container element
// Use this sample posts array to test your code


//const allPosts = [
//        { id: 1, title: 'A new post' },
//        { id: 2, title: 'Another update' },
//        { id: 3, title: 'Final thought' }
//]
//
//const displayPosts = (allPosts) => {
//        const postContainer = document.getElementById('found-posts');
//
//
//        postContainer.innerHTML = '';
//
//        allPosts.forEach(post => {
//                const li = document.createElement('li');
//                li.textContent = post.title;
//                li.dataset.postId = post.id;
//                console.log(li)
//                postContainer.appendChild(li);
//
//        });
//};
//displayPosts(allPosts);



// ==== Feature 1d: Get all posts and display them when "Get All Posts" button clicked ====
// Update your "Get All Posts" button event listener so that when it's clicked:
// 1. Fetches all posts from the API
// 2. Clears the posts container, then displays the posts
const getAllPostsButton = document.getElementById('get-all-posts-button');
const postContainer = document.getElementById('found-posts');
getAllPostsButton.addEventListener('click', async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');

        if (!response.ok) {
            const error = new Error(`${response.status}`);
            console.error(error);
            throw error;
        };
        const allPosts = await response.json();
        postContainer.innerHTML = '';

        allPosts.forEach(post => {
            const li = document.createElement('li');
            const h2 = document.createElement('h2');
            h2.textContent = post.title;
            li.appendChild(h2);
            li.dataset.postId = post.id;

            postContainer.appendChild(li);
        });

    } catch (e) {
        console.error(e);
    }
});



// ===========================================================
// ====================== FEATURE 2 ==========================
// ===========================================================
// ==== Feature 2: Display all posts for a specific user =====


// ==== Feature 2a: Populate Dropdown ====
// 1. Fetch users from the API, example https://jsonplaceholder.typicode.com/users
// 2. Populate the users dropdown with the user names, use the user id as the value

const fillDropdown = async () => {
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!res.ok) {
            throw new Error(`Error: ${res.status}`);
        }
        const users = await res.json();
        const dropdown = document.getElementById('user-select');
        dropdown.innerHTML = '';

        const defaultOption = document.createElement('option');
        defaultOption.textContent = 'Select a user';
        defaultOption.value = '';
        dropdown.appendChild(defaultOption);

        users.forEach(user => {
            const option = document.createElement('option');
            option.value = user.id;
            option.textContent = user.name;
            dropdown.appendChild(option);
        });
    } catch (error) {
        console.error(error);
    }
};
fillDropdown();


// ==== Feature 2b: Display all posts for a specific user ====
// 1. Add an event listener to the "Get User's Post" button that will display the users posts
// 2. Get selected user posts from the API, example https://jsonplaceholder.typicode.com/posts?userId=1
// 3. Display the posts in the posts container, similar to Feature 1c

const getUserPosts = async () => {
    try {
        const userId = document.getElementById('user-select').value;
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
        if (!response.ok) {
            const error = new Error(`${response.status}`);
            console.error(error);
            throw error;
        }
        const posts = await response.json();
        const postsContainer = document.getElementById('found-posts');
        postsContainer.innerHTML = '';
        posts.forEach(post => {
            const postItem = document.createElement('li');
            const postTitle = document.createElement('h3');
            postItem.dataset.postId = post.id;
            postTitle.textContent = post.title;
            const postBody = document.createElement('p');
            postBody.textContent = post.body;
            postItem.appendChild(postTitle);
            postItem.appendChild(postBody);
            postsContainer.appendChild(postItem);
        });
    } catch (error) {
        console.error(error);
    }
};
const getUserPostsButton = document.getElementById('get-user-posts-button')
getUserPostsButton.addEventListener('click', getUserPosts);




// ===========================================================
// ======================   BONUS   ==========================
// ===================== (not tested) ========================
// ===========================================================


// ===========================================================
// ====================== FEATURE 3 ==========================
// ===========================================================
// ==== Feature 3: Display the body of a specific post that has been clicked on ====
// 1. Add an event listener to the posts container that listens for a click event
// 2. Inside the event listener, get the post that has been clicked on
// 3. Fetch the specific post from the API, example https://jsonplaceholder.typicode.com/posts/1
// 4. Display the post body
const foundPosts = document.getElementById('found-posts');
const postText = document.getElementById('post-body-text');
const postTitle = document.querySelector('#post-body h2');

foundPosts.addEventListener('click', async (event) => {
    const li = event.target.closest('li');
    if (li && li.dataset.postId) {
        const postId = li.dataset.postId;

        const previousSelectedPost = foundPosts.querySelector('li.selected')
        if (previousSelectedPost) {
            previousSelectedPost.style.backgroundColor = '#f9f9f9';
            previousSelectedPost.style.color = '#333';
            previousSelectedPost.classList.remove('selected')
        }
        li.style.backgroundColor = 'darkgreen';
        li.style.color = 'white';
        li.classList.add('selected')


        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
            if (!response.ok) throw new Error('Failed to fetch post');
            const post = await response.json();
            postText.textContent = post.body;
            postTitle.textContent = post.title;
        } catch (error) {
            console.error(error);
            postText.textContent = 'Failed to load.';
        }
    }
});



// ===========================================================
// ====================== ADVANCED ==========================
// ===========================================================
// 1. Add a search bar that filters posts by title
// 2. Add a feature that shows all of the comments for a specific post where
// the post body is displayed



//search bar
const searchContainer = document.createElement('div')
searchContainer.classList.add('section')
searchContainer.id = 'search-posts'

const searchBar = document.createElement('input')
searchBar.type = 'text'
searchBar.id = 'search-bar'
searchBar.placeholder = 'Search posts'

searchContainer.appendChild(searchBar)
const sideContainer = document.querySelector('.side-container')
sideContainer.insertBefore(searchContainer, sideContainer.firstChild)
searchBar.addEventListener('input', (event) => {
    const searchResult = event.target.value.toLowerCase();
    const posts = document.querySelectorAll('#found-posts li')
    posts.forEach(post => {
        const titleElement = post.querySelector('h2');
        if (titleElement) {
            const title = titleElement.textContent.toLowerCase();
            post.style.display = title.includes(searchResult) ? 'block' : 'none';

        };
    });
});

//comment section
foundPosts.addEventListener('click', async (event) => {
    const li = event.target.closest('li');
    if (li && li.dataset.postId) {
        const postId = li.dataset.postId;
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
            if (!response.ok) throw new Error('Failed to fetch post');
            const post = await response.json();
            postTitle.textContent = post.title;
            postText.textContent = post.body;
            let commentsSection = document.getElementById('comments-section');
            if (!commentsSection) {
                commentsSection = document.createElement('div');
                commentsSection.id = 'comments-section';
                const commentsHeader = document.createElement('h3');
                commentsHeader.textContent = 'Comments';
                commentsSection.style.borderTop = '2px solid black';
                commentsSection.style.padding = '10px';
                commentsSection.style.marginTop = '20px';
                commentsSection.appendChild(commentsHeader);
                postText.parentElement.appendChild(commentsSection);
            }
            const commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
            if (!commentsResponse.ok) throw new Error('Failed to fetch comments');
            const comments = await commentsResponse.json();
            commentsSection.innerHTML = '<h3>Comments</h3>';
            comments.forEach(comment => {
                const commentItem = document.createElement('div');
                commentItem.classList.add('comment-item');
                const commentName = document.createElement('strong');
                commentName.textContent = comment.name;
                const commentBody = document.createElement('p');
                commentBody.textContent = comment.body;

                commentItem.appendChild(commentName);
                commentItem.appendChild(commentBody);
                commentItem.style.borderBottom = '1px solid #ddd';
                commentItem.style.marginBottom = '15px';
                commentItem.style.padding = '5px';

                commentsSection.appendChild(commentItem);
            });
        } catch (error) {
            console.error(error);
            postText.textContent = 'Failed to load post content.';
        }
    }
});
