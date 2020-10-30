<%@ Page Title="" Language="C#" MasterPageFile="~/home.Master" AutoEventWireup="true" CodeBehind="frmEnquiryView.aspx.cs" Inherits="GMS.frmEnquiryView" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <section class="content">

        <!-- Default box -->
        <div class="box collapsed-box">
            <div class="box-header with-border">
                <h3 class="box-title">Manage Enquiry - View Form</h3>

                <%--<div class="box-tools pull-right">
                    <button type="button" class="btn btn-box-tool btn-primary" data-widget="collapse" data-toggle="tooltip" title="" data-original-title="Collapse">
                        <i class="fa fa-plus"></i>
                    </button>                    
                </div>--%>
            </div>
            
            <div class="box-body-data">
                <table id="tblData" class="table table-bordered table-striped dataTable" role="grid" aria-describedby="example1_info">
                </table>
            </div>

            <!-- /.box-footer-->
        </div>
        <!-- /.box -->

    </section>

    <script src="jscripts/jsEnquiryView.js"></script>

</asp:Content>
