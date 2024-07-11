"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletDataInteract = void 0);
class BulletDataInteract {
  constructor(t) {
    (this.h8o = ""), (this.l8o = !1), (this.Pe = t);
  }
  get WaterInteract() {
    return (
      this.l8o ||
        ((this.l8o = !0), (this.h8o = this.Pe.水面交互.ToAssetPathName())),
      this.h8o
    );
  }
}
exports.BulletDataInteract = BulletDataInteract;
//# sourceMappingURL=BulletDataInteract.js.map
