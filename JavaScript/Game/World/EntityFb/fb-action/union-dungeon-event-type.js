"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionDungeonEventType =
    exports.unionToUnionDungeonEventType =
    exports.UnionDungeonEventType =
      void 0);
const record_time_stamp_type_js_1 = require("../fb-action/record-time-stamp-type.js");
var UnionDungeonEventType;
function unionToUnionDungeonEventType(e, n) {
  switch (UnionDungeonEventType[e]) {
    case "NONE":
      return;
    case "RecordTimeStampType":
      return n(new record_time_stamp_type_js_1.RecordTimeStampType());
    default:
      return;
  }
}
function unionListToUnionDungeonEventType(e, n, t) {
  switch (UnionDungeonEventType[e]) {
    case "NONE":
      return;
    case "RecordTimeStampType":
      return n(t, new record_time_stamp_type_js_1.RecordTimeStampType());
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.RecordTimeStampType = 1)] = "RecordTimeStampType");
})(
  (UnionDungeonEventType =
    exports.UnionDungeonEventType || (exports.UnionDungeonEventType = {})),
),
  (exports.unionToUnionDungeonEventType = unionToUnionDungeonEventType),
  (exports.unionListToUnionDungeonEventType = unionListToUnionDungeonEventType);
//# sourceMappingURL=union-dungeon-event-type.js.map
