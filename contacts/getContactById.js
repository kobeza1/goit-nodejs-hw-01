const getAll = require("./listContacts");

const getContactById = async (id) => {
  const products = await getAll();
  const result = products.find((item) => item.id === id);
  if (!result) {
    return null;
  }
  return result;
};

module.exports = getContactById;
