"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, n, r) {
    var o,
      i = arguments.length,
      s =
        i < 3
          ? t
          : null === r
            ? (r = Object.getOwnPropertyDescriptor(t, n))
            : r;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      s = Reflect.decorate(e, t, n, r);
    else
      for (var a = e.length - 1; 0 <= a; a--)
        (o = e[a]) && (s = (i < 3 ? o(s) : 3 < i ? o(t, n, s) : o(t, n)) || s);
    return 3 < i && s && Object.defineProperty(t, n, s), s;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FreeCameraDisplayComponent = void 0);
const ActorSystem_1 = require("../../Core/Actor/ActorSystem"),
  EntityComponent_1 = require("../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../Core/Entity/RegisterComponent"),
  EventDefine_1 = require("../Common/Event/EventDefine"),
  EventSystem_1 = require("../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../Manager/ControllerHolder"),
  ModelManager_1 = require("../Manager/ModelManager");
let FreeCameraDisplayComponent = class FreeCameraDisplayComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.uPr = void 0),
      (this.nye = () => {
        this.Bt1();
      }),
      (this.uMe = () => {
        this.uPr &&
          (ActorSystem_1.ActorSystem.Put(
            "FreeCameraDisplayComponent.OnClearWorld",
            this.uPr,
          ),
          (this.uPr = void 0));
      });
  }
  get CameraActor() {
    return this.uPr;
  }
  OnInit() {
    return (
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldDone,
        this.nye,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ClearWorld,
        this.uMe,
      ),
      ModelManager_1.ModelManager.GameModeModel.WorldDone && this.Bt1(),
      !0
    );
  }
  Bt1() {
    this.uPr ||
      ((this.uPr =
        ControllerHolder_1.ControllerHolder.CameraController.SpawnCameraActor()),
      (this.uPr.CustomTimeDilation = this.TimeDilation),
      5 ===
        ControllerHolder_1.ControllerHolder.CameraController.Model.CameraMode &&
        ControllerHolder_1.ControllerHolder.CameraController.SetViewTarget(
          this.uPr,
          "FreeCamera.OnWorldDone",
        ));
  }
  OnClear() {
    return (
      this.uPr &&
        (ActorSystem_1.ActorSystem.Put(
          "FreeCameraDisplayComponent.OnClear",
          this.uPr,
        ),
        (this.uPr = void 0)),
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
    this.uPr?.IsValid() && (this.uPr.CustomTimeDilation = e);
  }
};
(FreeCameraDisplayComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(282)],
  FreeCameraDisplayComponent,
)),
  (exports.FreeCameraDisplayComponent = FreeCameraDisplayComponent);
//# sourceMappingURL=FreeCameraDisplayComponent.js.map
