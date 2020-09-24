const contactsModel = require("../models/contactModel");

async function getContacts(req, res, next) {
  const contacts = await contactsModel.listContacts();
  if (!contacts) {
    return res.status(404).send({ message: "error! please try next time" });
  }
  res.status(200).json(contacts);
}

async function getContact(req, res, next) {
  const { contactId } = req.params;
  const contact = await contactsModel.getContactById(contactId);
  if (!contact) {
    return res.status(404).send({ message: "contact not found" });
  }
  res.status(200).send(contact);
}

async function deleteContact(req, res, next) {
  const { contactId } = req.params;
  const contact = await contactsModel.getContactById(contactId);
  if (!contact) {
    return res.status(404).send({ message: "contact not found" });
  }
  const removed = await contactsModel.removeContact(contactId);
  if (removed) {
    return res.status(200).send({ message: "contact deleted" });
  }
}

async function addNewContact(req, res, next) {
  const newContact = await contactsModel.addContact(req.body);
  if (!newContact) {
    return res.status(500).send({ message: "error! something is wrong" });
  }
  res.status(201).send(newContact);
}

async function updateContact(req, res, next) {
  const { contactId } = req.params;
  const contact = await contactsModel.getContactById(contactId);
  if (!contact) {
    return res.status(404).send({ message: "contact not found!" });
  }
  const updatedContact = await contactsModel.updateExistedContact(
    contactId,
    req.body
  );
  res.status(200).send(updatedContact);
}

module.exports = {
  getContacts,
  getContact,
  deleteContact,
  addNewContact,
  updateContact,
};
