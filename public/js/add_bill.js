$(() => {
  let data = {};
  $("#customerChoice").change(() => {
    if ($("#customerChoice").val() != "")
      $("#providerChoice option")
        .eq(0)
        .prop("selected", true);
  });
  $("#providerChoice").change(() => {
    if ($("#providerChoice").val() != "")
      $("#customerChoice option")
        .eq(0)
        .prop("selected", true);
  });

 

  $("#send").click(() => {
    let action_date = new Date();
    let day = action_date.getDate();
    day = day.toString().split("T")[0];
    action_date =
      action_date.getFullYear() + "-" + action_date.getMonth() + "-" + day;

    data = {
      designation: $("#designation").val(),
      amount: $("#amount").val(),
      type: $("#type").val(),
      action_date: action_date,
      billing_date: $("#billing_date").val(),
      payment_date: $("#payment_date").val()
    };
    if ($("#customerChoice").val() != null) {
      data.customer = $("#customerChoice").val();
      console.log(data.customer);
    } else {
      data.provider = $("#providerChoice").val();
    }

    console.log("Data: " + JSON.stringify(data));
    $.post("/bill", data, function(data, status) {
      console.log("Data: " + data + "\nStatus: " + status);
    });
  });
  $("#type").change(() => {
    switch ($("#type").val()) {
      case "Formation":
        data.vat = $("#vat").val(0);
        break;
      case "Dev":
        data.vat = $("#vat").val(20);
        data.vat($("#vat").val(20));
        break;
      default:
        $("#vat").val(null);
    }
  });
});
