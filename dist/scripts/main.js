'use strict';

/* global Backbone */

var NewModel = Backbone.Model.Dts.extend({
	schema: {
		propa: Date,
		propb: 'string',
		propc: 'string'
	}
});

var NewModel2 = Backbone.Model.Dts.extend({
	schema: {
		prop1: 'string',
		prop2: NewModel
	}
});

var dts = new NewModel2({
	prop1: '2017/12/10',
	prop2: {
		propa: '2017/12/10',
		propb: 'abc',
		propc: 'def'
	},
	prop3: false
});

dts.on('change', function () {
	console.log('ROOT CHANGED');
});
dts.get('prop2').on('change', function () {
	console.log('CHILD CHANGED');
});

dts.set('prop1', 'abc');
dts.get('prop2').set('propc', 'def');
dts.set('prop2', { propa: '2010/12/10', propb: new Date() });

console.log(dts.toJSON());