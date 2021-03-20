/**
 * Service Polling System - React Application
 *
 * @category   Application_Frontend
 * @package    service-polling-system
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 **/

import { toast } from "react-toastify";

// handle delete operation
export async function handleDelete({
  items = [],
  targetItem = {},
  stateCallback = null,
  deleteCallback = null,
  history = null,
}) {
  // optimistic method (updates frontend first and updates backend later)
  if (stateCallback && items && items.length && targetItem && targetItem._id) {
    const filteredItems = items.filter((item) => item._id !== targetItem._id);
    stateCallback(filteredItems);
  }

  // call backend for deleting
  try {
    // delete from server
    if (deleteCallback && targetItem && targetItem._id) {
      await deleteCallback(targetItem._id);
    }

    // show success message
    toast.success("The item successfully deleted from database!");

    // redirect to list page
    if (history && history.goBack) history.goBack();
  } catch (error) {
    // show error message for 404
    if (error.response && error.response.status === 404) {
      toast.error("The item has already been deleted!");
    }

    // roll back to the original data on failure
    if (stateCallback && items && items.length) {
      stateCallback(items);
    }
  }
}

export default {
  handleDelete,
};
