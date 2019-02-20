$( document ).ready(function() {
	//contact form

    $('#submit-contact-button').click(function(){
      $('#contact-form').validate({
        submitHandler : submitContactForm
      });
    });

    $('#book-seat-form').click(function(){
      $('#book-seat-form').validate({
        submitHandler: submitBookSeatForm
      });
    });

    function submitBookSeatForm(form) {
      $.ajax({
        type: "POST",
        url: "https://trackcmp.net/event",
        data: {
          actid: "475256527",
          key: "b8f513b65b563a5aff17f0b918e02788cd64588c",
          event: "may_2017_client_event",
          eventdata: "testdata",
        }
      });
    }

    //captchaVerificationCode : grecaptcha.getResponse()
    function submitContactForm(form) {
      var contactObject = {
          sourcePage : window.location.href,
          fullName : $('#full-name').val(),
          practiceName : $('#practice-name').val(),
          address : $('#address-firstline').val(),
          postcode : $('#post-code').val(),
          emailAddress : $('#email-address').val(),
          telephoneNumber : $('#phone-number').val(),
          howManyPractitioners : $('#practitioners-amount option:selected').text(),
          demoDay : $('#demo-day option:selected').text(),
          demoTime : $('#demo-time option:selected').text(),
          enquiryAbout : $('#enquiry-source option:selected').text(),
          message : $('#message-content').val(),
        };



      $.ajax({
        type: "POST",
        url: "/api/send-email",
        data: {payload: JSON.stringify(contactObject)},
        success: function(e){
          //console.log("away")
        }
      });

      if(window.location.pathname == '/tm2-to-tm3/')
        window.location.replace("tm2-to-tm3-thank-you");

      $('.hide-me').fadeOut(400, function()
      {
          $('#thank-you').removeClass('hidden');
      });
    }

    $('#demo-form').validate({
      submitHandler : submitDemoForm
    });
    //book a demo
    function submitDemoForm (form){
    	var demoObject = {
    		sourcePage : window.location.href,
    		fullName : $('#full-name').val(),
    		practiceName : $('#practice-name').val(),
        address : $('#address-firstline').val(),
        postcode : $('#post-code').val(),
    		emailAddress : $('#email-address').val(),
    		telephoneNumber : $('#phone-number').val(),
    		whereHearAboutUs : $('#training-type option:selected').text(),
        howManyPractitioners : $('#practitioners-amount option:selected').text(),
        discountCode : $('#discount-code').val(),
        message : $('#message-content').val()
    	};


    	$.ajax({
    		type: "POST",
    		url: "/api/send-email",
    		data: {payload:JSON.stringify(demoObject)},
    		success: function(e){
    			//console.log("away")
    		}
    	});

        if(window.location.pathname == '/social-media-webinar/')
        window.location.replace("video");


        $('.hide-me').fadeOut(400, function()
        {
            $('#thank-you').removeClass('hidden');
        });

    };
    <!--Facebook tracking-->


    $('#training-form').validate({
      submitHandler : submitTrainingForm
    });
     //training form
    function submitTrainingForm (form) {
        var trainingObject = {
            sourcePage : window.location.href,
            fullName : $('#full-name').val(),
            practiceName : $('#practice-name').val(),
            emailAddress : $('#email-address').val(),
            telephoneNumber : $('#phone-number').val(),
            preferredTrainingType : $('#training-type option:selected').text(),

        };
        $.ajax({
            type: "POST",
            url: "/api/send-email",
            data: {payload:JSON.stringify(trainingObject)} ,
            success: function(e){
               // console.log("away")
            }

        });
        $('.hide-me').fadeOut(400, function()
        {
            $('#thank-you').removeClass('hidden');
        });
    };

    $('#demotime-form').validate({
      submitHandler : submitDemotimeForm
    });
    //book a demo with demo time
    function submitDemotimeForm (form){
      var demoObject = {
        sourcePage : window.location.href,
        fullName : $('#full-name').val(),
        practiceName : $('#practice-name').val(),
        address : $('#address-firstline').val(),
        postcode : $('#post-code').val(),
        emailAddress : $('#email-address').val(),
        telephoneNumber : $('#phone-number').val(),
        whereHearAboutUs : $('#training-type option:selected').text(),
        howManyPractitioners : $('#practitioners-amount option:selected').text(),
        demoDay : $('#demo-day option:selected').text(),
        demoTime : $('#demo-time option:selected').text(),
        message : $('#message-content').val()
      };


      $.ajax({
        type: "POST",
        url: "/api/send-email",
        data: {payload:JSON.stringify(demoObject)},
        success: function(e){
          //console.log("away")
        }

      });
        $('.hide-me').fadeOut(400, function()
        {
            $('#thank-you').removeClass('hidden');
        });
    };

    $('#open-sales-live-chat').click(function(){
        $('#habla_topbar_div').click();
    });
    $('#open-support-live-chat').click(function(){
        $('#habla_topbar_div').click();
    });



});
