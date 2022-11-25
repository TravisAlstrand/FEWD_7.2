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

