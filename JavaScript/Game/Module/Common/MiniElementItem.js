"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MiniElementItem = void 0);
const UE = require("ue");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
class MiniElementItem extends UiPanelBase_1.UiPanelBase {
  constructor(e, i, t) {
    super(),
      (this.Vyt = e),
      !t && i
        ? this.CreateThenShowByResourceIdAsync(
            "UiItem_MiniElement_Prefab",
            i,
            !1,
          )
        : this.CreateThenShowByActor(t);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UITexture],
    ];
  }
  OnStart() {
    this.RefreshMiniElement(this.Vyt);
  }
  RefreshMiniElement(e) {
    let i;
    const t = this.GetTexture(1);
    t &&
      (e = ConfigManager_1.ConfigManager.CommonConfig.GetElementConfig(e)) &&
      (i = e.Icon5) !== "" &&
      i.length !== 0 &&
      ((i = UE.Color.FromHex(e.ElementColor)),
      this.GetSprite(0).SetColor(i),
      this.SetTextureByPath(e.Icon5, t));
  }
}
exports.MiniElementItem = MiniElementItem;
// # sourceMappingURL=MiniElementItem.js.map
