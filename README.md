
## native-cookies

Cookie manager for React Native

## Installation

```sh

npm install native-cookies

# for iOS only
npx pod-install ios

```
## Usage

### Import  

```javascript

import  Cookies  from  "native-cookies";

```

### Get
```javascript

// get all cookies which are belonged to 'http://github.com/'
Cookies.get("http://github.com/").then((cookie) =>  console.log(cookie));


// get cookie named 'foo' from 'http://github.com/'
Cookies.get("http://github.com/", "foo").then((cookie) =>  console.log(cookie));

```

### Set

```javascript

// set cookie 'foo=bar' for 'http://github.com/'
Cookies.set("http://github.com/", "foo", "bar").then(() =>
	console.log("success")
);


// set cookie 'foo=bar' for 'http://github.com/' with options:
Cookies.set("http://github.com/", "foo", "bar", {
	path:  "enterprise",
	domain:  "github.com",
}).then(() =>  console.log("success"));

```

**Options**
 - domain

> Specifies the value for the Domain Set-Cookie attribute. By default,
> no domain is set, and most clients will consider the cookie to apply
> to only the current domain.

 - expires

> Specifies the Date object to be the value for the Expires Set-Cookie
> attribute. By default, no expiration is set, and most clients will
> consider this a "non-persistent cookie" and will delete it on a
> condition like exiting a web browser application.

 - path
> Specifies the value for the Path Set-Cookie attribute. By default, the
> path is considered the "default path". By default, no maximum age is
> set, and most clients will consider this a "non-persistent cookie" and
> will delete it on a condition like exiting a web browser application

### Clear

```javascript

// clear all cookies for 'http://github.com'
Cookies.clear("http://github.com");

```

### ClearAll
```javascript

// clear all cookies for all domains
Cookies.clearAll();

```
## License
MIT