$(document).ready(function () {

    strParent = "Main";
    strNode = "ManageContactUs";

    //get id from querystring to update data
    var intId = getUrlVars()["id"];

    
    fnHomeUserSelect();

    //declare and initialize variable
    var strXmlObjects = "";
    var CompanyLat = '';
    var CompanyLng = '';
    var PersonalLat = '';
    var PersonalLng = '';

    var mapPlacepicker = $("#txtCompanyAddress").placepicker({
        placeChanged: function (place) {

            CompanyLat = this.getLocation().latitude;
            CompanyLng = this.getLocation().longitude;
        }
    });

    mapPlacepicker = $("#txtIndividualAddress").placepicker({
        placeChanged: function (place) {

            PersonalLat = this.getLocation().latitude;
            PersonalLng = this.getLocation().longitude;
        }
    });

    // Basic usage
    $(".placepicker").placepicker();


    // Advanced usage
    $("#txtCompanyAddress").each(function () {
        var target = this;
        var $collapse = $(this).parents('.form-group').next('.collapse');
        var $map = $collapse.find('.another-map-class');

        var placepicker = $(this).placepicker({
            map: $map.get(0),
            placeChanged: function (place) {
                console.log("place changed: ", place.formatted_address, this.getLocation());
                alert(this.getLocation());

                CompanyLat = this.getLocation().latitude;
                CompanyLng = this.getLocation().longitude;
            }
        }).data('placepicker');
    });


    $("#txtIndividualAddress").each(function () {
        var target = this;
        var $collapse = $(this).parents('.form-group').next('.collapse');
        var $map = $collapse.find('.another-map-class');

        var placepicker = $(this).placepicker({
            map: $map.get(0),
            placeChanged: function (place) {
                console.log("place changed: ", place.formatted_address, this.getLocation());
                alert(this.getLocation());

                PersonalLat = this.getLocation().latitude;
                PersonalLng = this.getLocation().longitude;
            }
        }).data('placepicker');
    });




    if (intId != "" && intId != undefined) {
        fnGetContactUsDetails();
    }

    //Save button code
    $("#btnSave").click(function () {

        if (ValidateControls() == false) {
            return false;
        }

        var strFunction = "";
        var strData = "";

        if (intId == "" || intId == undefined) {

            strFunction = "fnContactUsInsert";
            strData = '{ strUserName     :        "' +  $("#SelUser").val()                   +
                '", strCompanyAddress    :        "' +  $("#txtCompanyAddress").val()         +
                '", strIndividualAddress :        "' +  $("#txtIndividualAddress").val()      +                
                '", strCompanyLat        :        "' +  CompanyLat                            +
                '", strCompanyLng        :        "' +  CompanyLng                            +
                '", strPersonalLat       :        "' +  PersonalLat                           +
                '", strPersonalLng       :        "' +  PersonalLng                           +
                '", strEmail             :        "' +  $("#txtEmail").val()                  +
                '", strMobileNo          :        "' +  $("#txtMobile").val()                 +
                '", strOfficeNo          :        "' +  $("#txtOfficeNo").val()               +
                '", strFaxNo             :        "' +  $("#txtFaxNo").val()                  +
                '" }';
        }
        else {
            strFunction = "fnContactUsUpdate";
            strData = '{strId            :        "' +  intId                                 +
                '", strUserName          :        "' +  $("#SelUser").val()                   + 
                '", strCompanyAddress    :        "' +  $("#txtCompanyAddress").val()         +
                '", strIndividualAddress :        "' +  $("#txtIndividualAddress").val()      +                
                '", strCompanyLat        :        "' +  CompanyLat                            +
                '", strCompanyLng        :        "' +  CompanyLng                            +
                '", strPersonalLat       :        "' +  PersonalLat                           +
                '", strPersonalLng       :        "' +  PersonalLng                           +
                '", strEmail             :        "' +  $("#txtEmail").val()                  +
                '", strMobileNo          :        "' +  $("#txtMobile").val()                 +
                '", strOfficeNo          :        "' +  $("#txtOfficeNo").val()               +
                '", strFaxNo             :        "' +  $("#txtFaxNo").val()                  +
                '" }';
        }

        $.ajax({
            type: "POST",
            url: "frmContactUsInsert.aspx/" + strFunction,
            data: strData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: OnSuccessSave,
            failure: function (response) {
                DisplayMessage("Error on the server!","N");               
            }
        });

    });

    //Save button Success function
    function OnSuccessSave(response) {

        if (response.d == "1") {
            DisplayMessage("Record saved successfully!","Y");

            if (intId == "" || intId == undefined) {
                ClearControls();
                window.location.replace("frmContactUsView.aspx");
            }

            else {
                window.location.replace("frmContactUsView.aspx");
            }

            return false;
        }
        else {
            DisplayMessage("Duplicate record! Please try again..","N");
            return false;
        }
    }

    //Clear control once data fill successfully.
    function ClearControls() {

        $("#SelUser").val('-1');
        $("#txtCompanyAddress").val('');
        $("#txtIndividualAddress").val('');                
        $("#txtEmail").val('');
        $("#txtMobile").val('');
        $("#txtOfficeNo").val('');
        $("#txtFaxNo").val('');           
    }

    //Validate controls
    function ValidateControls() {

        if ($("#SelUser").val() == "-1") {
            DisplayMessage("Please select user!","N");
            return false;
        }

        if ($("#txtCompanyAddress").val() == "") {
            DisplayMessage("Please enter company address!","N");
            return false;
        }

        if ($("#txtIndividualAddress").val() == "") {
            DisplayMessage("Please enter personal address!","N");
            return false;
        }

        if ($("#txtEmail").val() == "") {
            DisplayMessage("Please enter email!","N");
            return false;
        }

        if (!isEmail($("#txtEmail").val())) {
            DisplayMessage("Please enter proper email!","N");
            return false;
        }

        if ($("#txtMobile").val() == "") {
            DisplayMessage("Please enter mobile no.!","N");
            return false;
        }

        if ($("#txtMobile").val().length != 10) {
            DisplayMessage("Entered mobile number is not proper.!","N");
            return false;
        }
    }

    function isEmail(email) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    }

    //function to fetch details of single record 
    function fnGetContactUsDetails() {
        $.ajax({
            type: "POST",
            url: "frmContactUsInsert.aspx/fnGetContactUsDetails",
            data: '{intId:"' + intId + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: OnSuccessfnGetContactUsDetails,
            failure: function (response) {
                DisplayMessage("Error on the server!","N");
            }
        });
    }

    //Success function  
    function OnSuccessfnGetContactUsDetails(response) {
        strXmlObjects = response.d;

        var xmlDoc = $.parseXML(strXmlObjects);
        var $xml = $(xmlDoc);

        $xml.find('data').each(function () {

            $(this).find('row').each(function () {

                $("#SelUser").val($(this).find("cous_home_id").text());
                $("#txtCompanyAddress").val($(this).find("cous_company_address").text());
                $("#txtIndividualAddress").val($(this).find("cous_individual_address").text());                
                $("#txtEmail").val($(this).find("cous_email").text());
                $("#txtMobile").val($(this).find("cous_mobile").text());
                $("#txtOfficeNo").val($(this).find("cous_officeno").text());
                $("#txtFaxNo").val($(this).find("cous_faxno").text());
            });
        });

        $("#btnSave").html('update');
    }

    function fnHomeUserSelect() {
        $.ajax({
            type: "POST",
            url: "common.aspx/fnHomeUserSelect",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: OnSuccessfnHomeUserSelect,
            failure: function (response) {
                DisplayMessage("Error on the server!","N");
            }
        });
    }

    function OnSuccessfnHomeUserSelect(response) {
        var strHomeUserXml = response.d;
        BindList('SelUser', strHomeUserXml, 'id', 'Name', true);
    }

});
