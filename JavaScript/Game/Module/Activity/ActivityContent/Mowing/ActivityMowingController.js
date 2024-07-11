"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityMowingController = void 0);
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../../../Core/Net/Net"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  InstanceDungeonController_1 = require("../../../InstanceDungeon/InstanceDungeonController"),
  InstanceDungeonEntranceController_1 = require("../../../InstanceDungeon/InstanceDungeonEntranceController"),
  ItemRewardController_1 = require("../../../ItemReward/ItemRewardController"),
  ItemRewardDefine_1 = require("../../../ItemReward/ItemRewardDefine"),
  ActivityControllerBase_1 = require("../../ActivityControllerBase"),
  ActivityMowingData_1 = require("./ActivityMowingData"),
  ActivityMowingSubView_1 = require("./ActivityMowingSubView");
class ActivityMowingController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments),
      (this.DSe = (e, t) => {
        var n;
        0 !== ActivityMowingController.CurrentActivityId &&
          (n = ActivityMowingController.GetMowingActivityData()) &&
          n.LocalConfig?.PreShowGuideQuest.includes(e) &&
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RefreshCommonActivityRedDot,
            n.Id,
          );
      }),
      (this.fSn = () => {
        ModelManager_1.ModelManager.InstanceDungeonEntranceModel.IsMowingInstanceDungeon() &&
          ActivityMowingController.RequestExitDungeon();
      }),
      (this.oOe = () => {
        var e;
        0 !== ActivityMowingController.CurrentActivityId &&
          (e = ActivityMowingController.GetMowingActivityData()) &&
          e.RedPointShowState &&
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RefreshCommonActivityRedDot,
            e.Id,
          );
      }),
      (this.RequestGetLevelReward = (t, n, e) => {
        var o = Protocol_1.Aki.Protocol.P$n.create();
        (o.T6n = t),
          (o.X5n = n),
          Net_1.Net.Call(9199, o, (e) => {
            e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs
              ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                  e.O4n,
                  15562,
                )
              : ((e =
                  ModelManager_1.ModelManager.ActivityModel.GetActivityById(
                    t,
                  )).SetLevelRewardStateToGot(n),
                EventSystem_1.EventSystem.Emit(
                  EventDefine_1.EEventName.ActivityViewRefreshCurrent,
                  t,
                ),
                EventSystem_1.EventSystem.Emit(
                  EventDefine_1.EEventName.RefreshCommonActivityRedDot,
                  t,
                ),
                UiManager_1.UiManager.IsViewOpen("ActivityRewardPopUpView") &&
                  EventSystem_1.EventSystem.Emit(
                    EventDefine_1.EEventName
                      .RefreshCommonActivityRewardPopUpView,
                    e.GetRewardViewData(),
                  ));
          });
      }),
      (this.d2e = (e) => {
        ModelManager_1.ModelManager.ActivityModel.GetActivityById(
          e.T6n,
        ).UpdatePointRewards(e),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.ActivityViewRefreshCurrent,
            e.T6n,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RefreshCommonActivityRedDot,
            e.T6n,
          );
      }),
      (this.C2e = (e) => {
        ModelManager_1.ModelManager.ActivityModel.GetActivityById(
          e.T6n,
        ).UpdateLevelRewards(e),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.ActivityViewRefreshCurrent,
            e.T6n,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RefreshCommonActivityRedDot,
            e.T6n,
          );
      }),
      (this.g2e = (e) => {
        var t = e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs,
          n =
            (t &&
              ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.O4n,
                2501,
              ),
            {
              ButtonTextId: "ConfirmBox_133_ButtonText_0",
              DescriptionTextId: void 0,
              IsTimeDownCloseView: !1,
              IsClickedCloseView: !0,
              OnClickedCallback: function () {
                InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeon();
              },
            }),
          o = {
            ButtonTextId: "ConfirmBox_133_ButtonText_1",
            DescriptionTextId: "MowingHighestPoint",
            DescriptionArgs: [e.Yps.toString()],
            IsTimeDownCloseView: !1,
            IsClickedCloseView: !1,
            OnClickedCallback: function () {
              var e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId(),
                t = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems(!0);
              if (0 !== t.length) {
                var n = [];
                for (const o of t) n.push(o.GetConfigId);
                InstanceDungeonController_1.InstanceDungeonController.PrewarTeamFightRequest(
                  e,
                  n,
                );
              }
            },
          },
          i = {
            TitleTextId: "MowingCurrentPoint",
            Record: e.Xps.toString(),
            IsNewRecord: e.Xps > e.Yps,
          };
        ItemRewardController_1.ItemRewardController.OpenExploreRewardView(
          t
            ? ItemRewardDefine_1.MOWING_ERROR_RESULT
            : ItemRewardDefine_1.MOWING_RESULT,
          !t && e.Qps,
          void 0,
          t ? void 0 : i,
          void 0,
          t ? [n] : [n, o],
          void 0,
          void 0,
          void 0,
        );
      });
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(6301, this.d2e),
      Net_1.Net.Register(4350, this.C2e),
      Net_1.Net.Register(2501, this.g2e);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(6301),
      Net_1.Net.UnRegister(4350),
      Net_1.Net.UnRegister(2501);
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnQuestStateChange,
      this.DSe,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CrossDay,
        this.oOe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.LeaveInstanceDungeonConfirm,
        this.fSn,
      );
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnQuestStateChange,
      this.DSe,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CrossDay,
        this.oOe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.LeaveInstanceDungeonConfirm,
        this.fSn,
      );
  }
  OnGetActivityResource(e) {
    return "UiItem_ActivityMowing";
  }
  OnOpenView(e) {}
  OnCreateSubPageComponent(e) {
    return new ActivityMowingSubView_1.ActivityMowingSubView();
  }
  OnCreateActivityData(e) {
    return (
      (ActivityMowingController.CurrentActivityId = e.J4n),
      new ActivityMowingData_1.ActivityMowingData()
    );
  }
  OnGetIsOpeningActivityRelativeView() {
    return !1;
  }
  RequestGetPointReward(t, n) {
    var e = Protocol_1.Aki.Protocol.D$n.create();
    (e.T6n = t),
      (e.J4n = n),
      Net_1.Net.Call(17905, e, (e) => {
        e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs
          ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.O4n,
              7572,
            )
          : ((e =
              ModelManager_1.ModelManager.ActivityModel.GetActivityById(
                t,
              )).SetPointRewardState(n),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.ActivityViewRefreshCurrent,
              t,
            ),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.RefreshCommonActivityRedDot,
              t,
            ),
            UiManager_1.UiManager.IsViewOpen("ActivityRewardPopUpView") &&
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.RefreshCommonActivityRewardPopUpView,
                e.GetRewardViewData(),
              ));
      });
  }
  static RequestSetDifficultyAll(e, t) {
    ActivityMowingController.GetMowingActivityData() &&
      this.RequestSetDifficulty(e, t);
  }
  static RequestExitDungeon() {
    var e = new Protocol_1.Aki.Protocol.q$n();
    Net_1.Net.Call(18645, e, (e) => {
      e ||
        InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeonRequest();
    });
  }
  static GetMowingActivityData() {
    return ModelManager_1.ModelManager.ActivityModel?.GetActivityById(
      ActivityMowingController.CurrentActivityId,
    );
  }
  GetActivityLevelUnlockState(e) {
    var t = ActivityMowingController.GetMowingActivityData();
    return !t || t.GetActivityLevelUnlockState(e);
  }
  static IsMowingInstanceDungeon(e) {
    return (
      !!e &&
      19 ===
        ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)
          ?.InstSubType
    );
  }
}
((exports.ActivityMowingController =
  ActivityMowingController).CurrentActivityId = 0),
  (ActivityMowingController.RequestSetDifficulty = (n, o) => {
    var e = Protocol_1.Aki.Protocol.w$n.create();
    (e.T6n = n),
      (e.H6n = o),
      Net_1.Net.Call(14862, e, (e) => {
        var t;
        e &&
          e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.O4n,
            6701,
          );
        for ([, t] of ModelManager_1.ModelManager.ActivityModel.GetActivityById(
          n,
        ).MowingLevelInfoDict)
          t.H6n = o;
      });
  }),
  (ActivityMowingController.GetRecommendLevel = (e, t) => {
    var n = ActivityMowingController.GetMowingActivityData();
    return n ? n.GetLevelDiffRecommendLevel(e) : 0;
  }),
  (ActivityMowingController.CheckIsActivityLevel = (e) =>
    ActivityMowingController.IsMowingInstanceDungeon(e));
//# sourceMappingURL=ActivityMowingController.js.map
