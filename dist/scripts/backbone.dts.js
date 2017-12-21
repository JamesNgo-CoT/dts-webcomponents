'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/* global Backbone */

////////////////////////////////////////////////////////////////////////////////
// MODEL
////////////////////////////////////////////////////////////////////////////////

Backbone.Model.Dts = Backbone.Model.extend({
	schema: {},

	set: function set(attrs, opts) {
		if (typeof attrs === 'string') {
			var temp = {};
			temp[attrs] = opts;
			attrs = temp;
			opts = {};
		}

		for (var k in attrs) {
			if (attrs.hasOwnProperty(k) && attrs[k] !== null && k in this.schema) {
				if (typeof this.schema[k] === 'string') {
					// if (typeof attrs[k] !== this.schema[k]) {
					// 	delete attrs[k]
					// }
					switch (this.schema[k]) {
						case 'boolean':
							attrs[k] = !!attrs[k];
							break;
						case 'number':
							attrs[k] = +attrs[k];
							break;
						case 'string':
							attrs[k] = attrs[k].toString();
							break;
					}
				} else if (typeof this.schema[k] === 'function') {
					if (!(attrs[k] instanceof this.schema[k])) {
						if (!Array.isArray(attrs[k])) {
							attrs[k] = [attrs[k]];
						}
						attrs[k] = new (Function.prototype.bind.apply(this.schema[k], [null].concat(_toConsumableArray(attrs[k]))))();
					}
				}
			}
		}

		return Backbone.Model.prototype.set.call(this, attrs, opts);
	},

	toJSON: function toJSON() {
		var json = Backbone.Model.prototype.toJSON.call(this);
		for (var k in json) {
			if (json.hasOwnProperty(k)) {
				if (json[k] instanceof Backbone.Collection || json[k] instanceof Backbone.Model) {
					json[k] = json[k].toJSON();
				}
				if (Array.isArray(json[k])) {
					var l = json[k].length;
					for (var i = 0; i < l; i++) {
						if (json[k][i] instanceof Backbone.Model) {
							json[k][i] = json[k][i].toJSON();
						}
					}
				}
			}
		}
		return json;
	}
});