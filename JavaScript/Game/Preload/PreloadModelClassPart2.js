"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NpcConfigModel =
    exports.ManipulaterModel =
    exports.ManipulateInteractModel =
    exports.BuffModel =
    exports.CharacterModel =
    exports.BulletModel =
    exports.WuYinAreaModel =
    exports.WorldMapModel =
    exports.WorldLevelModel =
    exports.WeatherModel =
    exports.WeaponModel =
    exports.WaitEntityTaskModel =
    exports.UiNavigationModel =
    exports.TutorialModel =
    exports.TrainingDegreeModel =
    exports.TrackModel =
    exports.TowerModel =
    exports.TowerDetailModel =
    exports.TimeOfDayModel =
    exports.TeleportModel =
    exports.SundryModel =
    exports.SubLevelLoadingModel =
    exports.SkipInterfaceModel =
    exports.SkillButtonUiModel =
    exports.SignalDecodeModel =
    exports.ShopModel =
    exports.SeamlessTravelModel =
    exports.ScoreModel =
    exports.SceneTeamModel =
    exports.RouletteModel =
    exports.RoleModel =
    exports.RoleFavorConditionModel =
    exports.RoleSelectModel =
    exports.RoguelikeModel =
    exports.RewardModel =
    exports.ReConnectModel =
    exports.RechargeModel =
    exports.QuestNewModel =
    exports.DailyTaskModel =
    exports.PowerModel =
    exports.SequenceModel =
    exports.PlotModel =
    exports.PlayerInfoModel =
    exports.PlatformModel =
    exports.PhotographModel =
    exports.PhantomBattleModel =
    exports.PersonalModel =
    exports.PayShopModel =
    exports.PayGiftModel =
    exports.MonthCardModel =
      void 0),
  (exports.ShootTargetModel =
    exports.SceneItemBuffModel =
    exports.SceneInteractionModel =
    exports.RangeItemModel =
    exports.PortalModel =
      void 0);
