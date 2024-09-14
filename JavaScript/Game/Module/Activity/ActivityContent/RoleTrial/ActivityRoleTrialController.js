"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRoleTrialController = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../../../Core/Net/Net"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  InstanceDungeonController_1 = require("../../../InstanceDungeon/InstanceDungeonController"),
  InstanceDungeonEntranceController_1 = require("../../../InstanceDungeon/InstanceDungeonEntranceController"),
  ItemRewardController_1 = require("../../../ItemReward/ItemRewardController"),
  ItemRewardDefine_1 = require("../../../ItemReward/ItemRewardDefine"),
  ActivityController_1 = require("../../ActivityController"),
  ActivityControllerBase_1 = require("../../ActivityControllerBase"),
  ActivityRoleTrialData_1 = require("./ActivityRoleTrialData"),
  ActivitySubViewRoleTrial_1 = require("./ActivitySubViewRoleTrial");
class ActivityRoleTrialController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments),
      (this.Y2e = (e) => {
        var t = ActivityRoleTrialController.J2e();
        t && t.IsRolePreviewOn() && (t.CurrentRoleId = e);
      }),
      (this.nye = () => {
        var e = ActivityRoleTrialController.J2e();
        e &&
          e.IsRoleInstanceOn() &&
          !ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() &&
          ActivityController_1.ActivityController.OpenActivityById(
            ActivityRoleTrialController.CurrentActivityId,
          );
      }),
      (this.z2e = (e) => {
        e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
          (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.Q4n,
            27498,
          ),
          (e = {
            ButtonTextId: "ConfirmBox_133_ButtonText_0",
            DescriptionTextId: void 0,
            IsTimeDownCloseView: !1,
            IsClickedCloseView: !0,
            OnClickedCallback: function () {
              InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeon();
            },
          }),
          ItemRewardController_1.ItemRewardController.OpenExploreRewardView(
            ItemRewardDefine_1.ROLE_TRIAL_ERROR_RESULT,
            !1,
            void 0,
            void 0,
            void 0,
            [e],
          ));
      });
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(27498, this.z2e);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(27498);
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.RoleSystemChangeRole,
      this.Y2e,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldDoneAndCloseLoading,
        this.nye,
      );
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.RoleSystemChangeRole,
      this.Y2e,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldDoneAndCloseLoading,
        this.nye,
      );
  }
  static J2e() {
    var e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(
      ActivityRoleTrialController.CurrentActivityId,
    );
    if (e) return e;
  }
  OnGetActivityResource(e) {
    return "UiItem_ActivityRoleTrial";
  }
  OnCreateSubPageComponent(e) {
    return new ActivitySubViewRoleTrial_1.ActivitySubViewRoleTrial();
  }
  OnCreateActivityData(e) {
    return (
      (ActivityRoleTrialController.CurrentActivityId = e.s5n),
      new ActivityRoleTrialData_1.ActivityRoleTrialData()
    );
  }
  OnOpenView(e) {}
  OnGetIsOpeningActivityRelativeView() {
    return !1;
  }
  static RequestRoleInstanceReward(t) {
    var e = new Protocol_1.Aki.Protocol.xus();
    (e.Q6n = t),
      Net_1.Net.Call(16800, e, (e) => {
        e &&
          (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.Q4n,
              27936,
            ),
          (e = this.J2e())) &&
          (e.SetRewardStateByRoleId(t, 2),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Activity",
              38,
              "[角色试用活动]试用副本奖励领取成功",
              ["RoleId", t],
            ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RefreshCommonActivityRedDot,
            ActivityRoleTrialController.CurrentActivityId,
          ));
      });
  }
  static EnterRoleTrialDungeonDirectly(e) {
    InstanceDungeonController_1.InstanceDungeonController.PrewarTeamFightRequest(
      e,
      [],
    );
  }
}
(exports.ActivityRoleTrialController =
  ActivityRoleTrialController).CurrentActivityId = 0;
//# sourceMappingURL=ActivityRoleTrialController.js.map
