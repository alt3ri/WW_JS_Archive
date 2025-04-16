"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbNpcPerformComponent = void 0);
const FbNpcBumpShow_1 = require("./FbNpcBumpShow"),
  FbNpcDeathInteract_1 = require("./FbNpcDeathInteract"),
  FbNpcHitShow_1 = require("./FbNpcHitShow"),
  FbNpcPerformOnInteract_1 = require("./FbNpcPerformOnInteract"),
  FbNpcPerformOnMonsterCloseby_1 = require("./FbNpcPerformOnMonsterCloseby"),
  FbNpcPerformState_1 = require("./FbNpcPerformState"),
  UnionNpcRideInVehiclePerformTypeHelper_1 = require("./UnionNpcRideInVehiclePerformTypeHelper"),
  UnionNpcStandbyShowOptionHelper_1 = require("./UnionNpcStandbyShowOptionHelper"),
  UnionNpcUiInteractOptionHelper_1 = require("./UnionNpcUiInteractOptionHelper"),
  UnionSpecialNpcPerformTypeHelper_1 = require("./UnionSpecialNpcPerformTypeHelper");
class FbNpcPerformComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.o4h = !1),
      (this.n4h = void 0),
      (this.s4h = !1),
      (this.a4h = !1),
      (this.h4h = !1),
      (this.l4h = void 0),
      (this._4h = !1),
      (this.c4h = !1),
      (this.u4h = !1),
      (this.d4h = void 0),
      (this.m4h = !1),
      (this.C4h = void 0),
      (this.g4h = !1),
      (this.f4h = void 0),
      (this.p4h = !1),
      (this.v4h = void 0),
      (this.y4h = !1),
      (this.S4h = void 0),
      (this.M4h = !1),
      (this.E4h = void 0),
      (this.I4h = !1),
      (this.T4h = void 0),
      (this.b4h = !1),
      (this.L4h = void 0),
      (this.A4h = !1),
      (this.x4h = !1);
  }
  static Create(t) {
    if (t) return new FbNpcPerformComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get SpecialNpcPerformConfig() {
    var t, i;
    return (
      !this.o4h &&
        ((this.o4h = !0),
        (t = this.FbDataInternal.specialNpcPerformConfigType()),
        (i =
          UnionSpecialNpcPerformTypeHelper_1.UnionSpecialNpcPerformTypeHelper.GetUnionSpecialNpcPerformTypeObject(
            t,
          ))) &&
        (this.n4h =
          UnionSpecialNpcPerformTypeHelper_1.UnionSpecialNpcPerformTypeHelper.ReadUnionSpecialNpcPerformType(
            t,
            this.FbDataInternal.specialNpcPerformConfig(i),
          )),
      this.n4h
    );
  }
  get IsStare() {
    return (
      this.s4h || ((this.s4h = !0), (this.a4h = this.FbDataInternal.isStare())),
      this.a4h
    );
  }
  get NpcHitShow() {
    return (
      this.h4h ||
        ((this.h4h = !0),
        (this.l4h = FbNpcHitShow_1.FbNpcHitShow.Create(
          this.FbDataInternal.npcHitShow(),
        ))),
      this.l4h
    );
  }
  get IsShowStrike() {
    return (
      this._4h ||
        ((this._4h = !0), (this.c4h = this.FbDataInternal.isShowStrike())),
      this.c4h
    );
  }
  get NpcBumpShow() {
    return (
      this.u4h ||
        ((this.u4h = !0),
        (this.d4h = FbNpcBumpShow_1.FbNpcBumpShow.Create(
          this.FbDataInternal.npcBumpShow(),
        ))),
      this.d4h
    );
  }
  get ShowOnStandby() {
    var t, i;
    return (
      !this.m4h &&
        ((this.m4h = !0),
        (t = this.FbDataInternal.showOnStandbyType()),
        (i =
          UnionNpcStandbyShowOptionHelper_1.UnionNpcStandbyShowOptionHelper.GetUnionNpcStandbyShowOptionObject(
            t,
          ))) &&
        (this.C4h =
          UnionNpcStandbyShowOptionHelper_1.UnionNpcStandbyShowOptionHelper.ReadUnionNpcStandbyShowOption(
            t,
            this.FbDataInternal.showOnStandby(i),
          )),
      this.C4h
    );
  }
  get ShowOnInteract() {
    return (
      this.g4h ||
        ((this.g4h = !0),
        (this.f4h = FbNpcPerformOnInteract_1.FbNpcPerformOnInteract.Create(
          this.FbDataInternal.showOnInteract(),
        ))),
      this.f4h
    );
  }
  get ShowOnUiInteract() {
    var t, i;
    return (
      !this.p4h &&
        ((this.p4h = !0),
        (t = this.FbDataInternal.showOnUiInteractType()),
        (i =
          UnionNpcUiInteractOptionHelper_1.UnionNpcUiInteractOptionHelper.GetUnionNpcUiInteractOptionObject(
            t,
          ))) &&
        (this.v4h =
          UnionNpcUiInteractOptionHelper_1.UnionNpcUiInteractOptionHelper.ReadUnionNpcUiInteractOption(
            t,
            this.FbDataInternal.showOnUiInteract(i),
          )),
      this.v4h
    );
  }
  get ShowOnRideInVehicle() {
    if (!this.y4h) {
      (this.y4h = !0), (this.S4h = new Array());
      var i = this.FbDataInternal.showOnRideInVehicleLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.showOnRideInVehicleType(t),
            r =
              UnionNpcRideInVehiclePerformTypeHelper_1.UnionNpcRideInVehiclePerformTypeHelper.GetUnionNpcRideInVehiclePerformTypeObject(
                e,
              );
          r &&
            void 0 !==
              (e =
                UnionNpcRideInVehiclePerformTypeHelper_1.UnionNpcRideInVehiclePerformTypeHelper.ReadUnionNpcRideInVehiclePerformType(
                  e,
                  this.FbDataInternal.showOnRideInVehicle(t, r),
                )) &&
            this.S4h.push(e);
        }
    }
    return this.S4h;
  }
  get NpcMonsterClosePerform() {
    return (
      this.M4h ||
        ((this.M4h = !0),
        (this.E4h =
          FbNpcPerformOnMonsterCloseby_1.FbNpcPerformOnMonsterCloseby.Create(
            this.FbDataInternal.npcMonsterClosePerform(),
          ))),
      this.E4h
    );
  }
  get NpcPerformState() {
    return (
      this.I4h ||
        ((this.I4h = !0),
        (this.T4h = FbNpcPerformState_1.FbNpcPerformState.Create(
          this.FbDataInternal.npcPerformState(),
        ))),
      this.T4h
    );
  }
  get DeathInteract() {
    return (
      this.b4h ||
        ((this.b4h = !0),
        (this.L4h = FbNpcDeathInteract_1.FbNpcDeathInteract.Create(
          this.FbDataInternal.deathInteract(),
        ))),
      this.L4h
    );
  }
  get FixedPosition() {
    return (
      this.A4h ||
        ((this.A4h = !0), (this.x4h = this.FbDataInternal.fixedPosition())),
      this.x4h
    );
  }
}
exports.FbNpcPerformComponent = FbNpcPerformComponent;
//# sourceMappingURL=FbNpcPerformComponent.js.map
