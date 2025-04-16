"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.getLineTrace =
    exports.tempVector2 =
    exports.tempVector1 =
    exports.stealthTag =
    exports.skillTag =
    exports.invincibleTag =
    exports.summonTag =
    exports.morphTag =
    exports.controlVisionEnergy =
    exports.VISION_END_BULLET =
    exports.EXPLORE_SKILL_ID =
    exports.VISION_HIDDEN_DELAY =
    exports.CHARACTER_HIDDEN_DELAY =
    exports.SUMMON_PARTICLE_CUE_ID =
    exports.MORPH_PARTICLE_CUE_ID =
    exports.MATERIAL_CUE_ID =
    exports.ROLE_APPEAR_CUE_ID =
    exports.ROLE_HIDE_CUE_ID =
    exports.ROLE_DODGE_FORBID_BUFF_ID =
    exports.VISION_APPEAR_BUFF_ID =
    exports.VISION_SUMMON_BUFF_ID =
    exports.ROLE_SUMMON_BUFF_ID =
      void 0);
const UE = require("ue"),
  Protocol_1 = require("../../../../../../../Core/Define/Net/Protocol"),
  QueryTypeDefine_1 = require("../../../../../../../Core/Define/QueryTypeDefine"),
  Vector_1 = require("../../../../../../../Core/Utils/Math/Vector"),
  GlobalData_1 = require("../../../../../../GlobalData"),
  CharacterBuffIds_1 = require("../../Abilities/CharacterBuffIds");
(exports.ROLE_SUMMON_BUFF_ID =
  CharacterBuffIds_1.gameplayAbilityVisionBuffId.RoleSummonBuffId),
  (exports.VISION_SUMMON_BUFF_ID =
    CharacterBuffIds_1.gameplayAbilityVisionBuffId.VisionSummonBuffId),
  (exports.VISION_APPEAR_BUFF_ID =
    CharacterBuffIds_1.gameplayAbilityVisionBuffId.VisionAppearBuffId),
  (exports.ROLE_DODGE_FORBID_BUFF_ID = 1101004005),
  (exports.ROLE_HIDE_CUE_ID = 19000000191),
  (exports.ROLE_APPEAR_CUE_ID = 19000000201),
  (exports.MATERIAL_CUE_ID = 19000000181),
  (exports.MORPH_PARTICLE_CUE_ID = 19000000182),
  (exports.SUMMON_PARTICLE_CUE_ID = 19000000162),
  (exports.CHARACTER_HIDDEN_DELAY = 300),
  (exports.VISION_HIDDEN_DELAY = 1e3),
  (exports.EXPLORE_SKILL_ID = 12e5),
  (exports.VISION_END_BULLET = "210000004"),
  (exports.controlVisionEnergy = Protocol_1.Aki.Protocol.Vks.Proto_Life),
  (exports.morphTag = -2100129479),
  (exports.summonTag = -1369542279),
  (exports.invincibleTag = -208062360),
  (exports.skillTag = -1371021686),
  (exports.stealthTag = 85148660),
  (exports.tempVector1 = Vector_1.Vector.Create()),
  (exports.tempVector2 = Vector_1.Vector.Create());
let lineTrace = void 0;
function getLineTrace() {
  return (
    lineTrace ||
      (((lineTrace = UE.NewObject(
        UE.TraceLineElement.StaticClass(),
      )).bIsSingle = !0),
      (lineTrace.bIgnoreSelf = !0),
      lineTrace.AddObjectTypeQuery(
        QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic,
      ),
      lineTrace.AddObjectTypeQuery(
        QueryTypeDefine_1.KuroObjectTypeQuery.WorldStaticIgnoreBullet,
      )),
    (lineTrace.WorldContextObject = GlobalData_1.GlobalData.World),
    lineTrace.ClearCacheData(),
    lineTrace
  );
}
exports.getLineTrace = getLineTrace;
//# sourceMappingURL=GameplayAbilityVisionMisc.js.map
