"use strict";
function getExploreLevel(e) {
  if (e && e.Conditions) {
    var e = e.Conditions.filter((e) => "ExploreLevel" === e.Type);
    if (e && 0 !== e.length) return (e = e[0]) ? e.ExploreLevel : 0;
  }
}
function getPreQuests(e) {
  if (e?.Conditions) {
    e = e.Conditions.filter((e) => "PreQuest" === e.Type);
    if (e) return e ? e.map((e) => e.PreQuest) : [];
  }
}
function getPreChildQuests(e) {
  if (e && e.Conditions) {
    e = e.Conditions.filter((e) => "PreChildQuest" === e.Type);
    if (e) return e ? e.map((e) => e.PreChildQuest) : [];
  }
}
var EAiStateType,
  ELevelPlayState,
  ESkillReadyType,
  ECheckJigsawInfoType,
  EFormationRoleInfoType,
  ERoleLevelType,
  EWeaponLevelType,
  EHasEquippedVisionType,
  EHasUpgradableVisionType,
  ETargetType,
  EPlayerAttributeType,
  EPlayerCheckType,
  ECheckPlayerCanJoinActivityType,
  ERogueThemeType,
  ECheckSystemStateType,
  EShopType,
  EEventKey;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EEventKey =
    exports.EShopType =
    exports.ECheckSystemStateType =
    exports.ERogueThemeType =
    exports.ECheckPlayerCanJoinActivityType =
    exports.EPlayerCheckType =
    exports.EPlayerAttributeType =
    exports.ETargetType =
    exports.EHasUpgradableVisionType =
    exports.EHasEquippedVisionType =
    exports.EWeaponLevelType =
    exports.ERoleLevelType =
    exports.EFormationRoleInfoType =
    exports.ECheckJigsawInfoType =
    exports.ESkillReadyType =
    exports.ELevelPlayState =
    exports.EAiStateType =
    exports.getPreChildQuests =
    exports.getPreQuests =
    exports.getExploreLevel =
    exports.countNameMap =
      void 0),
  (exports.countNameMap = {
    [0]: "全部满足",
    1: "任意满足",
    2: "满足2个",
    3: "满足3个",
    4: "满足4个",
    5: "满足5个",
  }),
  (exports.getExploreLevel = getExploreLevel),
  (exports.getPreQuests = getPreQuests),
  (exports.getPreChildQuests = getPreChildQuests),
  (function (e) {
    (e.AnimalStandUp = "AnimalStandUp"),
      (e.AnimalSitDown = "AnimalSitDown"),
      (e.AnimalRandomAction = "AnimalRandomAction");
  })((EAiStateType = exports.EAiStateType || (exports.EAiStateType = {}))),
  (function (e) {
    (e[(e.Close = 0)] = "Close"),
      (e[(e.Running = 1)] = "Running"),
      (e[(e.Complete = 2)] = "Complete");
  })(
    (ELevelPlayState =
      exports.ELevelPlayState || (exports.ELevelPlayState = {})),
  ),
  (function (e) {
    (e.UltimateSkill = "UltimateSkill"),
      (e.ESkill = "ESkill"),
      (e.VisionSkill = "VisionSkill");
  })(
    (ESkillReadyType =
      exports.ESkillReadyType || (exports.ESkillReadyType = {})),
  ),
  (function (e) {
    (e.CheckJigsawItemPlaceIndex = "CheckJigsawItemPlaceIndex"),
      (e.CheckJigsawItemMove = "CheckJigsawItemMove");
  })(
    (ECheckJigsawInfoType =
      exports.ECheckJigsawInfoType || (exports.ECheckJigsawInfoType = {})),
  ),
  (function (e) {
    (e.RoleLevel = "RoleLevel"),
      (e.WeaponLevel = "WeaponLevel"),
      (e.HasEquippedVision = "HasEquippedVision"),
      (e.HasUpgradableVision = "HasUpgradableVision"),
      (e.DataCenter = "DataCenter");
  })(
    (EFormationRoleInfoType =
      exports.EFormationRoleInfoType || (exports.EFormationRoleInfoType = {})),
  ),
  ((ERoleLevelType =
    exports.ERoleLevelType || (exports.ERoleLevelType = {})).SpecifyRole =
    "SpecifyRole"),
  ((EWeaponLevelType =
    exports.EWeaponLevelType || (exports.EWeaponLevelType = {})).SpecifyRole =
    "SpecifyRole"),
  ((EHasEquippedVisionType =
    exports.EHasEquippedVisionType ||
    (exports.EHasEquippedVisionType = {})).AnyRole = "AnyRole"),
  ((EHasUpgradableVisionType =
    exports.EHasUpgradableVisionType ||
    (exports.EHasUpgradableVisionType = {})).AnyRole = "AnyRole"),
  ((ETargetType = exports.ETargetType || (exports.ETargetType = {})).Player =
    "Player"),
  ((EPlayerAttributeType =
    exports.EPlayerAttributeType ||
    (exports.EPlayerAttributeType = {})).Health = "Health"),
  ((EPlayerCheckType =
    exports.EPlayerCheckType || (exports.EPlayerCheckType = {})).AnyRole =
    "AnyRole"),
  ((ECheckPlayerCanJoinActivityType =
    exports.ECheckPlayerCanJoinActivityType ||
    (exports.ECheckPlayerCanJoinActivityType = {})).Rogue = "Rogue"),
  ((ERogueThemeType =
    exports.ERogueThemeType || (exports.ERogueThemeType = {})).ZhongQu =
    "ZhongQu"),
  (function (e) {
    (e.TrackMoonBuilding = "TrackMoonBuilding"),
      (e.CollectionShopFull = "CollectionShopFull"),
      (e.TrackMoonPopularity = "TrackMoonPopularity");
  })(
    (ECheckSystemStateType =
      exports.ECheckSystemStateType || (exports.ECheckSystemStateType = {})),
  ),
  ((EShopType = exports.EShopType || (exports.EShopType = {})).ChengXiaoShan =
    "ChengXiaoShan"),
  (function (e) {
    (e.EventKeyA = "EventKeyA"),
      (e.EventKeyB = "EventKeyB"),
      (e.EventKeyC = "EventKeyC");
  })((EEventKey = exports.EEventKey || (exports.EEventKey = {})));
//# sourceMappingURL=ICondition.js.map
