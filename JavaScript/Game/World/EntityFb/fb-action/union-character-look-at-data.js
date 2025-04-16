"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionCharacterLookAtData =
    exports.unionToUnionCharacterLookAtData =
    exports.UnionCharacterLookAtData =
      void 0);
const character_look_at_empty_data_js_1 = require("../fb-action/character-look-at-empty-data.js"),
  character_look_at_entity_data_js_1 = require("../fb-action/character-look-at-entity-data.js"),
  character_look_at_player_data_js_1 = require("../fb-action/character-look-at-player-data.js"),
  character_look_at_position_data_js_1 = require("../fb-action/character-look-at-position-data.js"),
  character_look_at_unlock_data_js_1 = require("../fb-action/character-look-at-unlock-data.js");
var UnionCharacterLookAtData;
function unionToUnionCharacterLookAtData(a, t) {
  switch (UnionCharacterLookAtData[a]) {
    case "NONE":
      return;
    case "CharacterLookAtEmptyData":
      return t(
        new character_look_at_empty_data_js_1.CharacterLookAtEmptyData(),
      );
    case "CharacterLookAtEntityData":
      return t(
        new character_look_at_entity_data_js_1.CharacterLookAtEntityData(),
      );
    case "CharacterLookAtPlayerData":
      return t(
        new character_look_at_player_data_js_1.CharacterLookAtPlayerData(),
      );
    case "CharacterLookAtPositionData":
      return t(
        new character_look_at_position_data_js_1.CharacterLookAtPositionData(),
      );
    case "CharacterLookAtUnlockData":
      return t(
        new character_look_at_unlock_data_js_1.CharacterLookAtUnlockData(),
      );
    default:
      return;
  }
}
function unionListToUnionCharacterLookAtData(a, t, o) {
  switch (UnionCharacterLookAtData[a]) {
    case "NONE":
      return;
    case "CharacterLookAtEmptyData":
      return t(
        o,
        new character_look_at_empty_data_js_1.CharacterLookAtEmptyData(),
      );
    case "CharacterLookAtEntityData":
      return t(
        o,
        new character_look_at_entity_data_js_1.CharacterLookAtEntityData(),
      );
    case "CharacterLookAtPlayerData":
      return t(
        o,
        new character_look_at_player_data_js_1.CharacterLookAtPlayerData(),
      );
    case "CharacterLookAtPositionData":
      return t(
        o,
        new character_look_at_position_data_js_1.CharacterLookAtPositionData(),
      );
    case "CharacterLookAtUnlockData":
      return t(
        o,
        new character_look_at_unlock_data_js_1.CharacterLookAtUnlockData(),
      );
    default:
      return;
  }
}
!(function (a) {
  (a[(a.NONE = 0)] = "NONE"),
    (a[(a.CharacterLookAtEmptyData = 1)] = "CharacterLookAtEmptyData"),
    (a[(a.CharacterLookAtEntityData = 2)] = "CharacterLookAtEntityData"),
    (a[(a.CharacterLookAtPlayerData = 3)] = "CharacterLookAtPlayerData"),
    (a[(a.CharacterLookAtPositionData = 4)] = "CharacterLookAtPositionData"),
    (a[(a.CharacterLookAtUnlockData = 5)] = "CharacterLookAtUnlockData");
})(
  (UnionCharacterLookAtData =
    exports.UnionCharacterLookAtData ||
    (exports.UnionCharacterLookAtData = {})),
),
  (exports.unionToUnionCharacterLookAtData = unionToUnionCharacterLookAtData),
  (exports.unionListToUnionCharacterLookAtData =
    unionListToUnionCharacterLookAtData);
//# sourceMappingURL=union-character-look-at-data.js.map
