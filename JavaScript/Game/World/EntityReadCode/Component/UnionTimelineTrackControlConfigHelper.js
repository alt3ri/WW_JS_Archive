"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionTimelineTrackControlConfigHelper = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbEntityTrackControl_1 = require("./FbEntityTrackControl"),
  FbSequenceTrackControl_1 = require("./FbSequenceTrackControl");
class UnionTimelineTrackControlConfigHelper {
  static GetUnionTimelineTrackControlConfigObject(e) {
    switch (e) {
      case fb_component_1.UnionTimelineTrackControlConfig.EntityTrackControl:
        return new fb_component_1.EntityTrackControl();
      case fb_component_1.UnionTimelineTrackControlConfig.SequenceTrackControl:
        return new fb_component_1.SequenceTrackControl();
      default:
        return;
    }
  }
  static ReadUnionTimelineTrackControlConfig(e, n) {
    if (void 0 !== n)
      switch (e) {
        case fb_component_1.UnionTimelineTrackControlConfig.EntityTrackControl:
          return FbEntityTrackControl_1.FbEntityTrackControl.Create(n);
        case fb_component_1.UnionTimelineTrackControlConfig
          .SequenceTrackControl:
          return FbSequenceTrackControl_1.FbSequenceTrackControl.Create(n);
        default:
          return;
      }
  }
}
exports.UnionTimelineTrackControlConfigHelper =
  UnionTimelineTrackControlConfigHelper;
//# sourceMappingURL=UnionTimelineTrackControlConfigHelper.js.map
