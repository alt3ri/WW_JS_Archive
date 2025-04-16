"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbTimelineControlGroup = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbControlPointEventConfig_1 = require("./FbControlPointEventConfig"),
  UnionTimelineTrackControlConfigHelper_1 = require("./UnionTimelineTrackControlConfigHelper"),
  FbConditionGroup_1 = require("../Condition/FbConditionGroup");
class FbTimelineControlGroup {
  constructor(i) {
    (this.FbDataInternal = i),
      (this.f_h = !1),
      (this.X6o = void 0),
      (this.C_h = !1),
      (this.g_h = void 0),
      (this.eHh = !1),
      (this.tHh = 0),
      (this.iHh = !1),
      (this.rHh = void 0),
      (this.oHh = !1),
      (this.nHh = void 0),
      (this.sHh = !1),
      (this.aHh = void 0);
  }
  static Create(i) {
    if (i) return new FbTimelineControlGroup(i);
  }
  get Condition() {
    return (
      this.f_h ||
        ((this.f_h = !0),
        (this.X6o = FbConditionGroup_1.FbConditionGroup.Create(
          this.FbDataInternal.condition(),
        ))),
      this.X6o
    );
  }
  get TidContent() {
    return (
      this.C_h ||
        ((this.C_h = !0), (this.g_h = this.FbDataInternal.tidContent())),
      this.g_h
    );
  }
  get SegmentTime() {
    return (
      this.eHh ||
        ((this.eHh = !0), (this.tHh = this.FbDataInternal.segmentTime())),
      this.tHh
    );
  }
  get ControlConfigs() {
    if (!this.iHh) {
      (this.iHh = !0), (this.rHh = new Array());
      var t = this.FbDataInternal.controlConfigsLength();
      if (t)
        for (let i = 0; i < t; ++i) {
          var o = this.FbDataInternal.controlConfigsType(i),
            n =
              UnionTimelineTrackControlConfigHelper_1.UnionTimelineTrackControlConfigHelper.GetUnionTimelineTrackControlConfigObject(
                o,
              );
          n &&
            void 0 !==
              (o =
                UnionTimelineTrackControlConfigHelper_1.UnionTimelineTrackControlConfigHelper.ReadUnionTimelineTrackControlConfig(
                  o,
                  this.FbDataInternal.controlConfigs(i, n),
                )) &&
            this.rHh.push(o);
        }
    }
    return this.rHh;
  }
  get ControlPointEvents() {
    if (!this.oHh) {
      (this.oHh = !0), (this.nHh = new Array());
      var t = this.FbDataInternal.controlPointEventsLength();
      if (t)
        for (let i = 0; i < t; ++i) {
          var o = this.FbDataInternal.controlPointEvents(
            i,
            new fb_component_1.ControlPointEventConfig(),
          );
          this.nHh.push(
            FbControlPointEventConfig_1.FbControlPointEventConfig.Create(o),
          );
        }
    }
    return this.nHh;
  }
  get Description() {
    return (
      this.sHh ||
        ((this.sHh = !0), (this.aHh = this.FbDataInternal.description())),
      this.aHh
    );
  }
}
exports.FbTimelineControlGroup = FbTimelineControlGroup;
//# sourceMappingURL=FbTimelineControlGroup.js.map
