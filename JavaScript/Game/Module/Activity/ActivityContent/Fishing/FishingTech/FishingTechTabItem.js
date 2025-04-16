"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingTechTabItem = void 0);
const UE = require("ue"),
  CommonTabItemBase_1 = require("../../../../Common/TabComponent/TabItem/CommonTabItemBase"),
  UiTabSequence_1 = require("../../../../DynamicTab/UiTabViewBehavior/UiTabSequence");
class FishingTechTabItem extends CommonTabItemBase_1.CommonTabItemBase {
  constructor() {
    super(...arguments),
      (this.GridIndex = 0),
      (this.Cke = (e) => {
        1 === e && this.SelectedCallBack?.(this.GridIndex);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [[0, UE.UIExtendToggle]]),
      (this.BtnBindInfo = [[0, this.Cke]]);
  }
  OnUpdateTabIcon(e) {}
  OnSetToggleState(e, t) {
    this.GetExtendToggle(0).SetToggleState(e, t);
  }
  GetTabToggle() {
    return this.GetExtendToggle(0);
  }
  RegisterViewModule(e) {
    e.AddUiTabViewBehavior(UiTabSequence_1.UiTabSequence).SetRootItem(e);
  }
}
exports.FishingTechTabItem = FishingTechTabItem;
//# sourceMappingURL=FishingTechTabItem.js.map
