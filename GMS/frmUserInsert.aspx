<%@ Page Title="" Language="C#" MasterPageFile="~/home.Master" AutoEventWireup="true" CodeBehind="frmUserInsert.aspx.cs" Inherits="GMS.frmUserInsert" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <!-- Main content -->
    <section class="content">

        <!-- Default box -->
        <div class="box">
            <div class="box-header with-border">
                <h3 id="pagetitle" class="box-title">Manage User - Add Form</h3>

                <div class="box-tools pull-right" style="display: none;">
                    <button type="button" class="btn btn-box-tool" data-widget="collapse" data-toggle="tooltip" title="" data-original-title="Collapse">
                        <i class="fa fa-minus"></i>
                    </button>
                    <button type="button" class="btn btn-box-tool" data-widget="remove" data-toggle="tooltip" title="" data-original-title="Remove">
                        <i class="fa fa-times"></i>
                    </button>
                </div>
            </div>
            <div class="box-body">
                <form class="form-horizontal" role="form">
                    <div class="form-body">

                        <div class="row">

                            <div class="form-group">
                                <div class="col-md-9">

                                    <label class="col-md-3 control-label">Enter First Name  <span class="clsLblMandatory">*</span></label>
                                    <div class="col-md-6">
                                        <input id="txtFirstName" type="text" class="form-control" placeholder="Enter First Name">
                                    </div>

                                </div>
                            </div>

                        </div>

                        <div class="row">

                            <div class="form-group">
                                <div class="col-md-9">
                                    <label class="col-md-3 control-label">Enter Last Name </label>
                                    <div class="col-md-6">
                                        <input id="txtLastName" type="text" class="form-control" placeholder="Enter Last Name">
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div class="row">
                            <div class="form-group">
                                <div class="col-md-9">
                                    <label class="col-md-3 control-label">Enter Email  <span class="clsLblMandatory">*</span></label>
                                    <div class="col-md-6">
                                        <input id="txtEmail" type="text" class="form-control" placeholder="Enter Email">
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div class="row">

                            <div class="form-group">
                                <div class="col-md-9">
                                    <label class="col-md-3 control-label">Enter Mobile No. </label>
                                    <div class="col-md-6">
                                        <input id="txtPhoneNo" class="form-control" placeholder="Enter Mobile No." maxlength="10" type="number">
                                    </div>
                                </div>

                            </div>

                        </div>


                        <div class="row">

                            <div class="form-group">

                                <div class="col-md-9">
                                    <label class="col-md-3 control-label">Enter User Level <span class="clsLblMandatory">*</span></label>
                                    <div class="col-md-6">
                                        <select id="selLevel" class="form-control">
                                            <option value="-1">-- Select --</option>
                                            <option value="A">Admin</option>
                                            <option value="U">User</option>
                                            <option value="T">Trainer</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>


                    <div class="form-actions">
                        <div class="row">
                            <div class="col-md-offset-3 col-md-6">
                                <button id="btnSave" type="button" class="btn btn-primary">Save</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <!-- /.box-body -->
            <div class="box-footer" style="display: none;">
                Footer
            </div>
            <!-- /.box-footer-->
        </div>
        <!-- /.box -->

    </section>
    <!-- /.content -->

    <script src="jscripts/jsUserInsert.js"></script>

</asp:Content>
