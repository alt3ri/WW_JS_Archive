"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, n, r) {
    var o,
      a = arguments.length,
      i =
        a < 3
          ? t
          : null === r
            ? (r = Object.getOwnPropertyDescriptor(t, n))
            : r;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      i = Reflect.decorate(e, t, n, r);
    else
      for (var s = e.length - 1; 0 <= s; s--)
        (o = e[s]) && (i = (a < 3 ? o(i) : 3 < a ? o(t, n, i) : o(t, n)) || i);
    return 3 < a && i && Object.defineProperty(t, n, i), i;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SequenceCameraDisplayComponent = void 0);
const ActorSystem_1 = require("../../Core/Actor/ActorSystem"),
  Log_1 = require("../../Core/Common/Log"),
  EntityComponent_1 = require("../../Core/Entity/EntityComponent"),
  EventDefine_1 = require("../Common/Event/EventDefine"),
  EventSystem_1 = require("../Common/Event/EventSystem"),
  CameraController_1 = require("./CameraController"),
  RegisterComponent_1 = require("../../Core/Entity/RegisterComponent");
let SequenceCameraDisplayComponent = class SequenceCameraDisplayComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.pxr = void 0),
      (this.nye = () => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Camera", 58, "[SequenceCamera] Spawn OnWorldDone"),
          (this.pxr = CameraController_1.CameraController.SpawnCineCamera()),
          1 === CameraController_1.CameraController.Model.CameraMode &&
            CameraController_1.CameraController.SetViewTarget(
              this.pxr,
              "SequenceCamera.OnWorldDone",
            );
      }),
      (this.uMe = () => {
        this.pxr &&
          (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Camera",
              58,
              "[SequenceCamera] Clear OnClearWorld",
            ),
          ActorSystem_1.ActorSystem.Put(this.pxr),
          (this.pxr = void 0));
      });
  }
  get CineCamera() {
    return (
      this.pxr?.IsValid() ||
        ((this.pxr = CameraController_1.CameraController.SpawnCineCamera()),
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Camera", 58, "[SequenceCamera] 保底生成CineCamera")),
      this.pxr
    );
  }
  OnInit() {
    return (
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Camera", 58, "[SequenceCamera] Spawn OnInit"),
      (this.pxr = CameraController_1.CameraController.SpawnCineCamera()),
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
      this.pxr &&
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Camera", 58, "[SequenceCamera] Clear OnClear"),
        ActorSystem_1.ActorSystem.Put(this.pxr),
        (this.pxr = void 0)),
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
    this.pxr?.IsValid() && (this.pxr.CustomTimeDilation = e);
  }
};
(SequenceCameraDisplayComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(9)],
  SequenceCameraDisplayComponent,
)),
  (exports.SequenceCameraDisplayComponent = SequenceCameraDisplayComponent);
//# sourceMappingURL=SequenceCameraDisplayComponent.js.map
