"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbTimelineTrackControlComponent = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbTimelineControlGroup_1 = require("./FbTimelineControlGroup");
class FbTimelineTrackControlComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.J8h = !1),
      (this.Z8h = void 0);
  }
  static Create(t) {
    if (t) return new FbTimelineTrackControlComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get ControlGroups() {
    if (!this.J8h) {
      (this.J8h = !0), (this.Z8h = new Array());
      var e = this.FbDataInternal.controlGroupsLength();
      if (e)
        for (let t = 0; t < e; ++t) {
          var o = this.FbDataInternal.controlGroups(
            t,
            new fb_component_1.TimelineControlGroup(),
          );
          this.Z8h.push(
            FbTimelineControlGroup_1.FbTimelineControlGroup.Create(o),
          );
        }
    }
    return this.Z8h;
  }
}
exports.FbTimelineTrackControlComponent = FbTimelineTrackControlComponent;
//# sourceMappingURL=FbTimelineTrackControlComponent.js.map
