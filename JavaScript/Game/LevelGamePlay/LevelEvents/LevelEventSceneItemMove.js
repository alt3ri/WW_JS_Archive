"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventSceneItemMove = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventSceneItemMove extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments),
      (this.OPt = void 0),
      (this.CRe = void 0),
      (this.nIn = (e) => {
        e.GetComponent(116)?.RemoveStopMoveCallbackWithEntity(this.nIn),
          EventSystem_1.EventSystem.HasWithTarget(
            e,
            EventDefine_1.EEventName.OnSceneItemMoveEventBroken,
            this.nIn,
          ) &&
            EventSystem_1.EventSystem.RemoveWithTarget(
              e,
              EventDefine_1.EEventName.OnSceneItemMoveEventBroken,
              this.nIn,
            ),
          this.FinishExecute(!0);
      });
  }
  ExecuteInGm(e, t) {
    if (e) {
      var i = e.EntityId;
      if (
        ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(i)?.Valid
      )
        return void this.ExecuteNew(e, t);
    }
    this.FinishExecute(!0);
  }
  ExecuteNew(e, t) {
    e
      ? ((this.OPt = e), this.CreateWaitEntityTask(this.OPt.EntityId))
      : (Log_1.Log.CheckError() && Log_1.Log.Error("Event", 34, "参数配置错误"),
        this.FinishExecute(!1));
  }
  ExecuteWhenEntitiesReady() {
    if (this.OPt) {
      var e = this.OPt.EntityId,
        t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e);
      if (t?.Valid) {
        var i = t.Entity.GetComponent(116);
        switch (((this.CRe = i), this.OPt.MoveConfig.Type)) {
          case IAction_1.EMoveSceneItemType.MoveToPoint:
            this.sIn(this.OPt, t);
            break;
          case IAction_1.EMoveSceneItemType.CycleMoveToPoints:
            this.aIn(this.OPt, t);
        }
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Event", 34, "实体不合法", ["entityId", e]),
          this.FinishExecute(!1);
    }
  }
  sIn(e, t) {
    var i,
      n = e.MoveConfig;
    n &&
      (this.CRe?.Valid
        ? (e.StopBeforeMove &&
            (this.CRe.StopMove(),
            EventSystem_1.EventSystem.EmitWithTarget(
              t.Entity,
              EventDefine_1.EEventName.OnSceneItemMoveEventBroken,
              t.Entity,
            )),
          EventSystem_1.EventSystem.AddWithTarget(
            t.Entity,
            EventDefine_1.EEventName.OnSceneItemMoveEventBroken,
            this.nIn,
          ),
          (i = [
            Vector_1.Vector.Create(t.Entity.GetComponent(1).ActorLocationProxy),
            n.Point,
          ]),
          (n = n.MoveMotion ?? {
            Type: IAction_1.EMoveMotion.UniformMotion,
            Time: 0,
          }),
          ControllerHolder_1.ControllerHolder.SceneItemMoveController.AddSceneItemMove(
            t.Entity,
            i,
            !1,
            n,
            0,
          ),
          this.IsAsync
            ? this.FinishExecute(!0)
            : (this.CRe.ClearStopMoveCallbackWithEntity(),
              this.CRe.AddStopMoveCallbackWithEntity(this.nIn)))
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error("Event", 32, "Entity找不到SceneItemMoveComponent", [
              "entityId",
              e.EntityId,
            ]),
          this.FinishExecute(!1)));
  }
  aIn(e, t) {
    var i = e.MoveConfig;
    i &&
      (this.CRe?.Valid
        ? (e.StopBeforeMove &&
            (this.CRe.StopMove(),
            EventSystem_1.EventSystem.EmitWithTarget(
              t.Entity,
              EventDefine_1.EEventName.OnSceneItemMoveEventBroken,
              t.Entity,
            )),
          EventSystem_1.EventSystem.AddWithTarget(
            t.Entity,
            EventDefine_1.EEventName.OnSceneItemMoveEventBroken,
            this.nIn,
          ),
          ControllerHolder_1.ControllerHolder.SceneItemMoveController.AddSceneItemMove(
            t.Entity,
            i.Points,
            i.IsLoop ?? !1,
            i.MoveMotion,
            i.StopTime,
          ),
          this.IsAsync
            ? this.FinishExecute(!0)
            : (this.CRe.ClearStopMoveCallbackWithEntity(),
              this.CRe.AddStopMoveCallbackWithEntity(this.nIn)))
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error("Event", 32, "Entity找不到SceneItemMoveComponent", [
              "entityId",
              e.EntityId,
            ]),
          this.FinishExecute(!1)));
  }
  OnReset() {
    (this.CRe = void 0), (this.OPt = void 0);
  }
}
exports.LevelEventSceneItemMove = LevelEventSceneItemMove;
//# sourceMappingURL=LevelEventSceneItemMove.js.map
