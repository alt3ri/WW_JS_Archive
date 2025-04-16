"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionAkEventType =
    exports.unionToUnionAkEventType =
    exports.UnionAkEventType =
      void 0);
const box_ak_event_js_1 = require("../fb-component/box-ak-event.js"),
  default_ak_event_js_1 = require("../fb-component/default-ak-event.js"),
  point_ak_event_js_1 = require("../fb-component/point-ak-event.js");
var UnionAkEventType;
function unionToUnionAkEventType(e, n) {
  switch (UnionAkEventType[e]) {
    case "NONE":
      return;
    case "BoxAkEvent":
      return n(new box_ak_event_js_1.BoxAkEvent());
    case "DefaultAkEvent":
      return n(new default_ak_event_js_1.DefaultAkEvent());
    case "PointAkEvent":
      return n(new point_ak_event_js_1.PointAkEvent());
    default:
      return;
  }
}
function unionListToUnionAkEventType(e, n, t) {
  switch (UnionAkEventType[e]) {
    case "NONE":
      return;
    case "BoxAkEvent":
      return n(t, new box_ak_event_js_1.BoxAkEvent());
    case "DefaultAkEvent":
      return n(t, new default_ak_event_js_1.DefaultAkEvent());
    case "PointAkEvent":
      return n(t, new point_ak_event_js_1.PointAkEvent());
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.BoxAkEvent = 1)] = "BoxAkEvent"),
    (e[(e.DefaultAkEvent = 2)] = "DefaultAkEvent"),
    (e[(e.PointAkEvent = 3)] = "PointAkEvent");
})(
  (UnionAkEventType =
    exports.UnionAkEventType || (exports.UnionAkEventType = {})),
),
  (exports.unionToUnionAkEventType = unionToUnionAkEventType),
  (exports.unionListToUnionAkEventType = unionListToUnionAkEventType);
//# sourceMappingURL=union-ak-event-type.js.map
