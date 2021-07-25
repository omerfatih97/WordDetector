$(document).ready(function () {
    $.validator.methods.date = function (value, element) {
        return this.optional(element) || $.datepicker.parseDate('dd/MM/yyyy', value);
    }

    jQuery.extend(jQuery.validator.messages, {
        required: jQuery.validator.format("Girilmesi Zorunlu alan."),
        remote: "Lütfen bu alanı düzeltiniz.",
        email: "Lütfen doğru e-posta adresi giriniz.",
        url: "Lütfen doğru URL adresi giriniz.",
        date: "Lütfen doğru tarih değeri giriniz.",
        dateISO: "Lütfen doğru tarih değeri giriniz.",
        number: "Lütfen doğru sayıyı giriniz.",
        digits: "Lütfen yalnız sayı giriniz.",
        creditcard: "Lütfen doğru kredi kartı değeri giriniz.",
        equalTo: "Tekrar aynı değeri giriniz.",
        accept: "Lütfen geçerli bir değer giriniz.",
        maxlength: jQuery.validator.format("En fazla {0} karakter girilebilir."),
        minlength: jQuery.validator.format("En az {0} karakter girilmelidir."),
        rangelength: jQuery.validator.format("Girilecek değer uzunlugu {0} ile {1} arasında olmalıdır."),
        range: jQuery.validator.format("Girilecek Değer {0} ile {1} arasında olmalıdır."),
        max: jQuery.validator.format("Girilecek Sayı {0}'dan Büyük Olamaz."),
        min: jQuery.validator.format("Girilecek Sayı {0}'den Küçük Olamaz.")
    });




});

//(function ($) {
//    $.extend($.validator.messages, {
//        required: jQuery.validator.format("Girilmesi Zorunlu alan."),
//        remote: "Lütfen bu Alanı düzeltiniz.",
//        email: "Lütfen doğru email adresi giriniz.",
//        url: "Lütfen Doğru URL adresi giriniz.",
//        date: "Lütfen Dogru Tarih değeri giriniz.",
//        dateISO: "Lütfen Dogru Tarih değeri giriniz.",
//        number: "Lütfen Doğru sayıyı giriniz.",
//        digits: "Lütfen yanlız sayı giriniz.",
//        creditcard: "Lütfen Dogru Kredi Kartı değeri giriniz.",
//        equalTo: "Tekrar aynı değeri giriniz.",
//        accept: "Lütfen geçerli bir değer giriniz.",
//        maxlength: jQuery.validator.format("En fazla {0} karakter girilebilir."),
//        minlength: jQuery.validator.format("En az {0} karakter girilmelidir."),
//        rangelength: jQuery.validator.format("Girilicek değer uzunlugu {0} ile {1} arasında olmalıdır."),
//        range: jQuery.validator.format("Girilicek Değer {0} ile {1} arasında olmalıdır."),
//        max: jQuery.validator.format("Girilicek Sayı {0}'dan Büyük Olamaz."),
//        min: jQuery.validator.format("Girilicek Sayı {0}'den Küçük Olamaz.")
//    });
//}(jQuery));
$.validator.methods.number = function (value, element) {
    return this.optional(element) ||
        !isNaN(Globalize.parseFloat(value, 10, "tr-TR"));
}

$.validator.methods.date = function (value, element) {
    return this.optional(element) ||
        Globalize.parseDate(value, "dd-MM-yyyy", "tr-TR") ||
        Globalize.parseDate(value, "dd.MM.yyyy", "tr-TR") ||
        Globalize.parseDate(value, "dd/MM/yyyy", "tr-TR");

}

jQuery.extend(jQuery.validator.methods, {
    range: function (value, element, param) {
        //Use the Globalization plugin to parse the value
        var val = Globalize.parseFloat(value, 10, "tr-TR");
        return this.optional(element) || (
            val >= param[0] && val <= param[1]);
    }
});

jQuery.validator.addMethod("TCK", function (value, element) {
    return this.optional(element) || TCKimlikNoValidation(value);
}, "Geçersiz TC Kimlik Numarası");

jQuery.validator.addMethod("VNO", function (value, element) {
    return this.optional(element) || VergiNoValidation(value);
}, "Geçersiz Vergi Numarası");


