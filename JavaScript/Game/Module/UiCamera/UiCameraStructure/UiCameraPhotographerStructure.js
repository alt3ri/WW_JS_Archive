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
    super(...arguments), (this.zRo = void 0);
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
      (this.zRo = UE.GameplayStatics.FinishSpawningActor(r, t)),
      this.zRo.Initialize(),
      this.zRo.CameraArm.SetTickableWhenPaused(!0),
      this.zRo
    );
  }
  OnSetSpringArmComponent() {
    return this.zRo.CameraArm;
  }
  OnDestroy() {
    this.ZRo();
  }
  OnActivate() {
    var t = this.eUo(),
      r = this.Uji(),
      e = Global_1.Global.BaseCharacter,
      r =
        (r.SetIsDitherEffectEnable(!1),
        e.SetDitherEffect(1, 1),
        e.Mesh.GetSocketLocation(PhotographDefine_1.SPAWN_SOCKET_NAME)),
      e = t.GetTransform();
    this.zRo.SetPlayerSourceLocation(r),
      this.zRo.SetCameraInitializeTransform(e),
      this.zRo.ActivateCamera(this.CameraActor);
  }
  OnDeactivate() {
    this.zRo.DeactivateCamera();
  }
  ZRo() {
    this.zRo?.IsValid() &&
      (this.zRo.DeactivateCamera(), ActorSystem_1.ActorSystem.Put(this.zRo)),
      (this.zRo = void 0);
  }
  Uji() {
    var t = CameraController_1.CameraController.FightCamera;
    if (t) return t.GetComponent(5);
  }
  eUo() {
    var t = CameraController_1.CameraController.FightCamera;
    if (t) {
      t = t.GetComponent(4);
      if (t.Valid) return t.CameraActor;
    }
  }
  SetPlayerSourceLocation(t) {
    this.zRo.SetPlayerSourceLocation(t);
  }
  SetCameraInitializeTransform(t) {
    this.zRo.SetCameraInitializeTransform(t);
  }
  GetCameraInitializeTransform() {
    return this.zRo.GetCameraInitializeTransform();
  }
  SetCameraTransform(t) {
    this.zRo.SetCameraTransform(t);
  }
  AddCameraArmPitchInput(t) {
    this.zRo.AddCameraArmPitchInput(t);
  }
  AddCameraArmYawInput(t) {
    this.zRo.AddCameraArmYawInput(t);
  }
  AddPhotographerYawInput(t) {
    this.zRo.AddPhotographerYawInput(t);
  }
  AddSourceYawInput(t) {
    this.zRo.AddSourceYawInput(t);
  }
  AddSourcePitchInput(t) {
    this.zRo.AddSourcePitchInput(t);
  }
  SetFov(t) {
    this.zRo.SetFov(t);
  }
  GetFov() {
    return this.zRo.GetFov();
  }
  ResetCamera() {
    this.zRo.ResetCamera();
  }
}
exports.UiCameraPhotographerStructure = UiCameraPhotographerStructure;
//# sourceMappingURL=UiCameraPhotographerStructure.js.map
