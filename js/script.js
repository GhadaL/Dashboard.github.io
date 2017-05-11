/*
@autor: Jefferson Rivera
@email: riverajefer@gmail.com
*/

$(document).ready(function() {

  //creamos un objeto de firebase, y le pasamos la URL como parametro
  var ref = new Firebase("https://raspberry-data.firebaseio.com/");//https://raspberry-data.firebaseio.com/LED1 test this also
  var rootRef = firebase.database().ref().child("Gaz");

 rootRef.on("child_added",snap => 
{

  var value=snap.child("value").val();
  var time=snap.child("time").val();
  var date=snap.child("date").val();
  $("#valueHere").html(value);
  $("#timeHere").html(time);
  $("#dateHere").html(date);

      if(value == 2){
    $(".audioDemo").trigger('play');
    }
}
  );
  /*****************************************************************
   We get the value of the last state
  ******************************************************************/
  ref.once("value", function(res) {

    var kitchen = res.child("LED1").val();
    var livingRoom=res.child("LED2").val();
   
    $('#switch1').attr('checked', kitchen);
    $('#switch2').attr('checked',livingRoom) // 
    
    console.log("Etat actuel LED1: " +kitchen+" LED2 : "+livingRoom)

  });

  /*****************************************************************
   We obtain the value of the state of light in real time,
   Every time there is change
   ici peut provoquer un probléme lorsque l 'app mobile change databse pour led2'
  ******************************************************************/
  ref.child("LED1").on("value",function(res){

    var kitchen =res.val();
    $('#switch1').prop('checked',kitchen)
  }) ;
  ref.child("LED2").on("value",function(res){

    var livingRoom =res.val();
    $('#switch2').prop('checked',livingRoom)
  }) ;

 /*****************************************************************
   We update the value, changed the status of the Switch
  ******************************************************************/
  $('#switch1').on('change', function(){ 
     if(this.checked) 
      {
          console.log("On")
          ref.update({ LED1: true });
      }
      else{
          console.log("Off")
          ref.update({ LED1: false });
      }
    });

  $('#switch2').on('change', function(){ 
     if(this.checked) 
      {
          console.log("On")
          ref.update({ LED2: true });
      }
      else{
          console.log("Off")
          ref.update({ LED2: false });
      }
    });

    
   
   $(document).click(function(){
     $(".audioDemo").trigger('pause');
      
      console.log("stop");

    });
});