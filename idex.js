const guestForm = document.getElementById('guest-form');
const guestNameInput = document.getElementById('guest-name');
const guestList = document.getElementById('guest-list');

guestForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const guestName = guestNameInput.value.trim();
    if (guestName) {
        addGuest(guestName);
        guestNameInput.value = '';
    }
});

function addGuest(name) {
    const li = document.createElement('li');
    li.className = 'guest-item';
    li.innerHTML = `${name} <button class="remove-btn">Remove</button>`;
    guestList.appendChild(li);
}

guestList.addEventListener('click', function(event) {
    if (event.target.classList.contains('remove-btn')) {
        const li = event.target.parentElement;
        guestList.removeChild(li);
    }
});