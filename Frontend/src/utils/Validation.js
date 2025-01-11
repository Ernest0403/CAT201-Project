const Validation = {
    isValidPositiveFloat: (value) => {
        return value !== null && value !== undefined && value !== '' && !isNaN(value) && Number(value) === parseFloat(value) && value >= 0;
    },

    isValidDate: (value) => {
        return value !== null && value !== undefined && /^\d{4}-\d{2}-\d{2}$/.test(value);
    },

    isValidString: (value) => {
        return value !== null && value !== undefined && typeof value === 'string' && value.trim() !== '';
    },

    isValidPositiveNumber: (value) => {
        return value !== null && value !== undefined && !isNaN(value) && Number(value) > 0;
    },

    isValidNumber: (value) => {
        return value !== null && value !== undefined && !isNaN(value);
    },

    isValidSku: (value) => {
        return value !== null && value !== undefined && /^[A-Z0-9_-]+$/.test(value) && value !== '';
    },

    /**
     * Validate an object based on predefined rules
     * @param {Object} data - Object containing the fields to validate
     * @returns {boolean} - Returns true if all fields are valid, otherwise false
     */
    validateProduct: (data) => {
        const rules = {
            product_sku: "isValidSku",
            product_name: "isValidString",
            product_src: "isValidString",
            product_roomCategory: "isValidString",
            product_itemCategory: "isValidString",
            product_price: "isValidPositiveFloat",
            product_quantity: "isValidPositiveNumber",
            product_weight: "isValidPositiveNumber",
            product_arrivalDate: "isValidDate",
            product_dimension: "isValidString",
            product_material: "isValidString",
            product_brand: "isValidString",
            product_colour: "isValidString",
            product_manufacturer: "isValidString",
            product_discount: "isValidPositiveFloat",
            product_warranty: "isValidString",
            product_discountedPrice: "isValidPositiveFloat",
            product_orderVolume: "isValidNumber"
        };

        for (const field in rules) {
            if (!Validation[rules[field]](data[field])) {
                if (field === "product_sku") {
                    alert(`Invalid SKU format: The SKU should consist of at least one uppercase letters followed by at least one numbers.`);
                } else {
                    alert(`Invalid input: ${field.replace(/_/g, ' ')} is not valid.`);
                }
                return false;
            }
        }

        return true;
    }
};

export default Validation;
