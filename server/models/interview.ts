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

// Indexing an existing collections
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

/** Indexing analysers
 *
 * References:
 * https://www.elastic.co/guide/en/elasticsearch/guide/current/_index_time_search_as_you_type.html
 *
 * Filters:
 * https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-edgengram-tokenfilter.html
 * https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-asciifolding-tokenfilter.html
 *
 * Tokenizers:
 * https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-standard-tokenizer.html
 * https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-edgengram-tokenizer.html
 * https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-whitespace-tokenizer.html
 */
Interview.createMapping({
  "settings": {
    "analysis": {
      "filter": {
        "autocomplete_filter": {
            "type":     "edge_ngram",
            "min_gram": 2,
            "max_gram": 20
        }
      },
      "analyzer": {
        "autocomplete": {
            "type":      "custom",
            "tokenizer": "standard",
            //"tokenizer":"edge_ngram_tokenizer",
            "filter": [
                "lowercase",
                "asciifolding",
                "autocomplete_filter" 
            ]
        },
        // The whitespace tokenizer breaks text into terms 
        // whenever it encounters a whitespace character.
        // "whitespace_analyzer": {
        //     "type": "custom",
        //     "tokenizer": "whitespace",
        //     "filter": [
        //       "lowercase",
        //       "asciifolding"
        //    ]    
        // }
      },
      // The edge_ngram tokenizer first breaks text down into words, 
      // then it emits N-grams of each word
      // "tokenizer" : {
      //   "edge_ngram_tokenizer" : {
      //     "type" : "edge_ngram",
      //     "min_gram" : "2",
      //     "max_gram" : "8",
      //     "token_chars": [ "letter", "digit" ]
      //   }   
      // }
    }
  }
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