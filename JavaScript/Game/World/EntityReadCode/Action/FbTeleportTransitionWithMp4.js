"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbTeleportTransitionWithMp4 = void 0);
const FbMp4BackgroundColor_1 = require("./FbMp4BackgroundColor");
class FbTeleportTransitionWithMp4 {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.ivh = !1),
      (this.rvh = void 0),
      (this.ovh = !1),
      (this.nvh = !1),
      (this.fd_ = !1),
      (this.vd_ = !1),
      (this.YOc = !1),
      (this.zOc = void 0),
      (this.JOc = !1),
      (this.ZOc = void 0);
  }
  static Create(t) {
    if (t) return new FbTeleportTransitionWithMp4(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Mp4Path() {
    return (
      this.ivh || ((this.ivh = !0), (this.rvh = this.FbDataInternal.mp4Path())),
      this.rvh
    );
  }
  get IsFadeInScreenAfterTeleport() {
    return (
      this.ovh ||
        ((this.ovh = !0),
        (this.nvh = this.FbDataInternal.isFadeInScreenAfterTeleport())),
      this.nvh
    );
  }
  get ReplayWhenReLogin() {
    return (
      this.fd_ ||
        ((this.fd_ = !0), (this.vd_ = this.FbDataInternal.replayWhenReLogin())),
      this.vd_
    );
  }
  get BackgroundColor() {
    return (
      this.YOc ||
        ((this.YOc = !0),
        (this.zOc = FbMp4BackgroundColor_1.FbMp4BackgroundColor.Create(
          this.FbDataInternal.backgroundColor(),
        ))),
      this.zOc
    );
  }
  get AfterTeleportScreenColor() {
    return (
      this.JOc ||
        ((this.JOc = !0),
        (this.ZOc = this.FbDataInternal.afterTeleportScreenColor())),
      this.ZOc
    );
  }
}
exports.FbTeleportTransitionWithMp4 = FbTeleportTransitionWithMp4;
//# sourceMappingURL=FbTeleportTransitionWithMp4.js.map
