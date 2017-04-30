/**
 * lunch-breakpoints master by @malinushj
 * https://github.com/malinushj/lunch-breakpoints
 * License: MIT
 */

;(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node.js
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.returnExports = factory();
    }
}(this, function () {

    var defaults = {
        throttle: false,
        mobileFirst: false
    };

    // Function constructor
    function LunchBreakpoints(opts){
        this._ = extend(cloneObj(defaults), opts);
        if (!this._.hasOwnProperty('default') || !this._.hasOwnProperty('breakpoints')) return;

        this._init();
    }

    LunchBreakpoints.prototype._init = function() {
        var self = this,
            clonedOpts = cloneObj(this._),
            breakpoints = clonedOpts.breakpoints,
            breakpointsArray = [];

        // Put all breakpoints inside an array
        for (var breakpoint in breakpoints)
            breakpoints.hasOwnProperty(breakpoint) &&
            breakpointsArray.push(parseInt(breakpoint))

        // Sort the array - highest breakpoint first
        this.breakpointsArray = breakpointsArray.sort(function(a,b) { return (b-a) });
        this.activeBreakpoint = 'default';

        this._getActiveBreakpoint(clonedOpts);
        this._changedBreakpoint(clonedOpts);

        // Bind Events
        var isThrottle = typeof this._.throttle === 'number',
            handler = function () { self._getActiveBreakpoint(clonedOpts) },
            resizeHandler = isThrottle
                ? throttle(handler, this._.throttle)
                : handler;

        window.addEventListener('resize', resizeHandler);
    };

    LunchBreakpoints.prototype._getActiveBreakpoint = function(opts) {
        var self = this,
            w = window.innerWidth,
            bps = this.breakpointsArray,
            lastBp = this.activeBreakpoint,
            activeBp = 'default',
            mobileCondition = function(bp) {
                return self._.mobileFirst ? w > bp : w < bp;
            };

        // breakpoints are sorted so it's safe to use the following method for determining the current interval
        for (var i = 0; i < bps.length; i++)
            mobileCondition(bps[i]) && (activeBp = bps[i]);

        this.activeBreakpoint = activeBp;

        if (activeBp !== lastBp)
            this._changedBreakpoint(opts);

        return this.activeBreakpoint;
    };

    LunchBreakpoints.prototype._changedBreakpoint = function(opts) {

        // call breakpoint functions
        if (opts.breakpoints.hasOwnProperty(this.activeBreakpoint))
            opts.breakpoints[this.activeBreakpoint].call(this);
        else if (this.activeBreakpoint === 'default')
            opts.default.call(this);

    };

    // Helper functions

    function extend(a, b) {
        for(var key in b)
            b.hasOwnProperty(key) &&
            (a[key] = b[key]);
        return a;
    }

    function cloneObj(obj) {
        if (obj === null || typeof obj !== 'object')
            return obj;

        var clone = obj.constructor();
        return extend(clone, obj);
    }

    function throttle(func, wait, options) {
        var timeout, context, args, result;
        var previous = 0;
        if (!options) options = {};

        var later = function() {
            previous = options.leading === false ? 0 : Date.now();
            timeout = null;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
        };

        var throttled = function() {
            var now = Date.now();
            if (!previous && options.leading === false) previous = now;
            var remaining = wait - (now - previous);
            context = this;
            args = arguments;
            if (remaining <= 0 || remaining > wait) {
                if (timeout) {
                    clearTimeout(timeout);
                    timeout = null;
                }
                previous = now;
                result = func.apply(context, args);
                if (!timeout) context = args = null;
            } else if (!timeout && options.trailing !== false) {
                timeout = setTimeout(later, remaining);
            }
            return result;
        };

        throttled.cancel = function() {
            clearTimeout(timeout);
            previous = 0;
            timeout = context = args = null;
        };

        return throttled;
    }

    return LunchBreakpoints;
}));