"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BossRushController = void 0);
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Time_1 = require("../../../../../Core/Common/Time"),
  MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
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
      (this.qCl = (e) => {
        e ===
          Protocol_1.Aki.Protocol.Q4n
            .Proto_BossRushActivityBuffSelectionEmpty &&
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.BossRushBuffTabChange,
            0,
          ),
          e === Protocol_1.Aki.Protocol.Q4n.Proto_BossRushBuffCountLimit &&
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.BossRushBuffTabChange,
              1,
            );
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
      (this.MB_ = (e) => {
        ModelManager_1.ModelManager.ActivityModel.GetActivityById(
          e.w6n,
        ).SetInsSelectedBuffIdMap(e.r6n, e.oB_);
      }),
      (this.EB_ = (e) => {
        var t = [];
        for (const r of e.E$s) {
          var o =
            ConfigManager_1.ConfigManager.BossRushConfig.GetBossRushTaskConfig(
              r.s5n,
            ).ActivityId;
          ModelManager_1.ModelManager.ActivityModel.GetActivityById(
            o,
          ).RefreshSingleTaskData(r),
            t.includes(o) || t.push(o);
        }
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.BossRushTaskStateChanged,
        ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.BossRefreshBossRushReward,
          );
        for (const n of t)
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.BossRefreshBossRushRewardRedDot,
            n,
          ),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.RefreshCommonActivityRedDot,
              n,
            );
      }),
      (this.IB_ = () => {
        var e = [],
          e =
            (e.push({
              ButtonTextId: "BossRushFailLeave",
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
          n =
            (r.push(n),
            MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
              "Text_Second_Text",
            )),
          n = {
            Target: [e.zM_.toString() + n],
            DescriptionTextId: "BossRushLeftTimeTips",
            IsReached: !1,
          },
          n = (r.push(n), (o.TargetReached = r), e.LMs + e.RMs + e.DMs),
          r = n > e.AMs;
        (o.IfNewRecord = r),
          (o.FullScore = n),
          t.SetScoreReached(o),
          ItemRewardController_1.ItemRewardController.Open(t),
          ControllerHolder_1.ControllerHolder.TowerController.ClearAllHatredInTower();
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
    Net_1.Net.Register(26113, this.vSn),
      Net_1.Net.Register(22505, this.pSn),
      Net_1.Net.Register(18279, this.IB_),
      Net_1.Net.Register(21799, this.EB_),
      Net_1.Net.Register(27132, this.MB_);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(26113),
      Net_1.Net.UnRegister(22505),
      Net_1.Net.UnRegister(18279),
      Net_1.Net.UnRegister(21799),
      Net_1.Net.UnRegister(27132);
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.LeaveInstanceDungeonConfirm,
      this.fSn,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.EnterInstanceDungeonFail,
        this.qCl,
      );
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.LeaveInstanceDungeonConfirm,
      this.fSn,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.EnterInstanceDungeonFail,
        this.qCl,
      );
  }
  MSn() {
    for (const e of ModelManager_1.ModelManager.BossRushModel
      .CurrentOpenBossRushActivityIds)
      ModelManager_1.ModelManager.ActivityModel.GetActivityById(
        e,
      ).CheckIfNewBossRushOpen();
  }
  static GetBossRushSelectedBuffId(e) {
    for (const o of ModelManager_1.ModelManager.ActivityModel.GetAllActivityMap().values())
      if (o instanceof BossRushData_1.BossRushData)
        if (o.GetBossRushLevelDetailInfoById(e)) {
          var t = o.GetInsSelectedBuffId(e);
          if (0 < t.length) return t[0];
        }
    return 0;
  }
  ESn(e, t, o, r) {
    var n = [],
      s =
        (n.push({
          ButtonTextId: "Text_ButtonTextConfirmResult_Text",
          DescriptionTextId: void 0,
          IsTimeDownCloseView: !0,
          IsClickedCloseView: !1,
          OnClickedCallback: () => {
            BossRushController.OpenDefaultBossRushView();
          },
        }),
        0 < r.AMs),
      s =
        (n.push({
          ButtonTextId: "Text_ButtonTextChallengeOneMore_Text",
          DescriptionTextId: s ? "BossRushCurrentHighScore" : void 0,
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
    return s;
  }
  static RequestStartBossRushByTeamData(e) {
    var t = [];
    for (const i of e.GetPrepareSelectBuff()) {
      var o = new Protocol_1.Aki.Protocol.Dks();
      (o.b6n = i.BuffId), (o.q6n = i.Slot), (o.G6n = i.State), t.push(o);
    }
    var r = [];
    for (const a of e.GetPrepareSelectScoreBuff())
      0 < a.BuffId && r.push(a.BuffId);
    var n = [];
    for (const _ of e.GetCurrentTeamMembers()) n.push(_);
    var s = e.ActivityId;
    this.RequestStartBossRush(
      s,
      e.GetCurrentSelectLevel().GetInstanceDungeonId(),
      t,
      r,
      n,
    );
  }
  static RequestBossRushTaskReward(e) {
    var t = new Protocol_1.Aki.Protocol.tB_();
    (t.gps = e),
      Net_1.Net.Call(25322, t, (e) => {
        e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.Q4n,
            15853,
          );
      });
  }
  static RequestStartBossRush(e, t, o, r, n) {
    if (
      0 !== BossRushController.Tua &&
      Time_1.Time.Now - BossRushController.Tua <= SENDCD
    )
      return void (
        Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Activity", 27, "发送协议太快")
      );
    this.Tua = Time_1.Time.Now;
    var s,
      i = [],
      a =
        ModelManager_1.ModelManager.BossRushModel.GetBossRushTeamInfoByActivityId(
          e,
        ).GetCurrentSelectBuff();
    for (const _ of o)
      _.G6n !== Protocol_1.Aki.Protocol.Iks.Proto_BuffEmpty
        ? i.push(_)
        : (((s = new Protocol_1.Aki.Protocol.Dks()).b6n = _.b6n),
          (s.q6n = _.q6n),
          (s.G6n =
            0 === _.b6n
              ? Protocol_1.Aki.Protocol.Iks.Proto_BuffEmpty
              : Protocol_1.Aki.Protocol.Iks.Proto_BuffSelected),
          i.push(s));
    for (const l of a)
      l.State === Protocol_1.Aki.Protocol.Iks.Proto_BuffInactive &&
        i.push({
          b6n: l.BuffId,
          q6n: l.Slot,
          G6n: Protocol_1.Aki.Protocol.Iks.Proto_BuffInactive,
        });
    o = {
      w6n: e,
      s5n:
        ConfigManager_1.ConfigManager.BossRushConfig.GetBossRushByActivityIdAndInstanceId(
          e,
          t,
        )?.Id ?? 0,
      O6n: i,
      Zal: r,
    };
    (ModelManager_1.ModelManager.InstanceDungeonModel.InstanceEnterContentText.Wah =
      o),
      ControllerHolder_1.ControllerHolder.InstanceDungeonController.PrewarTeamFightRequest(
        t,
        n,
        0,
        0,
      );
  }
  static RequestSettlement() {
    Net_1.Net.Call(21986, new Protocol_1.Aki.Protocol.ffs(), (e) => {
      e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.Q4n,
          21483,
        );
    });
  }
  static RequestGetBossRushReward(t, e, o) {
    var r = new Protocol_1.Aki.Protocol.Cfs();
    (r.w6n = t),
      (r.N6n = e),
      (r.k6n = o),
      Net_1.Net.Call(23728, r, (e) => {
        e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.Q4n,
            23899,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.BossRefreshBossRushRewardRedDot,
            t,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.BossRefreshBossRushReward,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RefreshCommonActivityRedDot,
            t,
          );
      });
  }
  static RequestGetBossRushLevelReward(t, e, o, r) {
    var n = new Protocol_1.Aki.Protocol.ZC_();
    (n.ell = e),
      (n.c5n = r),
      Net_1.Net.Call(29286, n, (e) => {
        e.fMs !== Protocol_1.Aki.Protocol.Q4n.KRs &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.fMs,
            23899,
          ),
          ModelManager_1.ModelManager.ActivityModel.GetActivityById(
            t,
          ).SetRewardStateClaimed(o, r),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.BossRefreshBossRushRewardRedDot,
            t,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.BossRefreshBossRushReward,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RefreshCommonActivityRedDot,
            t,
          );
      });
  }
  static async OpenDefaultBossRushView() {
    for (const e of ModelManager_1.ModelManager.ActivityModel.GetAllActivityMap().values())
      if (e instanceof BossRushData_1.BossRushData)
        return this.OpenBossRushView(e.Id);
    return (
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Activity", 27, "找不到BossRush活动"),
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
  static async RefreshBossRushBuffInGame() {
    var e = Protocol_1.Aki.Protocol.pC_.create(),
      e = await Net_1.Net.CallAsync(23320, e);
    return e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
      ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.Q4n,
          16972,
        ),
        !1)
      : ((ModelManager_1.ModelManager.BossRushModel.ChoseBuffInGameHandleList =
          e?.$As ?? []),
        !0);
  }
  static async RequestBossRushChooseBuffInGame(e) {
    var t = Protocol_1.Aki.Protocol.yC_.create(),
      e = ((t.c5n = e), await Net_1.Net.CallAsync(28717, t));
    return (
      e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs ||
      (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
        e.Q4n,
        23685,
      ),
      !1)
    );
  }
}
(exports.BossRushController = BossRushController).Tua = 0;
//# sourceMappingURL=BossRushController.js.map
