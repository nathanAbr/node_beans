$(()=>{
    $('#send').click(()=>{
        let data = {
            designation: "Truc",
            amount: 100,
            type: "Dev",
            VAT: 20,
            action_date: new Date("2014-12-4")
        };

       /* $.ajax({
            url: '/bill',
            type: "post",
            data: data,
            success: (result)=>{
              console.log('success!'+result)
            },
            error: (err) =>{console.log(':( '+error)},
            complete : ()=>{console.log('done!')},
            dataType: "json"
        });  */
        
         $.post("/bill", data,
            function(data, status){
                console.log("Data: " + data + "\nStatus: " + status);
            });
    });
    
});