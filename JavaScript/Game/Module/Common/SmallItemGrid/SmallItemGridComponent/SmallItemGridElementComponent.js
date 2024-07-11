"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SmallItemGridElementComponent = void 0);
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const SmallItemGridComponent_1 = require("./SmallItemGridComponent");
class SmallItemGridElementComponent extends SmallItemGridComponent_1.SmallItemGridComponent {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture]];
  }
  GetResourceId() {
    return "UiItem_ItemElement";
  }
  OnRefresh(e) {
    let t, n, r;
    void 0 === e ||
    !(t = ConfigManager_1.ConfigManager.CommonConfig.GetElementConfig(e)) ||
    (n = t.Icon5) === "" ||
    n.length === 0
      ? this.SetActive(!1)
      : ((r = this.GetTexture(0)),
        this.SetElementIcon(n, r, e),
        r.SetColor(UE.Color.FromHex(t.ElementColor)),
        this.SetActive(!0));
  }
}
exports.SmallItemGridElementComponent = SmallItemGridElementComponent;
// # sourceMappingURL=SmallItemGridElementComponent.js.map
