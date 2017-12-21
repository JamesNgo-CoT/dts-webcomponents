/* global Backbone Mustache */

Backbone.Model.Dropdown = Backbone.Model.extend({})

Backbone.View.Dropdown = Backbone.View.extend({
	tagName: 'div',
	className: 'dropdown',

	template: `%{{> bbv.dropdown.mustache}}%`,

	events: {
		'click .dropdown-item a': 'route'
	},

	initialize: function() {
		this.listenTo(this.model, 'change', this.render)
	},

	render: function() {
		const data = {
			label: this.model.get('label'),
			menuGroups: []
		}

		console.log('MODEL', this.model.toJSON())

		if (this.model.get('menuGroups')) {
			const menuGroups = this.model.get('menuGroups').models
			const l = menuGroups.length
			for (let i = 0; i < l; i++) {
				const idx = data.menuGroups.push(menuGroups[i].toJSON()) - 1
				console.log(data.menuGroups[idx])
				data.menuGroups[idx].isFirst = i === 0

				if (menuGroups[i].get('menuItems')) {
					const menuItems = menuGroups[i].get('menuItems').models
					const l2 = menuItems.length
					for (let i2 = 0; i2 < l2; i2++) {
						data.menuGroups[idx].menuItems.push(menuItems[i2].toJSON())
					}
				}
			}
		}

		this.$el.html(Mustache.render(this.template, data))
	},

	route: function(e) {
		e.preventDefault()
		this.trigger('click', e)
	}
})
