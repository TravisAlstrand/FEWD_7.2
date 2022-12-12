const notifDot = document.querySelector('#notification-dot');
let hasNotifs = 3;



/* ================ ALERT POP UP ================= */
const alertBar = document.querySelector('.alert');
const alertTextSpan = document.querySelector('#alertText');

const updateAlertBar = (num) => {
  notifDot.classList.remove('no-display');
  alertBar.classList.remove('no-display');
  alertText.innerHTML += `<div>You have <span class="num-of-notifs">${num}</span> new notifications!</div><span class="close-alert-bar">X</span>`;
}

if (hasNotifs) {
  updateAlertBar(hasNotifs.toString());
} else {
  notifDot.classList.add('no-display');
  alertBar.classList.add('no-display');
}

alertBar.addEventListener('click', (e) => {
  if (e.target.classList.contains('close-alert-bar')) {
    alertBar.style.display = 'none';
  }
});


/* ============ TRAFFIC CHART NAV =============== */

const trafficUl = document.querySelector('.traffic-nav');
const trafficLis = trafficUl.children;

trafficUl.addEventListener('click', e => {
  if (e.target.tagName === 'LI') {
    Array.from(trafficLis).forEach(li => {
      li.classList.remove('active');
    })
    e.target.classList.add('active');
  }
})


/* =============== MESSAGE USER ================= */

const msgSection = document.querySelector('.message');
const searchBar = document.querySelector('#userField');
const users = document.querySelectorAll('.member-text p');
const resultsDiv = document.querySelector('#resultsDiv')
const resultsUL = document.querySelector('#resultsUL');
const errorMsgs = document.querySelectorAll('.error-msg');
const messageField = document.querySelector('#messageField');
const sendBtn = document.querySelector('#send');

const matchUsers = (input) => {
  let matchedUsers = [];
  if (input !== '') {
    users.forEach(user => {
      const name = user.innerHTML.toLowerCase();
      if (name.includes(input)) {
        matchedUsers.push(user.innerHTML);
      }
    })
  }
  appendUsers(matchedUsers);
};

const appendUsers = (users) => {
  resultsUL.innerHTML = '';
  if (users.length) {
    resultsDiv.classList.remove('no-display');
  } else {
    resultsDiv.classList.add('no-display');
  }

  users.forEach(user => {
    resultsUL.innerHTML += `<li>${user}</li>`;
  });
  
  const userLIs = document.querySelectorAll('#resultsUL li');
  userLIs.forEach(li => {
    li.addEventListener('click', () => {
      searchBar.value = li.innerHTML;
      resultsDiv.classList.add('no-display');
    })
  })
};

// APPEND MSG SENT NOTIFICATION
const createMsgSentDiv = (userName) => {
  msgSection.insertAdjacentHTML('afterbegin', `
    <div class="sent-div">
      <span>X</span>
      <p>Message sent to ${userName} successfully!</p>
    </div>
  `);

  const closeBtn = document.querySelector('.sent-div span');

  closeBtn.addEventListener('click', () => {
    msgSection.firstElementChild.remove()
  })
}

// LISTEN FOR TYPING
searchBar.addEventListener('input', () => {
  matchUsers(searchBar.value);
});

// CLOSE IF CLICKED WAY
document.addEventListener('click', e => {
  if (!e.target.closest('#resultsDiv')) {
    resultsDiv.classList.add('no-display');
  }
})

// TRY TO SEND
sendBtn.addEventListener('click', (e) => {
  e.preventDefault();
  let hasName;
  let hasMsg;

  if (!searchBar.value.length) {
    errorMsgs[0].classList.remove('no-display');
  } else {
    errorMsgs[0].classList.add('no-display');
    hasName = true;
  }

  if (!messageField.value.length) {
    errorMsgs[1].classList.remove('no-display');
  } else {
    errorMsgs[1].classList.add('no-display');
    hasMsg = true;
  }

  if (hasName && hasMsg) {
    createMsgSentDiv(searchBar.value);
    searchBar.value = '';
    messageField.value = '';
  }
});


/* ============= TOGGLE SWITCHES ================ */

const onTexts = document.querySelectorAll('.on-text');
const offTexts = document.querySelectorAll('.off-text');
const emailToggle = document.querySelector('#emailNotifs');
const publicToggle = document.querySelector('#publicProf');

const checkToggles = (toggle, num) => {
  if (toggle.checked) {
    onTexts[num].classList.remove('no-display');
    offTexts[num].classList.add('no-display');
  } else {
    offTexts[num].classList.remove('no-display');
    onTexts[num].classList.add('no-display');
  }
}

emailToggle.addEventListener('click', () => {
  checkToggles(emailToggle, 0);
});

publicToggle.addEventListener('click', () => {
  checkToggles(publicToggle, 1);
})


/* =============== LOCAL STORAGE ================ */

const timezoneSelect = document.querySelector('#timezone');
const saveBtn = document.querySelector('#save');
const clearBtn = document.querySelector('#cancel');
const settingSaveNotif = document.querySelector('#saveSettingsNotif');

const setToLS = (key, value) => {
  window.localStorage.setItem(key, value);
}

const getFromLS = (key) => {
  const item = window.localStorage.getItem(key);
  return item;
};

const removeFromLS = (key) => {
  window.localStorage.removeItem(key);
}

// CONFIGURE / SAVE LS
saveBtn.addEventListener('click', () => {

  // check email toggle
  if (emailToggle.checked) {
    setToLS('Emails', 'True');
  } else {
    setToLS('Emails', 'False');
  }

  // check profile toggle
  if (publicToggle.checked) {
    setToLS('Public', 'True');
  } else {
    setToLS('Public', 'False');
  }

  // check timezone select
  if (timezoneSelect.value !== 'Select a Timezone') {
    setToLS('Timezone', timezoneSelect.value);
  } else {
    removeFromLS('Timezone');
  }

  settingsNotif(true);

});

// CLEAR LS
clearBtn.addEventListener('click', () => {
  window.localStorage.clear()
  emailToggle.checked = false;
  checkToggles(emailToggle, 0);
  publicToggle.checked = false;
  checkToggles(publicToggle, 1);
  timezoneSelect.firstElementChild.selected = true;
  settingsNotif(false);
});

// GATHER LS ON PAGE LOAD
const emailLS = getFromLS('Emails');
const profileLS = getFromLS('Public');
const timeLS = getFromLS('Timezone');

if (emailLS === 'True') {
  emailToggle.checked = true;
} else {
  emailToggle.checked = false;
}

if (profileLS === 'True') {
  publicToggle.checked = true;
} else {
  publicToggle.checked = false;
}

if (timeLS) {
  timezoneSelect.value = timeLS;
}

const settingsNotif = (bool) => {
  if (bool) {
    settingSaveNotif.classList.remove('cleared');
    settingSaveNotif.classList.add('saved');
    settingSaveNotif.innerText = 'Settings Saved';
  } else {
    settingSaveNotif.classList.remove('saved');
    settingSaveNotif.classList.add('cleared');
    settingSaveNotif.innerText = 'Settings Cleared';
  }
};

if (emailLS || profileLS || timeLS) {
  settingsNotif(true);
}

// INITIALIZE TOGGLE SWITCH TEXT
checkToggles(emailToggle, 0);
checkToggles(publicToggle, 1);