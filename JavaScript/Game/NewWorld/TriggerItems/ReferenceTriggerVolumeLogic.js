"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ReferenceTriggerVolumeLogic = void 0);
const puerts_1 = require("puerts"),
  RoleTriggerController_1 = require("../Character/Role/RoleTriggerController"),
  VALID_LEN = 3;
class ReferenceTriggerVolumeLogic {
  constructor(i) {
    (this.$nr = void 0),
      (this.Ynr = void 0),
      (this.Jnr = 0),
      (this.znr = void 0),
      (this.Ynr = new Set());
    for (const e of i) {
      var t = e.PathName.split(".");
      t?.length === VALID_LEN && this.Ynr.add(t[1] + "." + t[2]);
    }
    (this.$nr = new Map()), (this.znr = []);
  }
  AddVolume(i, t) {
    this.Ynr.has(i) && (this.Vr(t), this.$nr.set(i, t));
  }
  RemoveVolume(i) {
    this.Ynr.has(i) && (this.kre(this.$nr.get(i)), this.$nr.delete(i));
  }
  Clear() {
    for (const i of this.$nr.values()) this.kre(i);
    0 < this.Jnr && this.Znr(!1),
      (this.Jnr = 0),
      this.Ynr.clear(),
      this.$nr.clear();
  }
  Destroy() {
    this.Clear(), (this.Ynr = void 0), (this.$nr = void 0), (this.znr = void 0);
  }
  AddOnPlayerOverlapCallback(i) {
    this.Jnr && i(!0), this.znr?.push(i);
  }
  RemoveOnPlayerOverlapCallback(i) {
    void 0 === this.znr ||
      (i = this.znr.indexOf(i)) < 0 ||
      this.znr.splice(i, 1);
  }
  OnCollisionEnterFunc(i) {
    this.esr(i) && (this.Jnr || this.Znr(!0), this.Jnr++);
  }
  OnCollisionExitFunc(i) {
    this.esr(i) && (this.Jnr--, this.Jnr || this.Znr(!1));
  }
  esr(i) {
    return (
      i === RoleTriggerController_1.RoleTriggerController.GetMyRoleTrigger()
    );
  }
  Vr(i) {
    if (i?.IsValid()) {
      var t = (0, puerts_1.$ref)(void 0),
        e = (i.GetOverlappingActors(t), (0, puerts_1.$unref)(t));
      if (0 < e?.Num())
        for (let i = 0, t = e.Num(); i < t; i++) {
          var s = e.Get(i);
          this.OnCollisionEnterFunc(s);
        }
      i.OnActorBeginOverlap.Add((i, t) => {
        this.OnCollisionEnterFunc(t);
      }),
        i.OnActorEndOverlap.Add((i, t) => {
          this.OnCollisionExitFunc(t);
        });
    }
  }
  kre(i) {
    i?.IsValid() &&
      (i.OnActorBeginOverlap.Clear(), i.OnActorEndOverlap.Clear());
  }
  Znr(t) {
    if (this.znr?.length)
      for (let i = this.znr.length - 1; 0 <= i; i--) (0, this.znr[i])(t);
  }
}
exports.ReferenceTriggerVolumeLogic = ReferenceTriggerVolumeLogic;
//# sourceMappingURL=ReferenceTriggerVolumeLogic.js.map
