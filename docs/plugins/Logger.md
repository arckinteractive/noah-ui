---
label: Logger
---

## Logger

### Overview

Logger plugin allows you to reduce boilerplate in handling errors. It exposes two public methods:

 * `$log()` for handling system errors
 * `$error()` for displaying user-friendly error alerts

### Using `$log`

```js
export default {
    methods: {
        catches() {
            try {
                // method that may throw an error  
            } catch (err) {
                this.$log(err);
            }
        },
    }
}
```

```js
export default {
    methods: {
        promises() {
            Promise.reject().catch(this.$log);
        },
    }
}
```

### Custom logging

You can inject a customer logger function with the config object on initialization:

```js
import Vue from 'vue';
import NoahUi from 'noah-ui';
import config from 'noah-ui/src/noah.config';

config.logger.log = (err) => {
    if (process.env.NODE_ENV === 'production') {
        // send a system error report to your favorite log aggregator
    }
};

Vue.use(NoahUi, config);
```

### Using `$error()`

`$error()` allows you to provide feedback to users, when errors occur. This intends to simplify HTTP error handling that is so common in API-driven environments.


```js
export default {
    methods: {
        makeApiCall() {
            axios.post().catch((err) => {
                this.$error(err, 'Default error message', {
                    400: 'The form contains errors',
                    403: 'You are unauthorized to perform this action',
                    404: 'Sorry, the page you are looking for was not found',
                });
            });
        }
    },
}
``` 
 
