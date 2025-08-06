# API's for NeGD

Server URL

```bash
http://localhost:8000/api/v1
```

## Auth

### Login

Request URI

```bash
/auth/login
```

Request Body

```json
{
    "username":"test",
    "password":"123"
}
```

Response ( Success )

```json
{
    "token": "",
    "agent": {
        "_id": "",
        "username": "test",
        "name": "Test",
        "extensionCode": "2001",
        "role": "user",
        "languages": [
            "en"
        ]
    }
}
```

Response ( Error, Status: 400)

```json
{
    "error": "Invalid credentials"
}
```

Response ( Error, Status: 500)

```json
{
    "error": "Server error"
}
```

## Telephony

### onCall

Get the user mobile number to which agent is currently loggedIn.

```bash
/telephony/onCall
```

Request Headers

```json
{ "Authorization": "Bearer {{TOKEN}}" }
```

Response Body

```json
["9100000000"] // array of mobile numbers
```

### dialOutbound

Dial outbound number from the id of logged Agent.

```bash
/telephony/dialOutbound
```

Request Headers

```json
{ "Authorization": "Bearer {{TOKEN}}", "Content-Type": "application/json" }
```

Request Body

```json
{
    "number": //< number to call >
}
```

Response (Status: 200)

```json
{
    "message": "Dialing outbound",
    "data": {
        "response": {
            "need_apply": "no"
        },
        "status": 0
    }
}
```

Response (Status: 400)

```json
{ "message": "{{ Error Message }}" }
```

Response (Status: 500)

```json
{ "message": "{{ Error Message }}", "error": "{{ Error Stack}}" }
```

### activeCalls

Get Active calls for the agent.

Response Body

```json
{
    "channel": [
        {
            "channel1": "PJSIP/trunk_1-0000026e",
            "channel2": "PJSIP/2001-0000026f",
            "callerid1": "+919039096942",
            "callerid2": "2001",
            "uniqueid1": "1747307232.1022",
            "uniqueid2": "1747307244.1024",
            "bridge_time": "2025-05-15 16:37:33",
            "name1": "",
            "name2": "",
            "bridge_id": "6043248e-3beb-4de0-b478-a3488e300fab",
            "have_send": 1,
            "inbound_trunk_name": "AIRTEL",
            "outbound_trunk_name": "",
            "dial_service": "normal",
            "feature_num": "",
            "feature_name": "",
            "feature_calleenum": "",
            "feature_calleename": "",
            "bridge_timestamp": "1747307253"
        }
    ],
    "total_item": 1,
    "total_page": 1,
    "page": 1
}
```

Response ( Status: 500 )

```json
{"message": "{{ERROR}}" }
```
