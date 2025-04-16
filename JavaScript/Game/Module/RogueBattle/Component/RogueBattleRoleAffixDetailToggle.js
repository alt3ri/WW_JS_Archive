"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueBattleRoleAffixDetailToggle = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class RogueBattleRoleAffixDetailToggle extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.Id = 0),
      (this.OnSelectCallback = void 0),
      (this.BBl = () => {
        this.OnSelectCallback?.(this.GridIndex);
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIExtendToggle],
    ];
  }
  Refresh(e, t, i) {
    this.Id = e;
    e =
      ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResCharacterBuff(
        e,
      );
    e &&
      (this.SetSpriteByPath(e.AffixIcon, this.GetSprite(0), !1),
      this.GetExtendToggle(1)?.SetToggleState(t ? 1 : 0, !1),
      this.GetExtendToggle(1).OnStateChange.Clear(),
      this.GetExtendToggle(1).OnStateChange.Add(this.BBl));
  }
  OnSelected(e) {
    this.GetExtendToggle(1).SetToggleState(1, !1);
  }
  OnDeselected(e) {
    this.GetExtendToggle(1).SetToggleState(0, !1);
  }
}
exports.RogueBattleRoleAffixDetailToggle = RogueBattleRoleAffixDetailToggle;
//# sourceMappingURL=RogueBattleRoleAffixDetailToggle.js.map
