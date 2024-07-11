"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemManipulablePrecastState = void 0);
const Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  Global_1 = require("../../../Global"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  SceneItemManipulableBaseState_1 = require("./SceneItemManipulableBaseState");
class SceneItemManipulablePrecastState extends SceneItemManipulableBaseState_1.SceneItemManipulableBaseState {
  constructor(e) {
    super(e),
      (this.fgt = 0),
      (this.Tsr = ""),
      (this.Lsr = void 0),
      (this.Dsr = Vector_1.Vector.Create()),
      (this.StateType = "BePrecasting");
  }
  SetDirection(e) {
    this.fgt = e;
  }
  OnEnter() {
    this.Tsr =
      ConfigManager_1.ConfigManager.ManipulateConfig.ManipulatePrecastLines[
        this.fgt
      ];
  }
  OnTick(e) {
    this.Timer += 1e3 * e;
    var e = ConfigManager_1.ConfigManager.ManipulateConfig.GetPrecastLineValue(
        this.Tsr,
        this.Timer / ConfigManager_1.ConfigManager.ManipulateConfig.PrecastTime,
      ),
      t = Vector_1.Vector.Create(),
      a = Vector_1.Vector.Create(),
      i = this.ari();
    return (
      this.Rsr(),
      this.Lsr.Multiply(e.X, t),
      this.Dsr.Multiply(e.Z, a),
      a.AdditionEqual(t),
      a.AdditionEqual(i),
      this.SceneItem.ActorComp.SetActorLocation(a.ToUeVector()),
      !0
    );
  }
  ari() {
    var e =
        Global_1.Global.BaseCharacter.CharacterActorComponent.ActorTransform,
      t = this.SceneItem.UsingAssistantHoldOffset
        ? this.SceneItem.ConfigAssistantHoldOffset
        : this.SceneItem.ConfigHoldOffset,
      e = e.TransformPositionNoScale(t);
    return Vector_1.Vector.Create(e);
  }
  Rsr() {
    var e = Vector_1.Vector.Create();
    (this.Lsr =
      Global_1.Global.BaseCharacter?.CharacterActorComponent?.ActorForwardProxy),
      this.Lsr.CrossProduct(Vector_1.Vector.UpVectorProxy, e),
      e.CrossProduct(this.Lsr, this.Dsr),
      this.Dsr.Normalize();
  }
}
exports.SceneItemManipulablePrecastState = SceneItemManipulablePrecastState;
//# sourceMappingURL=SceneItemManipulablePrecastState.js.map
