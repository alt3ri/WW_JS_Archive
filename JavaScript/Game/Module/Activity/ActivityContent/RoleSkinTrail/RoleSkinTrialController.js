"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleSkinTrialController = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../../../Core/Net/Net"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  InstanceDungeonController_1 = require("../../../InstanceDungeon/InstanceDungeonController"),
  InstanceDungeonEntranceController_1 = require("../../../InstanceDungeon/InstanceDungeonEntranceController"),
  ItemRewardController_1 = require("../../../ItemReward/ItemRewardController"),
  ItemRewardDefine_1 = require("../../../ItemReward/ItemRewardDefine"),
  ActivityControllerBase_1 = require("../../ActivityControllerBase"),
  RoleSkinTrialData_1 = require("./RoleSkinTrialData"),
  RoleSkinTrialSubView_1 = require("./RoleSkinTrialSubView");
class RoleSkinTrialController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments),
      (this.p7l = (e) => {
        e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
          (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.Q4n,
            27409,
          ),
          (e = {
            ButtonTextId: "ConfirmBox_250_ButtonText_0",
            DescriptionTextId: void 0,
            IsTimeDownCloseView: !1,
            IsClickedCloseView: !0,
            OnClickedCallback: function () {
              InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeon();
            },
          }),
          ItemRewardController_1.ItemRewardController.OpenExploreRewardView(
            ItemRewardDefine_1.ROLE_SKIN_TRIAL_ERROR_RESULT,
            !1,
            void 0,
            void 0,
            void 0,
            [e],
          ));
      });
  }
  OnCreateActivityData(e) {
    return new RoleSkinTrialData_1.RoleSkinTrialData();
  }
  OnCreateSubPageComponent(e) {
    return new RoleSkinTrialSubView_1.RoleSkinTrialSubView();
  }
  OnOpenView(e) {}
  OnGetIsOpeningActivityRelativeView() {
    return !1;
  }
  OnGetActivityResource(e) {
    return "UiItem_ActivityRoleSkinOntrial";
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(27409, this.p7l);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(27409);
  }
  static CheckIfInRoleSkinTrialInstance() {
    var e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId(),
      e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e);
    return !!e && 26 === e.InstSubType;
  }
  static RequestRoleSkinTrailInstanceReward(r, n) {
    var e = new Protocol_1.Aki.Protocol.bv_();
    (e.v7l = n),
      Net_1.Net.Call(25674, e, (e) => {
        e &&
          (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.Q4n,
              22889,
            ),
          (e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(r))) &&
          (e.FinishRewardById(n),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Activity",
              27,
              "[角色皮肤试用活动]试用副本奖励领取成功",
              ["id", n],
            ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RefreshCommonActivityRedDot,
            r,
          ));
      });
  }
  static EnterRoleTrialDungeonDirectly(e, r, n) {
    r = { w6n: r, v7l: n };
    (ModelManager_1.ModelManager.InstanceDungeonModel.InstanceEnterContentText.y7l =
      r),
      InstanceDungeonController_1.InstanceDungeonController.PrewarTeamFightRequest(
        e,
        [],
        0,
        0,
      );
  }
  static RequestRoleSkinTrialUiEndPush() {
    var e = Protocol_1.Aki.Protocol.Wp_.create();
    Net_1.Net.Send(16812, e);
  }
}
(exports.RoleSkinTrialController = RoleSkinTrialController).CurrentActivityId =
  0;
//# sourceMappingURL=RoleSkinTrialController.js.map
