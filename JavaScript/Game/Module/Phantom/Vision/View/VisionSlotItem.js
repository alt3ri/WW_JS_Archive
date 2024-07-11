"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionSlotItem = exports.VisionSlotData = void 0);
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
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
      s.SlotState === 0
        ? this.GetItem(0).SetUIActive(!0)
        : s.SlotState === 2
          ? this.GetItem(1).SetUIActive(!0)
          : s.SlotState === 1
            ? this.GetItem(2).SetUIActive(!0)
            : s.SlotState === 3 && this.GetItem(3).SetUIActive(!0);
  }
}
exports.VisionSlotItem = VisionSlotItem;
// # sourceMappingURL=VisionSlotItem.js.map
