"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbTeleportDungeon = void 0);
const UnionTeleportTransitionOptionHelper_1 = require("./UnionTeleportTransitionOptionHelper");
class FbTeleportDungeon {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.MMh = !1),
      (this.EMh = 0),
      (this.IMh = !1),
      (this.TMh = !1),
      (this.bMh = !1),
      (this.LMh = 0),
      (this.L0h = !1),
      (this.khi = void 0),
      (this.AMh = !1),
      (this.xMh = !1),
      (this.aF_ = !1),
      (this.hF_ = !1),
      (this.MUc = !1),
      (this.EUc = !1);
  }
  static Create(t) {
    if (t) return new FbTeleportDungeon(t);
  }
  get DungeonId() {
    return (
      this.MMh ||
        ((this.MMh = !0), (this.EMh = this.FbDataInternal.dungeonId())),
      this.EMh
    );
  }
  get IsRegroup() {
    return (
      this.IMh ||
        ((this.IMh = !0), (this.TMh = this.FbDataInternal.isRegroup())),
      this.TMh
    );
  }
  get LocationEntityId() {
    return (
      this.bMh ||
        ((this.bMh = !0), (this.LMh = this.FbDataInternal.locationEntityId())),
      this.LMh
    );
  }
  get TransitionOption() {
    var t, i;
    return (
      !this.L0h &&
        ((this.L0h = !0),
        (t = this.FbDataInternal.transitionOptionType()),
        (i =
          UnionTeleportTransitionOptionHelper_1.UnionTeleportTransitionOptionHelper.GetUnionTeleportTransitionOptionObject(
            t,
          ))) &&
        (this.khi =
          UnionTeleportTransitionOptionHelper_1.UnionTeleportTransitionOptionHelper.ReadUnionTeleportTransitionOption(
            t,
            this.FbDataInternal.transitionOption(i),
          )),
      this.khi
    );
  }
  get IsNeedSecondaryConfirmation() {
    return (
      this.AMh ||
        ((this.AMh = !0),
        (this.xMh = this.FbDataInternal.isNeedSecondaryConfirmation())),
      this.xMh
    );
  }
  get UseLocationEntityGravity() {
    return (
      this.aF_ ||
        ((this.aF_ = !0),
        (this.hF_ = this.FbDataInternal.useLocationEntityGravity())),
      this.hF_
    );
  }
  get ContinueSave() {
    return (
      this.MUc ||
        ((this.MUc = !0), (this.EUc = this.FbDataInternal.continueSave())),
      this.EUc
    );
  }
}
exports.FbTeleportDungeon = FbTeleportDungeon;
//# sourceMappingURL=FbTeleportDungeon.js.map
