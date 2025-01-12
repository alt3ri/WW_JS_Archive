"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventRemoveTag = void 0);
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventRemoveTag extends LevelGeneralBase_1.LevelEventBase {
  Execute(e, l) {
    l &&
      e &&
      (e = e.get("Tag")) &&
      ((e = FNameUtil_1.FNameUtil.GetDynamicFName(e)),
      0 < (e = l.Tags.FindIndex(e))) &&
      l.Tags.RemoveAt(e);
  }
}
exports.LevelEventRemoveTag = LevelEventRemoveTag;
//# sourceMappingURL=LevelEventRemoveTag.js.map
