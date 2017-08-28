abstract class BaseCtrl {

  abstract model: any;

  // Get all
  getAll = (req, res) => {
    this.model.find({}, (err, docs) => {
      if (err) { return console.error(err); }
      res.json(docs);
    });
  };

  // Search entries
  search = (req, res) => {
    // res.json({
    //     keyword: req.param('keyword'),
    //     path: req.param(0)
    // });
    this.model.search({
      // query_string: 

        // {query: "*"+req.params.keyword+"*"}

        // {
        //     "default_field" : "title",
        //     "query" : req.params.keyword
        // },

        // https://www.elastic.co/guide/en/elasticsearch/guide/current/multi-field-search.html
        // match_phrase_prefix: {
        //     "title" : {
        //         "query" : req.params.keyword
        //     }
        // },

        // multi_match: {
        //   "query":    req.params.keyword+"*",
        //   "fields": [ "title", "sourceUrl", "textOriginal", "textRu" ]
        // },

        query_string: {
          "query":    req.params.keyword+"*",
          "fields": [ "title", "sourceUrl", "textOriginal", "textRu" ]
        },

        // match: {
        //     // title : req.params.keyword,
        //     "title": {
        //         "query":    req.params.keyword,
        //         "analyzer": "standard" 
        //     }
        // }

    }, 

    function(err, results) {
        if (err) { return console.error(err); }
        console.log("---------------req.params---------------");
        console.log(req.params);
        console.log("---------------req.query---------------");
        console.log(req.query);
        console.log("---------------results---------------");
        console.log(results);
        console.log("------------------------------");
        console.log(results.hits.hits);
        console.log("------------------------------");
        // res.send(results);
        res.json(results.hits.hits);
    });
  };





  // Count all
  count = (req, res) => {
    this.model.count((err, count) => {
      if (err) { return console.error(err); }
      res.json(count);
    });
  };

  // Insert
  insert = (req, res) => {
    const obj = new this.model(req.body);
    obj.save((err, item) => {
      // 11000 is the code for duplicate key error
      if (err && err.code === 11000) {
        res.sendStatus(400);
      }
      if (err) {
        return console.error(err);
      }
      res.status(200).json(item);
    });
  };

  // Get by id
  get = (req, res) => {
    this.model.findOne({ _id: req.params.id }, (err, obj) => {
      if (err) { return console.error(err); }
      res.json(obj);
    });
  };

  // Update by id
  update = (req, res) => {
    this.model.findOneAndUpdate({ _id: req.params.id }, req.body, (err) => {
      if (err) { return console.error(err); }
      res.sendStatus(200);
    });
  };

  // Delete by id
  delete = (req, res) => {
    this.model.findOneAndRemove({ _id: req.params.id }, (err) => {
      if (err) { return console.error(err); }
      res.sendStatus(200);
    });
  };
}

export default BaseCtrl;
