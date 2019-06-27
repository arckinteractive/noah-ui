export default {
    install: (Vue, options) => {
        Vue.prototype.$log = function (err) {
            if (!(err instanceof Error)) {
                return;
            }

            if (process.env.NODE_ENV !== 'production') {
                console.trace(err);
            }

            if (options.logger) {
                const { log } = options.logger;

                if (typeof log === 'function') {
                    log(err);
                }
            }
        };

        Vue.prototype.$error = function (err, message, altMessages = {}) {
            const getStatusCode = (error) => {
                if (error.statusCode) {
                    return error.statusCode;
                }

                if (error.response) {
                    return error.response.status;
                }

                return 500;
            };

            const statusCode = getStatusCode(err);

            if (typeof altMessages[statusCode] !== 'undefined') {
                Vue.prototype.$alert(altMessages[statusCode], 'danger');
            } else {
                const msg = message || message === '' ? message : err.message;

                Vue.prototype.$alert(msg, 'danger');
            }
        };
    },
};
