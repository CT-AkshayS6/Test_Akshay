$(document).ready(function () {

    //ShowSelectedMenu("Main", "ManageArea");

    var intId = getUrlVars()["id"];
    var strXmlObjects = "";

    strParent = "Main";
    strNode = "ManageArea";

    if (intId != "" && intId != undefined) {
        fnGetAreaDetails();
    }

    $("#btnSave").click(function () {

        if (ValidateControls() == false) {
            return false;
        }

        //run_waitMe();

        var strFunction = "";
        var strData = "";

        if (intId == "" || intId == undefined) {

            strFunction = "fnAreaInsert";
            strData = '{strArea: "' + $("#txtArea").val() + '", strDescription : "' + $("#txtDescription").val() + '" }';
        }
        else {
            strFunction = "fnAreaUpdate";
            strData = '{strId:"' + intId + '",strArea: "' + $("#txtArea").val() + '", strDescription : "' + $("#txtDescription").val() + '" }';
        }

        $.ajax({
            type: "POST",
            url: "frmAreaInsert.aspx/" + strFunction,
            data: strData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: OnSuccessSave,
            failure: function (response) {
                DisplayMessage("Error on the server!", "N");                
                $("body").waitMe("hide");
            }
        });
    });

    function OnSuccessSave(response) {

        if (response.d == "1") {
            DisplayMessage("Record saved successfully!", "Y");

            if (intId == "" || intId == undefined) {
                ClearControls();
                //$("body").waitMe("hide");
                //window.location.replace("frmAreaView.aspx");
            }

            else {
                //$("body").waitMe("hide");
                window.location.replace("frmAreaView.aspx");
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
        $("#txtArea").val('');
        $("#txtDescription").val('');
    }

    function ValidateControls() {

        if ($("#txtArea").val() == "") {
            DisplayMessage("Please enter area!","N");
            return false;
        }

    }

    function fnGetAreaDetails() {
        $.ajax({
            type: "POST",
            url: "frmAreaInsert.aspx/fnGetAreaDetails",
            data: '{intId:"' + intId + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: OnSuccessfnGetAreaDetails,
            failure: function (response) {
                DisplayMessage("Error on the server!", "N");
                //$("body").waitMe("hide");
            }
        });
    }

    function OnSuccessfnGetAreaDetails(response) {
        strXmlObjects = response.d;

        var xmlDoc = $.parseXML(strXmlObjects);
        var $xml = $(xmlDoc);

        $xml.find('data').each(function () {

            $(this).find('row').each(function () {

                $("#txtArea").val($(this).find("area_name").text());
                $("#txtDescription").val($(this).find("area_desc").text());
            });
        });

        $("#btnSave").html('Update');
        //$("body").waitMe("hide");
    }
});
