"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbPrefabStateConfig = void 0);
class FbPrefabStateConfig {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.iKh = !1),
      (this.rKh = 0),
      (this.oKh = !1),
      (this.nKh = void 0);
  }
  static Create(t) {
    if (t) return new FbPrefabStateConfig(t);
  }
  get LevelTag() {
    return (
      this.iKh ||
        ((this.iKh = !0), (this.rKh = this.FbDataInternal.levelTag())),
      this.rKh
    );
  }
  get SceneInteractionState() {
    return (
      this.oKh ||
        ((this.oKh = !0),
        (this.nKh = this.FbDataInternal.sceneInteractionState())),
      this.nKh
    );
  }
}
exports.FbPrefabStateConfig = FbPrefabStateConfig;
//# sourceMappingURL=FbPrefabStateConfig.js.map
