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

function smPaddingMarginAdder(menuID, padding, margin){
    $(menuID).css('padding-top', padding.top);
    $(menuID).css('padding-bottom', padding.bottom);

    $(menuID).css('margin-top', margin.top);
    $(menuID).css('margin-bottom', margin.bottom);
}

function smThemeAddon(menuID, theme){
    if(theme == 'custom'){
        $(menuID).addClass('supermenu-custom');
    } else if(theme == 'dark' || theme == 'light'){
        $(menuID).addClass('supermenu-' + theme);
    } else {
        console.log('Theme not supported!');
    }
}

function smTitleAddon(title){
    $('#supermenu').addClass('sm-has-title');
    $('.sm-list-item').first().prepend('<li class="sm-title sm-list-item">' + title + '</li>');
}

function smFooterAddon(footerCustomCode){
    $('#supermenu').addClass('sm-has-footer');
    var footercode = '<div class="sm-footer">' + footerCustomCode + '</div>';
    $('#supermenu').append(footercode);
    smHeightSetter();
}

function smHeightSetter(){
    var height = $('.sm-footer').outerHeight();
    $('.sm-list').first().css('height', 'calc(100vh - ' + height + 'px');
}

$.fn.supermenu = function(options){
    var smSettings = $.extend({}, $.fn.supermenu.defaults, options);
    smClassAdder();
    $('#supermenu').addClass('sm-init');
    $('#supermenu').addClass('supermenu-' + smSettings.position);
    smSubMenuAnchor();
    smPaddingMarginAdder('#supermenu', smSettings.padding, smSettings.margin);
    smSetWidth(smSettings.width, smSettings.position);
    smTrigger(smSettings.triggerClass, smSettings.triggerActiveClass, smSettings.width, smSettings.position);
    $(document).keyup(function(e) {
        if (e.key === "Escape") {
            smCloseMenuOnEsc(smSettings.triggerClass, smSettings.triggerActiveClass, smSettings.width, smSettings.position);
       }
    });
    // AddOns
    if(smSettings.theme){
        smThemeAddon('#supermenu', smSettings.theme);
    }
    if(smSettings.title){
        smTitleAddon(smSettings.title);
    }
    if(smSettings.footer){
        smFooterAddon(smSettings.footer);
    }
};

$.fn.supermenu.defaults = {
    width: '70%',
    theme: 'light',
    position: 'right',
    triggerActiveClass: 'sm-menu-active',
    triggerClass: '.sm-menu-trigger',
    padding: {
        top: '0',
        bottom: '0'
    },
    margin: {
        top: '0',
        bottom: '0'
    },
    title: '',
    footer: ''
}