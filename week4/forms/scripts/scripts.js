const queryString = window.location.search;
console.log(queryString);

const myInfo = new URLSearchParams(queryString);
console.log(myInfo);
console.log(myInfo.get('first'));

const results = document.querySelector('#results');

function addLine(text) {
    const p = document.createElement('p');
    p.textContent = text;
    results.appendChild(p);
}

addLine(`Appointment for ${myInfo.get('first')} ${myInfo.get('last')}`);
addLine(`Proxy ${myInfo.get('ordinance')} on ${myInfo.get('date')} at ${myInfo.get('location')}`);
addLine(`Your phone: ${myInfo.get('phone') || 'Not provided'}`);
addLine(`Your email: ${myInfo.get('email')}`);