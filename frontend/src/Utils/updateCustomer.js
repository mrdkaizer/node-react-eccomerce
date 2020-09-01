import { myFetch } from "./communication";

const updateCustomer = async (customer, token) => {
  try {
    if (customer.address <= 5) {
      throw new Error("This is not a valid shipping address");
    }
    if (customer.postal <= 2) {
      throw new Error("This is not a valid postal code");
    }
    if (customer.city <= 2) {
      throw new Error("This is not a valid city");
    }
    if (customer.country <= 2) {
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
