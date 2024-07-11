"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.getLangInterface = void 0);
const CommonParamLang_1 = require("./ConfigCommon/CommonParamLang");
const CustomSequenceLang_1 = require("./ConfigQuery/CustomSequenceLang");
const FlowTextLang_1 = require("./ConfigQuery/FlowTextLang");
const HotPatchTextLang_1 = require("./ConfigQuery/HotPatchTextLang");
const MonsterDisplayLang_1 = require("./ConfigQuery/MonsterDisplayLang");
const MultiTextLang_1 = require("./ConfigQuery/MultiTextLang");
const OccupationConfigLang_1 = require("./ConfigQuery/OccupationConfigLang");
const SpeakerLang_1 = require("./ConfigQuery/SpeakerLang");
const SubtitleTextLang_1 = require("./ConfigQuery/SubtitleTextLang");
const TidTextLang_1 = require("./ConfigQuery/TidTextLang");
const langMap = new Map();
function getLangInterface(e) {
  return langMap.get(e);
}
(exports.getLangInterface = getLangInterface),
  langMap.set("CustomSequence", CustomSequenceLang_1.configCustomSequenceLang),
  langMap.set("FlowText", FlowTextLang_1.configFlowTextLang),
  langMap.set("HotPatchText", HotPatchTextLang_1.configHotPatchTextLang),
  langMap.set("MonsterDisplay", MonsterDisplayLang_1.configMonsterDisplayLang),
  langMap.set("MultiText", MultiTextLang_1.configMultiTextLang),
  langMap.set(
    "OccupationConfig",
    OccupationConfigLang_1.configOccupationConfigLang,
  ),
  langMap.set("Speaker", SpeakerLang_1.configSpeakerLang),
  langMap.set("SubtitleText", SubtitleTextLang_1.configSubtitleTextLang),
  langMap.set("TidText", TidTextLang_1.configTidTextLang),
  langMap.set("CommonParam", CommonParamLang_1.configCommonParamLang);
// # sourceMappingURL=ConfigDefine.js.map
