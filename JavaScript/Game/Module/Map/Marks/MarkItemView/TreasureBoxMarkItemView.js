"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TreasureBoxMarkItemView = void 0);
const ServerMarkItemView_1 = require("./ServerMarkItemView");
class TreasureBoxMarkItemView extends ServerMarkItemView_1.ServerMarkItemView {
  constructor(e) {
    super(e);
  }
  OnInitialize() {
    super.OnInitialize(), this.OnIconPathChanged(this.Holder.IconPath);
  }
  GetInteractiveFlag() {
    return !1;
  }
}
exports.TreasureBoxMarkItemView = TreasureBoxMarkItemView;
//# sourceMappingURL=TreasureBoxMarkItemView.js.map
