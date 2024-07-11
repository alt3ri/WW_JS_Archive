"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemUtility = void 0);
const Log_1 = require("../../../../Core/Common/Log");
const LevelGeneralContextDefine_1 = require("../../../LevelGamePlay/LevelGeneralContextDefine");
const LevelGeneralController_1 = require("../../../LevelGamePlay/LevelGeneralController");
const LevelGeneralNetworks_1 = require("../../../LevelGamePlay/LevelGeneralNetworks");
const ModelManager_1 = require("../../../Manager/ModelManager");
const WaitEntityTask_1 = require("../../../World/Define/WaitEntityTask");
const CharacterController_1 = require("../../Character/CharacterController");
const TsBaseItem_1 = require("../BaseItem/TsBaseItem");
class SceneItemUtility {
  static GetBaseItemActor(e) {
    e = CharacterController_1.CharacterController.GetActorByEntity(e);
    if (e && e instanceof TsBaseItem_1.default) return e;
  }
  static HandleTriggerStateActionByServerNotify(n, a, l) {
    LevelGeneralController_1.LevelGeneralController.LevelEventLogOpen &&
      Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "LevelEvent",
        7,
        "执行EntityTriggerAction，等待创建Entity",
        ["CreatureDataId", a],
        ["PlayerId", n.aFn],
        ["SessionId", n.Ykn],
        ["StartIndex", n.hFn],
        ["EndIndex", n.Wms],
      );
    const t = () => {
      let e;
      let t;
      let r = ModelManager_1.ModelManager.CreatureModel.GetEntity(a);
      r &&
        (r = r.Entity.GetComponent(75)) &&
        (e = r.Actions) &&
        ((t = ModelManager_1.ModelManager.CreatureModel.GetEntity(l)) ||
          (Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "LevelEvent",
              40,
              "执行EntityTriggerAction，未找到otherEntity，仍然触发行为",
            )),
        LevelGeneralController_1.LevelGeneralController.LevelEventLogOpen &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "LevelEvent",
            7,
            "执行EntityTriggerAction，Entity创建完毕",
            ["CreatureDataId", a],
            ["otherCreatureDataId", l],
            ["PlayerId", n.aFn],
            ["SessionId", n.Ykn],
            ["StartIndex", n.hFn],
            ["EndIndex", n.Wms],
          ),
        LevelGeneralController_1.LevelGeneralController.ExecuteActionsByServerNotify(
          e,
          r.CreateTriggerContext(t?.Id ?? 0),
          n.aFn,
          n.Ykn,
          n.hFn,
          n.Wms,
        ));
    };
    WaitEntityTask_1.WaitEntityTask.Create(a, (e) => {
      e && WaitEntityTask_1.WaitEntityTask.Create(l, t);
    });
  }
  static HandleExitTriggerStateActionByServerNotify(n, a, l) {
    LevelGeneralController_1.LevelGeneralController.LevelEventLogOpen &&
      Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "LevelEvent",
        7,
        "执行EntityTriggerAction，等待创建Entity",
        ["CreatureDataId", a],
        ["CreatureDataId", a],
        ["PlayerId", n.aFn],
        ["SessionId", n.Ykn],
        ["StartIndex", n.hFn],
        ["EndIndex", n.Wms],
      );
    const t = () => {
      let e;
      let t;
      let r = ModelManager_1.ModelManager.CreatureModel.GetEntity(a);
      r &&
        (r = r.Entity.GetComponent(75)) &&
        (e = r.ExitActions) &&
        ((t = ModelManager_1.ModelManager.CreatureModel.GetEntity(l)) ||
          (Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "LevelEvent",
              40,
              "执行EntityTriggerAction，未找到otherEntity，仍然触发行为",
            )),
        LevelGeneralController_1.LevelGeneralController.LevelEventLogOpen &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "LevelEvent",
            7,
            "执行EntityTriggerAction，Entity创建完毕",
            ["CreatureDataId", a],
            ["PlayerId", n.aFn],
            ["SessionId", n.Ykn],
            ["StartIndex", n.hFn],
            ["EndIndex", n.Wms],
          ),
        LevelGeneralController_1.LevelGeneralController.ExecuteActionsByServerNotify(
          e,
          r.CreateTriggerContext(t?.Id ?? 0),
          n.aFn,
          n.Ykn,
          n.hFn,
          n.Wms,
        ));
    };
    WaitEntityTask_1.WaitEntityTask.Create(a, (e) => {
      e && WaitEntityTask_1.WaitEntityTask.Create(l, t);
    });
  }
  static HandleSceneItemStateActionByServerNotify(r, n, a) {
    LevelGeneralController_1.LevelGeneralController.LevelEventLogOpen &&
      Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "LevelEvent",
        7,
        "执行EntityStateChangeAction，等待创建Entity",
        ["CreatureDataId", n],
        ["PlayerId", r.aFn],
        ["SessionId", r.Ykn],
        ["StartIndex", r.hFn],
        ["EndIndex", r.Wms],
      ),
      WaitEntityTask_1.WaitEntityTask.Create(
        n,
        (e) => {
          let t;
          e &&
            (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(n)) &&
            (t = e.Entity.GetComponent(117)) &&
            t.BehaviorMap &&
            (t = t.BehaviorMap.get(a)) &&
            (LevelGeneralController_1.LevelGeneralController
              .LevelEventLogOpen &&
              Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "LevelEvent",
                7,
                "执行EntityStateChangeAction，Entity创建完毕",
                ["CreatureDataId", n],
                ["PlayerId", r.aFn],
                ["SessionId", r.Ykn],
                ["StartIndex", r.hFn],
                ["EndIndex", r.Wms],
              ),
            LevelGeneralController_1.LevelGeneralController.ExecuteActionsByServerNotify(
              t,
              LevelGeneralContextDefine_1.EntityContext.Create(e.Id),
              r.aFn,
              r.Ykn,
              r.hFn,
              r.Wms,
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
        let t;
        e &&
          (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(n)) &&
          (t = e.Entity.GetComponent(134)) &&
          (t = t.InteractActions) &&
          ((e = LevelGeneralContextDefine_1.EntityContext.Create(e.Id)),
          LevelGeneralController_1.LevelGeneralController.ExecuteActionsByServerNotify(
            t,
            e,
            r.aFn,
            r.Ykn,
            r.hFn,
            r.Wms,
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
        let t;
        e &&
          (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(n)) &&
          (t = e.Entity.GetComponent(90)) &&
          (t = t.DeadActions) &&
          ((e = LevelGeneralContextDefine_1.EntityContext.Create(e.Id)),
          LevelGeneralController_1.LevelGeneralController.ExecuteActionsByServerNotify(
            t,
            e,
            r.aFn,
            r.Ykn,
            r.hFn,
            r.Wms,
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
        let t;
        e &&
          (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(n)) &&
          (t = e.Entity.GetComponent(118)) &&
          (t = t.GetTargetActions(a)) &&
          LevelGeneralController_1.LevelGeneralController.ExecuteActionsByServerNotify(
            t,
            LevelGeneralContextDefine_1.EntityContext.Create(e.Id),
            r.aFn,
            r.Ykn,
            r.hFn,
            r.Wms,
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
        let t;
        e &&
          (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(n)) &&
          (t = e.Entity.GetComponent(117)) &&
          (t = t.GetLifeCycleStageActions(a)) &&
          LevelGeneralController_1.LevelGeneralController.ExecuteActionsByServerNotify(
            t,
            LevelGeneralContextDefine_1.EntityContext.Create(e.Id),
            r.aFn,
            r.Ykn,
            r.hFn,
            r.Wms,
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
        let t;
        e &&
          (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(n)) &&
          (t = e.Entity.GetComponent(190)) &&
          (t = t.GetBeamReceiveActions(a)) &&
          LevelGeneralController_1.LevelGeneralController.ExecuteActionsByServerNotify(
            t,
            LevelGeneralContextDefine_1.EntityContext.Create(e.Id),
            r.aFn,
            r.Ykn,
            r.hFn,
            r.Wms,
          );
      },
      !1,
      LevelGeneralNetworks_1.WAIT_ENTITY_ERROR_TIME,
      !0,
      !0,
    );
  }
  static HandleSceneItemStateChangeConditionActionByServerNotify(r, n, a, l) {
    WaitEntityTask_1.WaitEntityTask.Create(
      n,
      (e) => {
        let t;
        e &&
          (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(n)) &&
          (t = e.Entity.GetComponent(117)) &&
          (t = t.StateConfig?.StateChangeBehaviors) &&
          (t = t[a].ConditionAction) &&
          ((t = t[l].Action),
          LevelGeneralController_1.LevelGeneralController.ExecuteActionsByServerNotify(
            t,
            LevelGeneralContextDefine_1.EntityContext.Create(e.Id),
            r.aFn,
            r.Ykn,
            r.hFn,
            r.Wms,
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
// # sourceMappingURL=SceneItemUtility.js.map
