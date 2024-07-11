"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LandscapeMarkItem = void 0);
const LandscapeMarkItemView_1 = require("../MarkItemView/LandscapeMarkItemView");
const ConfigMarkItem_1 = require("./ConfigMarkItem");
class LandscapeMarkItem extends ConfigMarkItem_1.ConfigMarkItem {
  constructor(e, a, t, r, s, i = 1) {
    super(e, a, t, r, s, i);
  }
  OnCreateView() {
    this.InnerView = new LandscapeMarkItemView_1.LandscapeMarkItemView(this);
  }
}
exports.LandscapeMarkItem = LandscapeMarkItem;
// # sourceMappingURL=LandscapeMark.js.map
