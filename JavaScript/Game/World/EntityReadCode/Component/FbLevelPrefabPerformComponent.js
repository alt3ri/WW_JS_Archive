"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbLevelPrefabPerformComponent = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbLevelPrefabParamsConfig_1 = require("./FbLevelPrefabParamsConfig"),
  FbTowardEntityConfig_1 = require("./FbTowardEntityConfig");
class FbLevelPrefabPerformComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.pYh = !1),
      (this.vYh = void 0),
      (this.yYh = !1),
      (this.SYh = void 0);
  }
  static Create(t) {
    if (t) return new FbLevelPrefabPerformComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get TowardEntity() {
    if (!this.pYh) {
      (this.pYh = !0), (this.vYh = new Array());
      var e = this.FbDataInternal.towardEntityLength();
      if (e)
        for (let t = 0; t < e; ++t) {
          var r = this.FbDataInternal.towardEntity(
            t,
            new fb_component_1.TowardEntityConfig(),
          );
          this.vYh.push(FbTowardEntityConfig_1.FbTowardEntityConfig.Create(r));
        }
    }
    return this.vYh;
  }
  get PrefabParams() {
    return (
      this.yYh ||
        ((this.yYh = !0),
        (this.SYh =
          FbLevelPrefabParamsConfig_1.FbLevelPrefabParamsConfig.Create(
            this.FbDataInternal.prefabParams(),
          ))),
      this.SYh
    );
  }
}
exports.FbLevelPrefabPerformComponent = FbLevelPrefabPerformComponent;
//# sourceMappingURL=FbLevelPrefabPerformComponent.js.map
