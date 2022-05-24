import { createParticipant } from '../fetch-utils.js';

const participantForm = document.getElementById('new-participant');

participantForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = new FormData(participantForm);
    console.log(form.get('workshop_id'));
    await createParticipant({
        name: form.get('name'),
        contact_info: form.get('contact'),
        workshop_id: form.get('workshop_id'),
    });
    window.location.href = '/workshops';
});