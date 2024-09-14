"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FeatureRestrictionTemplate =
    exports.ComboTeachingController =
    exports.SkillMessageController =
    exports.RoleSceneInteractController =
    exports.CombatMessageController =
    exports.ChatController =
    exports.ChannelController =
    exports.CdKeyInputController =
    exports.CalabashController =
    exports.BuffItemControl =
    exports.BlackScreenFadeController =
    exports.BlackScreenController =
    exports.BattleUiSetController =
    exports.BattleUiDataControl =
    exports.BattleUiControl =
    exports.SkillCdController =
    exports.BattleScoreController =
    exports.GameAudioController =
    exports.AreaController =
    exports.ApplicationController =
    exports.AntiCheatController =
    exports.AnimController =
    exports.AndroidBackController =
    exports.AdviceController =
    exports.AdventureGuideController =
    exports.AchievementController =
    exports.FormationDataController =
    exports.FormationAttributeController =
    exports.UnopenedAreaController =
    exports.TurntableControlController =
    exports.SundialControlController =
    exports.LevelGamePlayController =
    exports.GuaranteeController =
    exports.CipherController =
    exports.LevelAimLineController =
    exports.KuroSdkController =
    exports.KuroPushController =
    exports.InputSettingsController =
    exports.InputController =
    exports.CrashCollectionController =
    exports.PackageConfigUtil =
    exports.CameraController =
    exports.TestModuleBridge =
    exports.AiModelController =
    exports.GameBudgetInterfaceController =
    exports.ControllerBase =
      void 0);
