const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
  async store(req, res) {

    const {github_username, techs, latitude, longitude} = req.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev){
      const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

      const {name = login, avatar_url, bio} = apiResponse.data;


      const techsArray = parseStringAsArray(techs);


      const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
      };

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location
      });
      return res.json(dev);
    }

    return res.status(401).json({ error: "usuario ja cadastrado"});
  },

  async index(req,res) {
    const devs = await Dev.find();
    return res.json(devs);
  }


};
