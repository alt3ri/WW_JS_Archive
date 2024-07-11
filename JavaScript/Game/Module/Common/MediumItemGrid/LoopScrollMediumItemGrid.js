"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LoopScrollMediumItemGrid = void 0);
const MediumItemGrid_1 = require("./MediumItemGrid");
class LoopScrollMediumItemGrid extends MediumItemGrid_1.MediumItemGrid {
  constructor() {
    super(...arguments),
      (this.ScrollViewDelegate = void 0),
      (this.GridIndex = 0),
      (this.DisplayIndex = 0);
  }
  Refresh(e, t, r) {
    this.OnRefresh(e, t, r);
  }
  Clear() {}
  OnSelected(e) {}
  OnDeselected(e) {}
  GetKey(e, t) {
    return this.GridIndex;
  }
}
exports.LoopScrollMediumItemGrid = LoopScrollMediumItemGrid;
// # sourceMappingURL=LoopScrollMediumItemGrid.js.map
