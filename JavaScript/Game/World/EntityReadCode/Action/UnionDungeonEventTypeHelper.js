"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionDungeonEventTypeHelper = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbRecordTimeStampType_1 = require("./FbRecordTimeStampType");
class UnionDungeonEventTypeHelper {
  static GetUnionDungeonEventTypeObject(e) {
    if (e === fb_action_1.UnionDungeonEventType.RecordTimeStampType)
      return new fb_action_1.RecordTimeStampType();
  }
  static ReadUnionDungeonEventType(e, n) {
    return void 0 !== n &&
      e === fb_action_1.UnionDungeonEventType.RecordTimeStampType
      ? FbRecordTimeStampType_1.FbRecordTimeStampType.Create(n)
      : void 0;
  }
}
exports.UnionDungeonEventTypeHelper = UnionDungeonEventTypeHelper;
//# sourceMappingURL=UnionDungeonEventTypeHelper.js.map
