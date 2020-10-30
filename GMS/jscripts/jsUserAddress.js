$(document).ready(function () {

    strParent = "Main";
    strNode = "ManageAddress";

    ShowSelectedMenu();

    //get id from querystring to update data
    var intId = getUrlVars()["id"];    

    //declare and initialize variable
    var strXmlObjects = "";
    var strUserAddr_Id = "";

    fnUserAddressView();

    if (intId != "" && intId != undefined) {
        fnGetUserAddressDetails();
    }

    //Save button code
    $("#btnSave").click(function () {

        if (ValidateControls() == false) {
            return false;
        }

        var strFunction = "";
        var strData = "";

        if (intId == "" || intId == undefined) {

            strFunction = "fnUserAddressInsert";
            strData = '{ strAddress :   "' + $("#txtAddress").val() +
                '", strLat    :   "' + $("#txtLatitude").val() +
                '", strLng    :   "' + $("#txtLongitude").val() +
                '" }';
        }
        else
        {
            strFunction = "fnUserAddressUpdate";
            strData = '{ strAddress :   "' + $("#txtAddress").val() +
                '", strLat    :   "' + $("#txtLatitude").val() +
                '", strLng    :   "' + $("#txtLongitude").val() +
                '", strId     :   "' + intId +
                '" }';
        }
        
        $.ajax({
            type: "POST",
            url: "frmUserAddress.aspx/" + strFunction,
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
        strUserAddr_Id = response.d.split(",")[1];

        if (Return == "1") {
            DisplayMessage("Record saved successfully!", "Y");

            if (intId == "" || intId == undefined) {
                ClearControls();
                fnUserAddressView();
                window.location.replace("frmUserAddress.aspx?id=" + strUserAddr_Id);
            }

            else {
                ClearControls();
                fnUserAddressView();
                window.location.replace("frmUserAddress.aspx?id=" + intId);
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

        $("#txtAddress").val('');
        $("#txtLatitude").val('');
        $("#txtLongitude").val('');       
    }

    //Validate controls
    function ValidateControls() {
       
        if ($("#txtAddress").val() == "") {
            DisplayMessage("Please enter address!", "N");
            return false;
        }        
    }

    function fnUserAddressView() {
        $.ajax({
            type: "POST",
            url: "frmUserAddress.aspx/fnUserAddressView",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: OnSuccessfnUserAddressView,
            failure: function (response) {
                DisplayMessage("Error on the server!", "N");
                //$("body").waitMe("hide");
            }
        });
    }

    function OnSuccessfnUserAddressView(response) {
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
                { "render": function (data, type, full, meta) { return '<a href="frmUserAddress.aspx?id=' + data + '">Edit</a>'; } },
                { title: "Delete", "render": function (data, type, full, meta) { return '<input data-id="' + data + '" type="button" class="btnDelete btn btn-primary" value="Delete" />'; } },
                { title: "Address", width: "250px" },
            ]
        });        
    }

    $(document).on("click", ".btnDelete", function () {

        if (confirm('Are you sure, you want to delete this record?') == false) {
            return false;
        }

        var strId = $(this).data("id");

        var strFunction = "";
        var strData = "";

        strFunction = "fnUserAddressDelete";

        strData = '{strId: "' + strId + '" }';

        $.ajax({
            type: "POST",
            url: "frmUserAddress.aspx/" + strFunction,
            data: strData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: OnSuccessfnUserAddressDelete,
            failure: function (response) {
                DisplayMessage("Error on the server!", "N");
            }
        });

    });

    function OnSuccessfnUserAddressDelete(response) {

        if (response.d == "1") {
            DisplayMessage("Record deleted successfully!", "Y");
            fnUserAddressView();
            return false;
        }
        else {
            DisplayMessage("Server Error! Please try again..", "N");
            return false;
        }
    }

    function fnGetUserAddressDetails() {
        $.ajax({
            type: "POST",
            url: "frmUserAddress.aspx/fnGetUserAddressDetails",
            data: '{strId:"' + intId + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: OnSuccessfnGetUserAddressDetails,
            failure: function (response) {
                DisplayMessage("Error on the server!", "N");
            }
        });
    }

    function OnSuccessfnGetUserAddressDetails(response) {
        strXmlObjects = response.d;

        var xmlDoc = $.parseXML(strXmlObjects);
        var $xml = $(xmlDoc);

        $xml.find('data').each(function () {

            $(this).find('row').each(function () {

                $("#txtAddress").val($(this).find("usad_addr").text());
                $("#txtLatitude").val($(this).find("usad_lat").text());
                $("#txtLongitude").val($(this).find("usad_lng").text());
                

            });
        });

        $("#btnSave").html('update');
    }

});
