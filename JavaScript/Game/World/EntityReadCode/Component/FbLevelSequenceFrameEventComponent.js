"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbLevelSequenceFrameEventComponent = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbLevelSequenceSectionInfo_1 = require("./FbLevelSequenceSectionInfo");
class FbLevelSequenceFrameEventComponent {
  constructor(e) {
    (this.FbDataInternal = e),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.BYh = !1),
      (this.qYh = void 0),
      (this.kYh = !1),
      (this.GYh = void 0);
  }
  static Create(e) {
    if (e) return new FbLevelSequenceFrameEventComponent(e);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get ForwardSections() {
    if (!this.BYh) {
      (this.BYh = !0), (this.qYh = new Array());
      var t = this.FbDataInternal.forwardSectionsLength();
      if (t)
        for (let e = 0; e < t; ++e) {
          var i = this.FbDataInternal.forwardSections(
            e,
            new fb_component_1.LevelSequenceSectionInfo(),
          );
          this.qYh.push(
            FbLevelSequenceSectionInfo_1.FbLevelSequenceSectionInfo.Create(i),
          );
        }
    }
    return this.qYh;
  }
  get BackWardSections() {
    if (!this.kYh) {
      (this.kYh = !0), (this.GYh = new Array());
      var t = this.FbDataInternal.backWardSectionsLength();
      if (t)
        for (let e = 0; e < t; ++e) {
          var i = this.FbDataInternal.backWardSections(
            e,
            new fb_component_1.LevelSequenceSectionInfo(),
          );
          this.GYh.push(
            FbLevelSequenceSectionInfo_1.FbLevelSequenceSectionInfo.Create(i),
          );
        }
    }
    return this.GYh;
  }
}
exports.FbLevelSequenceFrameEventComponent = FbLevelSequenceFrameEventComponent;
//# sourceMappingURL=FbLevelSequenceFrameEventComponent.js.map
