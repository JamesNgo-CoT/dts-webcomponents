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

dts.form.TextareaConfigModel = dts.form.ConfigModel.extend({})

////////////////////////////////////////////////////////////////////////////////
// VIEW
////////////////////////////////////////////////////////////////////////////////

dts.form.TextareaView = dts.form.FieldView.extend({
	className: 'form-group',
	tagName: 'div',

	template: `%{{> dts.form.textareaview.mustache}}%`,

	render: function() {

		// Model.
		const configModel = this.model.get('config') || new dts.form.TextareaConfigModel({})
		const valueModel = this.model.get('values') || new dts.form.ValueModel({})

		// Build element.
		this.$el.html(Mustache.render(this.template, configModel.toJSON()))
		const $input = $('input', this.$el)

		// Event handlers.
		const bindTo = configModel.get('bindTo')
		const configChangeHandler = () => {
			reRender()
		}
		const inputChangeHandler = () => {
			if (bindTo) {
				valueModel.set(bindTo, $input.val(), { silent: true })
			}
		}
		const valueChangeHandler = function() {
			if (bindTo && valueModel.hasChanged(bindTo)) {
				$input.val(valueModel.get(bindTo))
			}
		}

		// Attach event handlers.
		configModel.on('change', configChangeHandler)
		$input.on('change', inputChangeHandler)
		valueModel.on(`change:${bindTo}`, valueChangeHandler)

		// Dettach event handlers then re-render.
		const reRender = () => {
			configModel.off('change', configChangeHandler)
			$input.off('change', inputChangeHandler)
			valueModel.off(`change:${bindTo}`, valueChangeHandler)
			this.render()
		}
	}
})
