# Windows NT 4.0 and Windows 95 Key Generator

![Screenshot](https://i.imgur.com/skt7k4g.png)

[![Website](https://img.shields.io/website?down_color=red&down_message=Down&label=win95.thevalleyy.tk&style=plastic&up_message=Up%21&url=https%3A%2F%2Fwin95.thevalleyy.tk)](https://win95.thevalleyy.tk)
[![Last Commit](https://img.shields.io/github/last-commit/thevalleyy/windows95keygen/master?style=plastic)](https://github.com/thevalleyy/windows95keygen/commits/master)
[![Version](https://img.shields.io/github/package-json/v/thevalleyy/windows95keygen?style=plastic)](https://github.com/thevalleyy/windows95keygen/blob/master/package.json#L3)
[![Size](https://img.shields.io/github/languages/code-size/thevalleyy/windows95keygen?style=plastic)](https://www.youtube.com/watch?v=DgJS2tQPGKQ)

## [GitHub Pages ReadMe (better)](https://thevalleyy.github.io/windows95keygen/) | [Back to the repo](https://github.com/thevalleyy/windows95keygen)

### Why?

I happened to find this repo on GitHub and immediately had so many ideas on how to improve it.
The [original creator](https://github.com/andreazllin) wrote

> I bumped into [FlyTech's Video](https://youtu.be/3DCEeASKNDk) and at the end of the video he challenged the viewers to make a program to generate the keys, so I tried, and this is the result.

### What?

This project consists of a Windows 95-styled [GUI](https://win95.thevalleyy.tk).

On the backend, an API handles all the requests. You can also call this [API](https://github.com/thevalleyy/windows95keygen#api-documentation) in your browser or reference it in your code.

---

## How To

#### Start the web server

1. Install all the necessary dependencies: `npm i`.
2. Then compile the web server: `npm run build`.
3. Start the web server with `npm run start`.

To enter dev mode, run `npm run dev`.

#### Generate keys

10-digit: `curl` [`https://win95.thevalleyy.tk/api/generate/10`](https://win95.thevalleyy.tk/api/generate/10)

11-digit: `curl` [`https://win95.thevalleyy.tk/api/generate/11`](https://win95.thevalleyy.tk/api/generate/11)

OEM key: `curl` [`https://win95.thevalleyy.tk/api/generate/oem`](https://win95.thevalleyy.tk/api/generate/oem)

To generate more than one key at a time, add `amount` as a query parameter:
`curl` [`https://win95.thevalleyy.tk/api/generate/10?amount=2`](https://win95.thevalleyy.tk/api/generate/10?amount=2)

---

#### Validate keys

Validate:

```sh
curl X POST https://win95.thevalleyy.tk/api/validate
-H "Content-Type: application/json"
-d "{\"key\": \"KEY\"}"
```

or

Validate: `curl` [`https://win95.thevalleyy.tk/api/validate?key=KEY`](https://win95.thevalleyy.tk/api/validate?key=KEY)

---

## API documentation

#### All endpoints:

| Endpoint                                                            | Description               | Affected by ratelimit |
| ------------------------------------------------------------------- | ------------------------- | :-------------------: |
| [`/api/generate/10`](https://win95.thevalleyy.tk/api/generate/10)   | Generates a 10-digit key  |          ✅           |
| [`/api/generate/11`](https://win95.thevalleyy.tk/api/generate/11)   | Generates an 11-digit key |          ✅           |
| [`/api/generate/oem`](https://win95.thevalleyy.tk/api/generate/oem) | Generates an OEM key      |          ✅           |
| [`/api/validate`](https://win95.thevalleyy.tk/api/validate?key=KEY) | Validates the above keys  |          ✅           |

#### Query parameters:

| Example parameter        | Description                                                                                                                             | Endpoints                                                                                                                                                                                                                            | Default limits                        |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------- |
| `?amount=3`              | Generates the specified number of keys. Must be a non-negative integer.                                                                 | [`/api/generate/10`](https://win95.thevalleyy.tk/api/generate/10?amount=3), [`/api/generate/11`](https://win95.thevalleyy.tk/api/generate/11?amount=3), [`/api/generate/oem`](https://win95.thevalleyy.tk/api/generate/oem?amount=3) | Max. number of keys: 5 keys at a time |
| `?key=123-456789`        | Validates the given key. Can be a 10-digit, 11-digit, or OEM key.                                                                       | [`/api/validate`](https://win95.thevalleyy.tk/api/validate?key=123-456789)                                                                                                                                                           | -                                     |
| `?whitelistKey=password` | Whitelists the request (no rate limit). <br> ⚠ If the IP address is blacklisted, the request will be blocked with the highest priority! | Can be used on any endpoint                                                                                                                                                                                                          | No whitelisted strings set            |

#### Responses

Generally speaking, if something goes wrong **on the server side**, the API will return a 4xx code. If the validation fails, this will result in a `200 OK` code, as everything went successfully, even though the key may be faulty.

| Call                                                                                                                          | Response                                                                                                                                                                                                                                                                                                                                                           | Status                                                                                | Explanation if needed                                                                                   |
| ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `curl` [`https://win95.thevalleyy.tk/api/generate/11?amount=2`](https://win95.thevalleyy.tk/api/generate/11?amount=2)         | `{"keys":["6490-9991563","3080-0374734"],"amount":2}`                                                                                                                                                                                                                                                                                                              | [200 OK](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/200)                | -                                                                                                       |
| `curl` [`https://win95.thevalleyy.tk/api/generate/11?amount=69`](https://win95.thevalleyy.tk/api/generate/11?amount=69)       | `{"error":"You can create a maximum of 5 11-digit keys at once","amount":69}`                                                                                                                                                                                                                                                                                      | [400 Bad Request](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400)       | Max. amount exceeded                                                                                    |
| `curl` [`https://win95.thevalleyy.tk/api/generate/11`](https://win95.thevalleyy.tk/api/generate/11)                           | `"blocked"`                                                                                                                                                                                                                                                                                                                                                        | [403 Forbidden](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/403)         | The requesting IP address has been blacklisted                                                          |
| `curl` [`https://win95.thevalleyy.tk/api/generate/11`](https://win95.thevalleyy.tk/api/generate/11)                           | `"Too Many Requests. Timeout will be: 300 seconds"`                                                                                                                                                                                                                                                                                                                | [429 Too Many Requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/429) | The requesting IP address has been rate-limited                                                         |
| `curl` [`https://win95.thevalleyy.tk/api/validate?key=000-0000007`](https://win95.thevalleyy.tk/api/validate?key=000-0000007) | `{"message":"Valid 10-Digit Key"}}`                                                                                                                                                                                                                                                                                                                                | [200 OK](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/200)                | -                                                                                                       |
| `curl` [`https://win95.thevalleyy.tk/api/validate?key=000-0000000`](https://win95.thevalleyy.tk/api/validate?key=000-0000000) | `{"message":{"check":"Invalid 10-digit key","details":"Second segment last digit control failed"}}`                                                                                                                                                                                                                                                                | [200 OK](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/200)                | Bad key. `details` gives the reason. <br> ⚠ Although the key is bad, the response code will be `200 OK` |
| `curl` [`https://win95.thevalleyy.tk/api/validate?key=hjfdsjk+`](https://win95.thevalleyy.tk/api/validate?key=hjfdsjk+)       | `{"message":"Unknown Key"}}`                                                                                                                                                                                                                                                                                                                                       | [200 OK](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/200)                | The type of the given key is unknown                                                                    |
| `curl` [`https://win95.thevalleyy.tk/api/validate`](https://win95.thevalleyy.tk/api/validate)                                 | `{"error":"Please specify a key via the \"key\" query parameter or POST body."}`                                                                                                                                                                                                                                                                                   | [400 Bad Request](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400)       | No key was given as a query parameter or as a POST json body                                            |
| `curl` [`https://win95.thevalleyy.tk/api/notARealEndpoint`](https://win95.thevalleyy.tk/api/notARealEndpoint)                 | `{"error":"/api/notARealEndpoint is not a valid request. Valid endpoints are listed below. Detailed instructions can be found under https://github.com/thevalleyy/windows95keygen#api-documentation.","methods":{"api":{"generate":{"10":"Generates a 10-digit Key","11":"Generates a 11-digit Key","oem":"Generates an OEM Key"},"validate":"Validates a Key"}}}` | [404 Not Found](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404)         | -                                                                                                       |

#### Rate limit

The default configuration blocks requests from a specific IP **for 300 seconds** (5 mins), if this IP sends more than **50 requests** in **120 seconds** (2 mins).

All the endpoints are also accessible via the [GUI](https://win95.thevalleyy.tk/). The rate limit also applies.

---

## Configuration

| Path (json)                       | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Default                                                                                                                                                                                                                         | Data type       |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `.config.port`                    | Port of the web server                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | `3000`                                                                                                                                                                                                                          | Number          |
| `.config.ip_blocklist`            | Whether to enable or disable the IP blacklist                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | `true`                                                                                                                                                                                                                          | Boolean         |
| `.config.rate_limit_requests`     | Whether to enable or disable the rate limit                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | `true`                                                                                                                                                                                                                          | Boolean         |
| `.config.skip_local_ips`          | Whether to ignore requests from the same machine (!) as the web server or API                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | `true`                                                                                                                                                                                                                          | Boolean         |
| `.config.whitelist_keys`          | Array of strings that are used to whitelist a request (= no rate limit)                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | `[]`                                                                                                                                                                                                                            | Array > Strings |
| `.log.enabled`                    | Whether to log requests and rate limits                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | `false`                                                                                                                                                                                                                         | Boolean         |
| `.log.ips`                        | Whether to log IP addresses                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | `false`                                                                                                                                                                                                                         | Boolean         |
| `.log.requests`                   | Whether to log requests (actually, this just logs the **URL** of the request. but, you know, I am way too lazy to correct the name)                                                                                                                                                                                                                                                                                                                                                                                                              | `true`                                                                                                                                                                                                                          | Boolean         |
| `.log.log_path`                   | The file path to store the log files in                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | `"./logs/"`                                                                                                                                                                                                                     | String          |
| `.log.log_extension`              | The file extension of the log files                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | `".log"`                                                                                                                                                                                                                        | String          |
| `.limits.keys.10`                 | Max. number of 10-digit keys that can be requested at a time                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | `5`                                                                                                                                                                                                                             | Number          |
| `.limits.keys.11`                 | Max. number of 11-digit keys that can be requested at a time                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | `5`                                                                                                                                                                                                                             | Number          |
| `.limits.keys.oem`                | Max. number of OEM keys that can be requested at a time                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | `5`                                                                                                                                                                                                                             | Number          |
| `.limits.requests.requests`       | Max. number of requests in a specified time (one line below)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | `50`                                                                                                                                                                                                                            | Number          |
| `.limits.requests.specified_time` | Time in seconds to allow a specified (one line above) number of requests in                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | `120`                                                                                                                                                                                                                           | Number          |
| `.limits.requests.block_duration` | Time in seconds to block an IP address that has exceeded the limit for                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | `300`                                                                                                                                                                                                                           | Number          |
| `.blocked-ips`                    | Array of strings representing blocked IP addresses. IPs in thit list will be blocked 100% of the time                                                                                                                                                                                                                                                                                                                                                                                                                                            | `[]`                                                                                                                                                                                                                            | Array > Strings |
| `.html-meta-data.title`           | HTML meta title                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | `"Windows NT 4.0 and Windows 95 Key Generator"`                                                                                                                                                                                 | String          |
| `.html-meta-data.description`     | HTML meta description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | `"This Windows 95 styled website allows you to create Windows NT 4.0, Windows 95, Windows 98 and Office 7.0 keys. It supports different forms such as 10-digit, 11-digit, or OEM format. There's also a public API available!"` | String          |
| `.html-meta-data.url`             | HTML meta url, must contain the protocol. `.html-meta-data.title` must be set to use a URL                                                                                                                                                                                                                                                                                                                                                                                                                                                       | `"https://win95.thevalleyy.tk/"`                                                                                                                                                                                                | String          |
| `.html-meta-data.image`           | HTML meta image, must contain the protocol                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | `"https://i.imgur.com/skt7k4g.png"`                                                                                                                                                                                             | String          |
| `.html-meta-data.large_image`     | Should the image be large or small?                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | `true`                                                                                                                                                                                                                          | Boolean         |
| `.html-meta-data.color`           | HTML meta color, has to be a hex value                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | `"#000181"`                                                                                                                                                                                                                     | String          |
| `.oEmbed-meta-data.author_name`   | oEmbed author name                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | `"Free and open source on GitHub"`                                                                                                                                                                                              | String          |
| `.oEmbed-meta-data.author_url`    | oEmbed author URL, must contain the protocol. `.oEmbed-meta-data.author_name` must be set to use an URL                                                                                                                                                                                                                                                                                                                                                                                                                                          | `"https://github.com/thevalleyy/windows95keygen"`                                                                                                                                                                               | String          |
| `.oEmbed-meta-data.provider_name` | oEmbed provider name                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | `"windows95keygen by thevalleyy"`                                                                                                                                                                                               | String          |
| `.oEmbed-meta-data.provider_url`  | oEmbed provider URL, must contain the protocol                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | `"https://github.com/thevalleyy"`                                                                                                                                                                                               | String          |
| `.url`                            | URL of your web page. Must be <ul><li>`protocol`</li><li>`subdomain`, if available</li><li>`domain`</li><li>`domain extension`</li><li>`path`, if available</li><li>`port`, if available</li></ul> `.oEmbed-meta-data.provider_name` must be set to use an URL. If you don't know what this is, visit your web page, open dev tools (Ctrl + Shift + i), and run `window.location.origin` in the console. <br> ⚠ oEmbed meta data will only work if the value in `.url` is correct. If you leave it at default, the oEmbed meta data won't change | `"https://win95.thevalleyy.tk/"`                                                                                                                                                                                                | String          |
| `.pun-arr`                        | Funny jokes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | See below                                                                                                                                                                                                                       | Array > Strings |

#### pun-arr

```json
[
    "Bill Gates",
    "You",
    "Me",
    "joe",
    "Everybody.",
    "Your Mom",
    "Chuck Norris",
    "The monster under your bed",
    "Tasmanian devils and koalas",
    "Rick Astley",
    "Caffeine refusers",
    "Technophobes who want to make an exception",
    "Axel Voss",
    "People who code in English",
    "People who believe that \"Linux\" is a lifestyle",
    "People who call \"Inkscape\" a tattoo",
    "People who like to work Excel-lent",
    "People who drink a cup of java in the morning",
    "People who program pythons at the zoo",
    "People who are obsessed with JavaScript",
    "People who code in HTML, just like me!",
    "My chemistry teacher ♥"
]
```

---

#### HTML meta content & oEmbed data

`.html-meta-data`:

![Discord Embed](https://i.imgur.com/MpA0m3x.png)

Difference between `.html-meta-data.large_image = true` and `.html-meta-data.large_image = false`:

<table><tr><td valign="top"><img src="https://i.imgur.com/QotJGQ4.png" /> </td><td valign="top"><img src="https://i.imgur.com/CQqVHzY.png" /> </td></tr></table>

`oEmbed-meta-data`:

![Discord Embed2](https://i.imgur.com/2TnhIQ8.png)

If you are familiar with the [`EmbedBuilder`](https://discord.js.org/#/docs/discord.js/main/class/EmbedBuilder) constructor in [`discord.js`](https://discord.js.org/#/), here are the corresponding functions:
|HTML or oEmbed|discord.js|
|----|----------|
|`.html-meta-data.title`|`.setTitle()`|
|`.html-meta-data.description`|`.setDescription()`|
|`.html-meta-data.url`|`.setURL()`|
|`.html-meta-data.image` && `.html-meta-data.large_image = true`|`.setImage()`|
|`.html-meta-data.image` && `.html-meta-data.large_image = false`|`.setThumbnail()`|
|`.html-meta-data.color`|`.setColor()`|
|`.oEmbed-meta-data.author_name`|`.setAuthor({ name: "" })`|
|`.oEmbed-meta-data.author_url`|`.setAuthor({ name: "", url: "" })`|
|`.oEmbed-meta-data.provider_name`|`n/a`|
|`.oEmbed-meta-data.provider_url`|`n/a`|

---

## Logs

The log directory and file extension can be configured in `config.json` (`.log.log_path` and `.log.log_extension`). Each log file contains 24 hours of information and is named with the corresponding date in ISO format. E.g. `2023-06-06.log`

Each log entry has the same structure:

| Key      | Value(s)                                                                                                          | Description                                                                                                                                                                                                                                                                                                           | Example                                        |
| -------- | ----------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| `type`   | `"blocked"` or `"allowed"`                                                                                        | Whether the request was blocked or not                                                                                                                                                                                                                                                                                | `"blocked"`                                    |
| `reason` | <ul><li>`"bl"`</li><li>`"rl"`</li></ul><ul><li>`"wl"`</li><li>`"local"`</li><li>`"nfc"`</li><li>`"nrl"`</li></ul> | Reason for blocking or allowing the request: <br><ul><li>`"bl"`: blacklisted</li><li>`"rl"`: rate-limited</li><li>`"wl"`: whitelisted</li><li>`"local"`: local IP (configured in `config.json`)</li><li>`"nfc"`: no further checks; rate limiting is disabled and IP is not blocked</li><li>`"nrl"`: not rate-limited | `"rl"`</li></ul>                               |
| `time`   | A unix timestamp                                                                                                  | Exact time of the request                                                                                                                                                                                                                                                                                             | `1685996280444`                                |
| `ip`     | IPv4 address or IPv6 address                                                                                      | IP address of the request, if not disabled in `config.json`                                                                                                                                                                                                                                                           | `"85.9.18.42"` (don't even try, it's not real) |
| `url`    | URL                                                                                                               | URL of the request, if not disabled in `config.json`                                                                                                                                                                                                                                                                  | `"/api/generate/oem"`                          |

To summarise, the log line explained above would look like this:

```json
{ "type": "blocked", "reason": "rl", "time": 1685996280444, "ip": "85.9.18.42", "url": "/api/generate/oem" }
```

⚠ These json objects are stored directly below each other without any trailing commas. This means that to convert the log file to json, you need to add commas after each line.

---

![Keys tested on](https://i.imgur.com/HJNxR2k.png)

## Inspiration/Credits

-   [Blog post by gurney](https://gurney.dev/posts/mod7/) - 📝 Detailed explanation of the algorithm and more.
-   [@dgurney's article](https://medium.com/@dgurney/so-you-want-to-generate-license-keys-for-old-microsoft-products-a355c8bf5408) - 📰 Article on how it works.
-   [FlyTech's Video](https://youtu.be/3DCEeASKNDk) - 🎥 Video about this topic.
