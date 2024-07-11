"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DeadReviveController = void 0);
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../Ui/UiManager");
const SceneTeamController_1 = require("../SceneTeam/SceneTeamController");
const TeleportController_1 = require("../Teleport/TeleportController");
const TeleportDefine_1 = require("../Teleport/TeleportDefine");
const TIME_TO_REVIVE = 3e3;
const LOGIN_REVIVE = 1e3;
const OPEN_FADE_DURATION = 0.1;
const CLOSE_FADE_DURATION = 0.5;
class DeadReviveController extends UiControllerBase_1.UiControllerBase {
  static OnChangeMode() {
    return UiManager_1.UiManager.CloseView("ReviveView"), !0;
  }
  static OnAddEvents() {
    Net_1.Net.Register(8225, (e) => {
      DeadReviveController.NotifyOnPlayerDead(e);
    }),
      Net_1.Net.Register(20495, (e) => {
        DeadReviveController.NotifyOnPlayerRevive(e);
      }),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.PlotNetworkEnd,
        DeadReviveController.YHe,
      );
  }
  static OnRemoveEvents() {
    Net_1.Net.UnRegister(8225),
      Net_1.Net.UnRegister(20495),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.PlotNetworkEnd,
        DeadReviveController.YHe,
      );
  }
  static NotifyOnPlayerDead(e) {
    const r = ModelManager_1.ModelManager.DeadReviveModel;
    let o = e.aFn;
    r.SetPlayerIsDead(o, !0),
      o !== ModelManager_1.ModelManager.PlayerInfoModel.GetId()
        ? EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnOtherPlayerDead,
          )
        : (r.InitReviveConfig(e.zUs),
          (r.ReviveLimitTime = e.YUs),
          (r.AllDead = !0),
          (o = !e.JUs && e.ZUs),
          (r.NeedOpenRevive = o) &&
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.ResetToBattleView,
            ),
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPlayerDead),
          e.W4n
            ? EventSystem_1.EventSystem.Add(
                EventDefine_1.EEventName.WorldDone,
                DeadReviveController.LoginDeadFinish,
              )
            : r.SkipDeathAnim
              ? DeadReviveController.DeadFinish()
              : TimerSystem_1.TimerSystem.Delay(
                  DeadReviveController.DeadFinish,
                  TIME_TO_REVIVE,
                ));
  }
  static NotifyOnPlayerRevive(e) {
    const r = ModelManager_1.ModelManager.DeadReviveModel;
    const o = e.aFn;
    if (
      (r.SetPlayerIsDead(o, !1),
      o !== ModelManager_1.ModelManager.PlayerInfoModel.GetId())
    )
      DeadReviveController.ReviveOtherPlayer(e);
    else {
      r.ClearReviveMap();
      for (const t of e.rws) {
        var l = MathUtils_1.MathUtils.LongToNumber(t.rkn);
        var l = ModelManager_1.ModelManager.CreatureModel.GetEntityId(l);
        r.SetReviveMap(l, t.ews.NFn);
      }
      (r.RevivePositionType = e.tws),
        (r.ReviveTeleportId = e.sws),
        e.$kn && (r.RevivePosition = new UE.Vector(e.$kn.X, e.$kn.Y, e.$kn.Z)),
        e.iws &&
          (r.ReviveRotator = new UE.Rotator(
            e.iws.Pitch,
            e.iws.Yaw,
            e.iws.Roll,
          )),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "World",
            3,
            "[DeadReviveController.NotifyOnPlayerRevive] 复活",
            ["Location", e.$kn],
            ["ReviveType", e.tws],
          ),
        e.ows &&
          ControllerHolder_1.ControllerHolder.CreatureController.LoadOrUnloadSubLevel(
            e.nws,
          ),
        (r.CanRevive = !0),
        r.DelayRevive && DeadReviveController.AllRevive(),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.PlayerRevive,
          e.aFn,
        );
    }
  }
  static ReviveOtherPlayer(e) {
    for (const a of e.rws) {
      var r;
      var o;
      var l;
      var t;
      var n = MathUtils_1.MathUtils.LongToNumber(a.rkn);
      var n = ModelManager_1.ModelManager.CreatureModel.GetEntity(n);
      n?.Valid &&
        ((r = a.ews?.NFn),
        n.IsInit
          ? (r && n.Entity.CheckGetComponent(172).ExecuteReviveLocal(),
            (l = n.Entity.GetComponent(3)),
            (o = new UE.Rotator(e.iws.Pitch, e.iws.Yaw, e.iws.Roll)),
            (t = new UE.Vector(e.$kn.X, e.$kn.Y, e.$kn.Z)),
            l.SetInputRotator(o),
            l.SetActorLocationAndRotation(t, o, "复活流程.复活其他角色", !1),
            n.Entity.GetComponent(57)?.ClearReplaySamples())
          : ((l = n.Entity.GetComponent(0)),
            r && l?.SetLivingStatus(Protocol_1.Aki.Protocol.Rvs.Proto_Alive),
            (t = e.$kn) && l?.SetInitLocation(t)));
    }
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "World",
        5,
        "[DeadReviveController.AllRevive] 复活其他人角色",
        ["Location", e.$kn],
        ["Rotator", e.iws],
        ["ReviveType", e.tws],
      ),
      SceneTeamController_1.SceneTeamController.ShowControlledRole(e.aFn);
  }
  static async AllRevive() {
    let e, r, o;
    for (const t of ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities(
      !0,
    )) {
      ModelManager_1.ModelManager.DeadReviveModel.GetReviveHp(t.Id) &&
        t.Entity.CheckGetComponent(172).ExecuteReviveLocal(),
        EventSystem_1.EventSystem.EmitWithTarget(
          t,
          EventDefine_1.EEventName.AllRevive,
        );
      const l = t.Entity.GetComponent(3);
      l.SetInputRotator(
        ModelManager_1.ModelManager.DeadReviveModel.ReviveRotator,
      ),
        l.SetActorLocationAndRotation(
          ModelManager_1.ModelManager.DeadReviveModel.RevivePosition,
          ModelManager_1.ModelManager.DeadReviveModel.ReviveRotator,
          "复活流程.全部复活",
          !1,
        );
    }
    if (
      (ModelManager_1.ModelManager.DeadReviveModel.ClearReviveData(),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "World",
          3,
          "[DeadReviveController.AllRevive] 复活",
          [
            "Location",
            ModelManager_1.ModelManager.DeadReviveModel.RevivePosition,
          ],
          [
            "ReviveRotator",
            ModelManager_1.ModelManager.DeadReviveModel.ReviveRotator,
          ],
          [
            "ReviveType",
            ModelManager_1.ModelManager.DeadReviveModel.RevivePositionType,
          ],
        ),
      !(ModelManager_1.ModelManager.DeadReviveModel.RevivePositionType <= 0))
    )
      return DeadReviveController.P2t()
        ? (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("World", 49, "播放剧情并进行无加载传送"),
          (e =
            ModelManager_1.ModelManager.DeadReviveModel.ReviveConfig
              ?.ReviveSequencePath) && e !== ""
            ? ((r = (e = e.split(","))[0]),
              (o = Number(e[1])),
              (e = Number(e[2])),
              ControllerHolder_1.ControllerHolder.LevelLoadingController.OpenLoading(
                0,
                3,
                void 0,
                OPEN_FADE_DURATION,
              ),
              (r = ControllerHolder_1.ControllerHolder.FlowController.StartFlow(
                r,
                o,
                e,
              )),
              void (ModelManager_1.ModelManager.DeadReviveModel.ReviveFlowIncId =
                r))
            : void DeadReviveController.EOn())
        : ((o = new TeleportDefine_1.TeleportContext(
            void 0,
            ModelManager_1.ModelManager.DeadReviveModel.ReviveTeleportId,
            1,
          )),
          void (
            (await TeleportController_1.TeleportController.TeleportToPosition(
              ModelManager_1.ModelManager.DeadReviveModel.RevivePosition,
              ModelManager_1.ModelManager.DeadReviveModel.ReviveRotator,
              "DeadReviveController.AllRevive",
              o,
            )) ||
            (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("World", 49, "复活传送失败，复活结束"),
            DeadReviveController.PlayerReviveEnded())
          ));
    TimerSystem_1.TimerSystem.Delay(
      DeadReviveController.PlayerReviveEnded,
      LOGIN_REVIVE,
    );
  }
  static P2t() {
    if (!ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance())
      return (
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("World", 49, "非副本中不允许复活表演"),
        !1
      );
    let e = !1;
    for (const o of ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities(
      !0,
    ))
      if (o.Entity?.GetComponent(185)?.HasTag(-58810558)) {
        e = !0;
        break;
      }
    let r;
    return (
      !!e &&
      ((r = ModelManager_1.ModelManager.DeadReviveModel.RevivePosition),
      !!ControllerHolder_1.ControllerHolder.TeleportController.QueryCanTeleportNoLoading(
        r,
      ) ||
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("World", 49, "复活位置不可无加载传送，不允许复活表演"),
        !1))
    );
  }
  static EOn() {
    TeleportController_1.TeleportController.TeleportToPositionNoLoading(
      ModelManager_1.ModelManager.DeadReviveModel.RevivePosition,
      ModelManager_1.ModelManager.DeadReviveModel.ReviveRotator,
      "RevivePerform",
    ).finally(() => {
      SceneTeamController_1.SceneTeamController.ShowControlledRole(
        ModelManager_1.ModelManager.PlayerInfoModel.GetId(),
      );
      const e = new Protocol_1.Aki.Protocol.fus();
      Net_1.Net.Call(5004, e, () => {});
    });
  }
  static RoleReviveEnded(e) {
    let r;
    var e = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(e, {
      ParamType: 1,
    });
    e &&
      ((r = ModelManager_1.ModelManager.DeadReviveModel),
      (e = e.GetPlayerId()),
      r.IsPlayerDead(e)) &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("World", 49, "角色复活时，该玩家未复活"),
      r.SetPlayerIsDead(e, !1),
      e === ModelManager_1.ModelManager.PlayerInfoModel.GetId() &&
        (r.ClearReviveData(),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.PlayerRevive,
          e,
        )),
      ControllerHolder_1.ControllerHolder.SceneTeamController.ShowControlledRole(
        e,
      ));
  }
  static ReviveRequest(e, r) {
    let o;
    DeadReviveController.IsReviving ||
      (ModelManager_1.ModelManager.DeadReviveModel.AllDead
        ? (((o = new Protocol_1.Aki.Protocol.Xss()).K4n = e),
          (DeadReviveController.IsReviving = !0),
          Net_1.Net.Call(9903, o, (e) => {
            (DeadReviveController.IsReviving = !1),
              e
                ? e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
                  ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                      e.lkn,
                      9885,
                    ),
                    r?.(!1))
                  : r?.(!0)
                : r?.(!1);
          }))
        : r?.(!0));
  }
}
((exports.DeadReviveController = DeadReviveController).IsReviving = !1),
  (DeadReviveController.DeadFinish = () => {
    let e;
    const r = ModelManager_1.ModelManager.DeadReviveModel;
    r.CanRevive
      ? DeadReviveController.AllRevive()
      : r.AllDead &&
        ((e =
          ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() &&
          ModelManager_1.ModelManager.GameModeModel.IsMulti),
        r.NeedOpenRevive && !e
          ? UiManager_1.UiManager.OpenView("ReviveView")
          : e &&
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OpenOnlineInstanceDeath,
            ),
        (r.DelayRevive = !0));
  }),
  (DeadReviveController.LoginDeadFinish = () => {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.WorldDone,
      DeadReviveController.LoginDeadFinish,
    ),
      TimerSystem_1.TimerSystem.Delay(
        DeadReviveController.DeadFinish,
        LOGIN_REVIVE,
      );
  }),
  (DeadReviveController.YHe = (e) => {
    const r = ModelManager_1.ModelManager.DeadReviveModel.ReviveFlowIncId;
    r &&
      e.FlowIncId === r &&
      (DeadReviveController.EOn(),
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
    const e = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems(!0)[0];
    const r = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentTeamItem;
    !ModelManager_1.ModelManager.GameModeModel.IsMulti &&
      e &&
      e.GetCreatureDataId() !== r?.GetCreatureDataId() &&
      SceneTeamController_1.SceneTeamController.RequestChangeRole(
        e.GetCreatureDataId(),
        !1,
      );
  });
// # sourceMappingURL=DeadReviveController.js.map
