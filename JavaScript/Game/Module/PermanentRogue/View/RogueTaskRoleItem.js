"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueTaskRoleItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
class RogueTaskRoleItem extends UiPanelBase_1.UiPanelBase {
  constructor(e, s) {
    super(),
      (this.RoleId = 0),
      (this.IsLock = !0),
      (this.LevelSequencePlayer = void 0),
      (this.RoleId = e),
      (this.IsLock = s);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIItem],
    ];
  }
  OnStart() {
    this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
      this.RootItem,
    );
    this.GetItem(1)?.SetUIActive(this.IsLock);
    var e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(this.RoleId);
    this.SetTextureByPath(e.FormationRoleCard, this.GetTexture(0));
  }
  OnBeforeDestroy() {
    this.LevelSequencePlayer = void 0;
  }
  SetCharUnlock() {
    this.IsLock &&
      ((this.IsLock = !1),
      this.LevelSequencePlayer?.PlayLevelSequenceByName("Unlock"));
  }
}
exports.RogueTaskRoleItem = RogueTaskRoleItem;
//# sourceMappingURL=RogueTaskRoleItem.js.map
