"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionUnlockAtlasSystemOption =
    exports.unionToUnionUnlockAtlasSystemOption =
    exports.UnionUnlockAtlasSystemOption =
      void 0);
const unlock_geographical_atlas_js_1 = require("../fb-action/unlock-geographical-atlas.js"),
  unlock_noun_atlas_js_1 = require("../fb-action/unlock-noun-atlas.js"),
  unlock_plot_photo_atlas_js_1 = require("../fb-action/unlock-plot-photo-atlas.js");
var UnionUnlockAtlasSystemOption;
function unionToUnionUnlockAtlasSystemOption(o, n) {
  switch (UnionUnlockAtlasSystemOption[o]) {
    case "NONE":
      return;
    case "UnlockGeographicalAtlas":
      return n(new unlock_geographical_atlas_js_1.UnlockGeographicalAtlas());
    case "UnlockNounAtlas":
      return n(new unlock_noun_atlas_js_1.UnlockNounAtlas());
    case "UnlockPlotPhotoAtlas":
      return n(new unlock_plot_photo_atlas_js_1.UnlockPlotPhotoAtlas());
    default:
      return;
  }
}
function unionListToUnionUnlockAtlasSystemOption(o, n, t) {
  switch (UnionUnlockAtlasSystemOption[o]) {
    case "NONE":
      return;
    case "UnlockGeographicalAtlas":
      return n(t, new unlock_geographical_atlas_js_1.UnlockGeographicalAtlas());
    case "UnlockNounAtlas":
      return n(t, new unlock_noun_atlas_js_1.UnlockNounAtlas());
    case "UnlockPlotPhotoAtlas":
      return n(t, new unlock_plot_photo_atlas_js_1.UnlockPlotPhotoAtlas());
    default:
      return;
  }
}
!(function (o) {
  (o[(o.NONE = 0)] = "NONE"),
    (o[(o.UnlockGeographicalAtlas = 1)] = "UnlockGeographicalAtlas"),
    (o[(o.UnlockNounAtlas = 2)] = "UnlockNounAtlas"),
    (o[(o.UnlockPlotPhotoAtlas = 3)] = "UnlockPlotPhotoAtlas");
})(
  (UnionUnlockAtlasSystemOption =
    exports.UnionUnlockAtlasSystemOption ||
    (exports.UnionUnlockAtlasSystemOption = {})),
),
  (exports.unionToUnionUnlockAtlasSystemOption =
    unionToUnionUnlockAtlasSystemOption),
  (exports.unionListToUnionUnlockAtlasSystemOption =
    unionListToUnionUnlockAtlasSystemOption);
//# sourceMappingURL=union-unlock-atlas-system-option.js.map
