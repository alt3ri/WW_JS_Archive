"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OnlineChallengePlayerStateItem = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class OnlineChallengePlayerStateItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), (this.j8 = -1);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText],
      [2, UE.UIItem],
      [3, UE.UIItem],
    ];
  }
  Refresh(e, r, t) {
    this.j8 = e;
    var e = ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamListById(
      this.j8,
    );
    e
      ? (this.GetText(1).SetText(e.Name),
        (e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
          e.HeadId,
        )?.Card) && this.SetTextureByPath(e, this.GetTexture(0)),
        (e =
          ModelManager_1.ModelManager.OnlineModel.GetContinuingChallengeConfirmState(
            this.j8,
          )),
        this.SetTeamPlayerSprite(this.j8, e))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("MultiPlayerTeam", 5, "获取队友联机时，失败", [
          "PlayerId",
          this.j8,
        ]);
  }
  SetTeamPlayerSprite(e, r) {
    if (this.j8 === e)
      switch (r) {
        case 0:
          this.GetItem(2)?.SetUIActive(!0), this.GetItem(3)?.SetUIActive(!1);
          break;
        case 2:
          this.GetItem(2)?.SetUIActive(!1), this.GetItem(3)?.SetUIActive(!0);
          break;
        case 1:
          this.GetItem(2)?.SetUIActive(!1), this.GetItem(3)?.SetUIActive(!1);
      }
  }
}
exports.OnlineChallengePlayerStateItem = OnlineChallengePlayerStateItem;
//# sourceMappingURL=OnlineChallengePlayerStateItem.js.map
