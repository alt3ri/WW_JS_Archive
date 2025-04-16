"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RacingBetsDangoSkillItem = void 0);
const UE = require("ue"),
  DangoManager_1 = require("../../../Dango/DangoLogic/DangoManager"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class RacingBetsDangoSkillItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText],
      [2, UE.UIText],
    ];
  }
  Refresh(e, t, r) {
    (e = DangoManager_1.DangoManager.GetDangoData(e.DangoId)),
      this.SetTextureShowUntilLoaded(e.Icon, this.GetTexture(0)),
      (e = e.GetSkillConfig());
    this.GetText(1).ShowTextNew(e.Name), this.GetText(2).ShowTextNew(e.Desc);
  }
}
exports.RacingBetsDangoSkillItem = RacingBetsDangoSkillItem;
//# sourceMappingURL=RacingBetsDangoSkillItem.js.map
