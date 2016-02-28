var network = require("./network");

function getAllContacts() {
    network.httpGet("/api/contact");
}

module.exports = {
    getAllContacts: getAllContacts,
};
