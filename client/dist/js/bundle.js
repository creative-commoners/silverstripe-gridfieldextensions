!function(e){function i(n){if(t[n])return t[n].exports;var a=t[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,i),a.l=!0,a.exports}var t={};i.m=e,i.c=t,i.i=function(e){return e},i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:n})},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,i){return Object.prototype.hasOwnProperty.call(e,i)},i.p="",i(i.s=12)}([function(e,i){e.exports=jQuery},function(e,i){e.exports=Injector},function(e,i){e.exports=React},function(e,i,t){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var n=t(0);t.n(n).a.entwine("ss",function(e){e(".add-existing-search-dialog").entwine({loadDialog:function(e){var i=this.addClass("loading").children(".ui-dialog-content").empty();e.done(function(e){i.html(e).parent().removeClass("loading")})}}),e(".ss-gridfield .add-existing-search").entwine({onclick:function(){var i=e("<div></div>").appendTo("body").dialog({modal:!0,resizable:!1,width:500,height:600,close:function(){e(this).dialog("destroy").remove()}});return i.parent().addClass("add-existing-search-dialog").loadDialog(e.get(this.prop("href"))),i.data("grid",this.closest(".ss-gridfield")),!1}}),e(".add-existing-search-dialog .add-existing-search-form").entwine({onsubmit:function(){return this.closest(".add-existing-search-dialog").loadDialog(e.get(this.prop("action"),this.serialize())),!1}}),e(".add-existing-search-dialog .add-existing-search-items a").entwine({onclick:function(){var i=this.closest(".add-existing-search-items").data("add-link"),t=this.data("id"),n=this.closest(".add-existing-search-dialog").addClass("loading").children(".ui-dialog-content").empty();return e.post(i,{id:t},function(){n.data("grid").reload(),n.dialog("close")}),!1}}),e(".add-existing-search-dialog .add-existing-search-pagination a").entwine({onclick:function(){return this.closest(".add-existing-search-dialog").loadDialog(e.get(this.prop("href"))),!1}})})},function(e,i,t){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var n=t(0),a=t.n(n),d=t(15),s=t.n(d);a.a.entwine("ss",function(e){e(".ss-gridfield.ss-gridfield-editable").entwine({reload:function(i,t){var n=this,a=[],d=0;n.find("tbody:first .ss-gridfield-item").each(function(){e(this).is(".ss-gridfield-inline-new")&&a.push({index:d,row:e(this).detach()}),d++}),this._super(i,function(){var i=n.find("tbody:first");e.each(a,function(e,t){var a=t.row,d=t.index,s=void 0;0===d?i.prepend(a):(s=i.find(".ss-gridfield-item:nth-child("+d+")"),s.length?s.after(a):i.append(a)),n.find("tbody:first").children(".ss-gridfield-no-items").hide()}),t&&t.apply(n,arguments)})},onpaste:function(i){var t=void 0!==i.originalEvent.clipboardData?i.originalEvent.clipboardData:null;if(t){var n=e(i.target),a=n.attr("type");if("text"===a||"email"===a){var d=this.find(".ss-gridfield-inline-new:last").find("input");if("text"===n.attr("type")&&n.is(d)&&""===n.val()){var s=n.parent().attr("class"),r=t.getData("text/plain").match(/[^\r\n]+/g),o=r.length;if(o>1){for(var l=[],c=1;c<o;++c){this.trigger("addnewinline");var u=this.find(".ss-gridfield-inline-new:last"),f=u.find("."+s).find("input");f.val(r[c]),l.push(f)}n.data("pasteManipulatedElements",l),setTimeout(function(){n.val(r[0])},0)}}}}},onkeyup:function(i){if(90==i.keyCode&&i.ctrlKey){var t=e(i.target),n=t.data("pasteManipulatedElements");if(void 0!==n&&n&&n.length){for(var a=0;a<n.length;++a)n[a].closest("tr").remove();t.data("pasteManipulatedElements",[])}}},onaddnewinline:function(i){if(i.target==this[0]){var t=window.tmpl,n=this.find(".ss-gridfield-add-inline-template:last"),a=this.data("add-inline-num")||1;t.cache[this[0].id+"ss-gridfield-add-inline-template"]=t(n.html()),this.find("tbody:first").append(t(this[0].id+"ss-gridfield-add-inline-template",{num:a})),this.find("tbody:first").children(".ss-gridfield-no-items").hide(),this.data("add-inline-num",a+1),e(".ss-gridfield-orderable tbody").rebuildSort()}}}),e(".ss-gridfield-add-new-inline").entwine({onclick:function(){return this.getGridField().trigger("addnewinline"),!1}}),e(".ss-gridfield-delete-inline").entwine({onclick:function(){var e=s.a._t("GridFieldExtensions.CONFIRMDEL","Are you sure you want to delete this?");return confirm(e)&&this.parents("tr.ss-gridfield-inline-new:first").remove(),!1}})})},function(e,i,t){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var n=t(0);t.n(n).a.entwine("ss",function(e){e(".ss-gridfield-add-new-multi-class .btn__addnewmulticlass").entwine({onclick:function(){var e=this.data("href"),i=this.parents(".ss-gridfield-add-new-multi-class").find("select").val();return i&&i.length&&this.getGridField().showDetailView(e.replace("{class}",encodeURI(i))),!1}}),e(".ss-gridfield-add-new-multi-class select").entwine({onadd:function(){this.update()},onchange:function(){this.update()},update:function(){var e=this.parents(".ss-gridfield-add-new-multi-class").find("[data-add-multiclass]");this.val()&&this.val().length?e.removeClass("disabled"):e.addClass("disabled")}})})},function(e,i,t){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var n=t(0);t.n(n).a.entwine("ss",function(e){e(".ss-gridfield-configurable-paginator .pagination-page-size-select").entwine({onchange:function(){this.parent().find(".ss-gridfield-pagesize-submit").trigger("click")}})})},function(e,i,t){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var n=t(0);t.n(n).a.entwine("ss",function(e){e(".grid-field .ss-gridfield-item").entwine({onclick:function(e){this.find(".editable-column-field").length&&e.stopPropagation()}})})},function(e,i){},function(e,i,t){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var n=t(0);t.n(n).a.entwine("ss",function(e){e(".ss-gridfield-orderable tbody").entwine({rebuildSort:function(){var i=this.getGridField(),t=null;i.getItems().each(function(){var i=e(this).find(".ss-orderable-hidden-sort");if(i.length){var n=i.val();null===t&&n>0?t=n:n>0&&(t=Math.min(t,n))}}),t=Math.max(1,t);var n=t;i.getItems().each(function(){var i=e(this).find(".ss-orderable-hidden-sort");i.length&&(i.val(n),n++)})},onadd:function(){var i=this,t=function(e,i){return i.clone().addClass("ss-gridfield-orderhelper").width("auto").find(".col-buttons").remove().end()},n=function(t,n){var a=!0;void 0!=n&&n.item.hasClass("ss-gridfield-inline-new")&&(a=!1),i.rebuildSort();var d=i.getGridField();d.data("immediate-update")&&a?d.reload({url:d.data("url-reorder")}):e(".cms-edit-form").addClass("changed")};this.sortable({handle:".handle",helper:t,opacity:.7,update:n})},onremove:function(){this.data("sortable")&&this.sortable("destroy")}}),e(".ss-gridfield-orderable .ss-gridfield-previouspage, .ss-gridfield-orderable .ss-gridfield-nextpage").entwine({onadd:function(){var i=this.getGridField();if(this.is(":disabled"))return!1;var t=function(t,n){var a=void 0;a=e(this).hasClass("ss-gridfield-previouspage")?"prev":"next",i.find("tbody").sortable("cancel"),i.reload({url:i.data("url-movetopage"),data:[{name:"move[id]",value:n.draggable.data("id")},{name:"move[page]",value:a}]})};this.droppable({accept:".ss-gridfield-item",activeClass:"ui-droppable-active ui-state-highlight",disabled:this.prop("disabled"),drop:t,tolerance:"pointer"})},onremove:function(){this.hasClass("ui-droppable")&&this.droppable("destroy")}})})},function(e,i,t){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var n=t(0),a=t.n(n),d=t(2),s=t.n(d),r=t(14),o=t.n(r),l=t(1),c=(t.n(l),t(13)),u=t.i(l.provideInjector)(c.a);a.a.entwine("ss",function(e){e(".js-injector-boot .ss-gridfield .meatball-menu__container").entwine({onmatch:function(){this.drawMeatballs()},getItemId:function(){return this.closest(".ss-gridfield-item").data("id")},drawMeatballs:function(){o.a.render(s.a.createElement(u,{id:"meatball-menu_"+this.getItemId()},s.a.createElement("a",{className:"btn btn-secondary"},"A thing"),s.a.createElement("div",{className:"dropdown-divider"}),s.a.createElement("a",{className:"btn btn-secondary"},"A thing"),s.a.createElement("a",{className:"btn btn-secondary"},"A thing")),this.get(0))}})})},function(e,i,t){var n;!function(a){"use strict";var d=function e(i,t){var n=/[^\-\w]/.test(i)?new Function(e.arg,("var _s=''"+e.helper+";_s+='"+i.replace(e.regexp,e.func)+"';return _s;").split("_s+='';").join("")):e.cache[i]=e.cache[i]||e(e.load(i));return n.tmpl=n.tmpl||e,t?n(t):n};d.cache={},d.load=function(e){return document.getElementById(e).innerHTML},d.regexp=/(\s+)|('|\\)(?![^%]*%\})|(?:\{%(=|#)(.+?)%\})|(\{%)|(%\})/g,d.func=function(e,i,t,n,a,d,s,r,o){return i?r&&r+e.length!==o.length?" ":"":t?"\\"+e:n?"="===n?"'+_e("+a+")+'":"'+("+a+"||'')+'":d?"';":s?"_s+='":void 0},d.encReg=/[<>&"\x00]/g,d.encMap={"<":"&lt;",">":"&gt;","&":"&amp;",'"':"&quot;","\0":""},d.encode=function(e){return String(e||"").replace(d.encReg,function(e){return d.encMap[e]})},d.arg="o",d.helper=",_t=arguments.callee.tmpl,_e=_t.encode,print=function(s,e){_s+=e&&(s||'')||_e(s);},include=function(s,d){_s+=_t(s,d);}",void 0!==(n=function(){return d}.call(i,t,i,e))&&(e.exports=n)}()},function(e,i,t){t(11),t(3),t(4),t(5),t(6),t(7),t(8),t(9),t(10)},function(e,i,t){"use strict";var n=t(1),a=(t.n(n),t(2)),d=t.n(a),s=function(e){var i=e.PopoverField,t=e.id,n=e.children;return d.a.createElement(i,{id:t,buttonSize:"sm",data:{placement:"bottom"},className:"mr-0"},n)};s.propTypes={id:a.PropTypes.string.isRequired,PopoverField:a.PropTypes.oneOfType([a.PropTypes.node,a.PropTypes.func])},s.defaultProps={id:"",PopoverField:null},i.a=t.i(n.inject)(["PopoverField"],function(e){return{PopoverField:e}},function(){return"Meatballs"})(s)},function(e,i){e.exports=ReactDom},function(e,i){e.exports=i18n}]);