"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DeadReviveController = void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController"),
  UiManager_1 = require("../../Ui/UiManager"),
  BuffItemControl_1 = require("../BuffItem/BuffItemControl"),
  ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine"),
  SceneTeamController_1 = require("../SceneTeam/SceneTeamController"),
  TeleportController_1 = require("../Teleport/TeleportController"),
  TeleportDefine_1 = require("../Teleport/TeleportDefine"),
  TowerDefenceController_1 = require("../TowerDefence/TowerDefenceController"),
  DeadReviveDefine_1 = require("./DeadReviveDefine"),
  TIME_TO_REVIVE = 3e3,
  LOGIN_REVIVE = 1e3,
  OPEN_FADE_DURATION = 0.1,
  CLOSE_FADE_DURATION = 0.5;
class DeadReviveController extends UiControllerBase_1.UiControllerBase {
  static OnChangeMode() {
    return DeadReviveController.i0a(), !0;
  }
  static OnAddEvents() {
    Net_1.Net.Register(23848, (e) => {
      DeadReviveController.r0a(e);
    }),
      Net_1.Net.Register(19640, (e) => {
        DeadReviveController.o0a(e);
      }),
      Net_1.Net.Register(26860, DeadReviveController.uLc),
      Net_1.Net.Register(24294, DeadReviveController.UUc),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.PlotNetworkEnd,
        DeadReviveController.hWe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRevive,
        DeadReviveController.g7r,
      );
  }
  static OnRemoveEvents() {
    Net_1.Net.UnRegister(23848),
      Net_1.Net.UnRegister(19640),
      Net_1.Net.UnRegister(26860),
      Net_1.Net.UnRegister(24294),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.PlotNetworkEnd,
        DeadReviveController.hWe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRevive,
        DeadReviveController.g7r,
      );
  }
  static ReviveRequest(e, r) {
    var o;
    DeadReviveController.n0a ||
      (((o = new Protocol_1.Aki.Protocol.z1s()).bVn = e),
      (DeadReviveController.n0a = !0),
      Net_1.Net.Call(19394, o, (e) => {
        (DeadReviveController.n0a = !1),
          e
            ? e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
              ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                  e.Q4n,
                  22160,
                ),
                r?.(!1))
              : r?.(!0)
            : r?.(!1);
      }));
  }
  static TryReviveRole(e, r, o = !1) {
    e =
      ModelManager_1.ModelManager.DeadReviveModel.ReviveCooldownCreatureMap.get(
        e,
      );
    if (e)
      ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(
        DeadReviveDefine_1.REVIVE_COOLDOWN,
        Math.floor(
          0.5 +
            MathUtils_1.MathUtils.MillisecondToSecond * e.RemainMilliseconds,
        ),
      );
    else
      switch (ModelManager_1.ModelManager.DeadReviveModel.ReviveMode) {
        case 0:
          BuffItemControl_1.BuffItemControl.TryUseResurrectionItem(r);
          break;
        case 1:
          DeadReviveController.dLc(r, o);
      }
  }
  static TryReviveRoleWhenCurrentRoleDead(e, r) {
    var o;
    1 === ModelManager_1.ModelManager.DeadReviveModel.ReviveMode &&
      ((o = ModelManager_1.ModelManager.DeadReviveModel.OpenedViewName),
      !ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity
        ?.Active &&
      o &&
      UiManager_1.UiManager.IsViewOpen(o)
        ? this.TryReviveRole(e, r, !0)
        : ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(
            DeadReviveDefine_1.REVIVE_WAIT,
          ));
  }
  static CheckOtherPlayerReviveCooldown(e, r) {
    var o;
    e !== ModelManager_1.ModelManager.CreatureModel.GetPlayerId() &&
      (e = ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamListById(e)) &&
      (o =
        ModelManager_1.ModelManager.DeadReviveModel.ReviveCooldownCreatureMap.get(
          r,
        )) &&
      ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(
        DeadReviveDefine_1.OTHER_PLAYER_REVIVE_COOLDOWN,
        e.PlayerNumber,
        Math.floor(
          0.5 +
            MathUtils_1.MathUtils.MillisecondToSecond * o.RemainMilliseconds,
        ),
      );
  }
  static r0a(e) {
    var r,
      o = ModelManager_1.ModelManager.DeadReviveModel;
    e.W5n === ModelManager_1.ModelManager.PlayerInfoModel.GetId() &&
      (o.InitReviveConfig(e.I2s),
      (o.ReviveLimitTime = e.E2s),
      (o.IsShowRevive = e.T2s),
      (o.IsAutoRevive = e.y2s),
      !e.y2s &&
        e.T2s &&
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.ResetToBattleView,
        ),
      (r = ModelManager_1.ModelManager.LordGymModel).IsChallenging() &&
        (r.IsDeadInChallenge = !0),
      e.wVn
        ? EventSystem_1.EventSystem.Add(
            EventDefine_1.EEventName.WorldDone,
            DeadReviveController.s0a,
          )
        : o.SkipDeathAnim
          ? DeadReviveController.a0a()
          : (o.DeadDelayTimer = TimerSystem_1.TimerSystem.Delay(
              DeadReviveController.a0a,
              TIME_TO_REVIVE,
            )));
  }
  static o0a(e) {
    var r = new UE.VectorDouble(e.P5n?.X ?? 0, e.P5n?.Y ?? 0, e.P5n?.Z ?? 0),
      o = new UE.Rotator(e.D2s?.Pitch ?? 0, e.D2s?.Yaw ?? 0, e.D2s?.Roll ?? 0);
    let l = void 0;
    var a = e.hn1;
    a && (l = Vector_1.Vector.Create(a.X, a.Y, a.Z)),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "World",
          48,
          "执行复活流程",
          ["PlayerId", e.W5n],
          ["Location", r],
          ["Rotator", o],
          ["Gravity", l],
          ["ReviveType", e.R2s],
        ),
      e.W5n === ModelManager_1.ModelManager.PlayerInfoModel.GetId()
        ? DeadReviveController.h0a(e, r, o, l)
        : DeadReviveController.i$s(e, r, o);
  }
  static async h0a(e, r, o, l) {
    e.P2s &&
      ControllerHolder_1.ControllerHolder.SubLevelController.LoadOrUnloadSubLevel(
        e.U2s,
        e.W$_,
      );
    for (const v of ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities(
      !0,
    )) {
      var a = v.Entity?.GetComponent(3);
      a?.SetInputRotator(o),
        a?.SetActorLocationAndRotation(r, o, "复活流程", !1);
    }
    if (
      (DeadReviveController.i0a(),
      ModelManager_1.ModelManager.DeadReviveModel.ClearReviveData(),
      e.R2s <= 0)
    )
      TimerSystem_1.TimerSystem.Delay(
        DeadReviveController.PlayerReviveEnded,
        LOGIN_REVIVE,
      );
    else {
      var t, n, i;
      if (DeadReviveController.xFt(r))
        return (
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("World", 48, "播放剧情并进行无加载传送"),
          (t =
            ModelManager_1.ModelManager.DeadReviveModel.ReviveConfig
              ?.ReviveSequencePath) && "" !== t
            ? ((n = (t = t.split(","))[0]),
              (i = Number(t[1])),
              (t = Number(t[2])),
              ControllerHolder_1.ControllerHolder.LevelLoadingController.OpenLoading(
                0,
                3,
                void 0,
                OPEN_FADE_DURATION,
              ),
              (n = ControllerHolder_1.ControllerHolder.FlowController.StartFlow(
                n,
                i,
                t,
              )),
              (ModelManager_1.ModelManager.DeadReviveModel.ReviveFlowIncId = n),
              (ModelManager_1.ModelManager.DeadReviveModel.RevivePosition = r),
              (ModelManager_1.ModelManager.DeadReviveModel.ReviveRotator = o),
              void (ModelManager_1.ModelManager.DeadReviveModel.ReviveGravity =
                l))
            : void DeadReviveController.fFn(r, o, l, "RevivePerform")
        );
      e.ZCa
        ? ((i = new TeleportDefine_1.TeleportContext(void 0, e.w2s, 1)),
          (await TeleportController_1.TeleportController.TeleportToPosition(
            r,
            o,
            l,
            "SelfRevive",
            i,
          )) ||
            (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("World", 48, "复活传送失败，复活结束"),
            DeadReviveController.PlayerReviveEnded()))
        : (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("World", 48, "复活执行无加载传送"),
          DeadReviveController.fFn(r, o, l, "NoLoadingRevive"));
    }
  }
  static xFt(e) {
    if (!ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance())
      return (
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("World", 48, "非副本中不允许复活表演"),
        !1
      );
    let r = !1;
    for (const o of ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities(
      !0,
    ))
      if (o.Entity?.GetComponent(203)?.HasTag(-58810558)) {
        r = !0;
        break;
      }
    return !(
      !r ||
      (!ControllerHolder_1.ControllerHolder.TeleportController.QueryCanTeleportNoLoading(
        e,
      ) &&
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("World", 48, "复活位置不可无加载传送，不允许复活表演"),
        1))
    );
  }
  static i$s(e, r, o) {
    for (const t of e.A2s) {
      var l = MathUtils_1.MathUtils.LongToNumber(t.F4n),
        l = ModelManager_1.ModelManager.CreatureModel.GetEntity(l);
      if (l?.Valid)
        if (l.IsInit) {
          var a = l.Entity.GetComponent(3);
          a.SetInputRotator(o),
            a.SetActorLocationAndRotation(r, o, "复活流程.复活其他角色", !1),
            l.Entity.GetComponent(67)?.ClearReplaySamples();
        } else {
          a = l.Entity.GetComponent(0);
          a?.SetLivingStatus(Protocol_1.Aki.Protocol.JEs.Proto_Alive);
          const r = e.P5n;
          r && a?.SetInitLocation(r);
        }
    }
    SceneTeamController_1.SceneTeamController.ShowControlledRole(e.W5n);
  }
  static l0a() {
    var e = DeadReviveController.mLc(),
      r = e[0],
      e = e[1];
    r &&
      ((ModelManager_1.ModelManager.DeadReviveModel.BlockAllInput = !0),
      InputDistributeController_1.InputDistributeController.RefreshInputTag(),
      (ModelManager_1.ModelManager.DeadReviveModel.OpenedViewName = r),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.ResetToBattleView,
      ),
      UiManager_1.UiManager.OpenView(r, e, () => {
        (ModelManager_1.ModelManager.DeadReviveModel.BlockAllInput = !1),
          InputDistributeController_1.InputDistributeController.RefreshInputTag();
      }));
  }
  static mLc() {
    var e;
    return ModelManager_1.ModelManager.DangoAbyssModel.CheckInAbyss() &&
      ModelManager_1.ModelManager.DangoAbyssModel.IsChallengeFinish()
      ? [void 0, void 0]
      : 1 === ModelManager_1.ModelManager.DeadReviveModel.ReviveMode
        ? ["ShareTimesReviveView", void 0]
        : ModelManager_1.ModelManager.GameModeModel.IsMulti
          ? TowerDefenceController_1.TowerDefenseController.CheckInInstanceDungeon()
            ? [
                TowerDefenceController_1.TowerDefenseController.TryGetReviveViewName(),
                void 0,
              ]
            : ["MultiReviveView", void 0]
          : ModelManager_1.ModelManager.DeadReviveModel.IsShowRevive
            ? (e =
                ModelManager_1.ModelManager
                  .BabelTowerModel).CheckInBattleBabelTower() &&
              e.CheckCanRevive()
              ? [
                  "BabelTowerReviveView",
                  {
                    LevelId: (e = e.CurrentChallengeInstData).LevelId,
                    StarNum: e.CurStarNum,
                  },
                ]
              : ["ReviveView", void 0]
            : [void 0, void 0];
  }
  static i0a() {
    var e = ModelManager_1.ModelManager.DeadReviveModel.OpenedViewName;
    e &&
      UiManager_1.UiManager.IsViewOpen(e) &&
      UiManager_1.UiManager.CloseView(e),
      (ModelManager_1.ModelManager.DeadReviveModel.OpenedViewName = void 0);
  }
  static fFn(e, r, o, l) {
    TeleportController_1.TeleportController.TeleportToPositionWithGravityNoLoading(
      e,
      r,
      o,
      l,
    ).finally(() => {
      SceneTeamController_1.SceneTeamController.ShowControlledRole(
        ModelManager_1.ModelManager.PlayerInfoModel.GetId(),
      );
      var e = new Protocol_1.Aki.Protocol.pCs(),
        e =
          (Net_1.Net.Call(28184, e, () => {}),
          ModelManager_1.ModelManager.DeadReviveModel.ChangeRoleIdAfterRevive);
      e &&
        ((e = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(e, {
          ParamType: 0,
          OnlyMyRole: !0,
        })),
        (ModelManager_1.ModelManager.DeadReviveModel.ChangeRoleIdAfterRevive = 0),
        e) &&
        SceneTeamController_1.SceneTeamController.RequestChangeRole(
          e.GetCreatureDataId(),
        );
    });
  }
  static TryReviveCurrentRoleByShare() {
    var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentTeamItem;
    e && DeadReviveController.fLc(e.GetConfigId);
  }
  static dLc(e, r) {
    var o, l, a;
    ModelManager_1.ModelManager.DeadReviveModel.CurrentShareReviveTimes <= 0
      ? ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(
          DeadReviveDefine_1.SHARE_REVIVE_NO_TIMES,
        )
      : ((o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(282)).FunctionMap.set(
          2,
          () => {
            r &&
              (ModelManager_1.ModelManager.DeadReviveModel.ChangeRoleIdAfterRevive =
                e),
              DeadReviveController.fLc(e);
          },
        ),
        (l =
          ModelManager_1.ModelManager.DeadReviveModel.CurrentShareReviveTimes),
        (a = ModelManager_1.ModelManager.DeadReviveModel.MaxShareReviveTimes),
        o.SetTextArgs(l.toString(), a.toString()),
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
          o,
        ));
  }
  static fLc(e) {
    var r = new Protocol_1.Aki.Protocol.Cec();
    (r.Q6n = e), Net_1.Net.Call(22539, r, () => {});
  }
}
((exports.DeadReviveController = DeadReviveController).n0a = !1),
  (DeadReviveController.s0a = () => {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.WorldDone,
      DeadReviveController.s0a,
    ),
      (ModelManager_1.ModelManager.DeadReviveModel.DeadDelayTimer =
        TimerSystem_1.TimerSystem.Delay(
          DeadReviveController.a0a,
          LOGIN_REVIVE,
        ));
  }),
  (DeadReviveController.a0a = () => {
    (ModelManager_1.ModelManager.DeadReviveModel.DeadDelayTimer = void 0),
      ModelManager_1.ModelManager.DeadReviveModel.IsAutoRevive
        ? (Log_1.Log.CheckInfo() && Log_1.Log.Info("World", 48, "自动复活"),
          DeadReviveController.ReviveRequest(!1))
        : DeadReviveController.l0a();
  }),
  (DeadReviveController.hWe = (e) => {
    var r = ModelManager_1.ModelManager.DeadReviveModel.ReviveFlowIncId;
    r &&
      e.FlowIncId === r &&
      (DeadReviveController.fFn(
        ModelManager_1.ModelManager.DeadReviveModel.RevivePosition,
        ModelManager_1.ModelManager.DeadReviveModel.ReviveRotator,
        ModelManager_1.ModelManager.DeadReviveModel.ReviveGravity,
        "RevivePerform",
      ),
      ControllerHolder_1.ControllerHolder.LevelLoadingController.CloseLoading(
        0,
        void 0,
        CLOSE_FADE_DURATION,
      ),
      (ModelManager_1.ModelManager.DeadReviveModel.ReviveFlowIncId = 0));
  }),
  (DeadReviveController.PlayerReviveEnded = () => {
    SceneTeamController_1.SceneTeamController.ShowControlledRole(
      ModelManager_1.ModelManager.PlayerInfoModel.GetId(),
    );
    let e = void 0;
    var r = ModelManager_1.ModelManager.DeadReviveModel.ChangeRoleIdAfterRevive;
    r &&
      (e = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(r, {
        ParamType: 0,
        OnlyMyRole: !0,
      })),
      (ModelManager_1.ModelManager.DeadReviveModel.ChangeRoleIdAfterRevive = 0),
      (e =
        e || ModelManager_1.ModelManager.GameModeModel.IsMulti
          ? e
          : ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems(!0)[0]) &&
        SceneTeamController_1.SceneTeamController.RequestChangeRole(
          e.GetCreatureDataId(),
        );
  }),
  (DeadReviveController.uLc = (e) => {
    var r = ModelManager_1.ModelManager.DeadReviveModel;
    (r.CurrentShareReviveTimes = e.uRc),
      (r.MaxShareReviveTimes = e.Sec),
      0 < r.MaxShareReviveTimes && (r.ReviveMode = 1),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnShareReviveTimesChange,
      );
  }),
  (DeadReviveController.UUc = (e) => {
    for (const l of e.mPc) {
      var r = MathUtils_1.MathUtils.LongToNumber(l.F4n),
        o = MathUtils_1.MathUtils.LongToNumber(l.ZM_);
      ModelManager_1.ModelManager.DeadReviveModel.RegisterCooldown(r, o);
    }
  }),
  (DeadReviveController.g7r = (e) => {
    e = e.GetComponent(0)?.GetCreatureDataId() ?? 0;
    ModelManager_1.ModelManager.DeadReviveModel.UnRegisterCooldown(e);
  });
//# sourceMappingURL=DeadReviveController.js.map
