"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OnlineHallSettingButton = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class OnlineHallSettingButton extends UiPanelBase_1.UiPanelBase {
  constructor(t, i) {
    super(),
      (this.A4e = void 0),
      (this.d4e = () => !this.A4e || this.A4e(this.S9)),
      (this.xGi = (t) => {
        1 === t && this.wGi && this.wGi(this.S9);
      }),
      (this.S9 = i),
      this.CreateThenShowByActor(t);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIText],
    ];
  }
  OnStart() {
    this.BGi(this.S9), this.Ore();
  }
  OnBeforeDestroy() {
    this.kre();
  }
  Ore() {
    this.GetExtendToggle(0).OnStateChange.Add(this.xGi);
  }
  kre() {
    this.GetExtendToggle(0).OnStateChange.Remove(this.xGi);
  }
  BindOnSettingButtonClickedCallback(t) {
    this.wGi = t;
  }
  BindCanToggleExecuteChange(t) {
    this.A4e = t;
  }
  SetSelected(t) {
    var i = this.GetExtendToggle(0);
    t ? i.SetToggleStateForce(1, !1) : i.SetToggleStateForce(0, !1);
  }
  BGi(t) {
    var i = this.GetText(1),
      t = "PermissionsSetting_" + t;
    LguiUtil_1.LguiUtil.SetLocalText(i, t),
      this.GetExtendToggle(0).CanExecuteChange.Bind(this.d4e);
  }
}
exports.OnlineHallSettingButton = OnlineHallSettingButton;
//# sourceMappingURL=OnlineHallSettingButton.js.map
