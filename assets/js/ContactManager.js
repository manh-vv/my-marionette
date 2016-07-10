/**
 * Created by manh.vu on 7/10/2016.
 */
var ContactManager = new Marionette.Application();

ContactManager.ContactView = Marionette.ItemView.extend({
    template: "#contact-template",
    events: {
        'click p': "alertPhoneNumber"
    },

    alertPhoneNumber: function () {
        var self = this;
        var phoneNumber = self.model.escape('phoneNumber');
        var text = (phoneNumber == null || phoneNumber == '') ? 'No phone number!' : phoneNumber;
        alert(text);
    }
});

ContactManager.ContactItemView = Marionette.ItemView.extend({
    template: "#contact-list-item",
    events: {
        'click li': "alertPhoneNumber"
    },

    alertPhoneNumber: function () {
        var self = this;
        var phoneNumber = self.model.escape('phoneNumber');
        var text = (phoneNumber == null || phoneNumber == '') ? 'No phone number!' : phoneNumber;
        alert(text);
    }
});

ContactManager.ContactsView = Marionette.CollectionView.extend({
    tagName: "ul",
    childView: ContactManager.ContactItemView
});

ContactManager.Contact = Backbone.Model.extend({});
ContactManager.ContactList = Backbone.Collection.extend({
    model: ContactManager.Contact,
    comparator: 'firstName'
});

ContactManager.on("before:start", function (options) {
    var RegionContainer = Marionette.LayoutView.extend({
        el: '#app-container',
        regions: {
            main: '#main-region'
        }
    });

    ContactManager.regions = new RegionContainer();
});

ContactManager.on("start", function (options) {
    var contactAlice = new ContactManager.Contact({
        firstName: 'manh',
        lastName: 'vu',
        phoneNumber: '123-456'
    });

    var contactList = new ContactManager.ContactList([
        {
            firstName: "Bob",
            lastName: "Brigham",
            phoneNumber: "555-0163"
        },
        {
            firstName: "Alice",
            lastName: "Arten",
            phoneNumber: "555-0184"
        },
        {
            firstName: "Charlie",
            lastName: "Campbell",
            phoneNumber: "555-0129"
        }
    ]);

    var contactListView = new ContactManager.ContactsView({
        collection: contactList
    });

    var contactView = new ContactManager.ContactView({
        tagName: "h3",
        id: "id-static-view",
        className: "instruction",
        model: contactAlice
    });

    ContactManager.regions.main.show(contactListView);

    console.log('ContactManager has started!');
});

ContactManager.start();