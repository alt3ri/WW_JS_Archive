"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleElementGrid = void 0);
const UE = require("ue");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
class RoleElementGrid extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(), (this.Vyt = 0), this.CreateThenShowByActor(e);
  }
  get Lo() {
    return this.Vyt
      ? ConfigManager_1.ConfigManager.ElementInfoConfig.GetElementInfo(this.Vyt)
      : void 0;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UISprite],
    ];
  }
  mBt() {
    let e;
    let t;
    const i = this.GetTexture(0);
    let s = this.GetSprite(1);
    i &&
      s &&
      (e = this.Lo) &&
      ((t = e.ElementColor),
      (t = UE.Color.FromHex(t)),
      s.SetColor(t),
      (s = e.Icon) !== "") &&
      s.length !== 0 &&
      this.SetElementIcon(s, i, this.Vyt);
  }
  Refresh(e) {
    (this.Vyt = e), this.mBt();
  }
}
exports.RoleElementGrid = RoleElementGrid;
// # sourceMappingURL=RoleElementGrid.js.map
