"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MediumItemGridHalfAreaComponent = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  MediumItemGridComponent_1 = require("./MediumItemGridComponent");
class MediumItemGridHalfAreaComponent extends MediumItemGridComponent_1.MediumItemGridComponent {
  GetResourceId() {
    return "UiItem_ItemTagTeam";
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite]];
  }
  OnRefresh(e) {
    (e = this._A_(e?.BelongTo)),
      (e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e));
    this.SetSpriteByPath(e, this.GetSprite(0), !1), this.SetActive(!0);
  }
  _A_(e = 0) {
    return 0 === e ? "SP_ComTagTeam1" : "SP_ComTagTeam2";
  }
}
exports.MediumItemGridHalfAreaComponent = MediumItemGridHalfAreaComponent;
//# sourceMappingURL=MediumItemGridHalfAreaComponent.js.map
