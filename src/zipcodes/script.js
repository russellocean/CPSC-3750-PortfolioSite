$(document).ready(function () {
  $.ajax({
    type: "GET",
    url: "index.php",
    success: function (response) {
      console.log(response);
    },
    error: function () {
      // Handle error
      console.log("error");
    },
  });
});

function calculateDistance() {
  let zip1 = $("#zip1").val();
  let zip2 = $("#zip2").val();

  // Trim leading 0s from the zipcodes
  zip1 = zip1.replace(/^0+/, "");
  zip2 = zip2.replace(/^0+/, "");

  isDebug = $("#debugMode").prop("checked") ? true : false;

  console.log(isDebug);

  $.ajax({
    type: "POST",
    url: "index.php",
    data: {
      zip1: zip1,
      zip2: zip2,
      debugMode: isDebug,
    },
    success: function (response) {
      // Append the result to the output element
      let currentHtml = $("#output").html();
      $("#output").html(currentHtml + "<hr>" + response);
    },
    error: function () {
      console.log("error");
    },
  });
}
