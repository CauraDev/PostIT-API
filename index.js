const postContainer = document.querySelector(".postContainer");
const loader = document.querySelector(".loader");
const inputFilter = document.querySelector("#filter")

//https://jsonplaceholder.typicode.com/posts?_page=1&_limit=5

let page = 1;
let limit = 1;

const getPosts = async () => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`)

    const data = await response.json();

    return data;
}

const printPosts = (postsToPrint) => {

    const postsHTML = postsToPrint.map((value) => {

        return `<div class="post">
                    <div class="postNumber">${value.id}</div>
                    <div class="postBody">
                        <h2 class="postTitle">${value.title}</h2>
                         <p class="postText">${value.body}</p>
                    </div>
                </div>`
    
    }).join("");

    postContainer.innerHTML += postsHTML;
}

function initiate() {
    window.addEventListener("DOMContentLoaded", async () => {
        let posts = await getPosts();
        printPosts(posts);
    });


    window.addEventListener("scroll", async () => {

        
        const {scrollTop, clientHeight, scrollHeight} = document.documentElement;

        if (scrollTop + clientHeight >= scrollHeight) {

            page++;
           
            const newPosts = await getPosts();

            showLoader(newPosts);
        }
    })
}

const showLoader = (newPostsReceived) => {
    loader.style.opacity = 1;

    const randomNumber = Math.floor(Math.random() * 3000);

    setTimeout(() => {
        loader.style.opacity = 0;

        setTimeout(() => {
            printPosts(newPostsReceived)
        }, 100);
    }, randomNumber);
};

initiate();