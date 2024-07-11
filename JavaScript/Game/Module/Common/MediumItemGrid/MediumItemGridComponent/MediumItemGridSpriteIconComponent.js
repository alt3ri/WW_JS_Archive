"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MediumItemGridSpriteIconComponent = void 0);
const UE = require("ue");
const MediumItemGridComponent_1 = require("./MediumItemGridComponent");
class MediumItemGridSpriteIconComponent extends MediumItemGridComponent_1.MediumItemGridComponent {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite]];
  }
  GetResourceId() {
    return "UiItem_ItemSprite";
  }
  OnRefresh(e) {
    let t;
    void 0 === e || e === ""
      ? this.SetActive(!1)
      : ((t = this.GetSprite(0)),
        this.SetSpriteByPath(e, t, !1),
        this.SetActive(!0));
  }
}
exports.MediumItemGridSpriteIconComponent = MediumItemGridSpriteIconComponent;
// # sourceMappingURL=MediumItemGridSpriteIconComponent.js.map
