"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TowerController = void 0);
const CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  Net_1 = require("../../../Core/Net/Net"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiManager_1 = require("../../Ui/UiManager"),
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
    Net_1.Net.Register(20342, this.wLo),
      Net_1.Net.Register(29876, this.BLo),
      Net_1.Net.Register(15839, this.bLo),
      Net_1.Net.Register(23876, this.qLo);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(20342),
      Net_1.Net.UnRegister(29876),
      Net_1.Net.UnRegister(15839),
      Net_1.Net.UnRegister(23876);
  }
  static async RefreshTower() {
    var e = Protocol_1.Aki.Protocol.JCs.create({}),
      e = await Net_1.Net.CallAsync(26862, e);
    e?.wGs && UiManager_1.UiManager.OpenView("TowerUnlockView", e.wGs),
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
  static TowerStartRequest(o, t, e = !0) {
    var r = new Protocol_1.Aki.Protocol.r0s(),
      n = [];
    for (const i of t) {
      if (e && !ModelManager_1.ModelManager.TowerModel.IsRoleCostEnough(i))
        return void ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
          "EditBattleTeamCant",
        );
      var a = { Q6n: i, sjn: 0 };
      n.push(a);
    }
    (r.ajn = n),
      (r.hjn = o),
      Net_1.Net.Call(20713, r, (e) => {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs)
          return e.Q4n ===
            Protocol_1.Aki.Protocol.Q4n.Proto_ErrTowerSeasonUpdate
            ? void this.OpenSeasonUpdateConfirm()
            : void ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Q4n,
                26788,
              );
        (ModelManager_1.ModelManager.TowerModel.CurrentTowerId = o),
          (ModelManager_1.ModelManager.TowerModel.CurrentTowerFormation = t),
          (ModelManager_1.ModelManager.TowerModel.CurrentSelectFloor = -1),
          InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.RestoreDungeonEntranceEntity();
      });
  }
  static TowerResetRequest(e) {
    var o = new Protocol_1.Aki.Protocol.n0s();
    (o.hjn = e),
      Net_1.Net.Call(26370, o, (e) => {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs)
          return e.Q4n ===
            Protocol_1.Aki.Protocol.Q4n.Proto_ErrTowerSeasonUpdate
            ? void this.OpenSeasonUpdateConfirm()
            : void ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Q4n,
                15999,
              );
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnTowerRefresh),
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
            "ResetConfirm",
          );
      });
  }
  static TowerRewardRequest(o, e) {
    var t = new Protocol_1.Aki.Protocol.t0s();
    (t.ljn = o),
      (t.I9n = e),
      Net_1.Net.Call(26784, t, (e) => {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs)
          return e.Q4n ===
            Protocol_1.Aki.Protocol.Q4n.Proto_ErrTowerSeasonUpdate
            ? void this.OpenSeasonUpdateConfirm()
            : void ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Q4n,
                19757,
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
          o < TowerData_1.VARIATION_RISK_DIFFICULTY &&
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.RedDotTowerRewardByDifficulties,
              4,
            );
      });
  }
  static async TowerFormationRecommendRequest(e) {
    var o = new Protocol_1.Aki.Protocol.ZCs(),
      e = ((o.hjn = e), await Net_1.Net.CallAsync(27826, o));
    if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs)
      return e.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_ErrTowerSeasonUpdate
        ? void this.OpenSeasonUpdateConfirm()
        : void ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.Q4n,
            18994,
          );
    0 < e.kVn?.length
      ? (ModelManager_1.ModelManager.TowerModel.RecommendFormation = e.kVn)
      : (ModelManager_1.ModelManager.TowerModel.RecommendFormation = void 0);
  }
  static TowerApplyFloorDataRequest(e) {
    var o = new Protocol_1.Aki.Protocol.a0s();
    (o._jn = e),
      Net_1.Net.Call(28507, o, (e) => {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs)
          return e.Q4n ===
            Protocol_1.Aki.Protocol.Q4n.Proto_ErrTowerSeasonUpdate
            ? void this.OpenSeasonUpdateConfirm()
            : void ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Q4n,
                27624,
              );
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnTowerRefresh);
      });
  }
  static GLo() {
    var e = Protocol_1.Aki.Protocol.XCs.create({});
    Net_1.Net.Call(27540, e, (e) => {
      ModelManager_1.ModelManager.TowerModel.RefreshTowerInfo(e.UGs);
    });
  }
  static OpenTowerSettlementView(e) {
    const o = ModelManager_1.ModelManager.TowerModel;
    var t,
      r = o.CurrentTowerId;
    const n = o.GetHaveChallengeFloorAndFormation(r),
      a = [],
      i =
        (a.push({
          ButtonTextId: "Text_Leave_Text",
          DescriptionTextId: void 0,
          IsTimeDownCloseView: !1,
          IsClickedCloseView: !0,
          OnClickedCallback: () => {
            n && this.NLo(!0, e), this.LeaveTower();
          },
        }),
        ConfigManager_1.ConfigManager.TowerClimbConfig.GetNextFloorInArea(r));
    let l = void 0;
    if (
      (e && n
        ? a.push({
            ButtonTextId: "Text_ButtonTextConfirmResult_Text",
            DescriptionTextId: void 0,
            IsTimeDownCloseView: !1,
            IsClickedCloseView: !0,
            OnClickedCallback: () => {
              this.NLo(!1, e);
            },
          })
        : e && i && !n
          ? ((t =
              ConfigManager_1.ConfigManager.TowerClimbConfig.GetTowerInfo(i)),
            (C =
              ConfigManager_1.ConfigManager.TowerClimbConfig.GetTowerAreaName(
                i,
              )),
            a.push({
              ButtonTextId: "Text_ButtonTextContinue_Text",
              DescriptionTextId: "Text_ButtonTextGoOnTower_Text",
              DescriptionArgs: [C, t.Floor],
              IsTimeDownCloseView: !1,
              IsClickedCloseView: !0,
              OnClickedCallback: () => {
                this.OLo(i);
              },
            }))
          : e
            ? a.push({
                ButtonTextId: "Text_BackToTower_Text",
                DescriptionTextId: void 0,
                IsTimeDownCloseView: !1,
                IsClickedCloseView: !0,
                OnClickedCallback: () => {
                  this.BackToTowerView();
                },
              })
            : ((o.NeedChangeFormation = !1),
              a.push({
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
              (l = {
                DescriptionTextId: "Text_ChangeFormation_Text",
                OnToggleClick: (e) => {
                  o.NeedChangeFormation = 1 === e;
                },
              })),
      e)
    ) {
      const g = [];
      var _ = ConfigManager_1.ConfigManager.TowerClimbConfig.GetFloorTarget(r),
        s =
          ModelManager_1.ModelManager.TowerModel.CurrentNotConfirmedFloor
            .StarIndex;
      for (let e = 0; e < TowerModel_1.FLOOR_STAR; e++) {
        var d = ConfigManager_1.ConfigManager.TowerClimbConfig.GetTargetConfig(
            _[e],
          ),
          M = [];
        for (const v of d.Params) M.push(v.toString());
        var c = s.includes(e),
          d = { Target: M, DescriptionTextId: d.DesText, IsReached: c };
        g.push(d);
      }
      TimerSystem_1.TimerSystem.Delay(() => {
        ItemRewardController_1.ItemRewardController.OpenExploreRewardView(
          TOWER_SUCCESS_NO_REWARD,
          e,
          void 0,
          void 0,
          void 0,
          a,
          g,
          l,
        );
      }, ModelManager_1.ModelManager.TowerModel.TowerSettlementDelayTime);
    } else {
      const w = [];
      var C =
        ModelManager_1.ModelManager.TrainingDegreeModel.GetTrainingDataList();
      if (C) {
        for (const m of C) {
          var T = { TrainingData: m };
          w.push(T);
        }
        TimerSystem_1.TimerSystem.Delay(() => {
          ItemRewardController_1.ItemRewardController.OpenExploreRewardView(
            TOWER_FAIL,
            e,
            void 0,
            void 0,
            w,
            a,
            void 0,
            l,
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
    InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeonRequest();
  }
  static OLo(e) {
    ModelManager_1.ModelManager.TowerModel.OpenTowerFormationView(
      e ?? ModelManager_1.ModelManager.TowerModel.CurrentTowerId,
    );
  }
  static ReChallengeTower() {
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
    const t = new CustomPromise_1.CustomPromise();
    return (
      o === TowerData_1.VARIATION_RISK_DIFFICULTY
        ? UiManager_1.UiManager.OpenView("TowerVariationView", void 0, (e) => {
            ModelManager_1.ModelManager.TowerModel.OpenReviewView(),
              t.SetResult(e);
          })
        : UiManager_1.UiManager.OpenView("TowerNormalView", void 0, (e) => {
            ModelManager_1.ModelManager.TowerModel.OpenReviewView(),
              t.SetResult(e);
          }),
      t.Promise
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
}
(exports.TowerController = TowerController),
  ((_a = TowerController).RQe = (e, o) => {
    10055 === e && o && _a.GLo();
  }),
  (TowerController.$5e = () => {
    var e;
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
    ModelManager_1.ModelManager.TowerModel.RefreshTowerInfoByDifficulty(e.IGs);
  }),
  (TowerController.qLo = (e) => {
    var o;
    e.xGs && !ModelManager_1.ModelManager.TowerModel.GetIsInOnceTower()
      ? _a.OpenSeasonUpdateConfirm()
      : (ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseConfirmBoxView(),
        e.KRs &&
          ((o = e.bGs),
          (ModelManager_1.ModelManager.TowerModel.CurrentNotConfirmedFloor =
            new TowerData_1.TowerFloorInfo(o.hjn, o.rxs, o.ajn, o.AGs))),
        _a.OpenTowerSettlementView(e.KRs));
  });
//# sourceMappingURL=TowerController.js.map
