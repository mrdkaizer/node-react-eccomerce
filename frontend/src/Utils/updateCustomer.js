import { myFetch } from "./communication";

const updateCustomer = async (customer, token) => {
  try {
    if (customer.address.length <= 5) {
      throw new Error("This is not a valid shipping address");
    }
    if (customer.postal.length <= 2) {
      throw new Error("This is not a valid postal code");
    }
    if (customer.city.length <= 2) {
      throw new Error("This is not a valid city");
    }
    if (customer.country.length <= 2) {
      throw new Error("This is not a valid country");
    }

    const response = await myFetch("/customer", "PATCH", customer, token);

    if (response.status === 400) {
      throw new Error("Something went wrong");
    }
    if (response.status === 200) {
      return await response.json();
    }
  } catch (e) {
    throw e;
  }
};

export { updateCustomer };
