const courseList = document.querySelector('#courseList');

const totalCredits = document.querySelector('#totalCredits');

function renderCourses(list) {
    courseList.innerHTML = '';

    list.forEach((course) => {
        const card = document.createElement('div');
        card.textContent = `${course.subject} ${course.number}`;
        card.className = course.completed ? 'course-card completed' : 'course-card';
        courseList.appendChild(card);
    });

    const credits = list.reduce((sum, course) => sum + course.credits, 0);
    totalCredits.textContent = `The total credits for course listed above is ${credits}`;
}

renderCourses(courses);

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