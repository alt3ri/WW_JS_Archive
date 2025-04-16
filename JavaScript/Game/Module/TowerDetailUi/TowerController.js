"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TowerController = void 0);
const CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  Net_1 = require("../../../Core/Net/Net"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiManager_1 = require("../../Ui/UiManager"),
  BlackScreenController_1 = require("../BlackScreen/BlackScreenController"),
  ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine"),
  InstanceDungeonEntranceController_1 = require("../InstanceDungeon/InstanceDungeonEntranceController"),
  ItemRewardController_1 = require("../ItemReward/ItemRewardController"),
  ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController"),
  TowerData_1 = require("./TowerData"),
  TowerModel_1 = require("./TowerModel"),
  TOWER_SUCCESS_NO_REWARD = 3008,
  TOWER_FAIL = 3009;
class TowerController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return this.OnAddEvents(), this.OnRegisterNetEvent(), !0;
  }
  static OnClear() {
    return this.OnRemoveEvents(), this.OnUnRegisterNetEvent(), !0;
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.WorldDoneAndCloseLoading,
      this.$5e,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnFunctionOpenUpdate,
        this.RQe,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.WorldDoneAndCloseLoading,
      this.$5e,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnFunctionOpenUpdate,
        this.RQe,
      );
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(24326, this.wLo),
      Net_1.Net.Register(23009, this.BLo),
      Net_1.Net.Register(18639, this.bLo),
      Net_1.Net.Register(27074, this.qLo);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(24326),
      Net_1.Net.UnRegister(23009),
      Net_1.Net.UnRegister(18639),
      Net_1.Net.UnRegister(27074);
  }
  static async RefreshTower() {
    var e = Protocol_1.Aki.Protocol.JCs.create({}),
      e = await Net_1.Net.CallAsync(27701, e);
    e?.wGs &&
      ((ModelManager_1.ModelManager.TowerModel.MaxUnlockDifficulty = e.wGs),
      e.wGs === TowerData_1.OVERLOCK_RISK_DIFFICULTY
        ? UiManager_1.UiManager.OpenView("TowerOverLockUnlockView", e.wGs)
        : UiManager_1.UiManager.OpenView("TowerUnlockView", e.wGs)),
      e.UGs?.EGs &&
        0 < e.UGs.EGs &&
        (ModelManager_1.ModelManager.TowerModel.SaveHandleData(),
        (ModelManager_1.ModelManager.TowerModel.NeedOpenReviveView = !0),
        ModelManager_1.ModelManager.TowerModel.DeleteVariationTowerInfo(),
        ModelManager_1.ModelManager.TowerModel.RefreshTowerInfo(e.UGs),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnTowerRefreshStars,
        ));
  }
  static async TowerStartRequest(e, o, r = !0) {
    var t = new Protocol_1.Aki.Protocol.r0s(),
      n = [];
    for (const i of o) {
      if (r && !ModelManager_1.ModelManager.TowerModel.IsRoleCostEnough(i))
        return void ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
          "EditBattleTeamCant",
        );
      var a = { Q6n: i, sjn: 0 };
      n.push(a);
    }
    BlackScreenController_1.BlackScreenController.AddBlackScreen(
      "None",
      "TowerStartRequest",
    ),
      (t.ajn = n),
      (t.hjn = e);
    t = await Net_1.Net.CallAsync(19202, t).finally(() => {
      BlackScreenController_1.BlackScreenController.RemoveBlackScreen(
        "None",
        "TowerStartRequest",
      );
    });
    if (t.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs)
      return t.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_ErrTowerSeasonUpdate
        ? void this.OpenSeasonUpdateConfirm()
        : void ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            t.Q4n,
            28525,
          );
    (ModelManager_1.ModelManager.TowerModel.CurrentTowerId = e),
      (ModelManager_1.ModelManager.TowerModel.CurrentTowerFormation = o),
      (ModelManager_1.ModelManager.TowerModel.CurrentSelectFloor = -1),
      InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.RestoreDungeonEntranceEntity();
  }
  static TowerResetRequest(e) {
    var o = new Protocol_1.Aki.Protocol.n0s();
    (o.hjn = e),
      Net_1.Net.Call(25470, o, (e) => {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs)
          return e.Q4n ===
            Protocol_1.Aki.Protocol.Q4n.Proto_ErrTowerSeasonUpdate
            ? void this.OpenSeasonUpdateConfirm()
            : void ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Q4n,
                16185,
              );
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnTowerRefresh),
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
            "ResetConfirm",
          );
      });
  }
  static TowerRewardRequest(o, e, r) {
    var t = new Protocol_1.Aki.Protocol.t0s();
    (t.ljn = o),
      (t.I9n = e),
      (t.$ac = r),
      Net_1.Net.Call(21477, t, (e) => {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs)
          return e.Q4n ===
            Protocol_1.Aki.Protocol.Q4n.Proto_ErrTowerSeasonUpdate
            ? void this.OpenSeasonUpdateConfirm()
            : void ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Q4n,
                20722,
              );
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnTowerRewardReceived,
        ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RedDotTowerReward,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RedDotTowerRewardByDifficulties,
            o,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RedDotTowerRewardByDifficulties,
            5,
          );
      });
  }
  static async TowerFormationRecommendRequest(e) {
    var o = new Protocol_1.Aki.Protocol.ZCs(),
      e = ((o.hjn = e), await Net_1.Net.CallAsync(19333, o));
    if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs)
      return e.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_ErrTowerSeasonUpdate
        ? void this.OpenSeasonUpdateConfirm()
        : void ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.Q4n,
            25672,
          );
    0 < e.kVn?.length
      ? (ModelManager_1.ModelManager.TowerModel.RecommendFormation = e.kVn)
      : (ModelManager_1.ModelManager.TowerModel.RecommendFormation = void 0);
  }
  static TowerApplyFloorDataRequest(e) {
    var o = new Protocol_1.Aki.Protocol.a0s();
    (o._jn = e),
      Net_1.Net.Call(25844, o, (e) => {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs)
          return e.Q4n ===
            Protocol_1.Aki.Protocol.Q4n.Proto_ErrTowerSeasonUpdate
            ? void this.OpenSeasonUpdateConfirm()
            : void ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Q4n,
                21905,
              );
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnTowerRefresh);
      });
  }
  static GLo() {
    var e = Protocol_1.Aki.Protocol.XCs.create({});
    Net_1.Net.Call(18576, e, (e) => {
      ModelManager_1.ModelManager.TowerModel.RefreshTowerInfo(e.UGs);
    });
  }
  static OpenTowerSettlementView(e) {
    const o = ModelManager_1.ModelManager.TowerModel;
    var r = o.CurrentTowerId,
      t = o.GetHaveChallengeFloorAndFormation(r);
    const n = [],
      a = ConfigManager_1.ConfigManager.TowerClimbConfig.GetNextFloorInArea(r);
    n.push({
      ButtonTextId: "Text_BackToTower_Text",
      DescriptionTextId: void 0,
      IsTimeDownCloseView: !1,
      IsClickedCloseView: !0,
      OnClickedCallback: () => {
        this.BackToTowerView();
      },
    });
    let i = void 0;
    if (
      (e && t
        ? (n.pop(),
          n.push({
            ButtonTextId: "Text_ButtonTextConfirmResult_Text",
            DescriptionTextId: void 0,
            IsTimeDownCloseView: !1,
            IsClickedCloseView: !0,
            OnClickedCallback: () => {
              this.NLo(!1, e);
            },
          }))
        : e && a && !t
          ? ((t =
              ConfigManager_1.ConfigManager.TowerClimbConfig.GetTowerInfo(a)),
            (c =
              ConfigManager_1.ConfigManager.TowerClimbConfig.GetTowerAreaName(
                a,
              )),
            n.push({
              ButtonTextId: "Text_ButtonTextContinue_Text",
              DescriptionTextId: "Text_ButtonTextGoOnTower_Text",
              DescriptionArgs: [c, t.Floor],
              IsTimeDownCloseView: !1,
              IsClickedCloseView: !0,
              OnClickedCallback: () => {
                this.OLo(a);
              },
            }))
          : (e && a) ||
            ((o.NeedChangeFormation = !1),
            n.push({
              ButtonTextId: "Text_ButtonTextChallengeOneMore_Text",
              DescriptionTextId: void 0,
              IsTimeDownCloseView: !1,
              IsClickedCloseView: !0,
              OnClickedCallback: () => {
                ModelManager_1.ModelManager.TowerModel.NeedChangeFormation
                  ? this.OLo()
                  : this.ReChallengeTower();
              },
            }),
            (i = {
              DescriptionTextId: "Text_ChangeFormation_Text",
              OnToggleClick: (e) => {
                o.NeedChangeFormation = 1 === e;
              },
            })),
      e)
    ) {
      const C = [];
      var l = ConfigManager_1.ConfigManager.TowerClimbConfig.GetFloorTarget(r),
        _ =
          ModelManager_1.ModelManager.TowerModel.CurrentNotConfirmedFloor
            .StarIndex;
      for (let e = 0; e < TowerModel_1.FLOOR_STAR; e++) {
        var s = ConfigManager_1.ConfigManager.TowerClimbConfig.GetTargetConfig(
            l[e],
          ),
          d = [];
        for (const T of s.Params) d.push(T.toString());
        var M = _.includes(e),
          s = { Target: d, DescriptionTextId: s.DesText, IsReached: M };
        C.push(s);
      }
      TimerSystem_1.TimerSystem.Delay(() => {
        ItemRewardController_1.ItemRewardController.OpenExploreRewardView(
          TOWER_SUCCESS_NO_REWARD,
          e,
          void 0,
          void 0,
          void 0,
          n,
          C,
          i,
        );
      }, ModelManager_1.ModelManager.TowerModel.TowerSettlementDelayTime);
    } else {
      const v = [];
      var c =
        ModelManager_1.ModelManager.TrainingDegreeModel.GetTrainingDataList();
      if (c) {
        for (const w of c) {
          var g = { TrainingData: w };
          v.push(g);
        }
        TimerSystem_1.TimerSystem.Delay(() => {
          ItemRewardController_1.ItemRewardController.OpenExploreRewardView(
            TOWER_FAIL,
            e,
            void 0,
            void 0,
            v,
            n,
            void 0,
            i,
          );
        }, ModelManager_1.ModelManager.TowerModel.TowerSettlementDelayTime);
      }
    }
  }
  static kLo() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ResetToBattleView),
      ModelManager_1.ModelManager.TowerModel.CheckInTower() &&
        this.LeaveTower();
  }
  static LeaveTower() {
    (ModelManager_1.ModelManager.TowerModel.CurrentTowerId = -1),
      InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeonRequest();
  }
  static OLo(e) {
    ModelManager_1.ModelManager.TowerModel.OpenTowerFormationView(
      e ?? ModelManager_1.ModelManager.TowerModel.CurrentTowerId,
    );
  }
  static ReChallengeTower() {
    (ModelManager_1.ModelManager.TowerModel.IsWaitTowerStart = !0),
      this.TowerStartRequest(
        ModelManager_1.ModelManager.TowerModel.CurrentTowerId,
        ModelManager_1.ModelManager.TowerModel.CurrentTowerFormation,
        !1,
      );
  }
  static NLo(e, o) {
    o && ModelManager_1.ModelManager.TowerModel.SaveNeedOpenConfirmView(),
      e ||
        ((o = ConfigManager_1.ConfigManager.TowerClimbConfig.GetTowerInfo(
          ModelManager_1.ModelManager.TowerModel.NeedOpenConfirmViewTowerId,
        )),
        UiManager_1.UiManager.OpenView("TowerFloorView", o.AreaNum));
  }
  static BackToTowerView(e) {
    this.OpenTowerView(!0).finally(e);
  }
  static async OpenTowerView(e = !1) {
    return await this.RefreshTower(), this.FLo(e);
  }
  static async FLo(e = !1) {
    let o = 1;
    o = e
      ? ConfigManager_1.ConfigManager.TowerClimbConfig.GetTowerInfo(
          ModelManager_1.ModelManager.TowerModel.CurrentTowerId,
        ).Difficulty
      : ModelManager_1.ModelManager.TowerModel.GetMaxDifficulty();
    const r = new CustomPromise_1.CustomPromise();
    return (
      o === TowerData_1.VARIATION_RISK_DIFFICULTY
        ? UiManager_1.UiManager.OpenView("TowerVariationView", void 0, (e) => {
            ModelManager_1.ModelManager.TowerModel.OpenReviewView(),
              r.SetResult(e);
          })
        : UiManager_1.UiManager.OpenView("TowerNormalView", void 0, (e) => {
            ModelManager_1.ModelManager.TowerModel.OpenReviewView(),
              r.SetResult(e);
          }),
      r.Promise
    );
  }
  static OpenSeasonUpdateConfirm() {
    var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(99),
      o = () => {
        this.kLo();
      };
    e.FunctionMap.set(1, o),
      e.FunctionMap.set(2, o),
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
        e,
      );
  }
  static OpenTowerGuide() {
    UiManager_1.UiManager.OpenView("TowerGuideView");
  }
  static ClearAllHatredInTower() {
    for (const o of ModelManager_1.ModelManager.FormationDataModel
      .PlayerAggroSet) {
      var e =
        EntitySystem_1.EntitySystem.Get(o)?.GetComponent(46)?.AiController
          ?.AiHateList;
      e && e.ClearHatred(0);
    }
  }
}
(exports.TowerController = TowerController),
  ((_a = TowerController).RQe = (e, o) => {
    10055 === e && o && _a.GLo();
  }),
  (TowerController.$5e = () => {
    var e;
    (ModelManager_1.ModelManager.TowerModel.IsWaitTowerStart = !1),
      (ModelManager_1.ModelManager.TowerModel.IsWaitTowerSettlement = !1),
      _a.GLo(),
      ModelManager_1.ModelManager.TowerModel.NeedOpenConfirmView &&
        ((e = ConfigManager_1.ConfigManager.TowerClimbConfig.GetTowerInfo(
          ModelManager_1.ModelManager.TowerModel.NeedOpenConfirmViewTowerId,
        )),
        UiManager_1.UiManager.OpenView("TowerFloorView", e.AreaNum)),
      ModelManager_1.ModelManager.TowerModel.CheckInTower() &&
        TimerSystem_1.TimerSystem.Delay(() => {
          _a.OpenTowerGuide(),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnShowTowerGuideButton,
            );
        }, ModelManager_1.ModelManager.TowerModel.TowerGuideDelayTime);
  }),
  (TowerController.wLo = (e) => {
    ModelManager_1.ModelManager.TowerModel.RefreshTowerInfo(e.UGs);
  }),
  (TowerController.bLo = (e) => {
    ModelManager_1.ModelManager.TowerModel.RefreshTowerInfoByFloor(e.DGs);
  }),
  (TowerController.BLo = (e) => {
    ModelManager_1.ModelManager.TowerModel.RefreshTowerInfoByDifficulty(e.IGs),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        TowerModel_1.TOWER_LOOP_ACTIVITY_ID,
      );
  }),
  (TowerController.qLo = (e) => {
    var o;
    e.xGs && !ModelManager_1.ModelManager.TowerModel.GetIsInOnceTower()
      ? _a.OpenSeasonUpdateConfirm()
      : ModelManager_1.ModelManager.TowerModel.IsWaitTowerStart ||
        ((ModelManager_1.ModelManager.TowerModel.IsWaitTowerSettlement = !0),
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseConfirmBoxView(),
        e.KRs &&
          ((o = e.bGs),
          (ModelManager_1.ModelManager.TowerModel.CurrentNotConfirmedFloor =
            new TowerData_1.TowerFloorInfo(o.hjn, o.rxs, o.ajn, o.AGs))),
        _a.ClearAllHatredInTower(),
        _a.OpenTowerSettlementView(e.KRs));
  });
//# sourceMappingURL=TowerController.js.map
