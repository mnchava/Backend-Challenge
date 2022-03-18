const mongoose = require("mongoose");
const { Schema } = mongoose;

var objModel = mongoose.model("Object", new Schema({}, { strict: false }));

// router.put('/alpha', alpha);
// Alphabetize the keys in the request JSON payload, load the request into a database and returns the resulting JSON back in the HTTP response
function alpha(req, res, next) {
  const unorderded = req.body;
  if (Object.keys(unorderded).length != 0) {
    const ordered = Object.keys(unorderded)
      .sort()
      .reduce((obj, key) => {
        obj[key] = unorderded[key];
        return obj;
      }, {});

    new objModel(ordered).save(ordered).catch((err) => {
			console.error(err);
			res.status(500).send("Internal error: " + err.message);
		});

    res.status(200).json(ordered);
  } else {
		res.status(400).send("Invalid input");
	}
}

module.exports = alpha;
