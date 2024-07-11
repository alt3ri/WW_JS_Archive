"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (t, e, o, i) {
    let r;
    const s = arguments.length;
    let n =
      s < 3 ? e : i === null ? (i = Object.getOwnPropertyDescriptor(e, o)) : i;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      n = Reflect.decorate(t, e, o, i);
    else
      for (let h = t.length - 1; h >= 0; h--)
        (r = t[h]) && (n = (s < 3 ? r(n) : s > 3 ? r(e, o, n) : r(e, o)) || n);
    return s > 3 && n && Object.defineProperty(e, o, n), n;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActorDebugMovementComponent = void 0);
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
const WARNING_THRESHOLD_SQUARED = 25e6;
let ActorDebugMovementComponent = class ActorDebugMovementComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.ActorComp = void 0),
      (this.UeDebugComp = void 0),
      (this.IsDebug = !1),
      (this.LastRecordLocation = Vector_1.Vector.Create()),
      (this.TmpVector = Vector_1.Vector.Create());
  }
  OnStart() {
    return (
      (this.ActorComp = this.Entity.GetComponent(1)),
      (this.IsDebug = !1),
      this.ActorComp &&
        this.LastRecordLocation.DeepCopy(this.ActorComp.ActorLocationProxy),
      !0
    );
  }
  SetDebug(t) {
    this.IsDebug !== t &&
      ((this.IsDebug = t), this.IsDebug) &&
      (this.ActorComp?.Owner &&
        (this.UeDebugComp = this.ActorComp.Owner.AddComponentByClass(
          UE.KuroDebugMovementComponent.StaticClass(),
          !1,
          MathUtils_1.MathUtils.DefaultTransform,
          !1,
        )),
      this.UeDebugComp.Resigter());
  }
  MarkDebugRecord(t, e = 15, o = Vector_1.Vector.ZeroVector) {
    this.ActorComp &&
      (this.TmpVector.FromUeVector(o),
      Vector_1.Vector.DistSquared(this.LastRecordLocation, this.TmpVector) >
        WARNING_THRESHOLD_SQUARED &&
        Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "Movement",
          6,
          "ActorDebug.MarkDebugRecord move too far",
          ["Actor", this.ActorComp.Owner.GetName()],
          ["From", this.LastRecordLocation],
          ["Proxy", this.ActorComp.ActorLocationProxy],
          ["To", this.TmpVector],
        ),
      this.LastRecordLocation.DeepCopy(this.TmpVector)),
      this.IsDebug && this.UeDebugComp.RecordModifyInfo(t, o, e);
  }
  static StaticMarkDebugRecord(t, e, o = 15, i = Vector_1.Vector.ZeroVector) {
    t.GetComponent(27).MarkDebugRecord(e, o, i);
  }
};
(ActorDebugMovementComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(27)],
  ActorDebugMovementComponent,
)),
  (exports.ActorDebugMovementComponent = ActorDebugMovementComponent);
// # sourceMappingURL=ActorDebugMovementComponent.js.map
