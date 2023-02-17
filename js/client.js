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

function add_row_to_table(table, new_row)
{
	var row = table.insertRow(-1);
	for (let i = 0; i < new_row.length; i++) {
		let cell = row.insertCell(i);
		cell.innerHTML = new_row[i];
	}
}

function add_data_to_list(data)
{
  clear_table("tableID")
  let table = document.getElementById("tableID"); 
  console.log(data)
if (data.length>0)
{  
	add_row_to_table(table, ['email', 'domain', 'password']);

  for(let i=0;i<data.length;i++) {
	  add_row_to_table(table, [data[i]['email'], data[i]['domain'], data[i]['password']])
    console.log(data[i]['password'])
  }
}
else 
{
	add_row_to_table(table, ['no', 'data', 'found']);
}
}
