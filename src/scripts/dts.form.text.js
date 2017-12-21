/* global Mustache */
/* global dts */

////////////////////////////////////////////////////////////////////////////////
// NAMESPACE
////////////////////////////////////////////////////////////////////////////////

window.dts = window.dts || {}

dts.form = dts.form || {}

////////////////////////////////////////////////////////////////////////////////
// MODEL
////////////////////////////////////////////////////////////////////////////////

dts.form.TextConfigModel = dts.form.ConfigModel.extend({})

////////////////////////////////////////////////////////////////////////////////
// VIEW
////////////////////////////////////////////////////////////////////////////////

dts.form.TextView = dts.form.FieldView.extend({
	className: 'form-group',
	tagName: 'div',
	template: `%{{> dts.form.textview.mustache}}%`,

	initialize: function() {
		this.render()
	},

	render: function() {

		// Model.
		const configModel = this.model.get('config') || new dts.form.TextConfigModel({})
		const valueModel = this.model.get('values') || new dts.form.ValueModel({})

		// Build element.
		this.$el.html(
			Mustache.render(
				this.template,
				configModel.toJSON()
			)
		)
		const $input = $('input', this.$el)

		// Event handlers.
		const bindTo = configModel.get('bindTo') || null
		const handleConfigChange = () => {
			reRender()
		}
		const handleInputChange = () => {
			if (bindTo) {
				valueModel.set(bindTo, $input.val(), { silent: true })
			}
		}
		const handleValueChange = function() {
			if (bindTo && valueModel.hasChanged(bindTo)) {
				$input.val(valueModel.get(bindTo))
			}
		}

		// Attach event handlers.
		configModel.on('change', handleConfigChange)
		$input.on('change', handleInputChange)
		valueModel.on(`change:${bindTo}`, handleValueChange)

		// Dettach event handlers then re-render.
		const reRender = () => {
			configModel.off('change', handleConfigChange)
			$input.off('change', handleInputChange)
			valueModel.off(`change:${bindTo}`, handleValueChange)
			this.render()
		}
	}
})
