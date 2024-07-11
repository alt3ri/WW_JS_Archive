"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (e, t, n, r) {
    let o;
    const i = arguments.length;
    let s =
      i < 3 ? t : r === null ? (r = Object.getOwnPropertyDescriptor(t, n)) : r;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      s = Reflect.decorate(e, t, n, r);
    else
      for (let a = e.length - 1; a >= 0; a--)
        (o = e[a]) && (s = (i < 3 ? o(s) : i > 3 ? o(t, n, s) : o(t, n)) || s);
    return i > 3 && s && Object.defineProperty(t, n, s), s;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FightCameraDisplayComponent = void 0);
const ActorSystem_1 = require("../../Core/Actor/ActorSystem");
const EntityComponent_1 = require("../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../Core/Entity/RegisterComponent");
const EventDefine_1 = require("../Common/Event/EventDefine");
const EventSystem_1 = require("../Common/Event/EventSystem");
const ModelManager_1 = require("../Manager/ModelManager");
const CameraController_1 = require("./CameraController");
let FightCameraDisplayComponent = class FightCameraDisplayComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.bPr = void 0),
      (this.nye = () => {
        ModelManager_1.ModelManager.SeamlessTravelModel.IsSeamlessTravel
          ? CameraController_1.CameraController.ReturnLockOnCameraMode(0)
          : ((this.bPr =
              CameraController_1.CameraController.SpawnCameraActor()),
            CameraController_1.CameraController.Model.CameraMode === 0 &&
              CameraController_1.CameraController.SetViewTarget(
                this.bPr,
                "FightCamera.OnWorldDone",
              ));
      }),
      (this.uMe = () => {
        ModelManager_1.ModelManager.SeamlessTravelModel.IsSeamlessTravel
          ? CameraController_1.CameraController.ReturnLockOnCameraMode(0)
          : this.bPr &&
            (ActorSystem_1.ActorSystem.Put(this.bPr), (this.bPr = void 0));
      });
  }
  get CameraActor() {
    return this.bPr;
  }
  OnInit() {
    return (
      (this.bPr = CameraController_1.CameraController.SpawnCameraActor()),
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
      this.bPr &&
        (ActorSystem_1.ActorSystem.Put(this.bPr), (this.bPr = void 0)),
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
    this.bPr?.IsValid() && (this.bPr.CustomTimeDilation = e);
  }
};
(FightCameraDisplayComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(4)],
  FightCameraDisplayComponent,
)),
  (exports.FightCameraDisplayComponent = FightCameraDisplayComponent);
// # sourceMappingURL=FightCameraDisplayComponent.js.map
