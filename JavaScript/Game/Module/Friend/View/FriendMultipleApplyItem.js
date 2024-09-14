"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FriendMultipleApplyItem = void 0);
const UE = require("ue"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  FriendController_1 = require("../FriendController");
var Proto_FriendApplyOperator = Protocol_1.Aki.Protocol.A6s;
class FriendMultipleApplyItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(),
      (this.$ra = void 0),
      (this.pNi = void 0),
      (this.T8t = () => {
        FriendController_1.FriendController.RequestFriendApplyHandle(
          [this.$ra.ApplyPlayerData.PlayerId],
          Proto_FriendApplyOperator.Proto_Approve,
        ),
          this.$ra &&
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.FriendOnMultiItemAction,
              this.$ra.ApplyPlayerData.PlayerId,
            );
      }),
      (this.I8t = () => {
        FriendController_1.FriendController.RequestFriendApplyHandle(
          [this.$ra.ApplyPlayerData.PlayerId],
          Proto_FriendApplyOperator.Proto_Reject,
        ),
          this.$ra &&
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.FriendOnMultiItemAction,
              this.$ra.ApplyPlayerData.PlayerId,
            );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UITexture],
      [2, UE.UIText],
      [3, UE.UISprite],
      [4, UE.UIButtonComponent],
      [5, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [4, this.T8t],
        [5, this.I8t],
      ]);
  }
  OnStart() {
    this.pNi = this.GetSprite(3);
  }
  Refresh(e, t, r) {
    var e = (this.$ra = e).ApplyPlayerData,
      i = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
        e.PlayerHeadPhoto,
      )?.Card;
    i && this.SetTextureByPath(i, this.GetTexture(1)),
      this.GetText(0).SetText(e.PlayerName),
      this.GetText(2).SetText(e.PlayerLevel.toString());
  }
  UpdateCountDownProgressBar() {
    this.$ra &&
      (this.pNi.SetFillAmount(
        this.$ra.ApplyTimeLeftTime /
          ModelManager_1.ModelManager.FriendModel.ApplyCdTime,
      ),
      this.$ra.ApplyTimeLeftTime <= 0) &&
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.FriendOnMultiItemAction,
        this.$ra.ApplyPlayerData.PlayerId,
      );
  }
}
exports.FriendMultipleApplyItem = FriendMultipleApplyItem;
//# sourceMappingURL=FriendMultipleApplyItem.js.map
