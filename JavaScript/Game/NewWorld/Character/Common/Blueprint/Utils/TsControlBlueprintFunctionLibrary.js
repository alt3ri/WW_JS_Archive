"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Info_1 = require("../../../../../../Core/Common/Info"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  EntitySystem_1 = require("../../../../../../Core/Entity/EntitySystem"),
  Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
  Global_1 = require("../../../../../Global"),
  tmpVector2D = new UE.Vector2D(),
  tmpVector = Vector_1.Vector.Create();
class TsControlBlueprintFunctionLibrary extends UE.BlueprintFunctionLibrary {
  static GetMoveVectorCache(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 53).GetMoveVectorCache();
    return (tmpVector2D.X = t.X), (tmpVector2D.Y = t.Y), tmpVector2D;
  }
  static GetMoveDirectionCache(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 53).GetMoveDirectionCache();
    return (tmpVector2D.X = t.X), (tmpVector2D.Y = t.Y), tmpVector2D;
  }
  static GetWorldMoveDirectionCache(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(
      t,
      53,
    ).GetWorldMoveDirectionCache();
    return (tmpVector2D.X = t.X), (tmpVector2D.Y = t.Y), tmpVector2D;
  }
  static GetMoveVector(t) {
    return (
      EntitySystem_1.EntitySystem.GetComponent(t, 53).GetMoveVector(tmpVector),
      (tmpVector2D.X = tmpVector.X),
      (tmpVector2D.Y = tmpVector.Y),
      tmpVector2D
    );
  }
  static GetMoveDirection(t) {
    return (
      EntitySystem_1.EntitySystem.GetComponent(t, 53).GetMoveDirection(
        tmpVector,
      ),
      (tmpVector2D.X = tmpVector.X),
      (tmpVector2D.Y = tmpVector.Y),
      tmpVector2D
    );
  }
  static PlayKuroForceFeedback(t, e, o, r, c) {
    Info_1.Info.IsInGamepad() &&
      Global_1.Global.CharacterController &&
      Global_1.Global.CharacterController.PlayKuroForceFeedback(t, e, o, r, c);
  }
  static StopKuroForceFeedback(t, e) {
    Global_1.Global.CharacterController &&
      Global_1.Global.CharacterController.StopKuroForceFeedback(t, e);
  }
  static BpInputReceiveEndPlay(t) {
    t = EntitySystem_1.EntitySystem.Get(t);
    !t ||
      t.IsEnd ||
      UE.KuroStaticLibrary.IsWorldTearingDown(Info_1.Info.World) ||
      (Log_1.Log.CheckError() &&
        Log_1.Log.Error("Test", 6, "Bp Input Destroy at Wrong Time.", [
          "Actor",
          t.GetComponent(3)?.Actor?.GetName(),
        ]));
  }
  static SetUseControllerRotationYaw(t, e) {
    EntitySystem_1.EntitySystem.GetComponent(t, 3).UseControllerRotation = e;
  }
  static SetBpInputComponent(t, e) {
    var o = EntitySystem_1.EntitySystem.GetComponent(t, 53),
      t = EntitySystem_1.EntitySystem.GetComponent(t, 3);
    (o.BpInputComp = e).OwnerActor = t.Actor;
  }
}
exports.default = TsControlBlueprintFunctionLibrary;
//# sourceMappingURL=TsControlBlueprintFunctionLibrary.js.map
