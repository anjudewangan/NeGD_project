const umangFetchClient = require("../utils/umang/umangFetchClient")

exports.services = async (req, res) => {
    const response = await umangFetchClient.post("/fetchDepartment", { "lang": "en", "trkr": "", "states": "99" }, {
        headers: {
            "Origin": "https://report.umang.gov.in",
            "Referer": "https://report.umang.gov.in/CRM/home",
            "Set-Fetch-Dest": "empty",
            "Set-Fetch-Mode": "cors",
            "Set-Fetch-Site": "same-origin",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36 OPR/119.0.0.0",
            "sec-ch-ua": '"Chromium";v="134", "Not:A-Brand";v="24", "Opera";v="119"',
            "sec-ch-ua-mobile": '?0',
            "sec-ch-ua-platform": '"Windows"',
        }
    })

    return res.send('ok')
} 