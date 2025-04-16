"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SmallItemGridEmptySlotComponent = void 0);
const UE = require("ue"),
  SmallItemGridVisibleComponent_1 = require("./SmallItemGridVisibleComponent");
class SmallItemGridEmptySlotComponent extends SmallItemGridVisibleComponent_1.SmallItemGridVisibleComponent {
  constructor() {
    super(...arguments),
      (this.oft = void 0),
      (this.Iwt = () => {
        this.oft && this.oft();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [[0, UE.UIButtonComponent]]),
      (this.BtnBindInfo = [[0, this.Iwt]]);
  }
  GetResourceId() {
    return "UiItem_ItemBStateAdd";
  }
  GetLayoutLevel() {
    return 1;
  }
  OnDeactivate() {
    this.oft = void 0;
  }
  BindEmptySlotButtonCallback(t) {
    this.oft = t;
  }
  UnBindEmptySlotButtonCallback() {
    this.oft = void 0;
  }
}
exports.SmallItemGridEmptySlotComponent = SmallItemGridEmptySlotComponent;
//# sourceMappingURL=SmallItemGridEmptySlotComponent.js.map