function displayError(jqXHR) {
    if (jqXHR.status === 887) {
        location.reload();
        return;
    }
    var errorMessage = jqXHR.responseText;
    var obj = jQuery.parseJSON(errorMessage);
    if (obj != null) {
        if (typeof obj == 'object') {
            //json
            if (obj.MessageDetail)
                OpenAlertNotifie('notifyDiv', 'OlmayanDiv', obj.MessageDetail);
            else
                OpenAlertNotifie('notifyDiv', 'OlmayanDiv', errorMessage);
        }
        else
            OpenAlertNotifie('notifyDiv', 'OlmayanDiv', errorMessage);
    }
    else {
        if (errorMessage != "")
            OpenAlertNotifie('notifyDiv', 'OlmayanDiv', errorMessage);
    }


}

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode != 46 && charCode > 31
      && (charCode < 48 || charCode > 57))
        return false;

    return true;
}
function isNumberKeyAndMinus(evt, source) {

    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode != 46 && charCode != 45 && charCode > 31
      && (charCode < 48 || charCode > 57))
        return false;

    return true;
}
function menuCollapsedElapsed() {
    $('#menudetail').fadeToggle(0);

    if ($("#menushowhidebutton").hasClass('menuElapsed')) {
        $("#menushowhidebutton").removeClass("menuElapsed");
        $("#menushowhidebutton").addClass("menuCollapsed");
        $('#maincontent').css("padding-left", "36px");
    }

    else if ($("#menushowhidebutton").hasClass('menuCollapsed')) {
        $("#menushowhidebutton").removeClass("menuCollapsed");
        $("#menushowhidebutton").addClass("menuElapsed");
        $('#maincontent').css("padding-left", "246px");
    }

    set_mainContentWidth();
}

function set_mainContentWidth() {

}

$(document).mouseup(function (e) {
    var container = $("#menuwrapper");
    if (!container.is(e.target)
        && container.has(e.target).length === 0 && !$("#menushowhidebutton").is(e.target)) {
        if ($("#menushowhidebutton").hasClass('menuElapsed'))
            menuCollapsedElapsed();
    }
});

window.onresize = function (event) {
    set_mainContentWidth();
};
function onGridError(e) {
    //var obj = jQuery.parseJSON(e.XMLHttpRequest.responseText);
    var obj = e.XMLHttpRequest;
    e.preventDefault();
    $("#divLoading").hide();
    displayError(obj);
    //OpenAlertNotifie('notifyDiv', 'OlmayanDiv', obj.MessageDetail);
}

function OpenAlertNotifie(notifyDiv, contentDiv, mes) {
    $("#" + contentDiv).html("");
    $('.alert').hide();
    $('#main').animate({ 'padding-top': '40px' }, 50, "easeInQuint");
    $("#" + notifyDiv).html("<div class=\"alert alert-danger\">" +
         "<a class=\"close\" onclick=\"notifyCloser()\">×</a> " +
       "<strong><span class='glyphicon glyphicon-remove'></span> " + mes + "</strong></div>");
}
function OpenSuccessNotifie(notifyDiv, contentDiv, mes) {
    $("#" + contentDiv).html("");
    $('.alert').hide()
    $('#main').animate({ 'padding-top': '40px' }, 50, "easeInQuint");
    $("#" + notifyDiv).html("<div class=\"alert alert-success\">" +
       "<a class=\"close\" onclick=\"notifyCloser()\">×</a> " +
       "<strong><span class='glyphicon glyphicon-ok'></span> " + mes + "</strong></div>");
}
function OpenInfoNotifie(notifyDiv, contentDiv, mes) {
    $("#" + contentDiv).html("");
    $('.alert').hide()
    $('#main').animate({ 'padding-top': '40px' }, 50, "easeInQuint");
    $("#" + notifyDiv).html("<div class=\"alert alert-info\">" +
        "<a class=\"close\" onclick=\"notifyCloser()\">×</a> " +
       "<strong><span class='glyphicon glyphicon-info-sign'></span> " + mes + " </strong></div>");
}

function OpenWarningNotifie(notifyDiv, contentDiv, mes) {
    $("#" + contentDiv).html("");
    $('.alert').hide()
    $('#main').animate({ 'padding-top': '40px' }, 50, "easeInQuint");
    $("#" + notifyDiv).html("<div class=\"alert alert-warning\">" +
      "<a class=\"close\" onclick=\"notifyCloser()\">×</a> " +
       "<strong><span class='glyphicon glyphicon-alert'></span> " + mes + "</strong></div>");

}

$("#divLoading").bind("delayshow", function (event, timeout) {
    var $self = $(this);
    $self.data('timeout', setTimeout(function () {
        $self.show();
    }, timeout));
}).bind("delayhide", function (event) {
    var $self = $(this);
    clearTimeout($self.hide().data('timeout'));
});



function onajaxFormBegin(jqXHR) {

    if ($(".t-loading").length) {
        jqXHR.abort();
        $("#divLoading").trigger('delayhide');
        alert("Lütfen tabloların yüklenmesini bekleyip tekrar deneyiniz.");
        return;
    }


    $('.alert').hide();
    $("#divLoading").trigger('delayshow', 20);
    $('#main').animate({ 'padding-top': '20px' }, 100, "easeInQuint");

}
function onajaxFormComplete() {

  
    $("#divLoading").trigger('delayhide');

}


function notifyCloser() {
    $('.alert').hide();
    $('#main').animate({ 'padding-top': '20px' }, 100, "easeInQuint");
}

function addLeadingZeros(sNum, len) {
    len -= sNum.length;
    if (len <= 0) {
        return sNum;
    }
    while (len--) sNum = '0' + sNum;
    return sNum;
}

