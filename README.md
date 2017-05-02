# lunch-breakpoints 🍕
> 💻 📲  Simple and lightweight implementation to run javascript on viewport breakpoints

## What
Define functions that run once when viewport enters the breakpoints 
```js
new LunchBreakpoints({
  default: function() {
    // any width larger than 1024
  },
  breakpoints: {
    1024: function(){
      // smaller than 1024 and bigger than 768  
    },
    768: function() {
      // smaller than 768
    }
  }
});
```

## Instalation
Whichever you prefer:
```html
<script src="lunch-breakpoints.js"></script>
```
```js
var LunchBreakpoints = window.returnExports;
```
***
```sh
npm install --save-dev lunch-breakpoints
```
```js
var LunchBreakpoints = require('lunch-breakpoints');
```
```js
import LunchBreakpoints from 'lunch-breakpoints';
```


## Usage
Instantiate with `new`:
```js
new LunchBreakpoints(options);
```
where options...
<table>
    <tr>
        <th>parameter</th>
        <th>description</th>
    </tr>
    <tr>
        <th><code>options</code></th>
        <td>
            Type: <code>Object</code><br>
            Default: <code>{ mobileFirst: false, throttle: false }</code><br><br>
            <table>
                <tr>
                    <th><code>default</code></th>
                    <td>
                        Type: <code>Function</code><br><br>
                        This is the function to be executed when no breakpoint is matched
                    </td>
                </tr>
            </table>
            <table>
                <tr>
                    <th><code>breakpoints</code></th>
                    <td>
                        Type: <code>Object</code><br>
                        Example: <code>{ 1100: function() { // code here} }</code><br><br>
                        Properties as breakpoints that must be functions
                    </td>
                </tr>
            </table>
            <table>
                <tr>
                    <th><code>mobileFirst</code></th>
                    <td>
                        Type: <code>Boolean</code><br>
                        Default: <code>false</code><br><br>
                        Whether or not to calculate the width ascendingly or descendingly,
                        (mobile first responsive approach vs desktop first)
                    </td>
                </tr>
            </table>
            <table>
                <tr>
                    <th><code>throttle</code></th>
                    <td>
                        Type: <code>Boolean || Number</code><br>
                        Default: <code>false</code><br><br>
                        Leave false if you don't wish the resize events to be throttled, or provide a number (in ms) at which to throttle the event
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>

***
> Lunch Breakpoints because **lunch break** and **breakpoints**
