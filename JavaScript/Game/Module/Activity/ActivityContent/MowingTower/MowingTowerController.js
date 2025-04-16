"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MowingTowerController = void 0);
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
  ItemRewardController_1 = require("../../../ItemReward/ItemRewardController"),
  ItemRewardDefine_1 = require("../../../ItemReward/ItemRewardDefine"),
  ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController"),
  ActivityControllerBase_1 = require("../../ActivityControllerBase"),
  MowingTowerData_1 = require("./MowingTowerData"),
  MowingTowerSubView_1 = require("./MowingTowerSubView"),
  SENDCD = 1e3,
  BUFF_IS_NOT_VAILD = "ErrorCode_2500057_Text";
class MowingTowerController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments),
      (this.fSn = () => {
        var e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
        24 ===
          ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)
            ?.InstSubType && MowingTowerController.RequestSettlement();
      }),
      (this.yLl = (e) => {
        var o =
            ConfigManager_1.ConfigManager.MowingTowerConfig.GetBossMowingTowerConfigById(
              e.jM_[0].ELl,
            ).ActivityId,
          r = ModelManager_1.ModelManager.ActivityModel.GetActivityById(o);
        r.PhraseLevelInfo(e.jM_),
          r.PhraseRewardInfo(e.jM_),
          r.CheckIfNewMowingTowerOpen(),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RefreshMowingTowerData,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RefreshMowingTowerRewardRedDot,
            o,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RefreshCommonActivityRedDot,
            o,
          );
      }),
      (this.OnMowTowerFirstScoreNotify = () => {}),
      (this.vSn = (e) => {
        var o = this.ESn(ItemRewardDefine_1.BOSS_RUSH_SUCCESS, !0, () => {}, e),
          r =
            ConfigManager_1.ConfigManager.MowingTowerConfig.GetBossMowingTowerConfigById(
              e.ELl,
            )?.IsInfinite,
          t = [],
          n = {
            Target: e.GM_.toString(),
            DescriptionTextId: "BossRushMonsterScoreTips",
            Belong: 0,
          },
          n =
            (t.push(n),
            r ||
              ((n = {
                Target: e.FM_.toString(),
                DescriptionTextId: "BossRushTimeScoreTips",
                Belong: 0,
              }),
              t.push(n)),
            {
              Target: e.NM_.toString(),
              DescriptionTextId: "BossRushMonsterScoreTips",
              Belong: 1,
            }),
          r =
            (t.push(n),
            r ||
              ((n = {
                Target: e.VM_.toString(),
                DescriptionTextId: "BossRushTimeScoreTips",
                Belong: 1,
              }),
              t.push(n)),
            e.GM_ + e.FM_ + e.NM_ + e.VM_),
          n = r > e.AMs;
        o.SetHalfAreaData({ ItemList: t, IfNewRecord: n, FullScore: r }),
          ItemRewardController_1.ItemRewardController.Open(o);
      });
  }
  OnOpenView(e) {}
  OnGetActivityResource(e) {
    return "UiItem_ActivityMowingTower";
  }
  OnCreateSubPageComponent(e) {
    return new MowingTowerSubView_1.MowingTowerSubView();
  }
  OnCreateActivityData(e) {
    return new MowingTowerData_1.MowingTowerData();
  }
  OnGetIsOpeningActivityRelativeView() {
    return !1;
  }
  OnInit() {
    return (
      UiManager_1.UiManager.AddOpenViewCheckFunction(
        "MowingTowerMainView",
        MowingTowerController.CheckCanOpen,
        "MowingTowerController.CheckCanOpen",
      ),
      !0
    );
  }
  OnClear() {
    return (
      UiManager_1.UiManager.RemoveOpenViewCheckFunction(
        "MowingTowerMainView",
        MowingTowerController.CheckCanOpen,
      ),
      !0
    );
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(20917, this.vSn),
      Net_1.Net.Register(20249, this.yLl),
      Net_1.Net.Register(28391, this.OnMowTowerFirstScoreNotify);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(20917),
      Net_1.Net.UnRegister(20249),
      Net_1.Net.UnRegister(28391);
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
  ESn(e, o, r, t) {
    var n = [],
      i =
        (n.push({
          ButtonTextId: "Text_ButtonTextConfirmResult_Text",
          DescriptionTextId: void 0,
          IsTimeDownCloseView: !0,
          IsClickedCloseView: !1,
          OnClickedCallback: () => {
            MowingTowerController.OpenDefaultMowingTowerView().then((e) => {
              e ||
                ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.LeaveInstanceDungeon();
            });
          },
        }),
        0 < t.AMs),
      i =
        (n.push({
          ButtonTextId: "Text_ButtonTextChallengeOneMore_Text",
          DescriptionTextId: i ? "BossRushCurrentHighScore" : void 0,
          DescriptionArgs: [t.AMs],
          IsTimeDownCloseView: !1,
          IsClickedCloseView: !1,
          OnClickedCallback: () => {
            var e =
                ConfigManager_1.ConfigManager.MowingTowerConfig.GetBossMowingTowerConfigById(
                  t.ELl,
                ).ActivityId,
              e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(
                e,
              ).GetMowingTowerLevelDetailInfoById(t.ELl);
            MowingTowerController.RequestStartMowingTowerByTeamData(
              e.ConvertToTeamInfo(),
            );
          },
        }),
        ModelManager_1.ModelManager.ItemRewardModel.ClearCurrentRewardData(),
        ModelManager_1.ModelManager.ItemRewardModel.RefreshExploreRewardDataFromConfig(
          e,
          o,
          void 0,
          void 0,
          void 0,
          n,
          void 0,
          void 0,
          r,
          void 0,
        ));
    return i;
  }
  static RequestStartMowingTowerByTeamData(e) {
    var o = [];
    for (const a of e.GetPrepareSelectBuff()) {
      var r = new Protocol_1.Aki.Protocol.Dks();
      (r.b6n = a.BuffId), (r.q6n = a.Slot), o.push(r);
    }
    var t = e.GetCurrentTeamMembers(),
      n = t[0],
      t = t[1],
      i = e.ActivityId;
    this.RequestStartMowingTower(
      i,
      e.GetCurrentSelectLevel().GetInstanceDungeonId(),
      e.GetCurrentSelectLevel().GetId(),
      o,
      n,
      t,
    );
  }
  static RequestStartMowingTower(e, o, r, t, n, i) {
    if (
      0 !== MowingTowerController.ILl &&
      Time_1.Time.Now - MowingTowerController.ILl <= SENDCD
    )
      return void (
        Log_1.Log.CheckDebug() && Log_1.Log.Debug("Activity", 5, "发送协议太快")
      );
    this.ILl = Time_1.Time.Now;
    var a = [];
    for (const s of t) {
      if (0 === s.b6n)
        return void ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
          BUFF_IS_NOT_VAILD,
        );
      a.push(s.b6n);
    }
    var l = [];
    for (const _ of i) 0 !== _ && l.push(_);
    t = { TLl: a, ELl: r, LLl: l };
    (ModelManager_1.ModelManager.InstanceDungeonModel.InstanceEnterContentText.RLl =
      t),
      ControllerHolder_1.ControllerHolder.InstanceDungeonController.PrewarTeamFightRequest(
        o,
        n,
        0,
        0,
      );
  }
  static RequestSettlement() {
    Net_1.Net.Call(21792, new Protocol_1.Aki.Protocol.Wg_(), (e) => {
      e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.Q4n,
          25430,
        );
    });
  }
  static RequestGetMowingTowerLevelReward(o, e, r, t) {
    var n = new Protocol_1.Aki.Protocol.Yg_();
    (n.N6n = e),
      Net_1.Net.Call(22914, n, (e) => {
        e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.Q4n,
            19534,
          ),
          ModelManager_1.ModelManager.ActivityModel.GetActivityById(
            o,
          ).SetRewardStateClaimed(r, t),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RefreshMowingTowerReward,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RefreshMowingTowerRewardRedDot,
            o,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RefreshCommonActivityRedDot,
            o,
          );
      });
  }
  static async OpenDefaultMowingTowerView() {
    for (const e of ModelManager_1.ModelManager.ActivityModel.GetAllActivityMap().values())
      if (
        e instanceof MowingTowerData_1.MowingTowerData &&
        e.CheckIfInOpenTime()
      )
        return this.OpenMowingTowerView(e.Id);
    return (
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Activity", 5, "找不到MowingTower活动"),
      !1
    );
  }
  static async OpenMowingTowerView(e) {
    var o = ModelManager_1.ModelManager.ActivityModel.GetActivityById(e);
    o.CacheCurrentOpenBossNum(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        o.Id,
      );
    const r = new CustomPromise_1.CustomPromise();
    return (
      UiManager_1.UiManager.OpenView("MowingTowerMainView", e, (e) => {
        r.SetResult(e);
      }),
      r.Promise
    );
  }
}
((exports.MowingTowerController = MowingTowerController).ILl = 0),
  (MowingTowerController.CheckCanOpen = () =>
    !ModelManager_1.ModelManager.GameModeModel?.IsMulti ||
    (ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
      "MowingTowerMultiTips",
    ),
    !1));
//# sourceMappingURL=MowingTowerController.js.map
