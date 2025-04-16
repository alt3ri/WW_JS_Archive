"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemUtility = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  LevelGeneralContextDefine_1 = require("../../../LevelGamePlay/LevelGeneralContextDefine"),
  LevelGeneralNetworks_1 = require("../../../LevelGamePlay/LevelGeneralNetworks"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  WaitEntityTask_1 = require("../../../World/Define/WaitEntityTask"),
  TsBaseItem_1 = require("../BaseItem/TsBaseItem");
class SceneItemUtility {
  static GetBaseItemActor(e) {
    e =
      ControllerHolder_1.ControllerHolder.CharacterController.GetActorByEntity(
        e,
      );
    if (e && e instanceof TsBaseItem_1.default) return e;
  }
  static HandleTriggerStateActionByServerNotify(n, o, a) {
    ControllerHolder_1.ControllerHolder.LevelGeneralController
      .LevelEventLogOpen &&
      Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "LevelEvent",
        7,
        "执行EntityTriggerAction，等待创建Entity",
        ["CreatureDataId", o],
        ["PlayerId", n.W5n],
        ["SessionId", n.w5n],
        ["StartIndex", n.K5n],
        ["EndIndex", n.mvs],
      );
    const t = () => {
      var e,
        t,
        r = ModelManager_1.ModelManager.CreatureModel.GetEntity(o);
      r &&
        (r = r.Entity.GetComponent(85)) &&
        (e = r.Actions) &&
        ((t = ModelManager_1.ModelManager.CreatureModel.GetEntity(a)) ||
          (Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "LevelEvent",
              39,
              "执行EntityTriggerAction，未找到otherEntity，仍然触发行为",
            )),
        ControllerHolder_1.ControllerHolder.LevelGeneralController
          .LevelEventLogOpen &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "LevelEvent",
            7,
            "执行EntityTriggerAction，Entity创建完毕",
            ["CreatureDataId", o],
            ["otherCreatureDataId", a],
            ["PlayerId", n.W5n],
            ["SessionId", n.w5n],
            ["StartIndex", n.K5n],
            ["EndIndex", n.mvs],
          ),
        ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsByServerNotify(
          e,
          r.CreateTriggerContext(t?.Id ?? 0),
          n.W5n,
          n.w5n,
          n.K5n,
          n.mvs,
          n.sS_,
        ));
    };
    WaitEntityTask_1.WaitEntityTask.Create(
      "SceneItemUtility.HandleTriggerStateActionByServerNotify1",
      o,
      (e) => {
        e &&
          WaitEntityTask_1.WaitEntityTask.Create(
            "SceneItemUtility.HandleTriggerStateActionByServerNotify2",
            a,
            t,
          );
      },
    );
  }
  static HandleExitTriggerStateActionByServerNotify(n, o, a) {
    ControllerHolder_1.ControllerHolder.LevelGeneralController
      .LevelEventLogOpen &&
      Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "LevelEvent",
        7,
        "执行EntityTriggerAction，等待创建Entity",
        ["CreatureDataId", o],
        ["CreatureDataId", o],
        ["PlayerId", n.W5n],
        ["SessionId", n.w5n],
        ["StartIndex", n.K5n],
        ["EndIndex", n.mvs],
      );
    const t = () => {
      var e,
        t,
        r = ModelManager_1.ModelManager.CreatureModel.GetEntity(o);
      r &&
        (r = r.Entity.GetComponent(85)) &&
        (e = r.ExitActions) &&
        ((t = ModelManager_1.ModelManager.CreatureModel.GetEntity(a)) ||
          (Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "LevelEvent",
              39,
              "执行EntityTriggerAction，未找到otherEntity，仍然触发行为",
            )),
        ControllerHolder_1.ControllerHolder.LevelGeneralController
          .LevelEventLogOpen &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "LevelEvent",
            7,
            "执行EntityTriggerAction，Entity创建完毕",
            ["CreatureDataId", o],
            ["PlayerId", n.W5n],
            ["SessionId", n.w5n],
            ["StartIndex", n.K5n],
            ["EndIndex", n.mvs],
          ),
        ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsByServerNotify(
          e,
          r.CreateTriggerContext(t?.Id ?? 0),
          n.W5n,
          n.w5n,
          n.K5n,
          n.mvs,
          n.sS_,
        ));
    };
    WaitEntityTask_1.WaitEntityTask.Create(
      "SceneItemUtility.HandleExitTriggerStateActionByServerNotify1",
      o,
      (e) => {
        e &&
          WaitEntityTask_1.WaitEntityTask.Create(
            "SceneItemUtility.HandleExitTriggerStateActionByServerNotify2",
            a,
            t,
          );
      },
    );
  }
  static HandleSceneItemStateActionByServerNotify(r, n, o) {
    ControllerHolder_1.ControllerHolder.LevelGeneralController
      .LevelEventLogOpen &&
      Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "LevelEvent",
        7,
        "执行EntityStateChangeAction，等待创建Entity",
        ["CreatureDataId", n],
        ["PlayerId", r.W5n],
        ["SessionId", r.w5n],
        ["StartIndex", r.K5n],
        ["EndIndex", r.mvs],
      ),
      WaitEntityTask_1.WaitEntityTask.Create(
        "SceneItemUtility.HandleSceneItemStateActionByServerNotify",
        n,
        (e) => {
          var t;
          e &&
            (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(n)) &&
            (t = e.Entity.GetComponent(131)) &&
            t.BehaviorMap &&
            (t = t.BehaviorMap.get(o)) &&
            (ControllerHolder_1.ControllerHolder.LevelGeneralController
              .LevelEventLogOpen &&
              Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "LevelEvent",
                7,
                "执行EntityStateChangeAction，Entity创建完毕",
                ["CreatureDataId", n],
                ["PlayerId", r.W5n],
                ["SessionId", r.w5n],
                ["StartIndex", r.K5n],
                ["EndIndex", r.mvs],
              ),
            ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsByServerNotify(
              t,
              LevelGeneralContextDefine_1.EntityContext.Create(e.Id),
              r.W5n,
              r.w5n,
              r.K5n,
              r.mvs,
              r.sS_,
            ));
        },
        LevelGeneralNetworks_1.WAIT_ENTITY_ERROR_TIME,
        !0,
        !0,
      );
  }
  static HandleExploreInteractActionByServerNotify(r, n) {
    WaitEntityTask_1.WaitEntityTask.Create(
      "SceneItemUtility.HandleExploreInteractActionByServerNotify",
      n,
      (e) => {
        var t;
        e &&
          (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(n)) &&
          (t = e.Entity.GetComponent(148)) &&
          (t = t.InteractActions) &&
          ((e = LevelGeneralContextDefine_1.EntityContext.Create(e.Id)),
          ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsByServerNotify(
            t,
            e,
            r.W5n,
            r.w5n,
            r.K5n,
            r.mvs,
            r.sS_,
          ));
      },
      LevelGeneralNetworks_1.WAIT_ENTITY_ERROR_TIME,
      !0,
      !0,
    );
  }
  static HandleSceneItemDestructibleActionByServerNotify(r, n) {
    WaitEntityTask_1.WaitEntityTask.Create(
      "SceneItemUtility.HandleSceneItemDestructibleActionByServerNotify",
      n,
      (e) => {
        var t;
        e &&
          (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(n)) &&
          (t = e.Entity.GetComponent(100)) &&
          (t = t.DeadActions) &&
          ((e = LevelGeneralContextDefine_1.EntityContext.Create(e.Id)),
          ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsByServerNotify(
            t,
            e,
            r.W5n,
            r.w5n,
            r.K5n,
            r.mvs,
            r.sS_,
          ));
      },
      LevelGeneralNetworks_1.WAIT_ENTITY_ERROR_TIME,
      !0,
      !0,
    );
  }
  static HandleTimeTrackControlActionByServerNotify(r, n, o) {
    WaitEntityTask_1.WaitEntityTask.Create(
      "SceneItemUtility.HandleTimeTrackControlActionByServerNotify",
      n,
      (e) => {
        var t;
        e &&
          (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(n)) &&
          (t = e.Entity.GetComponent(132)) &&
          (t = t.GetTargetActions(o)) &&
          ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsByServerNotify(
            t,
            LevelGeneralContextDefine_1.EntityContext.Create(e.Id),
            r.W5n,
            r.w5n,
            r.K5n,
            r.mvs,
            r.sS_,
          );
      },
      LevelGeneralNetworks_1.WAIT_ENTITY_ERROR_TIME,
      !0,
      !0,
    );
  }
  static HandleLifeCycleStageActionByServerNotify(r, n, o) {
    WaitEntityTask_1.WaitEntityTask.Create(
      "SceneItemUtility.HandleLifeCycleStageActionByServerNotify",
      n,
      (e) => {
        var t;
        e &&
          (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(n)) &&
          (t = e.Entity.GetComponent(131)) &&
          (t = t.GetLifeCycleStageActions(o)) &&
          ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsByServerNotify(
            t,
            LevelGeneralContextDefine_1.EntityContext.Create(e.Id),
            r.W5n,
            r.w5n,
            r.K5n,
            r.mvs,
            r.sS_,
          );
      },
      LevelGeneralNetworks_1.WAIT_ENTITY_ERROR_TIME,
      !0,
      !0,
    );
  }
  static HandleTrampleActivateActionByServerNotify(r, n, o) {
    WaitEntityTask_1.WaitEntityTask.Create(
      "SceneItemUtility.HandleTrampleActivateActionByServerNotify",
      n,
      (e) => {
        var t;
        e &&
          (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(n)) &&
          (t = e.Entity.GetComponent(150)) &&
          (t = o ? t.ActivateActions : t.DeactivateActions) &&
          ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsByServerNotify(
            t,
            LevelGeneralContextDefine_1.EntityContext.Create(e.Id),
            r.W5n,
            r.w5n,
            r.K5n,
            r.mvs,
            r.sS_,
          );
      },
      LevelGeneralNetworks_1.WAIT_ENTITY_ERROR_TIME,
      !0,
      !0,
    );
  }
  static HandleBeamReceiveActionByServerNotify(r, n, o) {
    WaitEntityTask_1.WaitEntityTask.Create(
      "SceneItemUtility.HandleBeamReceiveActionByServerNotify",
      n,
      (e) => {
        var t;
        e &&
          (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(n)) &&
          (t = e.Entity.GetComponent(210)) &&
          (t = t.GetBeamReceiveActions(o)) &&
          ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsByServerNotify(
            t,
            LevelGeneralContextDefine_1.EntityContext.Create(e.Id),
            r.W5n,
            r.w5n,
            r.K5n,
            r.mvs,
            r.sS_,
          );
      },
      LevelGeneralNetworks_1.WAIT_ENTITY_ERROR_TIME,
      !0,
      !0,
    );
  }
  static HandleSceneItemStateChangeConditionActionByServerNotify(r, n, o, a) {
    WaitEntityTask_1.WaitEntityTask.Create(
      "SceneItemUtility.HandleSceneItemStateChangeConditionActionByServerNotify",
      n,
      (e) => {
        var t;
        e &&
          (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(n)) &&
          (t = e.Entity.GetComponent(131)) &&
          (t = t.StateConfig?.StateChangeBehaviors) &&
          (t = t[o].ConditionAction) &&
          ((t = t[a].Action),
          ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsByServerNotify(
            t,
            LevelGeneralContextDefine_1.EntityContext.Create(e.Id),
            r.W5n,
            r.w5n,
            r.K5n,
            r.mvs,
            r.sS_,
          ));
      },
      LevelGeneralNetworks_1.WAIT_ENTITY_ERROR_TIME,
      !0,
      !0,
    );
  }
  static HandleHookLockPointActionByServerNotify(n, e, o) {
    WaitEntityTask_1.WaitEntityTask.Create(
      "SceneItemUtility.HandleHookLockPointActionByServerNotify",
      e,
      (t) => {
        if (t) {
          t = ModelManager_1.ModelManager.CreatureModel.GetEntity(e);
          if (t) {
            var r = t.Entity.GetComponent(83);
            if (r) {
              let e = void 0;
              switch (o) {
                case Protocol_1.Aki.Protocol.cw_.Proto_Hooked:
                  e = r.GetHookActions();
                  break;
                case Protocol_1.Aki.Protocol.cw_.Proto_ExitEndpoint:
                  e = r.GetFinishHookActions();
                  break;
                case Protocol_1.Aki.Protocol.cw_.Proto_ExitMidway:
                  e = r.GetInterruptHookActions();
              }
              e &&
                ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsByServerNotify(
                  e,
                  LevelGeneralContextDefine_1.EntityContext.Create(t.Id),
                  n.W5n,
                  n.w5n,
                  n.K5n,
                  n.mvs,
                  n.sS_,
                );
            }
          }
        }
      },
      LevelGeneralNetworks_1.WAIT_ENTITY_ERROR_TIME,
      !0,
      !0,
    );
  }
  static HandleExploreSkillCustomActionByServerNotify(r, n) {
    WaitEntityTask_1.WaitEntityTask.Create(
      "SceneItemUtility.HandleExploreSkillCustomActionByServerNotify",
      n,
      (e) => {
        var t;
        e &&
          (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(n)) &&
          (t = e.Entity.GetComponent(148)) &&
          (t = t.InteractActions) &&
          ((e = LevelGeneralContextDefine_1.EntityContext.Create(e.Id)),
          ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsByServerNotify(
            t,
            e,
            r.W5n,
            r.w5n,
            r.K5n,
            r.mvs,
            r.sS_,
          ));
      },
      LevelGeneralNetworks_1.WAIT_ENTITY_ERROR_TIME,
      !0,
      !0,
    );
  }
}
exports.SceneItemUtility = SceneItemUtility;
//# sourceMappingURL=SceneItemUtility.js.map
