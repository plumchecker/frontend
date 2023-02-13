console.log('Client-side code running');

function GetData() {
  const uri = 'http://25.68.246.17:30001/api/search';
  const initDetails = {
    mode: "cors",
    method: "post",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    //make sure to serialize your JSON body
    body: JSON.stringify({"key":"email","value":"clairelaigo@yahoo.com"})
    }

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