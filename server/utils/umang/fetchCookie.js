const umangFetchClient = require("./umangFetchClient")

const fetchCookie = async () => {
    const response = await umangFetchClient(`/newLogin?username=${process.env.UMANG_USERNAME}&password=${process.env.UMANG_PASSWORD}`)
    console.log(response.status)
}