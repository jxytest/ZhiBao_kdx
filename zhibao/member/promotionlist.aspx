﻿<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="promotionlist.aspx.cs" Inherits="member_promotionlist" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
<div class="breadcrumbs" id="breadcrumbs">
        <script type="text/javascript">
            try { ace.settings.check('breadcrumbs', 'fixed') } catch (e) { }
        </script>
        <ul class="breadcrumb">
            <li><i class="icon-home home-icon"></i><a href="home.aspx">首页</a> </li>
            <li class="active">促销管理</li>
        </ul>
        <!-- .breadcrumb -->
    </div>
    <div class="page-content">
        <div class="page-header">
            <h1>促销列表</h1>
        </div>
        <div class="row">
            <div class="col-xs-12">
                <div class="table-responsive">
                    <table id="sample-table-1" class="table table-striped table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>操作</th>
                                <th>日期</th>
                                <th>标题</th>
                            </tr>
                        </thead>
                        <tbody id="tbcon">
                           
                        </tbody>
                    </table>

                    <div id="Pagination">
                    </div>
                </div>
                <!-- /.table-responsive -->
            </div>
            <!-- /span -->
        </div>

        

    </div>
    <script src="../js/jquery.pagination.js"></script>
    <script src="../js/promotionlist.js"></script>
    <asp:HiddenField ID="deletepermission" runat="server" />
    <asp:HiddenField ID="updatepermission" runat="server" />

    <script type="text/javascript">
        $(document).ready(function () {
            $("#menupromotion").addClass("active open");
            $("#menupromotionlist").addClass("active");
        });
    </script>
</asp:Content>

