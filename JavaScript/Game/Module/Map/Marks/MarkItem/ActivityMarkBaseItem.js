"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityMarkBaseItem = void 0);
const ConfigMarkItemView_1 = require("../MarkItemView/ConfigMarkItemView");
const ConfigMarkItem_1 = require("./ConfigMarkItem");
class ActivityMarkBaseItem extends ConfigMarkItem_1.ConfigMarkItem {
  OnCreateView() {
    this.InnerView = new ActivityMarkItemView(this);
  }
}
exports.ActivityMarkBaseItem = ActivityMarkBaseItem;
class ActivityMarkItemView extends ConfigMarkItemView_1.ConfigMarkItemView {
  constructor(e) {
    super(e);
  }
  OnInitialize() {
    super.OnInitialize(), this.OnIconPathChanged(this.Holder.IconPath);
  }
}
// # sourceMappingURL=ActivityMarkBaseItem.js.map
