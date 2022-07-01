//const planets = [];
//module.exports = planets;
const fs = require('fs');
const path = require ('path');
const {parse} = require('csv-parse');

const habitablePlanets = [];

function isHabitablePlanet(planet){
    return planet['koi_disposition'] === 'CONFIRMED'
       && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
       && planet['koi_prad'] < 1.6;
}

function loadPlanetsData(){
    return new Promise((resolve, reject)=> {
        fs.createReadStream(path.join(__dirname,'..', '..','data','Kepler_Data.csv'))
.pipe(parse({
    comment: '#',
    columns: true,
}))
.on('data', (data) => {
    if (isHabitablePlanet(data)) {
        habitablePlanets.push(data);
    }
})
.on('error', (err) => {
    console.log(err);
    reject(err)
})
.on('end', () => {
    console.log(`${habitablePlanets.length} habitable planets found!`);
    resolve();
   });
  });
}

function getAllPlanets() {
    return habitablePlanets;
}


    
    
module.exports ={
    loadPlanetsData,
    getAllPlanets,
};




/*
const parse = require('csv-parse');// using or calling the require module and the csv-parse package
const fs = require('fs');
const { resourceLimits } = require('worker_threads');

const results = [];
// the creatRadStream only reads the file as buffers in bit and bytes
fs.createReadStream('Kepler_Data.csv')

// the pipe function is meant to connect a readable source to a writable stream destination
// the Kepler_Data id the source while the parse is the destination
  .pipe(parse({
    comment:'#', //this will treat every line dat starts with # as comment
    columns: true, // did will return every row as js object with key value pairs
}))
.on('data', (data) =>{
    results.push(data);
})
.on('error', (err) =>{
    console.log(err);
})
.on('end', () =>{
    console.log(results);
    console.log('done');
});
*/