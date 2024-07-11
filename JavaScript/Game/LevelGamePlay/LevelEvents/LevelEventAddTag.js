"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventAddTag = void 0);
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventAddTag extends LevelGeneralBase_1.LevelEventBase {
  Execute(e, a) {
    var l;
    a &&
      e &&
      ((e = e.get("Tag")), (l = FNameUtil_1.FNameUtil.GetDynamicFName(e)), e) &&
      l &&
      !a.Tags.Contains(l) &&
      a.Tags.Add(l);
  }
}
exports.LevelEventAddTag = LevelEventAddTag;
//# sourceMappingURL=LevelEventAddTag.js.map
