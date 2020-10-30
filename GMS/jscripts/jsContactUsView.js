$(document).ready(function () {

    strParent = "Main";
    strNode = "ManageContactUs";

    //declare and initialization of variable
    var strMainXml = "";

    //Load All Home details
    fnContactUsView();

    $("#btnSearch").click(function () {

        var strSearchXml = "<data></data>";
        strSearchXml = $.parseXML(strSearchXml);

        $.each($(strMainXml).find('row'), function (index, nodeValue) {

            var _blnExists = true;
            var clonedNode = nodeValue.cloneNode(true);

            var Mobile = $(nodeValue).find('cous_mobile').text();            
            var enabled = $(nodeValue).find('cous_enabled').text();
            var deleted = $(nodeValue).find('cous_deleted').text();

            if (deleted == 'Y') {
                _blnExists = false;
            }

            if ($("#txtMobile").val() != "") {

                if (Mobile.toLowerCase().indexOf($("#txtMobile").val().toLowerCase())) {
                    _blnExists = false;
                }
            }            

            if ($("#selEnabled").val() != "-1") {
                if ($("#selEnabled").val().toLowerCase() != enabled.toLowerCase()) {
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

        $("#txtMobile").val("");
        $("#selEnabled").val("-1");

        SearchData(strMainXml);

    });

    function fnContactUsView() {
        $.ajax({
            type: "POST",
            url: "frmContactUsView.aspx/fnContactUsView",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: OnSuccessfnContactUsView,
            failure: function (response) {
                DisplayMessage("Error on the server!","N");
            }
        });
    }

    function OnSuccessfnContactUsView(response) {

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
                { "render": function (data, type, full, meta) { return '<a href="frmContactUsInsert.aspx?id=' + data + '">Edit</a>'; } },
                { title: "Delete", "render": function (data, type, full, meta) { return '<input data-id="' + data + '" type="button" class="btnDelete btn btn-primary" value="Delete" />'; } },
                { title: "User", width:"100px" },
                { title: "Company Address", width: "200px" },
                { title: "individual Address", width: "200px" },                
                { title: "Email", width: "100px" },
                { title: "Mobile", width: "100px" },
                { title: "Office No.", width: "100px" },
                { title: "Fax No.", width: "100px" },
                { title: "Status" },
                { title: "Contact Us deleted", visible: false }                
            ]
        });
    }

    $(document).on("click", ".btnDelete", function () {

        if (confirm('Are you sure, you want to delete this record?') == false) {
            return false;
        }

        var strContactUsId = $(this).data("id");

        var strFunction = "";
        var strData = "";

        strFunction = "fnContactUsDelete";

        strData = '{strDeleteId: "' + strContactUsId + '" }';

        $.ajax({
            type: "POST",
            url: "frmContactUsView.aspx/" + strFunction,
            data: strData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: OnSuccessContactUsDelete,
            failure: function (response) {
                DisplayMessage("Error on the server!","N");                
            }
        });

    });

    function OnSuccessContactUsDelete(response) {

        if (response.d == "1") {
            DisplayMessage("Record deleted successfully!","Y");
            fnContactUsView();
            return false;
        }
        else {
            DisplayMessage("Duplicate record! Please try again..","N");
        }
    }

});
