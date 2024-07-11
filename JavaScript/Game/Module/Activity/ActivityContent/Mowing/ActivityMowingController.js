"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityMowingController = void 0);
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../../Core/Net/Net");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const AdventureDefine_1 = require("../../../AdventureGuide/AdventureDefine");
const InstanceDungeonController_1 = require("../../../InstanceDungeon/InstanceDungeonController");
const InstanceDungeonEntranceController_1 = require("../../../InstanceDungeon/InstanceDungeonEntranceController");
const ItemRewardController_1 = require("../../../ItemReward/ItemRewardController");
const ItemRewardDefine_1 = require("../../../ItemReward/ItemRewardDefine");
const ActivityControllerBase_1 = require("../../ActivityControllerBase");
const ActivityMowingData_1 = require("./ActivityMowingData");
const ActivityMowingSubView_1 = require("./ActivityMowingSubView");
class ActivityMowingController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments),
      (this.DEe = (e, t) => {
        let n;
        ActivityMowingController.CurrentActivityId !== 0 &&
          (n = ActivityMowingController.GetMowingActivityData()) &&
          n.LocalConfig?.PreShowGuideQuest.includes(e) &&
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RefreshCommonActivityRedDot,
            n.Id,
          );
      }),
      (this.NUr = () => {
        ModelManager_1.ModelManager.InstanceDungeonEntranceModel.IsMowingInstanceDungeon() &&
          ActivityMowingController.RequestExitDungeon();
      }),
      (this.oOe = () => {
        let e;
        ActivityMowingController.CurrentActivityId !== 0 &&
          (e = ActivityMowingController.GetMowingActivityData()) &&
          e.RedPointShowState &&
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RefreshCommonActivityRedDot,
            e.Id,
          );
      }),
      (this.RequestGetLevelReward = (t, n, e) => {
        const i = Protocol_1.Aki.Protocol.P$n.create();
        (i.YFn = t),
          (i.vFn = n),
          Net_1.Net.Call(16182, i, (e) => {
            e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
              ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                  e.lkn,
                  21424,
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
      (this.JOe = (e) => {
        ModelManager_1.ModelManager.ActivityModel.GetActivityById(
          e.YFn,
        ).UpdatePointRewards(e),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.ActivityViewRefreshCurrent,
            e.YFn,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RefreshCommonActivityRedDot,
            e.YFn,
          );
      }),
      (this.zOe = (e) => {
        ModelManager_1.ModelManager.ActivityModel.GetActivityById(
          e.YFn,
        ).UpdateLevelRewards(e),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.ActivityViewRefreshCurrent,
            e.YFn,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RefreshCommonActivityRedDot,
            e.YFn,
          );
      }),
      (this.ZOe = (e) => {
        const t = e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys;
        const n =
          (t &&
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.lkn,
              8520,
            ),
          {
            ButtonTextId: "ConfirmBox_133_ButtonText_0",
            DescriptionTextId: void 0,
            IsTimeDownCloseView: !1,
            IsClickedCloseView: !0,
            OnClickedCallback: function () {
              InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeon();
            },
          });
        const i = {
          ButtonTextId: "ConfirmBox_133_ButtonText_1",
          DescriptionTextId: "MowingHighestPoint",
          DescriptionArgs: [e.x0s.toString()],
          IsTimeDownCloseView: !1,
          IsClickedCloseView: !1,
          OnClickedCallback: function () {
            const e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
            const t =
              ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems(!0);
            if (t.length !== 0) {
              const n = [];
              for (const i of t) n.push(i.GetConfigId);
              InstanceDungeonController_1.InstanceDungeonController.PrewarTeamFightRequest(
                e,
                n,
              );
            }
          },
        };
        const o = {
          TitleTextId: "MowingCurrentPoint",
          Record: e.w0s.toString(),
          IsNewRecord: e.w0s > e.x0s,
        };
        ItemRewardController_1.ItemRewardController.OpenExploreRewardView(
          t
            ? ItemRewardDefine_1.MOWING_ERROR_RESULT
            : ItemRewardDefine_1.MOWING_RESULT,
          !t && e.U0s,
          void 0,
          t ? void 0 : o,
          void 0,
          t ? [n] : [n, i],
          void 0,
          void 0,
          void 0,
        );
      });
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(28261, this.JOe),
      Net_1.Net.Register(27935, this.zOe),
      Net_1.Net.Register(8520, this.ZOe);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(28261),
      Net_1.Net.UnRegister(27935),
      Net_1.Net.UnRegister(8520);
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnQuestStateChange,
      this.DEe,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CrossDay,
        this.oOe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.LeaveInstanceDungeonConfirm,
        this.NUr,
      );
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnQuestStateChange,
      this.DEe,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CrossDay,
        this.oOe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.LeaveInstanceDungeonConfirm,
        this.NUr,
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
      (ActivityMowingController.CurrentActivityId = e.Ekn),
      new ActivityMowingData_1.ActivityMowingData()
    );
  }
  OnGetIsOpeningActivityRelativeView() {
    return !1;
  }
  RequestGetPointReward(t, n) {
    const e = Protocol_1.Aki.Protocol.D$n.create();
    (e.YFn = t),
      (e.Ekn = n),
      Net_1.Net.Call(27032, e, (e) => {
        e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
          ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.lkn,
              9845,
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
    const e = new Protocol_1.Aki.Protocol.q$n();
    Net_1.Net.Call(4739, e, (e) => {
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
    const t = ActivityMowingController.GetMowingActivityData();
    return !t || t.GetActivityLevelUnlockState(e);
  }
  static IsMowingInstanceDungeon(e) {
    return (
      !!e &&
      ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)
        ?.InstSubType === AdventureDefine_1.EDungeonSubType.Mowing
    );
  }
}
((exports.ActivityMowingController =
  ActivityMowingController).CurrentActivityId = 0),
  (ActivityMowingController.RequestSetDifficulty = (n, i) => {
    const e = Protocol_1.Aki.Protocol.w$n.create();
    (e.YFn = n),
      (e.a3n = i),
      Net_1.Net.Call(10617, e, (e) => {
        let t;
        e &&
          e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.lkn,
            2e4,
          );
        for ([, t] of ModelManager_1.ModelManager.ActivityModel.GetActivityById(
          n,
        ).MowingLevelInfoDict)
          t.a3n = i;
      });
  }),
  (ActivityMowingController.GetRecommendLevel = (e, t) => {
    const n = ActivityMowingController.GetMowingActivityData();
    return n ? n.GetLevelDiffRecommendLevel(e) : 0;
  }),
  (ActivityMowingController.CheckIsActivityLevel = (e) =>
    ActivityMowingController.IsMowingInstanceDungeon(e));
// # sourceMappingURL=ActivityMowingController.js.map
