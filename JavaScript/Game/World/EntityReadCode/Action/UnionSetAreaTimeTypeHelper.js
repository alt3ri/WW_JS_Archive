"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionSetAreaTimeTypeHelper = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbSetAreaTimeLock_1 = require("./FbSetAreaTimeLock"),
  FbSetAreaTimeUnLock_1 = require("./FbSetAreaTimeUnLock");
class UnionSetAreaTimeTypeHelper {
  static GetUnionSetAreaTimeTypeObject(e) {
    switch (e) {
      case fb_action_1.UnionSetAreaTimeType.SetAreaTimeLock:
        return new fb_action_1.SetAreaTimeLock();
      case fb_action_1.UnionSetAreaTimeType.SetAreaTimeUnLock:
        return new fb_action_1.SetAreaTimeUnLock();
      default:
        return;
    }
  }
  static ReadUnionSetAreaTimeType(e, t) {
    if (void 0 !== t)
      switch (e) {
        case fb_action_1.UnionSetAreaTimeType.SetAreaTimeLock:
          return FbSetAreaTimeLock_1.FbSetAreaTimeLock.Create(t);
        case fb_action_1.UnionSetAreaTimeType.SetAreaTimeUnLock:
          return FbSetAreaTimeUnLock_1.FbSetAreaTimeUnLock.Create(t);
        default:
          return;
      }
  }
}
exports.UnionSetAreaTimeTypeHelper = UnionSetAreaTimeTypeHelper;
//# sourceMappingURL=UnionSetAreaTimeTypeHelper.js.map
