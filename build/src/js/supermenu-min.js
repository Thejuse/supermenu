function smClassAdderListItem(){$("#supermenu li").each(function(){$(this).addClass("sm-list-item")})}function smClassAdderList(){$("#supermenu ul").each(function(){$(this).addClass("sm-list"),$(this).parent().hasClass("sm-list-item")&&($(this).parent().addClass("sm-has-submenu"),$(this).addClass("sm-submenu"))})}function smClassAdderAnchor(){$("#supermenu a").each(function(){$(this).addClass("sm-list-item-anchor")})}function smSetWidth(s,e){$("#supermenu").width(s),"right"==e?$("#supermenu").css("right","-"+s):$("#supermenu").css("left","-"+s)}function smTrigger(s,e,t,n){t="-"+t;console.log(t),$(s).on("click",function(u){console.log("Test"),u.preventDefault(),$(s).stop(),$("#supermenu").stop(),"right"==n?$("#supermenu").hasClass(e)?($(s).removeClass(e),document.getElementById("supermenu").style.right=t,$("#supermenu").removeClass(e)):(document.getElementById("supermenu").style.right="0%",$("#supermenu").addClass(e),$(s).addClass(e)):$("#supermenu").hasClass(e)?($(s).removeClass(e),document.getElementById("supermenu").style.left=t,$("#supermenu").removeClass(e)):(document.getElementById("supermenu").style.left="0%",$("#supermenu").addClass(e),$(s).addClass(e))})}function smClassAdder(){smClassAdderListItem(),smClassAdderList(),smClassAdderAnchor()}function smInit(s){smClassAdder(),$(s).addClass("sm-init")}$.fn.supermenu=function(s){var e=$.extend({},$.fn.supermenu.defaults,s);smInit("#supermenu"),smSetWidth(e.width,e.position),smTrigger(e.triggerClass,e.triggerActiveClass,e.width,e.position)},$.fn.supermenu.defaults={width:"70%",theme:"light",position:"right",triggerActiveClass:"sm-menu-active",triggerClass:".sm-menu-trigger"};