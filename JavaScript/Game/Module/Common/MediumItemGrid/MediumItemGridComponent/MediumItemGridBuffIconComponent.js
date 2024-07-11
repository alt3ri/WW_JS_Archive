"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MediumItemGridBuffIconComponent = void 0);
const UE = require("ue"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  MediumItemGridComponent_1 = require("./MediumItemGridComponent");
class MediumItemGridBuffIconComponent extends MediumItemGridComponent_1.MediumItemGridComponent {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite]];
  }
  GetResourceId() {
    return "UiItem_ItemType";
  }
  OnRefresh(t) {
    if (void 0 === t) this.SetActive(!1);
    else {
      let e = void 0;
      var r = ModelManager_1.ModelManager.MediumItemGridModel;
      switch (t) {
        case 0:
          break;
        case 1:
          e = r.AttackBuffSpritePath;
          break;
        case 2:
          e = r.DefenseBuffSpritePath;
          break;
        case 3:
          e = r.RestoreHealthBuffSpritePath;
          break;
        case 4:
          e = r.RechargeBuffSpritePath;
          break;
        case 5:
          e = r.ResurrectionBuffSpritePath;
      }
      e
        ? ((t = this.GetSprite(0)),
          this.SetSpriteByPath(e, t, !1),
          this.SetActive(!0))
        : this.SetActive(!1);
    }
  }
}
exports.MediumItemGridBuffIconComponent = MediumItemGridBuffIconComponent;
//# sourceMappingURL=MediumItemGridBuffIconComponent.js.map
