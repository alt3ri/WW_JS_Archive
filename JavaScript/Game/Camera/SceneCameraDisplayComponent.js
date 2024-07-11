"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, i, r) {
    var n,
      s = arguments.length,
      a =
        s < 3
          ? t
          : null === r
            ? (r = Object.getOwnPropertyDescriptor(t, i))
            : r;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      a = Reflect.decorate(e, t, i, r);
    else
      for (var o = e.length - 1; 0 <= o; o--)
        (n = e[o]) && (a = (s < 3 ? n(a) : 3 < s ? n(t, i, a) : n(t, i)) || a);
    return 3 < s && a && Object.defineProperty(t, i, a), a;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneCameraDisplayComponent = exports.SceneSubCamera = void 0);
const UE = require("ue"),
  ActorSystem_1 = require("../../Core/Actor/ActorSystem"),
  Log_1 = require("../../Core/Common/Log"),
  PriorityQueue_1 = require("../../Core/Container/PriorityQueue"),
  EntityComponent_1 = require("../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../Core/Entity/RegisterComponent"),
  EventDefine_1 = require("../Common/Event/EventDefine"),
  EventSystem_1 = require("../Common/Event/EventSystem"),
  GlobalData_1 = require("../GlobalData"),
  ModelManager_1 = require("../Manager/ModelManager"),
  UiLayerType_1 = require("../Ui/Define/UiLayerType"),
  InputDistributeController_1 = require("../Ui/InputDistribute/InputDistributeController"),
  InputDistributeDefine_1 = require("../Ui/InputDistribute/InputDistributeDefine"),
  UiLayer_1 = require("../Ui/UiLayer"),
  CameraController_1 = require("./CameraController");
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
  return 0 === i && i--, i;
};
let SceneCameraDisplayComponent = class SceneCameraDisplayComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.uxr = void 0),
      (this.cxr = void 0),
      (this.mxr = void 0),
      (this.dxr = void 0),
      (this.Cxr = 0),
      (this.OnModeChanged = (e, t) => {
        3 === e && this.IsIdle()
          ? (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Camera",
                46,
                "SceneCameraDisplayComponent退出Scene相机",
              ),
            CameraController_1.CameraController.ExitCameraMode(
              3,
              1,
              0,
              0,
              () => {
                UE.KismetSystemLibrary.ExecuteConsoleCommand(
                  GlobalData_1.GlobalData.World,
                  "r.Shadow.EnableCSMStable 1",
                );
              },
            ),
            this.ClearRemovedSceneCamera())
          : 3 === t && e !== t && this.ClearRemovedSceneCamera();
      }),
      (this.nye = () => {
        (this.dxr.Camera =
          CameraController_1.CameraController.SpawnCineCamera()),
          (this.uxr = this.dxr.Camera),
          3 === CameraController_1.CameraController.Model.CameraMode &&
            CameraController_1.CameraController.SetViewTarget(
              this.uxr,
              "SceneCamera.OnWorldDone",
            );
      }),
      (this.uMe = () => {
        this.dxr &&
          (ActorSystem_1.ActorSystem.Put(this.uxr),
          (this.dxr.Camera = void 0),
          (this.uxr = void 0)),
          (this.Cxr = 0),
          this.ClearRemovedSceneCamera();
      });
  }
  get CineCamera() {
    return this.cxr.Top.Camera;
  }
  get CurSceneSubCamera() {
    return this.cxr?.Top;
  }
  get DefaultSceneSubCamera() {
    return this.dxr;
  }
  OnInit() {
    return (
      (this.cxr = new PriorityQueue_1.PriorityQueue(SceneSubCamera.Compare)),
      (this.mxr = new Array()),
      (this.dxr = new SceneSubCamera()),
      (this.dxr.Camera = CameraController_1.CameraController.SpawnCineCamera()),
      (this.dxr.Type = 2),
      this.cxr.Push(this.dxr),
      (this.uxr = this.dxr.Camera),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldDone,
        this.nye,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ClearWorld,
        this.uMe,
      ),
      this.Ore(),
      !!this.uxr
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
      this.uxr &&
        (ActorSystem_1.ActorSystem.Put(this.uxr), (this.uxr = void 0)),
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
    this.uxr?.IsValid() && (this.uxr.CustomTimeDilation = e);
  }
  GetUnBoundSceneCamera(e) {
    var t;
    if (!this.cxr.Empty)
      return this.dxr.IsBinding
        ? (((t = new SceneSubCamera()).Camera =
            CameraController_1.CameraController.SpawnCineCamera()),
          (t.Type = e),
          this.cxr.Push(t),
          t)
        : (this.gxr(),
          (this.dxr.Type = e),
          (this.dxr.IsBinding = !0),
          this.cxr.Update(this.dxr),
          this.dxr);
  }
  RemoveBoundSceneCamera(e) {
    !this.cxr.Empty &&
      e &&
      ((e.IsBinding = !1),
      this.dxr === e
        ? (this.gxr(), this.cxr.Update(this.dxr))
        : (this.cxr.Remove(e),
          this.mxr.push(e),
          this.IsIdle() && this.dxr.CopyData(e)));
  }
  IsIdle() {
    return !this.cxr.Empty && this.cxr.Top === this.dxr && !this.dxr.IsBinding;
  }
  ClearRemovedSceneCamera() {
    for (const e of this.mxr) e.Clear();
    this.mxr.length = 0;
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
  gxr() {
    (this.dxr.IsBinding = !1),
      (this.dxr.Camera.CameraComponent.bConstrainAspectRatio = !1),
      (this.dxr.Type = 2),
      (this.dxr.IsKeepUi = !0);
  }
  SetUiActive(e) {
    e ? 0 < this.Cxr && this.Cxr-- : this.Cxr++,
      (0 !== this.Cxr && e) ||
        (1 < this.Cxr && !e) ||
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
//# sourceMappingURL=SceneCameraDisplayComponent.js.map
