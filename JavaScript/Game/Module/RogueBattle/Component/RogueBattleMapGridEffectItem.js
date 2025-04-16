"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueBattleMapGridEffectTabItem = void 0);
const UE = require("ue"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class RogueBattleMapGridEffectTabItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIItem],
      [2, UE.UIText],
      [3, UE.UIText],
    ];
  }
  OnStart() {
    this.GetItem(1)?.SetUIActive(!1);
  }
  Refresh(t, e, i) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), t.TagKey);
    var r = t.IsRatio ? `+${t.Count}%` : "+" + t.Count;
    this.GetText(2)?.SetText(r),
      this.SetTextureByPath(t.Icon, this.GetTexture(0));
  }
}
exports.RogueBattleMapGridEffectTabItem = RogueBattleMapGridEffectTabItem;
//# sourceMappingURL=RogueBattleMapGridEffectItem.js.map
