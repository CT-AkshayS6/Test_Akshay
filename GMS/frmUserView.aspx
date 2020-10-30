<%@ Page Title="" Language="C#" MasterPageFile="~/home.Master" AutoEventWireup="true" CodeBehind="frmUserView.aspx.cs" Inherits="GMS.frmUserView" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <section class="content">

        <!-- Default box -->
        <div class="box collapsed-box">
            <div class="box-header with-border">
                <h3 class="box-title">Manage Users - View Form</h3>

                <div class="box-tools pull-right">
                    <button type="button" class="btn btn-box-tool btn-primary" data-widget="collapse" data-toggle="tooltip" title="" data-original-title="Collapse">
                        <i class="fa fa-plus"></i>
                    </button>                    
                </div>
            </div>


            <div class="box-body">

                <div>
                    <%--class="box box-info"--%>
                    <div class="box-header with-border" style="display: none;">
                        <h3 class="box-title">Horizontal Form</h3>
                    </div>
                    <!-- /.box-header -->
                    <!-- form start -->
                    <form class="form-horizontal">
                        <div class="box-body">
                            <div class="form-body">

                                <div class="row">

                                    <div class="form-group">

                                        <div class="col-md-6">
                                            <label class="control-label col-md-4">First Name </label>
                                            <div class="col-md-8">
                                                <input id="txtFirstName" type="text" class="form-control" placeholder="Enter Firstname">
                                            </div>
                                        </div>                                        

                                        <div class="col-md-6">
                                            <button id="btnSearch" type="button" class="btn btn-primary">Search</button>
                                            <button id="btnViewAll" type="button" class="btn btn-primary">View All</button>
                                        </div>

                                    </div>

                                </div>
                            </div>

                        </div>
                    </form>
                </div>

            </div>





            <div class="box-body-data">
                <table id="tblData" class="table table-bordered table-striped dataTable" role="grid" aria-describedby="example1_info">
                </table>
            </div>

            <!-- /.box-footer-->
        </div>
        <!-- /.box -->

    </section>

    <script src="jscripts/jsUserView.js"></script>

</asp:Content>
