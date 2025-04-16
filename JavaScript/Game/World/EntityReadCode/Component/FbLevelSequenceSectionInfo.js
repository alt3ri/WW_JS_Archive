"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbLevelSequenceSectionInfo = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbActionInfo_1 = require("../Action/FbActionInfo");
class FbLevelSequenceSectionInfo {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.ubh = !1),
      (this.dbh = void 0),
      (this.OYh = !1),
      (this.FYh = 0),
      (this.Bch = !1),
      (this.Cbo = void 0),
      (this.oyh = !1),
      (this.nyh = void 0);
  }
  static Create(t) {
    if (t) return new FbLevelSequenceSectionInfo(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Key() {
    return (
      this.ubh || ((this.ubh = !0), (this.dbh = this.FbDataInternal.key())),
      this.dbh
    );
  }
  get FrameId() {
    return (
      this.OYh || ((this.OYh = !0), (this.FYh = this.FbDataInternal.frameId())),
      this.FYh
    );
  }
  get State() {
    return (
      this.Bch || ((this.Bch = !0), (this.Cbo = this.FbDataInternal.state())),
      this.Cbo
    );
  }
  get ActionList() {
    if (!this.oyh) {
      (this.oyh = !0), (this.nyh = new Array());
      var i = this.FbDataInternal.actionListLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.actionList(
            t,
            new fb_action_1.ActionInfo(),
          );
          this.nyh.push(FbActionInfo_1.FbActionInfo.Create(e));
        }
    }
    return this.nyh;
  }
}
exports.FbLevelSequenceSectionInfo = FbLevelSequenceSectionInfo;
//# sourceMappingURL=FbLevelSequenceSectionInfo.js.map
