/**
 * @ag-grid-community/core - Advanced Data Grid / Data Table supporting Javascript / React / AngularJS / Web Components
 * @version v26.2.1
 * @link http://www.ag-grid.com/
 * @license MIT
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A Util Class only used when debugging for printing time to console
 */
var Timer = /** @class */ (function () {
    function Timer() {
        this.timestamp = new Date().getTime();
    }
    Timer.prototype.print = function (msg) {
        var duration = (new Date().getTime()) - this.timestamp;
        console.info(msg + " = " + duration);
        this.timestamp = new Date().getTime();
    };
    return Timer;
}());
exports.Timer = Timer;

//# sourceMappingURL=timer.js.map
