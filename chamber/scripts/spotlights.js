const spotlightList = document.querySelector('#spotlightList');
const membersUrl = 'data/members.json';

async function getSpotlightData() {
    try {
        const response = await fetch(membersUrl);
        const data = await response.json();
        displaySpotlights(data.members);
    } catch (error) {
        console.log(error);
    }
}

getSpotlightData();

function displaySpotlights(members) {
    const eligible = members.filter(member => member.membershipLevel >= 2);

    const shuffled = eligible.sort(() => Math.random() - 0.5);
    const count = Math.random() < 0.5 ? 2 : 3;
    const selected = shuffled.slice(0, count);

    const levelNames = { 2: 'Silver', 3: 'Gold' };

    spotlightList.innerHTML = selected.map(member => `
        <div class="spotlight-card level-${member.membershipLevel}">
            <img src="images/${member.image}" alt="${member.name} logo">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank" rel="noopener">Visit Website</a>
            <p class="membership-level">${levelNames[member.membershipLevel]} Member</p>
        </div>
    `).join('');
}