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
          e.T6n,
        );
        t.PhraseLevelInfo(e.dMs, e.uMs),
          t.PhraseRewardInfo(e.cMs),
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
            e.T6n,
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
            Target: [e.pMs.toString()],
            DescriptionTextId: "BossRushMonsterScoreTips",
            IsReached: !1,
          },
          n =
            (r.push(n),
            {
              Target: [e.MMs.toString()],
              DescriptionTextId: "BossRushTimeScoreTips",
              IsReached: !1,
            }),
          n =
            (r.push(n),
            {
              Target: [e.SMs.toString()],
              DescriptionTextId: "BossRushTechScoreTips",
              IsReached: !1,
            }),
          n = (r.push(n), (o.TargetReached = r), e.pMs + e.MMs + e.SMs),
          r = n > e.EMs;
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
    Net_1.Net.Register(17662, this.vSn),
      Net_1.Net.Register(23821, this.pSn),
      Net_1.Net.Register(23104, this.OnBossRushFailNotify);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(17662),
      Net_1.Net.UnRegister(23821),
      Net_1.Net.UnRegister(23104);
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
          DescriptionArgs: [r.EMs],
          IsTimeDownCloseView: !1,
          IsClickedCloseView: !1,
          OnClickedCallback: () => {
            var e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(
              r.T6n,
            ).GetBossRushLevelDetailInfoById(r.X5n);
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
      var o = new Protocol_1.Aki.Protocol.Sks();
      (o.L6n = s.BuffId), (o.D6n = s.Slot), (o.A6n = s.State), t.push(o);
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
      0 !== BossRushController.Ila &&
      Time_1.Time.Now - BossRushController.Ila <= SENDCD
    )
      return void (
        Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Activity", 28, "发送协议太快")
      );
    this.Ila = Time_1.Time.Now;
    var n,
      s = new Protocol_1.Aki.Protocol.sfs(),
      i = ((s.T6n = e), (s.n5n = t), (s.s5n = r), []),
      t =
        ModelManager_1.ModelManager.BossRushModel.GetBossRushTeamInfoByActivityId(
          e,
        ).GetCurrentSelectBuff();
    for (const a of o)
      a.A6n !== Protocol_1.Aki.Protocol.fks.Proto_Empty
        ? i.push(a)
        : (((n = new Protocol_1.Aki.Protocol.Sks()).L6n = a.L6n),
          (n.D6n = a.D6n),
          (n.A6n =
            0 === a.L6n
              ? Protocol_1.Aki.Protocol.fks.Proto_Empty
              : Protocol_1.Aki.Protocol.fks.Proto_Selected),
          i.push(n));
    for (const l of t)
      l.State === Protocol_1.Aki.Protocol.fks.Proto_Inactive &&
        i.push({
          L6n: l.BuffId,
          D6n: l.Slot,
          A6n: Protocol_1.Aki.Protocol.fks.Proto_Inactive,
        });
    (s.U6n = i),
      Net_1.Net.Call(6991, s, (e) => {
        e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.O4n,
            16610,
          );
      });
  }
  static RequestSettlement() {
    Net_1.Net.Call(20621, new Protocol_1.Aki.Protocol._fs(), (e) => {
      e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs &&
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.O4n,
          28692,
        );
    });
  }
  static RequestGetBossRushReward(t, e, o) {
    var r = new Protocol_1.Aki.Protocol.hfs();
    (r.T6n = t),
      (r.R6n = e),
      (r.x6n = o),
      Net_1.Net.Call(27699, r, (e) => {
        e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs &&
          (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.O4n,
            7753,
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
(exports.BossRushController = BossRushController).Ila = 0;
//# sourceMappingURL=BossRushController.js.map
