﻿
var meterMsg = 0;

$(document).ready(function () {

   

    $('#ContentPlaceHolder1_frontcode_ddl').bind('change', function () {
        $('#ContentPlaceHolder1_frontProductCode').empty();
        $("<option value=''></option>").appendTo("#ContentPlaceHolder1_frontProductCode");
        if ($('#ContentPlaceHolder1_frontcode_ddl').val() != "") {
            var params = { Action: "GetProduct_T_Code", FId: $('#ContentPlaceHolder1_frontcode_ddl').val() };
            $.ajax({
                type: "POST",
                url: "../interface/Product.ashx",
                cache: false,
                dataType: "json",
                data: jQuery.param(params, true),
                success: function (msg) {
                    if (msg.errorcode == "0") {
                        if (msg.data != null && msg.data.length > 0) {
                            for (var i = 0; i < msg.data.length; i++) {
                                var li = msg.data[i].newsid;
                                $('<option value="' + msg.data[i] + '">' + msg.data[i] + '</option>').appendTo('#ContentPlaceHolder1_frontProductCode');
                            }
                        }
                    }
                }
            });
        }
    });

    $('#ContentPlaceHolder1_frontProductCode').bind('change', function () {
        if ($('#ContentPlaceHolder1_frontProductCode').val() != "") {
            var params = { Action: "GetMeter", Code: $('#ContentPlaceHolder1_frontProductCode').val() };
            $.ajax({
                type: "POST",
                url: "../interface/Product.ashx",
                cache: false,
                dataType: "json",
                data: jQuery.param(params, true),
                success: function (msg) {
                    if (msg.errorcode == "0") {
                        if (msg.data != null) {
                            meterMsg = msg.data;
                            $("#frontProductcodeerr").html('此卷膜还剩' + (15 - parseFloat(msg.data)) + "米");
                        }
                    }
                }
            });
        }
    });

    $(':input[type="checkbox"][name="YHGL"]').bind('click', function () {
        $(':input[type="checkbox"][name="YHGLG"]').attr("checked", false);
    });
    $(':input[type="checkbox"][name="YHGLG"]').bind('click', function () {
        $(':input[type="checkbox"][name="YHGL"]').attr("checked", false);
    });


    $('#ContentPlaceHolder1_brand_ddl').bind('change', function () {
        GetSysytemFromUs();
    });

    $('#ContentPlaceHolder1_system_ddl').bind('change', function () {
        GetTypeFromUs();
    });

    $('#ContentPlaceHolder1_province_ddl').bind('change', function () {
        $('#ContentPlaceHolder1_city_ddl').empty();
        $("<option value=''></option>").appendTo("#ContentPlaceHolder1_city_ddl");
        if ($('#ContentPlaceHolder1_province_ddl').val() != "") {
            var params = { Action: "GetCityByProvince", ProvinceID: $('#ContentPlaceHolder1_province_ddl').val() };
            $.ajax({
                type: "POST",
                url: "../interface/Admin.ashx",
                cache: false,
                dataType: "json",
                data: jQuery.param(params, true),
                success: function (msg) {
                    if (msg.errorcode == "0") {
                        if (msg.data != null && msg.data.length > 0) {
                            for (var i = 0; i < msg.data.length; i++) {
                                var li = msg.data[i].newsid;
                                $('<option value="' + msg.data[i].CityId + '">' + msg.data[i].CityName + '</option>').appendTo('#ContentPlaceHolder1_city_ddl');
                            }
                        }
                    }
                }
            });
        }
    });
    $("#uploadify").uploadify({
        //指定swf文件
        'swf': '../assets/js/uploadify/uploadify.swf',
        //后台处理的页面
        'uploader': '../interface/UpLoading.ashx',
        'cancelImg': '../assets/js/uploadify/uploadify-cancel.png',
        'queueSizeLimit':'5',
        //按钮显示的文字
        'buttonText': '选择图片',
       // 'folder': 'UpLoadImage',
        //显示的高度和宽度，默认 height 30；width 120
        //'height': 15,
        //'width': 80,
        //上传文件的类型  默认为所有文件    'All Files'  ;  '*.*'
        //在浏览窗口底部的文件类型下拉菜单中显示的文本
        'fileTypeDesc': 'Image Files',
        //允许上传的文件后缀
        'fileTypeExts': '*.gif; *.jpg; *.png',
        //发送给后台的其他参数通过formData指定
        //'formData': { 'someKey': 'someValue', 'someOtherKey': 1 },
        //上传文件页面中，你想要用来作为文件队列的元素的id, 默认为false  自动生成,  不带#
       // 'queueID': 'fileQueue',
        //选择文件后自动上传
        'auto': true,
        //设置为true将允许多文件上传
        'multi': true,
        'onUploadSuccess': function (file, data, response) {
            var temp = $("#tempImage").val();
          //  alert(temp);
            var htmltemp = "<img src=\"../UpLoadImage/" + data + "\"  width=\"80px\"/>";
            if (temp == "")
            {
                $("#tempImage").val(data);
            }
            else
            {
                $("#tempImage").val(temp+"|"+data);
            }
            $('#' + file.id).find('.data').html(' 上传完毕');
          //  alert(htmltemp);
         //   alert($("#ImageResult").html());
            $("#ImageResult").append(htmltemp);
         //   alert($("#ImageResult").html());
        }
    });

    $(":button").click($.UserAdd);
});

