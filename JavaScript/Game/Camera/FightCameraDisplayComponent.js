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
  (exports.FightCameraDisplayComponent = void 0);
const ActorSystem_1 = require("../../Core/Actor/ActorSystem"),
  EntityComponent_1 = require("../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../Core/Entity/RegisterComponent"),
  EventDefine_1 = require("../Common/Event/EventDefine"),
  EventSystem_1 = require("../Common/Event/EventSystem"),
  ModelManager_1 = require("../Manager/ModelManager"),
  CameraController_1 = require("./CameraController");
let FightCameraDisplayComponent = class FightCameraDisplayComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.uPr = void 0),
      (this.nye = () => {
        ModelManager_1.ModelManager.SeamlessTravelModel.IsSeamlessTravel
          ? CameraController_1.CameraController.ReturnLockOnCameraMode(0)
          : ((this.uPr =
              CameraController_1.CameraController.SpawnCameraActor()),
            0 === CameraController_1.CameraController.Model.CameraMode &&
              CameraController_1.CameraController.SetViewTarget(
                this.uPr,
                "FightCamera.OnWorldDone",
              ));
      }),
      (this.uMe = () => {
        ModelManager_1.ModelManager.SeamlessTravelModel.IsSeamlessTravel
          ? CameraController_1.CameraController.ReturnLockOnCameraMode(0)
          : this.uPr &&
            (ActorSystem_1.ActorSystem.Put(this.uPr), (this.uPr = void 0));
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
      !0
    );
  }
  OnClear() {
    return (
      this.uPr &&
        (ActorSystem_1.ActorSystem.Put(this.uPr), (this.uPr = void 0)),
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
(FightCameraDisplayComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(4)],
  FightCameraDisplayComponent,
)),
  (exports.FightCameraDisplayComponent = FightCameraDisplayComponent);
//# sourceMappingURL=FightCameraDisplayComponent.js.map
