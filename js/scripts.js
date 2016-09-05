$(document).ready(function() {

	typerListen();
	setSublime();
	autodemo();
	"use strict";

	// Wow Animations
    var wow = new WOW(
	    {
		    boxClass:     "wow",      
		    animateClass: "animated", 
		    offset:       0,       
		    mobile:       true,      
		    live:         true       
	    }
    )
    wow.init();

	// Slide out navigation
	$("#navigation").on("click", function(e){
		e.preventDefault();
		$(this).addClass("open");
		$("#slide_out_menu").toggleClass("open");

		if ($("#slide_out_menu").hasClass("open")) {
			$(".menu-close").on('click', function(e){
				e.preventDefault();
				$("#slide_out_menu").removeClass("open");
			})
		}
	});

	// Fixed navigation
	$(window).on("scroll", function(e) {
		if ($(this).scrollTop() > 50){
			$(".main-navigation").addClass("sticky");
		}
		else{
			$(".main-navigation").removeClass("sticky");
		}
	});

	//Scroll down
	$("#scroll-down").on("click", function () {
		var destination = $("#preview-app").offset().top;
		$("html, body").animate({scrollTop: destination}, 700);
	});

	//Testimonial carousel
	$("#owl-testimonials").owlCarousel({
		loop: true,
		navigation: true,
		navigationText: ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
		autoHeight : true,
		autoPlay: false,
		slideSpeed: 800,
		singleItem: true
	});

	//Downloads counter
	$(".counter").counterUp({
	    delay: 10,
	    time: 1000
	});

    //Back to Top
    $("#back-to-top").on("click", function(e) {
    	e.preventDefault();
    	$("html, body").animate({scrollTop: 0}, 700);
    });

	//Goals for Yandex.Metrika and Google Analytics
	$(".count_element").on("click", (function() {
		ga("send", "event", "goal", "goal");
		yaCounterXXXXXXXX.reachGoal("goal");
		return true;
	}));

	//Ajax form
	//Documentation: http://api.jquery.com/jquery.ajax/
	
	//Chrome Smooth Scroll
	try {
		$.browserSelector();
		if($("html").hasClass("chrome")) {
			$.smoothScroll();
		}
	} catch(err) {

	};

	$("img, a").on("dragstart", function(event) { event.preventDefault(); });
	
});
//Theme loader
$(window).on("load", function() {

		$('#loader').hide();
		setTimeout(function(){
			$('#loader').hide();
		}, 5000)
      $(".loader_inner").fadeOut();
	  $(".loader").delay(400).fadeOut("slow");
	  $('.coinbut').html('<a class="coinbase-button" style="margin-left:30px" data-code="80af0f7359cbc87314e09da7c96545bf" data-button-style="custom_small" href="https://www.coinbase.com/checkouts/80af0f7359cbc87314e09da7c96545bf">Pay With Bitcoin</a><script src="https://www.coinbase.com/assets/button.js" type="text/javascript"></script>');

});


function typerListen(){

	$('#typer').on('focus', function(){

		$('.cursor').css({'visibility':'hidden'});
		setTimeout(function(){

			$('#typer').trigger('change').trigger('keyup');
		}, 100)

	});


	
}

function setSublime(){
var value =$('#firstCode').val();
 editor = CodeMirror(document.body.getElementsByTagName("article")[0], {
    value: value,
    lineNumbers:true,
    mode: "javascript",
    autoCloseBrackets: true,
    matchBrackets: true,
    showCursorWhenSelecting: true,
    theme: "monokai",
    tabSize: 2
  });


}


function encrypt()
{
 pubkey=$('#pubKey').val();
 keyid = '02044b001cd7a551';
keytyp = 0; 




 if(keyid.length != 16)
 {
   alert('Invalid Key Id');
   return;
 } 
 
 


 var startTime=new Date();

 var text=$('#messageInfo').val();
 $('#messageInfo').val(doEncrypt(keyid, keytyp, pubkey, text));

 var endTime=new Date();
 //document.t.howLong.value=(endTime.getTime()-startTime.getTime())/1000.0;
}


function sendMessage(){
		$('#messageBut').html("Sending...");
	$.ajax({
		url:'/cloud/api/beta/messages.php',
		data:{
			message: $('#messageInfo').val(),
			email: $('#messEmail').val(),
			name: $('#messName').val()


		},
		complete:function(transport){
			$('#messageBut').html("Message Sent!");

			setTimeout(function(){

				$('#messageBut').html("Send Another");
			}, 12000)
		}
	})
}

function addToBeta(){

	$('#subNow').html("Adding you...");

	$.ajax({
		url:'/cloud/api/beta/',
		data:{
			email: $('#newsEmail').val()
		},
		complete:function(transport){
			$('#subNow').html("Added!");

				setTimeout(function(){

				$('#messageBut').html("Add Another");
			}, 12000)
		}
	})
}

function autodemo(){

	$('.term').on('click', function(){

		$('#typer').focus();
	})
	var options = {
		data: ["vc.main()", "vc.whoIsOwner()", "vc.withdraw()", "vc.getBalance()", "vc.balanceCheck()", "vc.ChangeOwner()"],
		list: {
		onChooseEvent: function() {
			

			determineNext($('#typer').val());
			}	
		}
	};	

	$("#typer").easyAutocomplete(options);
}
demoBalance= 0;
demoContractBalance = 2;

function determineNext(val){
	$('.commandline').append('user@GlassHunt:~$ '+val+"<br>");
	switch(val){

		case "vc.withdraw()":
			if(demoBalance ==0){
				$('.commandline').append(' >>> You deposited zero Ethereum. You are now withdrawing zero Ethereum. Complete.<br>');
			}
			else{
				$('.commandline').append(' >>> You have successfully withdrawn '+ demoBalance+ ' ether from this contract.');
				demoBalance = 0;
			}	
		break;

		case "vc.main()":
			$('.commandline').append(' >>> You have successfully deposited .001 ether into this contract.');
			demoBalance = demoBalance +.001;
			
		break;

		case "vc.getBalance()":
			$('.commandline').append(' >>> '+ demoBalance);
			
			
		break;

		case "vc.getBalance()":
			$('.commandline').append(' >>> You must be owner to execute that method. The owner is 0x0276FB667Ea61eF16a5dd0620c09E771d731Ad02. This what set in the constructor of the contract.');
			
			
		break;


		case "vc.balanceCheck()":
			if(demoBalance ==0){
				$('.commandline').append(' >>> You have zero Ether in deposit. You are now withdrawing zero Ethereum. Complete.<br>');
			}
			else if(demoContractBalance <=0){
				$('.commandline').append(' >>> This contract does not have enough funds for you to do that.<br>');
			}
			else{
				$('.commandline').append(' >>> You have successfully found the exploitable function. You have successfully withdrawn '+ demoBalance+ 'ether.');
				demoContractBalance = demoContractBalance-demoBalance;
			}	


			
		break;

		default: 
		$('.commandline').append(' >>>  0x0276FB667Ea61eF16a5dd0620c09E771d731Ad02<br>');
			//0x0276FB667Ea61eF16a5dd0620c09E771d731Ad02
		break;
	}


	$('#typer').val('');
	$('.cursor').css({'visibility':'visible'})

	setTimeout(function(){
		$('.cursor').css({'visibility':'hidden'})
		$('#typer').attr('placeholder', '');
		$('#typer').val('');
		$('#typer').focus();
	}, 1500)
	//$('.cursor').css({'visibility':'visible'});

}


