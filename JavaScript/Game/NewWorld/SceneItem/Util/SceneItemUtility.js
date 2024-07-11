"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemUtility = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  LevelGeneralContextDefine_1 = require("../../../LevelGamePlay/LevelGeneralContextDefine"),
  LevelGeneralNetworks_1 = require("../../../LevelGamePlay/LevelGeneralNetworks"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  WaitEntityTask_1 = require("../../../World/Define/WaitEntityTask"),
  CharacterController_1 = require("../../Character/CharacterController"),
  TsBaseItem_1 = require("../BaseItem/TsBaseItem");
class SceneItemUtility {
  static GetBaseItemActor(e) {
    e = CharacterController_1.CharacterController.GetActorByEntity(e);
    if (e && e instanceof TsBaseItem_1.default) return e;
  }
  static HandleTriggerStateActionByServerNotify(n, a, o) {
    ControllerHolder_1.ControllerHolder.LevelGeneralController
      .LevelEventLogOpen &&
      Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "LevelEvent",
        7,
        "执行EntityTriggerAction，等待创建Entity",
        ["CreatureDataId", a],
        ["PlayerId", n.q5n],
        ["SessionId", n.T5n],
        ["StartIndex", n.G5n],
        ["EndIndex", n.avs],
      );
    const t = () => {
      var e,
        t,
        r = ModelManager_1.ModelManager.CreatureModel.GetEntity(a);
      r &&
        (r = r.Entity.GetComponent(77)) &&
        (e = r.Actions) &&
        ((t = ModelManager_1.ModelManager.CreatureModel.GetEntity(o)) ||
          (Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "LevelEvent",
              40,
              "执行EntityTriggerAction，未找到otherEntity，仍然触发行为",
            )),
        ControllerHolder_1.ControllerHolder.LevelGeneralController
          .LevelEventLogOpen &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "LevelEvent",
            7,
            "执行EntityTriggerAction，Entity创建完毕",
            ["CreatureDataId", a],
            ["otherCreatureDataId", o],
            ["PlayerId", n.q5n],
            ["SessionId", n.T5n],
            ["StartIndex", n.G5n],
            ["EndIndex", n.avs],
          ),
        ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsByServerNotify(
          e,
          r.CreateTriggerContext(t?.Id ?? 0),
          n.q5n,
          n.T5n,
          n.G5n,
          n.avs,
        ));
    };
    WaitEntityTask_1.WaitEntityTask.Create(a, (e) => {
      e && WaitEntityTask_1.WaitEntityTask.Create(o, t);
    });
  }
  static HandleExitTriggerStateActionByServerNotify(n, a, o) {
    ControllerHolder_1.ControllerHolder.LevelGeneralController
      .LevelEventLogOpen &&
      Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "LevelEvent",
        7,
        "执行EntityTriggerAction，等待创建Entity",
        ["CreatureDataId", a],
        ["CreatureDataId", a],
        ["PlayerId", n.q5n],
        ["SessionId", n.T5n],
        ["StartIndex", n.G5n],
        ["EndIndex", n.avs],
      );
    const t = () => {
      var e,
        t,
        r = ModelManager_1.ModelManager.CreatureModel.GetEntity(a);
      r &&
        (r = r.Entity.GetComponent(77)) &&
        (e = r.ExitActions) &&
        ((t = ModelManager_1.ModelManager.CreatureModel.GetEntity(o)) ||
          (Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "LevelEvent",
              40,
              "执行EntityTriggerAction，未找到otherEntity，仍然触发行为",
            )),
        ControllerHolder_1.ControllerHolder.LevelGeneralController
          .LevelEventLogOpen &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "LevelEvent",
            7,
            "执行EntityTriggerAction，Entity创建完毕",
            ["CreatureDataId", a],
            ["PlayerId", n.q5n],
            ["SessionId", n.T5n],
            ["StartIndex", n.G5n],
            ["EndIndex", n.avs],
          ),
        ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsByServerNotify(
          e,
          r.CreateTriggerContext(t?.Id ?? 0),
          n.q5n,
          n.T5n,
          n.G5n,
          n.avs,
        ));
    };
    WaitEntityTask_1.WaitEntityTask.Create(a, (e) => {
      e && WaitEntityTask_1.WaitEntityTask.Create(o, t);
    });
  }
  static HandleSceneItemStateActionByServerNotify(r, n, a) {
    ControllerHolder_1.ControllerHolder.LevelGeneralController
      .LevelEventLogOpen &&
      Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "LevelEvent",
        7,
        "执行EntityStateChangeAction，等待创建Entity",
        ["CreatureDataId", n],
        ["PlayerId", r.q5n],
        ["SessionId", r.T5n],
        ["StartIndex", r.G5n],
        ["EndIndex", r.avs],
      ),
      WaitEntityTask_1.WaitEntityTask.Create(
        n,
        (e) => {
          var t;
          e &&
            (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(n)) &&
            (t = e.Entity.GetComponent(119)) &&
            t.BehaviorMap &&
            (t = t.BehaviorMap.get(a)) &&
            (ControllerHolder_1.ControllerHolder.LevelGeneralController
              .LevelEventLogOpen &&
              Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "LevelEvent",
                7,
                "执行EntityStateChangeAction，Entity创建完毕",
                ["CreatureDataId", n],
                ["PlayerId", r.q5n],
                ["SessionId", r.T5n],
                ["StartIndex", r.G5n],
                ["EndIndex", r.avs],
              ),
            ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsByServerNotify(
              t,
              LevelGeneralContextDefine_1.EntityContext.Create(e.Id),
              r.q5n,
              r.T5n,
              r.G5n,
              r.avs,
            ));
        },
        !1,
        LevelGeneralNetworks_1.WAIT_ENTITY_ERROR_TIME,
        !0,
        !0,
      );
  }
  static HandleExploreInteractActionByServerNotify(r, n) {
    WaitEntityTask_1.WaitEntityTask.Create(
      n,
      (e) => {
        var t;
        e &&
          (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(n)) &&
          (t = e.Entity.GetComponent(136)) &&
          (t = t.InteractActions) &&
          ((e = LevelGeneralContextDefine_1.EntityContext.Create(e.Id)),
          ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsByServerNotify(
            t,
            e,
            r.q5n,
            r.T5n,
            r.G5n,
            r.avs,
          ));
      },
      !1,
      LevelGeneralNetworks_1.WAIT_ENTITY_ERROR_TIME,
      !0,
      !0,
    );
  }
  static HandleSceneItemDestructibleActionByServerNotify(r, n) {
    WaitEntityTask_1.WaitEntityTask.Create(
      n,
      (e) => {
        var t;
        e &&
          (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(n)) &&
          (t = e.Entity.GetComponent(92)) &&
          (t = t.DeadActions) &&
          ((e = LevelGeneralContextDefine_1.EntityContext.Create(e.Id)),
          ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsByServerNotify(
            t,
            e,
            r.q5n,
            r.T5n,
            r.G5n,
            r.avs,
          ));
      },
      !1,
      LevelGeneralNetworks_1.WAIT_ENTITY_ERROR_TIME,
      !0,
      !0,
    );
  }
  static HandleTimeTrackControlActionByServerNotify(r, n, a) {
    WaitEntityTask_1.WaitEntityTask.Create(
      n,
      (e) => {
        var t;
        e &&
          (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(n)) &&
          (t = e.Entity.GetComponent(120)) &&
          (t = t.GetTargetActions(a)) &&
          ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsByServerNotify(
            t,
            LevelGeneralContextDefine_1.EntityContext.Create(e.Id),
            r.q5n,
            r.T5n,
            r.G5n,
            r.avs,
          );
      },
      !1,
      LevelGeneralNetworks_1.WAIT_ENTITY_ERROR_TIME,
      !0,
      !0,
    );
  }
  static HandleLifeCycleStageActionByServerNotify(r, n, a) {
    WaitEntityTask_1.WaitEntityTask.Create(
      n,
      (e) => {
        var t;
        e &&
          (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(n)) &&
          (t = e.Entity.GetComponent(119)) &&
          (t = t.GetLifeCycleStageActions(a)) &&
          ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsByServerNotify(
            t,
            LevelGeneralContextDefine_1.EntityContext.Create(e.Id),
            r.q5n,
            r.T5n,
            r.G5n,
            r.avs,
          );
      },
      !1,
      LevelGeneralNetworks_1.WAIT_ENTITY_ERROR_TIME,
      !0,
      !0,
    );
  }
  static HandleTrampleActivateActionByServerNotify(r, n, a) {
    WaitEntityTask_1.WaitEntityTask.Create(
      n,
      (e) => {
        var t;
        e &&
          (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(n)) &&
          (t = e.Entity.GetComponent(138)) &&
          (t = a ? t.ActivateActions : t.DeactivateActions) &&
          ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsByServerNotify(
            t,
            LevelGeneralContextDefine_1.EntityContext.Create(e.Id),
            r.q5n,
            r.T5n,
            r.G5n,
            r.avs,
          );
      },
      !1,
      LevelGeneralNetworks_1.WAIT_ENTITY_ERROR_TIME,
      !0,
      !0,
    );
  }
  static HandleBeamReceiveActionByServerNotify(r, n, a) {
    WaitEntityTask_1.WaitEntityTask.Create(
      n,
      (e) => {
        var t;
        e &&
          (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(n)) &&
          (t = e.Entity.GetComponent(195)) &&
          (t = t.GetBeamReceiveActions(a)) &&
          ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsByServerNotify(
            t,
            LevelGeneralContextDefine_1.EntityContext.Create(e.Id),
            r.q5n,
            r.T5n,
            r.G5n,
            r.avs,
          );
      },
      !1,
      LevelGeneralNetworks_1.WAIT_ENTITY_ERROR_TIME,
      !0,
      !0,
    );
  }
  static HandleSceneItemStateChangeConditionActionByServerNotify(r, n, a, o) {
    WaitEntityTask_1.WaitEntityTask.Create(
      n,
      (e) => {
        var t;
        e &&
          (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(n)) &&
          (t = e.Entity.GetComponent(119)) &&
          (t = t.StateConfig?.StateChangeBehaviors) &&
          (t = t[a].ConditionAction) &&
          ((t = t[o].Action),
          ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsByServerNotify(
            t,
            LevelGeneralContextDefine_1.EntityContext.Create(e.Id),
            r.q5n,
            r.T5n,
            r.G5n,
            r.avs,
          ));
      },
      !1,
      LevelGeneralNetworks_1.WAIT_ENTITY_ERROR_TIME,
      !0,
      !0,
    );
  }
}
exports.SceneItemUtility = SceneItemUtility;
//# sourceMappingURL=SceneItemUtility.js.map
