"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionUnlockAtlasSystemOptionHelper = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbUnlockGeographicalAtlas_1 = require("./FbUnlockGeographicalAtlas"),
  FbUnlockNounAtlas_1 = require("./FbUnlockNounAtlas"),
  FbUnlockPlotPhotoAtlas_1 = require("./FbUnlockPlotPhotoAtlas");
class UnionUnlockAtlasSystemOptionHelper {
  static GetUnionUnlockAtlasSystemOptionObject(t) {
    switch (t) {
      case fb_action_1.UnionUnlockAtlasSystemOption.UnlockGeographicalAtlas:
        return new fb_action_1.UnlockGeographicalAtlas();
      case fb_action_1.UnionUnlockAtlasSystemOption.UnlockNounAtlas:
        return new fb_action_1.UnlockNounAtlas();
      case fb_action_1.UnionUnlockAtlasSystemOption.UnlockPlotPhotoAtlas:
        return new fb_action_1.UnlockPlotPhotoAtlas();
      default:
        return;
    }
  }
  static ReadUnionUnlockAtlasSystemOption(t, o) {
    if (void 0 !== o)
      switch (t) {
        case fb_action_1.UnionUnlockAtlasSystemOption.UnlockGeographicalAtlas:
          return FbUnlockGeographicalAtlas_1.FbUnlockGeographicalAtlas.Create(
            o,
          );
        case fb_action_1.UnionUnlockAtlasSystemOption.UnlockNounAtlas:
          return FbUnlockNounAtlas_1.FbUnlockNounAtlas.Create(o);
        case fb_action_1.UnionUnlockAtlasSystemOption.UnlockPlotPhotoAtlas:
          return FbUnlockPlotPhotoAtlas_1.FbUnlockPlotPhotoAtlas.Create(o);
        default:
          return;
      }
  }
}
exports.UnionUnlockAtlasSystemOptionHelper = UnionUnlockAtlasSystemOptionHelper;
//# sourceMappingURL=UnionUnlockAtlasSystemOptionHelper.js.map