function TCKimlikNoValidation(tckn) {

    if (tckn == '')
        return true;
    KimlikNo = String(tckn);
    if (!KimlikNo.match(/^[0-9]{11}$/)) {
        return false;
    }
    pr1 = parseInt(KimlikNo.substr(0, 1));
    pr2 = parseInt(KimlikNo.substr(1, 1));
    pr3 = parseInt(KimlikNo.substr(2, 1));
    pr4 = parseInt(KimlikNo.substr(3, 1));
    pr5 = parseInt(KimlikNo.substr(4, 1));
    pr6 = parseInt(KimlikNo.substr(5, 1));
    pr7 = parseInt(KimlikNo.substr(6, 1));
    pr8 = parseInt(KimlikNo.substr(7, 1));
    pr9 = parseInt(KimlikNo.substr(8, 1));
    pr10 = parseInt(KimlikNo.substr(9, 1));
    pr11 = parseInt(KimlikNo.substr(10, 1));

    if ((pr1 + pr3 + pr5 + pr7 + pr9 + pr2 + pr4 + pr6 + pr8 + pr10) % 10 != pr11) {
        return false;
    }
    if (((pr1 + pr3 + pr5 + pr7 + pr9) * 7 + (pr2 + pr4 + pr6 + pr8) * 9) % 10 != pr10) {
        return false;
    }
    if (((pr1 + pr3 + pr5 + pr7 + pr9) * 8) % 10 != pr11) {
        return false;
    }
    return true;
}

function VergiNoValidation(kno) {
    if (kno == '')
        return true;

    KimlikNo = String(kno);
    if (!KimlikNo.match(/^[0-9]{10}$/)) {
        return false;
    }

    if (kno.length == 10) {

        v1 = (Number(kno.charAt(0)) + 9) % 10;
        v2 = (Number(kno.charAt(1)) + 8) % 10;
        v3 = (Number(kno.charAt(2)) + 7) % 10;
        v4 = (Number(kno.charAt(3)) + 6) % 10;
        v5 = (Number(kno.charAt(4)) + 5) % 10;
        v6 = (Number(kno.charAt(5)) + 4) % 10;
        v7 = (Number(kno.charAt(6)) + 3) % 10;
        v8 = (Number(kno.charAt(7)) + 2) % 10;
        v9 = (Number(kno.charAt(8)) + 1) % 10;
        v_last_digit = Number(kno.charAt(9));

        v11 = (v1 * 512) % 9;
        v22 = (v2 * 256) % 9;
        v33 = (v3 * 128) % 9;
        v44 = (v4 * 64) % 9;
        v55 = (v5 * 32) % 9;
        v66 = (v6 * 16) % 9;
        v77 = (v7 * 8) % 9;
        v88 = (v8 * 4) % 9;
        v99 = (v9 * 2) % 9;

        if (v1 != 0 && v11 == 0) v11 = 9;
        if (v2 != 0 && v22 == 0) v22 = 9;
        if (v3 != 0 && v33 == 0) v33 = 9;
        if (v4 != 0 && v44 == 0) v44 = 9;
        if (v5 != 0 && v55 == 0) v55 = 9;
        if (v6 != 0 && v66 == 0) v66 = 9;
        if (v7 != 0 && v77 == 0) v77 = 9;
        if (v8 != 0 && v88 == 0) v88 = 9;
        if (v9 != 0 && v99 == 0) v99 = 9;
        toplam = v11 + v22 + v33 + v44 + v55 + v66 + v77 + v88 + v99;


        if (toplam % 10 == 0) toplam = 0;
        else toplam = (10 - (toplam % 10));

        if (toplam == v_last_digit) {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}


function ShowInfoV2(kod, title) {
       
    $.ajax('/Admin/GetBilgiEkrani/', {
        type: 'POST', 
        data: { kod: kod }, 
        success: function (data, status, xhr) {
            debugger;
            if (data.role == 0) {
                var thkWindowElement = $('#ErrorWindow');
                thkWindowElement.data('tWindow').content(data.bilgi);
                thkWindowElement.find('.t-window-content').height(data.height);
                thkWindowElement.find('.t-window-content').width(data.with);
                thkWindowElement.data('tWindow').title(title);
                thkWindowElement.data('tWindow').center().open();
            }
            else {
                $.ajax('/Admin/GetBilgiEkraniAdmin/', {
                    type: 'POST',
                    data: { kod: kod },
                    success: function (data1, status1, xhr1) {
                        var thkWindowElement = $('#ErrorWindow');
                        thkWindowElement.find('.t-window-content').height(600);
                        thkWindowElement.find('.t-window-content').width(900);
                        thkWindowElement.data('tWindow').title(title);
                        thkWindowElement.data('tWindow').content(data1);
                        thkWindowElement.data('tWindow').center().open();
                    }
                });
            }

        }
    });





}

