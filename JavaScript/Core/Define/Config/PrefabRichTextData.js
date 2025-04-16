"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PrefabRichTextData = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class PrefabRichTextData {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get IsIncludeRichText() {
    return this.isincluderichtext();
  }
  get IsIncludeGameText() {
    return this.isincludegametext();
  }
  __init(t, e) {
    return (this.z7 = t), (this.J7 = e), this;
  }
  static getRootAsPrefabRichTextData(t, e) {
    return (e || new PrefabRichTextData()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id(t) {
    var e = this.J7.__offset(this.z7, 4),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  isincluderichtext() {
    var t = this.J7.__offset(this.z7, 6);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  isincludegametext() {
    var t = this.J7.__offset(this.z7, 8);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
}
exports.PrefabRichTextData = PrefabRichTextData;
//# sourceMappingURL=PrefabRichTextData.js.map
