"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiCameraPhotographerStructure = void 0);
const UE = require("ue"),
  ActorSystem_1 = require("../../../../Core/Actor/ActorSystem"),
  CameraController_1 = require("../../../Camera/CameraController"),
  Global_1 = require("../../../Global"),
  GlobalData_1 = require("../../../GlobalData"),
  PhotographDefine_1 = require("../../Photograph/PhotographDefine"),
  UiCameraStructure_1 = require("./UiCameraStructure");
class UiCameraPhotographerStructure extends UiCameraStructure_1.UiCameraStructure {
  constructor() {
    super(...arguments), (this.$Uo = void 0);
  }
  OnSpawnStructureActor() {
    var t = new UE.Transform(
        new UE.Quat(0),
        new UE.Vector(0),
        new UE.Vector(1, 1, 1),
      ),
      r = UE.GameplayStatics.BeginSpawningActorFromClass(
        GlobalData_1.GlobalData.World,
        UE.TsPhotographer_C.StaticClass(),
        t,
      );
    return (
      r?.SetTickableWhenPaused(!0),
      (this.$Uo = UE.GameplayStatics.FinishSpawningActor(r, t)),
      this.$Uo.Initialize(),
      this.$Uo.CameraArm.SetTickableWhenPaused(!0),
      this.$Uo
    );
  }
  OnSetSpringArmComponent() {
    return this.$Uo.CameraArm;
  }
  OnDestroy() {
    this.YUo();
  }
  OnActivate() {
    var t = this.JUo(),
      r = this.DWi(),
      e = Global_1.Global.BaseCharacter,
      r =
        (r.SetIsDitherEffectEnable(!1),
        e.SetDitherEffect(1, 1),
        e.Mesh.GetSocketLocation(PhotographDefine_1.SPAWN_SOCKET_NAME)),
      e = t.GetTransform();
    this.$Uo.SetPlayerSourceLocation(r),
      this.$Uo.SetCameraInitializeTransform(e),
      this.$Uo.ActivateCamera(this.CameraActor);
  }
  OnDeactivate() {
    this.$Uo.DeactivateCamera();
  }
  YUo() {
    this.$Uo?.IsValid() &&
      (this.$Uo.DeactivateCamera(), ActorSystem_1.ActorSystem.Put(this.$Uo)),
      (this.$Uo = void 0);
  }
  DWi() {
    var t = CameraController_1.CameraController.FightCamera;
    if (t) return t.GetComponent(5);
  }
  JUo() {
    var t = CameraController_1.CameraController.FightCamera;
    if (t) {
      t = t.GetComponent(4);
      if (t.Valid) return t.CameraActor;
    }
  }
  SetPlayerSourceLocation(t) {
    this.$Uo.SetPlayerSourceLocation(t);
  }
  SetCameraInitializeTransform(t) {
    this.$Uo.SetCameraInitializeTransform(t);
  }
  GetCameraInitializeTransform() {
    return this.$Uo.GetCameraInitializeTransform();
  }
  SetCameraTransform(t) {
    this.$Uo.SetCameraTransform(t);
  }
  AddCameraArmPitchInput(t) {
    this.$Uo.AddCameraArmPitchInput(t);
  }
  AddCameraArmYawInput(t) {
    this.$Uo.AddCameraArmYawInput(t);
  }
  AddPhotographerYawInput(t) {
    this.$Uo.AddPhotographerYawInput(t);
  }
  AddSourceYawInput(t) {
    this.$Uo.AddSourceYawInput(t);
  }
  AddSourcePitchInput(t) {
    this.$Uo.AddSourcePitchInput(t);
  }
  SetFov(t) {
    this.$Uo.SetFov(t);
  }
  GetFov() {
    return this.$Uo.GetFov();
  }
  ResetCamera() {
    this.$Uo.ResetCamera();
  }
}
exports.UiCameraPhotographerStructure = UiCameraPhotographerStructure;
//# sourceMappingURL=UiCameraPhotographerStructure.js.map
