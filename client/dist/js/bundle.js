/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = Injector;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dom__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lib_Injector__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lib_Injector___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_lib_Injector__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_components_Meatballs__ = __webpack_require__(6);






var InjectedMeatballs = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_lib_Injector__["provideInjector"])(__WEBPACK_IMPORTED_MODULE_4_components_Meatballs__["a" /* default */]);

__WEBPACK_IMPORTED_MODULE_0_jquery___default.a.entwine('ss', function ($) {
  $('.js-injector-boot .ss-gridfield .meatball-menu__container').entwine({
    onmatch: function onmatch() {
      this.drawMeatballs();
    },
    getItemId: function getItemId() {
      return this.closest('.ss-gridfield-item').data('id');
    },
    drawMeatballs: function drawMeatballs() {
      __WEBPACK_IMPORTED_MODULE_2_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
        InjectedMeatballs,
        { id: 'meatball-menu_' + this.getItemId() },
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
          'a',
          { className: 'btn btn-secondary' },
          'A thing'
        ),
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement('div', { className: 'dropdown-divider' }),
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
          'a',
          { className: 'btn btn-secondary' },
          'A thing'
        ),
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
          'a',
          { className: 'btn btn-secondary' },
          'A thing'
        )
      ), this.get(0));
    }
  });
});

