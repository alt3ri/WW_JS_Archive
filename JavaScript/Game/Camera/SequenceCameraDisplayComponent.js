"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (e, t, n, r) {
    let o;
    const a = arguments.length;
    let i =
      a < 3 ? t : r === null ? (r = Object.getOwnPropertyDescriptor(t, n)) : r;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      i = Reflect.decorate(e, t, n, r);
    else
      for (let s = e.length - 1; s >= 0; s--)
        (o = e[s]) && (i = (a < 3 ? o(i) : a > 3 ? o(t, n, i) : o(t, n)) || i);
    return a > 3 && i && Object.defineProperty(t, n, i), i;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SequenceCameraDisplayComponent = void 0);
const ActorSystem_1 = require("../../Core/Actor/ActorSystem");
const Log_1 = require("../../Core/Common/Log");
const EntityComponent_1 = require("../../Core/Entity/EntityComponent");
const EventDefine_1 = require("../Common/Event/EventDefine");
const EventSystem_1 = require("../Common/Event/EventSystem");
const CameraController_1 = require("./CameraController");
const RegisterComponent_1 = require("../../Core/Entity/RegisterComponent");
let SequenceCameraDisplayComponent = class SequenceCameraDisplayComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.Vxr = void 0),
      (this.nye = () => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Camera", 58, "[SequenceCamera] Spawn OnWorldDone"),
          (this.Vxr = CameraController_1.CameraController.SpawnCineCamera()),
          CameraController_1.CameraController.Model.CameraMode === 1 &&
            CameraController_1.CameraController.SetViewTarget(
              this.Vxr,
              "SequenceCamera.OnWorldDone",
            );
      }),
      (this.uMe = () => {
        this.Vxr &&
          (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Camera",
              58,
              "[SequenceCamera] Clear OnClearWorld",
            ),
          ActorSystem_1.ActorSystem.Put(this.Vxr),
          (this.Vxr = void 0));
      });
  }
  get CineCamera() {
    return (
      this.Vxr?.IsValid() ||
        ((this.Vxr = CameraController_1.CameraController.SpawnCineCamera()),
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Camera", 58, "[SequenceCamera] 保底生成CineCamera")),
      this.Vxr
    );
  }
  OnInit() {
    return (
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Camera", 58, "[SequenceCamera] Spawn OnInit"),
      (this.Vxr = CameraController_1.CameraController.SpawnCineCamera()),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldDone,
        this.nye,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ClearWorld,
        this.uMe,
      ),
      !0
    );
  }
  OnClear() {
    return (
      this.Vxr &&
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Camera", 58, "[SequenceCamera] Clear OnClear"),
        ActorSystem_1.ActorSystem.Put(this.Vxr),
        (this.Vxr = void 0)),
      EventSystem_1.EventSystem.Has(
        EventDefine_1.EEventName.WorldDone,
        this.nye,
      ) &&
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.WorldDone,
          this.nye,
        ),
      EventSystem_1.EventSystem.Has(
        EventDefine_1.EEventName.ClearWorld,
        this.uMe,
      ) &&
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.ClearWorld,
          this.uMe,
        ),
      !0
    );
  }
  OnChangeTimeDilation(e) {
    this.Vxr?.IsValid() && (this.Vxr.CustomTimeDilation = e);
  }
};
(SequenceCameraDisplayComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(9)],
  SequenceCameraDisplayComponent,
)),
  (exports.SequenceCameraDisplayComponent = SequenceCameraDisplayComponent);
// # sourceMappingURL=SequenceCameraDisplayComponent.js.map
