"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CustomMarkItemView = void 0);
const ServerMarkItemView_1 = require("./ServerMarkItemView");
class CustomMarkItemView extends ServerMarkItemView_1.ServerMarkItemView {
  constructor(e) {
    super(e);
  }
  OnInitialize() {
    super.OnInitialize(), this.OnIconPathChanged(this.Holder.IconPath);
  }
  GetInteractiveFlag() {
    return !this.Holder.IsNewCustomMarkItem && super.GetInteractiveFlag();
  }
}
exports.CustomMarkItemView = CustomMarkItemView;
//# sourceMappingURL=CustomMarkItemView.js.map
