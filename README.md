jsbukkit
========

Bukkit manager

Configure
========

Copy config.js.dist to config.js and replace all the dummy values to match your environment.

Example:
```javascript
CONFIG = {
    host: 'minecraft.server',
    port: '20059',
    user: 'jsonapi',
    password: 'foobarbaz',
    salt: '123456789'
};
```

Build
========

## Setup

1. Install paver

```console
pip install paver
```

2. Run build

```console
paver build
```

License
========
Copyright (C) 2012 Richard Marshall
This software may be used and distributed according to the terms of the 
GPLv2 Licence.
http://www.gnu.org/licenses/gpl-2.0.txt
