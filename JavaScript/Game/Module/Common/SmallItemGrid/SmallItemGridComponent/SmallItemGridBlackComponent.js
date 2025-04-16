"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SmallItemGridBlackComponent = void 0);
const SmallItemGridComponent_1 = require("./SmallItemGridComponent");
class SmallItemGridBlackComponent extends SmallItemGridComponent_1.SmallItemGridComponent {
  GetResourceId() {
    return "UiItem_ItemBDark";
  }
  OnRefresh(e) {
    this.SetActive(e);
  }
}
exports.SmallItemGridBlackComponent = SmallItemGridBlackComponent;
//# sourceMappingURL=SmallItemGridBlackComponent.js.map
