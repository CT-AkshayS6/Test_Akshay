$(document).ready(function () {

    strParent = "Main";
    strNode = "ManageUserDetails";

    ShowSelectedMenu();

    //get id from querystring to update data
    var intId = getUrlVars()["id"];

    //declare and initialize variable
    var strXmlObjects = "";
    var p_HomeId = "";

    fnUserDetailsView();

    //if (intId != "" || intId != undefined) {
    //    fnGetHomeDetails();
    //}

    //Save button code
    $("#btnSave").click(function () {

        if (ValidateControls() == false) {
            return false;
        }

        var strFunction = "";
        var strData = "";

        if (intId == "" || intId == undefined) {

            strFunction = "fnUserDetailsInsert";
            strData = '{ strName          :      "' + $("#txtName").val() +
                '", strDesignation        :      "' + $("#txtDesignation").val() +
                '", strEducation          :      "' + $("#txtEducation").val() +
                '", strArea               :      "' + $("#txtArea").val() +
                '", strUrl                :      "' + $("#txtUrl").val() +
                '", strUserType           :      "' + $("#selUserType").val() +  
                '", strEmail              :      "' + $("#txtEmail").val() +
                '", strMobileNo           :      "' + $("#txtMobile").val() +
                '", strOfficeNo           :      "' + $("#txtOfficeNo").val() +
                '", strFaxNo              :      "' + $("#txtFaxNo").val() +
                '" }';
        }
        else {
            strFunction = "fnUserDetailsUpdate";
            strData = '{strName          :      "' + $("#txtName").val() +
                '", strDesignation       :      "' + $("#txtDesignation").val() +
                '", strEducation         :      "' + $("#txtEducation").val() +
                '", strArea              :      "' + $("#txtArea").val() +
                '", strUrl               :      "' + $("#txtUrl").val() +
                '", strUserType          :      "' + $("#selUserType").val() +               
                '" }';
        }

        $.ajax({
            type: "POST",
            url: "frmUserDetailsInsert.aspx/" + strFunction,
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

        if (Return == "1") {

            if (intId == "" || intId == undefined) {
                alert("Record saved successfully!");
                ClearControls();
                fnUserDetailsView();
                //window.location.replace("frmHomeInsert.aspx?id=" + p_HomeId);
            }
            else {
                //window.location.replace("frmHomeView.aspx");
            }

            return false;
        }
        else {
            alert("Duplicate record! Please try again..");
            return false;
        }
    }

    //Clear control once data fill successfully.
    function ClearControls() {

        $("#txtName").val('');
        $("#txtDesignation").val('');
        $("#txtEducation").val('');
        $("#txtArea").val('');
        $("#txtUrl").val('');
        $("#selUserType").val('-1');   
        $("#txtEmail").val('');
        $("#txtMobile").val('');
        $("#txtOfficeNo").val('');
        $("#txtFaxNo").val('');

    }

    //Validate controls
    function ValidateControls() {

        if ($("#txtName").val() == "") {
            alert("Please enter name!");
            //DisplayMessage("Please enter company name!", "N");
            return false;
        }

        if ($("#txtDesignation").val() == "") {
            alert("Please enter designation!");
            //DisplayMessage("Please select designation!", "N");
            return false;
        }

        if ($("#txtEducation").val() == "") {
            alert("Please enter education!");
            return false;
        }

        if ($("#txtArea").val() == "") {
            alert("Please enter area!");
            return false;
        }

        //if ($("#txtUrl").val() == "") {
        //    alert("Please enter url!");
        //    return false;
        //}

        if ($("#selUserType").val() == "-1") {
            alert("Please selct user type!");
            return false;
        }

        if ($("#txtEmail").val() == "") {
            alert("Please enter email!");
            return false;
        }

        if (!isEmail($("#txtEmail").val())) {
            alert("Please enter proper email!");
            return false;
        }

        if ($("#txtMobile").val() == "") {
            alert("Please enter mobile no.!");
            return false;
        }

        if ($("#txtMobile").val().length != 10) {
            alert("Entered mobile number is not proper.!");
            return false;
        }
    }

    function isEmail(email) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    }

    function fnUserDetailsView() {
        $.ajax({
            type: "POST",
            url: "frmUserDetailsInsert.aspx/fnUserDetailsView",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: OnSuccessfnUserDetailsView,
            failure: function (response) {
                DisplayMessage("Error on the server!", "N");
                //$("body").waitMe("hide");
            }
        });
    }

    function OnSuccessfnUserDetailsView(response) {
        strMainXml = response.d;
        SearchData(strMainXml);
    }

    function SearchData(strXml) {

        var arr = [];
        $(strXml).find("row").each(function (idx, v) {

            arr[idx] = [];

            $(v).children().each(function (i, vi) {

                arr[idx].push($(vi).text());
            });
        });

        $('#tblData').DataTable({
            destroy: true,
            data: arr,
            scrollX: true,
            columns: [
                { "render": function (data, type, full, meta) { return '<a data-id="' + data + '" class="lnkUSerDetails" data-toggle="modal" data-target="#modal-NewUserDetails">Edit</a>'; } },
                { title: "Delete", "render": function (data, type, full, meta) { return '<input data-id="' + data + '" type="button" class="btnDelete btn btn-primary" value="Delete" />'; } },
                { title: "Name",width:"150px" },
                { title: "Designation",width: "150px" },
                { title: "Area",width: "150px" },
                { title: "Education",width: "250px"},
                { title: "Url", width: "150px" },
                { title: "Email", width: "150px" },
                { title: "Mobile", width: "150px" },
                { title: "Office No.", width: "150px" },
                { title: "Fax No.", width: "150px" }
                
            ]
        });
        //$("body").waitMe("hide");
    }

    $(document).on("click", ".lnkUSerDetails", function () {

        var strId = $(this).data("id");        
        var strData = "";        

        strData = '{strId: "' + strId + '" }';

        $.ajax({
            type: "POST",
            url: "frmUserDetailsInsert.aspx/fnGetUserDetails",
            data: strData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: OnSuccessfnGetUserDetails,
            failure: function (response) {
                DisplayMessage("Error on the server!", "N");
            }
        });

    });  

    //Success function  
    function OnSuccessfnGetUserDetails(response) {
       strXmlObjects = response.d;

        var xmlDoc = $.parseXML(strXmlObjects);
        var $xml = $(xmlDoc);

        $xml.find('data').each(function () {

            $(this).find('row').each(function () {

                $("#txtName").val($(this).find("usde_name").text());
                $("#txtDesignation").val($(this).find("usde_designation").text());
                $("#txtEducation").val($(this).find("usde_education").text());
                $("#txtArea").val($(this).find("usde_area").text());
                $("#txtUrl").val($(this).find("usde_url").text());
                $("#selUserType").val($(this).find("usde_type").text());
                $("#txtEmail").val($(this).find("usde_email").text());
                $("#txtMobile").val($(this).find("usde_mobile").text());
                $("#txtOfficeNo").val($(this).find("usde_office_no").text());
                $("#txtFaxNo").val($(this).find("usde_fax_no").text());
            });
        });

        $("#btnSave").html('update');
    } 

    $(document).on("click", ".btnDelete", function () {

        if (confirm('Are you sure, you want to delete this record?') == false) {
            return false;
        }

        var strId = $(this).data("id");

        var strFunction = "";
        var strData = "";

        strFunction = "fnUserDetailsDelete";

        strData = '{strId: "' + strId + '" }';

        $.ajax({
            type: "POST",
            url: "frmUserDetailsInsert.aspx/" + strFunction,
            data: strData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: OnSuccessfnUserDetailsDelete,
            failure: function (response) {
                DisplayMessage("Error on the server!", "N");
            }
        });

    });

    function OnSuccessfnUserDetailsDelete(response) {

        if (response.d == "1") {
            alert("Record deleted successfully!");
            fnUserDetailsView();
            return false;
        }
        else {
            alert("Server Error! Please try again..");
            return false;
        }
    }
         
});
