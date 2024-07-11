"use strict";
var ELocalStorageGlobalKey, ELocalStoragePlayerKey;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ELocalStoragePlayerKey = exports.ELocalStorageGlobalKey = void 0),
  (function (e) {
    (e[(e.LoginFailCount = 0)] = "LoginFailCount"),
      (e[(e.NextLoginTime = 1)] = "NextLoginTime"),
      (e[(e.ResetLoginFailCountTime = 2)] = "ResetLoginFailCountTime"),
      (e[(e.SingleMapId = 3)] = "SingleMapId"),
      (e[(e.MultiMapId = 4)] = "MultiMapId"),
      (e[(e.LoginSex = 5)] = "LoginSex"),
      (e[(e.SelectBoxActive = 6)] = "SelectBoxActive"),
      (e[(e.SkipPlot = 7)] = "SkipPlot"),
      (e[(e.FirstOpenShop = 8)] = "FirstOpenShop"),
      (e[(e.LoginDebugServerIp = 9)] = "LoginDebugServerIp"),
      (e[(e.MenuData = 10)] = "MenuData"),
      (e[(e.Account = 11)] = "Account"),
      (e[(e.GmHistory = 12)] = "GmHistory"),
      (e[(e.LocalGameTimeData = 13)] = "LocalGameTimeData"),
      (e[(e.PackageAudio = 14)] = "PackageAudio"),
      (e[(e.RecentlyAccountList = 15)] = "RecentlyAccountList"),
      (e[(e.RecentlyLoginUID = 16)] = "RecentlyLoginUID"),
      (e[(e.LastTimeUploadStamp = 17)] = "LastTimeUploadStamp"),
      (e[(e.SdkLastTimeLoginData = 18)] = "SdkLastTimeLoginData"),
      (e[(e.SdkLevelData = 19)] = "SdkLevelData"),
      (e[(e.CacheP4Version = 20)] = "CacheP4Version"),
      (e[(e.PatchVersion = 21)] = "PatchVersion"),
      (e[(e.LauncherPatchVersion = 22)] = "LauncherPatchVersion"),
      (e[(e.RequestPhotoPermissionMinTime = 23)] =
        "RequestPhotoPermissionMinTime"),
      (e[(e.PhotoAndShareShowPlayerName = 24)] = "PhotoAndShareShowPlayerName"),
      (e[(e.CombineAction = 25)] = "CombineAction"),
      (e[(e.GameQualityLevel = 26)] = "GameQualityLevel"),
      (e[(e.CustomFrameRate = 27)] = "CustomFrameRate"),
      (e[(e.ShadowQuality = 28)] = "ShadowQuality"),
      (e[(e.NiagaraQuality = 29)] = "NiagaraQuality"),
      (e[(e.ImageDetail = 30)] = "ImageDetail"),
      (e[(e.Brightness = 31)] = "Brightness"),
      (e[(e.AntiAliasing = 32)] = "AntiAliasing"),
      (e[(e.SceneAo = 33)] = "SceneAo"),
      (e[(e.VolumeFog = 34)] = "VolumeFog"),
      (e[(e.VolumeLight = 35)] = "VolumeLight"),
      (e[(e.MotionBlur = 36)] = "MotionBlur"),
      (e[(e.StreamLevel = 37)] = "StreamLevel"),
      (e[(e.PcVsync = 38)] = "PcVsync"),
      (e[(e.MobileResolution = 39)] = "MobileResolution"),
      (e[(e.SuperResolution = 40)] = "SuperResolution"),
      (e[(e.PcResolutionWidth = 41)] = "PcResolutionWidth"),
      (e[(e.PcResolutionHeight = 42)] = "PcResolutionHeight"),
      (e[(e.PcWindowMode = 43)] = "PcWindowMode"),
      (e[(e.NvidiaSuperSamplingEnable = 44)] = "NvidiaSuperSamplingEnable"),
      (e[(e.NvidiaSuperSamplingFrameGenerate = 45)] =
        "NvidiaSuperSamplingFrameGenerate"),
      (e[(e.NvidiaSuperSamplingMode = 46)] = "NvidiaSuperSamplingMode"),
      (e[(e.NvidiaSuperSamplingSharpness = 47)] =
        "NvidiaSuperSamplingSharpness"),
      (e[(e.NvidiaReflex = 48)] = "NvidiaReflex"),
      (e[(e.FsrEnable = 49)] = "FsrEnable"),
      (e[(e.HorizontalViewSensitivity = 50)] = "HorizontalViewSensitivity"),
      (e[(e.VerticalViewSensitivity = 51)] = "VerticalViewSensitivity"),
      (e[(e.AimHorizontalViewSensitivity = 52)] =
        "AimHorizontalViewSensitivity"),
      (e[(e.AimVerticalViewSensitivity = 53)] = "AimVerticalViewSensitivity"),
      (e[(e.CameraShakeStrength = 54)] = "CameraShakeStrength"),
      (e[(e.MobileHorizontalViewSensitivity = 55)] =
        "MobileHorizontalViewSensitivity"),
      (e[(e.MobileVerticalViewSensitivity = 56)] =
        "MobileVerticalViewSensitivity"),
      (e[(e.MobileAimHorizontalViewSensitivity = 57)] =
        "MobileAimHorizontalViewSensitivity"),
      (e[(e.MobileAimVerticalViewSensitivity = 58)] =
        "MobileAimVerticalViewSensitivity"),
      (e[(e.MobileCameraShakeStrength = 59)] = "MobileCameraShakeStrength"),
      (e[(e.CommonSpringArmLength = 60)] = "CommonSpringArmLength"),
      (e[(e.FightSpringArmLength = 61)] = "FightSpringArmLength"),
      (e[(e.IsResetFocusEnable = 62)] = "IsResetFocusEnable"),
      (e[(e.IsSidestepCameraEnable = 63)] = "IsSidestepCameraEnable"),
      (e[(e.IsSoftLockCameraEnable = 64)] = "IsSoftLockCameraEnable"),
      (e[(e.JoystickShakeStrength = 65)] = "JoystickShakeStrength"),
      (e[(e.JoystickShakeType = 66)] = "JoystickShakeType"),
      (e[(e.WalkOrRunRate = 67)] = "WalkOrRunRate"),
      (e[(e.JoystickMode = 68)] = "JoystickMode"),
      (e[(e.IsAutoSwitchSkillButtonMode = 69)] = "IsAutoSwitchSkillButtonMode"),
      (e[(e.AimAssistEnable = 70)] = "AimAssistEnable"),
      (e[(e.XessEnable = 71)] = "XessEnable"),
      (e[(e.XessQuality = 72)] = "XessQuality"),
      (e[(e.MetalFxEnable = 73)] = "MetalFxEnable"),
      (e[(e.IrxEnable = 74)] = "IrxEnable"),
      (e[(e.BloomEnable = 75)] = "BloomEnable"),
      (e[(e.NpcDensity = 76)] = "NpcDensity"),
      (e[(e.KeyboardLockEnemyMode = 77)] = "KeyboardLockEnemyMode"),
      (e[(e.HorizontalViewRevert = 78)] = "HorizontalViewRevert"),
      (e[(e.VerticalViewRevert = 79)] = "VerticalViewRevert"),
      (e[(e.SkillLockEnemyMode = 80)] = "SkillLockEnemyMode"),
      (e[(e.GamepadLockEnemyMode = 81)] = "GamepadLockEnemyMode"),
      (e[(e.EnemyHitDisplayMode = 82)] = "EnemyHitDisplayMode"),
      (e[(e.GamepadRouletteSelectConfig = 83)] = "GamepadRouletteSelectConfig"),
      (e[(e.PlayStationOnly = 84)] = "PlayStationOnly"),
      (e[(e.IsConvertViewSensitivity = 85)] = "IsConvertViewSensitivity"),
      (e[(e.IsConvertAllViewSensitivity = 86)] = "IsConvertAllViewSensitivity");
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
      (e[(e.MoonChasingShopItemUnlock = 37)] = "MoonChasingShopItemUnlock"),
      (e[(e.MoonChasingShopItemChecked = 38)] = "MoonChasingShopItemChecked"),
      (e[(e.MoonChasingRoleUnlock = 39)] = "MoonChasingRoleUnlock"),
      (e[(e.MoonChasingQuestUnlock = 40)] = "MoonChasingQuestUnlock"),
      (e[(e.MoonChasingMemoryChecked = 41)] = "MoonChasingMemoryChecked"),
      (e[(e.LoopTowerIsClickSeason = 42)] = "LoopTowerIsClickSeason"),
      (e[(e.LoopTowerIsClickShop = 43)] = "LoopTowerIsClickShop"),
      (e[(e.ActivityRecallWatchFirstShow = 44)] =
        "ActivityRecallWatchFirstShow"),
      (e[(e.MoonChasingDelegation = 45)] = "MoonChasingDelegation"),
      (e[(e.ShowPersonalTip = 46)] = "ShowPersonalTip");
  })(
    (ELocalStoragePlayerKey =
      exports.ELocalStoragePlayerKey || (exports.ELocalStoragePlayerKey = {})),
  );
//# sourceMappingURL=LocalStorageDefine.js.map
