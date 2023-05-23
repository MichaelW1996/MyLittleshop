// import models
const Product = require("./Product");
const Category = require("./Category");
const Tag = require("./Tag");
const ProductTag = require("./ProductTag");

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: "category_id",
  onDelete: "CASCADE", //if you remove category its associated products will also be deleted
});
// Categories have many Products
Category.hasMany(Product, {
  foreignKey: "category_id",
});

Product.belongsToMany(Tag, { through: ProductTag, foreignKey: "product_id" });
// Products belongToMany Tags (through ProductTag)
Tag.belongsToMany(Product, { through: ProductTag, foreignKey: "tag_id" });
// Tags belongToMany Products (through ProductTag)

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
