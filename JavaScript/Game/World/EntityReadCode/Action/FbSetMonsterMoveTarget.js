"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSetMonsterMoveTarget = void 0);
class FbSetMonsterMoveTarget {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.Vvh = !1),
      (this.jvh = 0),
      (this.Hvh = !1),
      (this.Wvh = void 0),
      (this.Qvh = !1),
      (this.Kvh = void 0);
  }
  static Create(t) {
    if (t) return new FbSetMonsterMoveTarget(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get TargetEntityId() {
    return (
      this.Vvh ||
        ((this.Vvh = !0), (this.jvh = this.FbDataInternal.targetEntityId())),
      this.jvh
    );
  }
  get MoveEvent() {
    return (
      this.Hvh ||
        ((this.Hvh = !0), (this.Wvh = this.FbDataInternal.moveEvent())),
      this.Wvh
    );
  }
  get MonsterEntityIds() {
    if (!this.Qvh) {
      (this.Qvh = !0), (this.Kvh = new Array());
      var s = this.FbDataInternal.monsterEntityIdsLength();
      if (s)
        for (let t = 0; t < s; ++t)
          this.Kvh.push(this.FbDataInternal.monsterEntityIds(t));
    }
    return this.Kvh;
  }
}
exports.FbSetMonsterMoveTarget = FbSetMonsterMoveTarget;
//# sourceMappingURL=FbSetMonsterMoveTarget.js.map
