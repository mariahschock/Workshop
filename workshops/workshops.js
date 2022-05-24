import { checkAuth, getWorkshops, logout } from '../fetch-utils.js';
import { renderWorkshop } from '../render-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');

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
            ul.append(li);
        }
        workshopEl.append(ul);
        main.append(workshopEl);
    }
    
}
displayWorkshops();