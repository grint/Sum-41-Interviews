# Sum 41 Interviews
MEAN web-service for collecting of interviews with the band.


### Requirements

Node >= 5.0  
NPM >= 3  
Java >=1.8.0_131 (for Elasticsearch)
MongoDB
Elasticsearch


### Usage

**If not yet installed:**

Install Node.js: [Installation manual](https://nodejs.org/en/download/package-manager/)
Install MongoDB: [Installation manual](https://docs.mongodb.com/manual/installation/#mongodb-community-edition)  
Install Elasticsearch: [Installation manual](https://www.elastic.co/guide/en/elasticsearch/guide/current/running-elasticsearch.html)  
Install Java: [Installation manual](https://www.java.com/en/download/help/download_options.xml)  


```bash 
# Clone repository:  
git clone https://github.com/grint/Sum-41-Interviews.git Sum-41-Interviews
cd Sum-41-Interviews

# Install the dependencies with npm
npm install

# Build app
npm run build

# Run server
npm start
```

**Go to [`http://localhost:3000`](http://localhost:3000) in your browser.**

### Development

```bash
# Build files
npm run build

# Run development server
npm run dev
```

# Tech Stack

**Angular / Bootstrap 4 / Font Awesome**  
Client side layer.
https://angular.io/docs  
https://getbootstrap.com  
http://fontawesome.io/icons

**Express.js**  
Server side layer.  
http://expressjs.com

**Elasticsearch**  
Indexing and searching data in the database.  
https://www.elastic.co

**MongoDB**  
NoSQL Database  
https://docs.mongodb.com

**Core JS**  
Polyfills all standard ECMAScript methods.
https://github.com/zloirock/core-js

**dotEnv**  
For loading environment variables.  
https://github.com/motdotla/dotenv

**Json Web Token**  
angular2-jwt + jsonwebtoken  
For authentication & secure information exchange.  
https://jwt.io

**bcryptjs**  
For encryption of user passwords  
https://github.com/dcodeIO/bcrypt.js

**morgan**  
HTTP request logger middleware.  
https://github.com/expressjs/morgan

**RxJS**  
For better maintaining of asynchronous streams.  
http://reactivex.io/rxjs/

**Zone.js**  
For creating a context that persists across async tasks.  
https://github.com/angular/zone.js

**body-parser**  
For parsing incoming requests.  
https://github.com/expressjs/body-parser