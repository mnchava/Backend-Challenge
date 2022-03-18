// router.use('/flatten', require('./flatten'));
// Flatten any JSON Arrays in the request JSON payload (comma separated) such that the resulting JSON does not contain any JSON Arrays
function flatten(req, res, next) {
  const obj = req.body;
  const keys = Object.keys(obj);

  if (keys.length != 0) {
    keys.forEach((key) => {
      if (Array.isArray(obj[key])) obj[key] = obj[key].join(",");
    });

    res.status(200).send(obj);
  } else {
    res.status(400).send("Invalid input");
  }
}

module.exports = flatten;
