const contactsModel = require("../models/contactModel");

async function getContacts(_, res, next) {
  try {
    const contacts = await contactsModel.listContacts();
    if (!contacts) {
      return res.status(404).send({ message: "error! please try next time" });
    }
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
}

async function getContact(req, res, next) {
  try {
    const { contactId } = req.params;
    const contact = await contactsModel.getContactById(contactId);
    if (!contact) {
      return res.status(404).send({ message: "contact not found" });
    }
    res.status(200).send(contact);
  } catch (error) {
    next(error);
  }
}

async function deleteContact(req, res, next) {
  try {
    const { contactId } = req.params;
    const contact = await contactsModel.getContactById(contactId);
    if (!contact) {
      return res.status(404).send({ message: "contact not found" });
    }
    const removed = await contactsModel.removeContact(contactId);
    if (removed) {
      return res.status(200).send({ message: "contact deleted" });
    }
  } catch (error) {
    next(error);
  }
}

async function addNewContact(req, res, next) {
  try {
    const newContact = await contactsModel.addContact(req.body);
    if (!newContact) {
      return res.status(500).send({ message: "error! something is wrong" });
    }
    res.status(201).send(newContact);
  } catch (error) {
    next(error);
  }
}

async function updateContact(req, res, next) {
  try {
    const { contactId } = req.params;
    const contact = await contactsModel.getContactById(contactId);
    if (!contact) {
      return res.status(404).send({ message: "contact deleted" });
    }
    const updatedContact = await contactsModel.updateExistedContact(
      contactId,
      req.body
    );
    res.status(200).send(updatedContact);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getContacts,
  getContact,
  deleteContact,
  addNewContact,
  updateContact,
};
