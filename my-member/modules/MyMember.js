/**
 * Created by manh.vu on 7/10/2016.
 */

var Backbone = require("backbone");
var Marionette = require("backbone.marionette");
var _ = require("underscore");

var app = new Marionette.Application();

app.MyMemberModel = Backbone.Model.extend({});

app.MyMemberListModel = Backbone.Collection.extend({
	model: app.MyMemberModel
});

app.MyMemberView = Marionette.ItemView.extend({
	tagName: 'tr',

	getTemplate: function () {
		var html = require("html!./template/MyMemberView.html");
		return _.template(html);
	}
});
app.MyMembersView = Marionette.CompositeView.extend({
	childView: app.MyMemberView,
	childViewContainer: '#id-member-table-body',

	getTemplate: function () {
		var html = require("html!./template/MyMembersView.html");
		return _.template(html);
	}
});

app.on('before:start', function (options) {
	var LayoutView = Marionette.LayoutView.extend({
		el: '#app-container',
		regions: {
			content: '#main-region'
		}
	});

	app.LayoutView = new LayoutView();
});

app.on('start', function (options) {
	var data = require('./my-member');
	var memberList = new app.MyMemberListModel(data);

	var membersView = new app.MyMembersView({
		collection: memberList
	});

	app.LayoutView.getRegion('content').show(membersView);
});

module.exports = app;