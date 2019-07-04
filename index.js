const express = require('express');
const app = express();
const request = require('request');

app.set('view engine', 'ejs');

//Public folder
app.use('/public', express.static('public'));


//route for the default homepage
app.get('/', (req, res) => {

  request('http://www.mocky.io/v2/5d1c07823400005200b5fae7', function(error, response, result) {

  //JSON is passed to the template and is rendered
    res.render('index', { details:JSON.parse(result) });
  });
});


//API route for all the data

app.get('/api/getAll', (req, res) => {

  request('http://www.mocky.io/v2/5d1c07823400005200b5fae7', function(error, response, result) {
    res.send(JSON.parse(result));
  });
});


//API route for the filtration 

app.get('/api/getByFilter',(req,res)=>
{
  var location=(req.query.location);
  var industry=(req.query.industry);
  var size=(req.query.size);
  var use_case=(req.query.use_case);
  var resultFilter=new Array();
  request('http://www.mocky.io/v2/5d1c07823400005200b5fae7', function(error, response, result) {
    var details=JSON.parse(result);
    for(var det in details)
{

  //for the location filtration

    if(location)
  {
    if(location== details[det].location)
    {
           resultFilter.push(details[det]);
    }
    
    if(resultFilter)
    {
      for(var i=0;i<resultFilter.length;i++)
      {
        if(resultFilter[i].location!=location)
        {
          resultFilter.splice(i,1);
        }
      }
    }

  }
  //for the industry filtration
  if(industry)
  {
    if(industry== details[det].industry)
   { 
    resultFilter.push(details[det]);
  }
   
  if(resultFilter)
  {
    for(var i=0;i<resultFilter.length;i++)
    {
      if(resultFilter[i].industry!=industry)
      {
        resultFilter.splice(i,1);
      }
    }
  }

}

//for the size filtration
  if(size)
  {
    if(size== details[det].company_size)
    {
      resultFilter.push(details[det]);
    }
 
    if(resultFilter)
    {
      for(var i=0;i<resultFilter.length;i++)
      {
        if(resultFilter[i].company_size!=size)
        {
          resultFilter.splice(i,1);
        }
      }
    }
  }

  //for the use case filtration
  if(use_case)
  {
    if(use_case== details[det].use_case)
    {
      resultFilter.push(details[det]);
    }
     
    if(resultFilter)
    {
      for(var i=0;i<resultFilter.length;i++)
      {
        if(resultFilter[i].use_case!=use_case)
        {
          resultFilter.splice(i,1);
        }
      }
    }

  }
}

console.log(resultFilter);

//Below I have made the JSON data unique.
var uniqueFilter=[];


for(var value of resultFilter){
  if(uniqueFilter.indexOf(value) === -1){
    uniqueFilter.push(value);
  }
}

//the new json is then passed to the template
res.send(uniqueFilter);
  });
});



//Server Port
app.listen(8000, () => {
  console.log('App is runnning on port 8000!')
});
