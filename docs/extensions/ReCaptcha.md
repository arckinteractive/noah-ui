---
label: ReCaptcha
---

## ReCaptcha

### Installation

```js
import Vue from 'vue';
import NRecaptcha from '@arckinteractive/noah-ui/src/extensions/NRecaptcha';

Vue.use(NRecaptcha, {
    siteKey: '6LcoUKIUAAAAABUikWoT_q3KF21LiPhU4g7rKL6O',
});
```

### Usage

Please see [ReCaptcha docs](https://developers.google.com/recaptcha/docs/verify) in order to implement server-side validation of the response.
`NRecapatcha` gives you two options for server-side validation:

 - Use `v-model` and submit captcha response with your form, and perform validation before processing remaining form data
 - Use `verifier` prop to provide a function that will verify the response on the server and prevent form submission if verification fails. The function should return a promise, and throw an error in case of failed validation. 

<ComponentDemo name="ReCaptcha" />
