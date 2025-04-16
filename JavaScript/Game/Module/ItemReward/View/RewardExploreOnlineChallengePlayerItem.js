"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RewardExploreOnlineChallengePlayerItem = void 0);
const UE = require("ue"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  EditFormationDefine_1 = require("../../EditFormation/EditFormationDefine");
class RewardExploreOnlineChallengePlayerItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UISprite],
    ];
  }
  OnStart() {
    this.GetTexture(0)?.SetUIActive(!1);
  }
  Refresh(i) {
    let r = 0;
    for (const e of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItemsByPlayer(
      i,
    ))
      e.IsControl() && (r = e.GetConfigId);
    if (r) {
      var a =
        ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
          r,
        )?.RoleHeadIconBig;
      if (a) {
        const n = this.GetTexture(0);
        if (n) {
          this.SetRoleIcon(a, n, r, void 0, () => {
            n.SetUIActive(!0);
          });
          let e = void 0;
          e =
            i === ModelManager_1.ModelManager.CreatureModel.GetPlayerId()
              ? EditFormationDefine_1.SELF_ONLINE_INDEX
              : EditFormationDefine_1.OTHER_ONLINE_INDEX;
          (a = this.GetSprite(1)),
            (i = StringUtils_1.StringUtils.Format(
              e,
              ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamListById(
                i,
              )?.PlayerNumber.toString() ?? "1",
            )),
            (i =
              ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
                i,
              ));
          i
            ? (a.SetUIActive(!0), this.SetSpriteByPath(i, a, !1))
            : a.SetUIActive(!1);
        } else this.SetUiActive(!1);
      } else this.SetUiActive(!1);
    } else this.SetUiActive(!1);
  }
}
exports.RewardExploreOnlineChallengePlayerItem =
  RewardExploreOnlineChallengePlayerItem;
//# sourceMappingURL=RewardExploreOnlineChallengePlayerItem.js.map
