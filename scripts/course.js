const courseList = document.querySelector('#courseList');

const totalCredits = document.querySelector('#totalCredits');

const courseDetails = document.querySelector('#course-details');

courseDetails.addEventListener('click', (event) => {
    const box = courseDetails.getBoundingClientRect();
    const clickedOutside =
        event.clientX < box.left ||
        event.clientX > box.right ||
        event.clientY < box.top ||
        event.clientY > box.bottom;

    if (clickedOutside) {
        courseDetails.close();
    }
});

function renderCourses(list) {
    courseList.innerHTML = '';

    list.forEach((course) => {
        const card = document.createElement('div');
        card.textContent = `${course.subject} ${course.number}`;
        card.className = course.completed ? 'course-card completed' : 'course-card';
        courseList.appendChild(card);
        card.addEventListener('click', () => {
            displayCourseDetails(course);
        });
    });

    const credits = list.reduce((sum, course) => sum + course.credits, 0);
    totalCredits.textContent = `The total credits for course listed above is ${credits}`;
}

renderCourses(courses);

function displayCourseDetails(course) {
    courseDetails.innerHTML = `
        <button id="closeModal">❌</button>
        <h2>${course.subject} ${course.number}</h2>
        <h3>${course.title}</h3>
        <p><strong>Credits</strong>: ${course.credits}</p>
        <p><strong>Certificate</strong>: ${course.certificate}</p>
        <p>${course.description}</p>
        <p><strong>Technologies</strong>: ${course.technology.join(', ')}</p>
    `;
    courseDetails.showModal();

    document.querySelector('#closeModal').addEventListener('click', () => {
        courseDetails.close();
    });
}

const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
        filterButtons.forEach((btn) => btn.classList.remove('active'));
        button.classList.add('active');

        const filter = button.dataset.filter;
        if (filter === 'All') {
            renderCourses(courses);
        } else {
            renderCourses(courses.filter((course) => course.subject === filter));
        }
    });
});