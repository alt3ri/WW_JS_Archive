"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MediumItemGridEmptySlotComponent = void 0);
const UE = require("ue"),
  MediumItemGridVisibleComponent_1 = require("./MediumItemGridVisibleComponent");
class MediumItemGridEmptySlotComponent extends MediumItemGridVisibleComponent_1.MediumItemGridVisibleComponent {
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
    return "UiItem_ItemBtnAdd";
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
exports.MediumItemGridEmptySlotComponent = MediumItemGridEmptySlotComponent;
//# sourceMappingURL=MediumItemGridEmptySlotComponent.js.map
