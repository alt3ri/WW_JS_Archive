"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionSlotItem = exports.VisionSlotData = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class VisionSlotData {
  constructor() {
    this.SlotState = 0;
  }
}
exports.VisionSlotData = VisionSlotData;
class VisionSlotItem extends UiPanelBase_1.UiPanelBase {
  constructor(s) {
    super(), this.CreateThenShowByActor(s.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
    ];
  }
  Update(s) {
    this.GetItem(0).SetUIActive(!1),
      this.GetItem(1).SetUIActive(!1),
      this.GetItem(2).SetUIActive(!1),
      this.GetItem(3).SetUIActive(!1),
      0 === s.SlotState
        ? this.GetItem(0).SetUIActive(!0)
        : 2 === s.SlotState
          ? this.GetItem(1).SetUIActive(!0)
          : 1 === s.SlotState
            ? this.GetItem(2).SetUIActive(!0)
            : 3 === s.SlotState && this.GetItem(3).SetUIActive(!0);
  }
}
exports.VisionSlotItem = VisionSlotItem;
//# sourceMappingURL=VisionSlotItem.js.map
