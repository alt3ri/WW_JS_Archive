"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionTeleportTransitionOption =
    exports.unionToUnionTeleportTransitionOption =
    exports.UnionTeleportTransitionOption =
      void 0);
const teleport_transition_in_digital_screen_js_1 = require("../fb-action/teleport-transition-in-digital-screen.js"),
  teleport_transition_in_seamless_type_js_1 = require("../fb-action/teleport-transition-in-seamless-type.js"),
  teleport_transition_with_center_text_js_1 = require("../fb-action/teleport-transition-with-center-text.js"),
  teleport_transition_with_character_display_js_1 = require("../fb-action/teleport-transition-with-character-display.js"),
  teleport_transition_with_effect_js_1 = require("../fb-action/teleport-transition-with-effect.js"),
  teleport_transition_with_fade_in_screen_js_1 = require("../fb-action/teleport-transition-with-fade-in-screen.js"),
  teleport_transition_with_mp4_js_1 = require("../fb-action/teleport-transition-with-mp4.js");
var UnionTeleportTransitionOption;
function unionToUnionTeleportTransitionOption(t, e) {
  switch (UnionTeleportTransitionOption[t]) {
    case "NONE":
      return;
    case "TeleportTransitionInDigitalScreen":
      return e(
        new teleport_transition_in_digital_screen_js_1.TeleportTransitionInDigitalScreen(),
      );
    case "TeleportTransitionInSeamlessType":
      return e(
        new teleport_transition_in_seamless_type_js_1.TeleportTransitionInSeamlessType(),
      );
    case "TeleportTransitionWithCenterText":
      return e(
        new teleport_transition_with_center_text_js_1.TeleportTransitionWithCenterText(),
      );
    case "TeleportTransitionWithCharacterDisplay":
      return e(
        new teleport_transition_with_character_display_js_1.TeleportTransitionWithCharacterDisplay(),
      );
    case "TeleportTransitionWithEffect":
      return e(
        new teleport_transition_with_effect_js_1.TeleportTransitionWithEffect(),
      );
    case "TeleportTransitionWithFadeInScreen":
      return e(
        new teleport_transition_with_fade_in_screen_js_1.TeleportTransitionWithFadeInScreen(),
      );
    case "TeleportTransitionWithMp4":
      return e(
        new teleport_transition_with_mp4_js_1.TeleportTransitionWithMp4(),
      );
    default:
      return;
  }
}
function unionListToUnionTeleportTransitionOption(t, e, n) {
  switch (UnionTeleportTransitionOption[t]) {
    case "NONE":
      return;
    case "TeleportTransitionInDigitalScreen":
      return e(
        n,
        new teleport_transition_in_digital_screen_js_1.TeleportTransitionInDigitalScreen(),
      );
    case "TeleportTransitionInSeamlessType":
      return e(
        n,
        new teleport_transition_in_seamless_type_js_1.TeleportTransitionInSeamlessType(),
      );
    case "TeleportTransitionWithCenterText":
      return e(
        n,
        new teleport_transition_with_center_text_js_1.TeleportTransitionWithCenterText(),
      );
    case "TeleportTransitionWithCharacterDisplay":
      return e(
        n,
        new teleport_transition_with_character_display_js_1.TeleportTransitionWithCharacterDisplay(),
      );
    case "TeleportTransitionWithEffect":
      return e(
        n,
        new teleport_transition_with_effect_js_1.TeleportTransitionWithEffect(),
      );
    case "TeleportTransitionWithFadeInScreen":
      return e(
        n,
        new teleport_transition_with_fade_in_screen_js_1.TeleportTransitionWithFadeInScreen(),
      );
    case "TeleportTransitionWithMp4":
      return e(
        n,
        new teleport_transition_with_mp4_js_1.TeleportTransitionWithMp4(),
      );
    default:
      return;
  }
}
!(function (t) {
  (t[(t.NONE = 0)] = "NONE"),
    (t[(t.TeleportTransitionInDigitalScreen = 1)] =
      "TeleportTransitionInDigitalScreen"),
    (t[(t.TeleportTransitionInSeamlessType = 2)] =
      "TeleportTransitionInSeamlessType"),
    (t[(t.TeleportTransitionWithCenterText = 3)] =
      "TeleportTransitionWithCenterText"),
    (t[(t.TeleportTransitionWithCharacterDisplay = 4)] =
      "TeleportTransitionWithCharacterDisplay"),
    (t[(t.TeleportTransitionWithEffect = 5)] = "TeleportTransitionWithEffect"),
    (t[(t.TeleportTransitionWithFadeInScreen = 6)] =
      "TeleportTransitionWithFadeInScreen"),
    (t[(t.TeleportTransitionWithMp4 = 7)] = "TeleportTransitionWithMp4");
})(
  (UnionTeleportTransitionOption =
    exports.UnionTeleportTransitionOption ||
    (exports.UnionTeleportTransitionOption = {})),
),
  (exports.unionToUnionTeleportTransitionOption =
    unionToUnionTeleportTransitionOption),
  (exports.unionListToUnionTeleportTransitionOption =
    unionListToUnionTeleportTransitionOption);
//# sourceMappingURL=union-teleport-transition-option.js.map
