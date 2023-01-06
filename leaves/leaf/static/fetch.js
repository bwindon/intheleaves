//const headers = new Headers({ "Access-Control-Allow-Origin": "*" });

// set initial size for managing activities array scope
let count = 1000;
let order = 1;


// select value and buttons for array scope
const value = document.querySelector('#value');
const btns = document.querySelectorAll(".btn");
console.log(btns);

btns.forEach(function (btn) {
    btn.addEventListener('click', function(e){
        const styles = e.currentTarget.classList;
        if(styles.contains('decrease')){
            count = count - 50;
        }
        else if(styles.contains('reset')){
            count = 1000;
        }
        else if(styles.contains('increase')){
            count = count + 50;
        }


        if(styles.contains('distance')){
            order = 1;
        }

        else if(styles.contains('average_speed')){
            order = 2;
        }

        if(count > 1000){
            console.log('greater');
            value.style.color = "green";
        }
        else if(count < 1000){
            value.style.color = "red";
        }
        else if(count === 1000){
            value.style.color = 'black';
        }


        value.textContent = count;

        updateChart(count, order);
    })
});


// Create data source
async function fetchData(){
    const url = 'http://localhost:8000/leaf/json/';
    const response = await fetch(url, {headers: []});
    // wait until request has been completed
    const datapoints = await response.json();
    return datapoints;
};


// Append activity arrays (not using since embedded in updateChart)
function appendActivities(){
    fetchData().then(datapoints => {
    const length = datapoints.length +1;
    let activities = [];
    for (let i = 0; i < length; i++) {
        console.log(i);
        activities = activities.concat(datapoints[i]);
    };

    activities.sort((a, b) =>{
    return new Date(a.start_date_local) - new Date(b.start_date_local); // descending
    //return new Date(b.order_date) - new Date(a.order_date); // ascending
    })
    console.log(activities);
    //return activities;

    let object1 = activities[1200];
    console.log(object1);
    console.log(Object.keys(object1));
    });
}


// function to get array number from DOM
function getArrayNumber(){
// Create a listening button up to the number of of 200 activity arrays
};


// Main create chart function
function updateChart(y, order){
    // check for filter variable or set default value
    if(order === undefined){
    order = 1;
    }

    myChart.reset();
    // parse data source and update chart
    fetchData().then(datapoints_z => {
    //let datapoints_z = appendActivities();
      // get number of 200 activity arrays
      const length = datapoints_z.length;
      console.log(length);
      // set array to last activity array (length -1)
      let x = length - 1;

      let activities = [];
        for (let i = 0; i < length; i++) {
            console.log(i);
            activities = activities.concat(datapoints_z[i]);
        };

      // apply activity filters  
      activities = activities.filter(item => item.type === "Run");
      //activities = activities.filter(item => item.local_start_date >= 2022);
      //activities = activities.filter(item => item.distance >= 15000);
      console.log(activities)

      // apply activity sorting
      //var prop = 'distance';

      if(order === 1) {
            prop = 'distance';
        }
        else if(order === 2) {
            prop = 'average_speed';
        }
        else if(order === 3) {
            prop = 'local_start_date'
        }


      activities.sort((a, b) =>{
      //return a[prop] - b[prop]; // descending
      return b[prop] - a[prop]; // ascending

      // return b.average_speed - a.average_speed; // ascending
      //return new Date(b.start_date_local) - new Date(a.start_date_local); // ascending
      console.log(activities);
      })

      console.log(activities);

      let datapoints = activities.slice(0, y);

      const start = datapoints.map(function(index){
        return index.start_date_local;
        })

      const distance = datapoints.map(function(index){
        return index.distance;
        })

      const speed = datapoints.map(function(index){
        return index.average_speed;
        })

      const type = datapoints.map(function(index){
        return index.sport_type;
        })

      console.log(start);
      console.log(distance);
      console.log(speed);
      console.log(type);

      myChart.config.data.labels = start;
      myChart.config.data.datasets[0].data = distance;
      myChart.config.data.datasets[1].data = speed;
      myChart.config.data.datasets[1].backgroundColor = 'blue';
      myChart.config.options.scales.B.position = 'right';

      myChart.update();
    });
};

const labels = [];
const data = {
  labels: labels,
  datasets: [
  {
    yAxisID: 'A',
    label: 'Distance',
    backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgb(255, 99, 132)',
    data: [3,1,2],

  },
  {
    yAxisID: 'B',
    label: 'Average speed',
    backgroundColor: 'rgb(0, 0, 0)',
    borderColor: 'rgb(255, 99, 132)',
    data: [],
  }
]
};
console.log(data);
const config = {
  type: 'bar',
  data: data,
  options: {},
};


const myChart = new Chart(
  document.getElementById('myChart'),
  config
);


function eddington() {
    // get activities
    fetchData().then(datapoints_z => {
      const length = datapoints_z.length;
      console.log(length);
      let x = length - 1;
      let activities = [];
        for (let i = 0; i < length; i++) {
            console.log(i);
            activities = activities.concat(datapoints_z[i]);
        };

    // get longest run
    longest_run = Math.max.apply(Math,activities.map(function(object) {return object.distance;}))
    console.log(longest_run);
    let num_segments =Math.round(longest_run/1000);
    console.log(num_segments);

    // create eddington array - edd_array
    var edd_array = {};                        ;
    for (let i = 0; i < num_segments; i++) {
        let count_1 = activities.filter(item => item.distance > (num_segments - i) * 1000);
        let num_runs = count_1.length;
        console.log(num_runs);
        edd_distance = num_segments - i;
        if (num_runs > edd_distance) {
            edd_check = true;
        }
        else {
            edd_check = false;
        }
        edd_array[i] = {"num_runs": num_runs, "edd_distance": edd_distance, "edd_check": edd_check};
        };
    console.log(edd_array);

    // get list of valid eddington objects
    let edd_number_list = Object.values(edd_array).filter(item => item.edd_check === true);
    console.log(edd_number_list);

    // get longest valid eddington objects
    edd_number = Math.max.apply(Math,edd_number_list.map(function(object) {return object.edd_distance;}))
    console.log(edd_number);
    });
}


