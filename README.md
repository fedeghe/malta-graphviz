---
[![npm version](https://badge.fury.io/js/malta-graphviz.svg)](http://badge.fury.io/js/malta-graphviz)
[![Dependencies](https://david-dm.org/fedeghe/malta-graphviz.svg)](https://david-dm.org/fedeghe/malta-graphviz)
[![npm downloads](https://img.shields.io/npm/dt/malta-graphviz.svg)](https://npmjs.org/package/malta-graphviz)
[![npm downloads](https://img.shields.io/npm/dm/malta-graphviz.svg)](https://npmjs.org/package/malta-graphviz)  
---  

This plugin can be used on all files, although using it without providing the right input file content format does not make any sense.

`graphviz` is a mandatory dependency (`brew install graphviz`). 

Parameters :  
    - **cmd** : one among 'dot','neato','twopi','circo','fdp','sfdp','patchwork','osage' (default : 'dot')  
    - **options** : refer to dot manual (`man dot`)  
    - **outName** : the output file path name  
    - _files_ ? : not needed since the `files` parameter You might refer into the dot manual here is the single malta template which is expected to contain the right syntax  
    - del: 0 to not delete the out tpl, default is 1

The malta outfile will be deleted automatically.  

Sample usage, in the .json file :
```
"test.dot": "out -plugins=malta-graphviz[options:\"-Tjson\",outName:\"test.json\"]"
```
or in a script : 
``` js
var Malta = require('malta');
Malta.get().check([
    'app/source/test.dot',
    'public/js',
    '-plugins=malta-graphviz[cmd:\"neato\",options:\"-Tpng\",outName:\"test.png\"]',
    '-options=showPath:false,watchInterval:500,verbose:0'
    ]).start(function (o) {
        var s = this;
        console.log('name : ' + o.name)
        console.log("content : \n" + o.content);
        'plugin' in o && console.log("plugin : " + o.plugin);
        console.log('=========');
    });
```