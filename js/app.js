
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
});

// CLEAR LS
clearBtn.addEventListener('click', () => {
  window.localStorage.clear()
  emailToggle.checked = false;
  checkToggles(emailToggle, 0);
  publicToggle.checked = false;
  checkToggles(publicToggle, 1);
  timezoneSelect.firstElementChild.selected = true;
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

// INITIALIZE TOGGLE SWITCH TEXT
checkToggles(emailToggle, 0);
checkToggles(publicToggle, 1);