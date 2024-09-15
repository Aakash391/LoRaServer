document.addEventListener("DOMContentLoaded", function() {
  let n = 100;
  let lastEntry = n
  let initial = true
  setInterval(function() {
    const entries = getRequest();
    if(entries!=lastEntry || initial==true){
      getEntries(n).then(makeChart);
      lastEntry = entries
    }
    initial = false
  
    let button = document.getElementById("Nbutton");
    button.addEventListener("click", function() {
        let n_value = document.getElementById("RecentEntries");
        n = n_value.value;
        if(n!=lastEntry){
          getEntries(n).then(makeChart); 
        }
    });
  }, 1000);
});

function getRequest() {
    const startTime = performance.now();
    const xhr = new XMLHttpRequest();
    let data = 0
    xhr.open("GET", "http://localhost:8000/getRows/"); 

    xhr.responseType = "json"; 
    xhr.send();
    xhr.onload = () => {
        const endTime = performance.now()
        let timetaken = endTime - startTime
        if (xhr.status === 200) {
            const data1 = xhr.response;
            let row = document.getElementById("Rows");
            
            row.textContent = `Current Entries: ${data1.count}`; 
            data = data1.count

            let debug = document.getElementById("Debug");
            debug.textContent = `Request took ${timetaken.toFixed(2)} ms`;
            
        } 
    };

    return data
}
function getEntries(n){
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `http://localhost:8000/getNRows/?n=${n}`); 

    xhr.responseType = "json"; 
    xhr.send();

    xhr.onload = () => {
      if (xhr.status === 200) {
          const data = xhr.response;
          
          
          const locationArray = data.map(entry => ({
            x: parseFloat(entry.latitude),
            y: parseFloat(entry.longitude)
          }));
          
          getHeightFromLatitudeLongitude(locationArray)
          resolve(locationArray);
      } 
    };
  });
}

function getHeightFromLatitudeLongitude(location){
  const longitude = -8.583933
  const latitude = 41.161758
  const xhr = new XMLHttpRequest();
    let data = 0
    xhr.open("GET", `https://api.open-elevation.com/api/v1/lookup?locations=${latitude},${longitude}`); 

    xhr.responseType = "json"; 
    xhr.send();

    xhr.onload = () => {
      if (xhr.status === 200) {
          const data = xhr.response;
          console.log(data["results"][0]["elevation"])
      }
    }
    xhr.onerror = () => {
      console.log("Cannot Fetch API")
    }
}

function makeChart(xyValues) {

  new Chart("myChart", {
    type: "scatter",
    data: {
      datasets: [{
        pointRadius: 4,
        pointBackgroundColor: "rgba(0,0,255,1)",
        data: xyValues
      }]
    },
    options: {
      scales: {
          xAxes: [{
              scaleLabel: {
                  display: true,
                  labelString: 'Latitude'  
              }
          }],
          yAxes: [{
              scaleLabel: {
                  display: true,
                  labelString: 'Longitude'  
              }
          }]
      }
  }
  });

  // let debug = document.getElementById("Debug");
  let h2 = document.getElementById("entries");
  h2.textContent = `Recent ${xyValues.length} Entries`
  // debug.textContent = xyValues.length
  // xyValues.forEach(entry => {
  //   debug.textContent += `Latitude: ${entry.x}, Longitude: ${entry.y}\n`;
  // });

}
