const fs = require("fs");
const uid = require("uid");

const { promises: fsPromises } = fs;
const path = require("path");
const contactsPath = path.join(__dirname, "../../db/contacts.json");
const encoding = "utf8";

async function listContacts() {
  try {
    const data = await fsPromises.readFile(contactsPath, encoding);
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fsPromises.readFile(contactsPath, encoding);
    return JSON.parse(data).find((x) => String(x.id) === contactId);
  } catch (err) {
    console.error(err);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fsPromises.readFile(contactsPath, encoding);
    const updatedData = JSON.parse(data).filter(
      (item) => String(item.id) !== contactId
    );
    await fsPromises.writeFile(contactsPath, JSON.stringify(updatedData));
    return updatedData;
  } catch (err) {
    console.error(err);
  }
}

async function addContact({ name, email, phone }) {
  try {
    const data = await fsPromises.readFile(contactsPath, encoding);
    const parsedData = JSON.parse(data);
    const updatedData = parsedData.push({
      id: uid(),
      name: name,
      email: email,
      phone: phone,
    });
    await fsPromises.writeFile(contactsPath, JSON.stringify(parsedData));
    return parsedData;
  } catch (err) {
    console.error(err);
  }
}

async function updateExistedContact(contactId, dataForUpdate) {
  try {
    const contacts = await fsPromises.readFile(contactsPath, encoding);
    const parsedData = JSON.parse(contacts);
    const foundIndex = parsedData.findIndex((x) => String(x.id) === contactId);
    if (foundIndex === -1) {
      return null;
    }
    parsedData[foundIndex] = { ...parsedData[foundIndex], ...dataForUpdate };
    await fsPromises.writeFile(contactsPath, JSON.stringify(parsedData));
    return parsedData[foundIndex];
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateExistedContact,
};
