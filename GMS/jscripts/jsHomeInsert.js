$(document).ready(function () {

    strParent = "Main";
    strNode = "ManageHome";

    //get id from querystring to update data
    var intId = getUrlVars()["id"];

    //declare and initialize variable
    var strXmlObjects = "";
    var p_HomeId = "";

    fnGetDesignation();

    //Save button code
    $("#btnSave").click(function () {

        if (ValidateControls() == false) {
            return false;
        }

        var strFunction = "";
        var strData = "";

        if (intId == "" || intId == undefined) {

        strFunction = "fnHomeInsert";
        strData = '{ strCompanyName          :      "' + $("#txtCompanyName").val() +
            '", strFirstName                 :      "' + $("#txtFirstName").val() +
            '", strMiddleName                :      "' + $("#txtMiddleName").val() +
            '", strLastName                  :      "' + $("#txtLastName").val() +
            '", strDesignation               :      "' + $("#selDesignation").val() +
            '", strEducation                 :      "' + $("#txtEducation").val() +
            '", strArea                      :      "' + $("#selArea").val() +
            '" }';
        }
        else {
            strFunction = "fnHomeUpdate";
            strData = '{strCompanyName           :      "' +  $("#txtCompanyName").val()              +
                '", strFirstName                 :      "' +  $("#txtFirstName").val()                +
                '", strMiddleName                :      "' +  $("#txtMiddleName").val()               +
                '", strLastName                  :      "' +  $("#txtLastName").val()                 +                
                '", strDesignation               :      "' +  $("#selDesignation").val()              +
                '", strEducation                 :      "' +  $("#txtEducation").val()                +
                '", strArea                      :      "' + $("#selArea").val() +
                '", strId                      :      "' + intId +
                '" }';
        }

        $.ajax({
            type: "POST",
            url: "frmHomeInsert.aspx/" + strFunction,
            data: strData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: OnSuccessSave,
            failure: function (response) {
                DisplayMessage("Error on the server!", "N");
            }
        });

    });

    //Save button Success function
    function OnSuccessSave(response) {

        var Return = response.d.split(",")[0];
        p_HomeId = response.d.split(",")[1];

        if (Return == "1") {

            if (intId == "" || intId == undefined) {
                DisplayMessage("Record saved successfully!", "Y");
                ClearControls();
                window.location.replace("frmHomeInsert.aspx?id=" + p_HomeId);
            }
            else
            {
                window.location.replace("frmHomeView.aspx");
            }
            
            return false;
        }
        else {
            DisplayMessage("Duplicate record! Please try again..", "N");
            return false;
        }
    }

    //Clear control once data fill successfully.
    function ClearControls() {

        $("#txtCompanyName").val('');
        $("#txtFirstName").val('');
        $("#txtMiddleName").val('');
        $("#txtLastName").val('');
        $("#selDesignation").val('-1');
        $("#txtEducation").val('');
        $("#selArea").val('-1');

    }

    //Validate controls
    function ValidateControls() {

        if ($("#txtCompanyName").val() == "") {
            DisplayMessage("Please enter company name!", "N");
            return false;
        }

        if ($("#selDesignation").val() == "-1") {
            DisplayMessage("Please select designation!", "N");
            return false;
        }

        if ($("#txtFirstName").val() == "") {
            DisplayMessage("Please enter first name!", "N");
            return false;
        }

        //if ($("#txtLastName").val() == "") {
        //    DisplayMessage("Please enter last name!", "N");
        //    return false;
        //}

        if ($("#txtEducation").val() == "") {
            DisplayMessage("Please enter education!", "N");
            return false;
        }

        if ($("#selArea").val() == "-1") {
            DisplayMessage("Please select area!", "N");
            return false;
        }

    }

    //function to fetch details of single record 
    function fnGetHomeDetails() {
        $.ajax({
            type: "POST",
            url: "frmHomeInsert.aspx/fnGetHomeDetails",
            data: '{intId:"' + intId + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: OnSuccessfnGetHomeDetails,
            failure: function (response) {
                DisplayMessage("Error on the server!", "N");
            }
        });
    }

    //Success function  
    function OnSuccessfnGetHomeDetails(response) {
        strXmlObjects = response.d;

        var xmlDoc = $.parseXML(strXmlObjects);
        var $xml = $(xmlDoc);

        $xml.find('data').each(function () {

            $(this).find('row').each(function () {

                $("#txtCompanyName").val($(this).find("home_company_name").text());
                $("#txtFirstName").val($(this).find("home_fname").text());
                $("#txtMiddleName").val($(this).find("home_mname").text());
                $("#txtLastName").val($(this).find("home_lname").text());
                $("#selDesignation").val($(this).find("home_designation").text());
                $("#txtEducation").val($(this).find("home_education").text());
                $("#selArea").val($(this).find("home_area").text());
            });
        });

        $("#btnSave").html('update');
    }

    function fnGetDesignation() {
        $.ajax({
            type: "POST",
            url: "common.aspx/fnGetDesignation",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: OnSuccessfnGetDesignation,
            failure: function (response) {
                DisplayMessage("Error on the server!", "N");
            }
        });
    }

    function OnSuccessfnGetDesignation(response) {
        var strXml = response.d;
        BindList('selDesignation', strXml, 'desi_id', 'desi_name', true);

        fnGetArea();
    }

    function fnGetArea() {
        $.ajax({
            type: "POST",
            url: "common.aspx/fnGetArea",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: OnSuccessfnGetArea,
            failure: function (response) {
                DisplayMessage("Error on the server!", "N");
            }
        });
    }

    function OnSuccessfnGetArea(response) {
        var strXml = response.d;
        BindList('selArea', strXml, 'area_id', 'area_name', true);

        if (intId != "" || intId != undefined)
        {
            fnGetHomeDetails();
        }              
    }

});
