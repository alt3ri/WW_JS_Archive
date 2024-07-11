"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PayShopSecondTabItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class PayShopSecondTabItem extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(),
      (this.TabId = 0),
      (this.IsSelected = !1),
      (this.ToggleFunction = void 0),
      (this.Toggle = void 0),
      (this.x4e = (t) => {
        1 === t && ((this.IsSelected = !0), this.ToggleFunction?.(this.TabId));
      }),
      (this.T7e = () => {
        var t = this.Toggle.GetToggleState();
        return !this.IsSelected || 1 !== t;
      }),
      this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [2, UE.UIExtendToggle],
      [0, UE.UIText],
    ]),
      (this.BtnBindInfo = [[2, this.x4e]]);
  }
  OnStart() {
    (this.Toggle = this.GetExtendToggle(2)),
      this.Toggle.CanExecuteChange.Bind(this.T7e),
      this.SetToggleState(!1);
  }
  OnBeforeDestroy() {
    this.SetToggleState(!1), this.Toggle.CanExecuteChange.Unbind();
  }
  SetName(t, e) {
    this.TabId = e;
    t = ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopTabConfig(t, e);
    this.GetText(0).ShowTextNew(t.Name);
  }
  SetToggleFunction(t) {
    this.ToggleFunction = t;
  }
  SetToggleState(t) {
    (this.IsSelected = t), this.Toggle.SetToggleState(t ? 1 : 0, !1);
  }
}
exports.PayShopSecondTabItem = PayShopSecondTabItem;
//# sourceMappingURL=PayShopSecondTabItem.js.map
