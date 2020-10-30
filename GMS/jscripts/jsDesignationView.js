$(document).ready(function () {

    //run_waitMe();

    //ShowSelectedMenu("Main", "ManageDesignation");
    strParent = "Main";
    strNode = "ManageDesignation";

    var strMainXml = "";
    fnDesignationView();

    $("#btnSearch").click(function () {

        var strSearchXml = "<data></data>";
        strSearchXml = $.parseXML(strSearchXml);

        $.each($(strMainXml).find('row'), function (index, nodeValue) {

            var _blnExists = true;
            var clonedNode = nodeValue.cloneNode(true);

            var Name = $(nodeValue).find('desi_name').text();            
            var deleted = $(nodeValue).find('desi_deleted').text();

            if (deleted == 'Y') {
                _blnExists = false;
            }

            if ($("#txtDesignation").val() != "") {

                if (Name.toLowerCase().indexOf($("#txtDesignation").val().toLowerCase())) {
                    _blnExists = false;
                }
            }            

            if (_blnExists == true) {
                $(strSearchXml).find("data").append($(clonedNode));
            }

        });

        SearchData(strSearchXml);
    });

    $("#btnViewAll").click(function () {
        $("#txtDesignation").val("");        
        SearchData(strMainXml);
    });

    function fnDesignationView() {
        $.ajax({
            type: "POST",
            url: "frmDesignationView.aspx/fnDesignationView",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: OnSuccessfnDesignationView,
            failure: function (response) {
                DisplayMessage("Error on the server!", "N");
                //$("body").waitMe("hide");
            }
        });
    }

    function OnSuccessfnDesignationView(response) {
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
                
                { title: "Designation" },
                { title: "Description" },
                { title: "Status" },
                { title: "deleted", visible: false },
                { "render": function (data, type, full, meta) { return '<a href="frmDesignationInsert.aspx?id=' + data + '">Edit</a>'; } },
                { title: "Delete", "render": function (data, type, full, meta) { return '<input data-id="' + data + '" type="button" class="btnDelete btn btn-primary" value="Delete" />'; } }
            ]
        });
        //$("body").waitMe("hide");
    }

    $(document).on("click", ".btnDelete", function () {

        if (confirm('Are you sure, you want to delete this record?') == false) {
            return false;
        }

        var strDesignationId = $(this).data("id");

        var strFunction = "";
        var strData = "";

        strFunction = "fnDesignationDelete";

        strData = '{intId: "' + strDesignationId + '" }';

        $.ajax({
            type: "POST",
            url: "frmDesignationView.aspx/" + strFunction,
            data: strData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: OnSuccessfnDesignationDelete,
            failure: function (response) {
                DisplayMessage("Error on the server!", "N");
            }
        });

    });

    function OnSuccessfnDesignationDelete(response) {

        if (response.d == "1") {
            DisplayMessage("Record deleted successfully!", "Y");
            fnDesignationView();
            return false;
        }
        else {
            DisplayMessage("Server Error! Please try again..", "N");
            return false;
        }
    }
});
