import { response } from "express";
import contactsServices from "../services/contactsServices.js";
import {
  createContactSchema,
  updateContactSchema,
  updateStatusContactSchema,
} from "../schemas/contactsSchemas.js";

import { isValidObjectId } from "mongoose";

export const getAllContacts = (req, res) => {
  contactsServices
    .listContacts()
    .then((contacts) => {
      return res.status(200).json(contacts);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const getOneContact = (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(404).json({ message: "Not found" });
  }

  contactsServices
    .getContactById(id)
    .then((contact) => {
      if (contact === null) {
        return res.status(404).json({ message: "Not found" });
      }
      res.status(200).json(contact);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const deleteContact = (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(404).json({ message: "Not found" });
  }

  contactsServices
    .removeContact(id)
    .then((contact) => {
      if (contact === null) {
        return res.status(404).json({ message: "Not found" });
      }
      res.status(200).json(contact);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const createContact = (req, res) => {
  const contact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    favorite: req.body.favorite,
  };

  const { error, value } = createContactSchema.validate(contact, {
    abortEarly: false,
  });

  if (typeof error !== "undefined") {
    return res.status(400).json({
      message: error.details.map((error) => error.message).join(", "),
    });
  }

  contactsServices
    .addContact(contact)
    .then((contact) => {
      res.status(201).json({
        _id: contact.id,
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        favorite: contact.favorite,
      });
    })
    .catch((error) => {
      console.error(error);
    });
};

export const updateContact = (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(404).json({ message: "Not found" });
  }

  const data = req.body;

  if (Object.keys(data).length === 0) {
    return res
      .status(400)
      .json({ message: "Body must have at least one field" });
  }

  const { error, value } = updateContactSchema.validate(data, {
    abortEarly: false,
  });

  if (typeof error !== "undefined") {
    return res.status(400).json({
      message: error.details.map((error) => error.message).join(", "),
    });
  }

  contactsServices
    .updateContact(id, data)
    .then((contact) => {
      if (contact === null) {
        return res.status(404).json({ message: "Not found" });
      }

      res.status(200).json({
        _id: contact.id,
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        favorite: contact.favorite,
      });
    })
    .catch((error) => {
      console.error(error);
    });
};

export const updateStatusContact = (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(404).json({ message: "Not found" });
  }

  const data = req.body;

  if (Object.keys(data).length === 0) {
    return res.status(400).json({ message: "body must have a favorite field" });
  }

  const { error, value } = updateStatusContactSchema.validate(data, {
    abortEarly: false,
  });

  if (typeof error !== "undefined") {
    return res.status(400).json({
      message: error.details.map((error) => error.message).join(", "),
    });
  }

  const newContact = {
    favorite: req.body.favorite,
  };

  contactsServices
    .updateStatusContact(id, newContact)
    .then((contact) => {
      if (contact === null) {
        return res.status(404).json({ message: "Not found" });
      }

      res.status(200).json({
        _id: contact.id,
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        favorite: contact.favorite,
      });
    })
    .catch((error) => {
      console.error(error);
    });
};
