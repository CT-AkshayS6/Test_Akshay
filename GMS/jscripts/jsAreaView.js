$(document).ready(function () {

    //run_waitMe();

    //ShowSelectedMenu("Main", "ManageArea");
    strParent = "Main";
    strNode = "ManageArea";

    var strMainXml = "";
    fnAreaView();

    $("#btnSearch").click(function () {

        var strSearchXml = "<data></data>";
        strSearchXml = $.parseXML(strSearchXml);

        $.each($(strMainXml).find('row'), function (index, nodeValue) {

            var _blnExists = true;
            var clonedNode = nodeValue.cloneNode(true);

            var Area = $(nodeValue).find('area_name').text();
            var deleted = $(nodeValue).find('area_deleted').text();

            if (deleted == 'Y') {
                _blnExists = false;
            }

            if ($("#txtArea").val() != "") {

                if (Area.toLowerCase().indexOf($("#txtArea").val().toLowerCase())) {
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
        $("#txtArea").val("");
        SearchData(strMainXml);
    });

    function fnAreaView() {
        $.ajax({
            type: "POST",
            url: "frmAreaView.aspx/fnAreaView",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: OnSuccessfnAreaView,
            failure: function (response) {
                DisplayMessage("Error on the server!", "N");
                //$("body").waitMe("hide");
            }
        });
    }

    function OnSuccessfnAreaView(response) {
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
                { title: "Area" },
                { title: "Description" },
                { title: "Status" },
                { title: "deleted", visible: false },
                { "render": function (data, type, full, meta) { return '<a href="frmAreaInsert.aspx?id=' + data + '">Edit</a>'; } },
                { title: "Delete", "render": function (data, type, full, meta) { return '<input data-id="' + data + '" type="button" class="btnDelete btn btn-primary" value="Delete" />'; } }
            ]
        });
        //$("body").waitMe("hide");
    }

    $(document).on("click", ".btnDelete", function () {

        if (confirm('Are you sure, you want to delete this record?') == false) {
            return false;
        }

        var strAreaId = $(this).data("id");

        var strFunction = "";
        var strData = "";

        strFunction = "fnAreaDelete";

        strData = '{intId: "' + strAreaId + '" }';

        $.ajax({
            type: "POST",
            url: "frmAreaView.aspx/" + strFunction,
            data: strData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: OnSuccessfnAreaDelete,
            failure: function (response) {
                DisplayMessage("Error on the server!", "N");
            }
        });

    });

    function OnSuccessfnAreaDelete(response) {

        if (response.d == "1") {
            DisplayMessage("Record deleted successfully!", "Y");
            fnAreaView();
            return false;
        }
        else {
            DisplayMessage("Server Error! Please try again..", "N");
            return false;
        }
    }
});
