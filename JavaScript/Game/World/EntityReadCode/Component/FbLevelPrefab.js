"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbLevelPrefab = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbPrefabEffectConfig_1 = require("./FbPrefabEffectConfig"),
  FbPrefabStateConfig_1 = require("./FbPrefabStateConfig");
class FbLevelPrefab {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.$Qh = !1),
      (this.XQh = void 0),
      (this.YQh = !1),
      (this.zQh = void 0),
      (this.zP_ = !1),
      (this.JP_ = 0),
      (this.JQh = !1),
      (this.ZQh = void 0),
      (this.eKh = !1),
      (this.tKh = void 0);
  }
  static Create(t) {
    if (t) return new FbLevelPrefab(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get BlueprintPath() {
    return (
      this.$Qh ||
        ((this.$Qh = !0), (this.XQh = this.FbDataInternal.blueprintPath())),
      this.XQh
    );
  }
  get PrefabPath() {
    return (
      this.YQh ||
        ((this.YQh = !0), (this.zQh = this.FbDataInternal.prefabPath())),
      this.zQh
    );
  }
  get NameOffsetZ() {
    return (
      this.zP_ ||
        ((this.zP_ = !0), (this.JP_ = this.FbDataInternal.nameOffsetZ())),
      this.JP_
    );
  }
  get PrefabStateList() {
    if (!this.JQh) {
      (this.JQh = !0), (this.ZQh = new Array());
      var i = this.FbDataInternal.prefabStateListLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.prefabStateList(
            t,
            new fb_component_1.PrefabStateConfig(),
          );
          this.ZQh.push(FbPrefabStateConfig_1.FbPrefabStateConfig.Create(e));
        }
    }
    return this.ZQh;
  }
  get EffectStateList() {
    if (!this.eKh) {
      (this.eKh = !0), (this.tKh = new Array());
      var i = this.FbDataInternal.effectStateListLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.effectStateList(
            t,
            new fb_component_1.PrefabEffectConfig(),
          );
          this.tKh.push(FbPrefabEffectConfig_1.FbPrefabEffectConfig.Create(e));
        }
    }
    return this.tKh;
  }
}
exports.FbLevelPrefab = FbLevelPrefab;
//# sourceMappingURL=FbLevelPrefab.js.map
