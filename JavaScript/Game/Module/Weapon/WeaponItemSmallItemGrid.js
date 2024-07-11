"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WeaponItemSmallItemGrid = void 0);
const LoopScrollSmallItemGrid_1 = require("../Common/SmallItemGrid/LoopScrollSmallItemGrid");
class WeaponItemSmallItemGrid extends LoopScrollSmallItemGrid_1.LoopScrollSmallItemGrid {
  OnRefresh(e, l, t) {
    this.Refresh(e);
  }
  Refresh(e) {
    e = { Type: 4, Data: e, ItemConfigId: e.GetItemId() };
    this.Apply(e);
  }
  OnDeselected(e) {
    this.SetSelected(!1);
  }
}
exports.WeaponItemSmallItemGrid = WeaponItemSmallItemGrid;
//# sourceMappingURL=WeaponItemSmallItemGrid.js.map
