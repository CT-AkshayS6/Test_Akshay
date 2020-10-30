$(document).ready(function () {

  
    $("#btnLogin").click(function () {

        if (ValidateControls() == false) {
            return false;
        }

        var strData = '{strEmail: "' + $("#txtUsername").val() + '", strMobile: "' + $("#txtPassword").val() + '" }';
        
        $.ajax({
            type: "POST",
            url: "index.aspx/Login",
            data: '{strEmail: "' + $("#txtUsername").val() + '", strMobile: "' + $("#txtPassword").val() + '" }',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: OnSuccessLogin,
            failure: function (response) {
                alert(response.d);
            }
        });      
    });

    function OnSuccessLogin(response) {
        
        if (response.d == "1") {

            window.location.replace("welcome.aspx");
            return false;
        }
        else {
            alert("Login failed! Please enter email or password again..");            
        }
    }

    function OnFailureLogin(response) {

        alert("Failure Function: Login failed! Please try again..");
    }

    function ValidateControls() {
        if ($("#txtUsername").val() == "") {
            alert("Please enter email id");
            return false;
        }

        var userinput = $("#txtUsername").val();
        var pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;

        if (!pattern.test(userinput)) {
            alert('not a valid e-mail address');
            return false;
        }

        if ($("#txtPassword").val() == "") {
            alert("Please enter mobile number");
            return false;
        }

        if ($("#txtPassword").val().length != 10) {
            alert("Please enter valid mobile number");
            return false;
        }
    }

});

