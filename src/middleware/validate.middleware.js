const { BadRequestError } = require("../core/error.response");

const defaultSchemas = { body: null, query: null, params: null };
const validate = (schema = defaultSchemas) => {
    return (req, res, next) => {
        ["body", "query", "params"].forEach((field) => {
            if (schema[field]) {
                const { error } = schema[field].validate(req[field], {
                    abortEarly: false,
                });
                throw new BadRequestError(error);
            }
        });

        next();
    };
};

export default validate;
