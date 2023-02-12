console.log('Client-side code running');

const button = document.getElementById('searchPwnage');
button.addEventListener('click', function(e) {
  console.log('button was clicked');

fetch("http://25.68.246.17:30001/api/search", {
  method: "post",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },

  //make sure to serialize your JSON body
  body: JSON.stringify({"key":"email","value":"clairelaigo@yahoo.com"})
  })
  .then( (response) => { 
   console.log("Success");
});
});