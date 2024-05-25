// import * as fs from "node:fs/promises";
// import path from "node:path";
import Contact from "../models/contact.js";
import crypto from "node:crypto";

// const contactsPath = path.resolve("db", "contacts.json");

// async function readFile() {
//   const data = await fs.readFile(contactsPath, { encoding: "utf-8" });

//   return JSON.parse(data);
// }

// async function writeFile(contacts) {
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, undefined, 2));
// }

async function listContacts() {
  const contacts = await Contact.find();
  return contacts;
}

async function getContactById(contactId) {
  const contact = await Contact.findById(contactId);

  if (contact === null) {
    return null;
  }

  return contact;
}

async function removeContact(contactId) {
  const result = await Contact.findByIdAndDelete(contactId);

  if (result === null) {
    return null;
  }
}

async function addContact({ name, email, phone }) {
  const newContact = {
    id: crypto.randomUUID(),
    name: name,
    email: email,
    phone: phone,
  };

  try {
    const result = await Contact.create(newContact);

    return result;
  } catch (error) {
    console.log(error);
  }

  return newContact;
}

async function updateContact(id, contact) {
  try {
    const newContact = {
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
    };

    const result = await Book.findByIdAndUpdate(id, newContact);

    if (result === null) {
      return null;
    }
  } catch (error) {
    console.log(error);
  }

  // const index = contacts.findIndex((contact) => contact.id === id);

  // if (index === -1) {
  //   return null;
  // }

  // const updatedContacts = { ...contacts[index], ...contact };

  // const newContacts = [
  //   ...contacts.slice(0, index),
  //   updatedContacts,
  //   ...contacts.slice(index + 1),
  // ];

  // await writeFile(newContacts);

  // return updatedContacts;
}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
