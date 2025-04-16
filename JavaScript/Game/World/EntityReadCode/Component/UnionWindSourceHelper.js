"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionWindSourceHelper = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbWindDirectional_1 = require("./FbWindDirectional");
class UnionWindSourceHelper {
  static GetUnionWindSourceObject(e) {
    if (e === fb_component_1.UnionWindSource.WindDirectional)
      return new fb_component_1.WindDirectional();
  }
  static ReadUnionWindSource(e, n) {
    return void 0 !== n && e === fb_component_1.UnionWindSource.WindDirectional
      ? FbWindDirectional_1.FbWindDirectional.Create(n)
      : void 0;
  }
}
exports.UnionWindSourceHelper = UnionWindSourceHelper;
//# sourceMappingURL=UnionWindSourceHelper.js.map
