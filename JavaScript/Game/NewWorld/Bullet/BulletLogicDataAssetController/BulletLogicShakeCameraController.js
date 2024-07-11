"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletLogicShakeCameraController = void 0);
const UE = require("ue"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  CameraController_1 = require("../../../Camera/CameraController"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  BulletLogicController_1 = require("./BulletLogicController");
class BulletLogicShakeCameraController extends BulletLogicController_1.BulletLogicController {
  constructor(t, e) {
    super(t, e),
      (this.b9o = !1),
      (this.q9o = -0),
      (this.G9o = 0),
      (this.N9o = void 0),
      (this.NeedTick = !0),
      (this.Hte = e.GetComponent(152)),
      (this.O9o = t.Count),
      (this.k9o = t.Interval * TimeUtil_1.TimeUtil.InverseMillisecond),
      ResourceSystem_1.ResourceSystem.LoadAsync(
        this.LogicController.Shake.ToAssetPathName(),
        UE.Class,
        (t) => {
          this.N9o = t;
        },
      );
  }
  Update(t) {
    !this.b9o ||
      this.G9o >= this.O9o ||
      (this.q9o < this.k9o
        ? (this.q9o += t)
        : this.N9o &&
          (CameraController_1.CameraController.PlayWorldCameraShake(
            this.N9o,
            this.Hte.ActorLocation,
            this.LogicController.InnerRadius,
            this.LogicController.OuterRadius,
            this.LogicController.Falloff,
            this.LogicController.OrientShakeTowardsEpicenter,
          ),
          (this.q9o = 0),
          this.G9o++));
  }
  BulletLogicAction() {
    this.N9o &&
      (CameraController_1.CameraController.PlayWorldCameraShake(
        this.N9o,
        this.Hte.ActorLocation,
        this.LogicController.InnerRadius,
        this.LogicController.OuterRadius,
        this.LogicController.Falloff,
        this.LogicController.OrientShakeTowardsEpicenter,
      ),
      (this.b9o = !0),
      (this.q9o = 0),
      (this.G9o = 1));
  }
}
exports.BulletLogicShakeCameraController = BulletLogicShakeCameraController;
//# sourceMappingURL=BulletLogicShakeCameraController.js.map
