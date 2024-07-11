"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemManipulablePrecastState = void 0);
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const Global_1 = require("../../../Global");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const SceneItemManipulableBaseState_1 = require("./SceneItemManipulableBaseState");
class SceneItemManipulablePrecastState extends SceneItemManipulableBaseState_1.SceneItemManipulableBaseState {
  constructor(e) {
    super(e),
      (this.nCt = 0),
      (this.Rnr = ""),
      (this.Unr = void 0),
      (this.Anr = Vector_1.Vector.Create()),
      (this.StateType = "BePrecasting");
  }
  SetDirection(e) {
    this.nCt = e;
  }
  OnEnter() {
    this.Rnr =
      ConfigManager_1.ConfigManager.ManipulateConfig.ManipulatePrecastLines[
        this.nCt
      ];
  }
  OnTick(e) {
    this.Timer += 1e3 * e;
    var e = ConfigManager_1.ConfigManager.ManipulateConfig.GetPrecastLineValue(
      this.Rnr,
      this.Timer / ConfigManager_1.ConfigManager.ManipulateConfig.PrecastTime,
    );
    const t = Vector_1.Vector.Create();
    const a = Vector_1.Vector.Create();
    const i = this.soi();
    return (
      this.Pnr(),
      this.Unr.Multiply(e.X, t),
      this.Anr.Multiply(e.Z, a),
      a.AdditionEqual(t),
      a.AdditionEqual(i),
      this.SceneItem.ActorComp.SetActorLocation(a.ToUeVector()),
      !0
    );
  }
  soi() {
    var e =
      Global_1.Global.BaseCharacter.CharacterActorComponent.ActorTransform;
    const t = this.SceneItem.UsingAssistantHoldOffset
      ? this.SceneItem.ConfigAssistantHoldOffset
      : this.SceneItem.ConfigHoldOffset;
    var e = e.TransformPositionNoScale(t);
    return Vector_1.Vector.Create(e);
  }
  Pnr() {
    const e = Vector_1.Vector.Create();
    (this.Unr =
      Global_1.Global.BaseCharacter?.CharacterActorComponent?.ActorForwardProxy),
      this.Unr.CrossProduct(Vector_1.Vector.UpVectorProxy, e),
      e.CrossProduct(this.Unr, this.Anr),
      this.Anr.Normalize();
  }
}
exports.SceneItemManipulablePrecastState = SceneItemManipulablePrecastState;
// # sourceMappingURL=SceneItemManipulablePrecastState.js.map
