const Joi = require("joi");
const { Router } = require("express");
const { validate } = require("../helpers/helpers");
const { tcWrapper } = require("../helpers/helpers");

const contactsController = require("../controllers/contactsController");
const router = Router();

const createContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.number().required(),
});

const updateContactScheme = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.number(),
}).min(1);

router.post(
  "/",
  validate(createContactSchema),
  tcWrapper(contactsController.addNewContact)
);

router.get("/", tcWrapper(contactsController.getContacts));
router.get("/:contactId", tcWrapper(contactsController.getContact));
router.delete("/:contactId", tcWrapper(contactsController.deleteContact));
router.patch(
  "/:contactId",
  validate(updateContactScheme),
  contactsController.updateContact
);
exports.contactRouter = router;
