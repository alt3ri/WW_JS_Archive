"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventPlayerLoockAt = void 0);
const Quat_1 = require("../../../Core/Utils/Math/Quat"),
  Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  CameraBlueprintFunctionLibrary_1 = require("../../Camera/CameraBlueprintFunctionLibrary"),
  Global_1 = require("../../Global"),
  LevelGeneralBase_1 = require("../LevelGeneralBase"),
  tmpVector = Vector_1.Vector.Create(),
  tmpQuat = Quat_1.Quat.Create(),
  tmpRotator = Rotator_1.Rotator.Create();
class LevelEventPlayerLoockAt extends LevelGeneralBase_1.LevelEventBase {
  Execute(t, e) {
    var r = parseFloat(t.get("PosX")),
      a = parseFloat(t.get("PosY")),
      o = parseFloat(t.get("PosZ")),
      t = "false" !== t.get("CameraMove")?.toLowerCase(),
      r = Vector_1.Vector.Create(r, a, o),
      a = Global_1.Global.BaseCharacter;
    a &&
      ((o = a.CharacterActorComponent),
      r.Subtraction(o.ActorLocationProxy, tmpVector),
      MathUtils_1.MathUtils.LookRotationUpFirst(
        tmpVector,
        o.ActorUpProxy,
        tmpQuat,
      ),
      tmpQuat.IsNearZero() ||
        (tmpQuat.Rotator(tmpRotator),
        o.SetActorRotation(
          tmpRotator.ToUeRotator(),
          "LevelEventPlayerLoockAt",
          !1,
        ),
        o.SetInputRotator(tmpRotator),
        t &&
          CameraBlueprintFunctionLibrary_1.default.SetCameraRotation(
            tmpRotator.ToUeRotator(),
          )));
  }
  ExecuteNew(t, e) {
    var r, a, o;
    t &&
      ((r = t.Pos.X),
      (a = t.Pos.Y),
      (o = t.Pos.Z),
      (t = t.CameraMove),
      (r = Vector_1.Vector.Create(r ?? 0, a ?? 0, o ?? 0)),
      (a = Global_1.Global.BaseCharacter)) &&
      ((o = a.CharacterActorComponent),
      r.Subtraction(o.ActorLocationProxy, tmpVector),
      MathUtils_1.MathUtils.LookRotationUpFirst(
        tmpVector,
        o.ActorUpProxy,
        tmpQuat,
      ),
      tmpQuat.IsNearZero() ||
        (tmpQuat.Rotator(tmpRotator),
        o.SetActorRotation(
          tmpRotator.ToUeRotator(),
          "LevelEventPlayerLoockAt",
          !1,
        ),
        o.SetInputRotator(tmpRotator),
        t &&
          CameraBlueprintFunctionLibrary_1.default.SetCameraRotation(
            tmpRotator.ToUeRotator(),
          )));
  }
  ExecuteInGm(t, e) {
    this.FinishExecute(!0);
  }
}
exports.LevelEventPlayerLoockAt = LevelEventPlayerLoockAt;
//# sourceMappingURL=LevelEventPlayerLoockAt.js.map
