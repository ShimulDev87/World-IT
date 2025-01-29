// Save profile data
document.getElementById('profileForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const bio = document.getElementById('bio').value;
    const profileImageInput = document.getElementById('profileImageInput').files[0];

    // Save to Local Storage
    localStorage.setItem('profileName', name);
    localStorage.setItem('profileBio', bio);

    // Handle profile image (convert to base64 and save)
    if (profileImageInput) {
        const reader = new FileReader();
        reader.onload = function (e) {
            localStorage.setItem('profileImage', e.target.result);
            document.getElementById('profileImage').src = e.target.result;
        };
        reader.readAsDataURL(profileImageInput);
    }

    // Update profile section
    document.getElementById('profileName').textContent = name;
    document.getElementById('profileBio').textContent = bio;

    // Close modal
    bootstrap.Modal.getInstance(document.getElementById('editProfileModal')).hide();
});

// Save blog posts
document.getElementById('postForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const postTitle = document.getElementById('postTitle').value;
    const content = document.getElementById('content').value;
    const imageInput = document.getElementById('image').files[0];

    const post = {
        title: postTitle,
        content: content,
        image: imageInput ? URL.createObjectURL(imageInput) : null,
    };

    // Save to Local Storage
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.push(post);
    localStorage.setItem('posts', JSON.stringify(posts));

    // Display the new post
    displayPost(post);

    // Reset form
    e.target.reset();
});

// Display posts on page load
function displayPost(post) {
    const postsContainer = document.getElementById('posts');
    const postElement = document.createElement('div');
    postElement.className = 'card mb-3';
    postElement.innerHTML = `
        <div class="card-body">
            <h5 class="card-title">${post.title}</h5>
            ${post.image ? `<img src="${post.image}" class="img-fluid mb-3" alt="Post Image">` : ''}
            <p class="card-text">${post.content}</p>
        </div>
    `;
    postsContainer.appendChild(postElement);
}

// Load saved data on page load
window.addEventListener('load', function () {
    // Load profile data
    const profileName = localStorage.getItem('profileName');
    const profileBio = localStorage.getItem('profileBio');
    const profileImage = localStorage.getItem('profileImage');

    if (profileName) document.getElementById('profileName').textContent = profileName;
    if (profileBio) document.getElementById('profileBio').textContent = profileBio;
    if (profileImage) document.getElementById('profileImage').src = profileImage;

    // Load blog posts
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.forEach(displayPost);
});