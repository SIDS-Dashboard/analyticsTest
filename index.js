/*Initialize Map */
mapboxgl.accessToken =
  "pk.eyJ1Ijoic2ViYXN0aWFuLWNoIiwiYSI6ImNpejkxdzZ5YzAxa2gyd21udGpmaGU0dTgifQ.IrEd_tvrl6MuypVNUGU5SQ";

  const map = new mapboxgl.Map({
    container: "map", // container ID
    //style: 'mapbox://styles/mapbox/light-v10', //?optimize=true
    style: 'mapbox://styles/mapbox/light-v10', 
    center: [-71.4, 19.0], // starting position [lng, lat]
    zoom: 6,
    //pitch: 55
  });

  var firstSymbolId;


  map.on("load", function () {

    
   // add1km();

    addSub();
    

  })




function addSub() {

  var layers = map.getStyle().layers;
    //console.log(layers);
    // Find the index of the first symbol layer in the map style
    for (var i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol') {
            firstSymbolId = layers[i].id;
            break;
        }
    }
  
  d3.json('./drhi.geojson').then(function(d) {

   
   /* var data1 = d.map(x => x['1b1'])
    console.log(data1) */

    //const DEM = 

   // const popDen = 
    
    map.addSource('cable', {
      type: 'geojson',
      data: d
    })

    map.addLayer({
      'id': 'jamaica',
      'source': 'cable',
      'type': 'fill',
      'paint': {
        'fill-color': 'orange'
      }
    }, firstSymbolId)


  })

 
}

function clearFilters() {



  map.setFilter('jamaica', null)


}

map.on('click', 'jamaica', (e) => {
  new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML('Elevation:' + e.features[0].properties.dem + '<br>PopDense: ' + e.features[0].properties['1c5'])
    .addTo(map);


}) 


function filterData() {


  var inp = document.getElementById('fname').value;
  inp = parseInt(inp)

  var otherInp = document.getElementById('lname').value;
  otherInp = parseInt(otherInp)


  if(isNaN(inp) || isNaN(otherInp)) {
    alert('enter a number you monster')
  }

  else {

    var filterzzzz = [
      'all',
      ['<=', 'dem', inp],
      ['>=', '1c5', otherInp]
    ]


    map.setFilter('jamaica', filterzzzz)

    //map.setFilter('jamaica', ['<=', 'dem', inp])
    //map.setFilter('jamaica', ['>=', '1c5', otherInp])
  }




}


