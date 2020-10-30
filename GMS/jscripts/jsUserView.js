$(document).ready(function () {

    strParent = "Main";
    strNode = "ManageUser";

    ShowSelectedMenu();

    var strMainXml = "";
    fnUserView();

    $("#btnSearch").click(function () {

        var strSearchXml = "<data></data>";
        strSearchXml = $.parseXML(strSearchXml);

        $.each($(strMainXml).find('row'), function (index, nodeValue) {

            var _blnExists = true;
            var clonedNode = nodeValue.cloneNode(true);

            var FirstName = $(nodeValue).find('user_fname').text();            
            var deleted = $(nodeValue).find('user_deleted').text();

            if (deleted == 'Y') {
                _blnExists = false;
            }

            if ($("#txtFirstName").val() != "") {

                if (FirstName.toLowerCase().indexOf($("#txtFirstName").val().toLowerCase())) {
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

        $("#txtFirstName").val("");
        $("#txtUserName").val("");
        $("#selEnabled").val("-1");

        SearchData(strMainXml);

    });

    function fnUserView() {
        $.ajax({
            type: "POST",
            url: "frmUserView.aspx/fnUserView",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: OnSuccessfnUserView,
            failure: function (response) {

                DisplayMessage("Error on the server!","N");
            }
        });
    }

    function OnSuccessfnUserView(response) {

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
            scrollX:true,
            columns: [                
                { width: "70px", "render": function (data, type, full, meta) { return '<a href="frmUserInsert.aspx?id=' + data + '">Edit</a>'; } },
                { width: "70px", "render": function (data, type, full, meta) { return '<input data-id="' + data + '" type="button" class="btnDelete btn btn-primary" value="Delete" />'; } },
                { title: "First Name", width: "100px" },                
                { title: "Last Name", width: "100px" },
                { title: "Email", width: "150px" },
                { title: "Mobile", width: "100px" },                
                { title: "User Level", width: "100px" },
                { title: "Status", width: "100px" },
                { title: "User deleted", visible: false, width: "100px" }                                
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

        strFunction = "fnUserDelete";

        strData = '{strDeleteId: "' + strId + '" }';

        $.ajax({
            type: "POST",
            url: "frmUserView.aspx/" + strFunction,
            data: strData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: OnSuccessfnUserDelete,
            failure: function (response) {

                DisplayMessage("Error on the server!","N");                
            }
        });

    });

    function OnSuccessfnUserDelete(response) {

        if (response.d == "1") {
            DisplayMessage("Record deleted successfully!","Y");
            fnUserView();
            return false;
        }
        else {
            DisplayMessage("Duplicate record! Please try again..","N");

        }
    }
   
});
