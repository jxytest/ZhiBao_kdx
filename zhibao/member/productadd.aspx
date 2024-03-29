﻿<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="productadd.aspx.cs" Inherits="member_productadd" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">

    <div class="breadcrumbs" id="breadcrumbs">
        <script type="text/javascript">
            try { ace.settings.check('breadcrumbs', 'fixed') } catch (e) { }
        </script>
        <ul class="breadcrumb">
            <li><i class="icon-home home-icon"></i><a href="home.aspx">首页</a> </li>
            <li class="active">产品(卷轴号)管理</li>
        </ul>
        <!-- .breadcrumb -->
    </div>
    <div class="page-content">
        <div class="page-header">
            <h1>新增产品卷轴号</h1>
        </div>
        <div class="row">
            <div class="col-xs-12">
                <!-- PAGE CONTENT BEGINS -->
                <div class="form-horizontal">
                        <div class="form-group" id="divtypeone">
                            <label class="col-sm-3 control-label no-padding-right" for="province_ddl">一级类别 </label>
                            <div class="col-sm-2">
                                <asp:DropDownList ID="typeone_ddl" runat="server" class="form-control"></asp:DropDownList>
                            </div>
                            <span class="help-inline col-xs-12 col-sm-4"><span class="middle" id="typeoneerr"></span> </span>
                        </div>
                        <div class="space-4"></div>
                        <div class="form-group" id="divtypetwo">
                            <label class="col-sm-3 control-label no-padding-right" for="form-field-2">品牌型号 </label>
                            <div class="col-sm-2">
                                <asp:DropDownList ID="typetwo_ddl" runat="server" class="form-control"></asp:DropDownList>
                            </div>
                            <span class="help-inline col-xs-12 col-sm-4"><span class="middle"  id="typetwoerr"></span> </span>
                        </div>
                        <div class="space-4"></div>
                        <div class="form-group" id="divcode">
                            <label class="col-sm-3 control-label no-padding-right" for="address_txt">卷轴号 </label>
                            <div class="col-sm-9">
                                <asp:TextBox ID="code_txt" runat="server"  placeholder="卷轴号" class="col-xs-10 col-sm-5" maxlength="20"></asp:TextBox>
                                <span class="help-inline col-xs-12 col-sm-7"><span class="middle"  id="codeerr"></span> </span>
                            </div>
                        </div>
                        <div class="space-4"></div>
                    <div class="form-group"  id="divmemo">
                            <label class="col-sm-3 control-label no-padding-right" for="address_txt">质保年限 </label>
                            <div class="col-sm-9">
                                <asp:TextBox ID="memo_txt" runat="server"  placeholder="质保年限" class="col-xs-10 col-sm-5" maxlength="50"></asp:TextBox>
                                <span class="help-inline col-xs-12 col-sm-7"><span class="middle"  id="memoerr"></span> </span>
                            </div>
                        </div>
                        <div class="space-4"></div>
                    <div class="clearfix form-actions">
                        <div class="col-md-offset-3 col-md-9">
                            <button class="btn btn-info" type="button" onclick="ProductAdd()"><i class="icon-ok bigger-110"></i>确定 </button>
                            &nbsp; &nbsp; &nbsp;
                            <button class="btn" type="reset" onclick="Reset()"><i class="icon-undo bigger-110"></i>重置 </button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /.col -->
        </div>
    </div>
    <script src="../js/productadd.js"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            $("#menuproduct").addClass("active open");
            $("#menuproductadd").addClass("active");
        });
    </script>
</asp:Content>

