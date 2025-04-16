"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionTeleportTransitionOptionHelper = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbTeleportTransitionInDigitalScreen_1 = require("./FbTeleportTransitionInDigitalScreen"),
  FbTeleportTransitionInSeamlessType_1 = require("./FbTeleportTransitionInSeamlessType"),
  FbTeleportTransitionWithCenterText_1 = require("./FbTeleportTransitionWithCenterText"),
  FbTeleportTransitionWithCharacterDisplay_1 = require("./FbTeleportTransitionWithCharacterDisplay"),
  FbTeleportTransitionWithEffect_1 = require("./FbTeleportTransitionWithEffect"),
  FbTeleportTransitionWithFadeInScreen_1 = require("./FbTeleportTransitionWithFadeInScreen"),
  FbTeleportTransitionWithMp4_1 = require("./FbTeleportTransitionWithMp4");
class UnionTeleportTransitionOptionHelper {
  static GetUnionTeleportTransitionOptionObject(e) {
    switch (e) {
      case fb_action_1.UnionTeleportTransitionOption
        .TeleportTransitionInDigitalScreen:
        return new fb_action_1.TeleportTransitionInDigitalScreen();
      case fb_action_1.UnionTeleportTransitionOption
        .TeleportTransitionInSeamlessType:
        return new fb_action_1.TeleportTransitionInSeamlessType();
      case fb_action_1.UnionTeleportTransitionOption
        .TeleportTransitionWithCenterText:
        return new fb_action_1.TeleportTransitionWithCenterText();
      case fb_action_1.UnionTeleportTransitionOption
        .TeleportTransitionWithCharacterDisplay:
        return new fb_action_1.TeleportTransitionWithCharacterDisplay();
      case fb_action_1.UnionTeleportTransitionOption
        .TeleportTransitionWithEffect:
        return new fb_action_1.TeleportTransitionWithEffect();
      case fb_action_1.UnionTeleportTransitionOption
        .TeleportTransitionWithFadeInScreen:
        return new fb_action_1.TeleportTransitionWithFadeInScreen();
      case fb_action_1.UnionTeleportTransitionOption.TeleportTransitionWithMp4:
        return new fb_action_1.TeleportTransitionWithMp4();
      default:
        return;
    }
  }
  static ReadUnionTeleportTransitionOption(e, t) {
    if (void 0 !== t)
      switch (e) {
        case fb_action_1.UnionTeleportTransitionOption
          .TeleportTransitionInDigitalScreen:
          return FbTeleportTransitionInDigitalScreen_1.FbTeleportTransitionInDigitalScreen.Create(
            t,
          );
        case fb_action_1.UnionTeleportTransitionOption
          .TeleportTransitionInSeamlessType:
          return FbTeleportTransitionInSeamlessType_1.FbTeleportTransitionInSeamlessType.Create(
            t,
          );
        case fb_action_1.UnionTeleportTransitionOption
          .TeleportTransitionWithCenterText:
          return FbTeleportTransitionWithCenterText_1.FbTeleportTransitionWithCenterText.Create(
            t,
          );
        case fb_action_1.UnionTeleportTransitionOption
          .TeleportTransitionWithCharacterDisplay:
          return FbTeleportTransitionWithCharacterDisplay_1.FbTeleportTransitionWithCharacterDisplay.Create(
            t,
          );
        case fb_action_1.UnionTeleportTransitionOption
          .TeleportTransitionWithEffect:
          return FbTeleportTransitionWithEffect_1.FbTeleportTransitionWithEffect.Create(
            t,
          );
        case fb_action_1.UnionTeleportTransitionOption
          .TeleportTransitionWithFadeInScreen:
          return FbTeleportTransitionWithFadeInScreen_1.FbTeleportTransitionWithFadeInScreen.Create(
            t,
          );
        case fb_action_1.UnionTeleportTransitionOption
          .TeleportTransitionWithMp4:
          return FbTeleportTransitionWithMp4_1.FbTeleportTransitionWithMp4.Create(
            t,
          );
        default:
          return;
      }
  }
}
exports.UnionTeleportTransitionOptionHelper =
  UnionTeleportTransitionOptionHelper;
//# sourceMappingURL=UnionTeleportTransitionOptionHelper.js.map
