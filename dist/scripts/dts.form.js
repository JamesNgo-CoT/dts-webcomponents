'use strict';

/* global Backbone Mustache */
/* global dts */

////////////////////////////////////////////////////////////////////////////////
// NAMESPACE
////////////////////////////////////////////////////////////////////////////////

window.dts = window.dts || {};

dts.form = dts.form || {};

////////////////////////////////////////////////////////////////////////////////
// MODEL CLASS
////////////////////////////////////////////////////////////////////////////////

dts.form.ValueModel = Backbone.Model.extend({});

dts.form.ConfigModel = Backbone.Model.extend({});

////////////////////////////////////////////////////////////////////////////////
// VIEW CLASS
////////////////////////////////////////////////////////////////////////////////

dts.form.FormView = Backbone.View.extend({
  tagName: 'form',
  template: '\n{{#title}}\n<div class="row">\n  <div class="col-xs-12">\n    <h{{#headingLevel}}{{.}}{{/headingLevel}}{{^headingLevel}}1{{/headingLevel}}>{{.}}</h{{#headingLevel}}{{.}}{{/headingLevel}}{{^headingLevel}}1{{/headingLevel}}>\n  </div>\n</div>\n{{/title}}\n\n{{#description}}\n<div class="row">\n  <div class="col-xs-12">\n    <p>{{.}}</p>\n  </div>\n</div>\n{{/description}}\n\n{{#descriptionHtml}}\n<div class="row">\n  <div class="col-xs-12">\n    {{{.}}}\n  </div>\n</div>\n{{/descriptionHtml}}\n\n{{#fields.length}}\n<div class="row"></div>\n{{/fields.length}}\n\n{{#sections.length}}\n<div class="sections row"></div>\n{{/sections.length}}\n\n{{#pages.length}}\n<div class="pages row"></div>\n{{/pages.length}}\n\n<div class="row">\n  <div class="col-xs-12">\n    <p>\n      <button value="previous" class="btn btn-default">Prev</button>\n      <button value="1" class="btn btn-default">1</button>\n      <button value="2" class="btn btn-default">2</button>\n      <button value="3" class="btn btn-default">3</button>\n      <button value="next" class="btn btn-default">Next</button>\n      <button type="submit" class="btn btn-default">Submit</button>\n      <button type="reset" class="btn btn-default">Reset</button>\n    </p>\n  </div>\n</div>\n',

  render: function render() {

    // Set form properties.
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = dts.form.FormView.props[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var prop = _step.value;

        if (this.model.get(prop)) {
          this.$el.prop(prop, this.model.get(prop));
        } else {
          if (this.$el.prop(prop)) {
            this.$el.removeProp(prop);
          }
        }
      }

      // Build form elements.
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    this.$el.html(Mustache.render(this.template, this.model.toJSON()));
  }
}, {
  props: ['accept-charset', 'action', 'autocomplete', 'enctype', 'method', 'name', 'novalidate', 'target']
});

dts.form.FieldView = Backbone.View.extend({});