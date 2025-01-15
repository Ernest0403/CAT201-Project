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
        return value !== null && value !== undefined && !isNaN(value) && Number(value) >= 0;
    },

    isValidNumber: (value) => {
        return value !== null && value !== undefined && !isNaN(value);
    },

    isValidSku: (value) => {
        return value !== null && value !== undefined && /^[A-Z0-9_-]+$/.test(value) && value !== '';
    },

    /**
     * validate an object based on predefined rules
     * @param {Object} data object containing the fields to validate
     * @returns {boolean} returns true if all fields are valid, otherwise false
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

        let errorMessages = [];
        for (const field in rules) {
            if (!Validation[rules[field]](data[field])) {
                if (field === "product_sku") {
                    errorMessages.push(`Invalid SKU format: The SKU should consist of at least one uppercase letter followed by at least one number.`);
                } else {
                    errorMessages.push(`Invalid input: ${field.replace(/_/g, ' ')} is not valid.`);
                }
            }
        }
        return errorMessages.length > 0 ? errorMessages : true;
    },

    validateOrder: (data) => {
        const rules = {
            order_id: "isValidNumber",
            order_orderNumber: "isValidString",
            order_status: "isValidString",
            order_orderDate: "isValidDate",
        };

        let errorMessages = [];
        for (const field in rules) {
            if (!Validation[rules[field]](data[field])) {
                errorMessages.push(`Invalid input: ${field.replace(/_/g, ' ')} is not valid.`);
            }
        }
        return errorMessages.length > 0 ? errorMessages : true;
    }

};

export default Validation;
