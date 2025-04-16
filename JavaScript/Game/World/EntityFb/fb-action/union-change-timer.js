"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionChangeTimer =
    exports.unionToUnionChangeTimer =
    exports.UnionChangeTimer =
      void 0);
const add_time_js_1 = require("../fb-action/add-time.js"),
  reduce_time_js_1 = require("../fb-action/reduce-time.js"),
  set_time_js_1 = require("../fb-action/set-time.js");
var UnionChangeTimer;
function unionToUnionChangeTimer(e, n) {
  switch (UnionChangeTimer[e]) {
    case "NONE":
      return;
    case "AddTime":
      return n(new add_time_js_1.AddTime());
    case "ReduceTime":
      return n(new reduce_time_js_1.ReduceTime());
    case "SetTime":
      return n(new set_time_js_1.SetTime());
    default:
      return;
  }
}
function unionListToUnionChangeTimer(e, n, i) {
  switch (UnionChangeTimer[e]) {
    case "NONE":
      return;
    case "AddTime":
      return n(i, new add_time_js_1.AddTime());
    case "ReduceTime":
      return n(i, new reduce_time_js_1.ReduceTime());
    case "SetTime":
      return n(i, new set_time_js_1.SetTime());
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.AddTime = 1)] = "AddTime"),
    (e[(e.ReduceTime = 2)] = "ReduceTime"),
    (e[(e.SetTime = 3)] = "SetTime");
})(
  (UnionChangeTimer =
    exports.UnionChangeTimer || (exports.UnionChangeTimer = {})),
),
  (exports.unionToUnionChangeTimer = unionToUnionChangeTimer),
  (exports.unionListToUnionChangeTimer = unionListToUnionChangeTimer);
//# sourceMappingURL=union-change-timer.js.map
