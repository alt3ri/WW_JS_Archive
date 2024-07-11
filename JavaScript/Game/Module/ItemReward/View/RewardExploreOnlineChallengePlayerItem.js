"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RewardExploreOnlineChallengePlayerItem = void 0);
const UE = require("ue"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  EditFormationDefine_1 = require("../../EditFormation/EditFormationDefine"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class RewardExploreOnlineChallengePlayerItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UISprite],
    ];
  }
  OnStart() {
    this.GetTexture(0)?.SetUIActive(!1);
  }
  Refresh(r, e, i) {
    let t = 0;
    for (const a of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItemsByPlayer(
      r,
    ))
      a.IsControl() && (t = a.GetConfigId);
    if (t) {
      var n =
        ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
          t,
        )?.RoleHeadIconBig;
      if (n) {
        const o = this.GetTexture(0);
        if (o) {
          this.SetRoleIcon(n, o, t, void 0, () => {
            o.SetUIActive(!0);
          });
          let e = void 0;
          e =
            r === ModelManager_1.ModelManager.CreatureModel.GetPlayerId()
              ? EditFormationDefine_1.SELF_ONLINE_INDEX
              : EditFormationDefine_1.OTHER_ONLINE_INDEX;
          (n = this.GetSprite(1)),
            (r = StringUtils_1.StringUtils.Format(
              e,
              ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamListById(
                r,
              )?.PlayerNumber.toString() ?? "1",
            )),
            (r =
              ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
                r,
              ));
          r
            ? (n.SetUIActive(!0), this.SetSpriteByPath(r, n, !1))
            : n.SetUIActive(!1);
        } else this.SetUiActive(!1);
      } else this.SetUiActive(!1);
    } else this.SetUiActive(!1);
  }
}
exports.RewardExploreOnlineChallengePlayerItem =
  RewardExploreOnlineChallengePlayerItem;
//# sourceMappingURL=RewardExploreOnlineChallengePlayerItem.js.map
