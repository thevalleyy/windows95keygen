# Windows NT 4.0 and Windows 95 Key Generator

![Screenshot](https://i.imgur.com/1SDrphx.png)

[![Website](https://img.shields.io/website?label=win95.thevalleyy.tk&style=flat-square&url=https%3A%2F%2Fwin95.thevalleyy.tk)](https://win95.thevalleyy.tk)

### Why?
I happened to find this repo on GitHub and immediately had so many ideas on how to improve it. 
The [original creator](https://github.com/andreazllin) wrote
> I bumped into [FlyTech's Video](https://youtu.be/3DCEeASKNDk) and at the end of the video he challenged the viewers to make a program to generate the keys, so I tried, and this is the result.

---
### All of the services listed below can be used via the website or via the API.


## Generate Keys

10-digit: `curl https://win95.thevalleyy.tk/api/generate/10`

11-digit: `curl https://win95.thevalleyy.tk/api/generate/11`

OEM Key: `curl https://win95.thevalleyy.tk/api/generate/oem`

To generate more than one key a time, add `amount` as a query parameter:
`curl https://win95.thevalleyy.tk/api/generate/10?amount=2`

---
## Validate Keys

Validate: `https://win95.thevalleyy.tk/api/validate` 

```json
{ 
  "key": "YOUR KEY" 
}
```
or

Validate: `curl https://win95.thevalleyy.tk/api/validate?key=<KEY>`
------------

## Tested on

- Microsoft Windows NT 4.0 Server (4.00.1381.1)
- Microsoft Windows NT 4.0 Workstation (4.00.1381.1) [OEM]
- Microsoft Windows 95C (4.03.1216.OSR2.5) [OEM]


## Inspiration/Credits

- [Blog post from gurney](https://gurney.dev/posts/mod7/) - Detailed explanation of the algorithm and more.
- [@dgurney's article](https://medium.com/@dgurney/so-you-want-to-generate-license-keys-for-old-microsoft-products-a355c8bf5408) - 📰 Article on how it works.
- [FlyTech's Video](https://youtu.be/3DCEeASKNDk) - 🎥 Video about this topic.
