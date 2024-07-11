"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventPlayerLoockAt = void 0);
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const CameraBlueprintFunctionLibrary_1 = require("../../Camera/CameraBlueprintFunctionLibrary");
const Global_1 = require("../../Global");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventPlayerLoockAt extends LevelGeneralBase_1.LevelEventBase {
  Execute(e, t) {
    var a = parseFloat(e.get("PosX"));
    var r = parseFloat(e.get("PosY"));
    let l = parseFloat(e.get("PosZ"));
    var e = e.get("CameraMove")?.toLowerCase() !== "false";
    var a = Vector_1.Vector.Create(a, r, l);
    var r = Global_1.Global.BaseCharacter;
    r &&
      ((l = r.CharacterActorComponent),
      (r = Vector_1.Vector.Create()),
      a.Subtraction(l.ActorLocationProxy, r),
      (Math.abs(r.X) < MathUtils_1.MathUtils.SmallNumber &&
        Math.abs(r.Y) < MathUtils_1.MathUtils.SmallNumber) ||
        ((r.Z = 0),
        (a = r.ToUeVector().Rotation()),
        l.SetActorRotation(a, "LevelEventPlayerLoockAt", !1),
        l.SetInputRotator(a),
        e && CameraBlueprintFunctionLibrary_1.default.SetCameraRotation(a)));
  }
  ExecuteNew(e, t) {
    let a, r, l;
    e &&
      ((l = e.Pos.X),
      (r = e.Pos.Y),
      (a = e.Pos.Z),
      (e = e.CameraMove),
      (l = Vector_1.Vector.Create(l ?? 0, r ?? 0, a ?? 0)),
      (r = Global_1.Global.BaseCharacter)) &&
      ((a = r.CharacterActorComponent),
      (r = Vector_1.Vector.Create()),
      l.Subtraction(a.ActorLocationProxy, r),
      (Math.abs(r.X) < MathUtils_1.MathUtils.SmallNumber &&
        Math.abs(r.Y) < MathUtils_1.MathUtils.SmallNumber) ||
        ((r.Z = 0),
        (l = r.ToUeVector().Rotation()),
        a.SetActorRotation(l, "LevelEventPlayerLoockAt", !1),
        a.SetInputRotator(l),
        e && CameraBlueprintFunctionLibrary_1.default.SetCameraRotation(l)));
  }
  ExecuteInGm(e, t) {
    this.FinishExecute(!0);
  }
}
exports.LevelEventPlayerLoockAt = LevelEventPlayerLoockAt;
// # sourceMappingURL=LevelEventPlayerLoockAt.js.map
