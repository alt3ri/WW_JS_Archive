"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RefreshSingleComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class RefreshSingleComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsRefreshSingleComponent(e, t) {
    return (t || new RefreshSingleComponent()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsRefreshSingleComponent(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new RefreshSingleComponent()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  disabled() {
    var e = this.bb.__offset(this.bb_pos, 4);
    return !!e && !!this.bb.readInt8(this.bb_pos + e);
  }
  refreshInterval() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  delayRefresh() {
    var e = this.bb.__offset(this.bb_pos, 8);
    return !!e && !!this.bb.readInt8(this.bb_pos + e);
  }
  templateGuid(e) {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  static startRefreshSingleComponent(e) {
    e.startObject(4);
  }
  static addDisabled(e, t) {
    e.addFieldInt8(0, +t, 0);
  }
  static addRefreshInterval(e, t) {
    e.addFieldInt32(1, t, 0);
  }
  static addDelayRefresh(e, t) {
    e.addFieldInt8(2, +t, 0);
  }
  static addTemplateGuid(e, t) {
    e.addFieldOffset(3, t, 0);
  }
  static endRefreshSingleComponent(e) {
    return e.endObject();
  }
  static createRefreshSingleComponent(e, t, s, n, i) {
    return (
      RefreshSingleComponent.startRefreshSingleComponent(e),
      RefreshSingleComponent.addDisabled(e, t),
      RefreshSingleComponent.addRefreshInterval(e, s),
      RefreshSingleComponent.addDelayRefresh(e, n),
      RefreshSingleComponent.addTemplateGuid(e, i),
      RefreshSingleComponent.endRefreshSingleComponent(e)
    );
  }
}
exports.RefreshSingleComponent = RefreshSingleComponent;
//# sourceMappingURL=refresh-single-component.js.map
