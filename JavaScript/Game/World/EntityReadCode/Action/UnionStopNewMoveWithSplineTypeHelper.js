"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionStopNewMoveWithSplineTypeHelper = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbStopNewMoveWithSplineAtCurrentPos_1 = require("./FbStopNewMoveWithSplineAtCurrentPos"),
  FbStopNewMoveWithSplineAtEndPoint_1 = require("./FbStopNewMoveWithSplineAtEndPoint"),
  FbStopNewMoveWithSplineAtStartPoint_1 = require("./FbStopNewMoveWithSplineAtStartPoint"),
  FbStopNewMoveWithSplineAtTargetPoint_1 = require("./FbStopNewMoveWithSplineAtTargetPoint");
class UnionStopNewMoveWithSplineTypeHelper {
  static GetUnionStopNewMoveWithSplineTypeObject(e) {
    switch (e) {
      case fb_action_1.UnionStopNewMoveWithSplineType
        .StopNewMoveWithSplineAtCurrentPos:
        return new fb_action_1.StopNewMoveWithSplineAtCurrentPos();
      case fb_action_1.UnionStopNewMoveWithSplineType
        .StopNewMoveWithSplineAtEndPoint:
        return new fb_action_1.StopNewMoveWithSplineAtEndPoint();
      case fb_action_1.UnionStopNewMoveWithSplineType
        .StopNewMoveWithSplineAtStartPoint:
        return new fb_action_1.StopNewMoveWithSplineAtStartPoint();
      case fb_action_1.UnionStopNewMoveWithSplineType
        .StopNewMoveWithSplineAtTargetPoint:
        return new fb_action_1.StopNewMoveWithSplineAtTargetPoint();
      default:
        return;
    }
  }
  static ReadUnionStopNewMoveWithSplineType(e, t) {
    if (void 0 !== t)
      switch (e) {
        case fb_action_1.UnionStopNewMoveWithSplineType
          .StopNewMoveWithSplineAtCurrentPos:
          return FbStopNewMoveWithSplineAtCurrentPos_1.FbStopNewMoveWithSplineAtCurrentPos.Create(
            t,
          );
        case fb_action_1.UnionStopNewMoveWithSplineType
          .StopNewMoveWithSplineAtEndPoint:
          return FbStopNewMoveWithSplineAtEndPoint_1.FbStopNewMoveWithSplineAtEndPoint.Create(
            t,
          );
        case fb_action_1.UnionStopNewMoveWithSplineType
          .StopNewMoveWithSplineAtStartPoint:
          return FbStopNewMoveWithSplineAtStartPoint_1.FbStopNewMoveWithSplineAtStartPoint.Create(
            t,
          );
        case fb_action_1.UnionStopNewMoveWithSplineType
          .StopNewMoveWithSplineAtTargetPoint:
          return FbStopNewMoveWithSplineAtTargetPoint_1.FbStopNewMoveWithSplineAtTargetPoint.Create(
            t,
          );
        default:
          return;
      }
  }
}
exports.UnionStopNewMoveWithSplineTypeHelper =
  UnionStopNewMoveWithSplineTypeHelper;
//# sourceMappingURL=UnionStopNewMoveWithSplineTypeHelper.js.map
