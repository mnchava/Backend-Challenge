const mongoose = require("mongoose");
const { Schema } = mongoose;
const fetch = require("cross-fetch");

var quoteModel = mongoose.model(
  "Quote",
  new Schema(
    { id: String, author: String, en: String },
    {
      timestamps: {
        createdAt: "consultation_date",
        updatedAt: false,
        currentTime: () => Date.now(),
      },
    }
  )
);

// router.put('/quote', quote);
// Consulta https://programming-quotes-api.herokuapp.com/quotes/random para obtener un cita. Y regresar el resultado
function quote(_, res) {
  const url = "https://programming-quotes-api.herokuapp.com/quotes/random";

  const request = fetch(url)
    .then((response) => {
      if (response.status >= 400) {
        res.status(response.status).send("Bad response from external API");
      }
      return response.json();
    })
    .then((data) => {
      const newQuote = quoteModel(data);
      newQuote.save(data).catch((err) => {
        res.status(500).send("Internal error: " + err.message);
      });

      res.status(200).json(newQuote);
    });
}

// router.get('/quotes', quotes);
/*
	Se espera que:
- Todos las citas sean regresadas
- Las citas se agrupen por autor y esten ordenadas alfabéticamente
- No se debe mostrar el autor en cada una de las citas
- Dentro de cada autor las citas se deben mostrar en orden descendente según la fecha de consulta
*/
function quotes(_, res) {
  const query = quoteModel.aggregate([
    {
      $sort: {
        consultation_date: -1,
      },
    },
    {
      $group: {
        _id: "$author",
        quote: {
          $push: {
            id: "$id",
            quote: "$en",
            consultation_date: "$consultation_date",
          },
        },
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
    {
      $project: {
        _id: 0,
        author: "$_id",
        quotes: "$quote",
      },
    },
  ]);

  query
    .exec()
    .then((data) => {
      res.status(200).json(buildResponse(data));
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error: " + err.message);
    });

	const buildResponse = (data) => {
		const response = {};

		data.forEach((item, index) => {
			response[item.author] = item.quotes;
		});

		return response;
	}
}

module.exports = { quote, quotes };
