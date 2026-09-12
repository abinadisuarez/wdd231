const url = 'data/members.json';
const memberList = document.querySelector('#memberList');

async function getMemberData() {
    const response = await fetch(url);
    const data = await response.json();
    displayMembers(data.members);
}

const displayMembers = (members) => {
    memberList.innerHTML = '';

    members.forEach((member) => {
        const card = document.createElement('section');
        const name = document.createElement('h2');
        const image = document.createElement('img');
        const address = document.createElement('p');
        const phone = document.createElement('p');
        const website = document.createElement('a');
        const category = document.createElement('p');

        name.textContent = member.name;

        image.setAttribute('src', `images/${member.image}`);
        image.setAttribute('alt', `${member.name} logo`);
        image.setAttribute('loading', 'lazy');
        image.setAttribute('width', '300');
        image.setAttribute('height', '200');

        address.textContent = member.address;
        phone.textContent = member.phone;
        category.textContent = member.category;

        website.setAttribute('href', member.website);
        website.setAttribute('target', '_blank');
        website.setAttribute('rel', 'noopener');
        website.textContent = 'Visit Website';

        card.classList.add(`level-${member.membershipLevel}`);

        card.appendChild(image);
        card.appendChild(name);
        card.appendChild(category);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(website);

        memberList.appendChild(card);
    });
};

getMemberData();

const gridBtn = document.querySelector('#gridBtn');
const listBtn = document.querySelector('#listBtn');

gridBtn.addEventListener('click', () => {
    memberList.classList.remove('list-view');
    memberList.classList.add('grid-view');
});

listBtn.addEventListener('click', () => {
    memberList.classList.remove('grid-view');
    memberList.classList.add('list-view');
});