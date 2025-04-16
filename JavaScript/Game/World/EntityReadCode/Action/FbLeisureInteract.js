"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbLeisureInteract = void 0);
const UnionLeisureInteractOptionHelper_1 = require("./UnionLeisureInteractOptionHelper");
class FbLeisureInteract {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.s_h = !1),
      (this.Hye = void 0),
      (this.fec = !1),
      (this.gec = 0);
  }
  static Create(t) {
    if (t) return new FbLeisureInteract(t);
  }
  get Option() {
    var t, e;
    return (
      !this.s_h &&
        ((this.s_h = !0),
        (t = this.FbDataInternal.optionType()),
        (e =
          UnionLeisureInteractOptionHelper_1.UnionLeisureInteractOptionHelper.GetUnionLeisureInteractOptionObject(
            t,
          ))) &&
        (this.Hye =
          UnionLeisureInteractOptionHelper_1.UnionLeisureInteractOptionHelper.ReadUnionLeisureInteractOption(
            t,
            this.FbDataInternal.option(e),
          )),
      this.Hye
    );
  }
  get SceneEntity() {
    return (
      this.fec ||
        ((this.fec = !0), (this.gec = this.FbDataInternal.sceneEntity())),
      this.gec
    );
  }
}
exports.FbLeisureInteract = FbLeisureInteract;
//# sourceMappingURL=FbLeisureInteract.js.map
