'usw strict'

const screenWidth = screen.width;
const consultationButton = document.querySelector('.consultation__button');
const aboutCompanyDescription = document.querySelector('.about-company__container')
const phone = document.querySelector('#phone')

if (screenWidth < 767) {
  consultationButton.textContent = `бесплатная консультация`
}

if (screenWidth < 1023) {
  aboutCompanyDescription.textContent = `..`
}

function setCursorPosition(pos, elem) {
    elem.focus();
    if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);
    else if (elem.createTextRange) {
        var range = elem.createTextRange();
        range.collapse(true);
        range.moveEnd("character", pos);
        range.moveStart("character", pos);
        range.select()
    }
}
 
function mask(event) {
    if (this.selectionStart < 3) event.preventDefault();
    var matrix = "+7 (___) ___ ____",
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, "");
 
    if (def.length >= val.length) val = def;
    this.value = matrix.replace(/[_\d]/g, function(a) {
        return  i < val.length ? val.charAt(i++) :  a
    });
    i = this.value.indexOf("_");
    if(event.keyCode == 8) i = this.value.lastIndexOf(val.substr(-1))+1;
    if (i != -1) {
    i < 5 && (i = 3);
    this.value = this.value.slice(0,i);
    }
    if (event.type == "blur") {
        if (this.value.length < 5) this.value = ""
    } else setCursorPosition(this.value.length, this);

};

phone.addEventListener("input", mask, false);
phone.addEventListener("focus", mask, false);
phone.addEventListener("blur", mask, false);
phone.addEventListener("keydown", mask, false);
