import { Router } from "express";
import contactUsCntrl from "../Controllers/ContactUsCntrl.js";
const contact = Router();

contact.post("/contact", contactUsCntrl.contactUs);

export default contact;
