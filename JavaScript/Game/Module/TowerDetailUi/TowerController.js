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
    Net_1.Net.Register(16229, this.wLo),
      Net_1.Net.Register(1152, this.BLo),
      Net_1.Net.Register(15620, this.bLo),
      Net_1.Net.Register(5544, this.qLo);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(16229),
      Net_1.Net.UnRegister(1152),
      Net_1.Net.UnRegister(15620),
      Net_1.Net.UnRegister(5544);
  }
  static async RefreshTower() {
    var e = Protocol_1.Aki.Protocol.HCs.create({}),
      e = await Net_1.Net.CallAsync(22386, e);
    e?.TGs && UiManager_1.UiManager.OpenView("TowerUnlockView", e.TGs),
      e.IGs?.CGs &&
        0 < e.IGs.CGs &&
        (ModelManager_1.ModelManager.TowerModel.SaveHandleData(),
        (ModelManager_1.ModelManager.TowerModel.NeedOpenReviveView = !0),
        ModelManager_1.ModelManager.TowerModel.DeleteVariationTowerInfo(),
        ModelManager_1.ModelManager.TowerModel.RefreshTowerInfo(e.IGs),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnTowerRefreshStars,
        ));
  }
  static TowerStartRequest(o, t, e = !0) {
    var r = new Protocol_1.Aki.Protocol.YCs(),
      n = [];
    for (const i of t) {
      if (e && !ModelManager_1.ModelManager.TowerModel.IsRoleCostEnough(i))
        return void ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
          "EditBattleTeamCant",
        );
      var a = { O6n: i, JHn: 0 };
      n.push(a);
    }
    (r.zHn = n),
      (r.ZHn = o),
      Net_1.Net.Call(18555, r, (e) => {
        if (e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs)
          return e.O4n ===
            Protocol_1.Aki.Protocol.O4n.Proto_ErrTowerSeasonUpdate
            ? void this.OpenSeasonUpdateConfirm()
            : void ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.O4n,
                26339,
              );
        (ModelManager_1.ModelManager.TowerModel.CurrentTowerId = o),
          (ModelManager_1.ModelManager.TowerModel.CurrentTowerFormation = t),
          (ModelManager_1.ModelManager.TowerModel.CurrentSelectFloor = -1),
          InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.RestoreDungeonEntranceEntity();
      });
  }
  static TowerResetRequest(e) {
    var o = new Protocol_1.Aki.Protocol.zCs();
    (o.ZHn = e),
      Net_1.Net.Call(3722, o, (e) => {
        if (e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs)
          return e.O4n ===
            Protocol_1.Aki.Protocol.O4n.Proto_ErrTowerSeasonUpdate
            ? void this.OpenSeasonUpdateConfirm()
            : void ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.O4n,
                16031,
              );
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnTowerRefresh),
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
            "ResetConfirm",
          );
      });
  }
  static TowerRewardRequest(o, e) {
    var t = new Protocol_1.Aki.Protocol.QCs();
    (t.ejn = o),
      (t.C9n = e),
      Net_1.Net.Call(9569, t, (e) => {
        if (e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs)
          return e.O4n ===
            Protocol_1.Aki.Protocol.O4n.Proto_ErrTowerSeasonUpdate
            ? void this.OpenSeasonUpdateConfirm()
            : void ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.O4n,
                22643,
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
    var o = new Protocol_1.Aki.Protocol.WCs(),
      e = ((o.ZHn = e), await Net_1.Net.CallAsync(1850, o));
    if (e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs)
      return e.O4n === Protocol_1.Aki.Protocol.O4n.Proto_ErrTowerSeasonUpdate
        ? void this.OpenSeasonUpdateConfirm()
        : void ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.O4n,
            16801,
          );
    0 < e.xVn?.length
      ? (ModelManager_1.ModelManager.TowerModel.RecommendFormation = e.xVn)
      : (ModelManager_1.ModelManager.TowerModel.RecommendFormation = void 0);
  }
  static TowerApplyFloorDataRequest(e) {
    var o = new Protocol_1.Aki.Protocol.e0s();
    (o.tjn = e),
      Net_1.Net.Call(29805, o, (e) => {
        if (e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs)
          return e.O4n ===
            Protocol_1.Aki.Protocol.O4n.Proto_ErrTowerSeasonUpdate
            ? void this.OpenSeasonUpdateConfirm()
            : void ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.O4n,
                9552,
              );
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnTowerRefresh);
      });
  }
  static GLo() {
    var e = Protocol_1.Aki.Protocol.VCs.create({});
    Net_1.Net.Call(27133, e, (e) => {
      ModelManager_1.ModelManager.TowerModel.RefreshTowerInfo(e.IGs);
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
    ModelManager_1.ModelManager.TowerModel.RefreshTowerInfo(e.IGs);
  }),
  (TowerController.bLo = (e) => {
    ModelManager_1.ModelManager.TowerModel.RefreshTowerInfoByFloor(e.SGs);
  }),
  (TowerController.BLo = (e) => {
    ModelManager_1.ModelManager.TowerModel.RefreshTowerInfoByDifficulty(e.fGs);
  }),
  (TowerController.qLo = (e) => {
    var o;
    e.LGs && !ModelManager_1.ModelManager.TowerModel.GetIsInOnceTower()
      ? _a.OpenSeasonUpdateConfirm()
      : (ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseConfirmBoxView(),
        e.NRs &&
          ((o = e.RGs),
          (ModelManager_1.ModelManager.TowerModel.CurrentNotConfirmedFloor =
            new TowerData_1.TowerFloorInfo(o.ZHn, o.Yws, o.zHn, o.EGs))),
        _a.OpenTowerSettlementView(e.NRs));
  });
//# sourceMappingURL=TowerController.js.map
