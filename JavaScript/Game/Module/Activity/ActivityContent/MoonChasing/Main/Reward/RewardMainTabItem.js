"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RewardMainTabItem = void 0);
const UE = require("ue"),
  CommonTabItemBase_1 = require("../../../../../Common/TabComponent/TabItem/CommonTabItemBase"),
  UiTabSequence_1 = require("../../../../../DynamicTab/UiTabViewBehavior/UiTabSequence");
class RewardMainTabItem extends CommonTabItemBase_1.CommonTabItemBase {
  constructor() {
    super(...arguments),
      (this.Cla = void 0),
      (this.TabIndex = 0),
      (this.OnToggle = (e) => {
        e = 1 === e;
        e && this.SelectedCallBack?.(this.TabIndex),
          this.Cla.SetSortOrder(e ? 1 : 0);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.OnToggle]]);
  }
  OnStart() {
    (this.Cla = this.GetRootActor().GetComponentByClass(
      UE.LGUICanvas.StaticClass(),
    )),
      this.SetRedDotVisible(!1);
  }
  RegisterViewModule(e) {
    e.AddUiTabViewBehavior(UiTabSequence_1.UiTabSequence).SetRootItem(e);
  }
  SetRedDotVisible(e) {
    this.GetItem(1).SetUIActive(e);
  }
  OnUpdateTabIcon(e) {}
  OnSetToggleState(e, t) {
    this.GetExtendToggle(0).SetToggleState(e, t);
  }
  GetTabToggle() {
    return this.GetExtendToggle(0);
  }
}
exports.RewardMainTabItem = RewardMainTabItem;
//# sourceMappingURL=RewardMainTabItem.js.map
