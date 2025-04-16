"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionSetSpineAnimation =
    exports.unionToUnionSetSpineAnimation =
    exports.UnionSetSpineAnimation =
      void 0);
const play_spine_animation_js_1 = require("../fb-action/play-spine-animation.js");
var UnionSetSpineAnimation;
function unionToUnionSetSpineAnimation(n, i) {
  switch (UnionSetSpineAnimation[n]) {
    case "NONE":
      return;
    case "PlaySpineAnimation":
      return i(new play_spine_animation_js_1.PlaySpineAnimation());
    default:
      return;
  }
}
function unionListToUnionSetSpineAnimation(n, i, e) {
  switch (UnionSetSpineAnimation[n]) {
    case "NONE":
      return;
    case "PlaySpineAnimation":
      return i(e, new play_spine_animation_js_1.PlaySpineAnimation());
    default:
      return;
  }
}
!(function (n) {
  (n[(n.NONE = 0)] = "NONE"),
    (n[(n.PlaySpineAnimation = 1)] = "PlaySpineAnimation");
})(
  (UnionSetSpineAnimation =
    exports.UnionSetSpineAnimation || (exports.UnionSetSpineAnimation = {})),
),
  (exports.unionToUnionSetSpineAnimation = unionToUnionSetSpineAnimation),
  (exports.unionListToUnionSetSpineAnimation =
    unionListToUnionSetSpineAnimation);
//# sourceMappingURL=union-set-spine-animation.js.map
