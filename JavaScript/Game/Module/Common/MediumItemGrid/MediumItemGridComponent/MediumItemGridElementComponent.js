"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MediumItemGridElementComponent = void 0);
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const MediumItemGridComponent_1 = require("./MediumItemGridComponent");
class MediumItemGridElementComponent extends MediumItemGridComponent_1.MediumItemGridComponent {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture]];
  }
  GetResourceId() {
    return "UiItem_ItemElement";
  }
  OnRefresh(e) {
    let t, n, i;
    void 0 === e ||
    !(t = ConfigManager_1.ConfigManager.CommonConfig.GetElementConfig(e)) ||
    (n = t.Icon5) === "" ||
    n.length === 0
      ? this.SetActive(!1)
      : ((i = this.GetTexture(0)),
        this.SetElementIcon(n, i, e),
        i.SetColor(UE.Color.FromHex(t.ElementColor)),
        this.SetActive(!0));
  }
}
exports.MediumItemGridElementComponent = MediumItemGridElementComponent;
// # sourceMappingURL=MediumItemGridElementComponent.js.map
