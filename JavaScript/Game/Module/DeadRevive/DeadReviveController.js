"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DeadReviveController = void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  UiManager_1 = require("../../Ui/UiManager"),
  SceneTeamController_1 = require("../SceneTeam/SceneTeamController"),
  TeleportController_1 = require("../Teleport/TeleportController"),
  TeleportDefine_1 = require("../Teleport/TeleportDefine"),
  TowerDefenceController_1 = require("../TowerDefence/TowerDefenceController"),
  TIME_TO_REVIVE = 3e3,
  LOGIN_REVIVE = 1e3,
  OPEN_FADE_DURATION = 0.1,
  CLOSE_FADE_DURATION = 0.5;
class DeadReviveController extends UiControllerBase_1.UiControllerBase {
  static OnChangeMode() {
    return DeadReviveController.zca(), !0;
  }
  static OnAddEvents() {
    Net_1.Net.Register(13150, (e) => {
      DeadReviveController.Zca(e);
    }),
      Net_1.Net.Register(14294, (e) => {
        DeadReviveController.ema(e);
      }),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.PlotNetworkEnd,
        DeadReviveController.hWe,
      );
  }
  static OnRemoveEvents() {
    Net_1.Net.UnRegister(13150),
      Net_1.Net.UnRegister(14294),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.PlotNetworkEnd,
        DeadReviveController.hWe,
      );
  }
  static ReviveRequest(e, r) {
    var o;
    DeadReviveController.tma ||
      (((o = new Protocol_1.Aki.Protocol.j1s()).LVn = e),
      (DeadReviveController.tma = !0),
      Net_1.Net.Call(1467, o, (e) => {
        (DeadReviveController.tma = !1),
          e
            ? e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs
              ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                  e.O4n,
                  4851,
                ),
                r?.(!1))
              : r?.(!0)
            : r?.(!1);
      }));
  }
  static Zca(e) {
    var r = ModelManager_1.ModelManager.DeadReviveModel;
    e.q5n === ModelManager_1.ModelManager.PlayerInfoModel.GetId() &&
      (r.InitReviveConfig(e.f2s),
      (r.ReviveLimitTime = e.C2s),
      (r.IsShowRevive = e.v2s),
      (r.IsAutoRevive = e.g2s),
      !e.g2s &&
        e.v2s &&
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.ResetToBattleView,
        ),
      e.TVn
        ? EventSystem_1.EventSystem.Add(
            EventDefine_1.EEventName.WorldDone,
            DeadReviveController.ima,
          )
        : r.SkipDeathAnim
          ? DeadReviveController.rma()
          : TimerSystem_1.TimerSystem.Delay(
              DeadReviveController.rma,
              TIME_TO_REVIVE,
            ));
  }
  static ema(e) {
    var r = new UE.Vector(e.y5n?.X ?? 0, e.y5n?.Y ?? 0, e.y5n?.Z ?? 0),
      o = new UE.Rotator(e.S2s?.Pitch ?? 0, e.S2s?.Yaw ?? 0, e.S2s?.Roll ?? 0);
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "World",
        49,
        "执行复活流程",
        ["PlayerId", e.q5n],
        ["Location", r],
        ["Rotator", o],
        ["ReviveType", e.M2s],
      ),
      e.q5n === ModelManager_1.ModelManager.PlayerInfoModel.GetId()
        ? DeadReviveController.oma(e, r, o)
        : DeadReviveController.S7s(e, r, o);
  }
  static async oma(e, r, o) {
    e.y2s &&
      ControllerHolder_1.ControllerHolder.CreatureController.LoadOrUnloadSubLevel(
        e.I2s,
      );
    for (const v of ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities(
      !0,
    )) {
      var l = v.Entity?.GetComponent(3);
      l?.SetInputRotator(o),
        l?.SetActorLocationAndRotation(r, o, "复活流程", !1);
    }
    if (
      (DeadReviveController.zca(),
      ModelManager_1.ModelManager.DeadReviveModel.ClearReviveData(),
      e.M2s <= 0)
    )
      TimerSystem_1.TimerSystem.Delay(
        DeadReviveController.PlayerReviveEnded,
        LOGIN_REVIVE,
      );
    else {
      var t, n, a;
      if (DeadReviveController.xFt(r))
        return (
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("World", 49, "播放剧情并进行无加载传送"),
          (t =
            ModelManager_1.ModelManager.DeadReviveModel.ReviveConfig
              ?.ReviveSequencePath) && "" !== t
            ? ((n = (t = t.split(","))[0]),
              (a = Number(t[1])),
              (t = Number(t[2])),
              ControllerHolder_1.ControllerHolder.LevelLoadingController.OpenLoading(
                0,
                3,
                void 0,
                OPEN_FADE_DURATION,
              ),
              (n = ControllerHolder_1.ControllerHolder.FlowController.StartFlow(
                n,
                a,
                t,
              )),
              (ModelManager_1.ModelManager.DeadReviveModel.ReviveFlowIncId = n),
              (ModelManager_1.ModelManager.DeadReviveModel.RevivePosition = r),
              void (ModelManager_1.ModelManager.DeadReviveModel.ReviveRotator =
                o))
            : void DeadReviveController.hFn(r, o, "RevivePerform")
        );
      e.eda
        ? ((a = new TeleportDefine_1.TeleportContext(void 0, e.T2s, 1)),
          (await TeleportController_1.TeleportController.TeleportToPosition(
            r,
            o,
            "SelfRevive",
            a,
          )) ||
            (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("World", 49, "复活传送失败，复活结束"),
            DeadReviveController.PlayerReviveEnded()))
        : (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("World", 49, "复活执行无加载传送"),
          DeadReviveController.hFn(r, o, "NoLoadingRevive"));
    }
  }
  static xFt(e) {
    if (!ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance())
      return (
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("World", 49, "非副本中不允许复活表演"),
        !1
      );
    let r = !1;
    for (const o of ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities(
      !0,
    ))
      if (o.Entity?.GetComponent(188)?.HasTag(-58810558)) {
        r = !0;
        break;
      }
    return !(
      !r ||
      (!ControllerHolder_1.ControllerHolder.TeleportController.QueryCanTeleportNoLoading(
        e,
      ) &&
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("World", 49, "复活位置不可无加载传送，不允许复活表演"),
        1))
    );
  }
  static S7s(e, r, o) {
    for (const n of e.E2s) {
      var l = MathUtils_1.MathUtils.LongToNumber(n.P4n),
        l = ModelManager_1.ModelManager.CreatureModel.GetEntity(l);
      if (l?.Valid)
        if (l.IsInit) {
          var t = l.Entity.GetComponent(3);
          t.SetInputRotator(o),
            t.SetActorLocationAndRotation(r, o, "复活流程.复活其他角色", !1),
            l.Entity.GetComponent(59)?.ClearReplaySamples();
        } else {
          t = l.Entity.GetComponent(0);
          t?.SetLivingStatus(Protocol_1.Aki.Protocol.HEs.Proto_Alive);
          const r = e.y5n;
          r && t?.SetInitLocation(r);
        }
    }
    SceneTeamController_1.SceneTeamController.ShowControlledRole(e.q5n);
  }
  static nma() {
    let e = "ReviveView";
    if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
      if (
        TowerDefenceController_1.TowerDefenseController.CheckInInstanceDungeon()
      ) {
        var r =
          TowerDefenceController_1.TowerDefenseController.TryGetReviveViewName();
        if (void 0 === r) return;
        e = r;
      } else e = "MultiReviveView";
      (DeadReviveController.sma = e),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.ResetToBattleView,
        ),
        UiManager_1.UiManager.OpenView(e);
    } else
      ModelManager_1.ModelManager.DeadReviveModel.IsShowRevive &&
        ((DeadReviveController.sma = e),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.ResetToBattleView,
        ),
        UiManager_1.UiManager.OpenView(e));
  }
  static zca() {
    var e = DeadReviveController.sma;
    e &&
      UiManager_1.UiManager.IsViewOpen(e) &&
      UiManager_1.UiManager.CloseView(e),
      (DeadReviveController.sma = void 0);
  }
  static hFn(e, r, o) {
    TeleportController_1.TeleportController.TeleportToPositionNoLoading(
      e,
      r,
      o,
    ).finally(() => {
      SceneTeamController_1.SceneTeamController.ShowControlledRole(
        ModelManager_1.ModelManager.PlayerInfoModel.GetId(),
      );
      var e = new Protocol_1.Aki.Protocol.cCs();
      Net_1.Net.Call(22302, e, () => {});
    });
  }
}
((exports.DeadReviveController = DeadReviveController).tma = !1),
  (DeadReviveController.sma = void 0),
  (DeadReviveController.ima = () => {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.WorldDone,
      DeadReviveController.ima,
    ),
      TimerSystem_1.TimerSystem.Delay(DeadReviveController.rma, LOGIN_REVIVE);
  }),
  (DeadReviveController.rma = () => {
    ModelManager_1.ModelManager.DeadReviveModel.IsAutoRevive
      ? (Log_1.Log.CheckInfo() && Log_1.Log.Info("World", 49, "自动复活"),
        DeadReviveController.ReviveRequest(!1))
      : DeadReviveController.nma();
  }),
  (DeadReviveController.hWe = (e) => {
    var r = ModelManager_1.ModelManager.DeadReviveModel.ReviveFlowIncId;
    r &&
      e.FlowIncId === r &&
      (DeadReviveController.hFn(
        ModelManager_1.ModelManager.DeadReviveModel.RevivePosition,
        ModelManager_1.ModelManager.DeadReviveModel.ReviveRotator,
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
    var e = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems(!0)[0],
      r = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentTeamItem;
    !ModelManager_1.ModelManager.GameModeModel.IsMulti &&
      e &&
      e.GetCreatureDataId() !== r?.GetCreatureDataId() &&
      SceneTeamController_1.SceneTeamController.RequestChangeRole(
        e.GetCreatureDataId(),
        { FilterSameRole: !1 },
      );
  });
//# sourceMappingURL=DeadReviveController.js.map
