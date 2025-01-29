document.addEventListener("DOMContentLoaded", () => {
    // Handle Profile Editing
    const profileForm = document.getElementById("profileForm");
    profileForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Get input values
        const name = document.getElementById("name").value;
        const bio = document.getElementById("bio").value;
        const profileImageInput = document.getElementById("profileImageInput");
        const profileImage = document.getElementById("profileImage");

        // Update profile details
        if (name) {
            document.getElementById("profileName").textContent = name;
        }
        if (bio) {
            document.getElementById("profileBio").textContent = bio;
        }
        if (profileImageInput.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                profileImage.src = e.target.result;
            };
            reader.readAsDataURL(profileImageInput.files[0]);
        }

        // Close the modal
        const profileModal = bootstrap.Modal.getInstance(document.getElementById("editProfileModal"));
        profileModal.hide();
    });

    // Handle Blog Post Creation
    const postForm = document.getElementById("postForm");
    postForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Get form values
        const postTitle = document.getElementById("postTitle").value;
        const content = document.getElementById("content").value;
        const imageInput = document.getElementById("image");
        const postsContainer = document.getElementById("posts");

        // Create post elements
        const postCard = document.createElement("div");
        postCard.className = "card mb-3";

        let imageHTML = "";
        if (imageInput.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                imageHTML = `<img src="${e.target.result}" class="card-img-top" alt="Post Image">`;
                postCard.innerHTML = `
                    ${imageHTML}
                    <div class="card-body">
                        <h5 class="card-title">${postTitle}</h5>
                        <p class="card-text">${content}</p>
                    </div>
                `;
            };
            reader.readAsDataURL(imageInput.files[0]);
        } else {
            postCard.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">${postTitle}</h5>
                    <p class="card-text">${content}</p>
                </div>
            `;
        }

        // Add post to the container
        postsContainer.prepend(postCard);

        // Clear form fields
        postForm.reset();
    });

    // Handle Admin Login
    const loginForm = document.getElementById("loginForm");
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // Placeholder validation (Replace with actual login logic)
        if (username === "admin" && password === "password") {
            alert("Login successful!");
            const loginModal = bootstrap.Modal.getInstance(document.getElementById("loginModal"));
            loginModal.hide();
        } else {
            alert("Invalid username or password.");
        }

        // Clear fields
        loginForm.reset();
    });
});
