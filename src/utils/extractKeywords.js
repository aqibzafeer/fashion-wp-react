export const extractKeywords = (prompt) => {
  const keywords = {
    color: null,
    price: null,
    gender: null,
    category: null,
    text: prompt.toLowerCase()
  };

  const colors = ["black", "white", "blue", "red", "green", "yellow", "pink", "gray", "orange"];
  colors.forEach((color) => {
    if (prompt.toLowerCase().includes(color)) keywords.color = color;
  });

  if (prompt.toLowerCase().includes("men")) keywords.gender = "men";
  else if (prompt.toLowerCase().includes("women")) keywords.gender = "women";

  const priceMatch = prompt.match(/under\s*(\d+)/i);
  if (priceMatch) {
    keywords.price = parseInt(priceMatch[1]);
  }

  const categories = ["shirt", "tshirt", "sneakers", "shoes", "pants", "jeans", "bag"];
  categories.forEach((cat) => {
    if (prompt.toLowerCase().includes(cat)) keywords.category = cat;
  });

  return keywords;
};