var ControllerBase_1 = require("../../Core/Framework/ControllerBase"),
  GameBudgetInterfaceController_1 =
    (Object.defineProperty(exports, "ControllerBase", {
      enumerable: !0,
      get: function () {
        return ControllerBase_1.ControllerBase;
      },
    }),
    require("../../Core/GameBudgetAllocator/GameBudgetInterfaceController")),
  AiModelController_1 =
    (Object.defineProperty(exports, "GameBudgetInterfaceController", {
      enumerable: !0,
      get: function () {
        return GameBudgetInterfaceController_1.GameBudgetInterfaceController;
      },
    }),
    require("../AI/Common/AiModelController")),
  TestModuleBridge_1 =
    (Object.defineProperty(exports, "AiModelController", {
      enumerable: !0,
      get: function () {
        return AiModelController_1.AiModelController;
      },
    }),
    require("../Bridge/TestModuleBridge")),
  CameraController_1 =
    (Object.defineProperty(exports, "TestModuleBridge", {
      enumerable: !0,
      get: function () {
        return TestModuleBridge_1.TestModuleBridge;
      },
    }),
    require("../Camera/CameraController")),
  PackageConfigUtil_1 =
    (Object.defineProperty(exports, "CameraController", {
      enumerable: !0,
      get: function () {
        return CameraController_1.CameraController;
      },
    }),
    require("../Common/PackageConfigUtil")),
  CrashCollectionController_1 =
    (Object.defineProperty(exports, "PackageConfigUtil", {
      enumerable: !0,
      get: function () {
        return PackageConfigUtil_1.PackageConfigUtil;
      },
    }),
    require("../CrashCollection/CrashCollectionController")),
  InputController_1 =
    (Object.defineProperty(exports, "CrashCollectionController", {
      enumerable: !0,
      get: function () {
        return CrashCollectionController_1.CrashCollectionController;
      },
    }),
    require("../Input/InputController")),
  InputSettingsController_1 =
    (Object.defineProperty(exports, "InputController", {
      enumerable: !0,
      get: function () {
        return InputController_1.InputController;
      },
    }),
    require("../InputSettings/InputSettingsController")),
  KuroPushController_1 =
    (Object.defineProperty(exports, "InputSettingsController", {
      enumerable: !0,
      get: function () {
        return InputSettingsController_1.InputSettingsController;
      },
    }),
    require("../KuroPushSdk/KuroPushController")),
  KuroSdkController_1 =
    (Object.defineProperty(exports, "KuroPushController", {
      enumerable: !0,
      get: function () {
        return KuroPushController_1.KuroPushController;
      },
    }),
    require("../KuroSdk/KuroSdkController")),
  LevelAimLineController_1 =
    (Object.defineProperty(exports, "KuroSdkController", {
      enumerable: !0,
      get: function () {
        return KuroSdkController_1.KuroSdkController;
      },
    }),
    require("../LevelGamePlay/AimLine/LevelAimLineController")),
  CipherController_1 =
    (Object.defineProperty(exports, "LevelAimLineController", {
      enumerable: !0,
      get: function () {
        return LevelAimLineController_1.LevelAimLineController;
      },
    }),
    require("../LevelGamePlay/Cipher/CipherController")),
  GuaranteeController_1 =
    (Object.defineProperty(exports, "CipherController", {
      enumerable: !0,
      get: function () {
        return CipherController_1.CipherController;
      },
    }),
    require("../LevelGamePlay/Guarantee/GuaranteeController")),
  LevelGamePlayController_1 =
    (Object.defineProperty(exports, "GuaranteeController", {
      enumerable: !0,
      get: function () {
        return GuaranteeController_1.GuaranteeController;
      },
    }),
    require("../LevelGamePlay/LevelGamePlayController")),
  SundialControlController_1 =
    (Object.defineProperty(exports, "LevelGamePlayController", {
      enumerable: !0,
      get: function () {
        return LevelGamePlayController_1.LevelGamePlayController;
      },
    }),
    require("../LevelGamePlay/SundialControl/SundialControlController")),
  TurntableControlController_1 =
    (Object.defineProperty(exports, "SundialControlController", {
      enumerable: !0,
      get: function () {
        return SundialControlController_1.SundialControlController;
      },
    }),
    require("../LevelGamePlay/TurntableControl/TurntableControlController")),
  UnopenedAreaController_1 =
    (Object.defineProperty(exports, "TurntableControlController", {
      enumerable: !0,
      get: function () {
        return TurntableControlController_1.TurntableControlController;
      },
    }),
    require("../LevelGamePlay/UnopenedArea/UnopenedAreaController")),
  FormationAttributeController_1 =
    (Object.defineProperty(exports, "UnopenedAreaController", {
      enumerable: !0,
      get: function () {
        return UnopenedAreaController_1.UnopenedAreaController;
      },
    }),
    require("../Module/Abilities/FormationAttributeController")),
  FormationDataController_1 =
    (Object.defineProperty(exports, "FormationAttributeController", {
      enumerable: !0,
      get: function () {
        return FormationAttributeController_1.FormationAttributeController;
      },
    }),
    require("../Module/Abilities/FormationDataController")),
  AchievementController_1 =
    (Object.defineProperty(exports, "FormationDataController", {
      enumerable: !0,
      get: function () {
        return FormationDataController_1.FormationDataController;
      },
    }),
    require("../Module/Achievement/AchievementController")),
  AdventureGuideController_1 =
    (Object.defineProperty(exports, "AchievementController", {
      enumerable: !0,
      get: function () {
        return AchievementController_1.AchievementController;
      },
    }),
    require("../Module/AdventureGuide/AdventureGuideController")),
  AdviceController_1 =
    (Object.defineProperty(exports, "AdventureGuideController", {
      enumerable: !0,
      get: function () {
        return AdventureGuideController_1.AdventureGuideController;
      },
    }),
    require("../Module/Advice/AdviceController")),
  AndroidBackController_1 =
    (Object.defineProperty(exports, "AdviceController", {
      enumerable: !0,
      get: function () {
        return AdviceController_1.AdviceController;
      },
    }),
    require("../Module/AndroidBack/AndroidBackController")),
  AnimController_1 =
    (Object.defineProperty(exports, "AndroidBackController", {
      enumerable: !0,
      get: function () {
        return AndroidBackController_1.AndroidBackController;
      },
    }),
    require("../Module/Anim/AnimController")),
  AntiCheatController_1 =
    (Object.defineProperty(exports, "AnimController", {
      enumerable: !0,
      get: function () {
        return AnimController_1.AnimController;
      },
    }),
    require("../Module/AntiCheat/AntiCheatController")),
  ApplicationController_1 =
    (Object.defineProperty(exports, "AntiCheatController", {
      enumerable: !0,
      get: function () {
        return AntiCheatController_1.AntiCheatController;
      },
    }),
    require("../Module/Application/ApplicationController")),
  AreaController_1 =
    (Object.defineProperty(exports, "ApplicationController", {
      enumerable: !0,
      get: function () {
        return ApplicationController_1.ApplicationController;
      },
    }),
    require("../Module/Area/AreaController")),
  GameAudioController_1 =
    (Object.defineProperty(exports, "AreaController", {
      enumerable: !0,
      get: function () {
        return AreaController_1.AreaController;
      },
    }),
    require("../Module/Audio/GameAudioController")),
  BattleScoreController_1 =
    (Object.defineProperty(exports, "GameAudioController", {
      enumerable: !0,
      get: function () {
        return GameAudioController_1.GameAudioController;
      },
    }),
    require("../Module/Battle/Score/BattleScoreController")),
  SkillCdController_1 =
    (Object.defineProperty(exports, "BattleScoreController", {
      enumerable: !0,
      get: function () {
        return BattleScoreController_1.BattleScoreController;
      },
    }),
    require("../Module/Battle/SkillCdController")),
  BattleUiControl_1 =
    (Object.defineProperty(exports, "SkillCdController", {
      enumerable: !0,
      get: function () {
        return SkillCdController_1.SkillCdController;
      },
    }),
    require("../Module/BattleUi/BattleUiControl")),
  BattleUiDataControl_1 =
    (Object.defineProperty(exports, "BattleUiControl", {
      enumerable: !0,
      get: function () {
        return BattleUiControl_1.BattleUiControl;
      },
    }),
    require("../Module/BattleUi/BattleUiDataControl")),
  BattleUiSetController_1 =
    (Object.defineProperty(exports, "BattleUiDataControl", {
      enumerable: !0,
      get: function () {
        return BattleUiDataControl_1.BattleUiDataControl;
      },
    }),
    require("../Module/BattleUiSet/BattleUiSetController")),
  BlackScreenController_1 =
    (Object.defineProperty(exports, "BattleUiSetController", {
      enumerable: !0,
      get: function () {
        return BattleUiSetController_1.BattleUiSetController;
      },
    }),
    require("../Module/BlackScreen/BlackScreenController")),
  BlackScreenFadeController_1 =
    (Object.defineProperty(exports, "BlackScreenController", {
      enumerable: !0,
      get: function () {
        return BlackScreenController_1.BlackScreenController;
      },
    }),
    require("../Module/BlackScreen/BlackScreenFadeController")),
  BuffItemControl_1 =
    (Object.defineProperty(exports, "BlackScreenFadeController", {
      enumerable: !0,
      get: function () {
        return BlackScreenFadeController_1.BlackScreenFadeController;
      },
    }),
    require("../Module/BuffItem/BuffItemControl")),
  CalabashController_1 =
    (Object.defineProperty(exports, "BuffItemControl", {
      enumerable: !0,
      get: function () {
        return BuffItemControl_1.BuffItemControl;
      },
    }),
    require("../Module/Calabash/CalabashController")),
  CdKeyInputController_1 =
    (Object.defineProperty(exports, "CalabashController", {
      enumerable: !0,
      get: function () {
        return CalabashController_1.CalabashController;
      },
    }),
    require("../Module/CdKey/CdKeyInputController")),
  ChannelController_1 =
    (Object.defineProperty(exports, "CdKeyInputController", {
      enumerable: !0,
      get: function () {
        return CdKeyInputController_1.CdKeyInputController;
      },
    }),
    require("../Module/Channel/ChannelController")),
  ChatController_1 =
    (Object.defineProperty(exports, "ChannelController", {
      enumerable: !0,
      get: function () {
        return ChannelController_1.ChannelController;
      },
    }),
    require("../Module/Chat/ChatController")),
  CombatMessageController_1 =
    (Object.defineProperty(exports, "ChatController", {
      enumerable: !0,
      get: function () {
        return ChatController_1.ChatController;
      },
    }),
    require("../Module/CombatMessage/CombatMessageController")),
  RoleSceneInteractController_1 =
    (Object.defineProperty(exports, "CombatMessageController", {
      enumerable: !0,
      get: function () {
        return CombatMessageController_1.CombatMessageController;
      },
    }),
    require("../Module/CombatMessage/RoleSceneInteractController")),
  SkillMessageController_1 =
    (Object.defineProperty(exports, "RoleSceneInteractController", {
      enumerable: !0,
      get: function () {
        return RoleSceneInteractController_1.RoleSceneInteractController;
      },
    }),
    require("../Module/CombatMessage/SkillMessageController")),
  ComboTeachingController_1 =
    (Object.defineProperty(exports, "SkillMessageController", {
      enumerable: !0,
      get: function () {
        return SkillMessageController_1.SkillMessageController;
      },
    }),
    require("../Module/ComboTeach/ComboTeachingController")),
  FeatureRestrictionTemplate_1 =
    (Object.defineProperty(exports, "ComboTeachingController", {
      enumerable: !0,
      get: function () {
        return ComboTeachingController_1.ComboTeachingController;
      },
    }),
    require("../Module/Common/FeatureRestrictionTemplate"));
Object.defineProperty(exports, "FeatureRestrictionTemplate", {
  enumerable: !0,
  get: function () {
    return FeatureRestrictionTemplate_1.FeatureRestrictionTemplate;
  },
});
//# sourceMappingURL=PreloadControllerClassPart1.js.map
