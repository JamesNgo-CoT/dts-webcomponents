/* global Backbone Mustache */
/* global dts */

////////////////////////////////////////////////////////////////////////////////
// NAMESPACE
////////////////////////////////////////////////////////////////////////////////

window.dts = window.dts || {}

dts.form = dts.form || {}

////////////////////////////////////////////////////////////////////////////////
// MODEL CLASS
////////////////////////////////////////////////////////////////////////////////

dts.form.ValueModel = Backbone.Model.extend({})

dts.form.ConfigModel = Backbone.Model.extend({})

////////////////////////////////////////////////////////////////////////////////
// VIEW CLASS
////////////////////////////////////////////////////////////////////////////////

dts.form.FormView = Backbone.View.extend({
	tagName: 'form',
	template: `%{{> dts.form.formview.mustache}}%`,

	render: function() {

		// Set form properties.
		for (const prop of dts.form.FormView.props) {
			if (this.model.get(prop)) {
				this.$el.prop(prop, this.model.get(prop))
			} else {
				if (this.$el.prop(prop)) {
					this.$el.removeProp(prop)
				}
			}
		}

		// Build form elements.
		this.$el.html(Mustache.render(this.template, this.model.toJSON()))
	}
}, {
	props: ['accept-charset', 'action', 'autocomplete', 'enctype', 'method', 'name', 'novalidate', 'target']
})

dts.form.FieldView = Backbone.View.extend({})
