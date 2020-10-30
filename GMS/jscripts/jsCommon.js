//AssignMenuPermissions();

var strParent = "";
var strNode = "";

//ShowSelectedMenu();

function DisplayMessage(strMsg, IsSuccess) {
    $("#divMessage").slideDown().html(strMsg);

    $("#divMessage").removeClass("clsSuccess");
    $("#divMessage").removeClass("clsError");

    if (IsSuccess == "Y") {
        $("#divMessage").addClass("clsSuccess");
    }
    else {
        $("#divMessage").addClass("clsError");
    }

    $("#divMessage").show();
    setTimeout('$("#divMessage").slideUp()', 1000);

}

function ShowSelectedMenu()
{

    $(".treeview").removeClass("menu-open");
    $(".treeview-menu").css("display", "none");

    $("#li" + strParent).addClass("menu-open");
    $("#li" + strNode).addClass("menu-open");

    $("#ul" + strParent).css("display", "block");
    $("#ul" + strNode).css("display", "block");
}

function BindList(selCtrl, xmlList, valField, textField, blnKeepSelect) {
    var select = $('#' + selCtrl);

    select.empty();

    $(xmlList).find('row').each(function () {
        //alert("id " + $(this).find("br_id").text());

        var _blnInclude = true;

        if (blnKeepSelect == false) {
            if ($(this).find(valField).text() == "-1") {
                _blnInclude = false;
            }
        }

        if (_blnInclude == true)
        {
            var op = $("<option/>"); // new item
            $(op).attr('value', $(this).find(valField).text());
            $(op).text($(this).find(textField).text());
            $(select).append(op);
        }
        
    });
}

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;

    //var me = getUrlVars()["me"];
    //var name2 = getUrlVars()["name2"];
}

function GiveDataSourceToTagInput(strCommaSepString, ctrlId) {
 
    var _str = strCommaSepString.split(",");
 
    for (var i = 0; i < _str.length; i++) {
     
        $('#' +ctrlId).tagsinput('add', _str[i]);
    }
    
}

function xml2json(xml) {
    try {
        var obj = {};

        //alert('xml.children.length' + xml.children.length);
        if (xml.children.length > 0) {
            for (var i = 0; i < xml.children.length; i++) {
                var item = xml.children.item(i);
                var nodeName = item.nodeName;

                if (typeof (obj[nodeName]) == "undefined") {
                    obj[nodeName] = xml2json(item);
                } else {
                    if (typeof (obj[nodeName].push) == "undefined") {
                        var old = obj[nodeName];

                        obj[nodeName] = [];
                        obj[nodeName].push(old);
                    }
                    obj[nodeName].push(xml2json(item));
                }
            }
        } else {
            obj = xml.textContent;
        }
        return obj;
    } catch (e) {
        console.log(e.message);
    }
}

var thisArray = new Array();
function getXMLToArray(xmlDoc) {

    //Check XML doc
    if ($(xmlDoc).children().length > 0) {
        //Foreach Node found
        $(xmlDoc).children().each(function () {
            
            if ($(xmlDoc).find(this.nodeName.toLowerCase()).children().length > 0) {
                //If it has children recursively get the inner array

                var NextNode = $(xmlDoc).find(this.nodeName.toLowerCase());
                thisArray[this.nodeName.toLowerCase()] = getXMLToArray(NextNode);
            } else {
                //If not then store the next value to the current array
                thisArray[this.nodeName.toLowerCase()] = $(xmlDoc).find(this.nodeName.toLowerCase()).text();

            }
            
        });
    }

    return thisArray;
}


// American Numbering System - for amount in words
var th = ['', 'thousand', 'million', 'billion', 'trillion'];

var dg = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

var tn = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];

