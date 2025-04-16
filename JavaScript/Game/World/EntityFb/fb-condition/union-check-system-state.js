"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionCheckSystemState =
    exports.unionToUnionCheckSystemState =
    exports.UnionCheckSystemState =
      void 0);
const check_collection_shop_state_js_1 = require("../fb-condition/check-collection-shop-state.js"),
  check_moon_building_state_js_1 = require("../fb-condition/check-moon-building-state.js"),
  check_track_moon_popularity_js_1 = require("../fb-condition/check-track-moon-popularity.js");
var UnionCheckSystemState;
function unionToUnionCheckSystemState(e, t) {
  switch (UnionCheckSystemState[e]) {
    case "NONE":
      return;
    case "CheckCollectionShopState":
      return t(new check_collection_shop_state_js_1.CheckCollectionShopState());
    case "CheckMoonBuildingState":
      return t(new check_moon_building_state_js_1.CheckMoonBuildingState());
    case "CheckTrackMoonPopularity":
      return t(new check_track_moon_popularity_js_1.CheckTrackMoonPopularity());
    default:
      return;
  }
}
function unionListToUnionCheckSystemState(e, t, o) {
  switch (UnionCheckSystemState[e]) {
    case "NONE":
      return;
    case "CheckCollectionShopState":
      return t(
        o,
        new check_collection_shop_state_js_1.CheckCollectionShopState(),
      );
    case "CheckMoonBuildingState":
      return t(o, new check_moon_building_state_js_1.CheckMoonBuildingState());
    case "CheckTrackMoonPopularity":
      return t(
        o,
        new check_track_moon_popularity_js_1.CheckTrackMoonPopularity(),
      );
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.CheckCollectionShopState = 1)] = "CheckCollectionShopState"),
    (e[(e.CheckMoonBuildingState = 2)] = "CheckMoonBuildingState"),
    (e[(e.CheckTrackMoonPopularity = 3)] = "CheckTrackMoonPopularity");
})(
  (UnionCheckSystemState =
    exports.UnionCheckSystemState || (exports.UnionCheckSystemState = {})),
),
  (exports.unionToUnionCheckSystemState = unionToUnionCheckSystemState),
  (exports.unionListToUnionCheckSystemState = unionListToUnionCheckSystemState);
//# sourceMappingURL=union-check-system-state.js.map
