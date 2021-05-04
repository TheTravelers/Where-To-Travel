const axios = require("axios");
require('dotenv').config();
const { GOOGLE_KEY, OPEN_TRIP_KEY } = process.env
const NodeGeocoder = require("node-geocoder"); //node coder package boilerplate
const options = {
  provider: "google",
  apiKey: GOOGLE_KEY, // using google api (this is my personal api key )
  formatter: null, 
};
const geocoder = NodeGeocoder(options);

module.exports = {

  filter: async (req, res) => {
    //array with places to visit
    let activitiesResults = [];

    //array of cities
    let cities = [];

    //information from the front end (actual location must be ab array [longitud, latitude])
    //distance (number in meters )
    //adultOnly , waterFront , inState , winterSports (boolean)

    const {
      actualLocation, //  [longitud, latitud] (array)
      distance, //   (number in meters)
      adultOnly, // boolean
      waterFront, // boolean
      inState, // boolean
      winterSports, // boolean
    } = req.body;
    // console.log(req.body)

    // we are using the geo coder to have information from our user using his coordinates
    const [getInfoUser] = await geocoder.reverse({
      lat: actualLocation[1],
      lon: actualLocation[0],
    });

    //we don't want all the information from geocoder we just need the the next info

    const infoUser = {
      state: getInfoUser.administrativeLevels.level1long,
      stateShort: getInfoUser.administrativeLevels.level1short,
      cityName: getInfoUser.city,
    };

    // in the kinds we need to write the filters this is what this if statements is doing

    let kinds = "";

    if (!waterFront & !adultOnly & !winterSports) {
      kinds = "";
    } else {
      if (waterFront & !adultOnly & !winterSports) {
        kinds = `&kinds=beaches`;
      }
      if (waterFront & adultOnly & !winterSports) {
        kinds = `&kinds=beaches%2Cadult`;
      }
      if (waterFront & adultOnly & winterSports) {
        kinds = `&kinds=beaches%2Cadult%2Cwinter_sports`;
      }
      if (!waterFront & adultOnly & !winterSports) {
        kinds = `&kinds=adult`;
      }
      if (!waterFront & !adultOnly & winterSports) {
        kinds = `&kinds=winter_sports`;
      }
    }

    // this is the heart of our project this is where we make api call to see the activities that matches our filters and the distance

    await axios
      .get(
        `https://api.opentripmap.com/0.1/en/places/radius?radius=${distance}&lon=${actualLocation[0]}&lat=${actualLocation[1]}&src_geom=osm&src_attr=osm${kinds}&rate=3h&format=geojson&limit=100&apikey=${OPEN_TRIP_KEY}`
      )
      .then(async (response) => {
        response.data.features.forEach((e, i) => {
          //this result dosn't show us the city or the state but we have coordinates we are saving the information we want to this result variable

          const result = {
            coordinates: e.geometry.coordinates,
            kinds: e.properties.kinds,
            distance: e.properties.dist,
            cityObject: null,
          };

          activitiesResults.push(result);
        })
        

        // now we are creating an array with just the coordinates for the activities and we are setting the decimal of the angles to 0 to avoid repetition

        newCoordinates = activitiesResults.map((e) => {
          return [+e.coordinates[0], +e.coordinates[1]];
        });
      }).catch(err => console.log(err))

    // this is where we have the name of the city and state of the last array

    for (let i = 0; i < newCoordinates.length; i++) {
      const [getEachCityInfo] = await geocoder.reverse({
        lat: newCoordinates[i][1],
        lon: newCoordinates[i][0],
      });
      // the getEachCity variable have all the informations but is to much info for us so we create this new variable to pick the information we want and we are adding the inforamtion from the other array with information (activitiesResults ), but now we need the population
      const eachCityInfo = {
        state: getEachCityInfo.administrativeLevels.level1long,
        stateShort: getEachCityInfo.administrativeLevels.level1short,
        cityName: getEachCityInfo.city,
        latitude: getEachCityInfo.latitude,
        longitude: getEachCityInfo.longitude,
        kinds: activitiesResults[i].kinds,
        distance: activitiesResults[i].distance,
        population: null,
      };

        cities.push(eachCityInfo);  // so we need to scape this scope so we are pushing this info to cities
    }

    let pop = [];


    // this is the code from erick we can use this for bypass the 10 request for secind of open trip API (this code is not working is just an idea)

    // await axios
    // .all(
    //     cities.map((e) => {
    //         setTimeout(() => {
    //            return axios.get(
    //                 `https://api.opentripmap.com/0.1/en/places/geoname?name=${e.cityName}&country=US&apikey=5ae2e3f221c38a28845f05b61f09c292d813489f030ff736d60c0db8`
    //             )
    //         }, 500)
    //     })
    // )
    // .then((res) => {
    //   console.log(res)
    //     res.forEach((e) => {
            
    //         pop.push(e.data.population);
    //     });
    // }).catch(err => console.log(err)) 




    await axios
      .all(
        cities.map((e) => 
          axios.get(
            `https://api.opentripmap.com/0.1/en/places/geoname?name=${e.cityName}&country=US&apikey=5ae2e3f221c38a28845f05b61f09c292d813489f030ff736d60c0db8`
          )
        )
      )
      .then((res) => {
        res.forEach((e) => {
         
          pop.push(e.data.population);
        });
      }).catch(err => console.log(err))
      
    console.log(pop)
    cities.forEach((e, i) => {          //this where we send the population info to the cities array 
      cities[i].population = pop[i];
    });

    let filterCities = [];               //this is where the inState filter works this will just show cities in you staste
    if (inState) {
      filterCities = cities.filter((e) => e.state === infoUser.state);
    } else {
      filterCities = cities;
    }
    // console.log(filterCities)
    const noCitiesFilter = filterCities.filter( e => {
      // console.log(e.cityName)
      return e.cityName  
    }) 

    removeRepeatingCities = (arr) => {


      let noRepeatsArray = []
      
      let uniqueObj = {}
      
      for(let i in arr){
        let objCityName = arr[i]['cityName']
        uniqueObj[objCityName] = arr[i]
      }
      for(i in uniqueObj){
        noRepeatsArray.push(uniqueObj[i])
      }
      return noRepeatsArray
      }
      
    const finalCityList = removeRepeatingCities(noCitiesFilter)
    // console.log(finalCityList)
    return res.status(200).send(finalCityList);
  },
};

//cityName(string), population (number), waterFront (kinds string ), adultFriendly(kinds string), distance(number)