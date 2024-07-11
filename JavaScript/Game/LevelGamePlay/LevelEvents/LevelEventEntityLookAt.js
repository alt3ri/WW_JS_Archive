"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventEntityLookAt = void 0);
const Log_1 = require("../../../Core/Common/Log");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const ObjectUtils_1 = require("../../../Core/Utils/ObjectUtils");
const AiContollerLibrary_1 = require("../../AI/Controller/AiContollerLibrary");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
const TURN_SPEED = 200;
const TOLERANCE = 10;
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
    let e;
    let t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
      this.pDe.EntityId,
    );
    t
      ? ((e = (this.sDe = t).Entity.GetComponent(3)),
        (t = t.Entity.GetComponent(36)?.CharacterMovement),
        ObjectUtils_1.ObjectUtils.IsValid(t)
          ? ((this.WTe = t.MovementMode),
            (t.MovementMode = 1),
            (t = Vector_1.Vector.Create(
              this.pDe.Pos.X ?? 0,
              this.pDe.Pos.Y ?? 0,
              this.pDe.Pos.Z ?? 0,
            )),
            AiContollerLibrary_1.AiControllerLibrary.TurnToTarget(
              e,
              t,
              TURN_SPEED,
            ),
            this.IsAsync ? this.FinishExecute(!0) : (this.vDe = !0))
          : this.FinishExecute(!1))
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("LevelEvent", 27, "执行转向动作时实体不存在:", [
            "PbDataId",
            this.pDe.EntityId,
          ]),
        this.FinishExecute(!0));
  }
  OnTick(e) {
    let t;
    this.vDe &&
      (this.sDe?.IsInit
        ? (t = this.sDe.Entity?.GetComponent(3)).InputRotatorProxy.Equals(
            t.ActorRotationProxy,
            TOLERANCE,
          ) &&
          ((t.Entity.GetComponent(36).CharacterMovement.MovementMode =
            this.WTe),
          this.FinishExecute(!0))
        : this.FinishExecute(!0));
  }
  OnReset() {
    (this.sDe = void 0), (this.vDe = !1), (this.WTe = 0);
  }
}
exports.LevelEventEntityLookAt = LevelEventEntityLookAt;
// # sourceMappingURL=LevelEventEntityLookAt.js.map
