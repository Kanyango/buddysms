var throng = require('throng');


var WORKERS = process.env.WEB_CONCURRENCY || 1;
var PORT = process.env.PORT || 8080;


throng(start, {
  workers: WORKERS,
  lifetime: Infinity
});

function start(){
      require('/app');
}
