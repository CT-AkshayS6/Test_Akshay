$(document).ready(function () {

    //strParent = "Main";
    //strNode = "ManageUser";

    $("#txtEnquiryDate").datepicker({
        autoclose: true
    });

    var intId = getUrlVars()["id"];
    var strXmlObjects = "";

    $("#btnSave").click(function () {

        if (ValidateControls() == false) {
            return false;
        }

        var strEnquiryDate;

        if ($("#txtEnquiryDate").val() == "") {
            DisplayMessage("Please select enquiry date!", "N");
            return false;
        }
        else {
            strEnquiryDate = $("#txtEnquiryDate").val();
            strEnquiryDate = strEnquiryDate.split("-");
            strEnquiryDate = strEnquiryDate[2] + "-" + strEnquiryDate[1] + "-" + strEnquiryDate[0];
        }            

        var strFunction = "";
        var strData = "";

        if (intId == "" || intId == undefined) {

            strFunction = "fnEnquiryInsert";
            strData = '{strFullName : "' + $("#txtFullName").val() +                
                '", strEmail : "' + $("#txtEmail").val() +
                '", strMobile : "' + $("#txtMobileNo").val() +
                '", strAlternateMobile : "' + $("#txtAlternateMobileNo").val() +
                '", strEnquiryDate : "' + strEnquiryDate +
                '", strGender : "' + $("input[name='Gender']:checked").val() +
                '", strAddress : "' + $("#txtAddress").val() +
                '" }';
        }
        else {
            strFunction = "fnEnquiryUpdate";
            strData = '{strId:"' + intId +
                '", strFullName : "' + $("#txtFullName").val() +
                '", strEmail : "' + $("#txtEmail").val() +
                '", strMobile : "' + $("#txtMobileNo").val() +
                '", strAlternateMobile : "' + $("#txtAlternateMobileNo").val() +
                '", strEnquiryDate : "' + strEnquiryDate +
                '", strGender : "' + $("input[name='Gender']:checked").val() +
                '", strAddress : "' + $("#txtAddress").val() +
                '" }';
        }

        $.ajax({
            type: "POST",
            url: "frmEnquiryAdd.aspx/" + strFunction,
            data: strData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: OnSuccessSave,
            failure: function (response) {
                DisplayMessage("Error on the server!", "N");
            }
        });

    });

    function OnSuccessSave(response) {

        if (response.d == "1") {
            DisplayMessage("Enquiry added successfully!", "Y");

            if (intId == "" || intId == undefined) {
                ClearControls();
                //window.location.replace("frmUserView.aspx");
            }

            else {
                //window.location.replace("frmUserView.aspx");
            }

            return false;
        }
        else {
            DisplayMessage("Duplicate record! Please try again..", "N");
            return false;
        }
    }

    function ClearControls() {

        $("#txtFullName").val('');
        $("#txtEmail").val('');
        $("#txtMobileNo").val('');
        $("#txtAlternateMobileNo").val('');
        $("#txtEnquiryDate").val('');
        $("#txtAddress").val('');
    }

    function ValidateControls() {

        if ($("#txtFullName").val() == "") {
            DisplayMessage("Please enter full name!", "N");
            return false;
        }


        if ($("#txtEmail").val() == "") {
            DisplayMessage("Please enter email!", "N");
            return false;
        }

        if (!isEmail($("#txtEmail").val())) {
            DisplayMessage("Please enter proper email!", "N");
            return false;
        }


        if ($("#txtMobileNo").val() == "") {
            DisplayMessage("Please enter mobile no. !","N");
            return false;
        }

        if ($("#txtMobileNo").val().length != 10) {
            DisplayMessage("Entered mobile number is not proper.!","N");
            return false;
        }

        if ($("#txtAlternateMobileNo").val() != "" && $("#txtAlternateMobileNo").val().length != 10) {
            DisplayMessage("Entered alternate mobile number is not proper.!","N");
            return false;
        }

        if ($("#txtAddress").val() == "") {
            DisplayMessage("Please enter address!", "N");
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
                DisplayMessage("Error on the server!", "N");
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
