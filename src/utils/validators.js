export const create = (validator) => {
    return {
        async validator (rule, value, callback) {
            try {
                const result = await validator(value);

                if (typeof result === 'string' || result === false) {
                    callback(new Error(result || 'Value is invalid'));
                } else {
                    callback();
                }
            } catch (err) {
                callback(err);
            }
        },
        trigger: 'change',
    };
};

export const validateRule = async (value, rule) => {
    const { validator } = rule;

    return new Promise((resolve, reject) => {
        validator(rule, value, (err) => {
            err ? reject(err) : resolve();
        });
    });
};

export const validate = async (model, rules) => {
    // Used mainly for testing
    const results = {};
    const promises = [];

    Object.keys(rules).forEach((prop) => {
        const propRules = rules[prop];

        if (typeof results[prop] === 'undefined') {
            results[prop] = [];
        }

        promises.push(
            ...propRules.map((rule) => {
                return validateRule(model[prop], rule)
                    .catch((err) => {
                        results[prop].push(err.message);
                    });
            }),
        );
    });

    return Promise.all(promises).then(() => results);
};

export const assertValidEmail = (value, err) => {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!pattern.test(value)) {
        throw new Error(err || 'Please enter a valid email.');
    }
};

export default {
    required: (err) => {
        err = err || 'This field is required';

        return create((value) => {
            if (typeof value === 'string') {
                return (value && value.length > 0) || err;
            }

            if (typeof value === 'number') {
                return (value || value === 0) || err;
            }

            if (Array.isArray(value)) {
                return value.length > 0 || err;
            }

            return !!value || err;
        });
    },

    type: (type, err) => {
        return create((value) => {
            switch (type) {
                case 'email':
                    assertValidEmail(value, err);
                    break;

                default:
                    break;
            }
        });
    },

    minLength: (n, err) => {
        return create((value) => {
            if (!value || value.length < n) {
                if (Array.isArray(value)) {
                    return err || `Value must contain at least ${n} options`;
                }

                return err || `Value must be at least ${n} characters long`;
            }

            return true;
        });
    },

    maxLength: (n, err) => {
        return create((value) => {
            if (!value || value.length > n) {
                if (Array.isArray(value)) {
                    return err || `Value must contain no more than ${n} options`;
                }

                return err || `Value must be less than ${n} characters long`;
            }

            return true;
        });
    },

    isEmail: (err) => {
        return create((value) => {
            assertValidEmail(value, err);
        });
    },

    min: (n, err) => {
        return create((value) => value > n || err || `Value must be greater than ${0}`);
    },

    custom: (validator) => {
        return create(validator);
    },
};
