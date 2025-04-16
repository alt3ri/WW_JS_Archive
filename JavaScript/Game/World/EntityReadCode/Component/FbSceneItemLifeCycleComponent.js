"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSceneItemLifeCycleComponent = void 0);
const FbCreateStageConfig_1 = require("./FbCreateStageConfig"),
  FbDestroyStageConfig_1 = require("./FbDestroyStageConfig");
class FbSceneItemLifeCycleComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.J6h = !1),
      (this.Z6h = void 0),
      (this.ejh = !1),
      (this.tjh = void 0);
  }
  static Create(t) {
    if (t) return new FbSceneItemLifeCycleComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get CreateStageConfig() {
    return (
      this.J6h ||
        ((this.J6h = !0),
        (this.Z6h = FbCreateStageConfig_1.FbCreateStageConfig.Create(
          this.FbDataInternal.createStageConfig(),
        ))),
      this.Z6h
    );
  }
  get DestroyStageConfig() {
    return (
      this.ejh ||
        ((this.ejh = !0),
        (this.tjh = FbDestroyStageConfig_1.FbDestroyStageConfig.Create(
          this.FbDataInternal.destroyStageConfig(),
        ))),
      this.tjh
    );
  }
}
exports.FbSceneItemLifeCycleComponent = FbSceneItemLifeCycleComponent;
//# sourceMappingURL=FbSceneItemLifeCycleComponent.js.map
