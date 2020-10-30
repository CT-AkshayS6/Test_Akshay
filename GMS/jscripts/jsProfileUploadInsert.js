$(document).ready(function () {

    var intId = getUrlVars()["id"];
    var strXmlObjects = "";

    if (intId != "" && intId != undefined) {
        fnGetProfileDetails();
    }

    $("#btnSave").click(function () {

        if (ValidateControls() == false) {
            return false;
        }

        var strFunction = "";
        var strData = "";

        if (intId == "" || intId == undefined) {

            strFunction = "fnProfileInsert";
            strData = '{ strName : "' + $("#txtName").val() +
                '", strInformation : "' + $("#txtAboutUs").val() +
                '", strEmail : "' + $("#txtEmail").val() +
                '", strMobile : "' + $("#txtMobile").val() +                 
                '" }';
        }
        else {
            strFunction = "fnProfileUpdate";
            strData = '{strId:"' + intId +
                '", strName : "' + $("#txtName").val() +
                '", strInformation : "' + $("#txtAboutUs").val() +
                '", strEmail : "' + $("#txtEmail").val() +
                '", strMobile : "' + $("#txtMobile").val() + 
                '" }';
        }

        $.ajax({
            type: "POST",
            url: "frmProfileUploadInsert.aspx/" + strFunction,
            data: strData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: OnSuccessSave,
            failure: function (response) {

                alert("Error on the server!");
                //swal("Error on the server!");
            }
        });

    });

    function OnSuccessSave(response) {

        if (response.d == "1") {
            alert("Record saved successfully!");

            if (intId == "" || intId == undefined) {
                ClearControls();
                window.location.replace("frmProfileUploadView.aspx");
            }

            else {
                window.location.replace("frmProfileUploadView.aspx");
            }

            return false;
        }
        else {
            alert("Duplicate record! Please try again..");
            return false;
        }
    }

    function ClearControls() {

        $("#txtName").val('');
        $("#txtAboutUs").val('');
        $("#txtEmail").val('');
        $("#txtMobile").val('');        
    }

    function ValidateControls() {

        if ($("#txtName").val() == "") {
            alert("Please enter first name!");
            return false;
        }

        if ($("#txtAboutUs").val() == "") {
            alert("Please enter information!");
            return false;
        }

        if ($("#txtEmail").val() == "") {
            alert("Please enter email!");
            return false;
        }


        if ($("#txtMobile").val() == "") {
            alert("Please enter mobile no. !");
            return false;
        }       

    }

    function fnGetProfileDetails() {
        $.ajax({
            type: "POST",
            url: "frmProfileUploadInsert.aspx/fnGetProfileDetails",
            data: '{intId:"' + intId + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: OnSuccessfnGetProfileDetails,
            failure: function (response) {

                alert("Error on the server!");

            }
        });
    }

    function OnSuccessfnGetProfileDetails(response) {
        strXmlObjects = response.d;

        var xmlDoc = $.parseXML(strXmlObjects);
        var $xml = $(xmlDoc);

        $xml.find('data').each(function () {

            $(this).find('row').each(function () {

                $("#txtName").val($(this).find("prof_name").text());
                $("#txtAboutUs").val($(this).find("prof_information").text());
                $("#txtEmail").val($(this).find("prof_email").text());
                $("#txtMobile").val($(this).find("prof_mobile").text());                

            });
        });

        $("#btnSave").html('update');
    }

});
