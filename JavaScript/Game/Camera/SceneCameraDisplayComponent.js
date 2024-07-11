"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (e, t, i, r) {
    let s;
    const n = arguments.length;
    let o =
      n < 3 ? t : r === null ? (r = Object.getOwnPropertyDescriptor(t, i)) : r;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      o = Reflect.decorate(e, t, i, r);
    else
      for (let a = e.length - 1; a >= 0; a--)
        (s = e[a]) && (o = (n < 3 ? s(o) : n > 3 ? s(t, i, o) : s(t, i)) || o);
    return n > 3 && o && Object.defineProperty(t, i, o), o;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneCameraDisplayComponent = exports.SceneSubCamera = void 0);
const UE = require("ue");
const ActorSystem_1 = require("../../Core/Actor/ActorSystem");
const PriorityQueue_1 = require("../../Core/Container/PriorityQueue");
const EntityComponent_1 = require("../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../Core/Entity/RegisterComponent");
const EventDefine_1 = require("../Common/Event/EventDefine");
const EventSystem_1 = require("../Common/Event/EventSystem");
const ModelManager_1 = require("../Manager/ModelManager");
const UiLayerType_1 = require("../Ui/Define/UiLayerType");
const InputDistributeController_1 = require("../Ui/InputDistribute/InputDistributeController");
const InputDistributeDefine_1 = require("../Ui/InputDistribute/InputDistributeDefine");
const UiLayer_1 = require("../Ui/UiLayer");
const CameraController_1 = require("./CameraController");
class SceneSubCamera {
  constructor() {
    (this.Type = 2),
      (this.Camera = void 0),
      (this.FadeIn = -0),
      (this.FadeOut = -0),
      (this.IsBinding = !1),
      (this.IsKeepUi = !1);
  }
  Clear() {
    this.Camera?.IsValid() &&
      (ActorSystem_1.ActorSystem.Put(this.Camera), (this.Camera = void 0));
  }
  CopyData(e) {
    e?.Camera?.IsValid() &&
      (this.Camera.K2_SetActorTransform(
        new UE.Transform(
          e.Camera.K2_GetActorRotation(),
          e.Camera.K2_GetActorLocation(),
          new UE.Vector(1, 1, 1),
        ),
        !1,
        void 0,
        !0,
      ),
      (this.FadeIn = e.FadeIn),
      (this.FadeOut = e.FadeOut),
      (this.IsKeepUi = e.IsKeepUi));
  }
}
(exports.SceneSubCamera = SceneSubCamera).Compare = (e, t) => {
  let i = e.Type - t.Type;
  return i === 0 && i--, i;
};
let SceneCameraDisplayComponent = class SceneCameraDisplayComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.bxr = void 0),
      (this.qxr = void 0),
      (this.Gxr = void 0),
      (this.Nxr = void 0),
      (this.Oxr = 0),
      (this.OnModeChanged = (e, t) => {
        e === 3 && this.IsIdle()
          ? (CameraController_1.CameraController.ExitCameraMode(3, 1, 0, 0),
            this.ClearRemovedSceneCamera())
          : t === 3 && e !== t && this.ClearRemovedSceneCamera();
      }),
      (this.nye = () => {
        (this.Nxr.Camera =
          CameraController_1.CameraController.SpawnCineCamera()),
          (this.bxr = this.Nxr.Camera),
          CameraController_1.CameraController.Model.CameraMode === 3 &&
            CameraController_1.CameraController.SetViewTarget(
              this.bxr,
              "SceneCamera.OnWorldDone",
            );
      }),
      (this.uMe = () => {
        this.Nxr &&
          (ActorSystem_1.ActorSystem.Put(this.bxr),
          (this.Nxr.Camera = void 0),
          (this.bxr = void 0)),
          (this.Oxr = 0),
          this.ClearRemovedSceneCamera();
      });
  }
  get CineCamera() {
    return this.qxr.Top.Camera;
  }
  get CurSceneSubCamera() {
    return this.qxr?.Top;
  }
  get DefaultSceneSubCamera() {
    return this.Nxr;
  }
  OnInit() {
    return (
      (this.qxr = new PriorityQueue_1.PriorityQueue(SceneSubCamera.Compare)),
      (this.Gxr = new Array()),
      (this.Nxr = new SceneSubCamera()),
      (this.Nxr.Camera = CameraController_1.CameraController.SpawnCineCamera()),
      (this.Nxr.Type = 2),
      this.qxr.Push(this.Nxr),
      (this.bxr = this.Nxr.Camera),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldDone,
        this.nye,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ClearWorld,
        this.uMe,
      ),
      this.Ore(),
      !!this.bxr
    );
  }
  Ore() {
    EventSystem_1.EventSystem.Has(
      EventDefine_1.EEventName.CameraModeChanged,
      this.OnModeChanged,
    ) ||
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CameraModeChanged,
        this.OnModeChanged,
      );
  }
  kre() {
    EventSystem_1.EventSystem.Has(
      EventDefine_1.EEventName.CameraModeChanged,
      this.OnModeChanged,
    ) &&
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CameraModeChanged,
        this.OnModeChanged,
      );
  }
  OnClear() {
    return (
      this.bxr &&
        (ActorSystem_1.ActorSystem.Put(this.bxr), (this.bxr = void 0)),
      this.kre(),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldDone,
        this.nye,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ClearWorld,
        this.uMe,
      ),
      !0
    );
  }
  OnChangeTimeDilation(e) {
    this.bxr?.IsValid() && (this.bxr.CustomTimeDilation = e);
  }
  GetUnBoundSceneCamera(e) {
    let t;
    if (!this.qxr.Empty)
      return this.Nxr.IsBinding
        ? (((t = new SceneSubCamera()).Camera =
            CameraController_1.CameraController.SpawnCineCamera()),
          (t.Type = e),
          this.qxr.Push(t),
          t)
        : (this.kxr(),
          (this.Nxr.Type = e),
          (this.Nxr.IsBinding = !0),
          this.qxr.Update(this.Nxr),
          this.Nxr);
  }
  RemoveBoundSceneCamera(e) {
    !this.qxr.Empty &&
      e &&
      ((e.IsBinding = !1),
      this.Nxr === e
        ? (this.kxr(), this.qxr.Update(this.Nxr))
        : (this.qxr.Remove(e),
          this.Gxr.push(e),
          this.IsIdle() && this.Nxr.CopyData(e)));
  }
  IsIdle() {
    return !this.qxr.Empty && this.qxr.Top === this.Nxr && !this.Nxr.IsBinding;
  }
  ClearRemovedSceneCamera() {
    for (const e of this.Gxr) e.Clear();
    this.Gxr.length = 0;
  }
  UpdateViewTarget(e) {
    void 0 !== e
      ? CameraController_1.CameraController.SetViewTarget(
          this.CurSceneSubCamera.Camera,
          "SceneCamera.UpdateViewTarget",
          e,
          0,
          void 0,
          !0,
          !0,
        )
      : CameraController_1.CameraController.SetViewTarget(
          this.CurSceneSubCamera.Camera,
          "SceneCamera.UpdateViewTarget2",
          this.CurSceneSubCamera.FadeIn,
          0,
          void 0,
          !0,
          !0,
        );
  }
  kxr() {
    (this.Nxr.IsBinding = !1),
      (this.Nxr.Camera.CameraComponent.bConstrainAspectRatio = !1),
      (this.Nxr.Type = 2),
      (this.Nxr.IsKeepUi = !0);
  }
  SetUiActive(e) {
    e ? this.Oxr > 0 && this.Oxr-- : this.Oxr++,
      (this.Oxr !== 0 && e) ||
        (this.Oxr > 1 && !e) ||
        (UiLayer_1.UiLayer.SetLayerActive(UiLayerType_1.ELayerType.Pop, e),
        UiLayer_1.UiLayer.SetLayerActive(UiLayerType_1.ELayerType.Float, e),
        e
          ? (ModelManager_1.ModelManager.BattleUiModel.ChildViewData.ShowBattleView(
              2,
            ),
            ModelManager_1.ModelManager.InputDistributeModel.RemoveInputDistributeTag(
              InputDistributeDefine_1.inputDistributeTagDefine.BlockAllInputTag,
            ),
            InputDistributeController_1.InputDistributeController.RefreshInputTag())
          : (ModelManager_1.ModelManager.BattleUiModel.ChildViewData.HideBattleView(
              2,
            ),
            ModelManager_1.ModelManager.InputDistributeModel.SetInputDistributeTag(
              InputDistributeDefine_1.inputDistributeTagDefine.BlockAllInputTag,
            )));
  }
};
(SceneCameraDisplayComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(7)],
  SceneCameraDisplayComponent,
)),
  (exports.SceneCameraDisplayComponent = SceneCameraDisplayComponent);
// # sourceMappingURL=SceneCameraDisplayComponent.js.map
