$(document).ready(function () {
  //get data from serverand populate table.
  $.get("getCricketersData.php", function (data) {
    let resp = JSON.parse(data);
    populateTable(resp.cricketersdata);
  });

  const populateTable = (cricketersArray) => {
    $("#tablebody").html("");
    let i = 0;
    while (i < cricketersArray.length) {
      $("#tablebody").append(`<tr>
      <td>
        <img
          src= "${cricketersArray[i].imgurl}" alt="${cricketersArray[i].name}" width="150" height="100"/>
      </td>
      <td>${cricketersArray[i].name}</td>
      <td>${cricketersArray[i].age}</td>
      </tr>`);
      i++;
    }
  };

  //when button is clicked send data to server and populate table
  $(".btn").click(function () {
    let imgurl = $("#imageurl").val();
    let name = $("#name").val();
    let age = parseInt($("#age").val());

    let patt = new RegExp("^[A-Z][-a-zA-Z]+$");
    let nameres = patt.test(name);

    if (nameres && Number.isInteger(age) && 16 < age <= 40) {
      $.post("addCricketersData.php", { imgurl, name, age }, function (data) {
        let resp = JSON.parse(data);
        if (resp.status == 200) {
          console.log(`Successfully added to database`);
          populateTable(resp.cricketersdata);
        } else {
          console.log(`Error while adding data to database`);
        }
      });
    } else {
      $("#errormessage").html(`URL or Name or Age field vales are incorrect`);
    }
  });
});
