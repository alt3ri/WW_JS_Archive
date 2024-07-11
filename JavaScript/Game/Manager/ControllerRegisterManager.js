"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ControllerRegisterManager = void 0);
const Log_1 = require("../../Core/Common/Log");
const GameBudgetInterfaceController_1 = require("../../Core/GameBudgetAllocator/GameBudgetInterfaceController");
const AiModelController_1 = require("../AI/Common/AiModelController");
const TestModuleBridge_1 = require("../Bridge/TestModuleBridge");
const CameraController_1 = require("../Camera/CameraController");
const PackageConfigUtil_1 = require("../Common/PackageConfigUtil");
const CrashCollectionController_1 = require("../CrashCollection/CrashCollectionController");
const InputController_1 = require("../Input/InputController");
const InputSettingsController_1 = require("../InputSettings/InputSettingsController");
const KuroPushController_1 = require("../KuroPushSdk/KuroPushController");
const KuroSdkController_1 = require("../KuroSdk/KuroSdkController");
const LevelAimLineController_1 = require("../LevelGamePlay/AimLine/LevelAimLineController");
const CipherController_1 = require("../LevelGamePlay/Cipher/CipherController");
const GuaranteeController_1 = require("../LevelGamePlay/Guarantee/GuaranteeController");
const LevelGamePlayController_1 = require("../LevelGamePlay/LevelGamePlayController");
const LevelGeneralController_1 = require("../LevelGamePlay/LevelGeneralController");
const SundialControlController_1 = require("../LevelGamePlay/SundialControl/SundialControlController");
const TimeTrackController_1 = require("../LevelGamePlay/TimeTrackControl/TimeTrackController");
const TurntableControlController_1 = require("../LevelGamePlay/TurntableControl/TurntableControlController");
const UnopenedAreaController_1 = require("../LevelGamePlay/UnopenedArea/UnopenedAreaController");
const FormationAttributeController_1 = require("../Module/Abilities/FormationAttributeController");
const FormationDataController_1 = require("../Module/Abilities/FormationDataController");
const AchievementController_1 = require("../Module/Achievement/AchievementController");
const ActivityController_1 = require("../Module/Activity/ActivityController");
const AdventureGuideController_1 = require("../Module/AdventureGuide/AdventureGuideController");
const AdviceController_1 = require("../Module/Advice/AdviceController");
const AndroidBackController_1 = require("../Module/AndroidBack/AndroidBackController");
const AnimController_1 = require("../Module/Anim/AnimController");
const AntiCheatController_1 = require("../Module/AntiCheat/AntiCheatController");
const ApplicationController_1 = require("../Module/Application/ApplicationController");
const AppLinksController_1 = require("../Module/AppLinks/AppLinksController");
const AreaController_1 = require("../Module/Area/AreaController");
const GameAudioController_1 = require("../Module/Audio/GameAudioController");
const BattleScoreController_1 = require("../Module/Battle/Score/BattleScoreController");
const SkillCdController_1 = require("../Module/Battle/SkillCdController");
const BattleUiControl_1 = require("../Module/BattleUi/BattleUiControl");
const BattleUiDataControl_1 = require("../Module/BattleUi/BattleUiDataControl");
const BattleUiSetController_1 = require("../Module/BattleUiSet/BattleUiSetController");
const BlackScreenController_1 = require("../Module/BlackScreen/BlackScreenController");
const BlackScreenFadeController_1 = require("../Module/BlackScreen/BlackScreenFadeController");
const BuffItemControl_1 = require("../Module/BuffItem/BuffItemControl");
const CalabashController_1 = require("../Module/Calabash/CalabashController");
const CdKeyInputController_1 = require("../Module/CdKey/CdKeyInputController");
const ChannelController_1 = require("../Module/Channel/ChannelController");
const ChatController_1 = require("../Module/Chat/ChatController");
const CombatMessageController_1 = require("../Module/CombatMessage/CombatMessageController");
const RoleSceneInteractController_1 = require("../Module/CombatMessage/RoleSceneInteractController");
const SkillMessageController_1 = require("../Module/CombatMessage/SkillMessageController");
const ComboTeachingController_1 = require("../Module/ComboTeach/ComboTeachingController");
const FeatureRestrictionTemplate_1 = require("../Module/Common/FeatureRestrictionTemplate");
const CommonInputViewController_1 = require("../Module/Common/InputView/Controller/CommonInputViewController");
const ConfirmBoxController_1 = require("../Module/ConfirmBox/ConfirmBoxController");
const ControlScreenController_1 = require("../Module/ControlScreen/ControlScreenController");
const CookController_1 = require("../Module/Cook/CookController");
const CursorController_1 = require("../Module/Cursor/CursorController");
const DailyActivityController_1 = require("../Module/DailyActivity/DailyActivityController");
const DamageUiController_1 = require("../Module/DamageUi/DamageUiController");
const DeadReviveController_1 = require("../Module/DeadRevive/DeadReviveController");
const EditBattleTeamController_1 = require("../Module/EditBattleTeam/EditBattleTeamController");
const EditFormationController_1 = require("../Module/EditFormation/EditFormationController");
const ErrorCodeController_1 = require("../Module/ErrorCode/ErrorCodeController");
const ExploreLevelController_1 = require("../Module/ExploreLevel/ExploreLevelController");
const ExploreProgressController_1 = require("../Module/ExploreProgress/ExploreProgressController");
const FastJsObjectController_1 = require("../Module/FastJsObject/FastJsObjectController");
const FragmentMemoryController_1 = require("../Module/FragmentMemory/FragmentMemoryController");
const FriendController_1 = require("../Module/Friend/FriendController");
const FullScreenEffectController_1 = require("../Module/FullScreenEffect/FullScreenEffectController");
const FunctionController_1 = require("../Module/Functional/FunctionController");
const GachaController_1 = require("../Module/Gacha/GachaController");
const GamepadController_1 = require("../Module/Gamepad/GamepadController");
const GamePingController_1 = require("../Module/GamePing/GamePingController");
const GeneralLogicTreeController_1 = require("../Module/GeneralLogicTree/GeneralLogicTreeController");
const GenericPromptController_1 = require("../Module/GenericPrompt/GenericPromptController");
const GuideController_1 = require("../Module/Guide/GuideController");
const HandBookController_1 = require("../Module/HandBook/HandBookController");
const HelpController_1 = require("../Module/Help/HelpController");
const HideActorController_1 = require("../Module/HideActor/HideActorController");
const HudUnitController_1 = require("../Module/HudUnit/HudUnitController");
const InfluenceReputationController_1 = require("../Module/Influence/Controller/InfluenceReputationController");
const InfoDisplayController_1 = require("../Module/InfoDisplay/InfoDisplayController");
const ExchangeRewardController_1 = require("../Module/InstanceDungeon/ExchangeReward/ExchangeRewardController");
const InstanceDungeonController_1 = require("../Module/InstanceDungeon/InstanceDungeonController");
const InstanceDungeonEntranceController_1 = require("../Module/InstanceDungeon/InstanceDungeonEntranceController");
const InstanceDungeonGuideController_1 = require("../Module/InstanceDungeon/InstanceDungeonGuideController");
const InteractionController_1 = require("../Module/Interaction/InteractionController");
const InventoryController_1 = require("../Module/Inventory/InventoryController");
const InventoryGiftController_1 = require("../Module/Inventory/InventoryGiftController");
const ItemController_1 = require("../Module/Item/ItemController");
const SpecialItemController_1 = require("../Module/Item/SpecialItem/SpecialItemController");
const ItemDeliverController_1 = require("../Module/ItemDeliver/ItemDeliverController");
const ItemExchangeController_1 = require("../Module/ItemExchange/ItemExchangeController");
const ItemHintController_1 = require("../Module/ItemHint/ItemHintController");
const ItemRewardController_1 = require("../Module/ItemReward/ItemRewardController");
const JoinTeamController_1 = require("../Module/JoinTeam/JoinTeamController");
const KuroPerformanceController_1 = require("../Module/KuroPerformance/KuroPerformanceController");
const LanguageController_1 = require("../Module/Language/LanguageController");
const LevelLoadingController_1 = require("../Module/LevelLoading/LevelLoadingController");
const LevelPlayController_1 = require("../Module/LevelPlay/LevelPlayController");
const LevelUpController_1 = require("../Module/LevelUp/LevelUpController");
const LoadingController_1 = require("../Module/Loading/LoadingController");
const LoginController_1 = require("../Module/Login/LoginController");
const LoginServerController_1 = require("../Module/Login/LoginServerController");
const LogReportController_1 = require("../Module/LogReport/LogReportController");
const LordGymController_1 = require("../Module/LordGym/LordGymController");
const MailController_1 = require("../Module/Mail/MailController");
const ComposeController_1 = require("../Module/Manufacture/Compose/ComposeController");
const ForgingController_1 = require("../Module/Manufacture/Forging/ForgingController");
const MapController_1 = require("../Module/Map/Controller/MapController");
const MapExploreToolController_1 = require("../Module/MapExploreTool/MapExploreToolController");
const MarqueeController_1 = require("../Module/Marquee/MarqueeController");
const MenuController_1 = require("../Module/Menu/MenuController");
const MingSuController_1 = require("../Module/MingSu/MingSuController");
const MotionController_1 = require("../Module/Motion/MotionController");
const KuroMoveTriggerController_1 = require("../Module/Movement/KuroMoveTriggerController");
const OnlineController_1 = require("../Module/Online/OnlineController");
const PayItemController_1 = require("../Module/PayItem/PayItemController");
const BattlePassController_1 = require("../Module/PayShop/BattlePass/BattlePassController");
const MonthCardController_1 = require("../Module/PayShop/MonthCard/MonthCardController");
const PayGiftController_1 = require("../Module/PayShop/PayGiftController");
const PayShopController_1 = require("../Module/PayShop/PayShopController");
const PersonalController_1 = require("../Module/Personal/Controller/PersonalController");
const PersonalOptionController_1 = require("../Module/Personal/Model/PersonalOptionController");
const PhantomBattleController_1 = require("../Module/Phantom/PhantomBattle/PhantomBattleController");
const PhotographController_1 = require("../Module/Photograph/PhotographController");
const PlatformController_1 = require("../Module/Platform/PlatformController");
const PlayerInfoController_1 = require("../Module/PlayerInfo/PlayerInfoController");
const FlowController_1 = require("../Module/Plot/Flow/FlowController");
const PlotController_1 = require("../Module/Plot/PlotController");
const SequenceController_1 = require("../Module/Plot/Sequence/SequenceController");
const PowerController_1 = require("../Module/Power/PowerController");
const ProtocolMonitorController_1 = require("../Module/ProtocolMonitor/ProtocolMonitorController");
const QuestController_1 = require("../Module/QuestNew/Controller/QuestController");
const ReConnectController_1 = require("../Module/ReConnect/ReConnectController");
const ReportController_1 = require("../Module/Report/ReportController");
const RewardController_1 = require("../Module/Reward/RewardController");
const RoguelikeController_1 = require("../Module/Roguelike/RoguelikeController");
const RoleMorphController_1 = require("../Module/RoleMorph/RoleMorphController");
const MainRoleController_1 = require("../Module/RoleUi/MainRoleController");
const RoleController_1 = require("../Module/RoleUi/RoleController");
const RouletteController_1 = require("../Module/Roulette/RouletteController");
const SceneTeamController_1 = require("../Module/SceneTeam/SceneTeamController");
const ScreenShotController_1 = require("../Module/ScreenShot/ScreenShotController");
const ScrollingTipsController_1 = require("../Module/ScrollingTips/ScrollingTipsController");
const SeamlessTravelController_1 = require("../Module/SeamlessTravel/SeamlessTravelController");
const ShopController_1 = require("../Module/Shop/ShopController");
const SignalDecodeController_1 = require("../Module/SignalDecode/SignalDecodeController");
const SkillButtonUiController_1 = require("../Module/SkillButtonUi/SkillButtonUiController");
const SkipInterfaceController_1 = require("../Module/SkipInterface/SkipInterfaceController");
const SoundAreaPlayTipsController_1 = require("../Module/SoundArea/SoundAreaPlayTipsController");
const TeleportController_1 = require("../Module/Teleport/TeleportController");
const TimeOfDayController_1 = require("../Module/TimeOfDay/TimeOfDayController");
const TowerController_1 = require("../Module/TowerDetailUi/TowerController");
const TrackController_1 = require("../Module/Track/TrackController");
const TutorialController_1 = require("../Module/Tutorial/TutorialController");
const UiCameraController_1 = require("../Module/UiCamera/UiCameraController");
const UiCameraAnimationController_1 = require("../Module/UiCameraAnimation/UiCameraAnimationController");
const UiNavigationNewController_1 = require("../Module/UiNavigation/New/UiNavigationNewController");
const WaitEntityTaskController_1 = require("../Module/WaitEntityTask/WaitEntityTaskController");
const WaterMaskController_1 = require("../Module/WaterMask/WaterMaskController");
const WeaponController_1 = require("../Module/Weapon/WeaponController");
const WeatherController_1 = require("../Module/Weather/WeatherController");
const WorldLevelController_1 = require("../Module/WorldLevel/WorldLevelController");
const WorldMapController_1 = require("../Module/WorldMap/WorldMapController");
const BulletController_1 = require("../NewWorld/Bullet/BulletController");
const CharacterController_1 = require("../NewWorld/Character/CharacterController");
const CharacterShadowController_1 = require("../NewWorld/Character/CharacterShadowController");
const DynamicFlowController_1 = require("../NewWorld/Character/Common/Component/Flow/DynamicFlowController");
const RoleAudioController_1 = require("../NewWorld/Character/Role/RoleAudioController");
const RoleTriggerController_1 = require("../NewWorld/Character/Role/RoleTriggerController");
const SceneItemBuffController_1 = require("../NewWorld/SceneItem/Controller/SceneItemBuffController");
const SecenItemMoveController_1 = require("../NewWorld/SceneItem/Controller/SecenItemMoveController");
const PerfSightController_1 = require("../PerfSight/PerfSightController");
const RenderModuleController_1 = require("../Render/Manager/RenderModuleController");
const InputDistributeController_1 = require("../Ui/InputDistribute/InputDistributeController");
const LguiEventSystemController_1 = require("../Ui/LguiEventSystem/LguiEventSystemController");
const CombatDebugController_1 = require("../Utils/CombatDebugController");
const CombatDebugDrawController_1 = require("../Utils/CombatDebugDrawController");
const AoiController_1 = require("../World/Controller/AoiController");
const AttachToActorController_1 = require("../World/Controller/AttachToActorController");
const BlackboardController_1 = require("../World/Controller/BlackboardController");
const ComponentForceTickController_1 = require("../World/Controller/ComponentForceTickController");
const CreatureController_1 = require("../World/Controller/CreatureController");
const GameModeController_1 = require("../World/Controller/GameModeController");
const LogController_1 = require("../World/Controller/LogController");
const MultiInteractionActorController_1 = require("../World/Controller/MultiInteractionActorController");
const PreloadController_1 = require("../World/Controller/PreloadController");
const PreloadControllerNew_1 = require("../World/Controller/PreloadControllerNew");
const ServerGmController_1 = require("../World/Controller/ServerGmController");
const WorldController_1 = require("../World/Controller/WorldController");
const WorldDebugController_1 = require("../World/Controller/WorldDebugController");
const EnvironmentalPerceptionController_1 = require("../World/Enviroment/EnvironmentalPerceptionController");
const ControllerHolder_1 = require("./ControllerHolder");
const ControllerManager_1 = require("./ControllerManager");
class ControllerRegisterManager {
  static Init() {
    return this.OnInit()
      ? !!this.RegisterTick() ||
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "UiCore",
              18,
              "控制器系统注册Tick失败，请往上查看具体出错模块日志解决问题",
            ),
          !1)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "UiCore",
            18,
            "控制器系统初始化失败，请往上查看具体出错模块日志解决问题",
          ),
        !1);
  }
  static OnInit() {
    (ControllerHolder_1.ControllerHolder.ApplicationController =
      ApplicationController_1.ApplicationController),
      this.qp(ApplicationController_1.ApplicationController),
      (ControllerHolder_1.ControllerHolder.AreaController =
        AreaController_1.AreaController),
      this.qp(AreaController_1.AreaController),
      (ControllerHolder_1.ControllerHolder.RoleController =
        RoleController_1.RoleController),
      this.qp(RoleController_1.RoleController),
      (ControllerHolder_1.ControllerHolder.MapController =
        MapController_1.MapController),
      this.qp(MapController_1.MapController),
      (ControllerHolder_1.ControllerHolder.WorldMapController =
        WorldMapController_1.WorldMapController),
      this.qp(WorldMapController_1.WorldMapController),
      (ControllerHolder_1.ControllerHolder.WorldDebugController =
        WorldDebugController_1.WorldDebugController),
      this.qp(WorldDebugController_1.WorldDebugController),
      (ControllerHolder_1.ControllerHolder.MailController =
        MailController_1.MailController),
      this.qp(MailController_1.MailController),
      (ControllerHolder_1.ControllerHolder.LoginController =
        LoginController_1.LoginController),
      this.qp(LoginController_1.LoginController),
      (ControllerHolder_1.ControllerHolder.TimeOfDayController =
        TimeOfDayController_1.TimeOfDayController),
      this.qp(TimeOfDayController_1.TimeOfDayController),
      (ControllerHolder_1.ControllerHolder.SkillCdController =
        SkillCdController_1.SkillCdController),
      this.qp(SkillCdController_1.SkillCdController),
      (ControllerHolder_1.ControllerHolder.BattleUiControl =
        BattleUiControl_1.BattleUiControl),
      this.qp(BattleUiControl_1.BattleUiControl),
      (ControllerHolder_1.ControllerHolder.BattleUiDataControl =
        BattleUiDataControl_1.BattleUiDataControl),
      this.qp(BattleUiDataControl_1.BattleUiDataControl),
      (ControllerHolder_1.ControllerHolder.BattleScoreController =
        BattleScoreController_1.BattleScoreController),
      this.qp(BattleScoreController_1.BattleScoreController),
      (ControllerHolder_1.ControllerHolder.ShopController =
        ShopController_1.ShopController),
      this.qp(ShopController_1.ShopController),
      (ControllerHolder_1.ControllerHolder.FunctionController =
        FunctionController_1.FunctionController),
      this.qp(FunctionController_1.FunctionController),
      (ControllerHolder_1.ControllerHolder.ChannelController =
        ChannelController_1.ChannelController),
      this.qp(ChannelController_1.ChannelController),
      (ControllerHolder_1.ControllerHolder.LoadingController =
        LoadingController_1.LoadingController),
      this.qp(LoadingController_1.LoadingController),
      (ControllerHolder_1.ControllerHolder.ItemController =
        ItemController_1.ItemController),
      this.qp(ItemController_1.ItemController),
      (ControllerHolder_1.ControllerHolder.SceneTeamController =
        SceneTeamController_1.SceneTeamController),
      this.qp(SceneTeamController_1.SceneTeamController),
      (ControllerHolder_1.ControllerHolder.EditFormationController =
        EditFormationController_1.EditFormationController),
      this.qp(EditFormationController_1.EditFormationController),
      (ControllerHolder_1.ControllerHolder.ItemHintController =
        ItemHintController_1.ItemHintController),
      this.qp(ItemHintController_1.ItemHintController),
      (ControllerHolder_1.ControllerHolder.InventoryController =
        InventoryController_1.InventoryController),
      this.qp(InventoryController_1.InventoryController),
      (ControllerHolder_1.ControllerHolder.SpecialItemController =
        SpecialItemController_1.SpecialItemController),
      this.qp(SpecialItemController_1.SpecialItemController),
      (ControllerHolder_1.ControllerHolder.HelpController =
        HelpController_1.HelpController),
      this.qp(HelpController_1.HelpController),
      (ControllerHolder_1.ControllerHolder.RewardController =
        RewardController_1.RewardController),
      this.qp(RewardController_1.RewardController),
      (ControllerHolder_1.ControllerHolder.GuideController =
        GuideController_1.GuideController),
      this.qp(GuideController_1.GuideController),
      (ControllerHolder_1.ControllerHolder.ScrollingTipsController =
        ScrollingTipsController_1.ScrollingTipsController),
      this.qp(ScrollingTipsController_1.ScrollingTipsController),
      (ControllerHolder_1.ControllerHolder.PlayerInfoController =
        PlayerInfoController_1.PlayerInfoController),
      this.qp(PlayerInfoController_1.PlayerInfoController),
      (ControllerHolder_1.ControllerHolder.CipherController =
        CipherController_1.CipherController),
      this.qp(CipherController_1.CipherController),
      (ControllerHolder_1.ControllerHolder.TurntableControlController =
        TurntableControlController_1.TurntableControlController),
      this.qp(TurntableControlController_1.TurntableControlController),
      (ControllerHolder_1.ControllerHolder.TimeTrackController =
        TimeTrackController_1.TimeTrackController),
      this.qp(TimeTrackController_1.TimeTrackController),
      (ControllerHolder_1.ControllerHolder.SundialControlController =
        SundialControlController_1.SundialControlController),
      this.qp(SundialControlController_1.SundialControlController),
      (ControllerHolder_1.ControllerHolder.EditBattleTeamController =
        EditBattleTeamController_1.EditBattleTeamController),
      this.qp(EditBattleTeamController_1.EditBattleTeamController),
      (ControllerHolder_1.ControllerHolder.ErrorCodeController =
        ErrorCodeController_1.ErrorCodeController),
      this.qp(ErrorCodeController_1.ErrorCodeController),
      (ControllerHolder_1.ControllerHolder.ReConnectController =
        ReConnectController_1.ReConnectController),
      this.qp(ReConnectController_1.ReConnectController),
      (ControllerHolder_1.ControllerHolder.LevelGamePlayController =
        LevelGamePlayController_1.LevelGamePlayController),
      this.qp(LevelGamePlayController_1.LevelGamePlayController),
      (ControllerHolder_1.ControllerHolder.MingSuController =
        MingSuController_1.MingSuController),
      this.qp(MingSuController_1.MingSuController),
      (ControllerHolder_1.ControllerHolder.WeaponController =
        WeaponController_1.WeaponController),
      this.qp(WeaponController_1.WeaponController),
      (ControllerHolder_1.ControllerHolder.InstanceDungeonController =
        InstanceDungeonController_1.InstanceDungeonController),
      this.qp(InstanceDungeonController_1.InstanceDungeonController),
      (ControllerHolder_1.ControllerHolder.FullScreenEffectController =
        FullScreenEffectController_1.FullScreenEffectController),
      this.qp(FullScreenEffectController_1.FullScreenEffectController),
      (ControllerHolder_1.ControllerHolder.PlatformController =
        PlatformController_1.PlatformController),
      this.qp(PlatformController_1.PlatformController),
      (ControllerHolder_1.ControllerHolder.LevelGeneralController =
        LevelGeneralController_1.LevelGeneralController),
      this.qp(LevelGeneralController_1.LevelGeneralController),
      (ControllerHolder_1.ControllerHolder.GuaranteeController =
        GuaranteeController_1.GuaranteeController),
      this.qp(GuaranteeController_1.GuaranteeController),
      (ControllerHolder_1.ControllerHolder.CharacterController =
        CharacterController_1.CharacterController),
      this.qp(CharacterController_1.CharacterController),
      (ControllerHolder_1.ControllerHolder.InputController =
        InputController_1.InputController),
      this.qp(InputController_1.InputController),
      (ControllerHolder_1.ControllerHolder.CameraController =
        CameraController_1.CameraController),
      this.qp(CameraController_1.CameraController),
      (ControllerHolder_1.ControllerHolder.CreatureController =
        CreatureController_1.CreatureController),
      this.qp(CreatureController_1.CreatureController),
      (ControllerHolder_1.ControllerHolder.AoiController =
        AoiController_1.AoiController),
      this.qp(AoiController_1.AoiController),
      (ControllerHolder_1.ControllerHolder.PreloadController =
        PreloadController_1.PreloadController),
      this.qp(PreloadController_1.PreloadController),
      (ControllerHolder_1.ControllerHolder.PreloadControllerNew =
        PreloadControllerNew_1.PreloadControllerNew),
      this.qp(PreloadControllerNew_1.PreloadControllerNew),
      (ControllerHolder_1.ControllerHolder.WorldController =
        WorldController_1.WorldController),
      this.qp(WorldController_1.WorldController),
      (ControllerHolder_1.ControllerHolder.AttachToActorController =
        AttachToActorController_1.AttachToActorController),
      this.qp(AttachToActorController_1.AttachToActorController),
      (ControllerHolder_1.ControllerHolder.BlackboardController =
        BlackboardController_1.BlackboardController),
      this.qp(BlackboardController_1.BlackboardController),
      (ControllerHolder_1.ControllerHolder.GameModeController =
        GameModeController_1.GameModeController),
      this.qp(GameModeController_1.GameModeController),
      (ControllerHolder_1.ControllerHolder.BulletController =
        BulletController_1.BulletController),
      this.qp(BulletController_1.BulletController),
      (ControllerHolder_1.ControllerHolder.LevelUpController =
        LevelUpController_1.LevelUpController),
      this.qp(LevelUpController_1.LevelUpController),
      (ControllerHolder_1.ControllerHolder.PowerController =
        PowerController_1.PowerController),
      this.qp(PowerController_1.PowerController),
      (ControllerHolder_1.ControllerHolder.InputDistributeController =
        InputDistributeController_1.InputDistributeController),
      this.qp(InputDistributeController_1.InputDistributeController),
      (ControllerHolder_1.ControllerHolder.DeadReviveController =
        DeadReviveController_1.DeadReviveController),
      this.qp(DeadReviveController_1.DeadReviveController),
      (ControllerHolder_1.ControllerHolder.WorldLevelController =
        WorldLevelController_1.WorldLevelController),
      this.qp(WorldLevelController_1.WorldLevelController),
      (ControllerHolder_1.ControllerHolder.CalabashController =
        CalabashController_1.CalabashController),
      this.qp(CalabashController_1.CalabashController),
      (ControllerHolder_1.ControllerHolder.DamageUiController =
        DamageUiController_1.DamageUiController),
      this.qp(DamageUiController_1.DamageUiController),
      (ControllerHolder_1.ControllerHolder.PlotController =
        PlotController_1.PlotController),
      this.qp(PlotController_1.PlotController),
      (ControllerHolder_1.ControllerHolder.SequenceController =
        SequenceController_1.SequenceController),
      this.qp(SequenceController_1.SequenceController),
      (ControllerHolder_1.ControllerHolder.FlowController =
        FlowController_1.FlowController),
      this.qp(FlowController_1.FlowController),
      (ControllerHolder_1.ControllerHolder.ControlScreenController =
        ControlScreenController_1.ControlScreenController),
      this.qp(ControlScreenController_1.ControlScreenController),
      (ControllerHolder_1.ControllerHolder.JoinTeamController =
        JoinTeamController_1.JoinTeamController),
      this.qp(JoinTeamController_1.JoinTeamController),
      (ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController =
        InstanceDungeonEntranceController_1.InstanceDungeonEntranceController),
      this.qp(
        InstanceDungeonEntranceController_1.InstanceDungeonEntranceController,
      ),
      (ControllerHolder_1.ControllerHolder.UiCameraAnimationController =
        UiCameraAnimationController_1.UiCameraAnimationController),
      this.qp(UiCameraAnimationController_1.UiCameraAnimationController),
      (ControllerHolder_1.ControllerHolder.CursorController =
        CursorController_1.CursorController),
      this.qp(CursorController_1.CursorController),
      (ControllerHolder_1.ControllerHolder.BuffItemControl =
        BuffItemControl_1.BuffItemControl),
      this.qp(BuffItemControl_1.BuffItemControl),
      (ControllerHolder_1.ControllerHolder.MarqueeController =
        MarqueeController_1.MarqueeController),
      this.qp(MarqueeController_1.MarqueeController),
      (ControllerHolder_1.ControllerHolder.ProtocolMonitorController =
        ProtocolMonitorController_1.ProtocolMonitorController),
      this.qp(ProtocolMonitorController_1.ProtocolMonitorController),
      (ControllerHolder_1.ControllerHolder.TrackController =
        TrackController_1.TrackController),
      this.qp(TrackController_1.TrackController),
      (ControllerHolder_1.ControllerHolder.MenuController =
        MenuController_1.MenuController),
      this.qp(MenuController_1.MenuController),
      (ControllerHolder_1.ControllerHolder.RenderModuleController =
        RenderModuleController_1.RenderModuleController),
      this.qp(RenderModuleController_1.RenderModuleController),
      (ControllerHolder_1.ControllerHolder.LogReportController =
        LogReportController_1.LogReportController),
      this.qp(LogReportController_1.LogReportController),
      (ControllerHolder_1.ControllerHolder.GenericPromptController =
        GenericPromptController_1.GenericPromptController),
      this.qp(GenericPromptController_1.GenericPromptController),
      (ControllerHolder_1.ControllerHolder.CombatMessageController =
        CombatMessageController_1.CombatMessageController),
      this.qp(CombatMessageController_1.CombatMessageController),
      (ControllerHolder_1.ControllerHolder.FormationDataController =
        FormationDataController_1.FormationDataController),
      this.qp(FormationDataController_1.FormationDataController),
      (ControllerHolder_1.ControllerHolder.FormationAttributeController =
        FormationAttributeController_1.FormationAttributeController),
      this.qp(FormationAttributeController_1.FormationAttributeController),
      (ControllerHolder_1.ControllerHolder.QuestNewController =
        QuestController_1.QuestNewController),
      this.qp(QuestController_1.QuestNewController),
      (ControllerHolder_1.ControllerHolder.LguiEventSystemController =
        LguiEventSystemController_1.LguiEventSystemController),
      this.qp(LguiEventSystemController_1.LguiEventSystemController),
      (ControllerHolder_1.ControllerHolder.SkillMessageController =
        SkillMessageController_1.SkillMessageController),
      this.qp(SkillMessageController_1.SkillMessageController),
      (ControllerHolder_1.ControllerHolder.FriendController =
        FriendController_1.FriendController),
      this.qp(FriendController_1.FriendController),
      (ControllerHolder_1.ControllerHolder.EnvironmentalPerceptionController =
        EnvironmentalPerceptionController_1.EnvironmentalPerceptionController),
      this.qp(
        EnvironmentalPerceptionController_1.EnvironmentalPerceptionController,
      ),
      (ControllerHolder_1.ControllerHolder.ChatController =
        ChatController_1.ChatController),
      this.qp(ChatController_1.ChatController),
      (ControllerHolder_1.ControllerHolder.GeneralLogicTreeController =
        GeneralLogicTreeController_1.GeneralLogicTreeController),
      this.qp(GeneralLogicTreeController_1.GeneralLogicTreeController),
      (ControllerHolder_1.ControllerHolder.LevelPlayController =
        LevelPlayController_1.LevelPlayController),
      this.qp(LevelPlayController_1.LevelPlayController),
      (ControllerHolder_1.ControllerHolder.PayItemController =
        PayItemController_1.PayItemController),
      this.qp(PayItemController_1.PayItemController),
      (ControllerHolder_1.ControllerHolder.OnlineController =
        OnlineController_1.OnlineController),
      this.qp(OnlineController_1.OnlineController),
      (ControllerHolder_1.ControllerHolder.ConfirmBoxController =
        ConfirmBoxController_1.ConfirmBoxController),
      this.qp(ConfirmBoxController_1.ConfirmBoxController),
      (ControllerHolder_1.ControllerHolder.PayShopController =
        PayShopController_1.PayShopController),
      this.qp(PayShopController_1.PayShopController),
      (ControllerHolder_1.ControllerHolder.GachaController =
        GachaController_1.GachaController),
      this.qp(GachaController_1.GachaController),
      (ControllerHolder_1.ControllerHolder.ItemExchangeController =
        ItemExchangeController_1.ItemExchangeController),
      this.qp(ItemExchangeController_1.ItemExchangeController),
      (ControllerHolder_1.ControllerHolder.AdventureGuideController =
        AdventureGuideController_1.AdventureGuideController),
      this.qp(AdventureGuideController_1.AdventureGuideController),
      (ControllerHolder_1.ControllerHolder.PhantomBattleController =
        PhantomBattleController_1.PhantomBattleController),
      this.qp(PhantomBattleController_1.PhantomBattleController),
      (ControllerHolder_1.ControllerHolder.SkillButtonUiController =
        SkillButtonUiController_1.SkillButtonUiController),
      this.qp(SkillButtonUiController_1.SkillButtonUiController),
      (ControllerHolder_1.ControllerHolder.TutorialController =
        TutorialController_1.TutorialController),
      this.qp(TutorialController_1.TutorialController),
      (ControllerHolder_1.ControllerHolder.WeatherController =
        WeatherController_1.WeatherController),
      this.qp(WeatherController_1.WeatherController),
      (ControllerHolder_1.ControllerHolder.InfoDisplayController =
        InfoDisplayController_1.InfoDisplayController),
      this.qp(InfoDisplayController_1.InfoDisplayController),
      (ControllerHolder_1.ControllerHolder.MonthCardController =
        MonthCardController_1.MonthCardController),
      this.qp(MonthCardController_1.MonthCardController),
      (ControllerHolder_1.ControllerHolder.ReportController =
        ReportController_1.ReportController),
      this.qp(ReportController_1.ReportController),
      (ControllerHolder_1.ControllerHolder.CookController =
        CookController_1.CookController),
      this.qp(CookController_1.CookController),
      (ControllerHolder_1.ControllerHolder.InventoryGiftController =
        InventoryGiftController_1.InventoryGiftController),
      this.qp(InventoryGiftController_1.InventoryGiftController),
      (ControllerHolder_1.ControllerHolder.InfluenceReputationController =
        InfluenceReputationController_1.InfluenceReputationController),
      this.qp(InfluenceReputationController_1.InfluenceReputationController),
      (ControllerHolder_1.ControllerHolder.HudUnitController =
        HudUnitController_1.HudUnitController),
      this.qp(HudUnitController_1.HudUnitController),
      (ControllerHolder_1.ControllerHolder.SceneItemBuffController =
        SceneItemBuffController_1.SceneItemBuffController),
      this.qp(SceneItemBuffController_1.SceneItemBuffController),
      (ControllerHolder_1.ControllerHolder.GameAudioController =
        GameAudioController_1.GameAudioController),
      this.qp(GameAudioController_1.GameAudioController),
      (ControllerHolder_1.ControllerHolder.RoleAudioController =
        RoleAudioController_1.RoleAudioController),
      this.qp(RoleAudioController_1.RoleAudioController),
      (ControllerHolder_1.ControllerHolder.RoleTriggerController =
        RoleTriggerController_1.RoleTriggerController),
      this.qp(RoleTriggerController_1.RoleTriggerController),
      (ControllerHolder_1.ControllerHolder.CharacterShadowController =
        CharacterShadowController_1.CharacterShadowController),
      this.qp(CharacterShadowController_1.CharacterShadowController),
      (ControllerHolder_1.ControllerHolder.BattlePassController =
        BattlePassController_1.BattlePassController),
      this.qp(BattlePassController_1.BattlePassController),
      (ControllerHolder_1.ControllerHolder.ComposeController =
        ComposeController_1.ComposeController),
      this.qp(ComposeController_1.ComposeController),
      (ControllerHolder_1.ControllerHolder.ForgingController =
        ForgingController_1.ForgingController),
      this.qp(ForgingController_1.ForgingController),
      (ControllerHolder_1.ControllerHolder.MoveTriggerController =
        KuroMoveTriggerController_1.MoveTriggerController),
      this.qp(KuroMoveTriggerController_1.MoveTriggerController),
      (ControllerHolder_1.ControllerHolder.CombatDebugController =
        CombatDebugController_1.CombatDebugController),
      this.qp(CombatDebugController_1.CombatDebugController),
      (ControllerHolder_1.ControllerHolder.CombatDebugDrawController =
        CombatDebugDrawController_1.CombatDebugDrawController),
      this.qp(CombatDebugDrawController_1.CombatDebugDrawController),
      (ControllerHolder_1.ControllerHolder.AdviceController =
        AdviceController_1.AdviceController),
      this.qp(AdviceController_1.AdviceController),
      (ControllerHolder_1.ControllerHolder.MotionController =
        MotionController_1.MotionController),
      this.qp(MotionController_1.MotionController),
      (ControllerHolder_1.ControllerHolder.PhotographController =
        PhotographController_1.PhotographController),
      this.qp(PhotographController_1.PhotographController),
      (ControllerHolder_1.ControllerHolder.HandBookController =
        HandBookController_1.HandBookController),
      this.qp(HandBookController_1.HandBookController),
      (ControllerHolder_1.ControllerHolder.SkipInterfaceController =
        SkipInterfaceController_1.SkipInterfaceController),
      this.qp(SkipInterfaceController_1.SkipInterfaceController),
      (ControllerHolder_1.ControllerHolder.AntiCheatController =
        AntiCheatController_1.AntiCheatController),
      this.qp(AntiCheatController_1.AntiCheatController),
      (ControllerHolder_1.ControllerHolder.AppLinksController =
        AppLinksController_1.AppLinksController),
      this.qp(AppLinksController_1.AppLinksController),
      (ControllerHolder_1.ControllerHolder.ScreenShotController =
        ScreenShotController_1.ScreenShotController),
      this.qp(ScreenShotController_1.ScreenShotController),
      (ControllerHolder_1.ControllerHolder.BattleUiSetController =
        BattleUiSetController_1.BattleUiSetController),
      this.qp(BattleUiSetController_1.BattleUiSetController),
      (ControllerHolder_1.ControllerHolder.WaitEntityTaskController =
        WaitEntityTaskController_1.WaitEntityTaskController),
      this.qp(WaitEntityTaskController_1.WaitEntityTaskController),
      (ControllerHolder_1.ControllerHolder.AchievementController =
        AchievementController_1.AchievementController),
      this.qp(AchievementController_1.AchievementController),
      (ControllerHolder_1.ControllerHolder.LanguageController =
        LanguageController_1.LanguageController),
      this.qp(LanguageController_1.LanguageController),
      (ControllerHolder_1.ControllerHolder.MainRoleController =
        MainRoleController_1.MainRoleController),
      this.qp(MainRoleController_1.MainRoleController),
      (ControllerHolder_1.ControllerHolder.ComboTeachingController =
        ComboTeachingController_1.ComboTeachingController),
      this.qp(ComboTeachingController_1.ComboTeachingController),
      (ControllerHolder_1.ControllerHolder.UnopenedAreaController =
        UnopenedAreaController_1.UnopenedAreaController),
      this.qp(UnopenedAreaController_1.UnopenedAreaController),
      (ControllerHolder_1.ControllerHolder.UiNavigationNewController =
        UiNavigationNewController_1.UiNavigationNewController),
      this.qp(UiNavigationNewController_1.UiNavigationNewController),
      (ControllerHolder_1.ControllerHolder.PersonalController =
        PersonalController_1.PersonalController),
      this.qp(PersonalController_1.PersonalController),
      (ControllerHolder_1.ControllerHolder.PersonalOptionController =
        PersonalOptionController_1.PersonalOptionController),
      this.qp(PersonalOptionController_1.PersonalOptionController),
      (ControllerHolder_1.ControllerHolder.InputSettingsController =
        InputSettingsController_1.InputSettingsController),
      this.qp(InputSettingsController_1.InputSettingsController),
      (ControllerHolder_1.ControllerHolder.ActivityController =
        ActivityController_1.ActivityController),
      this.qp(ActivityController_1.ActivityController),
      (ControllerHolder_1.ControllerHolder.TeleportController =
        TeleportController_1.TeleportController),
      this.qp(TeleportController_1.TeleportController),
      (ControllerHolder_1.ControllerHolder.InteractionController =
        InteractionController_1.InteractionController),
      this.qp(InteractionController_1.InteractionController),
      (ControllerHolder_1.ControllerHolder.GameBudgetInterfaceController =
        GameBudgetInterfaceController_1.GameBudgetInterfaceController),
      this.qp(GameBudgetInterfaceController_1.GameBudgetInterfaceController),
      (ControllerHolder_1.ControllerHolder.ItemRewardController =
        ItemRewardController_1.ItemRewardController),
      this.qp(ItemRewardController_1.ItemRewardController),
      (ControllerHolder_1.ControllerHolder.LevelAimLineController =
        LevelAimLineController_1.LevelAimLineController),
      this.qp(LevelAimLineController_1.LevelAimLineController),
      (ControllerHolder_1.ControllerHolder.SeamlessTravelController =
        SeamlessTravelController_1.SeamlessTravelController),
      this.qp(SeamlessTravelController_1.SeamlessTravelController),
      (ControllerHolder_1.ControllerHolder.LoginServerController =
        LoginServerController_1.LoginServerController),
      this.qp(LoginServerController_1.LoginServerController),
      (ControllerHolder_1.ControllerHolder.RoleSceneInteractController =
        RoleSceneInteractController_1.RoleSceneInteractController),
      this.qp(RoleSceneInteractController_1.RoleSceneInteractController),
      (ControllerHolder_1.ControllerHolder.ExchangeRewardController =
        ExchangeRewardController_1.ExchangeRewardController),
      this.qp(ExchangeRewardController_1.ExchangeRewardController),
      (ControllerHolder_1.ControllerHolder.InstanceDungeonGuideController =
        InstanceDungeonGuideController_1.InstanceDungeonGuideController),
      this.qp(InstanceDungeonGuideController_1.InstanceDungeonGuideController),
      (ControllerHolder_1.ControllerHolder.DailyActivityController =
        DailyActivityController_1.DailyActivityController),
      this.qp(DailyActivityController_1.DailyActivityController),
      (ControllerHolder_1.ControllerHolder.BlackScreenController =
        BlackScreenController_1.BlackScreenController),
      this.qp(BlackScreenController_1.BlackScreenController),
      (ControllerHolder_1.ControllerHolder.BlackScreenFadeController =
        BlackScreenFadeController_1.BlackScreenFadeController),
      this.qp(BlackScreenFadeController_1.BlackScreenFadeController),
      (ControllerHolder_1.ControllerHolder.LevelLoadingController =
        LevelLoadingController_1.LevelLoadingController),
      this.qp(LevelLoadingController_1.LevelLoadingController),
      (ControllerHolder_1.ControllerHolder.GamePingController =
        GamePingController_1.GamePingController),
      this.qp(GamePingController_1.GamePingController),
      (ControllerHolder_1.ControllerHolder.RoguelikeController =
        RoguelikeController_1.RoguelikeController),
      this.qp(RoguelikeController_1.RoguelikeController),
      (ControllerHolder_1.ControllerHolder.RoleMorphController =
        RoleMorphController_1.RoleMorphController),
      this.qp(RoleMorphController_1.RoleMorphController),
      (ControllerHolder_1.ControllerHolder.TowerController =
        TowerController_1.TowerController),
      this.qp(TowerController_1.TowerController),
      (ControllerHolder_1.ControllerHolder.ComponentForceTickController =
        ComponentForceTickController_1.ComponentForceTickController),
      this.qp(ComponentForceTickController_1.ComponentForceTickController),
      (ControllerHolder_1.ControllerHolder.RouletteController =
        RouletteController_1.RouletteController),
      this.qp(RouletteController_1.RouletteController),
      (ControllerHolder_1.ControllerHolder.MapExploreToolController =
        MapExploreToolController_1.MapExploreToolController),
      this.qp(MapExploreToolController_1.MapExploreToolController),
      (ControllerHolder_1.ControllerHolder.LordGymController =
        LordGymController_1.LordGymController),
      this.qp(LordGymController_1.LordGymController),
      (ControllerHolder_1.ControllerHolder.ExploreProgressController =
        ExploreProgressController_1.ExploreProgressController),
      this.qp(ExploreProgressController_1.ExploreProgressController),
      (ControllerHolder_1.ControllerHolder.ExploreLevelController =
        ExploreLevelController_1.ExploreLevelController),
      this.qp(ExploreLevelController_1.ExploreLevelController),
      (ControllerHolder_1.ControllerHolder.SignalDecodeController =
        SignalDecodeController_1.SignalDecodeController),
      this.qp(SignalDecodeController_1.SignalDecodeController),
      (ControllerHolder_1.ControllerHolder.AnimController =
        AnimController_1.AnimController),
      this.qp(AnimController_1.AnimController),
      (ControllerHolder_1.ControllerHolder.AndroidBackController =
        AndroidBackController_1.AndroidBackController),
      this.qp(AndroidBackController_1.AndroidBackController),
      (ControllerHolder_1.ControllerHolder.HideActorController =
        HideActorController_1.HideActorController),
      this.qp(HideActorController_1.HideActorController),
      (ControllerHolder_1.ControllerHolder.CdKeyInputController =
        CdKeyInputController_1.CdKeyInputController),
      this.qp(CdKeyInputController_1.CdKeyInputController),
      (ControllerHolder_1.ControllerHolder.ItemDeliverController =
        ItemDeliverController_1.ItemDeliverController),
      this.qp(ItemDeliverController_1.ItemDeliverController),
      (ControllerHolder_1.ControllerHolder.CrashCollectionController =
        CrashCollectionController_1.CrashCollectionController),
      this.qp(CrashCollectionController_1.CrashCollectionController),
      (ControllerHolder_1.ControllerHolder.PerfSightController =
        PerfSightController_1.PerfSightController),
      this.qp(PerfSightController_1.PerfSightController),
      (ControllerHolder_1.ControllerHolder.DynamicFlowController =
        DynamicFlowController_1.DynamicFlowController),
      this.qp(DynamicFlowController_1.DynamicFlowController),
      (ControllerHolder_1.ControllerHolder.GamepadController =
        GamepadController_1.GamepadController),
      this.qp(GamepadController_1.GamepadController),
      (ControllerHolder_1.ControllerHolder.FastJsObjectController =
        FastJsObjectController_1.FastJsObjectController),
      this.qp(FastJsObjectController_1.FastJsObjectController),
      (ControllerHolder_1.ControllerHolder.SoundAreaPlayTipsController =
        SoundAreaPlayTipsController_1.SoundAreaPlayTipsController),
      this.qp(SoundAreaPlayTipsController_1.SoundAreaPlayTipsController),
      (ControllerHolder_1.ControllerHolder.KuroSdkController =
        KuroSdkController_1.KuroSdkController),
      this.qp(KuroSdkController_1.KuroSdkController),
      (ControllerHolder_1.ControllerHolder.KuroPushController =
        KuroPushController_1.KuroPushController),
      this.qp(KuroPushController_1.KuroPushController),
      (ControllerHolder_1.ControllerHolder.PayGiftController =
        PayGiftController_1.PayGiftController),
      this.qp(PayGiftController_1.PayGiftController),
      (ControllerHolder_1.ControllerHolder.MultiInteractionActorController =
        MultiInteractionActorController_1.MultiInteractionActorController),
      this.qp(
        MultiInteractionActorController_1.MultiInteractionActorController,
      ),
      (ControllerHolder_1.ControllerHolder.KuroPerformanceController =
        KuroPerformanceController_1.KuroPerformanceController),
      this.qp(KuroPerformanceController_1.KuroPerformanceController),
      (ControllerHolder_1.ControllerHolder.LogController =
        LogController_1.LogController),
      this.qp(LogController_1.LogController),
      (ControllerHolder_1.ControllerHolder.FragmentMemoryController =
        FragmentMemoryController_1.FragmentMemoryController),
      this.qp(FragmentMemoryController_1.FragmentMemoryController),
      (ControllerHolder_1.ControllerHolder.SceneItemMoveController =
        SecenItemMoveController_1.SceneItemMoveController),
      this.qp(SecenItemMoveController_1.SceneItemMoveController),
      this.qp(ServerGmController_1.ServerGmController);
    const r =
      FeatureRestrictionTemplate_1.FeatureRestrictionTemplate
        .TemplateForPioneerClient;
    return (
      PackageConfigUtil_1.PackageConfigUtil.GetPackageConfigOrDefault(
        "WaterMask",
        "false",
      ) === "true" &&
        r.Check() &&
        this.qp(WaterMaskController_1.WaterMaskView),
      TestModuleBridge_1.TestModuleBridge.TryGetTestModuleExports().then(
        (r) => {
          r &&
            r.GmController &&
            (this.qp(r.GmController), r.GmController.Init());
        },
      ),
      this.qp(CommonInputViewController_1.CommonInputViewController),
      !0
    );
  }
  static RegisterTick() {
    return (
      this.PBe(CombatMessageController_1.CombatMessageController),
      this.PBe(GameModeController_1.GameModeController),
      this.PBe(CharacterController_1.CharacterController),
      this.PBe(WorldController_1.WorldController),
      this.PBe(CameraController_1.CameraController),
      this.PBe(AoiController_1.AoiController),
      this.PBe(LevelGeneralController_1.LevelGeneralController),
      this.PBe(TimeOfDayController_1.TimeOfDayController),
      this.PBe(PowerController_1.PowerController),
      this.PBe(SkillMessageController_1.SkillMessageController),
      this.PBe(
        EnvironmentalPerceptionController_1.EnvironmentalPerceptionController,
      ),
      this.PBe(QuestController_1.QuestNewController),
      this.PBe(ItemHintController_1.ItemHintController),
      this.PBe(HudUnitController_1.HudUnitController),
      this.PBe(RoleTriggerController_1.RoleTriggerController),
      this.PBe(CharacterShadowController_1.CharacterShadowController),
      this.PBe(AiModelController_1.AiModelController),
      this.PBe(AreaController_1.AreaController),
      this.PBe(DamageUiController_1.DamageUiController),
      this.PBe(CombatDebugDrawController_1.CombatDebugDrawController),
      this.PBe(PlotController_1.PlotController),
      this.PBe(PhotographController_1.PhotographController),
      this.PBe(LevelPlayController_1.LevelPlayController),
      this.PBe(GeneralLogicTreeController_1.GeneralLogicTreeController),
      this.PBe(BulletController_1.BulletController),
      this.PBe(UnopenedAreaController_1.UnopenedAreaController),
      this.PBe(UiNavigationNewController_1.UiNavigationNewController),
      this.PBe(OnlineController_1.OnlineController),
      this.PBe(SkillCdController_1.SkillCdController),
      this.PBe(SundialControlController_1.SundialControlController),
      this.PBe(FormationDataController_1.FormationDataController),
      this.PBe(FormationAttributeController_1.FormationAttributeController),
      this.PBe(ComponentForceTickController_1.ComponentForceTickController),
      this.PBe(UiCameraController_1.UiCameraController),
      this.PBe(CrashCollectionController_1.CrashCollectionController),
      this.PBe(PerfSightController_1.PerfSightController),
      this.PBe(FlowController_1.FlowController),
      this.PBe(SequenceController_1.SequenceController),
      this.PBe(LevelLoadingController_1.LevelLoadingController),
      this.PBe(TeleportController_1.TeleportController),
      this.PBe(KuroPerformanceController_1.KuroPerformanceController),
      this.PBe(
        MultiInteractionActorController_1.MultiInteractionActorController,
      ),
      !0
    );
  }
  static qp(r) {
    ControllerManager_1.ControllerManager.Add(r);
  }
  static PBe(r) {
    ControllerManager_1.ControllerManager.AddTickController(r);
  }
}
exports.ControllerRegisterManager = ControllerRegisterManager;
// # sourceMappingURL=ControllerRegisterManager.js.map
