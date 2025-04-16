"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ComposeViewOpenData =
    exports.EXCHANGE_MATERIAL_ENOUGHT_TEXT_PATTERN_B =
    exports.EXCHANGE_MATERIAL_NOT_ENOUGHT_TEXT_PATTERN_B =
    exports.EXCHANGE_MATERIAL_ENOUGHT_TEXT_PATTERN =
    exports.EXCHANGE_MATERIAL_NOT_ENOUGHT_TEXT_PATTERN =
    exports.EXCHANGE_COUNT =
    exports.composeTypeName =
    exports.composeTypeSprite =
    exports.COMPOSITE_FAIL_SEQUENCE_TIME_LENGTH =
    exports.COMPOSITE_WORKING_SEQUENCE_TIME_LENGTH =
    exports.COMPOSITE_ENTER_SEQUENCE_TIME_LENGTH =
    exports.COMPOSE_TYPE_TEXTURE_PATH_KEY =
      void 0),
  (exports.COMPOSE_TYPE_TEXTURE_PATH_KEY = "T_ComposeType"),
  (exports.COMPOSITE_ENTER_SEQUENCE_TIME_LENGTH = 3e3),
  (exports.COMPOSITE_WORKING_SEQUENCE_TIME_LENGTH = 2e3),
  (exports.COMPOSITE_FAIL_SEQUENCE_TIME_LENGTH = 2e3),
  (exports.composeTypeSprite = {
    [3]: "SP_Purification",
    4: "SP_Exchange",
    1: "SP_ReagentProduction",
    2: "SP_Structure",
  }),
  (exports.composeTypeName = {
    [3]: "Text_Purification_Text",
    4: "Text_Exchange_Text",
    1: "Text_ReagentProduction_Text",
    2: "Text_Structure_Text",
  }),
  (exports.EXCHANGE_COUNT = 2),
  (exports.EXCHANGE_MATERIAL_NOT_ENOUGHT_TEXT_PATTERN =
    "<color=#dc0300>{0}</color>"),
  (exports.EXCHANGE_MATERIAL_ENOUGHT_TEXT_PATTERN =
    "<color=#ffffff>{0}</color>"),
  (exports.EXCHANGE_MATERIAL_NOT_ENOUGHT_TEXT_PATTERN_B =
    "<color=#c25757>{0}</color>"),
  (exports.EXCHANGE_MATERIAL_ENOUGHT_TEXT_PATTERN_B =
    "<color=#36cd33>{0}</color>");
class ComposeViewOpenData {
  constructor() {
    (this.Type = 3), (this.SelectData = void 0);
  }
}
exports.ComposeViewOpenData = ComposeViewOpenData;
//# sourceMappingURL=ComposeDefine.js.map
