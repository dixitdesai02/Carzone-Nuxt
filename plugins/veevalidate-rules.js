import { configure, defineRule } from "vee-validate";
import { required, min, max, url, numeric, min_value, max_value, email, confirmed, regex } from "@vee-validate/rules";

function validateDob(value) {
    const date = new Date(value);
    if (date > new Date('2015-12-31')) 
        return 'Date of Birth should be below year 2016';
    if (date < new Date('1900-01-01')) 
        return 'Date of Birth should be above year 1900';

    return true;
}
 
export default defineNuxtPlugin((nuxtApp) => {
    defineRule('required', required);
    defineRule('min', min)
    defineRule('max', max)
    defineRule('url', url)
    defineRule('numeric', numeric)
    defineRule('min_value', min_value)
    defineRule('max_value', max_value)
    defineRule('email', email)
    defineRule('confirmed', confirmed)
    defineRule('dob', validateDob)
    defineRule('regex', regex)

    configure({
        generateMessage: (ctx) => {

            const field = ctx.field;

            const messages = {
                required: `${field.charAt(0).toUpperCase() + field.slice(1)} can not be empty`,
                min: `${field.charAt(0).toUpperCase() + field.slice(1)} can not be less than ${ctx.rule.params} characters`,
                max: `${field.charAt(0).toUpperCase() + field.slice(1)} should not contain more than ${ctx.rule.params} characters`,
                url: `Please enter a valid URL`,
                numeric: `${field.charAt(0).toUpperCase() + field.slice(1)} must be numeric`,
                min_value: `${field.charAt(0).toUpperCase() + field.slice(1)} is too low`,
                max_value: `${field.charAt(0).toUpperCase() + field.slice(1)} is too high`,
                email: 'Please enter valid email address',
                confirmed: "Both Passwords must be same",
                regex: 'Password must contain atleast one special character and number'
            }

            const message = messages[ctx.rule.name] ? messages[ctx.rule.name] : `Invalid ${field.charAt(0).toUpperCase() + field.slice(1)}`;

            return message;
        }
    })
})