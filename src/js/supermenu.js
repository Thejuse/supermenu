/*!
 * supermenu
 * supermenu.jseidl.at
 * 
 * Copyright (c) Julian Seidl
 * www.jseidl.at
 * 
 * License: MIT-License
 */

function smClassAdderListItem(){
    $('#supermenu li').each(function(){
        $(this).addClass('sm-list-item');
    });
}
function smClassAdderList(){
    $('#supermenu ul').each(function(){
        $(this).addClass('sm-list');
        if($(this).parent().hasClass('sm-list-item')){
            $(this).parent().addClass('sm-has-submenu');
            $(this).addClass('sm-submenu');
            $(this).parent().prepend('<span class="sm-submenu-toggler" title="Click to Open">Submenu Toggel</span>')
        }
    });
}

function smClassAdderAnchor(){
    $('#supermenu a').each(function(){
        $(this).addClass('sm-list-item-anchor');
    })
}

function smSetWidth(width, position){
    $('#supermenu').width(width);
    if(position == 'right'){
        $('#supermenu').css('right', '-' + width);
    } else {
        $('#supermenu').css('left', '-' + width);
    }
}

function smTrigger(triggerClass, triggerActiveClass, width, position){
    var width = '-' + width;
    $(triggerClass).on('click', function(e){
        e.preventDefault();
        $(triggerClass).stop();
        $('#supermenu').stop();
        if(position == 'right'){
            if($('#supermenu').hasClass(triggerActiveClass)){
                $(triggerClass).removeClass(triggerActiveClass);
                document.getElementById('supermenu').style.right = width;
                $('#supermenu').removeClass(triggerActiveClass);
            } else {
                document.getElementById('supermenu').style.right = "0%";
                $('#supermenu').addClass(triggerActiveClass);
                $(triggerClass).addClass(triggerActiveClass);
            }
        } else {
            if($('#supermenu').hasClass(triggerActiveClass)){
                $(triggerClass).removeClass(triggerActiveClass);
                document.getElementById('supermenu').style.left = width;
                $('#supermenu').removeClass(triggerActiveClass);
            } else {
                document.getElementById('supermenu').style.left = "0%";
                $('#supermenu').addClass(triggerActiveClass);
                $(triggerClass).addClass(triggerActiveClass);
            }
        }
    });
}

function smCloseMenuOnEsc(triggerClass, triggerActiveClass, width, position){
    var width = '-' + width;
    if(position == 'right'){
        if($('#supermenu').hasClass(triggerActiveClass)){
            $(triggerClass).removeClass(triggerActiveClass);
            document.getElementById('supermenu').style.right = width;
            $('#supermenu').removeClass(triggerActiveClass);
        }
    } else {
        if($('#supermenu').hasClass(triggerActiveClass)){
            $(triggerClass).removeClass(triggerActiveClass);
            document.getElementById('supermenu').style.left = width;
            $('#supermenu').removeClass(triggerActiveClass);
        }
    }
}

function smSubMenuAnchor(){
    $('.sm-submenu-toggler').on('click', function(e){
        if($(this).parent().hasClass('sm-opend')){
            $(this).parent().removeClass('sm-opend');
            $(this).parent().find('.sm-submenu').first().slideToggle();
        } else {
            $(this).parent().addClass('sm-opend');
            $(this).parent().find('.sm-submenu').first().slideToggle();
        }
    });
}

function smClassAdder(){
    smClassAdderListItem();
    smClassAdderList();
    smClassAdderAnchor();
}

function smPaddingAdder(menuID, paddingTop, paddingBottom){
    $(menuID).css('padding-top', paddingTop);
    $(menuID).css('padding-bottom', paddingBottom);
}

function smTheme(menuID, theme){
    if(theme == 'custom'){
        $(menuID).addClass('supermenu-custom');
    } else if(theme == 'dark' || theme == 'light'){
        $(menuID).addClass('supermenu-' + theme);
    } else {
        console.log('Theme not supported!');
    }
}

$.fn.supermenu = function(options){
    var smSettings = $.extend({}, $.fn.supermenu.defaults, options);
    smClassAdder();
    $('#supermenu').addClass('sm-init');
    $('#supermenu').addClass('supermenu-' + smSettings.position);
    smTheme('#supermenu', smSettings.theme);
    smSubMenuAnchor();
    smPaddingAdder('#supermenu', smSettings.paddingTop, smSettings.paddingBottom);
    smSetWidth(smSettings.width, smSettings.position);
    smTrigger(smSettings.triggerClass, smSettings.triggerActiveClass, smSettings.width, smSettings.position);
    $(document).keyup(function(e) {
        if (e.key === "Escape") {
            smCloseMenuOnEsc(smSettings.triggerClass, smSettings.triggerActiveClass, smSettings.width, smSettings.position);
       }
    });
};

$.fn.supermenu.defaults = {
    width: '70%',
    theme: 'light',
    position: 'right',
    triggerActiveClass: 'sm-menu-active',
    triggerClass: '.sm-menu-trigger',
    paddingTop: '0',
    paddingBottom: '0'
}