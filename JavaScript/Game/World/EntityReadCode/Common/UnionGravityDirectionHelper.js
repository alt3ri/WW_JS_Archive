"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionGravityDirectionHelper = void 0);
const fb_common_1 = require("../../../../Game/World/EntityFb/fb-common"),
  FbGravityDirectionByEntityGravity_1 = require("./FbGravityDirectionByEntityGravity"),
  FbGravityDirectionSelfRotation_1 = require("./FbGravityDirectionSelfRotation"),
  FbGravityDirectionVectorInfo_1 = require("./FbGravityDirectionVectorInfo"),
  FbGravityDirectionWorldAxis_1 = require("./FbGravityDirectionWorldAxis");
class UnionGravityDirectionHelper {
  static GetUnionGravityDirectionObject(t) {
    switch (t) {
      case fb_common_1.UnionGravityDirection.GravityDirectionByEntityGravity:
        return new fb_common_1.GravityDirectionByEntityGravity();
      case fb_common_1.UnionGravityDirection.GravityDirectionSelfRotation:
        return new fb_common_1.GravityDirectionSelfRotation();
      case fb_common_1.UnionGravityDirection.GravityDirectionVectorInfo:
        return new fb_common_1.GravityDirectionVectorInfo();
      case fb_common_1.UnionGravityDirection.GravityDirectionWorldAxis:
        return new fb_common_1.GravityDirectionWorldAxis();
      default:
        return;
    }
  }
  static ReadUnionGravityDirection(t, i) {
    if (void 0 !== i)
      switch (t) {
        case fb_common_1.UnionGravityDirection.GravityDirectionByEntityGravity:
          return FbGravityDirectionByEntityGravity_1.FbGravityDirectionByEntityGravity.Create(
            i,
          );
        case fb_common_1.UnionGravityDirection.GravityDirectionSelfRotation:
          return FbGravityDirectionSelfRotation_1.FbGravityDirectionSelfRotation.Create(
            i,
          );
        case fb_common_1.UnionGravityDirection.GravityDirectionVectorInfo:
          return FbGravityDirectionVectorInfo_1.FbGravityDirectionVectorInfo.Create(
            i,
          );
        case fb_common_1.UnionGravityDirection.GravityDirectionWorldAxis:
          return FbGravityDirectionWorldAxis_1.FbGravityDirectionWorldAxis.Create(
            i,
          );
        default:
          return;
      }
  }
}
exports.UnionGravityDirectionHelper = UnionGravityDirectionHelper;
//# sourceMappingURL=UnionGravityDirectionHelper.js.map