var MonthCardModel_1 = require("../Module/PayShop/MonthCard/MonthCardModel"),
  PayGiftModel_1 =
    (Object.defineProperty(exports, "MonthCardModel", {
      enumerable: !0,
      get: function () {
        return MonthCardModel_1.MonthCardModel;
      },
    }),
    require("../Module/PayShop/PayGiftModel")),
  PayShopModel_1 =
    (Object.defineProperty(exports, "PayGiftModel", {
      enumerable: !0,
      get: function () {
        return PayGiftModel_1.PayGiftModel;
      },
    }),
    require("../Module/PayShop/PayShopModel")),
  PersonalModel_1 =
    (Object.defineProperty(exports, "PayShopModel", {
      enumerable: !0,
      get: function () {
        return PayShopModel_1.PayShopModel;
      },
    }),
    require("../Module/Personal/Model/PersonalModel")),
  PhantomBattleModel_1 =
    (Object.defineProperty(exports, "PersonalModel", {
      enumerable: !0,
      get: function () {
        return PersonalModel_1.PersonalModel;
      },
    }),
    require("../Module/Phantom/PhantomBattle/PhantomBattleModel")),
  PhotographModel_1 =
    (Object.defineProperty(exports, "PhantomBattleModel", {
      enumerable: !0,
      get: function () {
        return PhantomBattleModel_1.PhantomBattleModel;
      },
    }),
    require("../Module/Photograph/PhotographModel")),
  PlatformModel_1 =
    (Object.defineProperty(exports, "PhotographModel", {
      enumerable: !0,
      get: function () {
        return PhotographModel_1.PhotographModel;
      },
    }),
    require("../Module/Platform/PlatformModel")),
  PlayerInfoModel_1 =
    (Object.defineProperty(exports, "PlatformModel", {
      enumerable: !0,
      get: function () {
        return PlatformModel_1.PlatformModel;
      },
    }),
    require("../Module/PlayerInfo/PlayerInfoModel")),
  PlotModel_1 =
    (Object.defineProperty(exports, "PlayerInfoModel", {
      enumerable: !0,
      get: function () {
        return PlayerInfoModel_1.PlayerInfoModel;
      },
    }),
    require("../Module/Plot/PlotModel")),
  SequenceModel_1 =
    (Object.defineProperty(exports, "PlotModel", {
      enumerable: !0,
      get: function () {
        return PlotModel_1.PlotModel;
      },
    }),
    require("../Module/Plot/Sequence/SequenceModel")),
  PowerModel_1 =
    (Object.defineProperty(exports, "SequenceModel", {
      enumerable: !0,
      get: function () {
        return SequenceModel_1.SequenceModel;
      },
    }),
    require("../Module/Power/PowerModel")),
  DailyTaskModel_1 =
    (Object.defineProperty(exports, "PowerModel", {
      enumerable: !0,
      get: function () {
        return PowerModel_1.PowerModel;
      },
    }),
    require("../Module/QuestNew/Model/DailyTaskModel")),
  QuestModel_1 =
    (Object.defineProperty(exports, "DailyTaskModel", {
      enumerable: !0,
      get: function () {
        return DailyTaskModel_1.DailyTaskModel;
      },
    }),
    require("../Module/QuestNew/Model/QuestModel")),
  RechargeModel_1 =
    (Object.defineProperty(exports, "QuestNewModel", {
      enumerable: !0,
      get: function () {
        return QuestModel_1.QuestNewModel;
      },
    }),
    require("../Module/Recharge/RechargeModel")),
  ReConnectModel_1 =
    (Object.defineProperty(exports, "RechargeModel", {
      enumerable: !0,
      get: function () {
        return RechargeModel_1.RechargeModel;
      },
    }),
    require("../Module/ReConnect/ReConnectModel")),
  RewardModel_1 =
    (Object.defineProperty(exports, "ReConnectModel", {
      enumerable: !0,
      get: function () {
        return ReConnectModel_1.ReConnectModel;
      },
    }),
    require("../Module/Reward/RewardModel")),
  RoguelikeModel_1 =
    (Object.defineProperty(exports, "RewardModel", {
      enumerable: !0,
      get: function () {
        return RewardModel_1.RewardModel;
      },
    }),
    require("../Module/Roguelike/RoguelikeModel")),
  RoleSelectModel_1 =
    (Object.defineProperty(exports, "RoguelikeModel", {
      enumerable: !0,
      get: function () {
        return RoguelikeModel_1.RoguelikeModel;
      },
    }),
    require("../Module/RoleSelect/RoleSelectModel")),
  RoleFavorConditionModel_1 =
    (Object.defineProperty(exports, "RoleSelectModel", {
      enumerable: !0,
      get: function () {
        return RoleSelectModel_1.RoleSelectModel;
      },
    }),
    require("../Module/RoleUi/RoleFavorConditionModel")),
  RoleModel_1 =
    (Object.defineProperty(exports, "RoleFavorConditionModel", {
      enumerable: !0,
      get: function () {
        return RoleFavorConditionModel_1.RoleFavorConditionModel;
      },
    }),
    require("../Module/RoleUi/RoleModel")),
  RouletteModel_1 =
    (Object.defineProperty(exports, "RoleModel", {
      enumerable: !0,
      get: function () {
        return RoleModel_1.RoleModel;
      },
    }),
    require("../Module/Roulette/RouletteModel")),
  SceneTeamModel_1 =
    (Object.defineProperty(exports, "RouletteModel", {
      enumerable: !0,
      get: function () {
        return RouletteModel_1.RouletteModel;
      },
    }),
    require("../Module/SceneTeam/SceneTeamModel")),
  ScoreModel_1 =
    (Object.defineProperty(exports, "SceneTeamModel", {
      enumerable: !0,
      get: function () {
        return SceneTeamModel_1.SceneTeamModel;
      },
    }),
    require("../Module/Score/ScoreModel")),
  SeamlessTravelModel_1 =
    (Object.defineProperty(exports, "ScoreModel", {
      enumerable: !0,
      get: function () {
        return ScoreModel_1.ScoreModel;
      },
    }),
    require("../Module/SeamlessTravel/SeamlessTravelModel")),
  ShopModel_1 =
    (Object.defineProperty(exports, "SeamlessTravelModel", {
      enumerable: !0,
      get: function () {
        return SeamlessTravelModel_1.SeamlessTravelModel;
      },
    }),
    require("../Module/Shop/ShopModel")),
  SignalDecodeModel_1 =
    (Object.defineProperty(exports, "ShopModel", {
      enumerable: !0,
      get: function () {
        return ShopModel_1.ShopModel;
      },
    }),
    require("../Module/SignalDecode/SignalDecodeModel")),
  SkillButtonUiModel_1 =
    (Object.defineProperty(exports, "SignalDecodeModel", {
      enumerable: !0,
      get: function () {
        return SignalDecodeModel_1.SignalDecodeModel;
      },
    }),
    require("../Module/SkillButtonUi/SkillButtonUiModel")),
  SkipInterfaceModel_1 =
    (Object.defineProperty(exports, "SkillButtonUiModel", {
      enumerable: !0,
      get: function () {
        return SkillButtonUiModel_1.SkillButtonUiModel;
      },
    }),
    require("../Module/SkipInterface/SkipInterfaceModel")),
  SubLevelLoadingModel_1 =
    (Object.defineProperty(exports, "SkipInterfaceModel", {
      enumerable: !0,
      get: function () {
        return SkipInterfaceModel_1.SkipInterfaceModel;
      },
    }),
    require("../Module/SubLevelLoading/SubLevelLoadingModel")),
  SundryModel_1 =
    (Object.defineProperty(exports, "SubLevelLoadingModel", {
      enumerable: !0,
      get: function () {
        return SubLevelLoadingModel_1.SubLevelLoadingModel;
      },
    }),
    require("../Module/Sundry/SundryModel")),
  TeleportModel_1 =
    (Object.defineProperty(exports, "SundryModel", {
      enumerable: !0,
      get: function () {
        return SundryModel_1.SundryModel;
      },
    }),
    require("../Module/Teleport/TeleportModel")),
  TimeOfDayModel_1 =
    (Object.defineProperty(exports, "TeleportModel", {
      enumerable: !0,
      get: function () {
        return TeleportModel_1.TeleportModel;
      },
    }),
    require("../Module/TimeOfDay/TimeOfDayModel")),
  TowerDetailModel_1 =
    (Object.defineProperty(exports, "TimeOfDayModel", {
      enumerable: !0,
      get: function () {
        return TimeOfDayModel_1.TimeOfDayModel;
      },
    }),
    require("../Module/TowerDetailUi/TowerDetailModel")),
  TowerModel_1 =
    (Object.defineProperty(exports, "TowerDetailModel", {
      enumerable: !0,
      get: function () {
        return TowerDetailModel_1.TowerDetailModel;
      },
    }),
    require("../Module/TowerDetailUi/TowerModel")),
  TrackModel_1 =
    (Object.defineProperty(exports, "TowerModel", {
      enumerable: !0,
      get: function () {
        return TowerModel_1.TowerModel;
      },
    }),
    require("../Module/Track/TrackModel")),
  TrainingDegreeModel_1 =
    (Object.defineProperty(exports, "TrackModel", {
      enumerable: !0,
      get: function () {
        return TrackModel_1.TrackModel;
      },
    }),
    require("../Module/TrainingDegree/TrainingDegreeModel")),
  TutorialModel_1 =
    (Object.defineProperty(exports, "TrainingDegreeModel", {
      enumerable: !0,
      get: function () {
        return TrainingDegreeModel_1.TrainingDegreeModel;
      },
    }),
    require("../Module/Tutorial/TutorialModel")),
  UiNavigationModel_1 =
    (Object.defineProperty(exports, "TutorialModel", {
      enumerable: !0,
      get: function () {
        return TutorialModel_1.TutorialModel;
      },
    }),
    require("../Module/UiNavigation/UiNavigationModel")),
  WaitEntityTaskModel_1 =
    (Object.defineProperty(exports, "UiNavigationModel", {
      enumerable: !0,
      get: function () {
        return UiNavigationModel_1.UiNavigationModel;
      },
    }),
    require("../Module/WaitEntityTask/WaitEntityTaskModel")),
  WeaponModel_1 =
    (Object.defineProperty(exports, "WaitEntityTaskModel", {
      enumerable: !0,
      get: function () {
        return WaitEntityTaskModel_1.WaitEntityTaskModel;
      },
    }),
    require("../Module/Weapon/WeaponModel")),
  WeatherModel_1 =
    (Object.defineProperty(exports, "WeaponModel", {
      enumerable: !0,
      get: function () {
        return WeaponModel_1.WeaponModel;
      },
    }),
    require("../Module/Weather/WeatherModel")),
  WorldLevelModel_1 =
    (Object.defineProperty(exports, "WeatherModel", {
      enumerable: !0,
      get: function () {
        return WeatherModel_1.WeatherModel;
      },
    }),
    require("../Module/WorldLevel/WorldLevelModel")),
  WorldMapModel_1 =
    (Object.defineProperty(exports, "WorldLevelModel", {
      enumerable: !0,
      get: function () {
        return WorldLevelModel_1.WorldLevelModel;
      },
    }),
    require("../Module/WorldMap/WorldMapModel")),
  WuYinAreaModel_1 =
    (Object.defineProperty(exports, "WorldMapModel", {
      enumerable: !0,
      get: function () {
        return WorldMapModel_1.WorldMapModel;
      },
    }),
    require("../Module/WuYinArea/WuYinAreaModel")),
  BulletModel_1 =
    (Object.defineProperty(exports, "WuYinAreaModel", {
      enumerable: !0,
      get: function () {
        return WuYinAreaModel_1.WuYinAreaModel;
      },
    }),
    require("../NewWorld/Bullet/Model/BulletModel")),
  CharacterModel_1 =
    (Object.defineProperty(exports, "BulletModel", {
      enumerable: !0,
      get: function () {
        return BulletModel_1.BulletModel;
      },
    }),
    require("../NewWorld/Character/CharacterModel")),
  CharacterBuffModel_1 =
    (Object.defineProperty(exports, "CharacterModel", {
      enumerable: !0,
      get: function () {
        return CharacterModel_1.CharacterModel;
      },
    }),
    require("../NewWorld/Character/Common/Component/Abilities/CharacterBuffModel")),
  CharacterManipulateInteractModel_1 =
    (Object.defineProperty(exports, "BuffModel", {
      enumerable: !0,
      get: function () {
        return CharacterBuffModel_1.BuffModel;
      },
    }),
    require("../NewWorld/Character/Common/Component/CharacterManipulateInteractModel")),
  CharacterManipulaterModel_1 =
    (Object.defineProperty(exports, "ManipulateInteractModel", {
      enumerable: !0,
      get: function () {
        return CharacterManipulateInteractModel_1.ManipulateInteractModel;
      },
    }),
    require("../NewWorld/Character/Common/Component/CharacterManipulaterModel")),
  NpcConfigModel_1 =
    (Object.defineProperty(exports, "ManipulaterModel", {
      enumerable: !0,
      get: function () {
        return CharacterManipulaterModel_1.ManipulaterModel;
      },
    }),
    require("../NewWorld/Character/Npc/Datas/NpcConfigModel")),
  PortalModel_1 =
    (Object.defineProperty(exports, "NpcConfigModel", {
      enumerable: !0,
      get: function () {
        return NpcConfigModel_1.NpcConfigModel;
      },
    }),
    require("../NewWorld/SceneItem/Model/PortalModel")),
  RangeItemModel_1 =
    (Object.defineProperty(exports, "PortalModel", {
      enumerable: !0,
      get: function () {
        return PortalModel_1.PortalModel;
      },
    }),
    require("../NewWorld/SceneItem/Model/RangeItemModel")),
  SceneInteractionModel_1 =
    (Object.defineProperty(exports, "RangeItemModel", {
      enumerable: !0,
      get: function () {
        return RangeItemModel_1.RangeItemModel;
      },
    }),
    require("../NewWorld/SceneItem/Model/SceneInteractionModel")),
  SceneItemBuffModel_1 =
    (Object.defineProperty(exports, "SceneInteractionModel", {
      enumerable: !0,
      get: function () {
        return SceneInteractionModel_1.SceneInteractionModel;
      },
    }),
    require("../NewWorld/SceneItem/Model/SceneItemBuffModel")),
  ShootTargetModel_1 =
    (Object.defineProperty(exports, "SceneItemBuffModel", {
      enumerable: !0,
      get: function () {
        return SceneItemBuffModel_1.SceneItemBuffModel;
      },
    }),
    require("../NewWorld/SceneItem/Model/ShootTargetModel"));
Object.defineProperty(exports, "ShootTargetModel", {
  enumerable: !0,
  get: function () {
    return ShootTargetModel_1.ShootTargetModel;
  },
});
//# sourceMappingURL=PreloadModelClassPart2.js.map
