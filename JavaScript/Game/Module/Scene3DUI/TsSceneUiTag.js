"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const CameraController_1 = require("../../Camera/CameraController");
const Global_1 = require("../../Global");
class TsSceneUiTag extends UE.Actor {
  constructor() {
    super(...arguments),
      (this.SceneUiTag = ""),
      (this.CalculateCamera = !1),
      (this.BindUiTagArray = void 0);
  }
  ReceiveBeginPlay() {}
  ReceiveEndPlay() {}
  CalculateSquaredDistance() {
    const e = CameraController_1.CameraController.Model;
    if (!e) return 0;
    let r = void 0;
    if (this.CalculateCamera) {
      const e = CameraController_1.CameraController.Model;
      if (!e) return 0;
      r = e.CameraTransform;
    } else {
      const t = Global_1.Global.BaseCharacter;
      if (!t) return 0;
      r = t.GetTransform();
    }
    return Vector_1.Vector.Create(
      r.InverseTransformPositionNoScale(this.K2_GetActorLocation()),
    ).SizeSquared();
  }
  CanTick() {
    return this.OnCanTick();
  }
  OnCanTick() {
    return !1;
  }
}
exports.default = TsSceneUiTag;
// # sourceMappingURL=TsSceneUiTag.js.map
