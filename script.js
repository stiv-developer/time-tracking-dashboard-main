document.addEventListener('DOMContentLoaded', () => {
  fetchDataAndRender('weekly');
})



function fetchDataAndRender(period) {
  fetch('./data.json')
    .then((response) => response.json())
    .then(data => {
      const groupGrid = document.querySelector("#grid");
      let content = '';

      data.forEach(item => {
        const { title, timeframes } = item;
        const icon = title.toLowerCase().replaceAll(' ', '-');
        const current = timeframes[period]?.current || 0;
        const previous = timeframes[period]?.previous || 0;

        content += `
          <div class="card ${title}">
            <div class="card-header">
              <img class="img-icon" src="images/icon-${icon}.svg" alt="">
            </div>
            <div class="card-body">
              <div class="group first">
                <span class="title">${title}</span>
                <img src="images/icon-ellipsis.svg" alt="">
              </div>
              <div class="group second">
                <span class="time">${current}hrs</span>
                <span class="format">Last Week - ${previous}hrs</span>
              </div>
            </div>
          </div>`;
      });

      groupGrid.innerHTML = content;
    })
    .catch(error => console.error('Error fetching data:', error));
}

function changePeriod(period){
  document.querySelectorAll('.date span').forEach(el => el.classList.remove('active'));
  document.getElementById(period).classList.add('active');
  fetchDataAndRender(period);
}

// Attach the event handlers
document.getElementById("daily").addEventListener('click', () => changePeriod('daily'));
document.getElementById("weekly").addEventListener('click', () => changePeriod('weekly'));
document.getElementById("monthly").addEventListener('click', () => changePeriod('monthly'));
