const form = document.getElementById('guest-form');
const guestList = document.getElementById('guest-list');
const guestNameInput = document.getElementById('guest-name');
const guestCategory = document.getElementById('guest-category');

let guests = [];

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = guestNameInput.value.trim();
  const category = guestCategory.value;

  if (guests.length >= 10) {
    alert("Guest list limit reached (max 10 guests).");
    return;
  }

  const timestamp = new Date().toLocaleTimeString();

  const guest = {
    id: Date.now(),
    name,
    category,
    rsvp: false,
    timeAdded: timestamp
  };

  guests.push(guest);
  guestNameInput.value = '';
  renderGuests();
});

function renderGuests() {
  guestList.innerHTML = '';

  guests.forEach(guest => {
    const li = document.createElement('li');
    li.className = 'guest-item';

    const info = document.createElement('div');
    info.innerHTML = `
      <strong>${guest.name}</strong>
      <span class="tag ${guest.category}">${guest.category}</span>
      <small>at ${guest.timeAdded}</small>
      <em> - ${guest.rsvp ? 'Attending' : 'Not Attending'}</em>
    `;

    const actions = document.createElement('div');
    actions.className = 'actions';

    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = 'Toggle RSVP';
    toggleBtn.onclick = () => toggleRSVP(guest.id);

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.onclick = () => editGuest(guest.id);

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.onclick = () => removeGuest(guest.id);

    actions.append(toggleBtn, editBtn, removeBtn);

    li.append(info, actions);
    guestList.appendChild(li);
  });
}

function toggleRSVP(id) {
  guests = guests.map(guest =>
    guest.id === id ? { ...guest, rsvp: !guest.rsvp } : guest
  );
  renderGuests();
}

function removeGuest(id) {
  guests = guests.filter(guest => guest.id !== id);
  renderGuests();
}

function editGuest(id) {
  const guest = guests.find(g => g.id === id);
  const newName = prompt("Edit guest name:", guest.name);
  if (newName) {
    guest.name = newName.trim();
    renderGuests();
  }
}