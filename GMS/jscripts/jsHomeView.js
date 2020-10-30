$(document).ready(function () {

    strParent = "Main";
    strNode = "ManageHome";

    //declare and initialization of variable
    var strMainXml = "";

    //Load All Home details
    fnHomeView();

    $("#btnSearch").click(function () {

        var strSearchXml = "<data></data>";
        strSearchXml = $.parseXML(strSearchXml);

        $.each($(strMainXml).find('row'), function (index, nodeValue) {

            var _blnExists = true;
            var clonedNode = nodeValue.cloneNode(true);

            var CompanyName = $(nodeValue).find('home_company_name').text();          
           
            if (deleted == 'Y') {
                _blnExists = false;
            }

            if ($("#txtCompanyName").val() != "") {

                if (CompanyName.toLowerCase().indexOf($("#txtCompanyName").val().toLowerCase())) {
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

        $("#txtCompanyName").val("");
        $("#txtFirstName").val("");
        $("#txtLastName").val("");
        $("#selEnabled").val("-1");

        SearchData(strMainXml);

    });

    function fnHomeView() {
        $.ajax({
            type: "POST",
            url: "frmHomeView.aspx/fnHomeView",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: OnSuccessfnHomeView,
            failure: function (response) {
                DisplayMessage("Error on the server!", "N");
            }
        });
    }

    function OnSuccessfnHomeView(response) {

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
                { "render": function (data, type, full, meta) { return '<a href="frmHomeInsert.aspx?id=' + data + '">Edit</a>'; } },
                { title: "Delete", "render": function (data, type, full, meta) { return '<input data-id="' + data + '" type="button" class="btnDelete btn btn-primary" value="Delete" />'; } },
                { title: "Company Name" , width:"150px" },
                { title: "Designation", width: "150px" },
                { title: "Name", width: "150px" },
                { title: "Education", width: "200px" },
                { title: "Area", width: "100px" },               
                { title: "Home deleted", visible: false }                
            ]
        });
    }

    $(document).on("click", ".btnDelete", function () {

        if (confirm('Are you sure, you want to delete this record?') == false) {
            return false;
        }

        var strHomeId = $(this).data("id");

        var strFunction = "";
        var strData = "";

        strFunction = "fnHomeDelete";

        strData = '{strDeleteId: "' + strHomeId + '" }';

        $.ajax({
            type: "POST",
            url: "frmHomeView.aspx/" + strFunction,
            data: strData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: OnSuccessHomeDelete,
            failure: function (response) {
                DisplayMessage("Error on the server!", "N");
            }
        });

    });

    function OnSuccessHomeDelete(response) {

        if (response.d == "1") {
            DisplayMessage("Record deleted successfully!","Y");
            fnHomeView();
            return false;
        }
        else
        {
            DisplayMessage("Duplicate record! Please try again..", "N");
        }
    }

});
