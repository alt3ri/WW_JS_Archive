"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ReferenceTriggerVolumeLogic = void 0);
const puerts_1 = require("puerts"),
  RoleTriggerController_1 = require("../Character/Role/RoleTriggerController"),
  VALID_LEN = 3;
class ReferenceTriggerVolumeLogic {
  constructor(e) {
    (this.Ksr = new Map()),
      (this.Qsr = new Set()),
      (this.nc1 = new Set()),
      (this.$sr = []);
    for (const i of e) {
      var t = i.PathName.split(".");
      t?.length === VALID_LEN && this.Qsr.add(t[1] + "." + t[2]);
    }
  }
  AddVolume(e, t) {
    this.Qsr.has(e) && (this.Vr(e, t), this.Ksr.set(e, t));
  }
  RemoveVolume(e) {
    this.Qsr.has(e) &&
      (this.kre(e, this.Ksr.get(e)), this.Ksr.delete(e), this.nc1.delete(e));
  }
  Clear() {
    for (var [e, t] of this.Ksr) this.kre(e, t);
    this.nc1.size && (this.nc1.clear(), this.Ysr(!1)),
      this.Qsr.clear(),
      this.Ksr.clear(),
      (this.$sr.length = 0);
  }
  Destroy() {
    this.Clear();
  }
  IsPlayerOverlapped() {
    return 0 < this.nc1.size;
  }
  AddOnPlayerOverlapCallback(e, t = !1) {
    this.$sr.push(e), this.nc1.size && t && e(!0);
  }
  RemoveOnPlayerOverlapCallback(e) {
    e = this.$sr.indexOf(e);
    e < 0 || this.$sr.splice(e, 1);
  }
  OnCollisionEnterFunc(e, t) {
    this.Jsr(t) && ((t = this.nc1.size), this.nc1.add(e), t || this.Ysr(!0));
  }
  OnCollisionExitFunc(e, t) {
    this.Jsr(t) && (this.nc1.delete(e), this.nc1.size || this.Ysr(!1));
  }
  Jsr(e) {
    return (
      e === RoleTriggerController_1.RoleTriggerController.GetMyRoleTrigger()
    );
  }
  Vr(i, e) {
    if (e?.IsValid()) {
      var t = (0, puerts_1.$ref)(void 0),
        r = (e.GetOverlappingActors(t), (0, puerts_1.$unref)(t));
      if (0 < r?.Num())
        for (let e = 0, t = r.Num(); e < t; e++) {
          var s = r.Get(e);
          this.OnCollisionEnterFunc(i, s);
        }
      e.OnActorBeginOverlap.Add((e, t) => {
        this.OnCollisionEnterFunc(i, t);
      }),
        e.OnActorEndOverlap.Add((e, t) => {
          this.OnCollisionExitFunc(i, t);
        });
    }
  }
  kre(e, t) {
    t?.IsValid() &&
      (this.nc1.has(e) &&
        this.OnCollisionExitFunc(
          e,
          RoleTriggerController_1.RoleTriggerController.GetMyRoleTrigger(),
        ),
      t.OnActorBeginOverlap.Clear(),
      t.OnActorEndOverlap.Clear());
  }
  Ysr(t) {
    if (this.$sr?.length)
      for (let e = this.$sr.length - 1; 0 <= e; e--) (0, this.$sr[e])(t);
  }
}
exports.ReferenceTriggerVolumeLogic = ReferenceTriggerVolumeLogic;
//# sourceMappingURL=ReferenceTriggerVolumeLogic.js.map
