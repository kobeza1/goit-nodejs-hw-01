const { Command } = require("commander");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  asyncHandler,
} = require("./contacts");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contacts = await asyncHandler(listContacts);
      console.log(contacts);
      break;
    case "get":
      const contact = await asyncHandler(getContactById, id);
      if (!contact) {
        throw new Error(`Product with id=${id} not found`);
      }
      console.log(contact);
      break;
    case "add":
      const newContact = await asyncHandler(addContact, name, email, phone);
      console.log(newContact);
      break;
    case "remove":
      const removedContact = await asyncHandler(removeContact, id);
      console.log(removedContact);
      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
