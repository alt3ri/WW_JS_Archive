"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionAkEventTypeHelper = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbBoxAkEvent_1 = require("./FbBoxAkEvent"),
  FbDefaultAkEvent_1 = require("./FbDefaultAkEvent"),
  FbPointAkEvent_1 = require("./FbPointAkEvent");
class UnionAkEventTypeHelper {
  static GetUnionAkEventTypeObject(e) {
    switch (e) {
      case fb_component_1.UnionAkEventType.BoxAkEvent:
        return new fb_component_1.BoxAkEvent();
      case fb_component_1.UnionAkEventType.DefaultAkEvent:
        return new fb_component_1.DefaultAkEvent();
      case fb_component_1.UnionAkEventType.PointAkEvent:
        return new fb_component_1.PointAkEvent();
      default:
        return;
    }
  }
  static ReadUnionAkEventType(e, n) {
    if (void 0 !== n)
      switch (e) {
        case fb_component_1.UnionAkEventType.BoxAkEvent:
          return FbBoxAkEvent_1.FbBoxAkEvent.Create(n);
        case fb_component_1.UnionAkEventType.DefaultAkEvent:
          return FbDefaultAkEvent_1.FbDefaultAkEvent.Create(n);
        case fb_component_1.UnionAkEventType.PointAkEvent:
          return FbPointAkEvent_1.FbPointAkEvent.Create(n);
        default:
          return;
      }
  }
}
exports.UnionAkEventTypeHelper = UnionAkEventTypeHelper;
//# sourceMappingURL=UnionAkEventTypeHelper.js.map
