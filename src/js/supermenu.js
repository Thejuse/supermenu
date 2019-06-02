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
        }
    });
}
function smClassAdderAnchor(){
    $('#supermenu a').each(function(){
        $(this).addClass('sm-list-item-anchor');
    })
}

function smClassAdder(){
    smClassAdderListItem();
    smClassAdderList();
    smClassAdderAnchor();
}

function smInit(menuID){
    smClassAdder();
    $(menuID).addClass('sm-init');
}

$.fn.supermenu = function(options){
    smInit('#supermenu');
    var smSettings = $.extend({}, $.fn.supermenu.defaults, options);

};

$.fn.supermenu.defaults = {
    width: 70,
    theme: 'light',
    position: 'right'
}