function GetSysytemFromUs() {
    $("#ContentPlaceHolder1_system_ddl").empty();
    $("<option value=''></option>").appendTo("#ContentPlaceHolder1_system_ddl");
    if ($("#ContentPlaceHolder1_brand_ddl").val() != "") {
        var params = { Action: "GetSysytemFromUs", ID: $("#ContentPlaceHolder1_brand_ddl").val() };
        $.ajax({
            type: "POST",
            url: "../interface/Car.ashx",
            cache: false,
            dataType: "json",
            data: jQuery.param(params, true),
            success: function (msg) {

                if (msg.errorcode == "0") {
                    if (msg.data != null && msg.data.length > 0) {
                        for (var i = 0; i < msg.data.length; i++) {
                            var li = msg.data[i].newsid;
                            $('<option value="' + msg.data[i].CarSystemCode + '">' + msg.data[i].CarSystemName + '</option>').appendTo('#ContentPlaceHolder1_system_ddl');
                        }
                    }
                }
                else {
                    alert('异常，请重新获取');
                }
                GetTypeFromUs();
            }
        });
    }
}
function GetTypeFromUs() {
    $("#ContentPlaceHolder1_type_ddl").empty();
    $("<option value=''></option>").appendTo("#ContentPlaceHolder1_type_ddl");
    if ($("#ContentPlaceHolder1_system_ddl").val() != "") {
        var params = { Action: "GetTypeFromUs", ID: $("#ContentPlaceHolder1_system_ddl").val() };
        $.ajax({
            type: "POST",
            url: "../interface/Car.ashx",
            cache: false,
            dataType: "json",
            data: jQuery.param(params, true),
            success: function (msg) {

                if (msg.errorcode == "0") {
                    if (msg.data != null && msg.data.length > 0) {
                        for (var i = 0; i < msg.data.length; i++) {
                            var li = msg.data[i].newsid;
                            $('<option value="' + msg.data[i].CarTypeCode + '">' + msg.data[i].CarTypeName + '</option>').appendTo('#ContentPlaceHolder1_type_ddl');
                        }
                    }
                }
                else {
                    alert('异常，请重新获取');
                }
            }
        });
    }
}

function validateInt(o) {
    var pice = o.value.replace(/^[1-9][0-9]{0,2}|[0-9]$/, '');
    if (pice.length > 0) {
        o.value = o.value.substring(0, o.value.length - 1);
        validateInt(o);
    }
}

// 只能真金钱格式
function validatePices(o) {
    var pice = o.value.replace(/^([1-9][0-9]{0,5}|[0-9])((\.[0-9]{0,2}){0,1})$/, '');
    if (pice.length > 0) {
        o.value = o.value.substring(0, o.value.length - 1);
        validatePices(o);
    }
}

