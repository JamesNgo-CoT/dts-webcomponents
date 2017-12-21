'use strict';

/* global Backbone Mustache */

Backbone.Model.Dropdown = Backbone.Model.extend({});

Backbone.View.Dropdown = Backbone.View.extend({
	tagName: 'div',
	className: 'dropdown',

	template: '<button class="btn btn-default dropdown-toggle" type="button" id="{{id}}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">\n  {{label}}\n  <span class="caret"></span>\n</button>\n{{#menuGroups.length}}\n<ul class="dropdown-menu" aria-labelledby="{{id}}">\n  {{#menuGroups}}\n  {{^isFirst}}\n  <li role="separator" class="divider"></li>\n  {{/isFirst}}\n  {{#header}}\n  <li class="dropdown-header">{{.}}</li>\n  {{/header}}\n  {{#menuItems}}\n  <li class="dropdown-item">\n    <a href="{{href}}">\n\n      <span class="glyphicon glyphicon-{{#glyphicon}}{{.}}{{/glyphicon}}{{^glyphicon}}none{{/glyphicon}}" aria-hidden="true"></span>\n\n      {{label}}\n    </a>\n  </li>\n  {{/menuItems}}\n  {{/menuGroups}}\n</ul>\n{{/menuGroups.length}}\n',

	events: {
		'click .dropdown-item a': 'route'
	},

	initialize: function initialize() {
		this.listenTo(this.model, 'change', this.render);
	},

	render: function render() {
		var data = {
			label: this.model.get('label'),
			menuGroups: []
		};

		console.log('MODEL', this.model.toJSON());

		if (this.model.get('menuGroups')) {
			var menuGroups = this.model.get('menuGroups').models;
			var l = menuGroups.length;
			for (var i = 0; i < l; i++) {
				var idx = data.menuGroups.push(menuGroups[i].toJSON()) - 1;
				console.log(data.menuGroups[idx]);
				data.menuGroups[idx].isFirst = i === 0;

				if (menuGroups[i].get('menuItems')) {
					var menuItems = menuGroups[i].get('menuItems').models;
					var l2 = menuItems.length;
					for (var i2 = 0; i2 < l2; i2++) {
						data.menuGroups[idx].menuItems.push(menuItems[i2].toJSON());
					}
				}
			}
		}

		this.$el.html(Mustache.render(this.template, data));
	},

	route: function route(e) {
		e.preventDefault();
		this.trigger('click', e);
	}
});