import Product from "../../../models/User/product.js";
import Category from "../../../models/User/Category.js";
import Brand from "../../../models/User/Brand.js";

export const CreateProductservice = async (data) => {
    const { userId, categoryId, brandId, subcategory } = data;

    // Validate category belongs to user (or is global)
    const category = await Category.findOne({
        _id: categoryId,
        $or: [{ userId: userId }, { isGlobal: true }],
    });

    if (!category) {
        throw new Error("Invalid category");
    }

    // If subcategory provided, ensure it exists under the category
    if (subcategory) {
        const subs = category.subcategories || [];
        if (!subs.includes(subcategory)) {
            throw new Error("Invalid subcategory for selected category");
        }
    }

    // If brand provided, ensure brand belongs to user and matches category
    if (brandId) {
        const brand = await Brand.findOne({ _id: brandId, categoryId: categoryId, userId: userId });
        if (!brand) {
            throw new Error("Invalid brand for selected category");
        }
    }

    return await Product.create(data);
};