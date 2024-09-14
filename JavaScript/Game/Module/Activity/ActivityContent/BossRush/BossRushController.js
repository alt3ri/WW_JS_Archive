"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BossRushController = void 0);
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Time_1 = require("../../../../../Core/Common/Time"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../../../Core/Net/Net"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  InstanceDungeonEntranceController_1 = require("../../../InstanceDungeon/InstanceDungeonEntranceController"),
  ItemRewardController_1 = require("../../../ItemReward/ItemRewardController"),
  ItemRewardDefine_1 = require("../../../ItemReward/ItemRewardDefine"),
  ActivityControllerBase_1 = require("../../ActivityControllerBase"),
  BossRushData_1 = require("./BossRushData"),
  BossRushSubView_1 = require("./BossRushSubView"),
  SENDCD = 1e3;
class BossRushController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments),
      (this.fSn = () => {
        var e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
        20 ===
          ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)
            ?.InstSubType && BossRushController.RequestSettlement();
      }),
      (this.pSn = (e) => {
        var t = ModelManager_1.ModelManager.ActivityModel.GetActivityById(
          e.w6n,
        );
        t.PhraseLevelInfo(e.MMs, e.vMs),
          t.PhraseRewardInfo(e.pMs),
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
            e.w6n,
          );
      }),
      (this.OnBossRushFailNotify = () => {
        var e = [],
          e =
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
      (this.vSn = (e) => {
        this.MSn();
        var t = this.ESn(ItemRewardDefine_1.BOSS_RUSH_SUCCESS, !0, () => {}, e),
          o = new ItemRewardDefine_1.ReachTargetData(),
          r = [],
          n = {
            Target: [e.LMs.toString()],
            DescriptionTextId: "BossRushMonsterScoreTips",
            IsReached: !1,
          },
          n =
            (r.push(n),
            {
              Target: [e.RMs.toString()],
              DescriptionTextId: "BossRushTimeScoreTips",
              IsReached: !1,
            }),
          n =
            (r.push(n),
            {
              Target: [e.DMs.toString()],
              DescriptionTextId: "BossRushTechScoreTips",
              IsReached: !1,
            }),
          n = (r.push(n), (o.TargetReached = r), e.LMs + e.RMs + e.DMs),
          r = n > e.AMs;
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
    Net_1.Net.Register(17625, this.vSn),
      Net_1.Net.Register(18967, this.pSn),
      Net_1.Net.Register(23559, this.OnBossRushFailNotify);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(17625),
      Net_1.Net.UnRegister(18967),
      Net_1.Net.UnRegister(23559);
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.LeaveInstanceDungeonConfirm,
      this.fSn,
    );
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.LeaveInstanceDungeonConfirm,
      this.fSn,
    );
  }
  MSn() {
    for (const e of ModelManager_1.ModelManager.BossRushModel
      .CurrentOpenBossRushActivityIds)
      ModelManager_1.ModelManager.ActivityModel.GetActivityById(
        e,
      ).CheckIfNewBossRushOpen();
  }
  ESn(e, t, o, r) {
    var n = [],
      e =
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
          DescriptionArgs: [r.AMs],
          IsTimeDownCloseView: !1,
          IsClickedCloseView: !1,
          OnClickedCallback: () => {
            var e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(
              r.w6n,
            ).GetBossRushLevelDetailInfoById(r.r6n);
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
    var t = [];
    for (const s of e.GetPrepareSelectBuff()) {
      var o = new Protocol_1.Aki.Protocol.Dks();
      (o.b6n = s.BuffId), (o.q6n = s.Slot), (o.G6n = s.State), t.push(o);
    }
    var r = [];
    for (const i of e.GetCurrentTeamMembers()) r.push(i);
    var n = e.ActivityId;
    this.RequestStartBossRush(
      n,
      e.GetCurrentSelectLevel().GetInstanceDungeonId(),
      t,
      r,
    );
  }
  static RequestStartBossRush(e, t, o, r) {
    if (
      0 !== BossRushController.Tua &&
      Time_1.Time.Now - BossRushController.Tua <= SENDCD
    )
      return void (
        Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Activity", 28, "发送协议太快")
      );
    this.Tua = Time_1.Time.Now;
    var n,
      s = new Protocol_1.Aki.Protocol.dfs(),
      i = ((s.w6n = e), (s.d5n = t), (s.C5n = r), []),
      t =
        ModelManager_1.ModelManager.BossRushModel.GetBossRushTeamInfoByActivityId(
          e,
        ).GetCurrentSelectBuff();
    for (const a of o)
      a.G6n !== Protocol_1.Aki.Protocol.Iks.Proto_Empty
        ? i.push(a)
        : (((n = new Protocol_1.Aki.Protocol.Dks()).b6n = a.b6n),
          (n.q6n = a.q6n),
          (n.G6n =
            0 === a.b6n
              ? Protocol_1.Aki.Protocol.Iks.Proto_Empty
              : Protocol_1.Aki.Protocol.Iks.Proto_Selected),
          i.push(n));
    for (const l of t)
      l.State === Protocol_1.Aki.Protocol.Iks.Proto_Inactive &&
        i.push({
          b6n: l.BuffId,
          q6n: l.Slot,
          G6n: Protocol_1.Aki.Protocol.Iks.Proto_Inactive,
        });
    (s.O6n = i),
      Net_1.Net.Call(22360, s, (e) => {
        e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.Q4n,
            29947,
          );
      });
  }
  static RequestSettlement() {
    Net_1.Net.Call(22197, new Protocol_1.Aki.Protocol.ffs(), (e) => {
      e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.Q4n,
          24888,
        );
    });
  }
  static RequestGetBossRushReward(t, e, o) {
    var r = new Protocol_1.Aki.Protocol.Cfs();
    (r.w6n = t),
      (r.N6n = e),
      (r.k6n = o),
      Net_1.Net.Call(17402, r, (e) => {
        e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
          (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.Q4n,
            17035,
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
    var t = ModelManager_1.ModelManager.ActivityModel.GetActivityById(e);
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
(exports.BossRushController = BossRushController).Tua = 0;
//# sourceMappingURL=BossRushController.js.map
