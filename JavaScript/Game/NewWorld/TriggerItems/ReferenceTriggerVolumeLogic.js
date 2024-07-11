"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ReferenceTriggerVolumeLogic = void 0);
const puerts_1 = require("puerts"),
  RoleTriggerController_1 = require("../Character/Role/RoleTriggerController"),
  VALID_LEN = 3;
class ReferenceTriggerVolumeLogic {
  constructor(i) {
    (this.Ksr = void 0),
      (this.Qsr = void 0),
      (this.Xsr = 0),
      (this.$sr = void 0),
      (this.Qsr = new Set());
    for (const e of i) {
      var t = e.PathName.split(".");
      t?.length === VALID_LEN && this.Qsr.add(t[1] + "." + t[2]);
    }
    (this.Ksr = new Map()), (this.$sr = []);
  }
  AddVolume(i, t) {
    this.Qsr.has(i) && (this.Vr(t), this.Ksr.set(i, t));
  }
  RemoveVolume(i) {
    this.Qsr.has(i) && (this.kre(this.Ksr.get(i)), this.Ksr.delete(i));
  }
  Clear() {
    for (const i of this.Ksr.values()) this.kre(i);
    0 < this.Xsr && this.Ysr(!1),
      (this.Xsr = 0),
      this.Qsr.clear(),
      this.Ksr.clear();
  }
  Destroy() {
    this.Clear(), (this.Qsr = void 0), (this.Ksr = void 0), (this.$sr = void 0);
  }
  AddOnPlayerOverlapCallback(i) {
    this.Xsr && i(!0), this.$sr?.push(i);
  }
  RemoveOnPlayerOverlapCallback(i) {
    void 0 === this.$sr ||
      (i = this.$sr.indexOf(i)) < 0 ||
      this.$sr.splice(i, 1);
  }
  OnCollisionEnterFunc(i) {
    this.Jsr(i) && (this.Xsr || this.Ysr(!0), this.Xsr++);
  }
  OnCollisionExitFunc(i) {
    this.Jsr(i) && (this.Xsr--, this.Xsr || this.Ysr(!1));
  }
  Jsr(i) {
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
  Ysr(t) {
    if (this.$sr?.length)
      for (let i = this.$sr.length - 1; 0 <= i; i--) (0, this.$sr[i])(t);
  }
}
exports.ReferenceTriggerVolumeLogic = ReferenceTriggerVolumeLogic;
//# sourceMappingURL=ReferenceTriggerVolumeLogic.js.map
