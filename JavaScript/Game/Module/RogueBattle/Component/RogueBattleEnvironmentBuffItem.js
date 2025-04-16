"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueBattleEnvironmentBuffItemWithSprite =
    exports.RogueBattleEnvironmentBuffItemWithTexture =
      void 0);
const UE = require("ue"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class RogueBattleEnvironmentBuffItemWithTexture extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText],
    ];
  }
  Refresh(t, e, i) {
    this.SetTextureByPath(t.Icon, this.GetTexture(0)),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(1),
        t.TextId,
        ...t.Param,
      );
  }
}
exports.RogueBattleEnvironmentBuffItemWithTexture =
  RogueBattleEnvironmentBuffItemWithTexture;
class RogueBattleEnvironmentBuffItemWithSprite extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText],
    ];
  }
  Refresh(t, e, i) {
    this.SetSpriteByPath(t.Icon, this.GetSprite(0), !1),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(1),
        t.TextId,
        ...t.Param,
      );
  }
}
exports.RogueBattleEnvironmentBuffItemWithSprite =
  RogueBattleEnvironmentBuffItemWithSprite;
//# sourceMappingURL=RogueBattleEnvironmentBuffItem.js.map
