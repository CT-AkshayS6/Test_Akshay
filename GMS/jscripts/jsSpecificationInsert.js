$(document).ready(function () {

    strParent = "Main";
    strNode = "ManageSpecification"; 

    ShowSelectedMenu();

    var intId = getUrlVars()["id"];
    var strXmlObjects = "";
    var p_SpecId = "";
    
    fnGetUserSpecification();

    $("#btnSave").click(function () {

        if (ValidateControls() == false) {
            return false;
        }

        var strHTMLDesc = CKEDITOR.instances['txtDescription'].getData();
        strHTMLDesc = strHTMLDesc.replace(/\"/g, "'");

        var strFunction = "";
        var strData = "";
        
        if (intId == "" || intId == undefined) { 

            strFunction = "fnSpecificationInsert";
            strData = '{strSpecification: "' + $("#selSpecification").val() + '", strDescription : "' + strHTMLDesc + '" }';

        }
        else {
            strFunction = "fnSpecificationUpdate";            
            strData = '{strSpecification: "' + $("#selSpecification").val() +
                '", strDescription : "' + strHTMLDesc +
                '", strId : "' + intId +
                '" }';
        }

        $.ajax({
            type: "POST",
            url: "frmSpecificationInsert.aspx/" + strFunction,
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

        var Return = response.d.split(",")[0];
        p_SpecId = response.d.split(",")[1];

        if (Return == "1") {
            DisplayMessage("Record saved successfully!", "Y");

            if (intId == "" || intId == undefined) {
                ClearControls();
                window.location.replace("frmSpecificationInsert.aspx?id=" + p_SpecId);
                fnSpecificationView();

            }

            else {                  
                window.location.replace("frmSpecificationInsert.aspx?id=" + intId);
                fnSpecificationView();                
            }

            return false;
        }
        else {
            DisplayMessage("Duplicate record! Please try again..", "N");            
            return false;
        }
    }

    function ClearControls() {
        $("#selSpecification").val('-1');
        $("#txtDescription").val('');
    }

    function ValidateControls() {

        if ($("#selSpecification").val() == "-1") {
            DisplayMessage("Please select specification!", "N");
            return false;
        }
       
    }
    
    function fnGetUserSpecification() {
        $.ajax({
            type: "POST",
            url: "common.aspx/fnGetUserSpecification",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: OnSuccessfnGetUserSpecification,
            failure: function (response) {
                DisplayMessage("Error on the server!", "N");
            }
        });
    }

    function OnSuccessfnGetUserSpecification(response) {
        var strXml = response.d;
        BindList('selSpecification', strXml, 'spec_id', 'spec_desc', true);

        fnSpecificationView();

        //if (intId != "" && intId != undefined) {
        //    fnGetSpecificationDetails();
        //}
    }

    function fnSpecificationView() {
        $.ajax({
            type: "POST",
            url: "frmSpecificationInsert.aspx/fnSpecificationView",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: OnSuccessfnSpecificationView,
            failure: function (response) {
                DisplayMessage("Error on the server!", "N");
                //$("body").waitMe("hide");
            }
        });
    }

    function OnSuccessfnSpecificationView(response) {
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
                { "render": function (data, type, full, meta) { return '<a data-id="' + data + '" class="lnkSpecification" data-toggle="modal" data-target="#modal-NewUserSpecification">Edit</a>'; } },                               
                { title: "Delete", width: "60px", "render": function (data, type, full, meta) { return '<input data-id="' + data + '" type="button" class="btnDelete btn btn-primary" value="Delete" />'; } },
                { title: "Specification", width: "150px" },
                { title: "Description", width: "500px" }
            ]
        });        
    }

    $(document).on("click", ".lnkSpecification", function () {

        var strId = $(this).data("id");
        var strData = "";

        strData = '{strId: "' + strId + '" }';

        $.ajax({
            type: "POST",
            url: "frmSpecificationInsert.aspx/fnGetSpecificationDetails",
            data: strData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: OnSuccessfnGetSpecificationDetails,
            failure: function (response) {
                DisplayMessage("Error on the server!", "N");
            }
        });

    });  

    function OnSuccessfnGetSpecificationDetails(response) {
        strXmlObjects = response.d;

        var xmlDoc = $.parseXML(strXmlObjects);
        var $xml = $(xmlDoc);

        $xml.find('data').each(function () {

            $(this).find('row').each(function () {

                $("#selSpecification").val($(this).find("ussp_spec_id").text());
                //$("#txtDescription").val($(this).find("area_desc").text());
                CKEDITOR.instances['txtDescription'].setData($(this).find("ussp_desc").text());
            });
        });

        $("#btnSave").html('Update');
    }

    $(document).on("click", ".btnDelete", function () {

        if (confirm('Are you sure, you want to delete this record?') == false) {
            return false;
        }

        var strId = $(this).data("id");

        var strFunction = "";
        var strData = "";

        strFunction = "fnSpecificationDelete";

        strData = '{strId: "' + strId + '" }';

        $.ajax({
            type: "POST",
            url: "frmSpecificationInsert.aspx/" + strFunction,
            data: strData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: OnSuccessfnSpecificationDelete,
            failure: function (response) {
                DisplayMessage("Error on the server!", "N");
            }
        });

    });

    function OnSuccessfnSpecificationDelete(response) {

        if (response.d == "1") {
            DisplayMessage("Record deleted successfully!", "Y");
            fnSpecificationView();
            return false;
        }
        else {
            DisplayMessage("Server Error! Please try again..", "N");
            return false;
        }
    }

});