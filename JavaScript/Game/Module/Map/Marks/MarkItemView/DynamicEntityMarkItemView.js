"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DynamicEntityMarkItemView = void 0);
const DynamicConfigMarkItemView_1 = require("./DynamicConfigMarkItemView");
class DynamicEntityMarkItemView extends DynamicConfigMarkItemView_1.DynamicConfigMarkItemView {
  constructor(e) {
    super(e);
  }
  OnInitialize() {
    super.OnInitialize(), this.OnIconPathChanged(this.Holder.IconPath);
  }
}
exports.DynamicEntityMarkItemView = DynamicEntityMarkItemView;
//# sourceMappingURL=DynamicEntityMarkItemView.js.map
