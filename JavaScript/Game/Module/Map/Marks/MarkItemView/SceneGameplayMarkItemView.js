"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneGameplayMarkItemView = void 0);
const ConfigMarkItemView_1 = require("./ConfigMarkItemView");
class SceneGameplayMarkItemView extends ConfigMarkItemView_1.ConfigMarkItemView {
  constructor(e) {
    super(e);
  }
  OnInitialize() {
    super.OnInitialize(), this.OnIconPathChanged(this.Holder.IconPath);
  }
}
exports.SceneGameplayMarkItemView = SceneGameplayMarkItemView;
// # sourceMappingURL=SceneGameplayMarkItemView.js.map
