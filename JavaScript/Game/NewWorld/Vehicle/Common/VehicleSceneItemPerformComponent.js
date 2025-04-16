"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, i, o) {
    var s,
      r = arguments.length,
      h =
        r < 3
          ? t
          : null === o
            ? (o = Object.getOwnPropertyDescriptor(t, i))
            : o;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      h = Reflect.decorate(e, t, i, o);
    else
      for (var n = e.length - 1; 0 <= n; n--)
        (s = e[n]) && (h = (r < 3 ? s(h) : 3 < r ? s(t, i, h) : s(t, i)) || h);
    return 3 < r && h && Object.defineProperty(t, i, h), h;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VehicleSceneItemPerformComponent = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
  IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent"),
  BaseVehiclePerformComponent_1 = require("./BaseVehiclePerformComponent");
let VehicleSceneItemPerformComponent = class VehicleSceneItemPerformComponent extends BaseVehiclePerformComponent_1.BaseVehiclePerformComponent {
  constructor() {
    super(...arguments),
      (this.ActorComp = void 0),
      (this.AnimComp = void 0),
      (this.MoveComp = void 0),
      (this.TagComp = void 0),
      (this.PassengerTagMap = new Map());
  }
  OnStart() {
    if (!super.OnStart()) return !1;
    (this.ActorComp = this.Entity.GetComponent(1)),
      (this.AnimComp = this.Entity.GetComponent(232)),
      (this.MoveComp = this.Entity.GetComponent(233)),
      (this.TagComp = this.Entity.GetComponent(203));
    var e = this.CreatureData?.GetPbEntityInitData();
    return (
      !!e?.ComponentsData &&
      !(
        !(0, IComponent_1.getComponent)(e.ComponentsData, "VehicleComponent") ||
        !this.InitVehicleConfig()
      )
    );
  }
  OnEnd() {
    for (const e of this.PassengerTagMap.keys())
      this.RemoveAllTagsForPassenger(e);
    return super.OnEnd(), !0;
  }
  OnInitData(e) {
    this.CreatureData = this.Entity.GetComponent(0);
    var t = this.CreatureData.GetPbEntityInitData();
    return (
      t?.ComponentsData &&
        (t = (0, IComponent_1.getComponent)(
          t.ComponentsData,
          "VehicleComponent",
        )) &&
        ((this.VehicleType = "SceneItemAutoMoveVehicle"),
        (this.MaxSeatCount = t.SeatCount),
        (this.DriverSeat = t.DriverSeat ?? -1)),
      !0
    );
  }
  EnterVehiclePerform(e) {
    var t;
    e.PassengerEntity &&
      (this.PassengerTagMap.has(e.PassengerEntity)
        ? ((t = e.PassengerEntity.GetComponent(0)?.GetPbDataId()),
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Vehicle",
              42,
              "上次离开载具时Tag未清理",
              ["VehiclePbDataId", this.ActorComp?.CreatureData.GetPbDataId()],
              ["PassengerId", t],
              ["Tags", this.PassengerTagMap.get(e.PassengerEntity)],
            ),
          this.RemoveAllTagsForPassenger(e.PassengerEntity))
        : (this.PassengerTagMap.size || this.AddEnterVehicleTagsForVehicle(),
          this.PassengerTagMap.set(e.PassengerEntity, new Set()),
          this.AddEnterVehicleTagsForPassenger(e.PassengerEntity)));
  }
  LeaveVehiclePerform(e) {
    e.PassengerEntity &&
      (this.RemoveAllTagsForPassenger(e.PassengerEntity),
      this.PassengerTagMap.size || this.RemoveEnterVehicleTagsForVehicle());
  }
  AddEnterVehicleTagsForVehicle() {
    if (this.Config && 1 === this.PassengerInfoMap.size)
      for (const e of this.Config.VehicleEnterTags)
        this.TagComp?.AddTag(e),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Vehicle",
              42,
              "乘坐场景载具添加Tag",
              ["VehiclePbDataId", this.ActorComp?.CreatureData.GetPbDataId()],
              ["Tag", e],
            );
  }
  RemoveEnterVehicleTagsForVehicle() {
    if (this.Config && 1 === this.PassengerInfoMap.size)
      for (const e of this.Config.VehicleEnterTags)
        this.TagComp?.RemoveTag(e),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Vehicle",
              42,
              "离开场景载具移除Tag",
              ["VehiclePbDataId", this.ActorComp?.CreatureData.GetPbDataId()],
              ["Tag", e],
            );
  }
  AddEnterVehicleTagsForPassenger(e) {
    if (this.Config)
      for (const t of this.Config.PassengerEnterTags)
        this.AddTagForPassenger(e, 1, t);
  }
  AddTagForPassenger(e, t, i) {
    e &&
      this.PassengerTagMap.has(e) &&
      (e.GetComponent(203)?.TagContainer.AddExactTag(t, i),
      this.PassengerTagMap.get(e).add(i));
  }
  RemoveTagForPassenger(e, t, i) {
    e &&
      this.PassengerTagMap.get(e)?.has(i) &&
      (e.GetComponent(203)?.TagContainer.RemoveExactTag(t, i),
      this.PassengerTagMap.get(e).delete(i));
  }
  RemoveAllTagsForPassenger(e) {
    if (e) {
      const i = e.GetComponent(203);
      var t = this.PassengerTagMap.get(e);
      t &&
        i &&
        (t.forEach((e) => {
          i.RemoveTag(e);
        }),
        this.PassengerTagMap.delete(e));
    }
  }
};
(VehicleSceneItemPerformComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(235)],
  VehicleSceneItemPerformComponent,
)),
  (exports.VehicleSceneItemPerformComponent = VehicleSceneItemPerformComponent);
//# sourceMappingURL=VehicleSceneItemPerformComponent.js.map
