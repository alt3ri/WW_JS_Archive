"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletDataInteract = void 0);
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
class BulletDataInteract {
  constructor(t) {
    (this.VOc = ""), (this.jOc = !1), (this.HOc = !1), (this.Pe = t);
  }
  get SceneInteract() {
    return this.$Oc(), this.VOc;
  }
  get IsSceneInteract() {
    return this.$Oc(), this.jOc;
  }
  $Oc() {
    this.HOc ||
      ((this.HOc = !0),
      (this.VOc = this.Pe.场景物件交互.ToAssetPathName()),
      (this.jOc =
        !StringUtils_1.StringUtils.IsEmpty(this.VOc) && "None" !== this.VOc));
  }
}
exports.BulletDataInteract = BulletDataInteract;
//# sourceMappingURL=BulletDataInteract.js.map
