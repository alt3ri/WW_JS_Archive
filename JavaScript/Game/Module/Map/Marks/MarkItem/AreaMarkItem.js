"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AreaMarkItem = void 0);
const AreaMarkItemView_1 = require("../MarkItemView/AreaMarkItemView");
const ConfigMarkItem_1 = require("./ConfigMarkItem");
class AreaMarkItem extends ConfigMarkItem_1.ConfigMarkItem {
  constructor() {
    super(...arguments), (this.InnerView = void 0);
  }
  OnCreateView() {
    this.InnerView = new AreaMarkItemView_1.AreaMarkItemView(this);
  }
}
exports.AreaMarkItem = AreaMarkItem;
// # sourceMappingURL=AreaMarkItem.js.map
