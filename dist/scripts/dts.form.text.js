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

dts.form.TextConfigModel = dts.form.ConfigModel.extend({});

////////////////////////////////////////////////////////////////////////////////
// VIEW
////////////////////////////////////////////////////////////////////////////////

dts.form.TextView = dts.form.FieldView.extend({
	className: 'form-group',
	tagName: 'div',
	template: '{{#label}}<label{{#id}} for="{{.}}"{{/id}}>{{.}}</label>{{/label}}\n{{^required}}(Optional){{/required}}\n<input{{#placeholder}} placeholder="{{.}}"{{/placeholder}}{{#type}} type="{{.}}"{{/type}} class="form-control"{{#id}} id="{{.}}"{{/id}}>\n{{#helptext}}<span class="help-block">{{.}}</span>{{/helptext}}\n',

	initialize: function initialize() {
		this.render();
	},

	render: function render() {
		var _this = this;

		// Model.
		var configModel = this.model.get('config') || new dts.form.TextConfigModel({});
		var valueModel = this.model.get('values') || new dts.form.ValueModel({});

		// Build element.
		this.$el.html(Mustache.render(this.template, configModel.toJSON()));
		var $input = $('input', this.$el);

		// Event handlers.
		var bindTo = configModel.get('bindTo') || null;
		var handleConfigChange = function handleConfigChange() {
			reRender();
		};
		var handleInputChange = function handleInputChange() {
			if (bindTo) {
				valueModel.set(bindTo, $input.val(), { silent: true });
			}
		};
		var handleValueChange = function handleValueChange() {
			if (bindTo && valueModel.hasChanged(bindTo)) {
				$input.val(valueModel.get(bindTo));
			}
		};

		// Attach event handlers.
		configModel.on('change', handleConfigChange);
		$input.on('change', handleInputChange);
		valueModel.on('change:' + bindTo, handleValueChange);

		// Dettach event handlers then re-render.
		var reRender = function reRender() {
			configModel.off('change', handleConfigChange);
			$input.off('change', handleInputChange);
			valueModel.off('change:' + bindTo, handleValueChange);
			_this.render();
		};
	}
});