import * as mongoose from 'mongoose';

var mongoosastic = require("mongoosastic");


const interviewSchema = new mongoose.Schema({
  sourceUrl: { type: String, default: "", required: true, es_indexed:true, es_analyzer: 'autocomplete' },
  title: { type: String, default: "", es_indexed:true, es_analyzer: 'autocomplete' },
  sourceLang: { type: String, default: "en" },
  textOriginal: { type: String, default: "", es_indexed:true, es_analyzer: 'autocomplete' },
  textRu: { type: String, default: "", es_indexed:true, es_analyzer: 'autocomplete' },
  addedBy: { type: String, default: "" },
  addedDate: { type: Date, default: Date.now },
  isVideo: { type: Boolean, default: false },
  isAudio: { type: Boolean, default: false },
  isActive: { type: Boolean, default: false }
});
//


interviewSchema.plugin(mongoosastic, {  
  // hosts: ['localhost:9200'],
  // host: 'localhost',
  // port: 9200,
  // protocol: "https",
  // auth: "root:root",
  hydrate:true,
  curlDebug: true
});

const Interview = mongoose.model('Interview', interviewSchema);

// Indexing An Existing Collection
var stream = Interview.synchronize(), count = 0;
stream.on('data', function(err, doc){
  count++;
});
stream.on('close', function(){
  console.log('indexed ' + count + ' documents!');
});
stream.on('error', function(err){
  console.log(err);
});

//
Interview.createMapping({
  "settings": {
    "analysis": {
      "filter": {
        "autocomplete_filter": {
            "type":     "edge_ngram",
            "min_gram": 1,
            "max_gram": 20
        },
        // "edgeNGram_filter": {
        //    "type": "edgeNGram",
        //    "min_gram": 2,
        //    "max_gram": 20
        // }
      },
      "analyzer": {
        "autocomplete": {
            "type":      "custom",
            "tokenizer": "standard",
            "filter": [
                "lowercase",
                "autocomplete_filter" 
            ]
        },

        // "edge_nGram_analyzer": {
        //     "type":"custom",
        //     "tokenizer":"edge_ngram_tokenizer",
        //     "filter": [
        //       "lowercase",
        //       "asciifolding",
        //       "edgeNGram_filter"
        //     ]
        // },
        // "whitespace_analyzer": {
        //     "type": "custom",
        //     "tokenizer": "whitespace",
        //     "filter": [
        //       "lowercase",
        //       "asciifolding"
        //    ]    
        // }
      },
      // "tokenizer" : {
      //   "edge_ngram_tokenizer" : {
      //     "type" : "edgeNGram",
      //     "min_gram" : "2",
      //     "max_gram" : "10",
      //     "token_chars": [ "letter", "digit" ]
      //   }   
      // }
    }
  }
  // "mappings": {
  //   "interviews": {
  //     "_all": {
  //       "analyzer": "edge_nGram_analyzer", 
  //       "search_analyzer": "edge_nGram_analyzer"
  //     }
  //   }
  // }
}, (err, mapping) => {
  if(err){
    console.log('error creating mapping (you can safely ignore this)');
    console.log(err);
  }else {
    console.log('mapping created!');
    console.log(mapping);
  }
});



export default Interview;

