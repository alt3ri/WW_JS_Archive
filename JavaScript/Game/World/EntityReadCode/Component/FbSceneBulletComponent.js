"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSceneBulletComponent = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbSceneBulletGroup_1 = require("./FbSceneBulletGroup");
class FbSceneBulletComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.ejl = !1),
      (this.tjl = !1),
      (this.a7h = !1),
      (this.h7h = void 0);
  }
  static Create(t) {
    if (t) return new FbSceneBulletComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get DisableGenerateByRange() {
    return (
      this.ejl ||
        ((this.ejl = !0),
        (this.tjl = this.FbDataInternal.disableGenerateByRange())),
      this.tjl
    );
  }
  get BulletGroups() {
    if (!this.a7h) {
      (this.a7h = !0), (this.h7h = new Array());
      var e = this.FbDataInternal.bulletGroupsLength();
      if (e)
        for (let t = 0; t < e; ++t) {
          var s = this.FbDataInternal.bulletGroups(
            t,
            new fb_component_1.SceneBulletGroup(),
          );
          this.h7h.push(FbSceneBulletGroup_1.FbSceneBulletGroup.Create(s));
        }
    }
    return this.h7h;
  }
}
exports.FbSceneBulletComponent = FbSceneBulletComponent;
//# sourceMappingURL=FbSceneBulletComponent.js.map
