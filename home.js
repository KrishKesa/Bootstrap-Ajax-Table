$(document).ready(function () {
  var updateCricketerId;
  //get data from server and populate table.
  $.get("getCricketersData.php", function (data) {
    let resp = JSON.parse(data);
    populateTable(resp.cricketersdata);
  });

  $("#modalupdate").click(function () {
    //alert(`${updateCricketerId}`);
    //send id and age to updateCricketer endpoint
    let modalAge = $("#modalage").val();
    $.post(
      "updateCricketer.php",
      { id: updateCricketerId, age: modalAge },
      function (data) {
        let resp = JSON.parse(data);
        if (resp.status == 200) {
          populateTable(resp.cricketersdata);
          $("#myModal").modal("hide");
        } else {
          alert(`Wrong`);
        }
      }
    );
  });

  $("#tablebody").click(function (e) {
    let buttonId = e.target.id;
    let buttonIdValue = buttonId.includes("update");
    if (buttonIdValue) {
      updateCricketerId = buttonId.replace("updatebtn", "");
      $("#myModal").modal("show");
    } else {
      let cricketerId = buttonId.replace("delbtn", "");
      $.post("deleteCricketer.php", { id: cricketerId }, function (data) {
        let resp = JSON.parse(data);
        if (resp.status == 200) {
          populateTable(resp.cricketersdata);
        } else {
          console.log(`Error loading the data`);
        }
      });
    }
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
      <td>
        <button type="button" class="btn" id="updatebtn${cricketersArray[i].id}" data-toggle="modal">Update</button> 
        <button type="button" class="btn" id="delbtn${cricketersArray[i].id}">Delete</button>
      </td>
      </tr>`);
      i++;
    }
  };

  //when button is clicked send data to server and populate table
  $("#formadd").click(function () {
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
