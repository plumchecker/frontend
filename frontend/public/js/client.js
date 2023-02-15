console.log('Client-side code running');

function GetData() {
  const uri = 'http://25.57.48.41:30001/api/search';
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


    //document.getElementById('response').write(response);

    console.log( response["leaks"]);
    console.log( response.headers.get( "Content-Type" ) );
    return response.json();
  }).then( myJson =>
        {
            // console.log(JSON.stringify(myJson));
            add_data_to_list(myJson["leaks"]);//тут if
            /*if (myJson["start_curcor"]=="") {
              alert('Alertik') } */
            console.log( myJson["leaks"]);
            console.log( myJson["start_cursor"]);
            console.log( myJson["end_cursor"]);
            if (myJson["start_cursor"]=="") console.log('Oshibkaa');
        } )
        .catch( err =>
        {
            console.log( 'Fetch Error :-S', err );
        } );


}
/*function ahtung(Alertik){
  var sms = document.getElementById(Alertik);
}*/

function leave_one_row(tableID)
{
  var tableHeaderRowCount = 1;
  var table = document.getElementById(tableID);
  var rowCount = table.rows.length;
  for (var i = tableHeaderRowCount; i < rowCount; i++) {
      table.deleteRow(tableHeaderRowCount);
  }
}

function add_data_to_list(data)
{
  leave_one_row("tableID")
  let table = document.getElementById("tableID");
  for(i=0;i<data.length;i++) {
    var row = table.insertRow(-1);

    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);

    console.log(data[i]['password'])
    cell1.innerHTML = data[i]['password'];
    cell2.innerHTML = data[i]['email'];
    cell3.innerHTML = data[i]['domain'];


    // let newCell = newRow.insertCell(0);
    // let newText1 = document.createTextNode(data[i]['password']);
    // newCell.appendChild(newText1);

    // let newCell1 = newRow.insertCell(1);
    // let newText2 = document.createTextNode(data[i]['email']);
    // newCell1.appendChild(newText2);

    // let newCell2 = newRow.insertCell(2);
    // let newText3 = document.createTextNode(data[i]['domain']);
    // newCell2.appendChild(newText3);




  }
}