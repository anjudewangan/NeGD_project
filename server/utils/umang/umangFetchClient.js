const axios = require('axios')

const umangFetchClient = axios.create({
    baseURL: process.env.UMANG_BASE_URL
})

umangFetchClient.interceptors.response.use(res => res, async (error) => {
    const { config, response } = error

    const res = await umangFetchClient(`/newLogin?username=${process.env.UMANG_USERNAME}&password=${process.env.UMANG_PASSWORD}`)
    const setCookieHeader = res.headers['set-cookie']
    if (setCookieHeader) {
        setCookieHeader.forEach(cookieString => {
            // Example: Parse the cookie string (simplified)
            const cookieParts = cookieString.split(';')[0].split('=');
            const cookieName = cookieParts[0];
            const cookieValue = cookieParts[1];
            console.log(`Cookie Name: ${cookieName}, Value: ${cookieValue}`);
            // Further parsing would be needed to extract other cookie attributes
        });
    }
    console.log('Cookie Header', res.headers["set-cookie"])

    return Promise.reject(error);
})

module.exports = umangFetchClient