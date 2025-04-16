"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LandscapeMarkItem = void 0);
const LandscapeMarkItemView_1 = require("../MarkItemView/LandscapeMarkItemView"),
  ConfigMarkItem_1 = require("./ConfigMarkItem");
class LandscapeMarkItem extends ConfigMarkItem_1.ConfigMarkItem {
  constructor(e, r, t, a, s, n = 1) {
    super(e, r, t, a, s, n);
  }
  GetMarkItemViewType() {
    return 13;
  }
  CreateView() {
    return new LandscapeMarkItemView_1.LandscapeMarkItemView(this);
  }
  GetInteractiveFlag() {
    return !1;
  }
}
exports.LandscapeMarkItem = LandscapeMarkItem;
//# sourceMappingURL=LandscapeMark.js.map
