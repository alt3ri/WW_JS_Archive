"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (e, t, n, r) {
    let i;
    const o = arguments.length;
    let s =
      o < 3 ? t : r === null ? (r = Object.getOwnPropertyDescriptor(t, n)) : r;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      s = Reflect.decorate(e, t, n, r);
    else
      for (let m = e.length - 1; m >= 0; m--)
        (i = e[m]) && (s = (o < 3 ? i(s) : o > 3 ? i(t, n, s) : i(t, n)) || s);
    return o > 3 && s && Object.defineProperty(t, n, s), s;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WidgetCameraDisplayComponent = void 0);
const ActorSystem_1 = require("../../Core/Actor/ActorSystem");
const EntityComponent_1 = require("../../Core/Entity/EntityComponent");
const EventDefine_1 = require("../Common/Event/EventDefine");
const EventSystem_1 = require("../Common/Event/EventSystem");
const CameraController_1 = require("./CameraController");
const RegisterComponent_1 = require("../../Core/Entity/RegisterComponent");
let WidgetCameraDisplayComponent = class WidgetCameraDisplayComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.Vxr = void 0),
      (this.nye = () => {
        (this.Vxr = CameraController_1.CameraController.SpawnCineCamera()),
          CameraController_1.CameraController.Model.CameraMode === 2 &&
            CameraController_1.CameraController.SetViewTarget(
              this.Vxr,
              "WidgetCamera.OnWorldDone",
            );
      }),
      (this.uMe = () => {
        this.Vxr &&
          (ActorSystem_1.ActorSystem.Put(this.Vxr), (this.Vxr = void 0));
      });
  }
  get CineCamera() {
    return this.Vxr;
  }
  OnInit() {
    return (
      (this.Vxr = CameraController_1.CameraController.SpawnCineCamera()),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldDone,
        this.nye,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ClearWorld,
        this.uMe,
      ),
      !!this.Vxr
    );
  }
  OnClear() {
    return (
      this.Vxr &&
        (ActorSystem_1.ActorSystem.Put(this.Vxr), (this.Vxr = void 0)),
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
(WidgetCameraDisplayComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(12)],
  WidgetCameraDisplayComponent,
)),
  (exports.WidgetCameraDisplayComponent = WidgetCameraDisplayComponent);
// # sourceMappingURL=WidgetCameraDisplayComponent.js.map
