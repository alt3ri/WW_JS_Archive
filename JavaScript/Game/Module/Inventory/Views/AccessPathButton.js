"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AccessPathButton = void 0);
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class AccessPathButton extends UiPanelBase_1.UiPanelBase {
  constructor(t, s) {
    super(),
      (this.Rci = () => {
        this.Uci && this.Uci(this.Aci);
      }),
      (this.Aci = s),
      this.CreateThenShowByActor(t);
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UIText],
      [5, UE.UIText],
      [6, UE.UIToggleComponent],
    ]),
      (this.BtnBindInfo = [[6, this.Rci]]);
  }
  OnStart() {
    let t;
    let s;
    let e;
    let i;
    let a;
    let n;
    let r = ConfigManager_1.ConfigManager.InventoryConfig.GetAccessPathConfig(
      this.Aci,
    );
    r &&
      ((t = this.GetText(0)),
      (s = this.GetText(1)),
      (e = this.GetText(2)),
      (i = this.GetText(3)),
      (a = this.GetText(4)),
      (n = this.GetText(5)),
      t) &&
      s &&
      e &&
      i &&
      a &&
      n &&
      ((r = r.Description),
      t.ShowTextNew(r),
      s.ShowTextNew(r),
      e.ShowTextNew(r),
      i.ShowTextNew(r),
      a.ShowTextNew(r),
      n.ShowTextNew(r));
  }
  OnBeforeDestroy() {
    this.Uci = void 0;
  }
  BindOnGetWayButtonClickedCallback(t) {
    this.Uci = t;
  }
}
exports.AccessPathButton = AccessPathButton;
// # sourceMappingURL=AccessPathButton.js.map
