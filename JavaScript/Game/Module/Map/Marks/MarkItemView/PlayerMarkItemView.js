"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlayerMarkItemView = void 0);
const MarkItemView_1 = require("./MarkItemView");
class PlayerMarkItemView extends MarkItemView_1.MarkItemView {
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
exports.PlayerMarkItemView = PlayerMarkItemView;
// # sourceMappingURL=PlayerMarkItemView.js.map
