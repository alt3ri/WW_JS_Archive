"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AnimalMoveToController = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  AiContollerLibrary_1 = require("../../../../AI/Controller/AiContollerLibrary"),
  GravityUtils_1 = require("../../../../Utils/GravityUtils"),
  CharacterNameDefines_1 = require("../../Common/CharacterNameDefines"),
  CharacterUnifiedStateTypes_1 = require("../../Common/Component/Abilities/CharacterUnifiedStateTypes"),
  DISTANCE_ERROR_THRESHOLD = 100,
  MAX_TURN_SPEED = 360;
class AnimalMoveToController {
  constructor(t) {
    (this.tu = CharacterUnifiedStateTypes_1.ECharMoveState.Other),
      (this.ZWo = !1),
      (this.eKo = !1),
      (this.tKo = void 0),
      (this.iKo = 0),
      (this.oKo = 0),
      (this.IC = !1),
      (this.rKo = !1),
      (this.jye = Vector_1.Vector.Create()),
      (this.nKo = 0),
      (this.Hte = t.GetComponent(3)),
      UE.KuroStaticLibrary.IsObjectClassByName(
        this.Hte.Owner,
        CharacterNameDefines_1.CharacterNameDefines.BP_BASEANIMAL,
      )
        ? (this.sKo = this.Hte.Owner.TurnSpeedCurve)
        : (this.sKo = void 0),
      (this.mBe = t.GetComponent(91)),
      (this.Gce = t.GetComponent(163)),
      (this.aKo = this.Gce.CharacterMovement.MaxAcceleration);
  }
  Init(t, i) {
    (this.tu = t), this.mBe.SetMoveState(t), (this.ZWo = i), (this.IC = !0);
  }
  Start(t, i, s, e = DISTANCE_ERROR_THRESHOLD) {
    this.IC &&
      ((this.eKo = i),
      (this.oKo = s),
      (this.nKo = e),
      (this.rKo = !1),
      this.tu !== CharacterUnifiedStateTypes_1.ECharMoveState.NormalSwim ||
        this.ZWo ||
        (this.Gce.CharacterMovement.MaxAcceleration = this.aKo),
      this.tKo ? (this.tKo.length = 0) : (this.tKo = new Array()),
      this.eKo
        ? AiContollerLibrary_1.AiControllerLibrary.NavigationFindPath(
            this.Hte.Owner.GetWorld(),
            this.Hte.ActorLocation,
            t.ToUeVector(),
            this.tKo,
          )
          ? (this.iKo = 1)
          : ((i = Vector_1.Vector.Create()).DeepCopy(t),
            this.tKo.push(i),
            (this.iKo = 0))
        : ((s = Vector_1.Vector.Create()).DeepCopy(t),
          this.tKo.push(s),
          (this.iKo = 0)));
  }
  Update(t) {
    var i;
    return this.rKo
      ? 2
      : (i = this.tKo[this.iKo]).ContainsNaN()
        ? (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Animal",
              30,
              "AnimalMoveToController Update Next Has NaN",
              ["Next", i],
            ),
          2)
        : (i.Subtraction(this.Hte.ActorLocationProxy, this.jye),
          GravityUtils_1.GravityUtils.ConvertToPlanarVector(this.Hte, this.jye),
          this.jye.Size() < this.nKo
            ? this.iKo === this.tKo.length - 1
              ? 1
              : (this.iKo++, 0)
            : (this.jye.Normalize(),
              i.ContainsNaN()
                ? (Log_1.Log.CheckDebug() &&
                    Log_1.Log.Debug(
                      "Animal",
                      30,
                      "AnimalMoveToController Update Input Direct Has NaN",
                      ["Input Direct", this.jye],
                    ),
                  2)
                : (this.hKo(this.jye), 0)));
  }
  Stop() {
    this.rKo = !0;
  }
  Finish() {
    this.tu !== CharacterUnifiedStateTypes_1.ECharMoveState.NormalSwim ||
      this.ZWo ||
      (this.Hte?.ClearInput(),
      (this.Gce.CharacterMovement.MaxAcceleration =
        MathUtils_1.MathUtils.MaxFloat)),
      (this.IC = !1);
  }
  hKo(t) {
    this.Hte.SetInputDirect(t);
    let i = this.oKo;
    var s;
    this.sKo &&
      ((s =
        MathUtils_1.MathUtils.GetAngleByVectorDot(
          this.Hte.ActorForwardProxy,
          t,
        ) * MathUtils_1.MathUtils.DegToRad),
      (s = this.sKo.GetFloatValue(s)),
      (i = MathUtils_1.MathUtils.Lerp(this.oKo, MAX_TURN_SPEED, s))),
      AiContollerLibrary_1.AiControllerLibrary.TurnToDirect(this.Hte, t, i, !1);
  }
}
exports.AnimalMoveToController = AnimalMoveToController;
//# sourceMappingURL=AnimalMoveToController.js.map
