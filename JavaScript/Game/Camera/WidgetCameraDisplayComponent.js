"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, n, r) {
    var i,
      o = arguments.length,
      s =
        o < 3
          ? t
          : null === r
            ? (r = Object.getOwnPropertyDescriptor(t, n))
            : r;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      s = Reflect.decorate(e, t, n, r);
    else
      for (var m = e.length - 1; 0 <= m; m--)
        (i = e[m]) && (s = (o < 3 ? i(s) : 3 < o ? i(t, n, s) : i(t, n)) || s);
    return 3 < o && s && Object.defineProperty(t, n, s), s;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WidgetCameraDisplayComponent = void 0);
const ActorSystem_1 = require("../../Core/Actor/ActorSystem"),
  EntityComponent_1 = require("../../Core/Entity/EntityComponent"),
  EventDefine_1 = require("../Common/Event/EventDefine"),
  EventSystem_1 = require("../Common/Event/EventSystem"),
  CameraController_1 = require("./CameraController"),
  RegisterComponent_1 = require("../../Core/Entity/RegisterComponent");
let WidgetCameraDisplayComponent = class WidgetCameraDisplayComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.pxr = void 0),
      (this.nye = () => {
        (this.pxr = CameraController_1.CameraController.SpawnCineCamera()),
          2 === CameraController_1.CameraController.Model.CameraMode &&
            CameraController_1.CameraController.SetViewTarget(
              this.pxr,
              "WidgetCamera.OnWorldDone",
            );
      }),
      (this.uMe = () => {
        this.pxr &&
          (ActorSystem_1.ActorSystem.Put(this.pxr), (this.pxr = void 0));
      });
  }
  get CineCamera() {
    return this.pxr;
  }
  OnInit() {
    return (
      (this.pxr = CameraController_1.CameraController.SpawnCineCamera()),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldDone,
        this.nye,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ClearWorld,
        this.uMe,
      ),
      !!this.pxr
    );
  }
  OnClear() {
    return (
      this.pxr &&
        (ActorSystem_1.ActorSystem.Put(this.pxr), (this.pxr = void 0)),
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
(WidgetCameraDisplayComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(12)],
  WidgetCameraDisplayComponent,
)),
  (exports.WidgetCameraDisplayComponent = WidgetCameraDisplayComponent);
//# sourceMappingURL=WidgetCameraDisplayComponent.js.map
