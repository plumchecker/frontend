console.log('Client-side code running');

function GetData() {
  const uri = 'http://localhost:30001/api/search';
  const form = document.getElementById('form');
  
  var e = document.getElementById("select"); //email password or domain
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
  
    body: JSON.stringify({ "key": data.type, "value": data.line })
    }

  fetch(uri, initDetails).then( response => {
    if ( response.status !== 200 )
    {
        console.log( 'Looks like there was a problem. Status Code: ' +
            response.status );
        return;
    }

    console.log( response["leaks"]);
    console.log( response.headers.get( "Content-Type" ) );
    return response.json();
  }).then( myJson =>
        {
            add_data_to_list(myJson["leaks"]);
            console.log( myJson["leaks"]);
            console.log( myJson["start_cursor"]);
            console.log( myJson["end_cursor"]);
        } )
        .catch( err =>
        {
            console.log( 'Fetch Error :-S', err );
        } );


}

function clear_table(tableID)
{

  var table = document.getElementById(tableID);
  var rowCount = table.rows.length;
  for (var i = 1; i < rowCount; i++) {
      table.deleteRow(1);
  }
}

function add_data_to_list(data)
{
  clear_table("tableID")
  let table = document.getElementById("tableID"); 
  console.log(data)
if (data.length>0)
{  
  var row = table.insertRow(-1);

  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);

  cell3.innerHTML = 'password';
  cell1.innerHTML = 'email';
  cell2.innerHTML = 'domain';



  for(let i=0;i<data.length;i++) {
    var row = table.insertRow(-1);

    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);

    console.log(data[i]['password'])
    cell3.innerHTML = data[i]['password'];
    cell1.innerHTML = data[i]['email'];
    cell2.innerHTML = data[i]['domain'];

  }
}
else 
{
  var row = table.insertRow(-1);

  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);

  cell1.innerHTML = 'no';
  cell2.innerHTML = 'data';
  cell3.innerHTML = 'found';
}
}
