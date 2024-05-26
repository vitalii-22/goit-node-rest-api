import Contact from "../models/contact.js";
import crypto from "node:crypto";

async function listContacts() {
  const contacts = await Contact.find();
  return contacts;
}

async function getContactById(contactId) {
  const contact = await Contact.findById(contactId);

  return contact;
}

async function removeContact(contactId) {
  const result = await Contact.findByIdAndDelete(contactId);

  console.log(result);

  return result;
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

async function updateContact(contactId, contact) {
  try {
    const newContact = {
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
    };

    const result = await Contact.findByIdAndUpdate(contactId, newContact);
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function updateStatusContact(contactId, contact) {
  try {
    console.log(contactId);
    console.log(contact);
    const newContact = {
      favorite: contact.favorite,
    };

    const result = await Contact.findByIdAndUpdate(contactId, newContact, {
      new: true,
    });

    return result;
  } catch (error) {
    console.log(error);
  }
}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
