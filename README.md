# Windows NT 4.0 and Windows 95 Key Generator

![Screenshot](https://i.imgur.com/skt7k4g.png)

[![Website](https://img.shields.io/website?label=win95.thevalleyy.tk&style=flat-square&url=https%3A%2F%2Fwin95.thevalleyy.tk)](https://win95.thevalleyy.tk)

### Why?
I happened to find this repo on GitHub and immediately had so many ideas on how to improve it. 
The [original creator](https://github.com/andreazllin) wrote
> I bumped into [FlyTech's Video](https://youtu.be/3DCEeASKNDk) and at the end of the video he challenged the viewers to make a program to generate the keys, so I tried, and this is the result.

---
## How To
#### Start the webserver
First, compile: `npm run build`. Then start your webserver using `npm run start`. To enter dev mode, run `npm run dev`.

#### Generate Keys

10-digit: `curl` [`https://win95.thevalleyy.tk/api/generate/10`](https://win95.thevalleyy.tk/api/generate/10)

11-digit: `curl` [`https://win95.thevalleyy.tk/api/generate/11`](https://win95.thevalleyy.tk/api/generate/11)

OEM Key: `curl` [`https://win95.thevalleyy.tk/api/generate/oem`](https://win95.thevalleyy.tk/api/generate/oem)

To generate more than one key a time, add `amount` as a query parameter:
`curl` [`https://win95.thevalleyy.tk/api/generate/10?amount=2`](https://win95.thevalleyy.tk/api/generate/10?amount=2)

---
#### Validate Keys

Validate: `https://win95.thevalleyy.tk/api/validate` 

```json
{ 
  "key": "YOUR KEY" 
}
```
or

Validate: `curl` [`https://win95.thevalleyy.tk/api/validate?key=<YOUR KEY>`](https://win95.thevalleyy.tk/api/validate?key=<YOUR KEY>)

---
## API documentation
#### All endpoints:
|Endpoint|Description|Affected by ratelimit|
|--------|-----------|:---------------------:|
|[`/api/generate/10`](https://win95.thevalleyy.tk/api/generate/10)|Generates a 10-digit key|✅|
|[`/api/generate/11`](https://win95.thevalleyy.tk/api/generate/11)|Generates a 11-digit key|✅|
|[`/api/generate/oem`](https://win95.thevalleyy.tk/api/generate/oem)|Generates a OEM key|✅|
|[`/api/validate/`](https://win95.thevalleyy.tk/api/validate?key=<KEY>)|Validates any key of the above|✅|

#### Query Parameters:
|Example parameter|Description|Endpoints|Default limitations|
|-----------------|-----------|---------|-------------------|
|`?amount=3`|Generates the given amount of keys. Has to be a nonnegative integer.|[`/api/generate/10`](https://win95.thevalleyy.tk/api/generate/10?amount=3), [`/api/generate/11`](https://win95.thevalleyy.tk/api/generate/11?amount=3), [`/api/generate/oem`](https://win95.thevalleyy.tk/api/generate/oem?amount=3)|Max. amount: 5 keys at a time|
|`?key=123-456789`|Validates the given key. Can be 10-digit, 11-digit or OEM key.|[`/api/validate/`](https://win95.thevalleyy.tk/api/validate?key=123-456789)|-|
|`?whitelistKey=password`|Whitelists the request (no ratelimit).|Usable on every endpoint|No whitelisted strings set|

#### Responses
Generally can be said, if something goes wrong **on the serverside**, the api will send a 4xx code. If you validation fails, this will result in a 200 OK code, since everything went successfull even though the key might be faulty.
|Call|Response|Status|Explaination if needed|
|----|--------|------|----------------------|
|`curl` [`https://win95.thevalleyy.tk/api/generate/11?amount=2`](https://win95.thevalleyy.tk/api/generate/11?amount=2)|`{"keys":["6490-9991563","3080-0374734"],"amount":2}`|[200 OK](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/200)|-|
|`curl` [`https://win95.thevalleyy.tk/api/generate/11?amount=69`](https://win95.thevalleyy.tk/api/generate/11?amount=69)|`{"error":"You can create a maximum of 5 11-digit Keys at once","amount":69}`|[400 Bad Request](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400)|Max. amount exeeded|
|`curl` [`https://win95.thevalleyy.tk/api/generate/11`](https://win95.thevalleyy.tk/api/generate/11)|`"blocked"`|[403 Forbidden](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/403)|The requesting ip address was blacklisted|
|`curl` [`https://win95.thevalleyy.tk/api/generate/11`](https://win95.thevalleyy.tk/api/generate/11)|`"Too Many Requests. Timeout will be: 300 seconds"`|[429 Too Many Requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/429)|The requesting ip has been ratelimited|
|`curl` [`https://win95.thevalleyy.tk/api/validate?key=000-0000007`](https://win95.thevalleyy.tk/api/validate?key=000-0000007)|`{"message":"Valid 10-Digit Key"}}`|[200 OK](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/200)|-|
|`curl` [`https://win95.thevalleyy.tk/api/validate?key=000-0000000`](https://win95.thevalleyy.tk/api/validate?key=000-0000000)|`{"message":{"check":"Invalid 10-Digit Key","details":"Second segment last digit control failed"}}`|[200 OK](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/200)|Faulty key. `details` states the reason. **Caution!** Even though the key is faulty, the response code will be 200 OK|
|`curl` [`https://win95.thevalleyy.tk/api/validate?key=hjfdsjk+`](https://win95.thevalleyy.tk/api/validate?key=hjfdsjk+)|`{"message":"Unknown Key"}}`|[200 OK](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/200)|Type of given key is unknown|
|`curl` [`https://win95.thevalleyy.tk/api/validate`](https://win95.thevalleyy.tk/api/validate)|`{"error":"Please specify a Key using "/validate?key=<your key>""}`|[400 Bad Request](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400)|No key was given as a query parameter|

#### Rate limit
The default configuration blocks requests from a specific ip **for 300 seconds** (5 mins), if said ip sends more than **50 requests** in **120 seconds** (2 mins). 

All the endpoints can also be reached via the [gui](https://win95.thevalleyy.tk/). The rate limit also applies.

---
## Configuration
|Path (json)|Description|Default|Data type|
|-----------|-----------|-------|---------|
|`.config.port`|Port of the webserver|`3000`|Number|
|`.config.ip_blocklist`|Wheter to enable or disable the ip blacklist|`true`|Boolean|
|`.config.rate_limit_requests`|Wheter to enable or disable the rate limit|`true`|Boolean|
|`.config.skip_local_ips`|Wheter to ignore requests from the same machine (!) as the webserver / api|`true`|Boolean|
|`.config.whitelist_keys`|Array of strings that are used to whitelist a request (= no rate limit)|`[]`|Array > Strings|
|`.log.enabled`|Wheter to log activity like requests and rate limits|`false`|Boolean|
|`.log.ips`|Wheter to log ip addresses|`false`|Boolean|
|`.log.requests`|Wheter to log requests (actually, this logs just the **url** of the request. but, you know, I am way too lazy to correct the name)|`true`|Boolean|
|`.log.log_path`|The file path to save the log files in|`"./logs/"`|String|
|`.log.log_extention`|The file extention of the log files|`".log"`|String|
|`.limits.keys.10`|Max. amount of 10-digit keys which can be requestet at a time|`5`|Number|
|`.limits.keys.11`|Max. amount of 11-digit keys which can be requestet at a time|`5`|Number|
|`.limits.keys.oem`|Max. amount of OEM keys which can be requestet at a time|`5`|Number|
|`.limits.requests.requests`|Max. amount of requests in a given (one line below) time|`50`|Number|
|`.limits.requests.specified_time`|Time in seconds to allow a given (one line above) number of requests in|`120`|Number|
|`.limits.requests.block_duration`|Time in seconds to block an ip address which exeeded the limit for|`300`|Number|
|`.blocked-ips`|Array of strings that represent blocked ip addresses. Ips in that list get 100% blocked|`[]`|Array > Strings|
|`.pun-arr`|Funny jokes|See below|Array > Strings|

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
        "People who program in HTML, just like me!",
        "My chemistry teacher ♥"
    ]
```
---
## Logs
The log directory and file extention can be configured in `config.json` (`.log.log_path` and `.log.log_extention`). Every log file contains 24h of information and is named the corresponding date in ISO format. E.g. `2023-06-06.log`

Every log entry is constructed the same.
|Key|Value|Description|Example|
|---|-----|-----------|-------|
|`type`|`"blocked"` or `"allowed"`|Wheter the request was blocked or not| `"blocked"`|
|`

------------

## Tested on

- Microsoft Windows NT 4.0 Server (4.00.1381.1)
- Microsoft Windows NT 4.0 Workstation (4.00.1381.1) [OEM]
- Microsoft Windows 95C (4.03.1216.OSR2.5) [OEM]


## Inspiration/Credits

- [Blog post from gurney](https://gurney.dev/posts/mod7/) - Detailed explanation of the algorithm and more.
- [@dgurney's article](https://medium.com/@dgurney/so-you-want-to-generate-license-keys-for-old-microsoft-products-a355c8bf5408) - 📰 Article on how it works.
- [FlyTech's Video](https://youtu.be/3DCEeASKNDk) - 🎥 Video about this topic.
