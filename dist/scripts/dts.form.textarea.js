'use strict';

/* global Mustache */
/* global dts */

////////////////////////////////////////////////////////////////////////////////
// NAMESPACE
////////////////////////////////////////////////////////////////////////////////

window.dts = window.dts || {};

dts.form = dts.form || {};

////////////////////////////////////////////////////////////////////////////////
// MODEL
////////////////////////////////////////////////////////////////////////////////

dts.form.TextareaConfigModel = dts.form.ConfigModel.extend({});

////////////////////////////////////////////////////////////////////////////////
// VIEW
////////////////////////////////////////////////////////////////////////////////

dts.form.TextareaView = dts.form.FieldView.extend({
	className: 'form-group',
	tagName: 'div',

	template: '{{#label}}\n<label{{^isStatic}}{{#id}} for="{{.}}"{{/id}}{{/isStatic}} class="control-label">\n  {{.}}\n</label>\n{{/label}}\n\n{{^isRequired}}(Optional){{/isRequired}}\n\n{{#isStatic}}\n<p class="form-control-static"></p>\n{{/isStatic}}\n{{^isStatic}}\n<textarea{{#isRequired}} required{{/isRequired}}{{#row}} {{.}}{{/row}} class="form-control"{{#id}} id={{.}}{{/id}}></textarea>\n{{/isStatic}}\n\n{{#helpText}}\n<span class="help-block">{{.}}</span>\n{{/helpText}}\n',

	render: function render() {
		var _this = this;

		// Model.
		var configModel = this.model.get('config') || new dts.form.TextareaConfigModel({});
		var valueModel = this.model.get('values') || new dts.form.ValueModel({});

		// Build element.
		this.$el.html(Mustache.render(this.template, configModel.toJSON()));
		var $input = $('input', this.$el);

		// Event handlers.
		var bindTo = configModel.get('bindTo');
		var configChangeHandler = function configChangeHandler() {
			reRender();
		};
		var inputChangeHandler = function inputChangeHandler() {
			if (bindTo) {
				valueModel.set(bindTo, $input.val(), { silent: true });
			}
		};
		var valueChangeHandler = function valueChangeHandler() {
			if (bindTo && valueModel.hasChanged(bindTo)) {
				$input.val(valueModel.get(bindTo));
			}
		};

		// Attach event handlers.
		configModel.on('change', configChangeHandler);
		$input.on('change', inputChangeHandler);
		valueModel.on('change:' + bindTo, valueChangeHandler);

		// Dettach event handlers then re-render.
		var reRender = function reRender() {
			configModel.off('change', configChangeHandler);
			$input.off('change', inputChangeHandler);
			valueModel.off('change:' + bindTo, valueChangeHandler);
			_this.render();
		};
	}
});