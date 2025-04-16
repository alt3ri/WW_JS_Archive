"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueBattleSettleFetterInfoGrid = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class RogueBattleSettleFetterInfoGrid extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UITexture],
      [2, UE.UIText],
    ];
  }
  Refresh(e, t, r) {
    var i = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResBond(
      e.v9n,
    );
    void 0 !== i &&
      (this.SetTextureShowUntilLoaded(i.Icon, this.GetTexture(1)),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(2),
        "RogueRes_FightFormation_RoleLevel",
        e.F6n.toString(),
      ));
  }
}
exports.RogueBattleSettleFetterInfoGrid = RogueBattleSettleFetterInfoGrid;
//# sourceMappingURL=RogueBattleSettleFetterInfoGrid.js.map
