"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSequenceFrameEvent = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbActionInfo_1 = require("./FbActionInfo");
class FbSequenceFrameEvent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.lmh = !1),
      (this._mh = void 0),
      (this.cmh = !1),
      (this.umh = void 0);
  }
  static Create(t) {
    if (t) return new FbSequenceFrameEvent(t);
  }
  get EventKey() {
    return (
      this.lmh ||
        ((this.lmh = !0), (this._mh = this.FbDataInternal.eventKey())),
      this._mh
    );
  }
  get EventActions() {
    if (!this.cmh) {
      (this.cmh = !0), (this.umh = new Array());
      var e = this.FbDataInternal.eventActionsLength();
      if (e)
        for (let t = 0; t < e; ++t) {
          var i = this.FbDataInternal.eventActions(
            t,
            new fb_action_1.ActionInfo(),
          );
          this.umh.push(FbActionInfo_1.FbActionInfo.Create(i));
        }
    }
    return this.umh;
  }
}
exports.FbSequenceFrameEvent = FbSequenceFrameEvent;
//# sourceMappingURL=FbSequenceFrameEvent.js.map
