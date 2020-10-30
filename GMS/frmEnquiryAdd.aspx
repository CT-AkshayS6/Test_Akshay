<%@ Page Title="" Language="C#" MasterPageFile="~/home.Master" AutoEventWireup="true" CodeBehind="frmEnquiryAdd.aspx.cs" Inherits="GMS.frmEnquiryAdd" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <!-- Main content -->
    <section class="content">

        <!-- Default box -->
        <div class="box">
            <div class="box-header with-border">
                <h3 id="pagetitle" class="box-title">Manage Enquiry - Add Form</h3>
            </div>

            <div class="box-body">
                <form class="form-horizontal" role="form">
                    <div class="form-body">
                        <div class="row">
                            <div class="form-group">
                                <div class="col-md-9">
                                    <label class="col-md-3 control-label">Full Name  <span class="clsLblMandatory">*</span></label>
                                    <div class="col-md-6">
                                        <input id="txtFullName" type="text" class="form-control" placeholder="Enter Full Name">
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div class="row">
                            <div class="form-group">
                                <div class="col-md-9">
                                    <label class="col-md-3 control-label">Email  <span class="clsLblMandatory">*</span></label>
                                    <div class="col-md-6">
                                        <input id="txtEmail" type="text" class="form-control" placeholder="Enter Email">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="form-group">
                                <div class="col-md-9">
                                    <label class="col-md-3 control-label">Mobile No. <span class="clsLblMandatory">*</span></label>
                                    <div class="col-md-6">
                                        <input id="txtMobileNo" class="form-control" placeholder="Enter Mobile No." type="number">
                                    </div>
                                </div>
                            </div>
                        </div>   
                        
                        <div class="row">
                            <div class="form-group">
                                <div class="col-md-9">
                                    <label class="col-md-3 control-label">Alternate Mobile No.</label>
                                    <div class="col-md-6">
                                        <input id="txtAlternateMobileNo" class="form-control" placeholder="Enter Mobile No." type="number">
                                    </div>
                                </div>
                            </div>
                        </div>   

                        <div class="row">
                            <div class="form-group">

                                <div class="col-md-9">
                                    <label class="col-md-3 control-label">Gender  <span class="clsLblMandatory">*</span></label>
                                    <div class="col-md-6">
                                        <div class="radio">
                                            <label>
                                                <input type="radio" name="Gender" id="rdbMale" value="M" checked="checked">
                                                Male
                                            </label>
                                            &nbsp;&nbsp;
                                            <label>
                                                <input type="radio" name="Gender" id="rdbFemale" value="F">
                                                Female
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="form-group">
                                <div class="col-md-9">
                                    <label class="col-md-3 control-label">Address  <span class="clsLblMandatory">*</span></label>
                                    <div class="col-md-6">
                                        <textarea id="txtAddress" type="text" class="form-control" placeholder="Enter Address" rows="5"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="form-group">
                                <div class="col-md-9">
                                    <label class="col-md-3 control-label">Date of Enquiry  <span class="clsLblMandatory">*</span></label>
                                    <div class="col-md-6">
                                        <input id="txtEnquiryDate" type="text" class="form-control" placeholder="Select Enquiry Date">
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

    <script src="jscripts/jsEnquiryAdd.js"></script>
</asp:Content>
