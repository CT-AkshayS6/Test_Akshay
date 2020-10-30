$(document).ready(function () {

    //run_waitMe();

    //ShowSelectedMenu("Main", "ManageDesignation");
    //strParent = "Main";
    //strNode = "ManageDesignation";

    var strMainXml = "";
    fnEnquiryView();

    function fnEnquiryView() {
        $.ajax({
            type: "POST",
            url: "frmEnquiryView.aspx/fnEnquiryView",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: OnSuccessfnEnquiryView,
            failure: function (response) {
                DisplayMessage("Error on the server!", "N");
                //$("body").waitMe("hide");
            }
        });
    }

    function OnSuccessfnEnquiryView(response) {
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

                { title: "Name",width:"200px" },
                { title: "Email", width: "150px" },
                { title: "Mobile No.", width: "100px" },
                { title: "Alternate Mobile No.", width: "100px" },
                { title: "Enquiry Date", width: "100px" },
                { title: "Gender", width: "100px" },
                { title: "Address", width: "200px" },
                { "render": function (data, type, full, meta) { return '<a href="frmEnquiryAdd.aspx?id=' + data + '">Edit</a>'; } },
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

        strFunction = "fnEnquiryDelete";

        strData = '{intId: "' + strId + '" }';

        $.ajax({
            type: "POST",
            url: "frmEnquiryView.aspx/" + strFunction,
            data: strData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: OnSuccessfnEnquiryDelete,
            failure: function (response) {
                DisplayMessage("Error on the server!", "N");
            }
        });

    });

    function OnSuccessfnEnquiryDelete(response) {

        if (response.d == "1") {
            DisplayMessage("Enquiry deleted successfully!", "Y");
            fnEnquiryView();
            return false;
        }
        else {
            DisplayMessage("Server Error! Please try again..", "N");
            return false;
        }
    }
});
