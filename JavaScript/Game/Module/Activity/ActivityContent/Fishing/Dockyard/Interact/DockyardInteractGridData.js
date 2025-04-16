"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DockyardInteractGridData = void 0);
const FishingDefine_1 = require("../../FishingDefine");
class DockyardInteractGridData {
  constructor(t) {
    (this.PosData = t),
      (this.FXl = FishingDefine_1.UNVALID_ITEM_BLOCK_ID),
      (this.IsFinish = !1);
  }
  get TargetId() {
    return this.FXl;
  }
  SetTargetId(t) {
    this.FXl = t;
  }
}
exports.DockyardInteractGridData = DockyardInteractGridData;
//# sourceMappingURL=DockyardInteractGridData.js.map
