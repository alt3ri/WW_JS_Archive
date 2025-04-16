"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, o, t, i) {
    var _,
      E = arguments.length,
      n =
        E < 3
          ? o
          : null === i
            ? (i = Object.getOwnPropertyDescriptor(o, t))
            : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      n = Reflect.decorate(e, o, t, i);
    else
      for (var r = e.length - 1; 0 <= r; r--)
        (_ = e[r]) && (n = (E < 3 ? _(n) : 3 < E ? _(o, t, n) : _(o, t)) || n);
    return 3 < E && n && Object.defineProperty(o, t, n), n;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GongduolaAudioComponent = void 0);
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem"),
  Log_1 = require("../../../../Core/Common/Log"),
  RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  IAction_1 = require("../../../../UniverseEditor/Interface/IAction"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  VehicleAudioComponent_1 = require("../Common/VehicleAudioComponent"),
  VEHICLE_MOVE_EVENT = "play_interactive_gongduola_move",
  MAX_VEHICLE_SPEED_RTPC_PARAM = 50,
  CHANGE_VEHICLE_SPEED_TOLERENCE = 50,
  VEHICLE_MOVE_SPEED_MAPPING = 100;
let GongduolaAudioComponent = class GongduolaAudioComponent extends VehicleAudioComponent_1.VehicleAudioComponent {
  constructor() {
    super(...arguments),
      (this.OnVehicleBeenEntered = (e) => {
        ModelManager_1.ModelManager.GameAudioModel.GondolaGetOnAudioEvent(
          this.Entity,
        ),
          e.IsNpcPassenger() &&
            ModelManager_1.ModelManager.GameAudioModel?.CheckRideSharingState() &&
            ModelManager_1.ModelManager.GameAudioModel.PlayRideSharingPlotAudio(
              IAction_1.EGondolaVoiceTriggeredType.InviteRole,
            );
      }),
      (this.OnVehicleBeenLeaved = (e) => {
        ModelManager_1.ModelManager.GameAudioModel.GondolaGetOnAudioEvent(
          this.Entity,
        );
      }),
      (this.TEn = 0),
      (this.B2l = 0);
  }
  UpdateVehicleMoveSound(e, o) {
    (Math.abs(this.TEn - e) < CHANGE_VEHICLE_SPEED_TOLERENCE &&
      (0 === this.TEn || 0 !== e)) ||
      ((this.TEn = e),
      AudioSystem_1.AudioSystem.SetRtpcValue(
        "vehicle_speed",
        MathUtils_1.MathUtils.Clamp(
          e / VEHICLE_MOVE_SPEED_MAPPING,
          0,
          MAX_VEHICLE_SPEED_RTPC_PARAM,
        ),
        { Actor: o },
      ),
      0 === e
        ? this.q2l(o)
        : 0 === this.B2l &&
          ((this.B2l = AudioSystem_1.AudioSystem.PostEvent(
            VEHICLE_MOVE_EVENT,
            o,
          )),
          Log_1.Log.CheckDebug()) &&
          Log_1.Log.Debug(
            "Audio",
            42,
            "[Vehicle.Audio] PostEvent 开启水花音效",
            ["EntityId", this.Entity.Id],
            ["Owner", o.GetName()],
            ["Name", VEHICLE_MOVE_EVENT],
          ));
  }
  q2l(e) {
    0 !== this.B2l &&
      (AudioSystem_1.AudioSystem.ExecuteAction(this.B2l, 0),
      (this.B2l = 0),
      Log_1.Log.CheckDebug()) &&
      Log_1.Log.Debug(
        "Audio",
        42,
        "[Vehicle.Audio] PostEvent 停止水花音效",
        ["EntityId", this.Entity.Id],
        ["Owner", e.GetName()],
        ["Name", VEHICLE_MOVE_EVENT],
      );
  }
};
(GongduolaAudioComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(267)],
  GongduolaAudioComponent,
)),
  (exports.GongduolaAudioComponent = GongduolaAudioComponent);
//# sourceMappingURL=GongduolaAudioComponent.js.map
