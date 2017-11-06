(function($) {
	$.entwine("ss", function($) {
		/**
		 * GridFieldAddExistingSearchButton
		 */

		$(".add-existing-search-dialog").entwine({
			loadDialog: function(deferred) {
				var dialog = this.addClass("loading").children(".ui-dialog-content").empty();

				deferred.done(function(data) {
					dialog.html(data).parent().removeClass("loading");
				});
			}
		});

		$(".ss-gridfield .add-existing-search").entwine({
			onclick: function() {
				var dialog = $("<div></div>").appendTo("body").dialog({
					modal: true,
					resizable: false,
					width: 500,
					height: 600,
					close: function() {
						$(this).dialog("destroy").remove();
					}
				});

				dialog.parent().addClass("add-existing-search-dialog").loadDialog(
					$.get(this.prop("href"))
				);
				dialog.data("grid", this.closest(".ss-gridfield"));

				return false;
			}
		});

		$(".add-existing-search-dialog .add-existing-search-form").entwine({
			onsubmit: function() {
				this.closest(".add-existing-search-dialog").loadDialog($.get(
					this.prop("action"), this.serialize()
				));
				return false;
			}
		});

		$(".add-existing-search-dialog .add-existing-search-items a").entwine({
			onclick: function() {
				var link = this.closest(".add-existing-search-items").data("add-link");
				var id   = this.data("id");

				var dialog = this.closest(".add-existing-search-dialog")
					 .addClass("loading")
					 .children(".ui-dialog-content")
					 .empty();

				$.post(link, { id: id }, function() {
					dialog.data("grid").reload();
					dialog.dialog("close");
				});

				return false;
			}
		});

		$(".add-existing-search-dialog .add-existing-search-pagination a").entwine({
			onclick: function() {
				this.closest(".add-existing-search-dialog").loadDialog($.get(
					this.prop("href")
				));
				return false;
			}
		});

		/**
		 * GridFieldAddNewInlineButton
		 */

		$(".ss-gridfield.ss-gridfield-editable").entwine({
			reload: function(opts, success) {
				var grid  = this;
				// Record position of all items
				var added = [];
				var index = 0; // 0-based index
				grid.find("tbody:first .ss-gridfield-item").each(function() {
					// Record inline items with their original positions
					if ($(this).is(".ss-gridfield-inline-new")) {
						added.push({
							'index': index,
							'row': $(this).detach()
						});
					}
					index++;
				});

				this._super(opts, function() {
					var body = grid.find("tbody:first");
					$.each(added, function(i, item) {
						var row = item['row'],
							index = item['index'],
							replaces;
						// Insert at index position
						if (index === 0) {
							body.prepend(row);
						} else {
							// Find item that we could potentially insert this row after
							replaces = body.find('.ss-gridfield-item:nth-child(' + index + ')');
							if (replaces.length) {
								replaces.after(row);
							} else {
								body.append(row);
							}
						}
						grid.find("tbody:first").children(".ss-gridfield-no-items").hide();
					});

					if(success) success.apply(grid, arguments);
				});
			},
			onpaste: function(e) {
				// The following was used as a basis for clipboard data access:
				// http://stackoverflow.com/questions/2176861/javascript-get-clipboard-data-on-paste-event-cross-browser
				var clipboardData = typeof e.originalEvent.clipboardData !== "undefined" ? e.originalEvent.clipboardData : null;
				if (clipboardData) {
					// Get current input wrapper div class (ie. 'col-Title')
					var input = $(e.target);
					var inputType = input.attr('type');
					if (inputType === 'text' || inputType === 'email')
					{
						var lastInput = this.find(".ss-gridfield-inline-new:last").find("input");
						if (input.attr('type') === 'text' && input.is(lastInput) && input.val() === '')
						{
							var inputWrapperDivClass = input.parent().attr('class');
							// Split clipboard data into lines
							var lines = clipboardData.getData("text/plain").match(/[^\r\n]+/g);
							var linesLength = lines.length;
							// If there are multiple newlines detected, split the data into new rows automatically
							if (linesLength > 1)
							{
								var elementsChanged = [];
								for (var i = 1; i < linesLength; ++i)
								{
									this.trigger("addnewinline");
									var row = this.find(".ss-gridfield-inline-new:last");
									var rowInput = row.find("."+inputWrapperDivClass).find("input");
									rowInput.val(lines[i]);
									elementsChanged.push(rowInput);
								}
								// Store the rows added via this method so they can be undo'd.
								input.data('pasteManipulatedElements', elementsChanged);
								// To set the current row to not just be all the clipboard data, must wait a frame
								setTimeout(function() {
									input.val(lines[0]);
								}, 0);
							}
						}
					}
				}
			},
			onkeyup: function(e) {
				if (e.keyCode == 90 && e.ctrlKey)
				{
					var target = $(e.target);
					var elementsChanged = target.data("pasteManipulatedElements");
					if (typeof elementsChanged !== "undefined" && elementsChanged && elementsChanged.length)
					{
						for (var i = 0; i < elementsChanged.length; ++i)
						{
							elementsChanged[i].closest('tr').remove();
						}
						target.data("pasteManipulatedElements", []);
					}
				}
			},
			onaddnewinline: function(e) {
				if(e.target != this[0]) {
					return;
				}

				var tmpl = window.tmpl;
				var row = this.find(".ss-gridfield-add-inline-template:last");
				var num = this.data("add-inline-num") || 1;

				tmpl.cache[this[0].id + "ss-gridfield-add-inline-template"] = tmpl(row.html());

				this.find("tbody:first").append(tmpl(this[0].id + "ss-gridfield-add-inline-template", { num: num }));
				this.find("tbody:first").children(".ss-gridfield-no-items").hide();
				this.data("add-inline-num", num + 1);

				// Rebuild sort order fields
				$(".ss-gridfield-orderable tbody").rebuildSort();
			}
		});

		$(".ss-gridfield-add-new-inline").entwine({
			onclick: function() {
				this.getGridField().trigger("addnewinline");
				return false;
			}
		});

		$(".ss-gridfield-delete-inline").entwine({
			onclick: function() {
				var msg = ss.i18n._t("GridFieldExtensions.CONFIRMDEL", "Are you sure you want to delete this?");

				if(confirm(msg)) {
					this.parents("tr.ss-gridfield-inline-new:first").remove();
				}

				return false;
			}
		});

		/**
		 * GridFieldAddNewMultiClass
		 */

		$(".ss-gridfield-add-new-multi-class .btn__addnewmulticlass").entwine({
			onclick: function() {
				var link = this.data("href");
				var cls  = this.parents(".ss-gridfield-add-new-multi-class").find("select").val();

				if(cls && cls.length) {
					this.getGridField().showDetailView(link.replace("{class}", encodeURI(cls)));
				}

				return false;
			}
		});

		$(".ss-gridfield-add-new-multi-class select").entwine({
			onadd: function() {
				this.update();
			},
			onchange: function() {
				this.update();
			},
			update: function() {
				var btn = this.parents(".ss-gridfield-add-new-multi-class").find('[data-add-multiclass]');

				if(this.val() && this.val().length) {
					btn.removeClass('disabled');
				} else {
					btn.addClass('disabled');
				}
			}
		});

		/**
		 * GridFieldEditableColumns
		 */

		$('.grid-field .ss-gridfield-item').entwine({
			onclick: function(e) {
				// Prevent the default row click action when clicking a cell that contains a field
				if (this.find('.editable-column-field').length) {
					e.stopPropagation();
				}
			}
		});

		/**
		 * GridFieldOrderableRows
		 */

		$(".ss-gridfield-orderable tbody").entwine({
			rebuildSort: function() {
				var grid = this.getGridField();

				// Get lowest sort value in this list (respects pagination)
				var minSort = null;
				grid.getItems().each(function() {
					// get sort field
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

				// With the min sort found, loop through all records and re-arrange
				var sort = minSort;
				grid.getItems().each(function() {
					// get sort field
					var sortField = $(this).find('.ss-orderable-hidden-sort');
					if (sortField.length) {
						sortField.val(sort);
						sort++;
					}
				});
			},
			onadd: function() {
				var self = this;

				var helper = function(e, row) {
					return row.clone()
							  .addClass("ss-gridfield-orderhelper")
							  .width("auto")
							  .find(".col-buttons")
							  .remove()
							  .end();
				};

				var update = function(event, ui) {
					// If the item being dragged is unsaved, don't do anything
					var postback = true;
					if ((ui != undefined) && ui.item.hasClass('ss-gridfield-inline-new')) {
						postback = false;
					}

					// Rebuild all sort hidden fields
					self.rebuildSort();

					// Check if we are allowed to postback
					var grid = self.getGridField();
					if (grid.data("immediate-update") && postback)
					{
						grid.reload({
							url: grid.data("url-reorder")
						});
					}
					else
					{
						// Tells the user they have unsaved changes when they
						// try and leave the page after sorting, also updates the
						// save buttons to show the user they've made a change.
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
			onremove: function() {
				if(this.data('sortable')) {
					this.sortable("destroy");
				}
			}
		});

		$(".ss-gridfield-orderable .ss-gridfield-previouspage, .ss-gridfield-orderable .ss-gridfield-nextpage").entwine({
			onadd: function() {
				var grid = this.getGridField();

				if(this.is(":disabled")) {
					return false;
				}

				var drop = function(e, ui) {
					var page;

					if($(this).hasClass("ss-gridfield-previouspage")) {
						page = "prev";
					} else {
						page = "next";
					}

					grid.find("tbody").sortable("cancel");
					grid.reload({
						url: grid.data("url-movetopage"),
						data: [
							{ name: "move[id]", value: ui.draggable.data("id") },
							{ name: "move[page]", value: page }
						]
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
			onremove: function() {
				if(this.hasClass("ui-droppable")) this.droppable("destroy");
			}
		});

        /**
         * GridFieldConfigurablePaginator
         */
        $('.ss-gridfield-configurable-paginator .pagination-page-size-select').entwine({
            onchange: function () {
                this.parent().find('.ss-gridfield-pagesize-submit').trigger('click');
            }
        });

		/**
		 * GridFieldMeatballMenuComponent
		 */
		$('.ss-gridfield .meatball-menu__container').entwine({
			onclick: function(e) {
				this.openMeatballs();
				//closing is handled by a one-time event
				//so we only ever open here.
			},
			targetWithinList: function(target) {
				const openMenu = '.meatball-menu__container--open .meatball-menu__item-list';
				const inside = $(target).closest(openMenu);
				return inside.length;
			},
			openMeatballs: function() {
				this.addClass('meatball-menu__container--open');
				this.bindCloseEvent()
			},
			bindCloseEvent: function() {
				const openMenu = this;
				// close on click anywhere other than our menu
				$(document).one('mousedown', function(e){
					if (openMenu.targetWithinList(e.target)) {
						openMenu.bindCloseEvent();
					} else {
						openMenu.closeMeatballs();
					}
				})
			},
			closeMeatballs: function() {
				this.removeClass('meatball-menu__container--open');
			}
		});

		$('.ss-gridfield .meatball-menu__item--action').entwine({
			onclick: function(e) {
				const callback = null;
				jQuery.ajax({
	 				headers: {"X-Pjax" : "CurrentForm,Breadcrumbs"},
					url: this.children('a').prop('href'),
					type: 'GET',
					complete: function(jqxhr) {
						// TODO in future when we move to "toast" style pop-up feedback,
						// Remove a row's loading state feedback here.
					},
					success: function(data, status, xhr) {
						if(callback) callback(data, status, xhr);
						var newContentEls = $('.cms-container').handleAjaxResponse(data, status, xhr);
						if(!newContentEls) return;
						newContentEls.filter('form').trigger('aftersubmitform', {status: status, xhr: xhr});
					}
				});
				//don't bubble into default action for a row, which is probably "edit"
				e.stopPropagation();
				return false;
			}
		});
	});
})(jQuery);
