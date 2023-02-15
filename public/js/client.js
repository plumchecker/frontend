console.log('Client-side code running');

function GetData() {
  const uri = 'http://25.57.48.41:30001/api/search';
  const form = document.getElementById('form');
  
  var e = document.getElementById("select"); //email passwor or domain
  var input_type = e.options[e.selectedIndex].text;

  const input_line = form.querySelector('[name="Account"]');

  data={
    type: input_type,
    line: input_line.value
  };

  console.log(data);

  const initDetails = {
    mode: "cors",
    method: "post",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    //make sure to serialize your JSON body
    body: JSON.stringify({ "key": data.type, "value": data.line })
    }
  //console.log(initDetails);

  fetch(uri, initDetails).then( response => {
    if ( response.status !== 200 )
    {
        console.log( 'Looks like there was a problem. Status Code: ' +
            response.status );
        return;
    }

    console.log( response.headers.get( "Content-Type" ) );
    return response.json();
  }).then( myJson =>
        {
            console.log( JSON.stringify( myJson ) );
        } )
        .catch( err =>
        {
            console.log( 'Fetch Error :-S', err );
        } );
}