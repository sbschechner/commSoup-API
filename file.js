const places = require('./commSoup.json');
const fs = require('fs');

const firstPlaces = places.slice(1, 11);

places.forEach(place => {
    const coord = [Number.parseFloat(place["FIELD12"]), Number.parseFloat(place["FIELD11"])];
    place["FIELD22"] = coord;
});

const output = "output2.json";

fs.writeFile(output, JSON.stringify(places), 'utf8', function (err) {
    if (err) {
        return console.log(err);
    }
    console.log("The file was saved!");
}); 
