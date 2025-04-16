"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionSetAreaTimeType =
    exports.unionToUnionSetAreaTimeType =
    exports.UnionSetAreaTimeType =
      void 0);
const set_area_time_lock_js_1 = require("../fb-action/set-area-time-lock.js"),
  set_area_time_un_lock_js_1 = require("../fb-action/set-area-time-un-lock.js");
var UnionSetAreaTimeType;
function unionToUnionSetAreaTimeType(e, t) {
  switch (UnionSetAreaTimeType[e]) {
    case "NONE":
      return;
    case "SetAreaTimeLock":
      return t(new set_area_time_lock_js_1.SetAreaTimeLock());
    case "SetAreaTimeUnLock":
      return t(new set_area_time_un_lock_js_1.SetAreaTimeUnLock());
    default:
      return;
  }
}
function unionListToUnionSetAreaTimeType(e, t, n) {
  switch (UnionSetAreaTimeType[e]) {
    case "NONE":
      return;
    case "SetAreaTimeLock":
      return t(n, new set_area_time_lock_js_1.SetAreaTimeLock());
    case "SetAreaTimeUnLock":
      return t(n, new set_area_time_un_lock_js_1.SetAreaTimeUnLock());
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.SetAreaTimeLock = 1)] = "SetAreaTimeLock"),
    (e[(e.SetAreaTimeUnLock = 2)] = "SetAreaTimeUnLock");
})(
  (UnionSetAreaTimeType =
    exports.UnionSetAreaTimeType || (exports.UnionSetAreaTimeType = {})),
),
  (exports.unionToUnionSetAreaTimeType = unionToUnionSetAreaTimeType),
  (exports.unionListToUnionSetAreaTimeType = unionListToUnionSetAreaTimeType);
//# sourceMappingURL=union-set-area-time-type.js.map
