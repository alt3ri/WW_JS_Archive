"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbPrefabEffectConfig = void 0);
class FbPrefabEffectConfig {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.iKh = !1),
      (this.rKh = 0),
      (this.sKh = !1),
      (this.aKh = void 0);
  }
  static Create(t) {
    if (t) return new FbPrefabEffectConfig(t);
  }
  get LevelTag() {
    return (
      this.iKh ||
        ((this.iKh = !0), (this.rKh = this.FbDataInternal.levelTag())),
      this.rKh
    );
  }
  get SceneInteractionEffectState() {
    return (
      this.sKh ||
        ((this.sKh = !0),
        (this.aKh = this.FbDataInternal.sceneInteractionEffectState())),
      this.aKh
    );
  }
}
exports.FbPrefabEffectConfig = FbPrefabEffectConfig;
//# sourceMappingURL=FbPrefabEffectConfig.js.map