var tw = ['twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

function AmounttoWords(s) {
    s = s.toString();
    s = s.replace(/[\, ]/g, '');
    if (s != parseFloat(s)) return 'not a number';
    var x = s.indexOf('.');
    if (x == -1) x = s.length;
    if (x > 15) return 'too big';
    var n = s.split('');
    var str = '';
    var sk = 0;
    for (var i = 0; i < x; i++) {
        if ((x - i) % 3 == 2) {
            if (n[i] == '1') {
                str += tn[Number(n[i + 1])] + ' ';
                i++;
                sk = 1;
            } else if (n[i] != 0) {
                str += tw[n[i] - 2] + ' ';
                sk = 1;
            }
        } else if (n[i] != 0) {
            str += dg[n[i]] + ' ';
            if ((x - i) % 3 == 0) str += 'hundred ';
            sk = 1;
        }
        if ((x - i) % 3 == 1) {
            if (sk) str += th[(x - i - 1) / 3] + ' ';
            sk = 0;
        }
    }
    if (x != s.length) {
        var y = s.length;
        str += 'point ';
        for (var i = x + 1; i < y; i++) str += dg[n[i]] + ' ';
    }
    return str.replace(/\s+/g, ' ');

}


function GenerateReceipt(strLogo, strCoAddress, strCoCin, strGSTin, strBranch, StrInvNo, strReceiptNo, strReceiptDate, StrStudName, strStudAdd, StrGenerateCourseHtml,
    strCgstName, strCgstRate, strSgstName, strSgstRate, strPrReceivedAmt, strCgstAmt, strSgstAmt, strSAC, strPayMode, strChqNo, strChqDate, strChqBank, strTaxableAmt) {

    var strReceiptHtml = '';

    //$(p_strXml).find("row").each(function (idx, v) {

        strReceiptHtml += '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">';
        strReceiptHtml += '<html xmlns= "http://www.w3.org/1999/xhtml" >';
        strReceiptHtml += '<head>';
        strReceiptHtml += '<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />';
        strReceiptHtml += '<title>LISA : Receipt Printing</title>';
        strReceiptHtml += '<style>';
        strReceiptHtml += '#prp_receipt';
        strReceiptHtml += '{';
        strReceiptHtml += 'font - weight: normal;';
        strReceiptHtml += 'font-family: Arial, Helvetica, sans-serif;';
        strReceiptHtml += 'font-size: 10px;';
        strReceiptHtml += '}';
        strReceiptHtml += '.receiptLabel';
        strReceiptHtml += '{';
        strReceiptHtml += 'font - size: 16px;';
        strReceiptHtml += 'font-weight: bold;';
        strReceiptHtml += 'font-family: Arial, Helvetica, sans-serif;';
        strReceiptHtml += '}';
        strReceiptHtml += '.receiptPwd';
        strReceiptHtml += '{';
        strReceiptHtml += 'font - size: 14px;';
        strReceiptHtml += 'font-family: Arial, Helvetica, sans-serif;';
        strReceiptHtml += '}';
        strReceiptHtml += '#lbl_Receipt1';
        strReceiptHtml += '{';
        strReceiptHtml += 'border: 1px solid #000000;';
        strReceiptHtml += 'padding: 3px;';
        strReceiptHtml += 'height: 25px;';
        strReceiptHtml += '}';
        strReceiptHtml += '.receiptfooter';
        strReceiptHtml += '{';
        strReceiptHtml += 'font - family: Arial, Helvetica, sans-serif;';
        strReceiptHtml += 'font-weight: bold;';
        strReceiptHtml += 'font-size: 11px;';
        strReceiptHtml += '}';
        strReceiptHtml += '#tbl_course';
        strReceiptHtml += '{';
        strReceiptHtml += 'text - align: center;';
        strReceiptHtml += 'font-size: 13px;';
        strReceiptHtml += '}';
        strReceiptHtml += '#rl_studentname1, #lbl_Id1, #rl_amount1, #rl_mode1, #rl_bank1, #rl_chqdate1, #rl_installment1';
        strReceiptHtml += '{';
        strReceiptHtml += 'text - decoration: underline;';
        strReceiptHtml += '}';
        strReceiptHtml += '#tbl_balance_details';
        strReceiptHtml += '{';
        strReceiptHtml += 'margin - top: 25px;';
        strReceiptHtml += 'margin-bottom: 20px;';
        strReceiptHtml += '}';
        strReceiptHtml += '#receipt_course_details';
        strReceiptHtml += '{';
        strReceiptHtml += 'margin - top: 3px;';
        strReceiptHtml += 'margin-bottom: 3px;';
        strReceiptHtml += '}';
        strReceiptHtml += '</style>';

        strReceiptHtml += '<script language="javascript">';
        //From page - CallPrint

        strReceiptHtml += 'function CallPrint() {';
        strReceiptHtml += 'var arrTables = document.getElementById("tbl_course");';
        strReceiptHtml += 'var arrTablesLength = arrTables.rows.length;';

        strReceiptHtml += 'switch (arrTablesLength) {';
        strReceiptHtml += 'case 2:';
        strReceiptHtml += 'arrTables.style.fontSize = "16px";';
        strReceiptHtml += 'break;';

        strReceiptHtml += 'case 3:';
        strReceiptHtml += 'arrTables.style.fontSize = "16px";';
        strReceiptHtml += 'break;';

        strReceiptHtml += 'case 4:';
        strReceiptHtml += 'arrTables.style.fontSize = "12px";';
        strReceiptHtml += 'break;';

        strReceiptHtml += 'default:';
        strReceiptHtml += 'arrTables.style.fontSize = "9px";';

        strReceiptHtml += '}';


        strReceiptHtml += '</script>';

        strReceiptHtml += '</head>';
        strReceiptHtml += '<body>';
        strReceiptHtml += '<!--Start of div "prp_receipt" -->';
        strReceiptHtml += '<div id="prp_receipt1">';
        strReceiptHtml += '<div id="prp_receipt" runat="server">';
        strReceiptHtml += '<!--Space for Class Name Header and Logo-->';
        strReceiptHtml += '<table border="0" cellpadding="2" cellspacing="2" width="100%">';
        strReceiptHtml += '<tr height="65px">';
        strReceiptHtml += '<td>';
        strReceiptHtml += strLogo; // 'lbl_CompanyLogo';
        strReceiptHtml += '</td>';
        strReceiptHtml += '</tr>';
        strReceiptHtml += '</table>';
        strReceiptHtml += '<!-- End Space for Class Name Header and Logo-->';
        strReceiptHtml += '<!-- Table 1 for Office Address -->';
        //strReceiptHtml += '<table border="0" cellpadding="2" cellspacing="2">';
        //strReceiptHtml += '<tr>';
        //strReceiptHtml += '<td width="18%" style=" font-size:9px;font-weight:bold">';
        //strReceiptHtml += 'REGISTERED OFFICE:';
        //strReceiptHtml += '</td>';
        //strReceiptHtml += '<td width="82%" style=" font-size:9px;font-weight:normal">';
        //strReceiptHtml += strCoAddress; // 'lbl_CompanyAddress';
        //strReceiptHtml += '</td>';
        //strReceiptHtml += '</tr>';
        //strReceiptHtml += '</table>';
        //strReceiptHtml += '<!-- End Table 1 for Office Address -->';
        //strReceiptHtml += '<br />';
       
        strReceiptHtml += '<!-- Table for Recpt No and Date -->';
        strReceiptHtml += '<table border="0" cellpadding="0" cellspacing="2" width="100%">';
        strReceiptHtml += '<tr>';
        strReceiptHtml += '<td style=" font-size:13px">';
        strReceiptHtml += 'Branch';
        strReceiptHtml += '</td>';
        strReceiptHtml += '<td style=" font-size:13px;font-weight:bold">:&nbsp;&nbsp;';
        strReceiptHtml += strBranch; // 'lbl_branch';
        strReceiptHtml += '</td>';
        strReceiptHtml += '<td width="10%" style=" font-size:13px">';
        strReceiptHtml += 'Invoice No';
        strReceiptHtml += '</td>';
        strReceiptHtml += '<td width="20%" style=" font-size:13px;font-weight:bold">:&nbsp;&nbsp;';
        strReceiptHtml += StrInvNo; // 'lbl_invoice';
        strReceiptHtml += '</td>';
        strReceiptHtml += '</tr>';
        strReceiptHtml += '<tr>';
        strReceiptHtml += '<td width="15%" style=" font-size:13px">';
        strReceiptHtml += 'Receipt No.';
        strReceiptHtml += '</td>';
        strReceiptHtml += '<td width="45%" style=" font-size:13px;font-weight:bold">:&nbsp;&nbsp;';
        strReceiptHtml += strReceiptNo; // 'lbl_Receipt2';
        strReceiptHtml += '</td><td width="10%" style=" font-size:13px">';
        strReceiptHtml += 'Date';
        strReceiptHtml += '</td>';
        strReceiptHtml += '<td width="20%" style=" font-size:13px;font-weight:bold">:&nbsp;&nbsp;';
        strReceiptHtml += strReceiptDate; // 'rl_date2';
        strReceiptHtml += '</td>';
        strReceiptHtml += '</tr>';
        strReceiptHtml += '<tr>';
        strReceiptHtml += '<td style=" font-size:13px">';
        strReceiptHtml += 'Received from';
        strReceiptHtml += '</td>';
        strReceiptHtml += '<td style=" font-size:13px;font-weight:bold">:&nbsp;&nbsp;';
        strReceiptHtml += StrStudName; // 'lbl_StudentName';
        strReceiptHtml += '</td>';
        strReceiptHtml += '</tr>';
        strReceiptHtml += '<tr>';
        strReceiptHtml += '<td style=" font-size:13px">';
        strReceiptHtml += 'Address';
        strReceiptHtml += '</td>';
        strReceiptHtml += '<td style=" font-size:13px">:&nbsp;&nbsp;';
        strReceiptHtml += strStudAdd; // 'lbl_StudentAdd';
        strReceiptHtml += '</td>';
        strReceiptHtml += '</tr>';
        strReceiptHtml += '</table>';
        strReceiptHtml += '<br />';
        strReceiptHtml += '<!-- End Table  for Recpt No and Date -->';
        strReceiptHtml += '<!-- Div for Course Details Table-->';
        strReceiptHtml += StrGenerateCourseHtml; //'receipt_course_details';
        strReceiptHtml += '<!-- End Div for Course Details Table-->';
        //strReceiptHtml += '<br />';
        strReceiptHtml += '<table id="tbl_course" class="add_student_table" width="99%" border="1" cellspacing="0" cellpadding="2" style="margin-top: 20px;" >';
        strReceiptHtml += '<tr>';
        //strReceiptHtml += '<td style=" font-size:13px;font-weight:bold" align="center">SAC</td>';
        strReceiptHtml += '<td style=" font-size:13px;font-weight:bold" align="center">Taxable Amount</td>';
        strReceiptHtml += '<td style=" font-size:13px;font-weight:bold" align="center">' + strCgstName + ' @ ' + strCgstRate + '%</td>';
        strReceiptHtml += '<td style=" font-size:13px;font-weight:bold" align="center">' + strSgstName + ' @ ' + strSgstRate + '%</td>';
        strReceiptHtml += '<td style=" font-size:13px;font-weight:bold" align="center">Total Amount</td>';
        strReceiptHtml += '</tr>';

        var flTotalGST = parseFloat(strCgstRate) + parseFloat(strSgstRate);
        var flReceived = parseFloat(strPrReceivedAmt);
        var flTotalGstAmt = (flReceived - ((flReceived * 100) / (flTotalGST + 100))).toFixed(2);
        var flCgst = (flTotalGstAmt / 2).toFixed(2);
        var flSgst = (flTotalGstAmt / 2).toFixed(2);
        var flTaxabale = flReceived - (parseFloat(flCgst) + parseFloat(flSgst));

        strReceiptHtml += '<tr>';
        //strReceiptHtml += '<td style=" font-size:13px" align="center">' + strSAC + '</td>';
        strReceiptHtml += '<td style=" font-size:13px" align="center"><textFieldExpression>&#8377</textFieldExpression> ' + flTaxabale + '</td>';
        strReceiptHtml += '<td style=" font-size:13px" align="center"><textFieldExpression>&#8377</textFieldExpression> ' + flCgst + '</td>';
        strReceiptHtml += '<td style=" font-size:13px" align="center"><textFieldExpression>&#8377</textFieldExpression> ' + flSgst + '</td>';
        strReceiptHtml += '<td style=" font-size:13px" align="center"><textFieldExpression>&#8377</textFieldExpression> ' + flReceived + '/-</td>';
        strReceiptHtml += '</tr>';

        var strAmount = "";
        if (flReceived.toString().split(".").length > 1) {
            strAmount = '&nbsp;( Rupees ' + AmounttoWords(flReceived.toString().split(".")[0].toString()) + ' And ' + AmounttoWords(flReceived.toString().split(".")[1].toString()) + ' paise only )';
        }
        else {
            strAmount = '&nbsp;( Rupees ' + AmounttoWords(flReceived.toString()) + ' only )';
        }

        strReceiptHtml += '<tr align="left" style=" font-size:13px;font-weight:bold">';
        strReceiptHtml += '<td colspan="5">' + strAmount + '</td>';
        strReceiptHtml += '</tr>';


        strReceiptHtml += '</table>';
        strReceiptHtml += '<br>';
        strReceiptHtml += '<table border="0" cellpadding="2" cellspacing="2" width="80%">';
        strReceiptHtml += '<tr>';
        strReceiptHtml += '<td style=" font-size:13px">';
        strReceiptHtml += 'Paid : <textFieldExpression>&#8377</textFieldExpression> <b>' + flReceived + '/-</b>';
        strReceiptHtml += '</td>';
        strReceiptHtml += '<td style=" font-size:13px">';
        strReceiptHtml += 'Payment Mode : <b>' + strPayMode + '</b>';
        strReceiptHtml += '</td>';

        if (strPayMode.toLowerCase() == 'cheque' || strPayMode.toLowerCase() == 'demand draft') {
            strReceiptHtml += '</tr>';
            strReceiptHtml += '<tr>';
            strReceiptHtml += '<td style=" font-size:13px">Chq/DD no: <b>' + strChqNo + '</b></td>';
            strReceiptHtml += '<td style=" font-size:13px">Chq/DD date: <b>' + strChqDate + '</b></td>';
            strReceiptHtml += '<td style=" font-size:13px">Chq/DD Bank: <b>' + strChqBank + '</b></td>';
            strReceiptHtml += '</tr>';

        }

        strReceiptHtml += '</table>';
        strReceiptHtml += '<br>';
        // GST /SAC / CIN Details
        strReceiptHtml += '<!-- Table for CIN and GST Number -->';
        strReceiptHtml += '<table border="1" cellpadding="0" cellspacing="0" width="100%">';
        //strReceiptHtml += '<th align="center" colspan="4" height="30px" style=" font-size:16px;font-weight:bold">';
        //strReceiptHtml += 'TAX INVOICE CUM FEES RECIEPT <br />';
        //strReceiptHtml += '</th>';
        strReceiptHtml += '<tr>';
        
       // strReceiptHtml += '<td style=" font-size:13px;font-weight:bold">:&nbsp;&nbsp;' + strSAC + '</td>';
        strReceiptHtml += '<td style=" font-size:13px;font-weight:bold;width: 33%" align="center">GSTIN&nbsp;:&nbsp;' + strGSTin + '</td>'; // 'lbl_GSTNumber';
        strReceiptHtml += '<td style=" font-size:13px;font-weight:bold;width: 33%" align="center">SAC&nbsp;:&nbsp;' + strSAC + '</td>'; // 'lbl_SAC';
        strReceiptHtml += '<td style=" font-size:13px;font-weight:bold;width: 33%" align="center">CIN&nbsp;:&nbsp;' + strCoCin + '</td>'; // 'lbl_CinNumber';
        //strReceiptHtml += '<td style=" font-size:13px;font-weight:bold">';
        //strReceiptHtml += 'CIN';
        //strReceiptHtml += '</td>';
        //strReceiptHtml += '<td style=" font-size:13px;font-weight:bold">:&nbsp;&nbsp;';
        //strReceiptHtml += strCoCin; // 'lbl_CinNumber';
        //strReceiptHtml += '</td>';
        //strReceiptHtml += '<td style=" font-size:13px;font-weight:bold">';
        //strReceiptHtml += 'GSTIN';
        //strReceiptHtml += '</td>';
        //strReceiptHtml += '<td style=" font-size:13px;font-weight:bold">:&nbsp;&nbsp;';
        //strReceiptHtml += strGSTin; // 'lbl_GSTNumber';
        //strReceiptHtml += '</td>';
        strReceiptHtml += '<tr>';
        strReceiptHtml += '</table>';
        strReceiptHtml += '<br />';
        strReceiptHtml += '<!-- End Table for CIN and GST Number -->';
        strReceiptHtml += '<table cellpadding="2" cellspacing="2" border="0" width="100%">';
        strReceiptHtml += '<tr height="25px">';
        strReceiptHtml += '<td align="center" style=" font-size:13px"><b>';
        strReceiptHtml += 'Amount of Tax Subject to Reverse Charge  :     No';
        strReceiptHtml += '</b></td>';
        strReceiptHtml += '</tr>';
        //strReceiptHtml += '<tr height="20px">';
        //strReceiptHtml += '<td style=" font-size:13px">';
        //strReceiptHtml += '<b> Notes : </b>';
        //strReceiptHtml += '</td>';
        //strReceiptHtml += '</tr>';
        strReceiptHtml += '<tr>';
        strReceiptHtml += '<td style=" font-size:13px">';
        strReceiptHtml += '<textFieldExpression>&#9679</textFieldExpression> Fees Once paid will neither be refunded nor adjusted under any circumstances.';
        strReceiptHtml += '</td>';
        strReceiptHtml += '</tr>';
        strReceiptHtml += '<tr>';
        strReceiptHtml += '<td style=" font-size:13px">';
        strReceiptHtml += '<textFieldExpression>&#9679</textFieldExpression> Receipt is issued subject to realisation of cheque.';
        strReceiptHtml += '</td>';
        strReceiptHtml += '</tr>';
        strReceiptHtml += '<tr>';
        strReceiptHtml += '<td style=" font-size:13px">';
        strReceiptHtml += '<textFieldExpression>&#9679</textFieldExpression> This is a computer generated receipt and hence does not require a signature.';
        strReceiptHtml += '</td>';
        strReceiptHtml += '</tr>';
        strReceiptHtml += '</table>';

        strReceiptHtml += '<!-- end of receipt -->';
        strReceiptHtml += '</div>';
        strReceiptHtml += '<!-- End of div "prp_receipt" -->';
        strReceiptHtml += '</div>';
        strReceiptHtml += '<hr />';

        strReceiptHtml += '</body>';
        strReceiptHtml += '</html>';


    //});

    //$("#divReceipt").html(strReceiptHtml);

    return strReceiptHtml;
}


function AssignMenuPermissions() {

    $.ajax({
        type: "POST",
        url: "common.aspx/AssignMenuPermissions",
        //data: strData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnSuccessAssignMenuPermissions,
        failure: function (response) {

            alert("Error on the server!");

        }
    });
}

function OnSuccessAssignMenuPermissions(response) {

    var strMenuXml = response.d;
    
    SearchData(strMenuXml);
}

function SearchData(strXml) {

    var arr = [];
    $(strXml).find("row").each(function (idx, v) {

        arr[idx] = [];

        $(v).children().each(function (i, vi) {

            arr[idx].push($(vi).text());
        });
    });

    strActivity = "";

    $.each($(strXml).find('row'), function (index, nodeValue) {


        var MenuModuleID = $(nodeValue).find('mm_id').text();
        var MenuModuleName = $(nodeValue).find('mm_name').text();

        $.each($(strXml).find('row1'), function (index_1, nodeValue_1) {

            if (MenuModuleID == $(nodeValue_1).find('mp_mm_id').text()) {

                var MenuModuleClass = $(nodeValue_1).find('mm_class').text();
                var MenuFormClass = $(nodeValue_1).find('mf_class').text();
                var MenuView = $(nodeValue_1).find('mp_view').text();
                var MenuEdit = $(nodeValue_1).find('mp_edit').text();
                var MenuDelete = $(nodeValue_1).find('mp_delete').text();

                if (MenuView == 'V' || MenuEdit == 'E' || MenuDelete == 'D') {

                    $('.' + MenuFormClass).css("display", "block");
                    $('.' + MenuModuleClass).css("display", "block");
                }

            }


        });


    });


    // $("#MenuActivity").html(strActivity);
}

function CallAjax(strMethod, strUrl, strData, strContentType, strDataType, strSuccessFunction, strFailureFunction) {
    $.ajax({
        type: strMethod,
        url: strUrl,
        data: strData,
        contentType: strContentType,
        dataType: strDataType,
        success: strSuccessFunction,
        failure: strFailureFunction
    });
}