"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleElementGrid = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
class RoleElementGrid extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(), (this.ZIt = 0), this.CreateThenShowByActor(e);
  }
  get Lo() {
    return this.ZIt
      ? ConfigManager_1.ConfigManager.ElementInfoConfig.GetElementInfo(this.ZIt)
      : void 0;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UISprite],
    ];
  }
  gbt() {
    var e,
      t,
      i = this.GetTexture(0),
      s = this.GetSprite(1);
    i &&
      s &&
      (e = this.Lo) &&
      ((t = e.ElementColor),
      (t = UE.Color.FromHex(t)),
      s.SetColor(t),
      "" !== (s = e.Icon)) &&
      0 !== s.length &&
      this.SetElementIcon(s, i, this.ZIt);
  }
  Refresh(e) {
    (this.ZIt = e), this.gbt();
  }
}
exports.RoleElementGrid = RoleElementGrid;
//# sourceMappingURL=RoleElementGrid.js.map