/***/ }),
/* 3 */
/***/ (function(module, exports) {

(function ($) {
	$.entwine("ss", function ($) {

		$(".add-existing-search-dialog").entwine({
			loadDialog: function loadDialog(deferred) {
				var dialog = this.addClass("loading").children(".ui-dialog-content").empty();

				deferred.done(function (data) {
					dialog.html(data).parent().removeClass("loading");
				});
			}
		});

		$(".ss-gridfield .add-existing-search").entwine({
			onclick: function onclick() {
				var dialog = $("<div></div>").appendTo("body").dialog({
					modal: true,
					resizable: false,
					width: 500,
					height: 600,
					close: function close() {
						$(this).dialog("destroy").remove();
					}
				});

				dialog.parent().addClass("add-existing-search-dialog").loadDialog($.get(this.prop("href")));
				dialog.data("grid", this.closest(".ss-gridfield"));

				return false;
			}
		});

		$(".add-existing-search-dialog .add-existing-search-form").entwine({
			onsubmit: function onsubmit() {
				this.closest(".add-existing-search-dialog").loadDialog($.get(this.prop("action"), this.serialize()));
				return false;
			}
		});

		$(".add-existing-search-dialog .add-existing-search-items a").entwine({
			onclick: function onclick() {
				var link = this.closest(".add-existing-search-items").data("add-link");
				var id = this.data("id");

				var dialog = this.closest(".add-existing-search-dialog").addClass("loading").children(".ui-dialog-content").empty();

				$.post(link, { id: id }, function () {
					dialog.data("grid").reload();
					dialog.dialog("close");
				});

				return false;
			}
		});

		$(".add-existing-search-dialog .add-existing-search-pagination a").entwine({
			onclick: function onclick() {
				this.closest(".add-existing-search-dialog").loadDialog($.get(this.prop("href")));
				return false;
			}
		});

		$(".ss-gridfield.ss-gridfield-editable").entwine({
			reload: function reload(opts, success) {
				var grid = this;

				var added = [];
				var index = 0;
				grid.find("tbody:first .ss-gridfield-item").each(function () {
					if ($(this).is(".ss-gridfield-inline-new")) {
						added.push({
							'index': index,
							'row': $(this).detach()
						});
					}
					index++;
				});

				this._super(opts, function () {
					var body = grid.find("tbody:first");
					$.each(added, function (i, item) {
						var row = item['row'],
						    index = item['index'],
						    replaces;

						if (index === 0) {
							body.prepend(row);
						} else {
							replaces = body.find('.ss-gridfield-item:nth-child(' + index + ')');
							if (replaces.length) {
								replaces.after(row);
							} else {
								body.append(row);
							}
						}
						grid.find("tbody:first").children(".ss-gridfield-no-items").hide();
					});

					if (success) success.apply(grid, arguments);
				});
			},
			onpaste: function onpaste(e) {
				var clipboardData = typeof e.originalEvent.clipboardData !== "undefined" ? e.originalEvent.clipboardData : null;
				if (clipboardData) {
					var input = $(e.target);
					var inputType = input.attr('type');
					if (inputType === 'text' || inputType === 'email') {
						var lastInput = this.find(".ss-gridfield-inline-new:last").find("input");
						if (input.attr('type') === 'text' && input.is(lastInput) && input.val() === '') {
							var inputWrapperDivClass = input.parent().attr('class');

							var lines = clipboardData.getData("text/plain").match(/[^\r\n]+/g);
							var linesLength = lines.length;

							if (linesLength > 1) {
								var elementsChanged = [];
								for (var i = 1; i < linesLength; ++i) {
									this.trigger("addnewinline");
									var row = this.find(".ss-gridfield-inline-new:last");
									var rowInput = row.find("." + inputWrapperDivClass).find("input");
									rowInput.val(lines[i]);
									elementsChanged.push(rowInput);
								}

								input.data('pasteManipulatedElements', elementsChanged);

								setTimeout(function () {
									input.val(lines[0]);
								}, 0);
							}
						}
					}
				}
			},
			onkeyup: function onkeyup(e) {
				if (e.keyCode == 90 && e.ctrlKey) {
					var target = $(e.target);
					var elementsChanged = target.data("pasteManipulatedElements");
					if (typeof elementsChanged !== "undefined" && elementsChanged && elementsChanged.length) {
						for (var i = 0; i < elementsChanged.length; ++i) {
							elementsChanged[i].closest('tr').remove();
						}
						target.data("pasteManipulatedElements", []);
					}
				}
			},
			onaddnewinline: function onaddnewinline(e) {
				if (e.target != this[0]) {
					return;
				}

				var tmpl = window.tmpl;
				var row = this.find(".ss-gridfield-add-inline-template:last");
				var num = this.data("add-inline-num") || 1;

				tmpl.cache[this[0].id + "ss-gridfield-add-inline-template"] = tmpl(row.html());

				this.find("tbody:first").append(tmpl(this[0].id + "ss-gridfield-add-inline-template", { num: num }));
				this.find("tbody:first").children(".ss-gridfield-no-items").hide();
				this.data("add-inline-num", num + 1);

				$(".ss-gridfield-orderable tbody").rebuildSort();
			}
		});

		$(".ss-gridfield-add-new-inline").entwine({
			onclick: function onclick() {
				this.getGridField().trigger("addnewinline");
				return false;
			}
		});

		$(".ss-gridfield-delete-inline").entwine({
			onclick: function onclick() {
				var msg = ss.i18n._t("GridFieldExtensions.CONFIRMDEL", "Are you sure you want to delete this?");

				if (confirm(msg)) {
					this.parents("tr.ss-gridfield-inline-new:first").remove();
				}

				return false;
			}
		});

		$(".ss-gridfield-add-new-multi-class .btn__addnewmulticlass").entwine({
			onclick: function onclick() {
				var link = this.data("href");
				var cls = this.parents(".ss-gridfield-add-new-multi-class").find("select").val();

				if (cls && cls.length) {
					this.getGridField().showDetailView(link.replace("{class}", encodeURI(cls)));
				}

				return false;
			}
		});

		$(".ss-gridfield-add-new-multi-class select").entwine({
			onadd: function onadd() {
				this.update();
			},
			onchange: function onchange() {
				this.update();
			},
			update: function update() {
				var btn = this.parents(".ss-gridfield-add-new-multi-class").find('[data-add-multiclass]');

				if (this.val() && this.val().length) {
					btn.removeClass('disabled');
				} else {
					btn.addClass('disabled');
				}
			}
		});

		$('.grid-field .ss-gridfield-item').entwine({
			onclick: function onclick(e) {
				if (this.find('.editable-column-field').length) {
					e.stopPropagation();
				}
			}
		});

		$(".ss-gridfield-orderable tbody").entwine({
			rebuildSort: function rebuildSort() {
				var grid = this.getGridField();

				var minSort = null;
				grid.getItems().each(function () {
					var sortField = $(this).find('.ss-orderable-hidden-sort');
					if (sortField.length) {
						var thisSort = sortField.val();
						if (minSort === null && thisSort > 0) {
							minSort = thisSort;
						} else if (thisSort > 0) {
							minSort = Math.min(minSort, thisSort);
						}
					}
				});
				minSort = Math.max(1, minSort);

				var sort = minSort;
				grid.getItems().each(function () {
					var sortField = $(this).find('.ss-orderable-hidden-sort');
					if (sortField.length) {
						sortField.val(sort);
						sort++;
					}
				});
			},
			onadd: function onadd() {
				var self = this;

				var helper = function helper(e, row) {
					return row.clone().addClass("ss-gridfield-orderhelper").width("auto").find(".col-buttons").remove().end();
				};

				var update = function update(event, ui) {
					var postback = true;
					if (ui != undefined && ui.item.hasClass('ss-gridfield-inline-new')) {
						postback = false;
					}

					self.rebuildSort();

					var grid = self.getGridField();
					if (grid.data("immediate-update") && postback) {
						grid.reload({
							url: grid.data("url-reorder")
						});
					} else {
						var form = $('.cms-edit-form');
						form.addClass('changed');
					}
				};

				this.sortable({
					handle: ".handle",
					helper: helper,
					opacity: .7,
					update: update
				});
			},
			onremove: function onremove() {
				if (this.data('sortable')) {
					this.sortable("destroy");
				}
			}
		});

		$(".ss-gridfield-orderable .ss-gridfield-previouspage, .ss-gridfield-orderable .ss-gridfield-nextpage").entwine({
			onadd: function onadd() {
				var grid = this.getGridField();

				if (this.is(":disabled")) {
					return false;
				}

				var drop = function drop(e, ui) {
					var page;

					if ($(this).hasClass("ss-gridfield-previouspage")) {
						page = "prev";
					} else {
						page = "next";
					}

					grid.find("tbody").sortable("cancel");
					grid.reload({
						url: grid.data("url-movetopage"),
						data: [{ name: "move[id]", value: ui.draggable.data("id") }, { name: "move[page]", value: page }]
					});
				};

				this.droppable({
					accept: ".ss-gridfield-item",
					activeClass: "ui-droppable-active ui-state-highlight",
					disabled: this.prop("disabled"),
					drop: drop,
					tolerance: "pointer"
				});
			},
			onremove: function onremove() {
				if (this.hasClass("ui-droppable")) this.droppable("destroy");
			}
		});

		$('.ss-gridfield-configurable-paginator .pagination-page-size-select').entwine({
			onchange: function onchange() {
				this.parent().find('.ss-gridfield-pagesize-submit').trigger('click');
			}
		});
	});
})(jQuery);

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;

(function ($) {
    "use strict";

    var tmpl = function tmpl(str, data) {
        var f = !/[^\-\w]/.test(str) ? tmpl.cache[str] = tmpl.cache[str] || tmpl(tmpl.load(str)) : new Function(tmpl.arg, ("var _s=''" + tmpl.helper + ";_s+='" + str.replace(tmpl.regexp, tmpl.func) + "';return _s;").split("_s+='';").join(""));
        f.tmpl = f.tmpl || tmpl;
        return data ? f(data) : f;
    };
    tmpl.cache = {};
    tmpl.load = function (id) {
        return document.getElementById(id).innerHTML;
    };
    tmpl.regexp = /(\s+)|('|\\)(?![^%]*%\})|(?:\{%(=|#)(.+?)%\})|(\{%)|(%\})/g;
    tmpl.func = function (s, p1, p2, p3, p4, p5, p6, o, str) {
        if (p1) {
            return o && o + s.length !== str.length ? " " : "";
        }
        if (p2) {
            return "\\" + s;
        }
        if (p3) {
            if (p3 === "=") {
                return "'+_e(" + p4 + ")+'";
            }
            return "'+(" + p4 + "||'')+'";
        }
        if (p5) {
            return "';";
        }
        if (p6) {
            return "_s+='";
        }
    };
    tmpl.encReg = /[<>&"\x00]/g;
    tmpl.encMap = {
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        "\"": "&quot;",
        "\x00": ""
    };
    tmpl.encode = function (s) {
        return String(s || "").replace(tmpl.encReg, function (c) {
            return tmpl.encMap[c];
        });
    };
    tmpl.arg = "o";
    tmpl.helper = ",_t=arguments.callee.tmpl,_e=_t.encode" + ",print=function(s,e){_s+=e&&(s||'')||_e(s);}" + ",include=function(s,d){_s+=_t(s,d);}";
    if (true) {
        !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
            return tmpl;
        }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {
        $.tmpl = tmpl;
    }
})(this);

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(3);
__webpack_require__(4);
__webpack_require__(2);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Component */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lib_Injector__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lib_Injector___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lib_Injector__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);



var Meatballs = function Meatballs(_ref) {
  var PopoverField = _ref.PopoverField,
      id = _ref.id,
      children = _ref.children;
  return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
    PopoverField,
    {
      id: id,
      buttonSize: 'sm',
      data: { placement: 'bottom' },
      className: 'mr-0'
    },
    children
  );
};

Meatballs.propTypes = {
  id: __WEBPACK_IMPORTED_MODULE_1_react__["PropTypes"].string.isRequired,
  PopoverField: __WEBPACK_IMPORTED_MODULE_1_react__["PropTypes"].oneOfType([__WEBPACK_IMPORTED_MODULE_1_react__["PropTypes"].node, __WEBPACK_IMPORTED_MODULE_1_react__["PropTypes"].func])
};

Meatballs.defaultProps = {
  id: '',
  PopoverField: null
};



/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_lib_Injector__["inject"])(['PopoverField'], function (PopoverField) {
  return { PopoverField: PopoverField };
}, function () {
  return 'Meatballs';
})(Meatballs));

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = ReactDom;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map