import { checkAuth, deleteParticipant, getWorkshops, logout, getUser } from '../fetch-utils.js';
import { renderWorkshop } from '../render-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');
const registerButton = document.getElementById('new-student');

registerButton.addEventListener('click', () => {
    const user = getUser();
    if (user) {
        return location.assign('/create');
    } else {
        return location.assign('/workshops');
    }
});

logoutButton.addEventListener('click', () => {
    logout();
});

async function displayWorkshops() {
    const main = document.querySelector('main');
    main.textContent = '';
    const data = await getWorkshops();
    for (let workshop of data) {
        const workshopEl = renderWorkshop(workshop);

        const ul = document.createElement('ul');
        for (let participant of workshop.participants) {
            const li = document.createElement('li');
            li.textContent = `${participant.name}: ${participant.contact_info}`;
            li.addEventListener('click', async () => {
                console.log('clicking participant id: ', participant.id);
                await deleteParticipant(participant.id);
                await displayWorkshops();
            });
            ul.append(li);
        }
        workshopEl.append(ul);
        main.append(workshopEl);
    }
    
}
displayWorkshops();