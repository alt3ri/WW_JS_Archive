"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  CameraController_1 = require("../../Camera/CameraController"),
  TsBaseCharacter_1 = require("../../Character/TsBaseCharacter"),
  Global_1 = require("../../Global"),
  TsTriggerVolume_1 = require("./TsTriggerVolume");
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
  Constructor() {
    super.Constructor();
  }
  OnCollisionEnterFunc(r) {
    var e;
    r instanceof TsBaseCharacter_1.default &&
      Global_1.Global.BaseCharacter === r &&
      (UE.KismetSystemLibrary.IsValid(this.LookAtActor1) &&
      UE.KismetSystemLibrary.IsValid(this.LookAtActor2)
        ? ((r = this.LookAtActor1.D_K2_GetActorLocation()),
          (e = this.LookAtActor2.D_K2_GetActorLocation()),
          CameraController_1.CameraController.EnterCameraExplore(
            this.Id,
            r,
            e,
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
  OnCollisionExitFunc(r) {
    r instanceof TsBaseCharacter_1.default &&
      Global_1.Global.BaseCharacter === r &&
      CameraController_1.CameraController.ExitCameraExplore(this.Id);
  }
}
exports.default = TsExploreCameraTriggerVolume;
//# sourceMappingURL=TsExploreCameraTriggerVolume.js.map
