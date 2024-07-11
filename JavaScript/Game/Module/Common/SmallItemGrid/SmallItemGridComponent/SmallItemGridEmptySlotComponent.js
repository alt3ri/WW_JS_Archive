"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SmallItemGridEmptySlotComponent = void 0);
const UE = require("ue"),
  SmallItemGridComponent_1 = require("./SmallItemGridComponent");
class SmallItemGridEmptySlotComponent extends SmallItemGridComponent_1.SmallItemGridComponent {
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
  OnRefresh(t) {}
}
exports.SmallItemGridEmptySlotComponent = SmallItemGridEmptySlotComponent;
//# sourceMappingURL=SmallItemGridEmptySlotComponent.js.map
