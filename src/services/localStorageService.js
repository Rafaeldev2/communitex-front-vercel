const getItems = (key) => {
  const items = localStorage.getItem(key);
  return items ? JSON.parse(items) : [];
};

const saveItem = (key, item) => {
  const items = getItems(key);
  if (item.id) {
    // Update existing item
    const index = items.findIndex(i => i.id === item.id);
    if (index >= 0) {
      items[index] = item;
    } else {
      items.push(item);
    }
  } else {
    // Add new item
    item.id = Date.now().toString();
    items.push(item);
  }
  localStorage.setItem(key, JSON.stringify(items));
  return item;
};

const deleteItem = (key, id) => {
  const items = getItems(key).filter(item => item.id !== id);
  localStorage.setItem(key, JSON.stringify(items));
};

export default {
  getItems,
  saveItem,
  deleteItem
};