import moment from 'moment';

export default {
    methods: {
        formatDate (date, format, utc = true) {
            if (!date) {
                return '';
            }

            format = format || 'MMM D, YYYY';

            if (utc) {
                return moment(date)
                    .utc()
                    .format(format);
            }

            return moment.parseZone(date).format(format);
        },

        diffDate (date, unit = 'years', utc = true) {
            if (!date) {
                return null;
            }

            if (utc) {
                return moment()
                    .utc()
                    .diff(moment(date).utc(), unit);
            }

            return moment().diff(date, unit);
        },
    },
};
