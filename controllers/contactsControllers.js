import { response } from "express";
import { listContacts } from "../services/contactsServices.js";

export const getAllContacts = (req, res) => {
  listContacts()
    .then((contacts) => res.status(200).json(contacts))
    .catch((error) => {
      console.error(error);
    });
};

export const getOneContact = (req, res) => {
  // try {
  //   const { id } = req.params;
  //   const contact = await getContactById(id);
  //   res.status(200).send(contact);
  // } catch (error) {
  //   console.log(error);
  // }
};

export const deleteContact = (req, res) => {};

export const createContact = (req, res) => {};

export const updateContact = (req, res) => {};
