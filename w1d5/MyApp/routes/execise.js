var express = require('express'); 
var fetch = require('node-fetch');
const Rx = require('@reactivex/rxjs');
var router = express.Router();

/* GET users listing. */
const postsPromise = fetch('http://jsonplaceholder.typicode.com/users/');
router.get('*', function(req,res){
  
/*//promise way
  postsPromise.then(data=>{ return data.json();})
              .then(data=>res.render('execise', { quotation: data }))
              .catch((err)=>{console.log(err)});
*/
  //promise + observable
/*  Rx.Observable.fromPromise(postsPromise)
               .flatMap((data)=>　{return data.json();})
               .subscribe((data) => {
                res.render('execise',{quotation:data});
               },()=>console.log("Error happened"),null);
*/
askMe(req,res);
});
//Async/Wait 
async function askMe(req, res) {
  try {
      let results = await fetch('http://jsonplaceholder.typicode.com/users/');
      let json_reslut = await results.json();
      await res.render('execise',{"cache": true, "quotation":json_reslut});

  } catch(error) {
    console.log('there is an error happened');
  }
}

module.exports = router;
