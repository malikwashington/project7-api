import axios from 'axios';
import db from '../db/connection.js';
import Character from '../models/Character.js';
// import characters from './characters.json' assert { type: 'json' };

const insertData = async (characters) => {
  let charactersData = [];

  for (let char in characters) {
    charactersData.push({
      name: char,
      title: characters[char].title,
      blurb: characters[char].blurb,
      image_loading: `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${char}_0.jpg`,
      image_splash: `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${char}_0.jpg`,
      tags: characters[char].tags,
      partype: characters[char].partype,
    });
  }

  // reset database
  await db.dropDatabase();
  // insert data
  await Character.create(charactersData);
  // close db connection
  await db.close();
};

const fetchCharacters = async () => {
  let characters = await axios.get(
    'http://ddragon.leagueoflegends.com/cdn/12.6.1/data/en_US/champion.json',
  );
  // ^ That request gets all the champion names
  // For each champion name, you now need to fire another request.
  const promiseArr = [];
  characters.forEach((character)=> {
    promiseArr.push(
      axios.get(`http://ddragon.leagueoflegends.com/cdn/12.6.1/data/en_US/champion/${champName}`)
    )
  }
  // Now you have all the get request promises in an array, just await all
  const arrOfChampResponses = await Promise.all(promiseArr);
  // console.log(characters.data.data);

  insertData(characters.data.data);
};

fetchCharacters();
