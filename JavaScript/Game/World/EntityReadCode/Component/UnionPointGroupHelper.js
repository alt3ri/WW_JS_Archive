"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionPointGroupHelper = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbPointGroupByLayer_1 = require("./FbPointGroupByLayer");
class UnionPointGroupHelper {
  static GetUnionPointGroupObject(o) {
    if (o === fb_component_1.UnionPointGroup.PointGroupByLayer)
      return new fb_component_1.PointGroupByLayer();
  }
  static ReadUnionPointGroup(o, e) {
    return void 0 !== e &&
      o === fb_component_1.UnionPointGroup.PointGroupByLayer
      ? FbPointGroupByLayer_1.FbPointGroupByLayer.Create(e)
      : void 0;
  }
}
exports.UnionPointGroupHelper = UnionPointGroupHelper;
//# sourceMappingURL=UnionPointGroupHelper.js.map
