"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbPlaySequenceData = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbSequenceFrameEvent_1 = require("./FbSequenceFrameEvent");
class FbPlaySequenceData {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.Hdh = !1),
      (this.Xdr = void 0),
      (this.Pdh = !1),
      (this.Udh = !1),
      (this.tmh = !1),
      (this.imh = !1),
      (this.rmh = !1),
      (this.omh = !1),
      (this.nmh = !1),
      (this.smh = void 0),
      (this.amh = !1),
      (this.hmh = !1);
  }
  static Create(t) {
    if (t) return new FbPlaySequenceData(t);
  }
  get Path() {
    return (
      this.Hdh || ((this.Hdh = !0), (this.Xdr = this.FbDataInternal.path())),
      this.Xdr
    );
  }
  get ResetCamera() {
    return (
      this.Pdh ||
        ((this.Pdh = !0), (this.Udh = this.FbDataInternal.resetCamera())),
      this.Udh
    );
  }
  get KeepCamera() {
    return (
      this.tmh ||
        ((this.tmh = !0), (this.imh = this.FbDataInternal.keepCamera())),
      this.imh
    );
  }
  get PreLoadRenderAssets() {
    return (
      this.rmh ||
        ((this.rmh = !0),
        (this.omh = this.FbDataInternal.preLoadRenderAssets())),
      this.omh
    );
  }
  get FrameEvents() {
    if (!this.nmh) {
      (this.nmh = !0), (this.smh = new Array());
      var e = this.FbDataInternal.frameEventsLength();
      if (e)
        for (let t = 0; t < e; ++t) {
          var s = this.FbDataInternal.frameEvents(
            t,
            new fb_action_1.SequenceFrameEvent(),
          );
          this.smh.push(FbSequenceFrameEvent_1.FbSequenceFrameEvent.Create(s));
        }
    }
    return this.smh;
  }
  get SaveFinalPos() {
    return (
      this.amh ||
        ((this.amh = !0), (this.hmh = this.FbDataInternal.saveFinalPos())),
      this.hmh
    );
  }
}
exports.FbPlaySequenceData = FbPlaySequenceData;
//# sourceMappingURL=FbPlaySequenceData.js.map
