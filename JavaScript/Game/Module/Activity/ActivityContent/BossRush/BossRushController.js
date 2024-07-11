"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BossRushController = void 0);
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../../Core/Net/Net");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const AdventureDefine_1 = require("../../../AdventureGuide/AdventureDefine");
const InstanceDungeonEntranceController_1 = require("../../../InstanceDungeon/InstanceDungeonEntranceController");
const ItemRewardController_1 = require("../../../ItemReward/ItemRewardController");
const ItemRewardDefine_1 = require("../../../ItemReward/ItemRewardDefine");
const ActivityControllerBase_1 = require("../../ActivityControllerBase");
const BossRushData_1 = require("./BossRushData");
const BossRushSubView_1 = require("./BossRushSubView");
class BossRushController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments),
      (this.NUr = () => {
        const e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
        ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)
          ?.InstSubType === AdventureDefine_1.EDungeonSubType.BossRush &&
          BossRushController.RequestSettlement();
      }),
      (this.OUr = (e) => {
        const t = ModelManager_1.ModelManager.ActivityModel.GetActivityById(
          e.YFn,
        );
        t.PhraseLevelInfo(e.Y0s, e.Q0s),
          t.PhraseRewardInfo(e.X0s),
          t.CheckIfNewBossRushOpen(),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.BossRushDataUpdate,
          ),
          UiManager_1.UiManager.IsViewOpen("ActivityRewardPopUpView") &&
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.RefreshCommonActivityRewardPopUpView,
              t.GetRewardViewData(),
            ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.BossRefreshBossRushRewardRedDot,
            e.YFn,
          );
      }),
      (this.OnBossRushFailNotify = () => {
        var e = [];
        var e =
          (e.push({
            ButtonTextId: "ConfirmBox_133_ButtonText_0",
            DescriptionTextId: void 0,
            IsTimeDownCloseView: !1,
            IsClickedCloseView: !0,
            OnClickedCallback: function () {
              InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeon();
            },
          }),
          ModelManager_1.ModelManager.ItemRewardModel.ClearCurrentRewardData(),
          ModelManager_1.ModelManager.ItemRewardModel.RefreshExploreRewardDataFromConfig(
            ItemRewardDefine_1.BOSS_RUSH_FAIL,
            !1,
            void 0,
            void 0,
            void 0,
            e,
            void 0,
            void 0,
            () => {},
            void 0,
          ));
        ItemRewardController_1.ItemRewardController.Open(e);
      }),
      (this.kUr = (e) => {
        this.FUr();
        const t = this.VUr(
          ItemRewardDefine_1.BOSS_RUSH_SUCCESS,
          !0,
          () => {},
          e,
        );
        const o = new ItemRewardDefine_1.ReachTargetData();
        var r = [];
        var n = {
          Target: [e.igs.toString()],
          DescriptionTextId: "BossRushMonsterScoreTips",
          IsReached: !1,
        };
        var n =
          (r.push(n),
          {
            Target: [e.rgs.toString()],
            DescriptionTextId: "BossRushTimeScoreTips",
            IsReached: !1,
          });
        var n =
          (r.push(n),
          {
            Target: [e.ogs.toString()],
            DescriptionTextId: "BossRushTechScoreTips",
            IsReached: !1,
          });
        var n = (r.push(n), (o.TargetReached = r), e.igs + e.rgs + e.ogs);
        var r = n > e.ngs;
        (o.IfNewRecord = r),
          (o.FullScore = n),
          t.SetScoreReached(o),
          ItemRewardController_1.ItemRewardController.Open(t);
      });
  }
  OnOpenView(e) {}
  OnGetActivityResource(e) {
    return "UiItem_ActivityBossrush";
  }
  OnCreateSubPageComponent(e) {
    return new BossRushSubView_1.BossRushSubView();
  }
  OnCreateActivityData(e) {
    return new BossRushData_1.BossRushData();
  }
  OnGetIsOpeningActivityRelativeView() {
    return !1;
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(2971, this.kUr),
      Net_1.Net.Register(27764, this.OUr),
      Net_1.Net.Register(4257, this.OnBossRushFailNotify);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(2971),
      Net_1.Net.UnRegister(27764),
      Net_1.Net.UnRegister(4257);
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.LeaveInstanceDungeonConfirm,
      this.NUr,
    );
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.LeaveInstanceDungeonConfirm,
      this.NUr,
    );
  }
  FUr() {
    for (const e of ModelManager_1.ModelManager.BossRushModel
      .CurrentOpenBossRushActivityIds)
      ModelManager_1.ModelManager.ActivityModel.GetActivityById(
        e,
      ).CheckIfNewBossRushOpen();
  }
  VUr(e, t, o, r) {
    const n = [];
    var e =
      (n.push({
        ButtonTextId: "Text_ButtonTextConfirmResult_Text",
        DescriptionTextId: void 0,
        IsTimeDownCloseView: !0,
        IsClickedCloseView: !1,
        OnClickedCallback: () => {
          InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeon().finally(
            void 0,
          );
        },
      }),
      n.push({
        ButtonTextId: "Text_ButtonTextChallengeOneMore_Text",
        DescriptionTextId: "BossRushCurrentHighScore",
        DescriptionArgs: [r.ngs],
        IsTimeDownCloseView: !1,
        IsClickedCloseView: !1,
        OnClickedCallback: () => {
          const e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(
            r.YFn,
          ).GetBossRushLevelDetailInfoById(r.vFn);
          BossRushController.RequestStartBossRushByTeamData(
            e.ConvertToTeamInfo(),
          );
        },
      }),
      ModelManager_1.ModelManager.ItemRewardModel.ClearCurrentRewardData(),
      ModelManager_1.ModelManager.ItemRewardModel.RefreshExploreRewardDataFromConfig(
        e,
        t,
        void 0,
        void 0,
        void 0,
        n,
        void 0,
        void 0,
        o,
        void 0,
      ));
    return e;
  }
  static RequestStartBossRushByTeamData(e) {
    const t = [];
    for (const s of e.GetPrepareSelectBuff()) {
      const o = new Protocol_1.Aki.Protocol.xBs();
      (o.JFn = s.BuffId), (o.zFn = s.Slot), (o.ZFn = s.State), t.push(o);
    }
    const r = [];
    for (const i of e.GetCurrentTeamMembers()) r.push(i);
    const n = e.ActivityId;
    this.RequestStartBossRush(
      n,
      e.GetCurrentSelectLevel().GetInstanceDungeonId(),
      t,
      r,
    );
  }
  static RequestStartBossRush(e, t, o, r) {
    let n;
    const s = new Protocol_1.Aki.Protocol.Yds();
    const i = ((s.YFn = e), (s.Rkn = t), (s.xkn = r), []);
    var t =
      ModelManager_1.ModelManager.BossRushModel.GetBossRushTeamInfoByActivityId(
        e,
      ).GetCurrentSelectBuff();
    for (const a of o)
      a.ZFn !== Protocol_1.Aki.Protocol.ABs.Proto_Empty
        ? i.push(a)
        : (((n = new Protocol_1.Aki.Protocol.xBs()).JFn = a.JFn),
          (n.zFn = a.zFn),
          (n.ZFn =
            a.JFn === 0
              ? Protocol_1.Aki.Protocol.ABs.Proto_Empty
              : Protocol_1.Aki.Protocol.ABs.Proto_Selected),
          i.push(n));
    for (const l of t)
      l.State === Protocol_1.Aki.Protocol.ABs.Proto_Inactive &&
        i.push({
          JFn: l.BuffId,
          zFn: l.Slot,
          ZFn: Protocol_1.Aki.Protocol.ABs.Proto_Inactive,
        });
    (s.e3n = i),
      Net_1.Net.Call(18693, s, (e) => {
        e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.lkn,
            26654,
          );
      });
  }
  static RequestSettlement() {
    Net_1.Net.Call(24098, new Protocol_1.Aki.Protocol.ems(), (e) => {
      e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys &&
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.lkn,
          11679,
        );
    });
  }
  static RequestGetBossRushReward(t, e, o) {
    const r = new Protocol_1.Aki.Protocol.zds();
    (r.YFn = t),
      (r.t3n = e),
      (r.i3n = o),
      Net_1.Net.Call(28433, r, (e) => {
        e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys &&
          (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.lkn,
            29202,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.BossRefreshBossRushRewardRedDot,
            t,
          ));
      });
  }
  static async OpenDefaultBossRushView() {
    for (const e of ModelManager_1.ModelManager.ActivityModel.GetAllActivityMap().values())
      if (e instanceof BossRushData_1.BossRushData)
        return this.OpenBossRushView(e.Id);
    return (
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Activity", 28, "找不到BossRush活动"),
      !1
    );
  }
  static async OpenBossRushView(e) {
    const t = ModelManager_1.ModelManager.ActivityModel.GetActivityById(e);
    t.CacheCurrentOpenBossNum(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        t.Id,
      );
    const o = new CustomPromise_1.CustomPromise();
    return (
      UiManager_1.UiManager.OpenView("BossRushMainView", e, (e) => {
        o.SetResult(e);
      }),
      o.Promise
    );
  }
}
exports.BossRushController = BossRushController;
// # sourceMappingURL=BossRushController.js.map
