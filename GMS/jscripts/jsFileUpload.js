$(document).ready(function () {

    strParent = "Main";
    strNode = "ManageFileUpload";

    ShowSelectedMenu();

    var strMainXml = "";
    fnUploadFileView();


    function fnUploadFileView() {
        $.ajax({
            type: "POST",
            url: "frmFileUpload.aspx/fnUploadFileView",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: OnSuccessfnUploadFileView,
            failure: function (response) {
                DisplayMessage("Error on the server!", "N");
                //$("body").waitMe("hide");
            }
        });
    }

    function OnSuccessfnUploadFileView(response) {
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
                { title: "Url", width: "200px", "render": function (data, type, full, meta) { return '<a target="_blank" href="' + data + '">'+data+'</a>'; } },                
                { title: "Delete", "render": function (data, type, full, meta) { return '<input data-id="' + data + '" type="button" class="btnDelete btn btn-primary" value="Delete" />'; } }
            ]
        });
        //$("body").waitMe("hide");
    }

    $(document).on("click", ".btnDelete", function () {

        if (confirm('Are you sure, you want to delete this record?') == false) {
            return false;
        }

        var strId = $(this).data("id");

        var strFunction = "";
        var strData = "";

        strFunction = "fnUploadFileDelete";

        strData = '{strId: "' + strId + '" }';

        $.ajax({
            type: "POST",
            url: "frmFileUpload.aspx/" + strFunction,
            data: strData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: OnSuccessfnUploadFileDelete,
            failure: function (response) {
                DisplayMessage("Error on the server!", "N");
            }
        });

    });

    function OnSuccessfnUploadFileDelete(response) {

        if (response.d == "1") {
            DisplayMessage("Record deleted successfully!", "Y");
            fnUploadFileView();
            return false;
        }
        else {
            DisplayMessage("Server Error! Please try again..", "N");
            return false;
        }
    }
});
