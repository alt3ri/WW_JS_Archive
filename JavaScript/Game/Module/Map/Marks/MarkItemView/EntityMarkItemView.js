"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EntityMarkItemView = void 0);
const ConfigMarkItemView_1 = require("./ConfigMarkItemView");
class EntityMarkItemView extends ConfigMarkItemView_1.ConfigMarkItemView {
  constructor(e) {
    super(e);
  }
  OnInitialize() {
    super.OnInitialize(), this.OnIconPathChanged(this.Holder.IconPath);
  }
}
exports.EntityMarkItemView = EntityMarkItemView;
//# sourceMappingURL=EntityMarkItemView.js.map
