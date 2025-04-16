"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbNpcPerformState = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbInitNpcPerformState_1 = require("../Common/FbInitNpcPerformState"),
  FbNpcPerformStateConfig_1 = require("./FbNpcPerformStateConfig");
class FbNpcPerformState {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.wAh = !1),
      (this.PAh = void 0),
      (this.Gvh = !1),
      (this.Ovh = void 0);
  }
  static Create(t) {
    if (t) return new FbNpcPerformState(t);
  }
  get InitState() {
    return (
      this.wAh ||
        ((this.wAh = !0),
        (this.PAh = FbInitNpcPerformState_1.FbInitNpcPerformState.Create(
          this.FbDataInternal.initState(),
        ))),
      this.PAh
    );
  }
  get Configs() {
    if (!this.Gvh) {
      (this.Gvh = !0), (this.Ovh = new Array());
      var e = this.FbDataInternal.configsLength();
      if (e)
        for (let t = 0; t < e; ++t) {
          var r = this.FbDataInternal.configs(
            t,
            new fb_component_1.NpcPerformStateConfig(),
          );
          this.Ovh.push(
            FbNpcPerformStateConfig_1.FbNpcPerformStateConfig.Create(r),
          );
        }
    }
    return this.Ovh;
  }
}
exports.FbNpcPerformState = FbNpcPerformState;
//# sourceMappingURL=FbNpcPerformState.js.map
