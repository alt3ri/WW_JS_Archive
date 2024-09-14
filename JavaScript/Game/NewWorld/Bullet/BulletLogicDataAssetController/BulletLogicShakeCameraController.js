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
      (this.x7o = !1),
      (this.w7o = -0),
      (this.B7o = 0),
      (this.b7o = void 0),
      (this.NeedTick = !0),
      (this.Hte = e.GetComponent(155)),
      (this.q7o = t.Count),
      (this.G7o = t.Interval * TimeUtil_1.TimeUtil.InverseMillisecond),
      ResourceSystem_1.ResourceSystem.LoadAsync(
        this.LogicController.Shake.ToAssetPathName(),
        UE.Class,
        (t) => {
          this.b7o = t;
        },
      );
  }
  Update(t) {
    !this.x7o ||
      this.B7o >= this.q7o ||
      (this.w7o < this.G7o
        ? (this.w7o += t)
        : this.b7o &&
          (CameraController_1.CameraController.PlayWorldCameraShake(
            this.b7o,
            this.Hte.ActorLocation,
            this.LogicController.InnerRadius,
            this.LogicController.OuterRadius,
            this.LogicController.Falloff,
            this.LogicController.OrientShakeTowardsEpicenter,
          ),
          (this.w7o = 0),
          this.B7o++));
  }
  BulletLogicAction() {
    this.b7o &&
      (CameraController_1.CameraController.PlayWorldCameraShake(
        this.b7o,
        this.Hte.ActorLocation,
        this.LogicController.InnerRadius,
        this.LogicController.OuterRadius,
        this.LogicController.Falloff,
        this.LogicController.OrientShakeTowardsEpicenter,
      ),
      (this.x7o = !0),
      (this.w7o = 0),
      (this.B7o = 1));
  }
}
exports.BulletLogicShakeCameraController = BulletLogicShakeCameraController;
//# sourceMappingURL=BulletLogicShakeCameraController.js.map
