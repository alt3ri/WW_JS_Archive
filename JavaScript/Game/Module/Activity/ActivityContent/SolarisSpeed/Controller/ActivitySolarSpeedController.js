"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivitySolarSpeedController = void 0);
const Log_1 = require("../../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../../../../Core/Net/Net"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  UiManager_1 = require("../../../../../Ui/UiManager"),
  ItemRewardController_1 = require("../../../../ItemReward/ItemRewardController"),
  ItemRewardDefine_1 = require("../../../../ItemReward/ItemRewardDefine"),
  ActivityControllerBase_1 = require("../../../ActivityControllerBase"),
  SolarSpeedDefine_1 = require("../SolarSpeedDefine"),
  ActivitySolarSpeedSubView_1 = require("../View/ActivitySolarSpeedSubView");
var Proto_ErrorCode = Protocol_1.Aki.Protocol.Q4n,
  Proto_TeamParkourRewardRequest = Protocol_1.Aki.Protocol.JN_,
  Proto_FriendApplyWay = Protocol_1.Aki.Protocol.D6s;
const TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem");
class ActivitySolarSpeedController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments),
      (this.g3_ = (e) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("SolarSpeed", 64, "HandleTeamParkourTaskNotify", [
            "msg",
            e,
          ]),
          ModelManager_1.ModelManager.SolarSpeedModel.SyncTeamParkourTaskNotify(
            e,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RefreshCommonActivityRedDot,
            ModelManager_1.ModelManager.SolarSpeedModel.CurrentActivityId,
          );
      }),
      (this.C3_ = (e) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "SolarSpeed",
            64,
            "HandleTeamParkourSettleNotify",
            ["msg", e],
            ["msg", e.gG_],
          );
        for (const o of e.c3_)
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "SolarSpeed",
              64,
              "TeamParkourSettleNotify.Proto_PlayerSettleInfos",
              ["s3_", o.s3_],
              ["_3_", o._3_],
              ["W5n", o.W5n],
              ["r3_", o.r3_],
              ["l3_", o.l3_],
              ["h3_", o.h3_],
              ["a3_", o.a3_],
              ["H8n", o.H8n],
              ["dSs", o.dSs],
            );
        var r = ModelManager_1.ModelManager.SolarSpeedModel;
        r.SyncTeamParkourSettleNotify(e),
          UiManager_1.UiManager.OpenView(
            "SolarSpeedResultView",
            r.BuildSolarSpeedResultViewData(),
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RefreshCommonActivityRedDot,
            r.CurrentActivityId,
          );
      }),
      (this.U6_ = (e) => {
        var r;
        ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig?.GetEntranceIdByInstanceId(
          e,
        ) === SolarSpeedDefine_1.SOLAR_SPEED_INSTANCE_ENTRANCE_ID &&
          ((r =
            ModelManager_1.ModelManager.SolarSpeedModel).SyncInstanceClicked(e),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnChallengeInstanceRedDot,
            e,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RefreshCommonActivityRedDot,
            r.CurrentActivityId,
          ));
      }),
      (this.OY_ = (e) => {
        e === SolarSpeedDefine_1.SOLAR_SPEED_INSTANCE_ENTRANCE_ID &&
          (ControllerHolder_1.ControllerHolder.BlackScreenController.AddBlackScreen(
            "Start",
            "SolarSpeed",
          ),
          TimerSystem_1.TimerSystem.Delay(() => {
            ControllerHolder_1.ControllerHolder.BlackScreenController.RemoveBlackScreen(
              "Close",
              "SolarSpeed",
            );
          }, 300));
      });
  }
  OnOpenView(e) {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.RefreshCommonActivityRedDot,
      e.Id,
    );
  }
  OnGetActivityResource(e) {
    return "UiItem_GongduolaOnlineGuide";
  }
  OnCreateSubPageComponent(e) {
    return new ActivitySolarSpeedSubView_1.ActivitySolarSpeedSubView();
  }
  OnCreateActivityData(e) {
    return ModelManager_1.ModelManager.SolarSpeedModel.ActivityData;
  }
  OnGetIsOpeningActivityRelativeView() {
    return !1;
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(19439, this.g3_), Net_1.Net.Register(24386, this.C3_);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(19439), Net_1.Net.UnRegister(24386);
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnSelectInstanceIdChallenge,
      this.U6_,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CloseInstanceEntrancePositively,
        this.OY_,
      );
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnSelectInstanceIdChallenge,
      this.U6_,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CloseInstanceEntrancePositively,
        this.OY_,
      );
  }
  GetActivityLevelUnlockState(e) {
    var r =
      !ModelManager_1.ModelManager.GameModeModel.IsMulti ||
      ModelManager_1.ModelManager.PlayerInfoModel.GetId() ===
        ModelManager_1.ModelManager.OnlineModel.OwnerId;
    return (
      ModelManager_1.ModelManager.SolarSpeedModel.IsUnlockByInstanceId(e) && r
    );
  }
  async RequestTeamParkourRewardRequest(e) {
    var r = Proto_TeamParkourRewardRequest.create(),
      r =
        ((r.w6n =
          ModelManager_1.ModelManager.SolarSpeedModel.CurrentActivityId),
        (r.N6n = e),
        await Net_1.Net.CallAsync(28860, r));
    return (
      void 0 !== r &&
      (r.Q4n !== Proto_ErrorCode.KRs
        ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            r.Q4n,
            28269,
          ),
          !1)
        : (ModelManager_1.ModelManager.SolarSpeedModel.SyncAfterRewardedById(e),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.SolarSpeedRewarded,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RefreshCommonActivityRedDot,
            ModelManager_1.ModelManager.SolarSpeedModel.CurrentActivityId,
          ),
          !0))
    );
  }
  SyncCurrentChosenLevelId(e) {
    ModelManager_1.ModelManager.SolarSpeedModel.SetCurrentChosenTabInRewardView(
      e,
    );
  }
  HandleConfirmClickInActivitySubView() {
    ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.EnterEntrance(
      SolarSpeedDefine_1.SOLAR_SPEED_INSTANCE_ENTRANCE_ID,
    );
  }
  HandleOnClickRewardInActivitySubView() {
    var e = ModelManager_1.ModelManager.SolarSpeedModel;
    e.ActivityData.IsUnLock()
      ? UiManager_1.UiManager.OpenView(
          "SolarSpeedRewardView",
          e.BuildSolarSpeedRewardViewDataById(e.DefaultLevelIdInRewardView),
        )
      : ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(
          SolarSpeedDefine_1.SOLAR_SPEED_REWARD_CANNOT_OPEN_TIPS_TEXT_ID,
        );
  }
  HandleClickPlayerInResultView(e) {
    ControllerHolder_1.ControllerHolder.FriendController.RequestFriendApplyAddSend(
      e,
      Proto_FriendApplyWay.Proto_RecentlyTeam,
    );
  }
  HandleClickNextInResultView() {
    var e = ModelManager_1.ModelManager.SolarSpeedModel,
      r = {
        ButtonTextId:
          SolarSpeedDefine_1.SOLAR_SPEED_CLOSE_BUTTON_TEXT_ID_IN_SETTLE,
        DescriptionTextId: void 0,
        IsTimeDownCloseView: !1,
        IsClickedCloseView: !0,
        OnClickedCallback: function () {
          ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.LeaveInstanceDungeon();
        },
      };
    ItemRewardController_1.ItemRewardController.OpenExploreRewardView(
      ItemRewardDefine_1.SOLAR_SPEED_SUCCESS,
      !0,
      void 0,
      void 0,
      void 0,
      [r],
      void 0,
      void 0,
      void 0,
      void 0,
      void 0,
      void 0,
      void 0,
      e.BuildSettleReachTargetData(),
    );
  }
}
((exports.ActivitySolarSpeedController =
  ActivitySolarSpeedController).GetInstanceSubtitleTextIdByInstanceId = (e) =>
  ModelManager_1.ModelManager.SolarSpeedModel.GetInstanceSubtitleTextIdByInstanceId(
    e,
  )),
  (ActivitySolarSpeedController.GetInstanceSubtitleArgsByInstanceId = (e) =>
    ModelManager_1.ModelManager.SolarSpeedModel.GetInstanceSubtitleArgsByInstanceId(
      e,
    ));
//# sourceMappingURL=ActivitySolarSpeedController.js.map
