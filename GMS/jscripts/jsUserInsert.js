$(document).ready(function () {

    strParent = "Main";
    strNode = "ManageUser";

    var intId = getUrlVars()["id"];
    var strXmlObjects = "";
    
    if (intId != "" && intId != undefined) {
        fnGetUserDetails();
    }

    $("#btnSave").click(function () {

        if (ValidateControls() == false) {
            return false;
        }

        var strFunction = "";
        var strData = "";

        if (intId == "" || intId == undefined) {

            strFunction = "fnUserInsert";
            strData = '{ strFirstName : "' + $("#txtFirstName").val() +
                '", strLastName : "' + $("#txtLastName").val() +
                '", strEmail : "' + $("#txtEmail").val() +
                '", strMobile : "' + $("#txtPhoneNo").val() +               
                '", strLevel : "' + $("#selLevel").val() +
                '" }';
        }
        else {
            strFunction = "fnUserUpdate";
            strData = '{strId:"' + intId +               
                '", strFirstName : "' + $("#txtFirstName").val() +
                '", strLastName : "' + $("#txtLastName").val() +
                '", strEmail : "' + $("#txtEmail").val() +
                '", strMobile : "' + $("#txtPhoneNo").val() +                
                '", strLevel : "' + $("#selLevel").val() +
                '" }';
        }

        $.ajax({
            type: "POST",
            url: "frmUserInsert.aspx/" + strFunction,
            data: strData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: OnSuccessSave,
            failure: function (response) {
                DisplayMessage("Error on the server!","N");                
            }
        });

    });

    function OnSuccessSave(response) {

        if (response.d == "1") {
            DisplayMessage("Record saved successfully!","Y");

            if (intId == "" || intId == undefined) {
                ClearControls();
                window.location.replace("frmUserView.aspx");
            }

            else
            {
                window.location.replace("frmUserView.aspx");
            }

            return false;
        }
        else {
            DisplayMessage("Duplicate record! Please try again..","N");
            return false;
        }
    }

    function ClearControls() {
       
        $("#txtFirstName").val('');
        $("#txtLastName").val('');
        $("#txtEmail").val('');
        $("#txtPhoneNo").val('');       
        $("#selLevel").val('-1');
    }

    function ValidateControls() {

        if ($("#txtFirstName").val() == "") {            
            DisplayMessage("Please enter first name!","N");
            return false;
        }
        

        if ($("#txtEmail").val() == "") {
            DisplayMessage("Please enter email!","N");
            return false;
        } 

        if (!isEmail($("#txtEmail").val()))
        {
            DisplayMessage("Please enter proper email!","N");
            return false;
        }


        if ($("#txtPhoneNo").val() == "") {
            alert("Please enter mobile no. !");
            return false;
        }

        if ($("#txtPhoneNo").val().length != 10) {
            alert("Entered mobile number is not proper.!");
            return false;
        }

        if ($("#selLevel").val() == "-1") {
            DisplayMessage("Please select user level!","N");
            return false;
        }
        
    }

    function fnGetUserDetails() {
        $.ajax({
            type: "POST",
            url: "frmUserInsert.aspx/fnGetUserDetails",
            data: '{intId:"' + intId + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: OnSuccessfnGetUserDetails,
            failure: function (response) {
                DisplayMessage("Error on the server!","N");
            }
        });
    }

    function OnSuccessfnGetUserDetails(response) {
        strXmlObjects = response.d;

        var xmlDoc = $.parseXML(strXmlObjects);
        var $xml = $(xmlDoc);

        $xml.find('data').each(function () {

            $(this).find('row').each(function () {
                
                $("#txtFirstName").val($(this).find("user_fname").text());
                $("#txtLastName").val($(this).find("user_lname").text());
                $("#txtEmail").val($(this).find("user_email").text());
                $("#txtPhoneNo").val($(this).find("user_mobile").text());              
                $("#selLevel").val($(this).find("user_level").text());

            });
        });

        $("#btnSave").html('update');
    } 

    function isEmail(email) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    }

});
