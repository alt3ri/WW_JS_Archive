"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, s, i) {
    var n,
      o = arguments.length,
      r =
        o < 3
          ? t
          : null === i
            ? (i = Object.getOwnPropertyDescriptor(t, s))
            : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      r = Reflect.decorate(e, t, s, i);
    else
      for (var h = e.length - 1; 0 <= h; h--)
        (n = e[h]) && (r = (o < 3 ? n(r) : 3 < o ? n(t, s, r) : n(t, s)) || r);
    return 3 < o && r && Object.defineProperty(t, s, r), r;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VehicleTagComponent = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  BaseTagComponent_1 = require("../../Common/Component/BaseTagComponent");
let VehicleTagComponent = class VehicleTagComponent extends BaseTagComponent_1.BaseTagComponent {
  constructor() {
    super(...arguments),
      (this.ActorComp = void 0),
      (this.PerformComp = void 0),
      (this.PassengerTagMap = new Map()),
      (this.OnEnterVehicle = (e) => {
        var t;
        e.PassengerEntity &&
          (this.PassengerTagMap.has(e.PassengerEntity)
            ? ((t = e.PassengerEntity.GetComponent(0)?.GetPbDataId()),
              Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Vehicle",
                  50,
                  "上次离开载具时Tag未清理",
                  [
                    "VehiclePbDataId",
                    this.ActorComp?.CreatureData.GetPbDataId(),
                  ],
                  ["PassengerId", t],
                  ["Tags", this.PassengerTagMap.get(e.PassengerEntity)],
                ),
              this.RemoveAllTagsForPassenger(e.PassengerEntity))
            : (this.PassengerTagMap.size ||
                this.AddEnterVehicleTagsForVehicle(),
              this.PassengerTagMap.set(e.PassengerEntity, new Set()),
              this.AddEnterVehicleTagsForPassenger(e.PassengerEntity)));
      }),
      (this.OnLeaveVehicle = (e) => {
        e.PassengerEntity &&
          (this.RemoveAllTagsForPassenger(e.PassengerEntity),
          this.PassengerTagMap.size || this.RemoveEnterVehicleTagsForVehicle());
      });
  }
  OnStart() {
    return (
      super.OnStart(),
      (this.ActorComp = this.Entity.GetComponent(1)),
      (this.PerformComp = this.Entity.GetComponent(230)),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.OnVehicleBeenEntered,
        this.OnEnterVehicle,
      ),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.OnVehicleBeenLeaved,
        this.OnLeaveVehicle,
      ),
      !0
    );
  }
  OnActivate() {
    super.OnActivate();
  }
  OnEnd() {
    for (const e of this.PassengerTagMap.keys())
      this.RemoveAllTagsForPassenger(e);
    return (
      super.OnEnd(),
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.OnVehicleBeenEntered,
        this.OnEnterVehicle,
      ),
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.OnVehicleBeenLeaved,
        this.OnLeaveVehicle,
      ),
      !0
    );
  }
  OnClear() {
    return super.OnClear(), !0;
  }
  AddEnterVehicleTagsForPassenger(e) {
    if (this.PerformComp?.Config)
      for (const t of this.PerformComp.Config.PassengerEnterTags)
        this.AddTagForPassenger(e, 1, t);
  }
  AddEnterVehicleTagsForVehicle() {
    if (
      this.PerformComp?.Config &&
      1 === this.PerformComp.PassengerInfoMap.size
    )
      for (const e of this.PerformComp.Config.VehicleEnterTags) this.AddTag(e);
  }
  RemoveEnterVehicleTagsForVehicle() {
    if (
      this.PerformComp?.Config &&
      1 === this.PerformComp.PassengerInfoMap.size
    )
      for (const e of this.PerformComp.Config.VehicleEnterTags)
        this.RemoveTag(e);
  }
  AddTagForPassenger(e, t, s) {
    e &&
      this.PassengerTagMap.has(e) &&
      (e.GetComponent(203)?.TagContainer.AddExactTag(t, s),
      this.PassengerTagMap.get(e).add(s));
  }
  RemoveTagForPassenger(e, t, s) {
    e &&
      this.PassengerTagMap.get(e)?.has(s) &&
      (e.GetComponent(203)?.TagContainer.RemoveExactTag(t, s),
      this.PassengerTagMap.get(e).delete(s));
  }
  RemoveAllTagsForPassenger(e) {
    if (e) {
      const s = e.GetComponent(203);
      var t = this.PassengerTagMap.get(e);
      t &&
        s &&
        (t.forEach((e) => {
          s.RemoveTag(e);
        }),
        this.PassengerTagMap.delete(e));
    }
  }
};
(VehicleTagComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(238)],
  VehicleTagComponent,
)),
  (exports.VehicleTagComponent = VehicleTagComponent);
//# sourceMappingURL=VehicleTagComponent.js.map
