document.getElementById('postForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    let title = document.getElementById('postTitle').value;
    let content = document.getElementById('content').value;
    let images = document.getElementById('image').files;

    let postDiv = document.createElement('div');
    postDiv.classList.add('blog-post');
    postDiv.innerHTML = `<h3>${title}</h3><p>${content}</p>`;

    if (images.length > 0) {
        let imageContainer = document.createElement('div');
        for (let i = 0; i < images.length; i++) {
            let img = document.createElement('img');
            img.src = URL.createObjectURL(images[i]);
            img.classList.add('img-fluid', 'rounded', 'mb-2');
            img.style.maxWidth = '100%';
            imageContainer.appendChild(img);
        }
        postDiv.appendChild(imageContainer);
    }

    document.getElementById('posts').prepend(postDiv);
    document.getElementById('postForm').reset();
});
document.getElementById("postForm").addEventListener("submit", function (event) {
    event.preventDefault();

    let title = document.getElementById("postTitle").value;
    let content = document.getElementById("content").value;
    let imageInput = document.getElementById("image");

    let reader = new FileReader();
    reader.onload = function () {
        let imageBase64 = reader.result; // Convert image to Base64
        savePost(title, content, imageBase64);
    };

    if (imageInput.files.length > 0) {
        reader.readAsDataURL(imageInput.files[0]); // Read file as Base64
    } else {
        savePost(title, content, ""); // Save without image
    }
});

function savePost(title, content, imageBase64) {
    let posts = JSON.parse(localStorage.getItem("blogPosts")) || [];
    posts.push({ title, content, image: imageBase64 });
    localStorage.setItem("blogPosts", JSON.stringify(posts));
    displayPosts();
}

function displayPosts() {
    let posts = JSON.parse(localStorage.getItem("blogPosts")) || [];
    let postsContainer = document.getElementById("posts");
    postsContainer.innerHTML = "";

    posts.forEach((post) => {
        let postHTML = `
            <div class="card my-3">
                <div class="card-body">
                    <h3>${post.title}</h3>
                    <p>${post.content}</p>
                    ${post.image ? `<img src="${post.image}" class="img-fluid" alt="Post Image">` : ""}
                </div>
            </div>
        `;
        postsContainer.innerHTML += postHTML;
    });
}

// Load posts on page load
document.addEventListener("DOMContentLoaded", displayPosts);
