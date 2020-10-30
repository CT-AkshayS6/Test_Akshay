$(document).ready(function () {

    var strMainXml = "";
    fnProfileView();

    $("#btnSearch").click(function () {

        var strSearchXml = "<data></data>";
        strSearchXml = $.parseXML(strSearchXml);

        $.each($(strMainXml).find('row'), function (index, nodeValue) {

            var _blnExists = true;
            var clonedNode = nodeValue.cloneNode(true);

            var Name = $(nodeValue).find('prof_name').text();
            var enabled = $(nodeValue).find('prof_enabled').text();
            var deleted = $(nodeValue).find('prof_deleted').text();

            if (deleted == 'Y') {
                _blnExists = false;
            }

            if ($("#txtName").val() != "") {

                if (Name.toLowerCase().indexOf($("#txtName").val().toLowerCase())) {
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

        $("#txtName").val("");       
        $("#selEnabled").val("-1");

        SearchData(strMainXml);

    });

    function fnProfileView() {
        $.ajax({
            type: "POST",
            url: "frmProfileUploadView.aspx/fnProfileView",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: OnSuccessfnProfileView,
            failure: function (response) {

                alert("Error on the server!");
            }
        });
    }

    function OnSuccessfnProfileView(response) {

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
                { title: "Name" },
                { title: "About us" },
                { title: "Email" },
                { title: "Mobile" },                
                { title: "profile Enabled" },
                { title: "profile deleted", visible: false },
                { "render": function (data, type, full, meta) { return '<a href="frmProfileUploadInsert.aspx?id=' + data + '">Edit</a>'; } },
                { "render": function (data, type, full, meta) { return '<a href="frmProfileUploadInsert.aspx?id=' + data + '">delete</a>'; } }
            ]
        });
    }

});
