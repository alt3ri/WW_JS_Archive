"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HandBookCommonItem = void 0);
const LoopScrollSmallItemGrid_1 = require("../Common/SmallItemGrid/LoopScrollSmallItemGrid");
class HandBookCommonItem extends LoopScrollSmallItemGrid_1.LoopScrollSmallItemGrid {
  constructor() {
    super(...arguments), (this.HandBookCommonItemData = void 0);
  }
  OnRefresh(e, t, o) {
    var s = (this.HandBookCommonItemData = e).IsLock;
    var s = {
      Type: 4,
      Data: e,
      IsNotFoundVisible: s,
      IsNewVisible: e.IsNew,
      IconPath: s ? void 0 : e.Icon,
      QualityId: s ? 0 : e.QualityId,
    };
    this.Apply(s);
  }
  GetData() {
    return this.HandBookCommonItemData;
  }
  OnDeselected(e) {
    this.SetSelected(!1);
  }
  OnSelected(e) {
    this.SetSelected(!0);
  }
  SetSelected(e, t = !1) {
    super.SetSelected(e, t);
  }
}
exports.HandBookCommonItem = HandBookCommonItem;
// # sourceMappingURL=HandBookCommonItem.js.map
