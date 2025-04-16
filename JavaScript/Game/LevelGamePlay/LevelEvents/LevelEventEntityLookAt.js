"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventEntityLookAt = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  ObjectUtils_1 = require("../../../Core/Utils/ObjectUtils"),
  AiContollerLibrary_1 = require("../../AI/Controller/AiContollerLibrary"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase"),
  TURN_SPEED = 200,
  TOLERANCE = 10;
class LevelEventEntityLookAt extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments),
      (this.sDe = void 0),
      (this.pDe = void 0),
      (this.vDe = !1),
      (this.WTe = 0);
  }
  ExecuteNew(e, t) {
    e
      ? ((this.pDe = e),
        (this.vDe = !1),
        this.CreateWaitEntityTask(this.pDe.EntityId))
      : this.FinishExecute(!1);
  }
  ExecuteInGm(e, t) {
    this.FinishExecute(!0);
  }
  ExecuteWhenEntitiesReady() {
    var e,
      t,
      i,
      r,
      o = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
        this.pDe.EntityId,
      );
    o
      ? ((e = (this.sDe = o).Entity.GetComponent(3)),
        (i = o.Entity.GetComponent(44)?.CharacterMovement),
        ObjectUtils_1.ObjectUtils.IsValid(i)
          ? ((this.WTe = i.MovementMode),
            (i.MovementMode = 1),
            (i = Vector_1.Vector.Create(
              this.pDe.Pos.X ?? 0,
              this.pDe.Pos.Y ?? 0,
              this.pDe.Pos.Z ?? 0,
            )),
            AiContollerLibrary_1.AiControllerLibrary.TurnToTarget(
              e,
              i,
              TURN_SPEED,
            ),
            (r = Vector_1.Vector.Create()),
            (t = Rotator_1.Rotator.Create()),
            i.Subtraction(e.ActorLocationProxy, r),
            r.ToOrientationRotator(t),
            (t.Pitch = 0),
            (t.Roll = 0),
            (i = Protocol_1.Aki.Protocol.ecs.create()),
            ((r = Protocol_1.Aki.Protocol.Zks.create()).F4n = o.CreatureDataId),
            (r.P5n = e.ActorLocationProxy),
            (r.g8n = t),
            (i.iVn = [r]),
            Net_1.Net.Send(17177, i),
            this.IsAsync ? this.FinishExecute(!0) : (this.vDe = !0))
          : this.FinishExecute(!1))
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("LevelEvent", 26, "执行转向动作时实体不存在:", [
            "PbDataId",
            this.pDe.EntityId,
          ]),
        this.FinishExecute(!0));
  }
  OnTick(e) {
    var t;
    this.vDe &&
      (this.sDe?.IsInit
        ? (t = this.sDe.Entity?.GetComponent(3)).InputRotatorProxy.Equals(
            t.ActorRotationProxy,
            TOLERANCE,
          ) &&
          ((t.Entity.GetComponent(44).CharacterMovement.MovementMode =
            this.WTe),
          this.FinishExecute(!0))
        : this.FinishExecute(!0));
  }
  OnReset() {
    (this.sDe = void 0), (this.vDe = !1), (this.WTe = 0);
  }
}
exports.LevelEventEntityLookAt = LevelEventEntityLookAt;
//# sourceMappingURL=LevelEventEntityLookAt.js.map