$.UserAdd=function()
{
    var self = $(this);
    $("#divtfrontcode").removeClass('has-error');
    $("#frontcodeerr").html('');

    $("#divtfrontProductcode").removeClass('has-error');
    $("#frontProductcodeerr").html('');

    $("#divtbackcode").removeClass('has-error');
    $("#backcodeerr").html('');

    $("#divname").removeClass('has-error');
    $("#nameerr").html('');
    $("#divmobile").removeClass('has-error');
    $("#mobileerr").html('');
    $("#divemail").removeClass("has-error");
    $("#emailerr").html("");
    $("#divbrand").removeClass("has-error");
    $("#branderr").html("");
    $("#divsystem").removeClass("has-error");
    $("#systemerr").html("");

    var codeone = $("#ContentPlaceHolder1_frontcode_ddl").val();
    var productCodeone = $("#ContentPlaceHolder1_frontProductCode").val();
    var part = $("#ContentPlaceHolder1_backcode_ddl").val();

    var part = "";
    $(':input[type="checkbox"]').each(function () {
        if ($(this).prop("checked")) {
            part = part + $(this).val() + ",";
          
        }
    });
  
    var name = $("#name_txt").val().Trim();
    var mobile = $("#mobile_txt").val().Trim();
    var email = $("#email_txt").val().Trim();
    var brand = $("#ContentPlaceHolder1_brand_ddl").val();
    var system = $("#ContentPlaceHolder1_system_ddl").val();
    var type = $("#ContentPlaceHolder1_type_ddl").val();
    var js = $("#ContentPlaceHolder1_js_ddl").val();
    var license = $("#license_txt").val().Trim();
    var province = $("#ContentPlaceHolder1_province_ddl").val();
    var city = $("#ContentPlaceHolder1_city_ddl").val();
    var price = $("#price_txt").val().Trim();
    var imagelist = $("#tempImage").val().Trim();

   
    var flag = true;
    if (codeone == "")
    {
        flag = false;
        $("#divtfrontcode").addClass('has-error');
        $("#frontcodeerr").html('请选择一个器面膜型号');
    }
    if (productCodeone == "" || productCodeone == null) {
        flag = false;
        $("#divtfrontProductcode").addClass('has-error');
        $("#frontProductcodeerr").html('请选择一个漆面膜卷轴号');
    }
    if (part == "" || part == null) {
        flag = false;
        $("#divtbackcode").addClass('has-error');
        $("#backcodeerr").html('请至少选择部位');
    }
    else
    {
        var arry = part.split(",");
        var total=0.0;
        for (var i = 0; i < arry.length; i++) {
            if (arry[i] == "1") {
                total += 2;
            }
            if (arry[i] == "2") {
                total += 1.2;
            }
            if (arry[i] == "3") {
                total += 2.5;
            }
            if (arry[i] == "4") {
                total += 1.3;
            }
            if (arry[i] == "5") {
                total += 2.2;
            }
            if (arry[i] == "6") {
                total += 2;
            }
            if (arry[i] == "7") {
                total += 2;
            }
            if (arry[i] == "8") {
                total += 3.5;
            }
            if (arry[i] == "9") {
                total += 0.25;
            }
            if (arry[i] == "10") {
                total += 0.5;
            }
            if (arry[i] == "11") {
                total += 15;
            }
        }
        if (15 - parseFloat(meterMsg) < total)
        {
            flag = false;
            $("#divtbackcode").addClass('has-error');
            $("#backcodeerr").html('选择要贴膜的部位米数已经超过此卷膜剩余的长度');
        }
    }
    if (name == "")
    {
        flag = false;
        $("#divname").addClass('has-error');
        $("#nameerr").html('请输入姓名');
    }

    if (mobile == "") {
        flag = false;
        $("#divmobile").addClass('has-error');
        $("#mobileerr").html('请输入手机号码');
    }
    else {
        var regPartton = /1[3-9]+\d{9}/;
        if (!regPartton.test(mobile)) {
            $("#divmobile").addClass("has-error");
            $("#mobileerr").html("手机号码格式不正确");
            flag = false;
        }
    }
    
    if (email != "")
    {
        var pattern = /^(?:[a-zA-Z0-9]+[_\-\+\.]?)*[a-zA-Z0-9]+@(?:([a-zA-Z0-9]+[_\-]?)*[a-zA-Z0-9]+\.)+([a-zA-Z]{2,})+$/;
        if (!pattern.exec(email)) {
            $("#divemail").addClass("has-error");
            $("#emailerr").html("请输入正确格式的邮箱地址");
            flag = false;
        }
    }

    if (brand == "")
    {
        $("#divbrand").addClass("has-error");
        $("#branderr").html("请选择品牌信息");
        flag = false;
    }
    if (license == "") {
        $("#divLicense").addClass("has-error");
        $("#errLicense").html("请填写车牌信息");
        flag = false;
    }
  /*  if (system == "") {
        $("#divsystem").addClass("has-error");
        $("#systemerr").html("请选择车系信息");
        flag = false;
    }
    */
    self.unbind("click");
    if(flag)
    {
        var params = {
            Action: "User_T_Add",
            Codeone: encodeURIComponent(codeone),
            ProductCodeone: encodeURIComponent(productCodeone),
            Part: encodeURIComponent(part),
            Name: encodeURIComponent(name),
            Mobile: encodeURIComponent(mobile),
            Email: encodeURIComponent(email),
            Brand: encodeURIComponent(brand),
            System: encodeURIComponent(system),
            Type: encodeURIComponent(type),
            License: encodeURIComponent(license),
            Province: encodeURIComponent(province),
            City: encodeURIComponent(city),
            Price: encodeURIComponent(price),
            ImageList: encodeURIComponent(imagelist),
            MJs: encodeURIComponent(js)
        };
        $.ajax({
            type: "POST",
            url: "../interface/Product.ashx",
            cache: false,
            dataType: "json",
            data: jQuery.param(params, true),
            success: function (msg) {
                if (msg.errorcode == "0") {
                    alert('添加成功');
                    //Reset();
                    location.href = "usertadd.aspx";
                }
                else if (msg.errorcode == "5") {
                    $("#divtfrontcode").addClass('has-error');
                    $("#frontcodeerr").html('产品型号已超出使用范围');
                }
                else if (msg.errorcode == "-10") {
                    alert('无权限');
                }
                else {
                    alert('系统异常，请联系管理员');
                }
                self.click($.UserAdd);
            },
            error: function () {
                self.click($.UserAdd);
        
            }
        });
    }
    else
    {
        self.click($.UserAdd);
    }
}