let map
document.addEventListener("DOMContentLoaded", function() {
  
  let n = 200;
  let lastEntry = n
  let initial = true
  let recent_n = document.getElementById("entries")
  recent_n.textContent = `Presenting ${n} Entries`
  setInterval(function() {
    const entries = getRequest();

    // If the database is updated then automaticaly fetch n entries from it
    if(entries!=lastEntry || initial==true){
      getEntries(n).then(makeMap);
      lastEntry = entries
    }
    initial = false
  
    // If the n is changed then explicitly fetch n entries from the database
    let button = document.getElementById("button");
    button.addEventListener("click", function() {
        let n_value = document.getElementById("InputEntries");
        n = n_value.value;
        let recent_n = document.getElementById("entries")
        recent_n.textContent = `Presenting ${n} Entries`
        if(n!=lastEntry){
          getEntries(n).then(makeMap); 
        }
    });
  }, 1000);
});

function toRadians(degrees){
  var pi = Math.PI;
  return degrees * (pi/180);
}

function getRequest() {
    // const startTime = performance.now();
    const xhr = new XMLHttpRequest();
    let data = 0
    xhr.open("GET", "http://localhost:8000/getRows/"); 

    xhr.responseType = "json"; 
    xhr.send();
    xhr.onload = () => {
        // const endTime = performance.now()
        // let timetaken = endTime - startTime
        if (xhr.status === 200) {
            const data1 = xhr.response;
            let row = document.getElementById("Rows");
            
            row.textContent = `Current Entries: ${data1.count}`; 
            data = data1.count

            // let debug = document.getElementById("Debug");
            // debug.textContent = `Request took ${timetaken.toFixed(2)} ms`;
            
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
          // console.log(locationArray);
          
          
          // getHeightFromLatitudeLongitude(locationArray)
          
          resolve(locationArray);
      } 
    };
  });
}

function getHeightFromLatitudeLongitude(latitude, longitude){

  const xhr = new XMLHttpRequest();
    let data = 0
    xhr.open("GET", `https://api.open-elevation.com/api/v1/lookup?locations=${latitude},${longitude}`); 

    xhr.responseType = "json"; 
    xhr.send();

    xhr.onload = () => {
      if (xhr.status === 200) {
          const data = xhr.response;
          console.log(typeof data["results"][0]["elevation"]);
          
          return (data["results"][0]["elevation"])
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


function makeMap(locations){

  if (map !== undefined) {
    map.remove();  
  }
  map = L.map('map').setView([28.5456712, 77.2730973], 60);
  
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19, 
    minZoom: 1,  
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);


  L.marker([28.5456712, 77.2730973]).addTo(map)

  locations.forEach(function(location) {
      L.marker([location.x, location.y]).addTo(map)
          
  });

}

function makeChart3d(xyzValues){
  let xOrigin = 0
  let yOrigin = 0
  let zOrigin = 0
  // let elevation = getHeightFromLatitudeLongitude(28.5456712, 77.2730973)
  let pi = Math.PI;

  xOrigin = (6371) * Math.cos(toRadians(28.5456712)) * Math.cos(toRadians(77.2730973))
  yOrigin = (6371) * Math.cos(toRadians(28.5456712)) * Math.sin(toRadians(77.2730973))
  zOrigin = (6371) * Math.sin(toRadians(28.5456712))

  console.log(xOrigin);
  console.log(yOrigin);
  console.log(zOrigin);

  var xValues = [];
  var yValues = [];
  var zValues = [];

  xyzValues.forEach(function(point) {
    
    xValues.push(point.x - xOrigin);
    yValues.push(point.y - yOrigin);
    zValues.push(point.z - zOrigin);
  });

  
  var data = [{
    x: xValues,
    y: yValues,
    z: zValues,
    type: 'scatter3d',
    mode: 'markers',
    marker: {
      size: 5,
      color: 'rgba(255, 0, 0, 1)',
      line: {
        color: 'rgb(127, 127, 127)',
        width: 1
      },
      opacity: 0.8
    }
  }];

  var layout = {
    margin: {
      l: 0,
      r: 0,
      b: 0,
      t: 0
    }
  };

  Plotly.newPlot('my3dGraph', data, layout);

}
