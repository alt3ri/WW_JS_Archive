"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
const CameraController_1 = require("../../Camera/CameraController");
const TsBaseCharacter_1 = require("../../Character/TsBaseCharacter");
const Global_1 = require("../../Global");
const TsTriggerVolume_1 = require("./TsTriggerVolume");
class TsExploreCameraTriggerVolume extends TsTriggerVolume_1.default {
  constructor() {
    super(...arguments),
      (this.Id = 0),
      (this.LookAtActor1 = void 0),
      (this.LookAtActor2 = void 0),
      (this.PrepTime = -0),
      (this.FadeDistance = -0),
      (this.ArmLengthMin = -0),
      (this.ArmLengthMax = -0);
  }
  OnCollisionEnterFunc(e) {
    let r;
    e instanceof TsBaseCharacter_1.default &&
      Global_1.Global.BaseCharacter === e &&
      (UE.KismetSystemLibrary.IsValid(this.LookAtActor1) &&
      UE.KismetSystemLibrary.IsValid(this.LookAtActor2)
        ? ((e = this.LookAtActor1.K2_GetActorLocation()),
          (r = this.LookAtActor2.K2_GetActorLocation()),
          CameraController_1.CameraController.EnterCameraExplore(
            this.Id,
            e,
            r,
            this.PrepTime,
            this.FadeDistance,
            this.ArmLengthMin,
            this.ArmLengthMax,
          ))
        : CameraController_1.CameraController.EnterCameraExplore(
            this.Id,
            void 0,
            void 0,
            this.PrepTime,
            this.FadeDistance,
            this.ArmLengthMin,
            this.ArmLengthMax,
          ));
  }
  OnCollisionExitFunc(e) {
    e instanceof TsBaseCharacter_1.default &&
      Global_1.Global.BaseCharacter === e &&
      CameraController_1.CameraController.ExitCameraExplore(this.Id);
  }
}
exports.default = TsExploreCameraTriggerVolume;
// # sourceMappingURL=TsExploreCameraTriggerVolume.js.map
