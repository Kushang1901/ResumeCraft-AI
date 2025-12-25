export async function getRecaptchaToken(action) {
    if (!window.grecaptcha || !window.grecaptcha.enterprise) {
        throw new Error("reCAPTCHA not loaded");
    }

    return await window.grecaptcha.enterprise.execute(
        process.env.REACT_APP_RECAPTCHA_SITE_KEY,
        { action }
    );
}
