const categories = (id: number): string => {
  const category = ["Phone", "Notebook", "Tablet", "Watch", "Headphone", "Speaker"];
  if (category[id - 1]) {
    return category[id - 1];
  }
  return "sin categoría";
};

export default categories;
