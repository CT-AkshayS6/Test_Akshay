$(document).ready(function () {

   // ShowSelectedMenu("Main", "ManageDesignation");
    strParent = "Main";
    strNode = "ManageDesignation";

    var intId = getUrlVars()["id"];
    var strXmlObjects = "";

    if (intId != "" && intId != undefined) {
        fnGetDesignationDetails();
    }

    $("#btnSave").click(function () {

        if (ValidateControls() == false) {
            return false;
        }

        //run_waitMe();

        var strFunction = "";
        var strData = "";

        if (intId == "" || intId == undefined) {

            strFunction = "fnDesignationInsert";
            strData = '{strDesignation: "' + $("#txtDesignation").val() + '", strDescription : "' + $("#txtDescription").val() +'" }';
        }
        else {
            strFunction = "fnDesignationUpdate";
            strData = '{strId:"' + intId + '",strDesignation: "' + $("#txtDesignation").val() + '", strDescription : "' + $("#txtDescription").val() +'" }';
        }

        $.ajax({
            type: "POST",
            url: "frmDesignationInsert.aspx/" + strFunction,
            data: strData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: OnSuccessSave,
            failure: function (response) {
                DisplayMessage("Error on the server!", "N");
                //$("body").waitMe("hide");
            }
        });

    });

    function OnSuccessSave(response) {

        if (response.d == "1") {
            DisplayMessage("Record saved successfully!", "Y");

            if (intId == "" || intId == undefined) {
                ClearControls();
                //$("body").waitMe("hide");
                //window.location.replace("frmDesignationView.aspx");
            }

            else
            {
                //$("body").waitMe("hide");
                window.location.replace("frmDesignationView.aspx");
            }

            return false;
        }
        else {
            DisplayMessage("Duplicate record! Please try again..", "N");
            //$("body").waitMe("hide");
            return false;
        }        
    }

    function ClearControls() {
        $("#txtDesignation").val('');
        $("#txtDescription").val('');
    }

    function ValidateControls() {

        if ($("#txtDesignation").val() == "") {
            DisplayMessage("Please enter designation!","N");
            return false;
        }
    }

    function fnGetDesignationDetails() {
        $.ajax({
            type: "POST",
            url: "frmDesignationInsert.aspx/fnGetDesignationDetails",
            data: '{intId:"' + intId + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: OnSuccessfnGetDesignationDetails,
            failure: function (response) {
                DisplayMessage("Error on the server!", "N");
                //$("body").waitMe("hide");
            }
        });
    }

    function OnSuccessfnGetDesignationDetails(response) {
        strXmlObjects = response.d;
        var xmlDoc = $.parseXML(strXmlObjects);
        var $xml = $(xmlDoc);

        $xml.find('data').each(function () {

            $(this).find('row').each(function () {
                $("#txtDesignation").val($(this).find("desi_name").text());
                $("#txtDescription").val($(this).find("desi_desc").text());
            });
        });

        $("#btnSave").html('Update');
        //$("body").waitMe("hide");
    }


});
