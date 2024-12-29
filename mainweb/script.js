// Smooth Scroll Functionality
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href'); // Get the target element's ID

        // Cek apakah targetId adalah ID elemen di halaman yang sama
        if (targetId.startsWith('#')) {
            e.preventDefault(); // Prevent default anchor click behavior

            const targetElement = document.querySelector(targetId); // Select the target element

            // Scroll to the target element
            targetElement.scrollIntoView({
                behavior: 'smooth', // Smooth scroll
                block: 'start' // Align to the start of the target element
            });
        }
        // Jika bukan ID, biarkan tautan berfungsi normal (misalnya, tautan ke halaman lain)
    });
});


document.getElementById('dev').addEventListener('click', function(event) {
    event.preventDefault(); // Mencegah link default
    alert('Active Developer');
});


document.getElementById('hypeSquadLink').addEventListener('click', function(event) {
    event.preventDefault(); // Mencegah link default
    alert('hypeSquad Bravery');
});

document.getElementById('subscriber').addEventListener('click', function(event) {
    event.preventDefault(); // Mencegah link default
    alert('Subscriber Since');
});

document.getElementById('server').addEventListener('click', function(event) {
    event.preventDefault(); // Mencegah link default
    alert('Server boosting Since ');
});

document.getElementById('quest').addEventListener('click', function(event) {
    event.preventDefault(); // Mencegah link default
    alert('Completed a Quest ');
});

document.getElementById('editButton').addEventListener('click', function() {
    alert('Go to discord.');
});

document.getElementById('instagramButton').addEventListener('click', function() {
    alert('Go to Instagram.');
});

document.getElementById('followButton').addEventListener('click', function() {
    alert('Go to TikTok.');
});

document.getElementById('steamButton').addEventListener('click', function() {
    alert('Go to Steam.');
});

document.getElementById('githubButton').addEventListener('click', function() {
    alert('Go to Github.');
});


