$(document).ready(function () {
    $.validator.methods.date = function (value, element) {
        return this.optional(element) || $.datepicker.parseDate('dd/MM/yyyy', value);
    }
});