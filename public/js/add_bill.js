$(() => {
  let data = {};
  $(".customerChoice").change(() => {
    if ($(".customerChoice").val() != "")
      $(".providerChoice option")
        .eq(0)
        .prop("selected", true);
  });
  $(".providerChoice").change(() => {
    if ($(".providerChoice").val() != "")
      $(".customerChoice option")
        .eq(0)
        .prop("selected", true);
  });

  $("#type").change(() => {
    switch ($("#type").val()) {
      case "Formation":
        $("#vat").val(0);
        break;
      case "Dev":
         $("#vat").val(20);
        break;
      default:
        $("#vat").val(null);
    }
  });

  $("#send").click((e) => {
    e.preventDefault();
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
      vat : $("#vat").val(),
      billing_date: $("#billing_date").val(),
      payment_date: $("#payment_date").val()
    }; 
    let recursif = $("#recursif").is(':checked');
    console.log(recursif);

    /*if($("#designation").val()==""){
      console.log("ERREUR PROFESSEUR!");
      $("#alerte").append("La balise désignation est vide</br>");
    }
    if($("#type").val()== ""){
      $("#alerte").append("La balise type n'est pas renseignée </br>");
    }
    if($("#amount").val()== ""){
      $("#alerte").append("La balise montant n'est pas renseignée </br>");
    }
    if($("#billing_date").val() ==""){
      $("#alerte").append("La balise \"date de facturation\" n'est pas renseignée </br>");
    }

    
    if($("#designation").val()==""||$("#type").val()== ""||$("#billing_date").val() ==""){

      
    }
    else{
      
    }
*/
    if ($(".customerChoice").val() != "") {
      data.customer = $(".customerChoice").val();
      console.log(data.customer);
    }

    if($(".providerChoice").val() != ""){
      console.log(data.provider);
      data.provider = $(".providerChoice").val();
    }
    
   $.post("/bill", {recursif: recursif, data: data}, function(data, status) {
      console.log("Data: " + data + "\nStatus: " + status);
    });

  });
});

