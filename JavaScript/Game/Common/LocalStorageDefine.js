"use strict";
var ELocalStorageGlobalKey, ELocalStoragePlayerKey;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ELocalStoragePlayerKey = exports.ELocalStorageGlobalKey = void 0),
  (function (e) {
    (e[(e.GameQualitySetting = 0)] = "GameQualitySetting"),
      (e[(e.LoginFailCount = 1)] = "LoginFailCount"),
      (e[(e.NextLoginTime = 2)] = "NextLoginTime"),
      (e[(e.ResetLoginFailCountTime = 3)] = "ResetLoginFailCountTime"),
      (e[(e.SingleMapId = 4)] = "SingleMapId"),
      (e[(e.MultiMapId = 5)] = "MultiMapId"),
      (e[(e.LoginSex = 6)] = "LoginSex"),
      (e[(e.SelectBoxActive = 7)] = "SelectBoxActive"),
      (e[(e.SkipPlot = 8)] = "SkipPlot"),
      (e[(e.FirstOpenShop = 9)] = "FirstOpenShop"),
      (e[(e.LoginDebugServerIp = 10)] = "LoginDebugServerIp"),
      (e[(e.PlayMenuInfo = 11)] = "PlayMenuInfo"),
      (e[(e.MenuData = 12)] = "MenuData"),
      (e[(e.Account = 13)] = "Account"),
      (e[(e.GmHistory = 14)] = "GmHistory"),
      (e[(e.LocalGameTimeData = 15)] = "LocalGameTimeData"),
      (e[(e.PackageAudio = 16)] = "PackageAudio"),
      (e[(e.RecentlyAccountList = 17)] = "RecentlyAccountList"),
      (e[(e.RecentlyLoginUID = 18)] = "RecentlyLoginUID"),
      (e[(e.LastTimeUploadStamp = 19)] = "LastTimeUploadStamp"),
      (e[(e.SdkLastTimeLoginData = 20)] = "SdkLastTimeLoginData"),
      (e[(e.SdkLevelData = 21)] = "SdkLevelData"),
      (e[(e.CacheP4Version = 22)] = "CacheP4Version"),
      (e[(e.PatchVersion = 23)] = "PatchVersion"),
      (e[(e.LauncherPatchVersion = 24)] = "LauncherPatchVersion"),
      (e[(e.RequestPhotoPermissionMinTime = 25)] =
        "RequestPhotoPermissionMinTime"),
      (e[(e.PhotoAndShareShowPlayerName = 26)] = "PhotoAndShareShowPlayerName"),
      (e[(e.CombineAction = 27)] = "CombineAction"),
      (e[(e.GameQualityLevel = 28)] = "GameQualityLevel"),
      (e[(e.CustomFrameRate = 29)] = "CustomFrameRate"),
      (e[(e.ShadowQuality = 30)] = "ShadowQuality"),
      (e[(e.NiagaraQuality = 31)] = "NiagaraQuality"),
      (e[(e.ImageDetail = 32)] = "ImageDetail"),
      (e[(e.Brightness = 33)] = "Brightness"),
      (e[(e.AntiAliasing = 34)] = "AntiAliasing"),
      (e[(e.SceneAo = 35)] = "SceneAo"),
      (e[(e.VolumeFog = 36)] = "VolumeFog"),
      (e[(e.VolumeLight = 37)] = "VolumeLight"),
      (e[(e.MotionBlur = 38)] = "MotionBlur"),
      (e[(e.StreamLevel = 39)] = "StreamLevel"),
      (e[(e.PcVsync = 40)] = "PcVsync"),
      (e[(e.MobileResolution = 41)] = "MobileResolution"),
      (e[(e.SuperResolution = 42)] = "SuperResolution"),
      (e[(e.PcResolutionWidth = 43)] = "PcResolutionWidth"),
      (e[(e.PcResolutionHeight = 44)] = "PcResolutionHeight"),
      (e[(e.PcWindowMode = 45)] = "PcWindowMode"),
      (e[(e.NvidiaSuperSamplingEnable = 46)] = "NvidiaSuperSamplingEnable"),
      (e[(e.NvidiaSuperSamplingFrameGenerate = 47)] =
        "NvidiaSuperSamplingFrameGenerate"),
      (e[(e.NvidiaSuperSamplingMode = 48)] = "NvidiaSuperSamplingMode"),
      (e[(e.NvidiaSuperSamplingSharpness = 49)] =
        "NvidiaSuperSamplingSharpness"),
      (e[(e.NvidiaReflex = 50)] = "NvidiaReflex"),
      (e[(e.FsrEnable = 51)] = "FsrEnable"),
      (e[(e.HorizontalViewSensitivity = 52)] = "HorizontalViewSensitivity"),
      (e[(e.VerticalViewSensitivity = 53)] = "VerticalViewSensitivity"),
      (e[(e.AimHorizontalViewSensitivity = 54)] =
        "AimHorizontalViewSensitivity"),
      (e[(e.AimVerticalViewSensitivity = 55)] = "AimVerticalViewSensitivity"),
      (e[(e.CameraShakeStrength = 56)] = "CameraShakeStrength"),
      (e[(e.MobileHorizontalViewSensitivity = 57)] =
        "MobileHorizontalViewSensitivity"),
      (e[(e.MobileVerticalViewSensitivity = 58)] =
        "MobileVerticalViewSensitivity"),
      (e[(e.MobileAimHorizontalViewSensitivity = 59)] =
        "MobileAimHorizontalViewSensitivity"),
      (e[(e.MobileAimVerticalViewSensitivity = 60)] =
        "MobileAimVerticalViewSensitivity"),
      (e[(e.MobileCameraShakeStrength = 61)] = "MobileCameraShakeStrength"),
      (e[(e.CommonSpringArmLength = 62)] = "CommonSpringArmLength"),
      (e[(e.FightSpringArmLength = 63)] = "FightSpringArmLength"),
      (e[(e.IsResetFocusEnable = 64)] = "IsResetFocusEnable"),
      (e[(e.IsSidestepCameraEnable = 65)] = "IsSidestepCameraEnable"),
      (e[(e.IsSoftLockCameraEnable = 66)] = "IsSoftLockCameraEnable"),
      (e[(e.JoystickShakeStrength = 67)] = "JoystickShakeStrength"),
      (e[(e.JoystickShakeType = 68)] = "JoystickShakeType"),
      (e[(e.WalkOrRunRate = 69)] = "WalkOrRunRate"),
      (e[(e.JoystickMode = 70)] = "JoystickMode"),
      (e[(e.IsAutoSwitchSkillButtonMode = 71)] = "IsAutoSwitchSkillButtonMode"),
      (e[(e.AimAssistEnable = 72)] = "AimAssistEnable"),
      (e[(e.XessEnable = 73)] = "XessEnable"),
      (e[(e.XessQuality = 74)] = "XessQuality"),
      (e[(e.MetalFxEnable = 75)] = "MetalFxEnable"),
      (e[(e.IrxEnable = 76)] = "IrxEnable"),
      (e[(e.BloomEnable = 77)] = "BloomEnable"),
      (e[(e.NpcDensity = 78)] = "NpcDensity"),
      (e[(e.KeyboardLockEnemyMode = 79)] = "KeyboardLockEnemyMode"),
      (e[(e.HorizontalViewRevert = 80)] = "HorizontalViewRevert"),
      (e[(e.VerticalViewRevert = 81)] = "VerticalViewRevert"),
      (e[(e.SkillLockEnemyMode = 82)] = "SkillLockEnemyMode"),
      (e[(e.GamepadLockEnemyMode = 83)] = "GamepadLockEnemyMode"),
      (e[(e.EnemyHitDisplayMode = 84)] = "EnemyHitDisplayMode"),
      (e[(e.RepairEnemyHitDisplayMode = 85)] = "RepairEnemyHitDisplayMode"),
      (e[(e.GamepadRouletteSelectConfig = 86)] = "GamepadRouletteSelectConfig"),
      (e[(e.IsConvertViewSensitivity = 87)] = "IsConvertViewSensitivity"),
      (e[(e.IsConvertAllViewSensitivity = 88)] = "IsConvertAllViewSensitivity"),
      (e[(e.MasterVolume = 89)] = "MasterVolume"),
      (e[(e.VoiceVolume = 90)] = "VoiceVolume"),
      (e[(e.MusicVolume = 91)] = "MusicVolume"),
      (e[(e.SFXVolume = 92)] = "SFXVolume"),
      (e[(e.AMBVolume = 93)] = "AMBVolume"),
      (e[(e.UIVolume = 94)] = "UIVolume"),
      (e[(e.PcResolutionIndex = 95)] = "PcResolutionIndex"),
      (e[(e.TextLanguage = 96)] = "TextLanguage"),
      (e[(e.VoiceLanguage = 97)] = "VoiceLanguage"),
      (e[(e.AdviceSetting = 98)] = "AdviceSetting"),
      (e[(e.GenderSetting = 99)] = "GenderSetting"),
      (e[(e.ImageQuality = 100)] = "ImageQuality"),
      (e[(e.HasLocalGameSettings = 101)] = "HasLocalGameSettings"),
      (e[(e.IsConvertOldMenuData = 102)] = "IsConvertOldMenuData"),
      (e[(e.LastReviewTime = 103)] = "LastReviewTime"),
      (e[(e.IsConvertInputActionSort = 104)] = "IsConvertInputActionSort"),
      (e[(e.OpenReviewTimeList = 105)] = "OpenReviewTimeList"),
      (e[(e.AutoAdjustImageQuality = 106)] = "AutoAdjustImageQuality"),
      (e[(e.IsConvertInput = 107)] = "IsConvertInput"),
      (e[(e.IsSavedKeyMappings = 108)] = "IsSavedKeyMappings");
  })(
    (ELocalStorageGlobalKey =
      exports.ELocalStorageGlobalKey || (exports.ELocalStorageGlobalKey = {})),
  ),
  (function (e) {
    (e[(e.FirstOpenShop = 0)] = "FirstOpenShop"),
      (e[(e.CookerLevelKey = 1)] = "CookerLevelKey"),
      (e[(e.EditBattleTeam = 2)] = "EditBattleTeam"),
      (e[(e.GachaPoolOpenRecord = 3)] = "GachaPoolOpenRecord"),
      (e[(e.InventoryCommonItem = 4)] = "InventoryCommonItem"),
      (e[(e.InventoryAttributeItem = 5)] = "InventoryAttributeItem"),
      (e[(e.InventoryCommonItemRedDot = 6)] = "InventoryCommonItemRedDot"),
      (e[(e.InventoryAttributeItemRedDot = 7)] =
        "InventoryAttributeItemRedDot"),
      (e[(e.RouletteAssemblyItemRedDot = 8)] = "RouletteAssemblyItemRedDot"),
      (e[(e.GetItemConfigListSaveKey = 9)] = "GetItemConfigListSaveKey"),
      (e[(e.ComposeLevelKey = 10)] = "ComposeLevelKey"),
      (e[(e.ForgingLevelKey = 11)] = "ForgingLevelKey"),
      (e[(e.Chat = 12)] = "Chat"),
      (e[(e.BattlePassPayButton = 13)] = "BattlePassPayButton"),
      (e[(e.MonthCardNextShowRedDotTime = 14)] = "MonthCardNextShowRedDotTime"),
      (e[(e.IsErrorChatReplace = 15)] = "IsErrorChatReplace"),
      (e[(e.LocalFriendApplication = 16)] = "LocalFriendApplication"),
      (e[(e.MarqueeScrollingMap = 17)] = "MarqueeScrollingMap"),
      (e[(e.LoginTime = 18)] = "LoginTime"),
      (e[(e.Activity = 19)] = "Activity"),
      (e[(e.IsTriggerMobileGuide = 20)] = "IsTriggerMobileGuide"),
      (e[(e.IsTriggerDesktopGuide = 21)] = "IsTriggerDesktopGuide"),
      (e[(e.AutoInteractionGuideAppearCount = 22)] =
        "AutoInteractionGuideAppearCount"),
      (e[(e.IsSimpleDetail = 23)] = "IsSimpleDetail"),
      (e[(e.VisionSpecialSkillShowMap = 24)] = "VisionSpecialSkillShowMap"),
      (e[(e.ItemGridDropDown = 25)] = "ItemGridDropDown"),
      (e[(e.HasShowNewMailTipsMap = 26)] = "HasShowNewMailTipsMap"),
      (e[(e.RoguelikeDescModel = 27)] = "RoguelikeDescModel"),
      (e[(e.RoleDataItem = 28)] = "RoleDataItem"),
      (e[(e.CalabashCollect = 29)] = "CalabashCollect"),
      (e[(e.CalabashCollectIsSimpleDetail = 30)] =
        "CalabashCollectIsSimpleDetail"),
      (e[(e.RoguelikeShopRecord = 31)] = "RoguelikeShopRecord"),
      (e[(e.RoguelikeShopNextTimeStamp = 32)] = "RoguelikeShopNextTimeStamp"),
      (e[(e.VisionSkin = 33)] = "VisionSkin"),
      (e[(e.SilentTips = 34)] = "SilentTips"),
      (e[(e.GachaRoleRecord = 35)] = "GachaRoleRecord"),
      (e[(e.GachaWeaponRecord = 36)] = "GachaWeaponRecord"),
      (e[(e.RouletteAction01OpenConfig = 37)] = "RouletteAction01OpenConfig"),
      (e[(e.RouletteAction02OpenConfig = 38)] = "RouletteAction02OpenConfig"),
      (e[(e.MoonChasingShopItemUnlock = 39)] = "MoonChasingShopItemUnlock"),
      (e[(e.MoonChasingShopItemChecked = 40)] = "MoonChasingShopItemChecked"),
      (e[(e.MoonChasingRoleUnlock = 41)] = "MoonChasingRoleUnlock"),
      (e[(e.MoonChasingQuestUnlock = 42)] = "MoonChasingQuestUnlock"),
      (e[(e.MoonChasingMemoryChecked = 43)] = "MoonChasingMemoryChecked"),
      (e[(e.LoopTowerIsClickSeason = 44)] = "LoopTowerIsClickSeason"),
      (e[(e.LoopTowerIsClickShop = 45)] = "LoopTowerIsClickShop"),
      (e[(e.ActivityRecallWatchFirstShow = 46)] =
        "ActivityRecallWatchFirstShow"),
      (e[(e.ActivityRecallWatchFirstShowTime = 47)] =
        "ActivityRecallWatchFirstShowTime"),
      (e[(e.TowerDefenseEntered = 48)] = "TowerDefenseEntered"),
      (e[(e.MoonChasingDelegation = 49)] = "MoonChasingDelegation"),
      (e[(e.ShowPersonalTip = 50)] = "ShowPersonalTip"),
      (e[(e.HasCleanInvalidCustomMark = 51)] = "HasCleanInvalidCustomMark"),
      (e[(e.SortConfig = 52)] = "SortConfig"),
      (e[(e.FragmentMemoryOpened = 53)] = "FragmentMemoryOpened"),
      (e[(e.VisionRecoveryBatchTip = 54)] = "VisionRecoveryBatchTip"),
      (e[(e.AuToTrackQuestTime = 55)] = "AuToTrackQuestTime"),
      (e[(e.GoodsRemindMap = 56)] = "GoodsRemindMap"),
      (e[(e.IsInputSettingsSent = 57)] = "IsInputSettingsSent");
  })(
    (ELocalStoragePlayerKey =
      exports.ELocalStoragePlayerKey || (exports.ELocalStoragePlayerKey = {})),
  );
//# sourceMappingURL=LocalStorageDefine.js.map
