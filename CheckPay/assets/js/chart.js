
const pl1=[
  'rgba(255, 99, 132, 0.5)',
  'rgba(54, 162, 235, 0.5)',
  'rgba(255, 206, 86, 0.5)',
  'rgba(75, 192, 192, 0.5)',
  'rgba(153, 102, 255, 0.5)',
  'rgba(255, 159, 64, 0.5)',
  'rgba(240,163,255,0.5)',
  'rgba(0,117,220,0.5)',
  'rgba(153,63,0,0.5)',
  'rgba(76,0,92,0.5)',
  'rgba(25,25,25,0.5)',
  'rgba(0,92,49,0.5)',
  'rgba(43,206,72,0.5)',
  'rgba(255,204,153,0.5)',
  'rgba(128,128,128,0.5)',
  'rgba(148,255,181,0.5)',
  'rgba(143,124,0,0.5)',
  'rgba(157,204,0,0.5)',
  'rgba(194,0,136,0.5)',
  'rgba(0,51,128,0.5)',
  'rgba(255,164,5,0.5)',
  'rgba(255,168,187,0.5)',
  'rgba(66,102,0,0.5)',
  'rgba(255,0,16,0.5)',
  'rgba(94,241,242,0.5)',
  'rgba(0,153,143,0.5)',
  'rgba(224,255,102,0.5)',
  'rgba(116,10,255,0.5)',
  'rgba(153,0,0,0.5)',
  'rgba(255,255,128,0.5)',
  'rgba(255,255,0,0.5)',
  'rgba(255,80,5,0.5)']
  
  const pl2=[
    'rgba(255,99,132,1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
    'rgba(240,163,255,1)',
      'rgba(0,117,220,1)',
      'rgba(153,63,0,1)',
      'rgba(76,0,92,1)',
      'rgba(25,25,25,1)',
      'rgba(0,92,49,1)',
      'rgba(43,206,72,1)',
      'rgba(255,204,153,1)',
      'rgba(128,128,128,1)',
      'rgba(148,255,181,1)',
      'rgba(143,124,0,1)',
      'rgba(157,204,0,1)',
      'rgba(194,0,136,1)',
      'rgba(0,51,128,1)',
      'rgba(255,164,5,1)',
      'rgba(255,168,187,1)',
      'rgba(66,102,0,1)',
      'rgba(255,0,16,1)',
      'rgba(94,241,242,1)',
      'rgba(0,153,143,1)',
      'rgba(224,255,102,1)',
      'rgba(116,10,255,1)',
      'rgba(153,0,0,1)',
      'rgba(255,255,128,1)',
      'rgba(255,255,0,1)',
      'rgba(255,80,5,1)']


const getPulseData=(type,callback)=>{
  fetch(`https://raw.githubusercontent.com/PhonePe/pulse/master/data/aggregated/transaction/country/india/${type}`,
   {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, Content-Type, Authorization"
   }
      
      ).then((resp)=>resp.json())
      .then((resp)=>{
              {
                 callback(resp)
              }
          })
      .catch(()=>{ 
          console.log("connection error")
      })
}
const getData =(type,callback)=>{
  fetch(`https://bridge-test-api.herokuapp.com/get-data/${type}`,
  {
      method:'get',
      mode:'cors',
      credentials: 'same-origin',
      headers: {"Content-type": "application/json; charset=UTF-8","x-access-token":jwt},
  }
  ).then((resp)=>resp.json())
  .then((resp)=>{
          {
             callback(resp)
          }
      })
  .catch(()=>{ 
      console.log("connection error")
  })
}
const insert=(id,data)=>{
  if ($(`#${id}`).length) {
    $(`#${id}`).get(0).innerHTML=data
  }
}
var doughnutPieData = {
  datasets: [{
    data: [],
    backgroundColor: pl1,
    borderColor: pl2
     
  }],

  // These labels appear in the legend and in the tooltips when hovering different arcs
  labels: [
    'employee',
    'employer'
  ]
};
var doughnutPieOptions = {
  responsive: true,
  animation: {
    animateScale: true,
    animateRotate: true
  }
};
var Bardata = {
  labels: [],
  datasets: [{
      label: '₹',
    data: [],
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(255, 159, 64, 0.2)'
    ],
    borderColor: [
      'rgba(255,99,132,1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)'
    ],
    borderWidth: 1,
    fill: false
  }]
};
var Baroptions = {
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true
      }
    }]
  },
  legend: {
    display: false
  },
  elements: {
    point: {
      radius: 0
    }
  }

};



const Pi=(id,data,labels)=>{
  doughnutPieData.datasets[0].data=data
  doughnutPieData.labels=labels
    if ($(`#${id}`).length) {
      var pieChartCanvas = $(`#${id}`).get(0).getContext("2d");
      var pieChart = new Chart(pieChartCanvas, {
        type: 'pie',
        data: doughnutPieData,
        options: doughnutPieOptions
      });
    }

}
const Bar=(id,data,labels)=>{
  Bardata.datasets[0].data=data
  Bardata.labels=labels
  if ($(`#${id}`).length) {
      var barChartCanvas = $(`#${id}`).get(0).getContext("2d");
      var barChart = new Chart(barChartCanvas, {
        type: 'bar',
        data: Bardata,
        options: Baroptions
      });
    }
}


const logout=()=>{
  localStorage.removeItem("jwt");
  window.location.href="https://ansuman528.github.io/VisualPe/login.html"
}
// if(window.location.href.substring(0,37) == "https://ansuman528.github.io/VisualPe"){
var jwt=localStorage.getItem("jwt")
if(jwt==null)window.location.href="https://ansuman528.github.io/VisualPe/login.html"
insert("phn-no",JSON.parse(window.atob(jwt.split('.')[1])).phone)
insert("phn-noa",JSON.parse(window.atob(jwt.split('.')[1])).phone)
fetch(`https://bridge-test-api.herokuapp.com/checklogin`,
  {
      method:'get',
      mode:'cors',
      credentials: 'same-origin',
      headers: {"Content-type": "application/json; charset=UTF-8","x-access-token":jwt},
  }
  ).then((resp)=>resp.json())
  .then((resp)=>{
          {
             console.log(resp)
             if(resp.wait==true)
             window.location.href="https://ansuman528.github.io/VisualPe/wait.htm"
             if(resp.auth==false)
             window.location.href="https://ansuman528.github.io/VisualPe/login.htm"
          }
      })
  .catch(()=>{ 
      // $(sub).get(0).innerHTML=`<h3>Oops something went wrong ...</h3><h4>Try again </h4><h5>Reloading page ...</h5>`
      // setTimeout(()=>window.location.reload(),5000)
  })
// }

