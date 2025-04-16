"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSetPlayerPos = void 0);
const UnionTeammateTeleportConfigHelper_1 = require("./UnionTeammateTeleportConfigHelper"),
  UnionTeleportConfigHelper_1 = require("./UnionTeleportConfigHelper"),
  UnionTeleportTransitionOptionHelper_1 = require("./UnionTeleportTransitionOptionHelper");
class FbSetPlayerPos {
  constructor(e) {
    (this.FbDataInternal = e),
      (this.E0h = !1),
      (this.I0h = void 0),
      (this.T0h = !1),
      (this.b0h = void 0),
      (this.L0h = !1),
      (this.khi = void 0),
      (this.A0h = !1),
      (this.x0h = !1);
  }
  static Create(e) {
    if (e) return new FbSetPlayerPos(e);
  }
  get TelePortConfig() {
    var e, t;
    return (
      !this.E0h &&
        ((this.E0h = !0),
        (e = this.FbDataInternal.telePortConfigType()),
        (t =
          UnionTeleportConfigHelper_1.UnionTeleportConfigHelper.GetUnionTeleportConfigObject(
            e,
          ))) &&
        (this.I0h =
          UnionTeleportConfigHelper_1.UnionTeleportConfigHelper.ReadUnionTeleportConfig(
            e,
            this.FbDataInternal.telePortConfig(t),
          )),
      this.I0h
    );
  }
  get TeammateTeleportConfig() {
    var e, t;
    return (
      !this.T0h &&
        ((this.T0h = !0),
        (e = this.FbDataInternal.teammateTeleportConfigType()),
        (t =
          UnionTeammateTeleportConfigHelper_1.UnionTeammateTeleportConfigHelper.GetUnionTeammateTeleportConfigObject(
            e,
          ))) &&
        (this.b0h =
          UnionTeammateTeleportConfigHelper_1.UnionTeammateTeleportConfigHelper.ReadUnionTeammateTeleportConfig(
            e,
            this.FbDataInternal.teammateTeleportConfig(t),
          )),
      this.b0h
    );
  }
  get TransitionOption() {
    var e, t;
    return (
      !this.L0h &&
        ((this.L0h = !0),
        (e = this.FbDataInternal.transitionOptionType()),
        (t =
          UnionTeleportTransitionOptionHelper_1.UnionTeleportTransitionOptionHelper.GetUnionTeleportTransitionOptionObject(
            e,
          ))) &&
        (this.khi =
          UnionTeleportTransitionOptionHelper_1.UnionTeleportTransitionOptionHelper.ReadUnionTeleportTransitionOption(
            e,
            this.FbDataInternal.transitionOption(t),
          )),
      this.khi
    );
  }
  get DisableAutoFadeInScreen() {
    return (
      this.A0h ||
        ((this.A0h = !0),
        (this.x0h = this.FbDataInternal.disableAutoFadeInScreen())),
      this.x0h
    );
  }
}
exports.FbSetPlayerPos = FbSetPlayerPos;
//# sourceMappingURL=FbSetPlayerPos.js.map
