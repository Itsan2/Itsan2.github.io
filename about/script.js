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


document.addEventListener('DOMContentLoaded', () => {
    const skills = document.querySelectorAll('.skill');

    skills.forEach(skill => {
        const fill = skill.querySelector('.fill');
        const level = skill.getAttribute('data-level');
        fill.style.width = level; // Set the width based on data-level attribute
    });
});


