"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiViewManager = void 0);
const CipherView_1 = require("../LevelGamePlay/Cipher/CipherView");
const SignalDeviceGuideView_1 = require("../LevelGamePlay/SignalDeviceControl/SignalDeviceGuideView");
const SignalDeviceView_1 = require("../LevelGamePlay/SignalDeviceControl/SignalDeviceView");
const SundialControlView_1 = require("../LevelGamePlay/SundialControl/SundialControlView");
const TimeTrackControlView_1 = require("../LevelGamePlay/TimeTrackControl/TimeTrackControlView");
const TurntableControlView_1 = require("../LevelGamePlay/TurntableControl/TurntableControlView");
const AchievementCompleteTipsView_1 = require("../Module/Achievement/Views/AchievementCompleteTipsView");
const AchievementDetailView_1 = require("../Module/Achievement/Views/AchievementDetailView");
const AchievementFinishView_1 = require("../Module/Achievement/Views/AchievementFinishView");
const AchievementMainView_1 = require("../Module/Achievement/Views/AchievementMainView");
const AchievementRewardItemView_1 = require("../Module/Achievement/Views/AchievementRewardItemView");
const AcquireView_1 = require("../Module/Acquire/AcquireView");
const BossRushMainView_1 = require("../Module/Activity/ActivityContent/BossRush/BossRushMainView");
const LongShanUnlockView_1 = require("../Module/Activity/ActivityContent/LongShan/LongShanUnlockView");
const LongShanView_1 = require("../Module/Activity/ActivityContent/LongShan/LongShanView");
const RoleIntroductionView_1 = require("../Module/Activity/ActivityContent/RoleTrial/RoleIntroductionView");
const ActivityRunFailView_1 = require("../Module/Activity/ActivityContent/Run/ActivityRunFailView");
const ActivityRunSuccessView_1 = require("../Module/Activity/ActivityContent/Run/ActivityRunSuccessView");
const ActivityRunView_1 = require("../Module/Activity/ActivityContent/Run/ActivityRunView");
const ActivityTurntableRewardView_1 = require("../Module/Activity/ActivityContent/Turntable/ActivityTurntableRewardView");
const ActivityRewardPopUpView_1 = require("../Module/Activity/ActivityContent/UniversalComponents/PopUp/ActivityRewardPopUpView");
const ActivityUnlockTipView_1 = require("../Module/Activity/View/ActivityUnlockTipView");
const CommonActivityView_1 = require("../Module/Activity/View/CommonActivityView");
const GuideView_1 = require("../Module/AdventureGuide/Views/GuideView");
const AdviceAllView_1 = require("../Module/Advice/Views/AdviceAllView");
const AdviceExpressionView_1 = require("../Module/Advice/Views/AdviceExpressionView");
const AdviceInfoView_1 = require("../Module/Advice/Views/AdviceInfoView");
const AdviceMutiSentenceSelectView_1 = require("../Module/Advice/Views/AdviceMutiSentenceSelectView");
const AdviceSortWordSelectView_1 = require("../Module/Advice/Views/AdviceSortWordSelectView");
const AdviceView_1 = require("../Module/Advice/Views/AdviceView");
const AdviceWordSelectView_1 = require("../Module/Advice/Views/AdviceWordSelectView");
const AreaView_1 = require("../Module/Area/AreaView");
const AttributeView_1 = require("../Module/Attribute/AttributeView");
const BattleSequenceQteView_1 = require("../Module/BattleUi/Views/BattleSequenceQteView");
const BattleView_1 = require("../Module/BattleUi/Views/BattleView");
const BattleFloatTipsView_1 = require("../Module/BattleUi/Views/Tips/BattleFloatTipsView");
const BattleUiSetView_1 = require("../Module/BattleUiSet/View/BattleUiSetView");
const UseBuffItemView_1 = require("../Module/BuffItem/View/UseBuffItemView");
const CalabashRootView_1 = require("../Module/Calabash/New/CalabashRootView");
const VisionRecoveryResultView_1 = require("../Module/Calabash/New/VisionRecovery/VisionRecoveryResultView");
const CalabashUnlockItemView_1 = require("../Module/Calabash/View/CalabashUnlockItemView");
const CalabashUpgradeSuccessView_1 = require("../Module/Calabash/View/CalabashUpgradeSuccessView");
const CdKeyInputView_1 = require("../Module/CdKey/CdKeyInputView");
const ChatExpressionView_1 = require("../Module/Chat/View/ChatExpressionView");
const ChatOption_1 = require("../Module/Chat/View/ChatOption");
const ChatView_1 = require("../Module/Chat/View/ChatView");
const QuickChatView_1 = require("../Module/Chat/View/QuickChatView");
const SelectedFriendChatView_1 = require("../Module/Chat/View/SelectedFriendChatView");
const ComboTeachingView_1 = require("../Module/ComboTeach/View/ComboTeachingView");
const FilterView_1 = require("../Module/Common/FilterSort/Filter/View/FilterView");
const VisionFilterView_1 = require("../Module/Common/FilterSort/Filter/View/VisionFilterView");
const SortView_1 = require("../Module/Common/FilterSort/Sort/View/SortView");
const CommonMultiInputView_1 = require("../Module/Common/InputView/View/CommonMultiInputView");
const CommonSingleInputView_1 = require("../Module/Common/InputView/View/CommonSingleInputView");
const ItemSelectView_1 = require("../Module/Common/ItemSelectView");
const RoleAttributeDetailView_1 = require("../Module/Common/RoleAttributeDetailView");
const CommonSuccessView_1 = require("../Module/Common/SuccessView/CommonSuccessView");
const CommunicateView_1 = require("../Module/Communicate/View/CommunicateView");
const ConfirmBoxView_1 = require("../Module/ConfirmBox/New/ConfirmBoxView");
const CookLevelView_1 = require("../Module/Cook/View/CookLevelView");
const CookPopView_1 = require("../Module/Cook/View/CookPopView");
const CookRoleView_1 = require("../Module/Cook/View/CookRoleView");
const CookRootView_1 = require("../Module/Cook/View/CookRootView");
const CookSuccessView_1 = require("../Module/Cook/View/CookSuccessView");
const CreateCharacterView_1 = require("../Module/CreateCharacter/Views/CreateCharacterView");
const ReviveItemView_1 = require("../Module/DeadRevive/views/ReviveItemView");
const ReviveView_1 = require("../Module/DeadRevive/views/ReviveView");
const LoginDebugView_1 = require("../Module/Debug/View/LoginDebugView");
const EditBattleTeamView_1 = require("../Module/EditBattleTeam/View/EditBattleTeamView");
const EditFormationView_1 = require("../Module/EditFormation/View/EditFormationView");
const ExitSkillView_1 = require("../Module/EditFormation/View/ExitSkill/ExitSkillView");
const ExploreLevelPreviewView_1 = require("../Module/ExploreLevel/View/ExploreLevelPreviewView");
const ExploreLevelRewardView_1 = require("../Module/ExploreLevel/View/ExploreLevelRewardView");
const ExploreLevelView_1 = require("../Module/ExploreLevel/View/ExploreLevelView");
const ExploreDetailView_1 = require("../Module/ExploreProgress/View/ExploreDetailView");
const ExploreMissionView_1 = require("../Module/ExploreProgress/View/ExploreMissionView");
const FragmentedCluesView_1 = require("../Module/FragmentMemory/FragmentedCluesView");
const MemoryDetailView_1 = require("../Module/FragmentMemory/MemoryDetailView");
const MemoryFragmentMainView_1 = require("../Module/FragmentMemory/MemoryFragmentMainView");
const ObtainFragmentView_1 = require("../Module/FragmentMemory/ObtainFragmentView");
const FriendBlackListView_1 = require("../Module/Friend/View/FriendBlackListView");
const FriendProcessView_1 = require("../Module/Friend/View/FriendProcessView");
const FriendSearchView_1 = require("../Module/Friend/View/FriendSearchView");
const FriendView_1 = require("../Module/Friend/View/FriendView");
const FunctionView_1 = require("../Module/Functional/View/FunctionView");
const FunctionOpenView_1 = require("../Module/FunctionOpen/FunctionOpenView");
const DrawMainViewNew_1 = require("../Module/Gacha/DrawView/DrawMainViewNew");
const GachaMainView_1 = require("../Module/Gacha/GachaMainView/GachaMainView");
const GachaSelectionView_1 = require("../Module/Gacha/GachaMainView/GachaSelectionView");
const GachaResultView_1 = require("../Module/Gacha/GachaResultView/GachaResultView");
const GachaScanView_1 = require("../Module/Gacha/GachaResultView/GachaScanView");
const PingView_1 = require("../Module/GamePing/PingView");
const QuestFailRangeTipsView_1 = require("../Module/GeneralLogicTree/View/QuestFailRangeTipsView");
const QuestRewardView_1 = require("../Module/GeneralLogicTree/View/QuestRewardView");
const GenericPromptView_1 = require("../Module/GenericPrompt/GenericPromptView");
const AdditionalTasksFloatTips_1 = require("../Module/GenericPrompt/View/AdditionalTasksFloatTips");
const ChallengeAchieveFloatTips_1 = require("../Module/GenericPrompt/View/ChallengeAchieveFloatTips");
const ChallengeFailedFloatTips_1 = require("../Module/GenericPrompt/View/ChallengeFailedFloatTips");
const ChallengeSuccessFloatTips_1 = require("../Module/GenericPrompt/View/ChallengeSuccessFloatTips");
const ChapterDivideFloatTips_1 = require("../Module/GenericPrompt/View/ChapterDivideFloatTips");
const ComboTeachingFloatTips_1 = require("../Module/GenericPrompt/View/ComboTeachingFloatTips");
const CountDownFloatTips_1 = require("../Module/GenericPrompt/View/CountDownFloatTips");
const DailyTaskEndFloatTips_1 = require("../Module/GenericPrompt/View/DailyTaskEndFloatTips");
const DelegateCompletionFloatTips_1 = require("../Module/GenericPrompt/View/DelegateCompletionFloatTips");
const DungeonAutoExitFloatTips_1 = require("../Module/GenericPrompt/View/DungeonAutoExitFloatTips");
const DungeonClearanceFloatTips_1 = require("../Module/GenericPrompt/View/DungeonClearanceFloatTips");
const EventConditionFloatTips_1 = require("../Module/GenericPrompt/View/EventConditionFloatTips");
const PrepareCountdownFloatTips_1 = require("../Module/GenericPrompt/View/PrepareCountdownFloatTips");
const RemainStarWarningFloatTips_1 = require("../Module/GenericPrompt/View/RemainStarWarningFloatTips");
const RogulikeRoomFloatTips_1 = require("../Module/GenericPrompt/View/RogulikeRoomFloatTips");
const GuideFocusView_1 = require("../Module/Guide/Views/GuideFocusView");
const GuideTipsView_1 = require("../Module/Guide/Views/GuideTipsView");
const GuideTutorialTipsView_1 = require("../Module/Guide/Views/GuideTutorialTipsView");
const GuideTutorialView_1 = require("../Module/Guide/Views/GuideTutorialView");
const AnimalHandBookView_1 = require("../Module/HandBook/AnimalHandBookView");
const ChipHandBookView_1 = require("../Module/HandBook/ChipHandBookView");
const GeographyHandBookView_1 = require("../Module/HandBook/GeographyHandBookView");
const HandBookEntranceView_1 = require("../Module/HandBook/HandBookEntranceView");
const HandBookPhotoView_1 = require("../Module/HandBook/HandBookPhotoView");
const HandBookQuestPlotView_1 = require("../Module/HandBook/HandBookQuestPlotView");
const HandBookQuestView_1 = require("../Module/HandBook/HandBookQuestView");
const HandBookRoleView_1 = require("../Module/HandBook/HandBookRoleView");
const ItemHandBookView_1 = require("../Module/HandBook/ItemHandBookView");
const MonsterHandBookView_1 = require("../Module/HandBook/MonsterHandBookView");
const PhantomHandBookView_1 = require("../Module/HandBook/PhantomHandBookView");
const WeaponHandBookView_1 = require("../Module/HandBook/WeaponHandBookView");
const HelpView_1 = require("../Module/Help/HelpView");
const HelpGuideView_1 = require("../Module/Help/View/HelpGuideView");
const InfoDisplayImgView_1 = require("../Module/InfoDisplay/Views/InfoDisplayImgView");
const InfoDisplayTypeFourView_1 = require("../Module/InfoDisplay/Views/InfoDisplayTypeFourView");
const InfoDisplayTypeOneView_1 = require("../Module/InfoDisplay/Views/InfoDisplayTypeOneView");
const InfoDisplayTypeThreeView_1 = require("../Module/InfoDisplay/Views/InfoDisplayTypeThreeView");
const InfoDisplayTypeTwoView_1 = require("../Module/InfoDisplay/Views/InfoDisplayTypeTwoView");
const DifficultUnlockTipView_1 = require("../Module/InstanceDungeon/DifficultUnlockTipView");
const InstanceDungeonAreaView_1 = require("../Module/InstanceDungeon/InstanceDungeonAreaView");
const InstanceDungeonEntranceView_1 = require("../Module/InstanceDungeon/InstanceDungeonEntranceView");
const InstanceDungeonFailView_1 = require("../Module/InstanceDungeon/InstanceDungeonFailView");
const InstanceDungeonGuideView_1 = require("../Module/InstanceDungeon/InstanceDungeonGuideView");
const InstanceDungeonMonsterView_1 = require("../Module/InstanceDungeon/InstanceDungeonMonsterView");
const InstanceDungeonRewardView_1 = require("../Module/InstanceDungeon/InstanceDungeonRewardView");
const InstanceDungeonVictoryView_1 = require("../Module/InstanceDungeon/InstanceDungeonVictoryView");
const InstanceMatchingConfirm_1 = require("../Module/InstanceDungeon/InstanceMatchingConfirm");
const InteractionHintView_1 = require("../Module/Interaction/View/InteractionHintView");
const AccessPathPcView_1 = require("../Module/Inventory/Views/AccessPathPcView");
const DestroyPreviewView_1 = require("../Module/Inventory/Views/DestroyPreviewView");
const InventoryGiftView_1 = require("../Module/Inventory/Views/InventoryGiftView");
const InventoryView_1 = require("../Module/Inventory/Views/InventoryView");
const ItemTipsView_1 = require("../Module/Item/Views/ItemTipsView");
const NewItemTipsView_1 = require("../Module/Item/Views/NewItemTipsView");
const ItemDeliverView_1 = require("../Module/ItemDeliver/Views/ItemDeliverView");
const CommonExchangeView_1 = require("../Module/ItemExchange/View/CommonExchangeView");
const ItemHintView_1 = require("../Module/ItemHint/Views/ItemHintView");
const ItemRewardView_1 = require("../Module/ItemHint/Views/ItemRewardView");
const CommonRewardView_1 = require("../Module/ItemReward/View/CommonRewardView");
const CompositeRewardView_1 = require("../Module/ItemReward/View/CompositeRewardView");
const ExploreRewardView_1 = require("../Module/ItemReward/View/ExploreRewardView");
const JoinTeamView_1 = require("../Module/JoinTeam/View/JoinTeamView");
const GameplayEnterView_1 = require("../Module/LevelPlay/GameplayView/GameplayEnterView");
const GameplayFirstPassView_1 = require("../Module/LevelPlay/GameplayView/GameplayFirstPassView");
const SceneGameplayItemRewardView_1 = require("../Module/LevelPlay/SceneGameplayItemRewardView");
const LevelUpView_1 = require("../Module/LevelUp/View/LevelUpView");
const LoadingView_1 = require("../Module/Loading/View/LoadingView");
const LoginAgeTipView_1 = require("../Module/Login/Views/LoginAgeTipView");
const LoginDubugPlyerNameView_1 = require("../Module/Login/Views/LoginDubugPlyerNameView");
const LoginOfficialView_1 = require("../Module/Login/Views/LoginOfficialView");
const LoginQueueTipsView_1 = require("../Module/Login/Views/LoginQueueTipsView");
const LoginServerView_1 = require("../Module/Login/Views/LoginServerView");
const LoginStatusView_1 = require("../Module/Login/Views/LoginStatusView");
const LordChallengeResultView_1 = require("../Module/LordGym/View/LordChallengeResultView");
const LordGymChallengeRecordView_1 = require("../Module/LordGym/View/LordGymChallengeRecordView");
const LordGymEntranceView_1 = require("../Module/LordGym/View/LordGymEntranceView");
const LordGymUnlockTipView_1 = require("../Module/LordGym/View/LordGymUnlockTipView");
const MailBoxView_1 = require("../Module/Mail/Views/MailBoxView");
const LevelUpgradeView_1 = require("../Module/Manufacture/Common/LevelUpgradeView");
const ManufactureHelpRoleView_1 = require("../Module/Manufacture/Common/ManufactureHelpRoleView");
const RewardPopView_1 = require("../Module/Manufacture/Common/RewardPopView");
const ComposeRootView_1 = require("../Module/Manufacture/Compose/View/ComposeRootView");
const ForgingRootView_1 = require("../Module/Manufacture/Forging/View/ForgingRootView");
const MarqueeView_1 = require("../Module/Marquee/Views/MarqueeView");
const ChangeActionTipsView_1 = require("../Module/Menu/KeySettingsView/ChangeActionTipsView");
const RepeatKeyTipsView_1 = require("../Module/Menu/KeySettingsView/RepeatKeyTipsView");
const MenuView_1 = require("../Module/Menu/MenuView");
const BrightnessView_1 = require("../Module/Menu/SubViews/BrightnessView");
const LogUploadView_1 = require("../Module/Menu/SubViews/LogUploadView");
const ResolutionListView_1 = require("../Module/Menu/SubViews/ResolutionListView");
const TextLanguageSettingView_1 = require("../Module/Menu/SubViews/TextLanguageSettingView");
const ToolWindowView_1 = require("../Module/Menu/SubViews/ToolWindowView");
const VoiceLanguageDownloadView_1 = require("../Module/Menu/SubViews/VoiceLanguageDownloadView");
const VoiceLanguageSelectView_1 = require("../Module/Menu/SubViews/VoiceLanguageSelectView");
const CollectItemView_1 = require("../Module/MingSu/View/CollectItemView");
const MingSuView_1 = require("../Module/MingSu/View/MingSuView");
const OnlineApplyView_1 = require("../Module/Online/View/OnlineApplyView");
const OnlineChallengeApplyView_1 = require("../Module/Online/View/OnlineChallengeApplyView");
const OnlineChallengeStateView_1 = require("../Module/Online/View/OnlineChallengeStateView");
const OnlineHallView_1 = require("../Module/Online/View/OnlineHallView");
const OnlineMatchSuccessView_1 = require("../Module/Online/View/OnlineMatchSuccessView");
const OnlineMultipleApplyView_1 = require("../Module/Online/View/OnlineMultipleApplyView");
const OnlineProcessView_1 = require("../Module/Online/View/OnlineProcessView");
const OnlineSearchView_1 = require("../Module/Online/View/OnlineSearchView");
const OnlineSettingView_1 = require("../Module/Online/View/OnlineSettingView");
const FrozenQteView_1 = require("../Module/PanelQte/View/FrozenQteView");
const InteractQteView_1 = require("../Module/PanelQte/View/InteractQteView");
const BattlePassBuyLevelView_1 = require("../Module/PayShop/BattlePass/BattlePassBuyLevelView");
const BattlePassFirstOpenView_1 = require("../Module/PayShop/BattlePass/BattlePassFirstOpenView");
const BattlePassMainView_1 = require("../Module/PayShop/BattlePass/BattlePassMainView");
const BattlePassPayView_1 = require("../Module/PayShop/BattlePass/BattlePassPayView");
const BattlePassUnlockView_1 = require("../Module/PayShop/BattlePass/BattlePassUnlockView");
const BattlePassUpLevelView_1 = require("../Module/PayShop/BattlePass/BattlePassUpLevelView");
const MonthCardRewardView_1 = require("../Module/PayShop/MonthCard/MonthCardRewardView");
const PayShopRootView_1 = require("../Module/PayShop/PayShopRootView");
const ExchangePopView_1 = require("../Module/PayShop/PopView/Exchange/ExchangePopView");
const GiftPackageDetailsView_1 = require("../Module/PayShop/PopView/GiftPackage/GiftPackageDetailsView");
const PersonalBirthView_1 = require("../Module/Personal/View/PersonalBirthView");
const PersonalEditView_1 = require("../Module/Personal/View/PersonalEditView");
const PersonalOptionView_1 = require("../Module/Personal/View/PersonalOptionView");
const PersonalRoleShowView_1 = require("../Module/Personal/View/PersonalRoleShowView");
const PersonalRootView_1 = require("../Module/Personal/View/PersonalRootView");
const PhantomBattleFettersObtainView_1 = require("../Module/Phantom/PhantomBattle/View/PhantomBattleFettersObtainView");
const PhantomBattleFettersView_1 = require("../Module/Phantom/PhantomBattle/View/PhantomBattleFettersView");
const VisionEquipmentView_1 = require("../Module/Phantom/Vision/View/VisionEquipmentView");
const VisionIntensifyView_1 = require("../Module/Phantom/Vision/View/VisionIntensifyView");
const VisionNewQualityView_1 = require("../Module/Phantom/Vision/View/VisionNewQualityView");
const VisionRecommendView_1 = require("../Module/Phantom/Vision/View/VisionRecommendView");
const VisionSkinView_1 = require("../Module/Phantom/Vision/View/VisionSkinView");
const PhotographSetupView_1 = require("../Module/Photograph/View/PhotographSetupView");
const PhotographView_1 = require("../Module/Photograph/View/PhotographView");
const PhotoSaveView_1 = require("../Module/Photograph/View/PhotoSaveView");
const PlotLogoView_1 = require("../Module/Plot/PlotView/PlotLogoView");
const PlotPhotoView_1 = require("../Module/Plot/PlotView/PlotPhotoView");
const PlotTransitionView_1 = require("../Module/Plot/PlotView/PlotTransitionView");
const PlotView_1 = require("../Module/Plot/PlotView/PlotView");
const PlotViewHud_1 = require("../Module/Plot/PlotView/PlotViewHud");
const PlotTipsView_1 = require("../Module/Plot/TipsTalk/PlotTipsView");
const PowerView_1 = require("../Module/Power/PowerView");
const NewMissionTips_1 = require("../Module/QuestNew/View/NewMissionTips");
const QuestHintView_1 = require("../Module/QuestNew/View/QuestHintView");
const QuestLockPreview_1 = require("../Module/QuestNew/View/QuestLockPreview");
const QuestView_1 = require("../Module/QuestNew/View/QuestView");
const NetWorkConfirmBoxView_1 = require("../Module/ReConnect/View/NetWorkConfirmBoxView");
const NetWorkMaskView_1 = require("../Module/ReConnect/View/NetWorkMaskView");
const ReportView_1 = require("../Module/Report/View/ReportView");
const CommonSelectResultView_1 = require("../Module/Roguelike/View/CommonSelectResultView");
const CommonSelectView_1 = require("../Module/Roguelike/View/CommonSelectView");
const EventResultView_1 = require("../Module/Roguelike/View/EventResultView");
const PhantomReplaceView_1 = require("../Module/Roguelike/View/PhantomReplaceView");
const PhantomSelectResultView_1 = require("../Module/Roguelike/View/PhantomSelectResultView");
const PhantomSelectView_1 = require("../Module/Roguelike/View/PhantomSelectView");
const RogueInfoView_1 = require("../Module/Roguelike/View/RogueInfoView");
const RoguelikeAchievementView_1 = require("../Module/Roguelike/View/RoguelikeAchievementView");
const RoguelikeActivityView_1 = require("../Module/Roguelike/View/RoguelikeActivityView");
const RoguelikeExitTips_1 = require("../Module/Roguelike/View/RoguelikeExitTips");
const RoguelikeInstanceEntrySelectView_1 = require("../Module/Roguelike/View/RoguelikeInstanceEntrySelectView");
const RoguelikeMemoryPlaceView_1 = require("../Module/Roguelike/View/RoguelikeMemoryPlaceView");
const RoguelikeRandomEventView_1 = require("../Module/Roguelike/View/RoguelikeRandomEventView");
const RoguelikeSelectRoleView_1 = require("../Module/Roguelike/View/RoguelikeSelectRoleView");
const RoguelikeSelectSpecialView_1 = require("../Module/Roguelike/View/RoguelikeSelectSpecialView");
const RoguelikeSettleView_1 = require("../Module/Roguelike/View/RoguelikeSettleView");
const RoguelikeShop_1 = require("../Module/Roguelike/View/RoguelikeShop");
const RoguelikeSkillOverView_1 = require("../Module/Roguelike/View/RoguelikeSkillOverView");
const RoguelikeSkillView_1 = require("../Module/Roguelike/View/RoguelikeSkillView");
const RoguelikeSpecialDetailView_1 = require("../Module/Roguelike/View/RoguelikeSpecialDetailView");
const RoguelikeTokenOverView_1 = require("../Module/Roguelike/View/RoguelikeTokenOverView");
const RoleBuffSelectView_1 = require("../Module/Roguelike/View/RoleBuffSelectView");
const RoleReplaceView_1 = require("../Module/Roguelike/View/RoleReplaceView");
const RoleSelectResultView_1 = require("../Module/Roguelike/View/RoleSelectResultView");
const RougelikeUnlockTips_1 = require("../Module/Roguelike/View/RougelikeUnlockTips");
const RoleHandBookRootView_1 = require("../Module/RoleHandBook/RoleHandBookRootView");
const QuickRoleSelectView_1 = require("../Module/RoleSelect/QuickRoleSelectView");
const TeamRoleSelectView_1 = require("../Module/RoleSelect/TeamRoleSelectView");
const RoleElementView_1 = require("../Module/RoleUi/MainRole/RoleElementView");
const RoleGenderChangeView_1 = require("../Module/RoleUi/MainRole/RoleGenderChangeView");
const RoleBreachSuccessView_1 = require("../Module/RoleUi/RoleBreach/RoleBreachSuccessView");
const RoleBreachView_1 = require("../Module/RoleUi/RoleBreach/RoleBreachView");
const RoleFavorHintView_1 = require("../Module/RoleUi/RoleFavor/RoleFavorHintView");
const RoleFavorInfoView_1 = require("../Module/RoleUi/RoleFavor/RoleFavorInfoView");
const RoleBreakPreviewView_1 = require("../Module/RoleUi/RoleLevel/RoleBreakPreviewView");
const RoleLevelUpSuccessAttributeView_1 = require("../Module/RoleUi/RoleLevel/RoleLevelUpSuccessAttributeView");
const RoleLevelUpSuccessEffectView_1 = require("../Module/RoleUi/RoleLevel/RoleLevelUpSuccessEffectView");
const RoleLevelUpView_1 = require("../Module/RoleUi/RoleLevel/RoleLevelUpView");
const RoleRootView_1 = require("../Module/RoleUi/RoleRootView");
const RoleSkillInputView_1 = require("../Module/RoleUi/RoleSkill/RoleSkillInputView");
const RoleSkillTreeInfoView_1 = require("../Module/RoleUi/RoleSkill/RoleSkillTreeInfoView");
const RoleTagDetailView_1 = require("../Module/RoleUi/RoleTag/RoleTagDetailView");
const RoleNewJoinTipView_1 = require("../Module/RoleUi/View/RoleNewJoinTipView");
const RoleNewJoinView_1 = require("../Module/RoleUi/View/RoleNewJoinView");
const RoleSelectionView_1 = require("../Module/RoleUi/View/RoleSelectionView");
const RouletteAssemblyView_1 = require("../Module/Roulette/View/RouletteAssemblyView");
const RouletteMainView_1 = require("../Module/Roulette/View/RouletteMainView");
const PlotSubtitleView_1 = require("../Module/Sequence/Subtitle/PlotSubtitleView");
const ShopView_1 = require("../Module/Shop/ShopView");
const SignalDecodeViewV2_1 = require("../Module/SignalDecode/View/New/SignalDecodeViewV2");
const SoundAreaPlayTips_1 = require("../Module/SoundArea/SoundAreaPlayTips");
const TimeOfDayView_1 = require("../Module/TimeOfDay/TimeOfDayView");
const TimeOfDayLoadingView_1 = require("../Module/TimeOfDay/Views/TimeOfDayLoadingView");
const TimeOfDaySecondView_1 = require("../Module/TimeOfDay/Views/TimeOfDaySecondView");
const TowerApplyFloorDataView_1 = require("../Module/TowerDetailUi/View/TowerApplyFloorDataView");
const TowerDetailInfomationView_1 = require("../Module/TowerDetailUi/View/TowerDetailInfomationView");
const TowerFloorDetailView_1 = require("../Module/TowerDetailUi/View/TowerFloorDetailView");
const TowerFloorView_1 = require("../Module/TowerDetailUi/View/TowerFloorView");
const TowerGuideView_1 = require("../Module/TowerDetailUi/View/TowerGuideView");
const TowerNormalView_1 = require("../Module/TowerDetailUi/View/TowerNormalView");
const TowerRecommendView_1 = require("../Module/TowerDetailUi/View/TowerRecommendView");
const TowerResetView_1 = require("../Module/TowerDetailUi/View/TowerResetView");
const TowerReviewView_1 = require("../Module/TowerDetailUi/View/TowerReviewView");
const TowerRewardView_1 = require("../Module/TowerDetailUi/View/TowerRewardView");
const TowerUnlockView_1 = require("../Module/TowerDetailUi/View/TowerUnlockView");
const TowerVariationView_1 = require("../Module/TowerDetailUi/View/TowerVariationView");
const TutorialView_1 = require("../Module/Tutorial/TutorialView");
const UidView_1 = require("../Module/UidShow/UidView");
const VideoView_1 = require("../Module/Video/VideoView");
const VolumeView_1 = require("../Module/Volume/VolumeView");
const WeaponBreachSuccessView_1 = require("../Module/Weapon/Breach/WeaponBreachSuccessView");
const WeaponPreviewView_1 = require("../Module/Weapon/Preview/WeaponPreviewView");
const WeaponResonanceSuccessView_1 = require("../Module/Weapon/Reasonance/WeaponResonanceSuccessView");
const WeaponReplaceView_1 = require("../Module/Weapon/Replace/WeaponReplaceView");
const WeaponRootView_1 = require("../Module/Weapon/WeaponRootView");
const WorldLevelChangeConfirmView_1 = require("../Module/WorldLevel/Views/WorldLevelChangeConfirmView");
const WorldLevelInfoView_1 = require("../Module/WorldLevel/Views/WorldLevelInfoView");
const WorldLevelUpView_1 = require("../Module/WorldLevel/Views/WorldLevelUpView");
const ExploreInfoView_1 = require("../Module/WorldMap/SubViews/ExploreInfoView");
const SilentAreaRewardPreviewPopView_1 = require("../Module/WorldMap/SubViews/Popup/SilentAreaRewardPreviewPopView");
const WorldMapView_1 = require("../Module/WorldMap/WorldMapView");
const UiViewStorage_1 = require("../Ui/UiViewStorage");
class UiViewManager {
  static Init() {
    UiViewStorage_1.UiViewStorage.RegisterUiTsInfo([
      ["BattleView", BattleView_1.BattleView, "UiView_Fight_Prefab"],
      ["MailBoxView", MailBoxView_1.MailBoxView, "UiView_Mail_Prefab"],
      ["WorldMapView", WorldMapView_1.WorldMapView, "UiView_WorldMap_Prefab"],
      ["RoleRootView", RoleRootView_1.RoleRootView, "UiView_RoleRoot_Prefab"],
      [
        "RoleBreachView",
        RoleBreachView_1.RoleBreachView,
        "UiView_RoleBreach_Prefab",
      ],
      [
        "RoleLevelUpView",
        RoleLevelUpView_1.RoleLevelUpView,
        "UiView_Rolelv_Prefab",
      ],
      [
        "RoleSelectionView",
        RoleSelectionView_1.RoleSelectionView,
        "UiItem_UiRoleList_Prefab",
      ],
      ["RoleNewJoinView", RoleNewJoinView_1.RoleNewJoinView, "UiView_JoinTeam"],
      [
        "RoleNewJoinTipView",
        RoleNewJoinTipView_1.RoleNewJoinTipView,
        "UiView_JoinTeamTips",
      ],
      [
        "TeamRoleSelectView",
        TeamRoleSelectView_1.TeamRoleSelectView,
        "UiView_SelectRole",
      ],
      [
        "QuickRoleSelectView",
        QuickRoleSelectView_1.QuickRoleSelectView,
        "UiView_QuickSelectRole",
      ],
      ["ShopView", ShopView_1.ShopView, "UiView_Store_Prefab"],
      ["AreaView", AreaView_1.AreaView, "UiView_Area_Prefab"],
      [
        "LoginView",
        LoginOfficialView_1.LoginOfficialView,
        "UiView_Login_Prefab",
      ],
      [
        "LoginQueueTipsView",
        LoginQueueTipsView_1.LoginQueueTipsView,
        "UiItem_TimeTip",
      ],
      [
        "LoginDebugPlayerNameView",
        LoginDubugPlyerNameView_1.LoginDebugPlayerNameView,
        "UiItem_DebugPlayerName",
      ],
      ["ItemTipsView", ItemTipsView_1.ItemTipsView, "UiView_ItemTips_Prefab"],
      ["QuestView", QuestView_1.QuestView, "UiView_Quest_Prefab"],
      [
        "NewItemTipsView",
        NewItemTipsView_1.NewItemTipsView,
        "UiView_NewItemTips_Prefab",
      ],
      [
        "RoleFavorHintView",
        RoleFavorHintView_1.RoleFavorHintView,
        "UiView_AcquireIntro_Prefab",
      ],
      ["FunctionView", FunctionView_1.FunctionView, "UiView_Function_Prefab"],
      ["ItemHintView", ItemHintView_1.ItemHintView, "UiItem_AcquireList", 1],
      [
        "EditFormationView",
        EditFormationView_1.EditFormationView,
        "UiView_Team",
      ],
      ["ExitSkillView", ExitSkillView_1.ExitSkillView, "UiView_ExitSkill"],
      ["HelpView", HelpView_1.HelpView, "UiView_Help_Prefab"],
      [
        "InventoryView",
        InventoryView_1.InventoryView,
        "UiView_Inventory_Prefab",
      ],
      [
        "DestroyPreviewView",
        DestroyPreviewView_1.DestroyPreviewView,
        "UiView_DestroyPreview",
      ],
      [
        "GuideTipsView",
        GuideTipsView_1.GuideTipsView,
        "UiView_BigWorldTextGuide_Prefab",
      ],
      [
        "GuideTutorialView",
        GuideTutorialView_1.GuideTutorialView,
        "UiView_TutorialsPopup",
      ],
      ["HelpGuideView", HelpGuideView_1.HelpGuideView, "UiView_TutorialsPopup"],
      [
        "SignalDeviceGuideView",
        SignalDeviceGuideView_1.SignalDeviceGuideView,
        "UiView_TutorialsPopup",
      ],
      [
        "GuideFocusView",
        GuideFocusView_1.GuideFocusView,
        "UiItem_GuideFocus_Prefab",
      ],
      [
        "GuideTutorialTipsView",
        GuideTutorialTipsView_1.GuideTutorialTipsView,
        "UiItem_MstTipsB",
      ],
      [
        "ItemRewardView",
        ItemRewardView_1.ItemRewardView,
        "UiView_ItemReward_Prefab",
      ],
      [
        "AchievementRewardItemView",
        AchievementRewardItemView_1.AchievementRewardItemView,
        "UiView_ItemReward_Prefab",
      ],
      ["CipherView", CipherView_1.CipherView, "UiView_Cipher_Prefab"],
      [
        "TimeTrackControlView",
        TimeTrackControlView_1.TimeTrackControlView,
        "UiView_TimeTrackControl_Prefab",
      ],
      [
        "TurntableControlView",
        TurntableControlView_1.TurntableControlView,
        "UiView_OpenDoor",
      ],
      [
        "SundialControlView",
        SundialControlView_1.SundialControlView,
        "UiView_OpenDoor",
      ],
      [
        "EditBattleTeamView",
        EditBattleTeamView_1.EditBattleTeamView,
        "UiView_BattleTeam",
      ],
      [
        "PlotSubtitleView",
        PlotSubtitleView_1.PlotSubtitleView,
        "UiView_Plot_Prefab",
      ],
      ["PlotView", PlotView_1.PlotView, "UiView_Plot_Prefab"],
      ["PlotViewHUD", PlotViewHud_1.PlotViewHud, "UiView_PlotD_Prefab"],
      [
        "PlotTransitionView",
        PlotTransitionView_1.PlotTransitionView,
        "UiView_PlotTransition_Prefab",
      ],
      [
        "PlotTransitionViewPop",
        PlotTransitionView_1.PlotTransitionView,
        "UiView_PlotTransition_Prefab",
      ],
      ["PlotPhotoView", PlotPhotoView_1.PlotPhotoView, "UiView_PhotoFull"],
      ["PlotLogoView", PlotLogoView_1.PlotLogoView, "UiView_Logo"],
      ["PlotTipsView", PlotTipsView_1.PlotTipsView, "UiView_MascotTips"],
      [
        "NetWorkMaskView",
        NetWorkMaskView_1.NetWorkMaskView,
        "UiView_NetWorkMask_Prefab",
      ],
      [
        "CreateCharacterView",
        CreateCharacterView_1.CreateCharacterView,
        "UiView_CreateRole_Prefab",
      ],
      ["MingSuView", MingSuView_1.MingSuView, "UiView_Sing_Prefab"],
      [
        "WeaponRootView",
        WeaponRootView_1.WeaponRootView,
        "UiView_WeaponRoot_Prefab",
      ],
      [
        "WeaponPreviewView",
        WeaponPreviewView_1.WeaponPreviewView,
        "UiView_WeaponPreview",
      ],
      [
        "WeaponReplaceView",
        WeaponReplaceView_1.WeaponReplaceView,
        "UiView_WeaponReplace_Prefab",
      ],
      [
        "WeaponBreachSuccessView",
        WeaponBreachSuccessView_1.WeaponBreachSuccessView,
        "UiView_WeaponBreachSuccess_Prefab",
      ],
      [
        "WeaponResonanceSuccessView",
        WeaponResonanceSuccessView_1.WeaponResonanceSuccessView,
        "UiView_WeaponResonanceSuccess_Prefab",
      ],
      [
        "LoginStatusView",
        LoginStatusView_1.LoginStatusView,
        "UiView_LoginStatus_Prefab",
      ],
      [
        "InstanceDungeonEntranceView",
        InstanceDungeonEntranceView_1.InstanceDungeonEntranceView,
        "UiView_Checkpoints_Prefab",
      ],
      [
        "InstanceDungeonVictoryView",
        InstanceDungeonVictoryView_1.InstanceDungeonVictoryView,
        "UiView_InstanceDungeonVictory_Prefab",
      ],
      [
        "InstanceDungeonFailView",
        InstanceDungeonFailView_1.InstanceDungeonFailView,
        "UiView_InstanceDungeonFail_Prefab",
      ],
      [
        "InstanceDungeonReward",
        InstanceDungeonRewardView_1.InstanceDungeonRewardView,
        "UiItem_CheckpointsJiangli",
      ],
      [
        "InstanceDungeonMonsterPreView",
        InstanceDungeonMonsterView_1.InstanceDungeonMonsterView,
        "UiItem_CheckpointsPopup",
      ],
      [
        "InstanceDungeonAreaView",
        InstanceDungeonAreaView_1.InstanceDungeonAreaView,
        "UiView_Area_Prefab",
      ],
      [
        "InstanceDungeonGuideView",
        InstanceDungeonGuideView_1.InstanceDungeonGuideView,
        "UiView_JoinTeam_Prefab",
      ],
      [
        "LordGymEntranceView",
        LordGymEntranceView_1.LordGymEntranceView,
        "UiView_LordGym",
      ],
      [
        "LordGymChallengeRecordView",
        LordGymChallengeRecordView_1.LordGymChallengeRecordView,
        "UiView_LordGymChallengeRecord",
      ],
      [
        "GameplayEnterView",
        GameplayEnterView_1.GameplayEnterView,
        "UiItem_TacetfieldW",
      ],
      [
        "GameplayFirstPassView",
        GameplayFirstPassView_1.GameplayFirstPassView,
        "UiItem_TacetfieldFirst",
      ],
      [
        "SceneGameplayItemRewardView",
        SceneGameplayItemRewardView_1.SceneGameplayItemRewardView,
        "UiView_SceneGameplayItemReward_Prefab",
      ],
      [
        "QuestHintView",
        QuestHintView_1.QuestHintView,
        "UiView_QuestHint_Prefab",
      ],
      [
        "AccessPathPcView",
        AccessPathPcView_1.AccessPathPcView,
        "UiView_AccessPath_Prefab",
      ],
      [
        "PhantomExploreView",
        RouletteMainView_1.RouletteMainView,
        "UiView_Roulette_Prefab",
      ],
      ["ConfirmBoxView", ConfirmBoxView_1.ConfirmBoxView, "UiItem_TipsInfo"],
      [
        "ConfirmBoxMiddleView",
        ConfirmBoxView_1.ConfirmBoxView,
        "UiItem_TipsInfoMiddle",
      ],
      [
        "ConfirmBoxMiddleWithoutItemView",
        ConfirmBoxView_1.ConfirmBoxView,
        "UiItem_TipsInfoMiddleWithoutItem",
      ],
      [
        "InteractionHintView",
        InteractionHintView_1.InteractionHintView,
        "UiView_InteractionHint_Prefab",
        1,
      ],
      ["VolumeView", VolumeView_1.VolumeView, "UiView_Volume_Prefab"],
      ["PowerView", PowerView_1.PowerView, "UiView_Power_Prefab"],
      ["LevelUpView", LevelUpView_1.LevelUpView, "UiView_UnionLevelTips"],
      [
        "TimeOfDayView",
        TimeOfDayView_1.TimeOfDayView,
        "UiView_TimeOfDay_Prefab",
      ],
      [
        "TimeOfDayLoadingView",
        TimeOfDayLoadingView_1.TimeOfDayLoadingView,
        "UiView_TimeOfDay_Loading_Prefab",
      ],
      ["ReviveView", ReviveView_1.ReviveView, "UiView_Revive_Prefab"],
      [
        "WorldLevelUpView",
        WorldLevelUpView_1.WorldLevelUpView,
        "UiView_PhaseLevel",
      ],
      [
        "WorldLevelInfoView",
        WorldLevelInfoView_1.WorldLevelInfoView,
        "UiView_WorldLevelInfo_Prefab",
      ],
      [
        "WorldLevelChangeConfirmView",
        WorldLevelChangeConfirmView_1.WorldLevelChangeConfirmView,
        "UiView_WorldLevelChangeConfirm_Prefab",
      ],
      [
        "GenericPromptView",
        GenericPromptView_1.GenericPromptView,
        "UiView_ComTips_Tips",
      ],
      ["JoinTeamView", JoinTeamView_1.JoinTeamView, "UiView_JoinTeam_Prefab"],
      ["MarqueeView", MarqueeView_1.MarqueeView, "UiView_Marquee_Prefab"],
      [
        "BattleSequenceQteView",
        BattleSequenceQteView_1.BattleSequenceQteView,
        "UiView_FightQTE_Prefab",
      ],
      [
        "UseBuffItemView",
        UseBuffItemView_1.UseBuffItemView,
        "UiView_UseBuff_Prefab",
      ],
      ["MenuView", MenuView_1.MenuView, "UiView_Setting_Prefab"],
      ["VideoView", VideoView_1.VideoView, "UiView_Video_Prefab"],
      [
        "LoginAgeTipView",
        LoginAgeTipView_1.LoginAgeTipView,
        "UiItem_LoginAgeTips",
      ],
      ["UidView", UidView_1.UidView, "UiView_UID_Prefab"],
      [
        "NetWorkConfirmBoxView",
        NetWorkConfirmBoxView_1.NetWorkConfirmBoxView,
        "UiItem_TipsInfo",
      ],
      [
        "CommonSuccessView",
        CommonSuccessView_1.CommonSuccessView,
        "UiView_CommonSuccess_Prefab",
      ],
      [
        "TextLanguageSettingView",
        TextLanguageSettingView_1.TextLanguageSettingView,
        "TextLanguageSettingView_Prefab",
      ],
      [
        "VoiceLanguageDownloadView",
        VoiceLanguageDownloadView_1.VoiceLanguageDownloadView,
        "VoiceLanguageDownloadView_Prefab",
      ],
      [
        "VoiceLanguageSelectView",
        VoiceLanguageSelectView_1.VoiceLanguageSelectView,
        "VoiceLanguageDownloadView_Prefab",
      ],
      ["FriendView", FriendView_1.FriendView, "UiView_Friends_Prefab"],
      [
        "FriendProcessView",
        FriendProcessView_1.FriendProcessView,
        "UiItem_CommonData_Prefab",
      ],
      [
        "OnlineProcessView",
        OnlineProcessView_1.OnlineProcessView,
        "UiItem_CommonData_Prefab",
      ],
      [
        "FriendSearchView",
        FriendSearchView_1.FriendSearchView,
        "UiView_FriendsSearch_Prefab",
      ],
      [
        "FriendBlackListView",
        FriendBlackListView_1.FriendBlackListView,
        "UiView_Friendsblacklist_Prefab",
      ],
      [
        "PhantomExploreSetView",
        RouletteAssemblyView_1.RouletteAssemblyView,
        "UiView_RouletteAssembly_Prefab",
      ],
      [
        "SelectedFriendChatView",
        SelectedFriendChatView_1.SelectedFriendChatView,
        "UiItem_UiChatIncrease",
      ],
      ["ChatView", ChatView_1.ChatView, "UiView_Uichat_Prefab"],
      ["QuickChatView", QuickChatView_1.QuickChatView, "UiView_PnlQuickTalk"],
      ["ChatOption", ChatOption_1.ChatOption, "UiItem_ExpandTips"],
      [
        "ChatExpressionView",
        ChatExpressionView_1.ChatExpressionView,
        "UiView_ExpressionTips_Prefab",
      ],
      [
        "OnlineWorldHallView",
        OnlineHallView_1.OnlineHallView,
        "UiView_OnlineHall_Prefab",
      ],
      [
        "OnlineSettingView",
        OnlineSettingView_1.OnlineSettingView,
        "UiView_OnlineSetting_Prefab",
      ],
      [
        "OnlineWorldSearchView",
        OnlineSearchView_1.OnlineSearchView,
        "UiView_OnlineSearchWindow_Prefab",
      ],
      [
        "OnlineApplyView",
        OnlineApplyView_1.OnlineApplyView,
        "UiView_OnlineApplyView_Prefab",
      ],
      [
        "OnlineMultipleApplyView",
        OnlineMultipleApplyView_1.OnlineMultipleApplyView,
        "UiView_OnlineMultipleApplyView_Prefab",
      ],
      [
        "OnlineChallengeApplyView",
        OnlineChallengeApplyView_1.OnlineChallengeApplyView,
        "UiView_OnlineApplyView_Prefab",
      ],
      [
        "OnlineMatchSuccessView",
        OnlineMatchSuccessView_1.OnlineMatchSuccessView,
        "UiView_OnlineApplyView_Prefab",
      ],
      [
        "OnlineChallengeStateView",
        OnlineChallengeStateView_1.OnlineChallengeStateView,
        "UiItem_OnlineChallengeState_Prefab",
      ],
      [
        "OnlineInstanceMatchTips",
        InstanceMatchingConfirm_1.InstanceMatchingConfirm,
        "UiItem_MatchTipsPopup",
      ],
      ["PayShopRootView", PayShopRootView_1.PayShopRootView, "UiView_ShopTab"],
      [
        "GiftPackageDetailsView",
        GiftPackageDetailsView_1.GiftPackageDetailsView,
        "UiItem_ShopGift_Prefab",
      ],
      [
        "CommonExchangeView",
        CommonExchangeView_1.CommonExchangeView,
        "UiItem_Exchange_Prefab",
      ],
      [
        "GachaMainView",
        GachaMainView_1.GachaMainView,
        "UiView_GachaMainView_Prefab",
      ],
      [
        "GachaResultView",
        GachaResultView_1.GachaResultView,
        "UiView_GachaResultView_Prefab",
      ],
      [
        "GachaScanView",
        GachaScanView_1.GachaScanView,
        "UiView_GachaScanView_Prefab",
      ],
      [
        "GachaSelectionView",
        GachaSelectionView_1.GachaSelectionView,
        "UiView_GachaSelectionView_Prefab",
      ],
      ["DrawMainView", DrawMainViewNew_1.DrawMainViewNew, "UiView_Draw_Prefab"],
      [
        "CalabashUpgradeSuccessView",
        CalabashUpgradeSuccessView_1.CalabashUpgradeSuccessView,
        "UiView_DataBankTips",
      ],
      [
        "PhantomBattleFettersView",
        PhantomBattleFettersView_1.PhantomBattleFettersView,
        "UiView_VisionAtlas_Prefab",
      ],
      [
        "VisionEquipmentView",
        VisionEquipmentView_1.VisionEquipmentView,
        "UiView_VisionChooseMain",
      ],
      [
        "VisionIntensifyView",
        VisionIntensifyView_1.VisionIntensifyView,
        "UiView_RoleComCaption",
      ],
      [
        "VisionRecommendView",
        VisionRecommendView_1.VisionRecommendView,
        "UiItem_VisionTipRecommend",
      ],
      [
        "VisionSkinView",
        VisionSkinView_1.VisionSkinView,
        "UiView_VisionSkin_Prefab",
      ],
      [
        "TimeOfDaySecondView",
        TimeOfDaySecondView_1.TimeOfDaySecondView,
        "UiView_TimeOfDaySecondView_Prefab",
      ],
      [
        "ExchangePopView",
        ExchangePopView_1.ExchangePopView,
        "UiItem_ExchangePopup",
      ],
      ["TutorialView", TutorialView_1.TutorialView, "UiView_Tutorials"],
      ["AdventureGuideView", GuideView_1.AdventureGuideView, "UiView_Guide"],
      ["AcquireView", AcquireView_1.AcquireView, "UiView_Acquire_Prefab", 1],
      [
        "InventoryGiftView",
        InventoryGiftView_1.InventoryGiftView,
        "UiItem_lnventoryGift_Prefab",
      ],
      [
        "InfoDisplayImgView",
        InfoDisplayImgView_1.InfoDisplayImgView,
        "UiView_InformationImg_Prefab",
      ],
      [
        "InfoDisplayTypeOneView",
        InfoDisplayTypeOneView_1.InfoDisplayTypeOneView,
        "UiView_InformationImg_A_Prefab",
      ],
      [
        "InfoDisplayTypeTwoView",
        InfoDisplayTypeTwoView_1.InfoDisplayTypeTwoView,
        "UiView_InformationImg_B_Prefab",
      ],
      [
        "InfoDisplayTypeThreeView",
        InfoDisplayTypeThreeView_1.InfoDisplayTypeThreeView,
        "UiView_InformationImg_C_Prefab",
      ],
      [
        "InfoDisplayTypeFourView",
        InfoDisplayTypeFourView_1.InfoDisplayTypeFourView,
        "UiView_InformationImg_D_Prefab",
      ],
      [
        "MonthCardRewardView",
        MonthCardRewardView_1.MonthCardRewardView,
        "UiItem_MonthlyCardreceive_Prefab",
      ],
      ["AttributeView", AttributeView_1.AttributeView, "UiItem_Attribute"],
      [
        "RoleAttributeDetailView",
        RoleAttributeDetailView_1.RoleAttributeDetailView,
        "UiView_Attribute",
      ],
      [
        "RoleSkillTreeInfoView",
        RoleSkillTreeInfoView_1.RoleSkillTreeInfoView,
        "UiView_RoleSkill",
      ],
      [
        "RoleSkillInputView",
        RoleSkillInputView_1.RoleSkillInputView,
        "UiView_RoleSkillInput",
      ],
      ["ReportView", ReportView_1.ReportView, "UiItem_UiChatReport"],
      [
        "RoleFavorInfoView",
        RoleFavorInfoView_1.RoleFavorInfoView,
        "UiView_RoleDanganliebiao_Prefab",
      ],
      [
        "FunctionOpenView",
        FunctionOpenView_1.FunctionOpenView,
        "UiView_FunctionOpen",
      ],
      [
        "TowerRewardView",
        TowerRewardView_1.TowerRewardView,
        "UiItem_TowerRewardPopup",
      ],
      [
        "TowerApplyFloorDataView",
        TowerApplyFloorDataView_1.TowerApplyFloorDataView,
        "UiItem_ResetTeamTipsPopup",
      ],
      [
        "TowerNormalView",
        TowerNormalView_1.TowerNormalView,
        "UiView_LevelNormal",
      ],
      [
        "TowerFloorView",
        TowerFloorView_1.TowerFloorView,
        "UiView_DailyTowerChallenge",
      ],
      [
        "TowerDetailView",
        TowerDetailInfomationView_1.TowerDetailView,
        "UiItem_SingleTowerNews",
      ],
      [
        "TowerVariationView",
        TowerVariationView_1.TowerVariationView,
        "UiView_LevelVariation",
      ],
      [
        "TowerResetView",
        TowerResetView_1.TowerResetView,
        "UiItem_ResetTeamPopup",
      ],
      [
        "TowerRecommendView",
        TowerRecommendView_1.TowerRecommendView,
        "UiItem_TeamRecommendPopup",
      ],
      [
        "TowerReviewView",
        TowerReviewView_1.TowerReviewView,
        "UiView_DailyTowerReview",
      ],
      [
        "TowerFloorDetailView",
        TowerFloorDetailView_1.TowerFloorDetailView,
        "UiItem_TiowerDetail",
      ],
      [
        "TowerGuideView",
        TowerGuideView_1.TowerGuideView,
        "UiView_TutorialsPopup",
      ],
      [
        "TowerUnlockView",
        TowerUnlockView_1.TowerUnlockView,
        "UiView_DailyTowerAreaOpen",
      ],
      [
        "EventConditionFloatTips",
        EventConditionFloatTips_1.EventConditionFloatTips,
        "UiView_Challenging_Conditions_Prefab",
      ],
      [
        "ChallengeAchieveFloatTips",
        ChallengeAchieveFloatTips_1.ChallengeAchieveFloatTips,
        "UiView_Challenges_Achieved_Prefab",
      ],
      [
        "ChallengeSuccessFloatTips",
        ChallengeSuccessFloatTips_1.ChallengeSuccessFloatTips,
        "UiView_Challenge_Success_Prefab",
      ],
      [
        "ChallengeFailedFloatTips",
        ChallengeFailedFloatTips_1.ChallengeFailedFloatTips,
        "UiView_Challenge_Failed_Prefab",
      ],
      [
        "AdditionalTasksFloatTips",
        AdditionalTasksFloatTips_1.AdditionalTasksFloatTips,
        "UiView_Additional_Tasks_Prefab",
      ],
      [
        "DelegateCompletionFloatTips",
        DelegateCompletionFloatTips_1.DelegateCompletionFloatTips,
        "UiView_Delegate_Completion_Prefab",
      ],
      [
        "CountDownFloatTips",
        CountDownFloatTips_1.CountDownFloatTips,
        "UiView_CountDown_Prefab",
      ],
      [
        "DungeonClearanceFloatTips",
        DungeonClearanceFloatTips_1.DungeonClearanceFloatTips,
        "UiView_DungeonClearanceTips_Prefab",
      ],
      [
        "DungeonAutoExitFloatTips",
        DungeonAutoExitFloatTips_1.DungeonAutoExitFloatTips,
        "UiView_DungeonAutoExitTips_Prefab",
      ],
      [
        "ChapterStartFloatTips",
        ChapterDivideFloatTips_1.ChapterDivideFloatTips,
        "UiView_TaskTips_Prefab",
      ],
      [
        "FlowChapterStartTips",
        ChapterDivideFloatTips_1.ChapterDivideFloatTips,
        "UiView_TaskTips_Prefab",
      ],
      [
        "ChapterEndFloatTips",
        ChapterDivideFloatTips_1.ChapterDivideFloatTips,
        "UiView_TaskTips_Prefab",
      ],
      [
        "FlowChapterEndTips",
        ChapterDivideFloatTips_1.ChapterDivideFloatTips,
        "UiView_TaskTips_Prefab",
      ],
      [
        "PrepareCountdownFloatTips",
        PrepareCountdownFloatTips_1.PrepareCountdownFloatTips,
        "UiView_PrepareCountdownFloatTips_Prefab",
      ],
      [
        "ComboTeachingFloatTips",
        ComboTeachingFloatTips_1.ComboTeachingFloatTips,
        "UiView_ComboTeachingFloatTips_Prefab",
      ],
      [
        "DailyTaskEndTips",
        DailyTaskEndFloatTips_1.DailyTaskEndFloatTips,
        "UiView_DailyTask_End",
      ],
      [
        "BattlePassMainView",
        BattlePassMainView_1.BattlePassMainView,
        "UiView_BattlePassTab",
      ],
      [
        "BattlePassBuyLevelView",
        BattlePassBuyLevelView_1.BattlePassBuyLevelView,
        "UiItem_BattlePassBuyPopup",
      ],
      [
        "BattlePassPayView",
        BattlePassPayView_1.BattlePassPayView,
        "UiView_BattlePassBuy",
      ],
      [
        "BattlePassUnlockView",
        BattlePassUnlockView_1.BattlePassUnlockView,
        "UiView_BattlePassUnlock",
      ],
      [
        "BattlePassUpLevelView",
        BattlePassUpLevelView_1.BattlePassUpLevelView,
        "UiView_BattlePassLevelUp",
      ],
      [
        "BattlePassFirstOpenView",
        BattlePassFirstOpenView_1.BattlePassFirstOpenView,
        "UiView_BattlePassOpen",
      ],
      ["CookRootView", CookRootView_1.CookRootView, "UiView_CookRoot_Prefab"],
      [
        "CookLevelView",
        CookLevelView_1.CookLevelView,
        "UiView_CookLevel_Prefab",
      ],
      ["CookRoleView", CookRoleView_1.CookRoleView, "UiView_CookRole_Prefab"],
      ["CookPopView", CookPopView_1.CookPopView, "UiView_CookingTips_Prefab"],
      [
        "CookPopFixView",
        CookPopView_1.CookPopView,
        "UiView_CookingTips_Prefab",
      ],
      [
        "CookSuccessView",
        CookSuccessView_1.CookSuccessView,
        "UiItem_CookingSuccess",
      ],
      [
        "ComposeRootView",
        ComposeRootView_1.ComposeRootView,
        "UiView_ComposeRoot_Prefab",
      ],
      [
        "ComposeLevelView",
        LevelUpgradeView_1.LevelUpgradeView,
        "UiView_CommonLevel_Prefab",
      ],
      [
        "ManufactureHelpRoleView",
        ManufactureHelpRoleView_1.ManufactureHelpRoleView,
        "UiView_CommonRole_Prefab",
      ],
      [
        "ForgingRootView",
        ForgingRootView_1.ForgingRootView,
        "UiView_CommonRoot_Prefab",
      ],
      [
        "RewardPopView",
        RewardPopView_1.RewardPopView,
        "UiView_CookingTips_Prefab",
      ],
      [
        "RoleHandBookRootView",
        RoleHandBookRootView_1.RoleHandBookRootView,
        "UiView_RoleRoot_Prefab",
      ],
      [
        "HandBookRoleView",
        HandBookRoleView_1.HandBookRoleView,
        "UiView_ArchiveRole",
      ],
      [
        "HandBookQuestPlotView",
        HandBookQuestPlotView_1.HandBookQuestPlotView,
        "UiView_ArchiveStoryReview",
      ],
      [
        "ResolutionListView",
        ResolutionListView_1.ResolutionListView,
        "TextLanguageSettingView_Prefab",
      ],
      [
        "BrightnessView",
        BrightnessView_1.BrightnessView,
        "BrightnessSettingView_Prefab",
      ],
      ["LogUploadView", LogUploadView_1.LogUploadView, "UiItem_LogUploadView"],
      ["ToolWindowView", ToolWindowView_1.ToolWindowView, "UiItem_ExpandTips"],
      ["AdviceCreateView", AdviceAllView_1.AdviceAllView, "UiItem_AdviceAll"],
      ["AdviceView", AdviceView_1.AdviceView, "UiItem_Advice"],
      [
        "AdviceSortWordView",
        AdviceSortWordSelectView_1.AdviceSortWordSelectView,
        "UiView_Advice_SortWord_Select_Prefab",
      ],
      [
        "AdviceMutiSentenceSelectView",
        AdviceMutiSentenceSelectView_1.AdviceMutiSentenceSelectView,
        "UiView_Advice_SortWord_Select_Prefab",
      ],
      [
        "AdviceWordView",
        AdviceWordSelectView_1.AdviceWordSelectView,
        "UiView_Advice_Word_Select_Prefab",
      ],
      [
        "AdviceExpressionView",
        AdviceExpressionView_1.AdviceExpressionView,
        "UiView_Advice_Expression_Select_Prefab",
      ],
      [
        "AdviceInfoView",
        AdviceInfoView_1.AdviceInfoView,
        "UiView_Advice_Info_Prefab",
      ],
      [
        "PhantomHandBookView",
        PhantomHandBookView_1.PhantomHandBookView,
        "UiView_ArchiveContent",
      ],
      [
        "WeaponHandBookView",
        WeaponHandBookView_1.WeaponHandBookView,
        "UiView_ArchiveContent",
      ],
      [
        "MonsterHandBookView",
        MonsterHandBookView_1.MonsterHandBookView,
        "UiView_ArchiveContent",
      ],
      [
        "ItemHandBookView",
        ItemHandBookView_1.ItemHandBookView,
        "UiView_ArchiveContent",
      ],
      [
        "AnimalHandBookView",
        AnimalHandBookView_1.AnimalHandBookView,
        "UiView_ArchiveContent",
      ],
      [
        "ChipHandBookView",
        ChipHandBookView_1.ChipHandBookView,
        "UiView_ArchiveChip",
      ],
      [
        "HandBookPhotoView",
        HandBookPhotoView_1.HandBookPhotoView,
        "UiView_PhotoFull",
      ],
      [
        "GeographyHandBookView",
        GeographyHandBookView_1.GeographyHandBookView,
        "UiView_ArchivePhoto",
      ],
      [
        "QuestHandBookView",
        HandBookQuestView_1.HandBookQuestView,
        "UiView_ArchiveStorySelect",
      ],
      [
        "HandBookEntranceView",
        HandBookEntranceView_1.HandBookEntranceView,
        "UiView_ArchiveEntrance",
      ],
      ["PhotographView", PhotographView_1.PhotographView, "UiView_Photograph"],
      [
        "PhotographSetupView",
        PhotographSetupView_1.PhotographSetupView,
        "UiView_SetupBg",
      ],
      ["PhotoSaveView", PhotoSaveView_1.PhotoSaveView, "UiView_PhotoSaving"],
      [
        "UseReviveItemView",
        ReviveItemView_1.ReviveItemView,
        "UiView_DeathBack_Prefab",
      ],
      [
        "PhantomBattleFettersObtainView",
        PhantomBattleFettersObtainView_1.PhantomBattleFettersObtainView,
        "UiView_VisionHuoqu_Prefab",
      ],
      [
        "CalabashUnlockItemView",
        CalabashUnlockItemView_1.CalabashUnlockItemView,
        "UiItem_VisionlRewardTip",
      ],
      [
        "VisionNewQualityView",
        VisionNewQualityView_1.VisionNewQualityView,
        "UiItem_MstTipsC",
      ],
      [
        "BattleUiSetView",
        BattleUiSetView_1.BattleUiSetView,
        "UiView_KeySetting",
      ],
      [
        "AchievementMainView",
        AchievementMainView_1.AchievementMainView,
        "UiView_Achievement_Main_Prefab",
      ],
      [
        "AchievementDetailView",
        AchievementDetailView_1.AchievementDetailView,
        "UiView_Achievement_Detail_Prefab",
      ],
      [
        "AchievementCompleteTipsView",
        AchievementCompleteTipsView_1.AchievementCompleteTipsView,
        "UiItem_AchievementTips",
      ],
      [
        "AchievementFinishView",
        AchievementFinishView_1.AchievementFinishView,
        "UiView_Achievement_Finish_Prefab",
      ],
      [
        "ExploreProgressView",
        ExploreInfoView_1.ExploreProgressView,
        "UiItem_WorldMapExplore_Prefab",
      ],
      [
        "RoleBreachSuccessView",
        RoleBreachSuccessView_1.RoleBreachSuccessView,
        "UiView_WeaponBreachSuccess_Prefab",
      ],
      ["LoginServerView", LoginServerView_1.LoginServerView, "UiItem_XuanFu"],
      [
        "RoleGenderChangeView",
        RoleGenderChangeView_1.RoleGenderChangeView,
        "UiItem_SetGender",
      ],
      [
        "RemainStarWarningTips",
        RemainStarWarningFloatTips_1.RemainStarWarningFloatTips,
        "UiItem_WarningTips",
      ],
      [
        "RoleElementView",
        RoleElementView_1.RoleElementView,
        "UiView_RoleElement",
      ],
      [
        "ComboTeachingView",
        ComboTeachingView_1.ComboTeachingView,
        "UiView_ComboTeaching",
      ],
      [
        "PersonalOptionView",
        PersonalOptionView_1.PersonalOptionView,
        "UiItem_CommonData_Prefab",
      ],
      [
        "PersonalRootView",
        PersonalRootView_1.PersonalRootView,
        "UiView_IndiviMain",
      ],
      [
        "PersonalBirthView",
        PersonalBirthView_1.PersonalBirthView,
        "UiItem_SetBirthday",
      ],
      ["PersonalEditView", PersonalEditView_1.PersonalEditView, "UiItem_Edit"],
      [
        "PersonalRoleShowView",
        PersonalRoleShowView_1.PersonalRoleShowView,
        "UiItem_SetShowRole",
      ],
      ["FrozenQteView", FrozenQteView_1.FrozenQteView, "UiView_FightQTE"],
      [
        "InteractQteView",
        InteractQteView_1.InteractQteView,
        "UiView_Fight_Critical",
      ],
      [
        "CommonActivityView",
        CommonActivityView_1.CommonActivityView,
        "UiView_CommonActivity",
      ],
      [
        "ActivityRewardPopUpView",
        ActivityRewardPopUpView_1.ActivityRewardPopUpView,
        "UiView_ActivityRewardPopUp",
      ],
      ["LongShanView", LongShanView_1.LongShanView, "UiView_LongshanInfo"],
      [
        "LongShanUnlockView",
        LongShanUnlockView_1.LongShanUnlockView,
        "UiItem_LongshanTip",
      ],
      ["ActivityRunView", ActivityRunView_1.ActivityRunView, "UiView_Paoku"],
      [
        "ActivityRunSuccessView",
        ActivityRunSuccessView_1.ActivityRunSuccessView,
        "UiView_Activity_Win",
      ],
      [
        "ActivityRunFailView",
        ActivityRunFailView_1.ActivityRunFailView,
        "UiView_Activity_End",
      ],
      [
        "BossRushMainView",
        BossRushMainView_1.BossRushMainView,
        "UiView_BossrushMain",
      ],
      [
        "ActivityTurntableRewardView",
        ActivityTurntableRewardView_1.ActivityTurntableRewardView,
        "UiItem_ActivityTurntableReward",
      ],
      [
        "ActivityUnlockTipView",
        ActivityUnlockTipView_1.ActivityUnlockTipView,
        "UiItem_ActivityUnlockTip",
      ],
      [
        "RoleIntroductionView",
        RoleIntroductionView_1.RoleIntroductionView,
        "UiView_RoleIntroduction",
      ],
      [
        "CommonRewardView",
        CommonRewardView_1.CommonRewardView,
        "UiView_RewardTip",
      ],
      [
        "QuestRewardView",
        QuestRewardView_1.QuestRewardView,
        "UiView_ReardSpecialTip",
      ],
      [
        "ExploreLevelRewardView",
        ExploreLevelRewardView_1.ExploreLevelRewardView,
        "UiView_ExploreLevelUp",
      ],
      [
        "CompositeRewardView",
        CompositeRewardView_1.CompositeRewardView,
        "UiView_CompositeTip",
      ],
      [
        "RoguePhantomSelectView",
        PhantomSelectView_1.PhantomSelectView,
        "UiView_PhantomSelect_Prefab",
      ],
      [
        "RoguePhantomReplaceView",
        PhantomReplaceView_1.PhantomReplaceView,
        "UiView_PhantomReplace_Prefab",
      ],
      [
        "RoguePhantomSelectResultView",
        PhantomSelectResultView_1.PhantomSelectResultView,
        "UiView_PhantomSelectResult_Prefab",
      ],
      [
        "RoleBuffSelectView",
        RoleBuffSelectView_1.RoleBuffSelectView,
        "UiView_RoleBuffSelect_Prefab",
      ],
      [
        "RoleReplaceView",
        RoleReplaceView_1.RoleReplaceView,
        "UiView_RoleReplace_Prefab",
      ],
      [
        "RogueRoleSelectResultView",
        RoleSelectResultView_1.RoleSelectResultView,
        "UiView_RoleSelectSesult_Prefab",
      ],
      [
        "RoguelikeSkillOverView",
        RoguelikeSkillOverView_1.RoguelikeSkillOverView,
        "UiView_RogueSkillOverView_Prefab",
      ],
      [
        "RoguelikeRandomEventView",
        RoguelikeRandomEventView_1.RoguelikeRandomEventView,
        "UiView_RogueEvent",
      ],
      [
        "CommonSelectView",
        CommonSelectView_1.CommonSelectView,
        "UiView_CommonSelect_Prefab",
      ],
      [
        "CommonSelectResultView",
        CommonSelectResultView_1.CommonSelectResultView,
        "UiView_RoleSelectSesult_Prefab",
      ],
      [
        "RogueEventResultView",
        EventResultView_1.EventResultView,
        "UiView_RoleSelectSesult_Prefab",
      ],
      [
        "RogueAttributeDetailView",
        RoleAttributeDetailView_1.RoleAttributeDetailView,
        "UiView_Attribute",
      ],
      [
        "RoguelikeUnlockTips",
        RougelikeUnlockTips_1.RoguelikeUnlockTips,
        "UiView_LordUnlockTip",
      ],
      [
        "ExploreRewardView",
        ExploreRewardView_1.ExploreRewardView,
        "UiView_ResultTip",
      ],
      [
        "CommunicateView",
        CommunicateView_1.CommunicateView,
        "UiView_PhoneCall",
      ],
      ["FilterView", FilterView_1.FilterView, "UiItem_FilterProp"],
      [
        "VisionFilterView",
        VisionFilterView_1.VisionFilterView,
        "UiItem_FilterPropVision",
      ],
      ["SortView", SortView_1.SortView, "UiItem_SortProp"],
      [
        "CommonItemSelectViewLeft",
        ItemSelectView_1.ItemSelectView,
        "UiView_LeftSidePad",
      ],
      [
        "CommonItemSelectViewRight",
        ItemSelectView_1.ItemSelectView,
        "UiView_RightSidePad",
      ],
      [
        "SignalDecodeView",
        SignalDecodeViewV2_1.SignalDecodeViewV2,
        "UiView_SignalDecode",
      ],
      [
        "SignalDeviceView",
        SignalDeviceView_1.SignalDeviceView,
        "UiView_SignalDevice",
      ],
      [
        "QuestFailRangeTipsView",
        QuestFailRangeTipsView_1.QuestFailRangeTipsView,
        "QuestFailRangeTipsView",
      ],
      [
        "CalabashRootView",
        CalabashRootView_1.CalabashRootView,
        "UiView_CalabashRootView",
      ],
      [
        "RoleLevelUpSuccessAttributeView",
        RoleLevelUpSuccessAttributeView_1.RoleLevelUpSuccessAttributeView,
        "RoleSuccessAttributeView",
      ],
      [
        "RoleLevelUpSuccessEffectView",
        RoleLevelUpSuccessEffectView_1.RoleLevelUpSuccessEffectView,
        "RoleSuccessEffectView",
      ],
      [
        "CommonSingleInputView",
        CommonSingleInputView_1.CommonSingleInputView,
        "UiItem_PopupInputA",
      ],
      [
        "CommonMultiInputView",
        CommonMultiInputView_1.CommonMultiInputView,
        "UiItem_PopupInputB",
      ],
      ["CdKeyInputView", CdKeyInputView_1.CdKeyInputView, "UiItem_PopupInputA"],
      ["PingView", PingView_1.PingView, "UiView_Ping"],
      ["RogueInfoView", RogueInfoView_1.RogueInfoView, "UiView_RogueInfo"],
      ["RogueShopView", RoguelikeShop_1.RoguelikeShop, "UiView_RogueStore"],
      [
        "RoguelikeSelectRoleView",
        RoguelikeSelectRoleView_1.RoguelikeSelectRoleView,
        "UiView_RoleSelect",
      ],
      [
        "RoguelikeSettleView",
        RoguelikeSettleView_1.RoguelikeSettleView,
        "UiView_RogueSettle",
      ],
      [
        "RoguelikeExitTips",
        RoguelikeExitTips_1.RoguelikeExitTips,
        "UiView_RogueExitTips",
      ],
      [
        "RoguelikeRoomFloatTips",
        RogulikeRoomFloatTips_1.RoguelikeRoomFloatTips,
        "UiView_RogueRoomTips",
      ],
      [
        "RoguelikeSkillView",
        RoguelikeSkillView_1.RoguelikeSkillView,
        "UiView_RogueSkillView",
      ],
      [
        "RoguelikeActivityView",
        RoguelikeActivityView_1.RoguelikeActivityView,
        "UiView_RogueActivity",
      ],
      [
        "RoguelikeMemoryPlaceView",
        RoguelikeMemoryPlaceView_1.RoguelikeMemoryPlaceView,
        "UiView_MemoryPalace",
      ],
      [
        "RoguelikeTokenOverView",
        RoguelikeTokenOverView_1.RoguelikeTokenOverView,
        "UiView_RogueTokenOverView",
      ],
      [
        "RoguelikeAchievementView",
        RoguelikeAchievementView_1.RoguelikeAchievementView,
        "UiView_RogueAchievement",
      ],
      [
        "RoguelikeInstanceEntrySelectView",
        RoguelikeInstanceEntrySelectView_1.RoguelikeInstanceEntrySelectView,
        "UiView_RogueInstanceEntrySelect",
      ],
      [
        "LoginDebugView",
        LoginDebugView_1.LoginDebugView,
        "UiView_LoginDebug_Prefab",
      ],
      [
        "BattleFloatTipsView",
        BattleFloatTipsView_1.BattleFloatTipsView,
        "UiView_ComTips",
      ],
      [
        "RoguelikeSpecialDetailView",
        RoguelikeSpecialDetailView_1.RoguelikeSpecialDetailView,
        "UiView_RougeSpecItemDetail",
      ],
      [
        "RoguelikeSelectSpecialView",
        RoguelikeSelectSpecialView_1.RoguelikeSelectSpecialView,
        "UiView_SpecialItemSelect",
      ],
      [
        "SoundAreaPlayTips",
        SoundAreaPlayTips_1.SoundAreaPlayTips,
        "UiItem_AcquireForB",
      ],
      [
        "MemoryFragmentMainView",
        MemoryFragmentMainView_1.MemoryFragmentMainView,
        "UiView_MemoryFragments",
      ],
      [
        "ObtainFragmentView",
        ObtainFragmentView_1.ObtainFragmentView,
        "UiItem_ObtainFragmentsPopup",
      ],
      [
        "MemoryDetailView",
        MemoryDetailView_1.MemoryDetailView,
        "UiView_MemoryCorridor",
      ],
      [
        "FragmentedCluesView",
        FragmentedCluesView_1.FragmentedCluesView,
        "UiItem_FragmentedCluesPopup",
      ],
      ["LoadingView", LoadingView_1.LoadingView, "UiView_Loading_Prefab", 1],
      [
        "FadeLoadingView",
        PlotTransitionView_1.PlotTransitionView,
        "UiView_PlotTransition_Prefab",
        1,
      ],
      [
        "ExploreDetailView",
        ExploreDetailView_1.ExploreDetailView,
        "UiView_ExploreDetail",
      ],
      [
        "ExploreLevelView",
        ExploreLevelView_1.ExploreLevelView,
        "UiView_Exploratory",
      ],
      [
        "ExploreLevelPreviewView",
        ExploreLevelPreviewView_1.ExploreLevelPreviewView,
        "UiItem_ExploreRewardPopup",
      ],
      [
        "LordGymUnlockTipView",
        LordGymUnlockTipView_1.LordGymUnlockTipView,
        "UiView_LordUnlockTip",
      ],
      [
        "DifficultUnlockTipView",
        DifficultUnlockTipView_1.DifficultUnlockTipView,
        "UiView_LordUnlockTip",
      ],
      [
        "LordChallengeResultView",
        LordChallengeResultView_1.LordChallengeResultView,
        "UiView_ResultTip",
      ],
      ["ItemDeliverView", ItemDeliverView_1.ItemDeliverView, "UiView_Deliver"],
      ["NewMissionTips", NewMissionTips_1.NewMissionTips, "UiView_MissionTips"],
      [
        "QuestLockPreview",
        QuestLockPreview_1.QuestLockPreview,
        "UiItem_QuestPreview",
      ],
      [
        "SilentAreaRewardPreviewPopView",
        SilentAreaRewardPreviewPopView_1.SilentAreaRewardPreviewPopView,
        "UiView_RewardPreview",
      ],
      [
        "RepeatKeyTipsView",
        RepeatKeyTipsView_1.RepeatKeyTipsView,
        "UiItem_HandleSetTip",
      ],
      [
        "ChangeActionTipsView",
        ChangeActionTipsView_1.ChangeActionTipsView,
        "UiItem_HandleSetTipConfirm",
      ],
      [
        "VisionRecoveryResultView",
        VisionRecoveryResultView_1.VisionRecoveryResultView,
        "UiView_VisionRecoveryResult",
      ],
      [
        "RoleTagDetailView",
        RoleTagDetailView_1.RoleTagDetailView,
        "UiView_TagDescript",
      ],
      ["CollectItemView", CollectItemView_1.CollectItemView, "UiView_Collect"],
      [
        "ExploreMissionView",
        ExploreMissionView_1.ExploreMissionView,
        "UiItem_ExploreMission",
      ],
      [
        "RoleBreakPreviewView",
        RoleBreakPreviewView_1.RoleBreakPreviewView,
        "UiView_BreakthroughPreView",
      ],
    ]);
  }
}
exports.UiViewManager = UiViewManager;
// # sourceMappingURL=UiViewManager.js.map
