"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  TsBaseVehicle_1 = require("../NewWorld/Vehicle/TsBaseVehicle");
class TsAnimNotifyStateVehicleAddTag extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments),
      (this.Tag = void 0),
      (this.AddToVehicle = !0),
      (this.AddToDriver = !1),
      (this.AddToPassengerExceptDriver = !1);
  }
  Constructor() {}
  K2_NotifyBegin(e, t, i) {
    var e = e.GetOwner(),
      s = this.Tag?.TagId;
    if (!(s && e instanceof TsBaseVehicle_1.default)) return !1;
    var e = e.VehicleActorComponent?.Entity,
      r = e?.GetComponent(238);
    if (!e || !r) return !1;
    this.AddToVehicle && r.TagContainer.AddExactTag(4, s);
    e = e.GetComponent(230);
    if (this.AddToDriver)
      for (const o of e.Drivers) r.AddTagForPassenger(o, 4, s);
    if (this.AddToPassengerExceptDriver)
      for (const f of e.PassengerInfoMap.values())
        !f.IsDriver &&
          f.PassengerEntity &&
          r.AddTagForPassenger(f.PassengerEntity, 4, s);
    return !0;
  }
  K2_NotifyEnd(e, t) {
    var e = e.GetOwner(),
      i = this.Tag?.TagId;
    if (!(i && e instanceof TsBaseVehicle_1.default)) return !1;
    var e = e.VehicleActorComponent?.Entity,
      s = e?.GetComponent(238);
    if (!e || !s) return !1;
    this.AddToVehicle &&
      e?.GetComponent(203)?.TagContainer.RemoveExactTag(4, i);
    e = e.GetComponent(230);
    if (this.AddToDriver)
      for (const r of e.Drivers) s.RemoveTagForPassenger(r, 4, i);
    if (this.AddToPassengerExceptDriver)
      for (const o of e.PassengerInfoMap.values())
        !o.IsDriver &&
          o.PassengerEntity &&
          s.RemoveTagForPassenger(o.PassengerEntity, 4, i);
    return !0;
  }
  GetNotifyName() {
    return "载具添加TAG";
  }
}
exports.default = TsAnimNotifyStateVehicleAddTag;
//# sourceMappingURL=TsAnimNotifyStateVehicleAddTag.js.map
