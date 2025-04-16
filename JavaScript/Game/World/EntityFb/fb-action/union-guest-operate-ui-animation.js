"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionGuestOperateUiAnimation =
    exports.unionToUnionGuestOperateUiAnimation =
    exports.UnionGuestOperateUiAnimation =
      void 0);
const play_guest_ui_animation_js_1 = require("../fb-action/play-guest-ui-animation.js"),
  stop_guest_ui_animation_js_1 = require("../fb-action/stop-guest-ui-animation.js");
var UnionGuestOperateUiAnimation;
function unionToUnionGuestOperateUiAnimation(i, t) {
  switch (UnionGuestOperateUiAnimation[i]) {
    case "NONE":
      return;
    case "PlayGuestUiAnimation":
      return t(new play_guest_ui_animation_js_1.PlayGuestUiAnimation());
    case "StopGuestUiAnimation":
      return t(new stop_guest_ui_animation_js_1.StopGuestUiAnimation());
    default:
      return;
  }
}
function unionListToUnionGuestOperateUiAnimation(i, t, n) {
  switch (UnionGuestOperateUiAnimation[i]) {
    case "NONE":
      return;
    case "PlayGuestUiAnimation":
      return t(n, new play_guest_ui_animation_js_1.PlayGuestUiAnimation());
    case "StopGuestUiAnimation":
      return t(n, new stop_guest_ui_animation_js_1.StopGuestUiAnimation());
    default:
      return;
  }
}
!(function (i) {
  (i[(i.NONE = 0)] = "NONE"),
    (i[(i.PlayGuestUiAnimation = 1)] = "PlayGuestUiAnimation"),
    (i[(i.StopGuestUiAnimation = 2)] = "StopGuestUiAnimation");
})(
  (UnionGuestOperateUiAnimation =
    exports.UnionGuestOperateUiAnimation ||
    (exports.UnionGuestOperateUiAnimation = {})),
),
  (exports.unionToUnionGuestOperateUiAnimation =
    unionToUnionGuestOperateUiAnimation),
  (exports.unionListToUnionGuestOperateUiAnimation =
    unionListToUnionGuestOperateUiAnimation);
//# sourceMappingURL=union-guest-operate-ui-animation.js.map
