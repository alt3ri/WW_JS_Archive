"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingRoleTalkPanel = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../../../../Core/Common/CustomPromise"),
  ConfigManager_1 = require("../../../../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase"),
  LevelSequencePlayer_1 = require("../../../../../Common/LevelSequencePlayer"),
  LguiUtil_1 = require("../../../../../Util/LguiUtil");
class FishingRoleTalkPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), (this.LevelSequencePlayer = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText],
    ];
  }
  OnStart() {
    this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
      this.RootItem,
    );
  }
  SetRoleHead(e) {
    var i = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
    this.SetRoleIcon(i.RoleHeadIconCircle, this.GetTexture(0), e);
  }
  SetTxtInfo(e, ...i) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e, i);
  }
  PlayAnim(e, i) {
    var r = new CustomPromise_1.CustomPromise();
    this.LevelSequencePlayer.PlaySequenceAsync(e, r).then(() => {
      i?.();
    });
  }
}
exports.FishingRoleTalkPanel = FishingRoleTalkPanel;
//# sourceMappingURL=FishingRoleTalkPanel.js.map
