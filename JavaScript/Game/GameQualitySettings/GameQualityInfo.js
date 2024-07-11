"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameQualityInfo = void 0);
const UE = require("ue"),
  Log_1 = require("../../Core/Common/Log"),
  MathUtils_1 = require("../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../Common/Event/EventDefine"),
  EventSystem_1 = require("../Common/Event/EventSystem"),
  LocalStorage_1 = require("../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../Common/LocalStorageDefine"),
  GlobalData_1 = require("../GlobalData"),
  InputSettingsManager_1 = require("../InputSettings/InputSettingsManager"),
  ConfigManager_1 = require("../Manager/ConfigManager"),
  ControllerHolder_1 = require("../Manager/ControllerHolder"),
  ModelManager_1 = require("../Manager/ModelManager"),
  FormationDataController_1 = require("../Module/Abilities/FormationDataController"),
  MenuDefine_1 = require("../Module/Menu/MenuDefine"),
  RoleGaitStatic_1 = require("../NewWorld/Character/Role/Component/Define/RoleGaitStatic"),
  PerfSightController_1 = require("../PerfSight/PerfSightController"),
  RenderConfig_1 = require("../Render/Config/RenderConfig"),
  RenderDataManager_1 = require("../Render/Data/RenderDataManager"),
  GameQualitySettingsManager_1 = require("./GameQualitySettingsManager"),
  PERFORMENCELIMIT_SEQ_TAIL = "_Seq",
  performanceLimitConfigs = new Map([
    ["RoleRootView", { FrameLimit: !0, CacheWorldFrame: !1 }],
    ["RoleLevelUpView", { FrameLimit: !0, CacheWorldFrame: !1 }],
    ["HandBookEntranceView", { FrameLimit: !0, CacheWorldFrame: !1 }],
    ["AchievementMainView", { FrameLimit: !0, CacheWorldFrame: !1 }],
    ["CommonActivityView", { FrameLimit: !0, CacheWorldFrame: !1 }],
    ["VideoView", { FrameLimit: !0, CacheWorldFrame: !0 }],
    [
      "GachaScanView" + PERFORMENCELIMIT_SEQ_TAIL,
      { FrameLimit: !0, CacheWorldFrame: !1 },
    ],
    [
      "DrawMainView" + PERFORMENCELIMIT_SEQ_TAIL,
      { FrameLimit: !0, CacheWorldFrame: !1 },
    ],
    [
      "GachaResultView" + PERFORMENCELIMIT_SEQ_TAIL,
      { FrameLimit: !0, CacheWorldFrame: !1 },
    ],
    [
      "WorldMapView" + PERFORMENCELIMIT_SEQ_TAIL,
      { FrameLimit: !0, CacheWorldFrame: !0 },
    ],
    [
      "CalabashRootView" + PERFORMENCELIMIT_SEQ_TAIL,
      { FrameLimit: !0, CacheWorldFrame: !1 },
    ],
    [
      "BattlePassMainView" + PERFORMENCELIMIT_SEQ_TAIL,
      { FrameLimit: !0, CacheWorldFrame: !1 },
    ],
    [
      "GachaMainView" + PERFORMENCELIMIT_SEQ_TAIL,
      { FrameLimit: !0, CacheWorldFrame: !0 },
    ],
    [
      "PayShopRootView" + PERFORMENCELIMIT_SEQ_TAIL,
      { FrameLimit: !0, CacheWorldFrame: !0 },
    ],
    [
      "AdventureGuideView" + PERFORMENCELIMIT_SEQ_TAIL,
      { FrameLimit: !0, CacheWorldFrame: !0 },
    ],
    [
      "TutorialView" + PERFORMENCELIMIT_SEQ_TAIL,
      { FrameLimit: !0, CacheWorldFrame: !0 },
    ],
    [
      "QuestView" + PERFORMENCELIMIT_SEQ_TAIL,
      { FrameLimit: !0, CacheWorldFrame: !0 },
    ],
    [
      "FriendView" + PERFORMENCELIMIT_SEQ_TAIL,
      { FrameLimit: !0, CacheWorldFrame: !0 },
    ],
    [
      "TimeOfDaySecondView" + PERFORMENCELIMIT_SEQ_TAIL,
      { FrameLimit: !0, CacheWorldFrame: !0 },
    ],
    [
      "EditFormationView" + PERFORMENCELIMIT_SEQ_TAIL,
      { FrameLimit: !0, CacheWorldFrame: !0 },
    ],
    [
      "InventoryView" + PERFORMENCELIMIT_SEQ_TAIL,
      { FrameLimit: !0, CacheWorldFrame: !0 },
    ],
    [
      "MailBoxView" + PERFORMENCELIMIT_SEQ_TAIL,
      { FrameLimit: !0, CacheWorldFrame: !0 },
    ],
    [
      "MenuView" + PERFORMENCELIMIT_SEQ_TAIL,
      { FrameLimit: !0, CacheWorldFrame: !0 },
    ],
    [
      "FunctionView" + PERFORMENCELIMIT_SEQ_TAIL,
      { FrameLimit: !0, CacheWorldFrame: !0 },
    ],
  ]);
class GameQualityInfo {
  constructor() {
    (this.Gkn = new Map()),
      (this.Uga = new Map()),
      (this.PerformanceLimitRunning = new Map()),
      (this.yve = 0),
      (this.Ive = -0),
      (this.Tve = new Set());
  }
  get PcScreenResolution() {
    var e = this.Gkn.get(
        LocalStorageDefine_1.ELocalStorageGlobalKey.PcResolutionWidth,
      ),
      t = this.Gkn.get(
        LocalStorageDefine_1.ELocalStorageGlobalKey.PcResolutionHeight,
      );
    return new UE.IntPoint(e, t);
  }
  set PcScreenResolution(e) {
    this.Gkn.set(
      LocalStorageDefine_1.ELocalStorageGlobalKey.PcResolutionWidth,
      e.X,
    ),
      this.Gkn.set(
        LocalStorageDefine_1.ELocalStorageGlobalKey.PcResolutionHeight,
        e.Y,
      );
  }
  get PcFullScreenMode() {
    return (
      this.Gkn.get(LocalStorageDefine_1.ELocalStorageGlobalKey.PcWindowMode) ??
      1
    );
  }
  set PcFullScreenMode(e) {
    this.Gkn.set(LocalStorageDefine_1.ELocalStorageGlobalKey.PcWindowMode, e);
  }
  get Brightness() {
    return (
      this.Gkn.get(LocalStorageDefine_1.ELocalStorageGlobalKey.Brightness) ?? 0
    );
  }
  set Brightness(e) {
    this.Gkn.set(LocalStorageDefine_1.ELocalStorageGlobalKey.Brightness, e);
  }
  get ShadowQuality() {
    return (
      this.Gkn.get(LocalStorageDefine_1.ELocalStorageGlobalKey.ShadowQuality) ??
      0
    );
  }
  set ShadowQuality(e) {
    this.Gkn.set(LocalStorageDefine_1.ELocalStorageGlobalKey.ShadowQuality, e);
  }
  get NiagaraQuality() {
    return (
      this.Gkn.get(
        LocalStorageDefine_1.ELocalStorageGlobalKey.NiagaraQuality,
      ) ?? 0
    );
  }
  set NiagaraQuality(e) {
    this.Gkn.set(LocalStorageDefine_1.ELocalStorageGlobalKey.NiagaraQuality, e);
  }
  get ImageDetail() {
    return (
      this.Gkn.get(LocalStorageDefine_1.ELocalStorageGlobalKey.ImageDetail) ?? 0
    );
  }
  set ImageDetail(e) {
    this.Gkn.set(LocalStorageDefine_1.ELocalStorageGlobalKey.ImageDetail, e);
  }
  get AntiAliasing() {
    return (
      this.Gkn.get(LocalStorageDefine_1.ELocalStorageGlobalKey.AntiAliasing) ??
      0
    );
  }
  set AntiAliasing(e) {
    this.Gkn.set(LocalStorageDefine_1.ELocalStorageGlobalKey.AntiAliasing, e);
  }
  get SceneAo() {
    return (
      this.Gkn.get(LocalStorageDefine_1.ELocalStorageGlobalKey.SceneAo) ?? 0
    );
  }
  set SceneAo(e) {
    this.Gkn.set(LocalStorageDefine_1.ELocalStorageGlobalKey.SceneAo, e);
  }
  get VolumeFog() {
    return (
      this.Gkn.get(LocalStorageDefine_1.ELocalStorageGlobalKey.VolumeFog) ?? 0
    );
  }
  set VolumeFog(e) {
    this.Gkn.set(LocalStorageDefine_1.ELocalStorageGlobalKey.VolumeFog, e);
  }
  get VolumeLight() {
    return (
      this.Gkn.get(LocalStorageDefine_1.ELocalStorageGlobalKey.VolumeLight) ?? 0
    );
  }
  set VolumeLight(e) {
    this.Gkn.set(LocalStorageDefine_1.ELocalStorageGlobalKey.VolumeLight, e);
  }
  get MotionBlur() {
    return (
      this.Gkn.get(LocalStorageDefine_1.ELocalStorageGlobalKey.MotionBlur) ?? 0
    );
  }
  set MotionBlur(e) {
    this.Gkn.set(LocalStorageDefine_1.ELocalStorageGlobalKey.MotionBlur, e);
  }
  get StreamLevel() {
    return (
      this.Gkn.get(LocalStorageDefine_1.ELocalStorageGlobalKey.StreamLevel) ?? 1
    );
  }
  set StreamLevel(e) {
    this.Gkn.set(LocalStorageDefine_1.ELocalStorageGlobalKey.StreamLevel, e);
  }
  get PcVsync() {
    return (
      this.Gkn.get(LocalStorageDefine_1.ELocalStorageGlobalKey.PcVsync) ?? 0
    );
  }
  set PcVsync(e) {
    this.Gkn.set(LocalStorageDefine_1.ELocalStorageGlobalKey.PcVsync, e);
  }
  get MobileResolution() {
    return (
      this.Gkn.get(
        LocalStorageDefine_1.ELocalStorageGlobalKey.MobileResolution,
      ) ?? 0
    );
  }
  set MobileResolution(e) {
    this.Gkn.set(
      LocalStorageDefine_1.ELocalStorageGlobalKey.MobileResolution,
      e,
    );
  }
  get SuperResolution() {
    return (
      this.Gkn.get(
        LocalStorageDefine_1.ELocalStorageGlobalKey.SuperResolution,
      ) ?? 0
    );
  }
  set SuperResolution(e) {
    this.Gkn.set(
      LocalStorageDefine_1.ELocalStorageGlobalKey.SuperResolution,
      e,
    );
  }
  get NvidiaSuperSamplingEnable() {
    return (
      this.Gkn.get(
        LocalStorageDefine_1.ELocalStorageGlobalKey.NvidiaSuperSamplingEnable,
      ) ?? 0
    );
  }
  set NvidiaSuperSamplingEnable(e) {
    this.Gkn.set(
      LocalStorageDefine_1.ELocalStorageGlobalKey.NvidiaSuperSamplingEnable,
      e,
    );
  }
  get NvidiaSuperSamplingFrameGenerate() {
    return (
      this.Gkn.get(
        LocalStorageDefine_1.ELocalStorageGlobalKey
          .NvidiaSuperSamplingFrameGenerate,
      ) ?? 0
    );
  }
  set NvidiaSuperSamplingFrameGenerate(e) {
    this.Gkn.set(
      LocalStorageDefine_1.ELocalStorageGlobalKey
        .NvidiaSuperSamplingFrameGenerate,
      e,
    );
  }
  get NvidiaSuperSamplingMode() {
    return (
      this.Gkn.get(
        LocalStorageDefine_1.ELocalStorageGlobalKey.NvidiaSuperSamplingMode,
      ) ?? 0
    );
  }
  set NvidiaSuperSamplingMode(e) {
    this.Gkn.set(
      LocalStorageDefine_1.ELocalStorageGlobalKey.NvidiaSuperSamplingMode,
      e,
    );
  }
  get NvidiaSuperSamplingSharpness() {
    return (
      this.Gkn.get(
        LocalStorageDefine_1.ELocalStorageGlobalKey
          .NvidiaSuperSamplingSharpness,
      ) ?? 0
    );
  }
  set NvidiaSuperSamplingSharpness(e) {
    this.Gkn.set(
      LocalStorageDefine_1.ELocalStorageGlobalKey.NvidiaSuperSamplingSharpness,
      e,
    );
  }
  get NvidiaReflex() {
    return (
      this.Gkn.get(LocalStorageDefine_1.ELocalStorageGlobalKey.NvidiaReflex) ??
      0
    );
  }
  set NvidiaReflex(e) {
    this.Gkn.set(LocalStorageDefine_1.ELocalStorageGlobalKey.NvidiaReflex, e);
  }
  get FsrEnable() {
    return (
      this.Gkn.get(LocalStorageDefine_1.ELocalStorageGlobalKey.FsrEnable) ?? 0
    );
  }
  set FsrEnable(e) {
    this.Gkn.set(LocalStorageDefine_1.ELocalStorageGlobalKey.FsrEnable, e);
  }
  get HorizontalViewSensitivity() {
    return (
      this.Gkn.get(
        LocalStorageDefine_1.ELocalStorageGlobalKey.HorizontalViewSensitivity,
      ) ?? 0
    );
  }
  set HorizontalViewSensitivity(e) {
    this.Gkn.set(
      LocalStorageDefine_1.ELocalStorageGlobalKey.HorizontalViewSensitivity,
      e,
    );
  }
  get VerticalViewSensitivity() {
    return (
      this.Gkn.get(
        LocalStorageDefine_1.ELocalStorageGlobalKey.VerticalViewSensitivity,
      ) ?? 0
    );
  }
  set VerticalViewSensitivity(e) {
    this.Gkn.set(
      LocalStorageDefine_1.ELocalStorageGlobalKey.VerticalViewSensitivity,
      e,
    );
  }
  get AimHorizontalViewSensitivity() {
    return (
      this.Gkn.get(
        LocalStorageDefine_1.ELocalStorageGlobalKey
          .AimHorizontalViewSensitivity,
      ) ?? 0
    );
  }
  set AimHorizontalViewSensitivity(e) {
    this.Gkn.set(
      LocalStorageDefine_1.ELocalStorageGlobalKey.AimHorizontalViewSensitivity,
      e,
    );
  }
  get AimVerticalViewSensitivity() {
    return (
      this.Gkn.get(
        LocalStorageDefine_1.ELocalStorageGlobalKey.AimVerticalViewSensitivity,
      ) ?? 0
    );
  }
  set AimVerticalViewSensitivity(e) {
    this.Gkn.set(
      LocalStorageDefine_1.ELocalStorageGlobalKey.AimVerticalViewSensitivity,
      e,
    );
  }
  get CameraShakeStrength() {
    return (
      this.Gkn.get(
        LocalStorageDefine_1.ELocalStorageGlobalKey.CameraShakeStrength,
      ) ?? 0
    );
  }
  set CameraShakeStrength(e) {
    this.Gkn.set(
      LocalStorageDefine_1.ELocalStorageGlobalKey.CameraShakeStrength,
      e,
    );
  }
  get MobileHorizontalViewSensitivity() {
    return (
      this.Gkn.get(
        LocalStorageDefine_1.ELocalStorageGlobalKey
          .MobileHorizontalViewSensitivity,
      ) ?? 0
    );
  }
  set MobileHorizontalViewSensitivity(e) {
    this.Gkn.set(
      LocalStorageDefine_1.ELocalStorageGlobalKey
        .MobileHorizontalViewSensitivity,
      e,
    );
  }
  get MobileVerticalViewSensitivity() {
    return (
      this.Gkn.get(
        LocalStorageDefine_1.ELocalStorageGlobalKey
          .MobileVerticalViewSensitivity,
      ) ?? 0
    );
  }
  set MobileVerticalViewSensitivity(e) {
    this.Gkn.set(
      LocalStorageDefine_1.ELocalStorageGlobalKey.MobileVerticalViewSensitivity,
      e,
    );
  }
  get MobileAimHorizontalViewSensitivity() {
    return (
      this.Gkn.get(
        LocalStorageDefine_1.ELocalStorageGlobalKey
          .MobileAimHorizontalViewSensitivity,
      ) ?? 0
    );
  }
  set MobileAimHorizontalViewSensitivity(e) {
    this.Gkn.set(
      LocalStorageDefine_1.ELocalStorageGlobalKey
        .MobileAimHorizontalViewSensitivity,
      e,
    );
  }
  get MobileAimVerticalViewSensitivity() {
    return (
      this.Gkn.get(
        LocalStorageDefine_1.ELocalStorageGlobalKey
          .MobileAimVerticalViewSensitivity,
      ) ?? 0
    );
  }
  set MobileAimVerticalViewSensitivity(e) {
    this.Gkn.set(
      LocalStorageDefine_1.ELocalStorageGlobalKey
        .MobileAimVerticalViewSensitivity,
      e,
    );
  }
  get MobileCameraShakeStrength() {
    return (
      this.Gkn.get(
        LocalStorageDefine_1.ELocalStorageGlobalKey.MobileCameraShakeStrength,
      ) ?? 0
    );
  }
  set MobileCameraShakeStrength(e) {
    this.Gkn.set(
      LocalStorageDefine_1.ELocalStorageGlobalKey.MobileCameraShakeStrength,
      e,
    );
  }
  get CommonSpringArmLength() {
    return (
      this.Gkn.get(
        LocalStorageDefine_1.ELocalStorageGlobalKey.CommonSpringArmLength,
      ) ?? 0
    );
  }
  set CommonSpringArmLength(e) {
    this.Gkn.set(
      LocalStorageDefine_1.ELocalStorageGlobalKey.CommonSpringArmLength,
      e,
    );
  }
  get FightSpringArmLength() {
    return (
      this.Gkn.get(
        LocalStorageDefine_1.ELocalStorageGlobalKey.FightSpringArmLength,
      ) ?? 0
    );
  }
  set FightSpringArmLength(e) {
    this.Gkn.set(
      LocalStorageDefine_1.ELocalStorageGlobalKey.FightSpringArmLength,
      e,
    );
  }
  get IsResetFocusEnable() {
    return (
      this.Gkn.get(
        LocalStorageDefine_1.ELocalStorageGlobalKey.IsResetFocusEnable,
      ) ?? 0
    );
  }
  set IsResetFocusEnable(e) {
    this.Gkn.set(
      LocalStorageDefine_1.ELocalStorageGlobalKey.IsResetFocusEnable,
      e,
    );
  }
  get IsSidestepCameraEnable() {
    return (
      this.Gkn.get(
        LocalStorageDefine_1.ELocalStorageGlobalKey.IsSidestepCameraEnable,
      ) ?? 0
    );
  }
  set IsSidestepCameraEnable(e) {
    this.Gkn.set(
      LocalStorageDefine_1.ELocalStorageGlobalKey.IsSidestepCameraEnable,
      e,
    );
  }
  get IsSoftLockCameraEnable() {
    return (
      this.Gkn.get(
        LocalStorageDefine_1.ELocalStorageGlobalKey.IsSoftLockCameraEnable,
      ) ?? 0
    );
  }
  set IsSoftLockCameraEnable(e) {
    this.Gkn.set(
      LocalStorageDefine_1.ELocalStorageGlobalKey.IsSoftLockCameraEnable,
      e,
    );
  }
  get JoystickShakeStrength() {
    return (
      this.Gkn.get(
        LocalStorageDefine_1.ELocalStorageGlobalKey.JoystickShakeStrength,
      ) ?? 0
    );
  }
  set JoystickShakeStrength(e) {
    this.Gkn.set(
      LocalStorageDefine_1.ELocalStorageGlobalKey.JoystickShakeStrength,
      e,
    );
  }
  get JoystickShakeType() {
    return (
      this.Gkn.get(
        LocalStorageDefine_1.ELocalStorageGlobalKey.JoystickShakeType,
      ) ?? 0
    );
  }
  set JoystickShakeType(e) {
    this.Gkn.set(
      LocalStorageDefine_1.ELocalStorageGlobalKey.JoystickShakeType,
      e,
    );
  }
  get WalkOrRunRate() {
    return (
      this.Gkn.get(LocalStorageDefine_1.ELocalStorageGlobalKey.WalkOrRunRate) ??
      0
    );
  }
  set WalkOrRunRate(e) {
    this.Gkn.set(LocalStorageDefine_1.ELocalStorageGlobalKey.WalkOrRunRate, e);
  }
  get XessEnable() {
    return (
      this.Gkn.get(LocalStorageDefine_1.ELocalStorageGlobalKey.XessEnable) ?? 0
    );
  }
  set XessEnable(e) {
    this.Gkn.set(LocalStorageDefine_1.ELocalStorageGlobalKey.XessEnable, e);
  }
  get XessQuality() {
    return (
      this.Gkn.get(LocalStorageDefine_1.ELocalStorageGlobalKey.XessQuality) ?? 0
    );
  }
  set XessQuality(e) {
    this.Gkn.set(LocalStorageDefine_1.ELocalStorageGlobalKey.XessQuality, e);
  }
  get MetalFxEnable() {
    return (
      this.Gkn.get(LocalStorageDefine_1.ELocalStorageGlobalKey.MetalFxEnable) ??
      0
    );
  }
  set MetalFxEnable(e) {
    this.Gkn.set(LocalStorageDefine_1.ELocalStorageGlobalKey.MetalFxEnable, e);
  }
  get IrxEnable() {
    return (
      this.Gkn.get(LocalStorageDefine_1.ELocalStorageGlobalKey.IrxEnable) ?? 0
    );
  }
  set IrxEnable(e) {
    this.Gkn.set(LocalStorageDefine_1.ELocalStorageGlobalKey.IrxEnable, e);
  }
  get BloomEnable() {
    return (
      this.Gkn.get(LocalStorageDefine_1.ELocalStorageGlobalKey.BloomEnable) ?? 0
    );
  }
  set BloomEnable(e) {
    this.Gkn.set(LocalStorageDefine_1.ELocalStorageGlobalKey.BloomEnable, e);
  }
  get NpcDensity() {
    return (
      this.Gkn.get(LocalStorageDefine_1.ELocalStorageGlobalKey.NpcDensity) ?? 0
    );
  }
  set NpcDensity(e) {
    this.Gkn.set(LocalStorageDefine_1.ELocalStorageGlobalKey.NpcDensity, e);
  }
  get JoystickMode() {
    return (
      this.Gkn.get(LocalStorageDefine_1.ELocalStorageGlobalKey.JoystickMode) ??
      0
    );
  }
  set JoystickMode(e) {
    this.Gkn.set(LocalStorageDefine_1.ELocalStorageGlobalKey.JoystickMode, e);
  }
  get IsAutoSwitchSkillButtonMode() {
    return (
      this.Gkn.get(
        LocalStorageDefine_1.ELocalStorageGlobalKey.IsAutoSwitchSkillButtonMode,
      ) ?? 0
    );
  }
  set IsAutoSwitchSkillButtonMode(e) {
    this.Gkn.set(
      LocalStorageDefine_1.ELocalStorageGlobalKey.IsAutoSwitchSkillButtonMode,
      e,
    );
  }
  get AimAssistEnable() {
    return (
      this.Gkn.get(
        LocalStorageDefine_1.ELocalStorageGlobalKey.AimAssistEnable,
      ) ?? 0
    );
  }
  set AimAssistEnable(e) {
    this.Gkn.set(
      LocalStorageDefine_1.ELocalStorageGlobalKey.AimAssistEnable,
      e,
    );
  }
  get KeyboardLockEnemyMode() {
    return (
      this.Gkn.get(
        LocalStorageDefine_1.ELocalStorageGlobalKey.KeyboardLockEnemyMode,
      ) ?? 0
    );
  }
  set KeyboardLockEnemyMode(e) {
    this.Gkn.set(
      LocalStorageDefine_1.ELocalStorageGlobalKey.KeyboardLockEnemyMode,
      e,
    );
  }
  get GamepadLockEnemyMode() {
    return (
      this.Gkn.get(
        LocalStorageDefine_1.ELocalStorageGlobalKey.GamepadLockEnemyMode,
      ) ?? 0
    );
  }
  set GamepadLockEnemyMode(e) {
    this.Gkn.set(
      LocalStorageDefine_1.ELocalStorageGlobalKey.GamepadLockEnemyMode,
      e,
    );
  }
  get HorizontalViewRevert() {
    return (
      this.Gkn.get(
        LocalStorageDefine_1.ELocalStorageGlobalKey.HorizontalViewRevert,
      ) ?? 0
    );
  }
  set HorizontalViewRevert(e) {
    this.Gkn.set(
      LocalStorageDefine_1.ELocalStorageGlobalKey.HorizontalViewRevert,
      e,
    );
  }
  get VerticalViewRevert() {
    return (
      this.Gkn.get(
        LocalStorageDefine_1.ELocalStorageGlobalKey.VerticalViewRevert,
      ) ?? 0
    );
  }
  set VerticalViewRevert(e) {
    this.Gkn.set(
      LocalStorageDefine_1.ELocalStorageGlobalKey.VerticalViewRevert,
      e,
    );
  }
  get SkillLockEnemyMode() {
    return (
      this.Gkn.get(
        LocalStorageDefine_1.ELocalStorageGlobalKey.SkillLockEnemyMode,
      ) ?? 0
    );
  }
  set SkillLockEnemyMode(e) {
    this.Gkn.set(
      LocalStorageDefine_1.ELocalStorageGlobalKey.SkillLockEnemyMode,
      e,
    );
  }
  get EnemyHitDisplayMode() {
    return (
      this.Gkn.get(
        LocalStorageDefine_1.ELocalStorageGlobalKey.EnemyHitDisplayMode,
      ) ?? 0
    );
  }
  set EnemyHitDisplayMode(e) {
    this.Gkn.set(
      LocalStorageDefine_1.ELocalStorageGlobalKey.EnemyHitDisplayMode,
      e,
    );
  }
  Initialize(
    e,
    t,
    i,
    a,
    o,
    r,
    l,
    s,
    n,
    h,
    S,
    g,
    _,
    c,
    L,
    m,
    D,
    f,
    u,
    y,
    M,
    p,
    E,
    G,
    d,
    b,
    A,
    F,
    C,
    Q,
    U,
    v,
    I,
    R,
    V,
    w,
    P,
    T,
    N,
    k,
    O,
    W,
    B,
    q,
    H,
    x,
    X,
    z,
    K,
    J,
    j,
    Y,
    Z,
    $,
  ) {
    (this.Eve = e),
      this.SetFrameRate(t),
      (this.ShadowQuality = i),
      (this.NiagaraQuality = a),
      (this.ImageDetail = o),
      (this.AntiAliasing = r),
      (this.SceneAo = l),
      (this.VolumeFog = s),
      (this.VolumeLight = n),
      (this.MotionBlur = h),
      (this.StreamLevel = S),
      (this.PcVsync = g),
      (this.MobileResolution = _),
      (this.SuperResolution = c),
      (this.PcScreenResolution = L),
      (this.PcFullScreenMode = m),
      (this.Brightness = D),
      (this.NvidiaSuperSamplingEnable = f),
      (this.NvidiaSuperSamplingFrameGenerate = u),
      (this.NvidiaSuperSamplingMode = y),
      (this.NvidiaSuperSamplingSharpness = M),
      (this.NvidiaReflex = p),
      (this.FsrEnable = E),
      (this.XessEnable = G),
      (this.XessQuality = d),
      (this.MetalFxEnable = b),
      (this.IrxEnable = A),
      (this.BloomEnable = F),
      (this.NpcDensity = C),
      (this.HorizontalViewSensitivity = Q),
      (this.VerticalViewSensitivity = U),
      (this.AimHorizontalViewSensitivity = v),
      (this.AimVerticalViewSensitivity = I),
      (this.CameraShakeStrength = R),
      (this.MobileHorizontalViewSensitivity = V),
      (this.MobileVerticalViewSensitivity = w),
      (this.MobileAimHorizontalViewSensitivity = P),
      (this.MobileAimVerticalViewSensitivity = T),
      (this.MobileCameraShakeStrength = N),
      (this.CommonSpringArmLength = k),
      (this.FightSpringArmLength = O),
      (this.IsResetFocusEnable = W),
      (this.IsSidestepCameraEnable = B),
      (this.IsSoftLockCameraEnable = q),
      (this.JoystickShakeStrength = H),
      (this.JoystickShakeType = x),
      (this.WalkOrRunRate = X),
      (this.JoystickMode = z),
      (this.IsAutoSwitchSkillButtonMode = K),
      (this.AimAssistEnable = J),
      (this.KeyboardLockEnemyMode = j),
      (this.HorizontalViewRevert = Y),
      (this.VerticalViewRevert = Z),
      (this.GamepadLockEnemyMode = $),
      this.Okn();
  }
  Okn() {
    this.CancelAllPerformanceLimit(), this.xga();
  }
  Copy() {
    var e = new GameQualityInfo();
    return (
      e.Initialize(
        this.Eve,
        this.Sve,
        this.ShadowQuality,
        this.NiagaraQuality,
        this.ImageDetail,
        this.AntiAliasing,
        this.SceneAo,
        this.VolumeFog,
        this.VolumeLight,
        this.MotionBlur,
        this.StreamLevel,
        this.PcVsync,
        this.MobileResolution,
        this.SuperResolution,
        this.PcScreenResolution,
        this.PcFullScreenMode,
        this.Brightness,
        this.NvidiaSuperSamplingEnable,
        this.NvidiaSuperSamplingFrameGenerate,
        this.NvidiaSuperSamplingMode,
        this.NvidiaSuperSamplingSharpness,
        this.NvidiaReflex,
        this.FsrEnable,
        this.XessEnable,
        this.XessQuality,
        this.MetalFxEnable,
        this.IrxEnable,
        this.BloomEnable,
        this.NpcDensity,
        this.HorizontalViewSensitivity,
        this.VerticalViewSensitivity,
        this.AimHorizontalViewSensitivity,
        this.AimVerticalViewSensitivity,
        this.CameraShakeStrength,
        this.MobileHorizontalViewSensitivity,
        this.MobileVerticalViewSensitivity,
        this.MobileAimHorizontalViewSensitivity,
        this.MobileAimVerticalViewSensitivity,
        this.MobileCameraShakeStrength,
        this.CommonSpringArmLength,
        this.FightSpringArmLength,
        this.IsResetFocusEnable,
        this.IsSidestepCameraEnable,
        this.IsSoftLockCameraEnable,
        this.JoystickShakeStrength,
        this.JoystickShakeType,
        this.WalkOrRunRate,
        this.JoystickMode,
        this.IsAutoSwitchSkillButtonMode,
        this.AimAssistEnable,
        this.KeyboardLockEnemyMode,
        this.HorizontalViewRevert,
        this.VerticalViewRevert,
        this.GamepadLockEnemyMode,
      ),
      e
    );
  }
  get Eve() {
    return this.Gkn.get(
      LocalStorageDefine_1.ELocalStorageGlobalKey.GameQualityLevel,
    );
  }
  set Eve(e) {
    this.Gkn.set(
      LocalStorageDefine_1.ELocalStorageGlobalKey.GameQualityLevel,
      e ?? 0,
    );
  }
  GetGameQualitySettingLevel() {
    return this.Eve;
  }
  GetQualitySettingScore() {
    var e =
      GameQualitySettingsManager_1.GameQualitySettingsManager.IsPcPlatform();
    let t = 0;
    t = e
      ? (this.PcScreenResolution.X * this.PcScreenResolution.Y) / 2073600
      : GameQualityInfo.Lve[this.MobileResolution];
    e = this.Sve / 30;
    return (
      (GameQualityInfo.Dve[this.Eve] +
        GameQualityInfo.Rve[
          MathUtils_1.MathUtils.Clamp(
            this.ShadowQuality,
            0,
            GameQualityInfo.Rve.length - 1,
          )
        ] +
        GameQualityInfo.Uve[
          MathUtils_1.MathUtils.Clamp(
            this.NiagaraQuality,
            0,
            GameQualityInfo.Uve.length - 1,
          )
        ] +
        GameQualityInfo.Ave[
          MathUtils_1.MathUtils.Clamp(
            this.ImageDetail,
            0,
            GameQualityInfo.Ave.length - 1,
          )
        ] +
        GameQualityInfo.Pve[
          MathUtils_1.MathUtils.Clamp(
            this.SceneAo,
            0,
            GameQualityInfo.Pve.length - 1,
          )
        ] +
        GameQualityInfo.xve[
          MathUtils_1.MathUtils.Clamp(
            this.AntiAliasing,
            0,
            GameQualityInfo.xve.length - 1,
          )
        ] +
        GameQualityInfo.wve[
          MathUtils_1.MathUtils.Clamp(
            this.VolumeFog,
            0,
            GameQualityInfo.wve.length - 1,
          )
        ] +
        GameQualityInfo.Bve[
          MathUtils_1.MathUtils.Clamp(
            this.VolumeLight,
            0,
            GameQualityInfo.Bve.length - 1,
          )
        ] +
        GameQualityInfo.bve[
          MathUtils_1.MathUtils.Clamp(
            this.MotionBlur,
            0,
            GameQualityInfo.bve.length - 1,
          )
        ] +
        GameQualityInfo.qve[
          MathUtils_1.MathUtils.Clamp(
            this.FsrEnable,
            0,
            GameQualityInfo.qve.length - 1,
          )
        ]) *
      t *
      e
    );
  }
  get Sve() {
    return (
      this.Gkn.get(
        LocalStorageDefine_1.ELocalStorageGlobalKey.CustomFrameRate,
      ) ?? 30
    );
  }
  set Sve(e) {
    this.Gkn.set(
      LocalStorageDefine_1.ELocalStorageGlobalKey.CustomFrameRate,
      e,
    );
  }
  GetIsOverLoad() {
    return (
      !GameQualitySettingsManager_1.GameQualitySettingsManager.IsPcPlatform() &&
      60 === this.Sve &&
      3 === this.Eve
    );
  }
  GetFrameRateTemporary() {
    return this.yve;
  }
  SetFrameRate(e) {
    (this.Sve = MathUtils_1.MathUtils.Clamp(e, 24, 120)),
      (this.Ive = 1 / this.Sve);
  }
  ApplyFrameRate() {
    var e = UE.GameUserSettings.GetGameUserSettings();
    let t = this.Sve;
    0 < this.yve && (t = this.yve),
      e.SetFrameRateLimit(t),
      e.ApplySettings(!0),
      PerfSightController_1.PerfSightController.IsEnable &&
        UE.PerfSightHelper.PostEvent(801, t.toString()),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.SettingFrameRateChanged,
        t,
      );
  }
  SetFrameRateTemploary(e) {
    (this.yve = MathUtils_1.MathUtils.Clamp(e, 24, 120)),
      (this.Ive = 1 / this.yve);
  }
  SetSequenceFrameRateLimit() {
    GameQualitySettingsManager_1.GameQualitySettingsManager.IsIosPlatform()
      ? 45 < this.Sve && (this.SetFrameRateTemploary(30), this.ApplyFrameRate())
      : GameQualitySettingsManager_1.GameQualitySettingsManager.IsAndroidPlatform() &&
        40 < this.Sve &&
        (this.SetFrameRateTemploary(30), this.ApplyFrameRate()),
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "r.Streaming.KuroMinFOVFactorForStreaming 0.2",
      ),
      (GameQualitySettingsManager_1.GameQualitySettingsManager.IsIosPlatform() ||
        GameQualitySettingsManager_1.GameQualitySettingsManager.IsAndroidPlatform()) &&
        this.TryReduceCsmUpdateFrequency("Plot");
  }
  CancleSequenceFrameRateLimit() {
    this.CancelFrameRateTemploary(),
      this.ApplyFrameRate(),
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "r.Streaming.KuroMinFOVFactorForStreaming 0.83333",
      ),
      (GameQualitySettingsManager_1.GameQualitySettingsManager.IsIosPlatform() ||
        GameQualitySettingsManager_1.GameQualitySettingsManager.IsAndroidPlatform()) &&
        this.TryRestoreCsmUpdateFrequency("Plot");
  }
  TryReduceCsmUpdateFrequency(e) {
    var t = this.Tve.size;
    this.Tve.add(e), 0 === t && 1 === this.Tve.size && this.Gve();
  }
  TryRestoreCsmUpdateFrequency(e) {
    this.Tve.delete(e) && 0 === this.Tve.size && this.Nve();
  }
  Gve() {
    UE.KismetSystemLibrary.ExecuteConsoleCommand(
      GlobalData_1.GlobalData.World,
      "r.Shadow.CSMMode3EnableUpdateIntervalOverride 1",
    ),
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        'r.Shadow.CacheMode3CacheUpdateIntervalsOverride "3000,3000,3000,3000,3000,3000"',
      ),
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "r.PSO.IOSCompilationTimeLimit 0.1",
      );
  }
  Nve() {
    UE.KismetSystemLibrary.ExecuteConsoleCommand(
      GlobalData_1.GlobalData.World,
      "r.Shadow.CSMMode3EnableUpdateIntervalOverride 0",
    ),
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "r.PSO.IOSCompilationTimeLimit 2.0",
      );
  }
  CancelFrameRateTemploary() {
    (this.yve = 0), (this.Ive = 1 / this.Sve);
  }
  RefreshPerformanceLimit(e) {
    let i = 0,
      a = 0;
    this.PerformanceLimitRunning.forEach((e, t) => {
      e.FrameLimit && i++, e.CacheWorldFrame && a++;
    }),
      GameQualitySettingsManager_1.GameQualitySettingsManager.IsPcPlatform() ||
        (0 < i
          ? this.SetFrameRateTemploary(30)
          : this.CancelFrameRateTemploary(),
        this.ApplyFrameRate()),
      1 === a
        ? (UE.KismetSystemLibrary.ExecuteConsoleCommand(
            GlobalData_1.GlobalData.World,
            "r.CacheSceneColor.Start",
          ),
          (GameQualitySettingsManager_1.GameQualitySettingsManager.InCacheSceneColorMode = 1))
        : 0 === a &&
          (UE.KismetSystemLibrary.ExecuteConsoleCommand(
            GlobalData_1.GlobalData.World,
            "r.CacheSceneColor.Stop",
          ),
          (GameQualitySettingsManager_1.GameQualitySettingsManager.InCacheSceneColorMode = 0)),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Game",
          48,
          "performanceControl:RefreshPerformanceLimit result",
          ["reason", e],
          ["frameLimit", i],
          ["cacheWorldFrame", a],
        );
  }
  ApplyPerformanceLimit(e) {
    var t;
    performanceLimitConfigs.has(e) &&
      (t = performanceLimitConfigs.get(e)) &&
      (this.PerformanceLimitRunning.set(e, t),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Game",
          48,
          "performanceControl:ApplyPerformanceLimit",
          ["source", e],
          ["frameLimit", t.FrameLimit],
          ["cacheWorldFrame", t.CacheWorldFrame],
        ),
      this.RefreshPerformanceLimit(e));
  }
  CancelPerformanceLimit(e) {
    this.PerformanceLimitRunning.delete(e) &&
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Game",
          48,
          "performanceControl:CancelPerformanceLimit",
          ["source", e],
        ),
      this.RefreshPerformanceLimit(e));
  }
  ApplyPerformanceSeqLimit(e) {
    this.ApplyPerformanceLimit(e + PERFORMENCELIMIT_SEQ_TAIL);
  }
  CancelPerformanceSeqLimit(e) {
    this.CancelPerformanceLimit(e + PERFORMENCELIMIT_SEQ_TAIL);
  }
  CancelAllPerformanceLimit() {
    this.PerformanceLimitRunning.clear(),
      this.CancelFrameRateTemploary(),
      this.ApplyFrameRate(),
      this.RefreshPerformanceLimit("[CancelAll]");
  }
  xga() {
    this.Uga.clear();
    for (var [e, t] of MenuDefine_1.functionIdToGameQualityKeyMap)
      this.Uga.set(t, e);
  }
  Pga(e) {
    e = this.Uga.get(e);
    if (void 0 !== e)
      return ConfigManager_1.ConfigManager.MenuBaseConfig?.GetMenuConfigByFunctionId(
        e,
      );
  }
  wga(e, t) {
    var i = this.Pga(e);
    if (!i) return t ?? 0;
    switch (i.SetType) {
      case 1:
        return i.SliderDefault;
      case 2:
      case 4:
        return i.OptionsDefault;
      default:
        return t ?? 0;
    }
  }
  ApplyFrameTimeParams() {}
  IsSupportDLSS3() {
    return !(
      "D3D12" !==
        GameQualitySettingsManager_1.GameQualitySettingsManager.RHIName ||
      !GameQualitySettingsManager_1.GameQualitySettingsManager.DeviceName.includes(
        "RTX 4",
      )
    );
  }
  ApplyPcVsync() {
    var e = UE.GameUserSettings.GetGameUserSettings();
    e.SetVSyncEnabled(1 === this.PcVsync), e.ApplySettings(!0);
  }
  ApplyScreenResolution() {
    var e = UE.GameUserSettings.GetGameUserSettings();
    e.SetScreenResolution(this.PcScreenResolution),
      e.ApplySettings(!0),
      PerfSightController_1.PerfSightController.IsEnable &&
        ((e = this.PcScreenResolution.X * this.PcScreenResolution.Y),
        UE.PerfSightHelper.PostEvent(803, e.toString()));
  }
  ApplyFullscreenMode() {
    var e = UE.GameUserSettings.GetGameUserSettings();
    e.SetFullscreenMode(this.PcFullScreenMode), e.ApplySettings(!0);
  }
  ApplyBrightness() {
    let e = 2.2;
    this.Brightness < 0 &&
      (e = MathUtils_1.MathUtils.Lerp(1.5, 2.2, this.Brightness + 1)),
      0 < this.Brightness &&
        (e = MathUtils_1.MathUtils.Lerp(2.2, 3.5, this.Brightness)),
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "r.TonemapperGamma " + e,
      ),
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "r.LUT.Regenerate 1",
      ),
      UE.KismetMaterialLibrary.SetScalarParameterValue(
        GlobalData_1.GlobalData.World,
        RenderDataManager_1.RenderDataManager.Get().GetUiShowBrightnessMaterialParameterCollection(),
        RenderConfig_1.RenderConfig.UIShowBrightness,
        e,
      );
  }
  ApplyShadowQuality() {
    UE.KismetSystemLibrary.ExecuteConsoleCommand(
      GlobalData_1.GlobalData.World,
      "sg.ShadowQuality " +
        (this.GetIsOverLoad() && 1 < this.ShadowQuality
          ? 1
          : this.ShadowQuality),
    ),
      PerfSightController_1.PerfSightController.IsEnable &&
        UE.PerfSightHelper.PostEvent(808, this.ShadowQuality.toString());
  }
  ApplyNiagaraQuality() {
    var e,
      t = UE.GameUserSettings.GetGameUserSettings();
    GameQualitySettingsManager_1.GameQualitySettingsManager.IsPcPlatform()
      ? UE.KismetSystemLibrary.ExecuteConsoleCommand(
          GlobalData_1.GlobalData.World,
          "fx.Niagara.QualityLevel " + (0 < this.NiagaraQuality ? 2 : 1),
        )
      : ((e =
          3 === this.Eve &&
          GameQualitySettingsManager_1.GameQualitySettingsManager.IsIosAndAndroidHighDevice()),
        UE.KismetSystemLibrary.ExecuteConsoleCommand(
          GlobalData_1.GlobalData.World,
          "r.DisableDistortion " + (0 !== this.NiagaraQuality && e ? 0 : 1),
        ),
        UE.KismetSystemLibrary.ExecuteConsoleCommand(
          GlobalData_1.GlobalData.World,
          "fx.Niagara.QualityLevel " + (0 < this.NiagaraQuality ? 1 : 0),
        )),
      t.ApplySettings(!0),
      PerfSightController_1.PerfSightController.IsEnable &&
        UE.PerfSightHelper.PostEvent(807, this.NiagaraQuality.toString());
  }
  ApplyImageDetail() {
    var e;
    PerfSightController_1.PerfSightController.IsEnable &&
      UE.PerfSightHelper.PostEvent(805, this.ImageDetail.toString()),
      GameQualitySettingsManager_1.GameQualitySettingsManager.IsPcPlatform()
        ? (UE.KismetSystemLibrary.ExecuteConsoleCommand(
            GlobalData_1.GlobalData.World,
            "r.Kuro.ToonOutlineDrawDistancePc " +
              (1 < this.ImageDetail ? 4e3 : 2e3),
          ),
          UE.KismetSystemLibrary.ExecuteConsoleCommand(
            GlobalData_1.GlobalData.World,
            "r.Kuro.Foliage.GrassCullDistanceMax " +
              (1 < this.ImageDetail ? 15e3 : 6e3),
          ),
          this.ImageDetail <= 0
            ? UE.KismetSystemLibrary.ExecuteConsoleCommand(
                GlobalData_1.GlobalData.World,
                "r.Streaming.ForceKuroRuntimeLODBias 1",
              )
            : UE.KismetSystemLibrary.ExecuteConsoleCommand(
                GlobalData_1.GlobalData.World,
                "r.Streaming.ForceKuroRuntimeLODBias 0",
              ))
        : (UE.KismetSystemLibrary.ExecuteConsoleCommand(
            GlobalData_1.GlobalData.World,
            "r.Kuro.ToonOutlineDrawDistanceMobile " + (this.ImageDetail, 500),
          ),
          UE.KismetSystemLibrary.ExecuteConsoleCommand(
            GlobalData_1.GlobalData.World,
            "foliage.DensityType " + this.ImageDetail,
          ),
          (e =
            GameQualitySettingsManager_1.GameQualitySettingsManager.IsAndroidPlatformScreenBetter() &&
            !this.GetIsOverLoad()),
          UE.KismetSystemLibrary.ExecuteConsoleCommand(
            GlobalData_1.GlobalData.World,
            "r.Mobile.SceneObjMobileSSR " + (1 < this.ImageDetail && e ? 1 : 0),
          ),
          (e = 3 === this.Eve && e),
          UE.KismetSystemLibrary.ExecuteConsoleCommand(
            GlobalData_1.GlobalData.World,
            "r.Mobile.TreeRimLight " + (e ? 1 : 0),
          ),
          (GameQualitySettingsManager_1.GameQualitySettingsManager.IsIosPlatform() ||
            GameQualitySettingsManager_1.GameQualitySettingsManager.IsAndroidPlatform()) &&
            (this.ImageDetail < 1
              ? UE.KismetSystemLibrary.ExecuteConsoleCommand(
                  GlobalData_1.GlobalData.World,
                  "r.Streaming.ForceKuroRuntimeLODBias 1",
                )
              : UE.KismetSystemLibrary.ExecuteConsoleCommand(
                  GlobalData_1.GlobalData.World,
                  "r.Streaming.ForceKuroRuntimeLODBias 0",
                )),
          GameQualitySettingsManager_1.GameQualitySettingsManager.IsPSPlatform() &&
            UE.KismetSystemLibrary.ExecuteConsoleCommand(
              GlobalData_1.GlobalData.World,
              "r.Streaming.ForceKuroRuntimeLODBias 0",
            ));
  }
  ApplyAntiAliasing() {
    GameQualitySettingsManager_1.GameQualitySettingsManager.IsPcPlatform(),
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "r.DefaultFeature.AntiAliasing " + (0 === this.AntiAliasing ? 0 : 2),
      ),
      PerfSightController_1.PerfSightController.IsEnable &&
        UE.PerfSightHelper.PostEvent(802, this.AntiAliasing.toString());
  }
  ApplySceneAo() {
    var e;
    GameQualitySettingsManager_1.GameQualitySettingsManager.IsPcPlatform()
      ? (UE.KismetSystemLibrary.ExecuteConsoleCommand(
          GlobalData_1.GlobalData.World,
          "r.AmbientOcclusionLevels " + -this.SceneAo,
        ),
        RenderDataManager_1.RenderDataManager.Get().SetGrassAo(this.SceneAo),
        PerfSightController_1.PerfSightController.IsEnable &&
          UE.PerfSightHelper.PostEvent(810, this.SceneAo.toString()))
      : ((e =
          GameQualitySettingsManager_1.GameQualitySettingsManager.IsAndroidPlatformScreenBetter() &&
          !this.GetIsOverLoad()
            ? this.SceneAo
            : 0),
        UE.KismetSystemLibrary.ExecuteConsoleCommand(
          GlobalData_1.GlobalData.World,
          "r.Mobile.SSAO " + e,
        ),
        this.ApplyMaterialParameterCollectionAO(e),
        RenderDataManager_1.RenderDataManager.Get().SetGrassAo(e),
        PerfSightController_1.PerfSightController.IsEnable &&
          UE.PerfSightHelper.PostEvent(810, e.toString()));
  }
  ApplySceneLightQuality() {
    var e;
    GameQualitySettingsManager_1.GameQualitySettingsManager.IsPcPlatform() ||
      (GameQualitySettingsManager_1.GameQualitySettingsManager.IsIosAndAndroidHighDevice() &&
      !this.GetIsOverLoad()
        ? ((e = [1, 2, 3, 4]),
          UE.KismetSystemLibrary.ExecuteConsoleCommand(
            GlobalData_1.GlobalData.World,
            "r.Kuro.GlobalLightQuality " + e[this.Eve],
          ))
        : ((e = [1, 2, 3, 3]),
          UE.KismetSystemLibrary.ExecuteConsoleCommand(
            GlobalData_1.GlobalData.World,
            "r.Kuro.GlobalLightQuality " + e[this.Eve],
          )));
  }
  ApplyVolumeFog() {
    GameQualitySettingsManager_1.GameQualitySettingsManager.Get().IsEnableVolumeFog() &&
      (UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "r.volumetricfog " + this.VolumeFog,
      ),
      PerfSightController_1.PerfSightController.IsEnable) &&
      UE.PerfSightHelper.PostEvent(809, this.VolumeFog.toString());
  }
  ApplyVolumeLight() {
    var e;
    GameQualitySettingsManager_1.GameQualitySettingsManager.IsPcPlatform()
      ? UE.KismetSystemLibrary.ExecuteConsoleCommand(
          GlobalData_1.GlobalData.World,
          "r.lightShaftQuality " + this.VolumeLight,
        )
      : ((e =
          GameQualitySettingsManager_1.GameQualitySettingsManager.IsIosAndAndroidHighDevice() &&
          !this.GetIsOverLoad()),
        UE.KismetSystemLibrary.ExecuteConsoleCommand(
          GlobalData_1.GlobalData.World,
          "r.MobileLightShaft " + (e ? this.VolumeLight : 0),
        ));
  }
  ApplyMotionBlur() {
    UE.KismetSystemLibrary.ExecuteConsoleCommand(
      GlobalData_1.GlobalData.World,
      "r.MotionBlur.Amount " +
        this.MotionBlur *
          (ModelManager_1.ModelManager?.CameraModel?.MotionBlurModifier ?? 0.2),
    );
  }
  ApplyMaterialParameterCollection() {
    GameQualitySettingsManager_1.GameQualitySettingsManager.DeviceName.includes(
      "Adreno (TM) 660",
    ) &&
      UE.KismetMaterialLibrary.SetScalarParameterValue(
        GlobalData_1.GlobalData.World,
        RenderDataManager_1.RenderDataManager.Get().GetGlobalShaderParameters(),
        new UE.FName("MobileDepthError_K40_magic3pro_oppofindx5"),
        0,
      ),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Render",
          60,
          "骁龙888设置MPC " +
            String(
              GameQualitySettingsManager_1.GameQualitySettingsManager.DeviceName.includes(
                "Adreno (TM) 660",
              ),
            ),
        );
  }
  ApplyMaterialParameterCollectionAO(e) {
    UE.KismetMaterialLibrary.SetScalarParameterValue(
      GlobalData_1.GlobalData.World,
      RenderDataManager_1.RenderDataManager.Get().GetGlobalShaderParameters(),
      new UE.FName("EnableMobileScreenAO"),
      e,
    );
  }
  GetMobileResolutionByDeviceType() {
    return GameQualitySettingsManager_1.GameQualitySettingsManager.IsIosPlatform() ||
      GameQualitySettingsManager_1.GameQualitySettingsManager.IsAndroidPlatformNotLow()
      ? [70, 80, 85, 100][this.MobileResolution]
      : GameQualitySettingsManager_1.GameQualitySettingsManager.IsAndroidPlatformLow()
        ? [60, 80, 85, 90][this.MobileResolution]
        : 80;
  }
  ApplyMobileResolution() {
    if (
      !GameQualitySettingsManager_1.GameQualitySettingsManager.IsPcPlatform()
    ) {
      GameQualitySettingsManager_1.GameQualitySettingsManager.IsAndroidPlatform() &&
        (0 === this.MobileResolution
          ? UE.KismetSystemLibrary.ExecuteConsoleCommand(
              GlobalData_1.GlobalData.World,
              "r.TemporalAA.SharpenLimitDepth 50",
            )
          : UE.KismetSystemLibrary.ExecuteConsoleCommand(
              GlobalData_1.GlobalData.World,
              "r.TemporalAA.SharpenLimitDepth -1",
            ),
        GameQualitySettingsManager_1.GameQualitySettingsManager.IsAndroidPlatformScreenBetter() &&
          UE.KismetSystemLibrary.ExecuteConsoleCommand(
            GlobalData_1.GlobalData.World,
            "r.TemporalAA.Sharpness 0.5",
          ),
        GameQualitySettingsManager_1.GameQualitySettingsManager.IsAndroidPlatformScreenBad()) &&
        UE.KismetSystemLibrary.ExecuteConsoleCommand(
          GlobalData_1.GlobalData.World,
          "r.TemporalAA.Sharpness 0.1",
        ),
        1 ===
          GameQualitySettingsManager_1.GameQualitySettingsManager
            .InCacheSceneColorMode &&
          UE.KismetSystemLibrary.ExecuteConsoleCommand(
            GlobalData_1.GlobalData.World,
            "r.CacheSceneColor.Start",
          );
      let e = this.GetMobileResolutionByDeviceType();
      var t = UE.KismetSystemLibrary.GetConsoleVariableFloatValue(
          "r.MobileContentScaleFactor",
        ),
        i = UE.KismetSystemLibrary.GetConsoleVariableFloatValue(
          "r.SecondaryScreenPercentage.GameViewport",
        );
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Game", 17, "分辨率参数获取", [
          "r.MobileContentScaleFactor",
          t,
        ]),
        GameQualitySettingsManager_1.GameQualitySettingsManager.Get().GetDefaultScreenResolution()
          .Y < 750 &&
          i < 70 &&
          (e = Math.min(1.5 * e, 100)),
        PerfSightController_1.PerfSightController.IsEnable &&
          ((i =
            (((t =
              GameQualitySettingsManager_1.GameQualitySettingsManager.Get().GetDefaultScreenResolution())
              .X *
              t.Y) /
              1e4) *
            e *
            e),
          UE.PerfSightHelper.PostEvent(803, i.toString())),
        UE.KismetSystemLibrary.ExecuteConsoleCommand(
          GlobalData_1.GlobalData.World,
          "r.ScreenPercentage " + e,
        ),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Game", 17, "分辨率参数设置", [
            "r.ScreenPercentage",
            e,
          ]);
    }
  }
  ApplySuperResolution() {}
  IsNvidiaStreamlinePluginLoaded() {
    return UE.KismetSystemLibrary.GetConsoleVariableBoolValue(
      "r.Streamline.UnregisterReflexPlugin",
    );
  }
  IsNvidiaDLSSPluginLoaded() {
    return (
      1 === UE.KismetSystemLibrary.GetConsoleVariableIntValue("r.NGX.Enable")
    );
  }
  ApplyNvidiaSuperSamplingEnable() {
    (GameQualitySettingsManager_1.GameQualitySettingsManager.IsInDLSSSuperFrameRateMode =
      !1),
      GameQualitySettingsManager_1.GameQualitySettingsManager.IsPS5Platform() ||
        (GameQualitySettingsManager_1.GameQualitySettingsManager.IsDlssGpuDevice() &&
          this.IsNvidiaDLSSPluginLoaded() &&
          this.IsNvidiaStreamlinePluginLoaded() &&
          (1 === this.NvidiaSuperSamplingEnable
            ? (UE.KismetSystemLibrary.ExecuteConsoleCommand(
                GlobalData_1.GlobalData.World,
                "r.NGX.DLSS.Enable 1",
              ),
              UE.KismetSystemLibrary.ExecuteConsoleCommand(
                GlobalData_1.GlobalData.World,
                "r.TemporalAASamples 8",
              ),
              UE.KismetSystemLibrary.ExecuteConsoleCommand(
                GlobalData_1.GlobalData.World,
                "r.TemporalAAFilterSize 1",
              ),
              UE.KismetSystemLibrary.ExecuteConsoleCommand(
                GlobalData_1.GlobalData.World,
                "r.FidelityFX.FSR.SecondaryUpscale 0",
              ),
              this.ApplyNvidiaSuperSamplingFrameGenerate(),
              this.ApplyNvidiaReflex())
            : (UE.KismetSystemLibrary.ExecuteConsoleCommand(
                GlobalData_1.GlobalData.World,
                "r.NGX.DLSS.Enable 0",
              ),
              UE.KismetSystemLibrary.ExecuteConsoleCommand(
                GlobalData_1.GlobalData.World,
                "r.TemporalAASamples 4",
              ),
              UE.StreamlineLibraryDLSSG.SetDLSSGMode(0),
              UE.StreamlineLibraryReflex.SetReflexMode(0)),
          this.ApplyPcVsync(),
          1 ===
            GameQualitySettingsManager_1.GameQualitySettingsManager
              .InCacheSceneColorMode &&
            UE.KismetSystemLibrary.ExecuteConsoleCommand(
              GlobalData_1.GlobalData.World,
              "r.CacheSceneColor.Start",
            ),
          PerfSightController_1.PerfSightController.IsEnable) &&
          UE.PerfSightHelper.PostEvent(
            804,
            this.NvidiaSuperSamplingEnable.toString(),
          ));
  }
  ApplyNvidiaSuperSamplingFrameGenerate() {
    GameQualitySettingsManager_1.GameQualitySettingsManager.IsDlssGpuDevice() &&
      this.IsNvidiaStreamlinePluginLoaded() &&
      UE.StreamlineLibraryDLSSG.SetDLSSGMode(0);
  }
  ApplyNvidiaSuperSamplingMode() {
    GameQualitySettingsManager_1.GameQualitySettingsManager.IsDlssGpuDevice() &&
      this.IsNvidiaDLSSPluginLoaded() &&
      UE.DLSSLibrary.GetDLSSMode() !== this.NvidiaSuperSamplingMode &&
      (UE.DLSSLibrary.SetDLSSMode(this.NvidiaSuperSamplingMode),
      PerfSightController_1.PerfSightController.IsEnable) &&
      UE.PerfSightHelper.PostEvent(
        812,
        this.NvidiaSuperSamplingMode.toString(),
      );
  }
  ApplyNvidiaSuperSamplingSharpness() {
    GameQualitySettingsManager_1.GameQualitySettingsManager.IsDlssGpuDevice() &&
      this.IsNvidiaDLSSPluginLoaded() &&
      UE.DLSSLibrary.SetDLSSSharpness(this.NvidiaSuperSamplingSharpness);
  }
  ApplyNvidiaReflex() {
    GameQualitySettingsManager_1.GameQualitySettingsManager.IsDlssGpuDevice() &&
      this.IsNvidiaStreamlinePluginLoaded() &&
      UE.StreamlineLibraryReflex.SetReflexMode(this.NvidiaReflex);
  }
  ApplyFsrEnable() {
    GameQualitySettingsManager_1.GameQualitySettingsManager.IsDlssGpuDevice() ||
      (GameQualitySettingsManager_1.GameQualitySettingsManager.IsPcPlatform()
        ? (UE.KismetSystemLibrary.ExecuteConsoleCommand(
            GlobalData_1.GlobalData.World,
            "r.NGX.DLSS.Enable 0",
          ),
          UE.KismetSystemLibrary.ExecuteConsoleCommand(
            GlobalData_1.GlobalData.World,
            "r.TemporalAASamples 4",
          ),
          1 === this.FsrEnable
            ? (UE.KismetSystemLibrary.ExecuteConsoleCommand(
                GlobalData_1.GlobalData.World,
                "r.FidelityFX.FSR.PrimaryUpscale 1",
              ),
              UE.KismetSystemLibrary.ExecuteConsoleCommand(
                GlobalData_1.GlobalData.World,
                "r.ScreenPercentage 77",
              ),
              UE.KismetSystemLibrary.ExecuteConsoleCommand(
                GlobalData_1.GlobalData.World,
                "r.MipMapLODBias -0.3765",
              ),
              UE.KismetSystemLibrary.ExecuteConsoleCommand(
                GlobalData_1.GlobalData.World,
                "r.TemporalAACurrentFrameWeight 0.09",
              ))
            : (UE.KismetSystemLibrary.ExecuteConsoleCommand(
                GlobalData_1.GlobalData.World,
                "r.FidelityFX.FSR.PrimaryUpscale 0",
              ),
              UE.KismetSystemLibrary.ExecuteConsoleCommand(
                GlobalData_1.GlobalData.World,
                "r.ScreenPercentage 100",
              ),
              UE.KismetSystemLibrary.ExecuteConsoleCommand(
                GlobalData_1.GlobalData.World,
                "r.MipMapLODBias 0.0",
              ),
              UE.KismetSystemLibrary.ExecuteConsoleCommand(
                GlobalData_1.GlobalData.World,
                "r.TemporalAACurrentFrameWeight 0.25",
              )))
        : 1 === this.FsrEnable
          ? (UE.KismetSystemLibrary.ExecuteConsoleCommand(
              GlobalData_1.GlobalData.World,
              "r.FidelityFX.FSR.PrimaryUpscale 1",
            ),
            UE.KismetSystemLibrary.ExecuteConsoleCommand(
              GlobalData_1.GlobalData.World,
              "r.TemporalAA.ClampTolerant 0",
            ))
          : (UE.KismetSystemLibrary.ExecuteConsoleCommand(
              GlobalData_1.GlobalData.World,
              "r.FidelityFX.FSR.PrimaryUpscale 0",
            ),
            UE.KismetSystemLibrary.ExecuteConsoleCommand(
              GlobalData_1.GlobalData.World,
              "r.TemporalAA.ClampTolerant 2",
            )),
      PerfSightController_1.PerfSightController.IsEnable &&
        UE.PerfSightHelper.PostEvent(813, this.FsrEnable.toString()));
  }
  ApplyXessEnable() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Game", 41, "ApplyXessEnable", [
        "XessEnable",
        this.XessEnable,
      ]),
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "r.XeSS.Enabled " + this.XessEnable,
      );
  }
  ApplyXessQuality() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Game", 41, "ApplyXessQuality", [
        "XessQuality",
        this.XessQuality,
      ]),
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "r.XeSS.Enabled " + this.XessQuality,
      );
  }
  ApplyMetalFxEnable() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Game", 41, "ApplyMetalFxEnable", [
        "MetalFxEnable",
        this.MetalFxEnable,
      ]),
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "r.MetalFxUpscale " + this.MetalFxEnable,
      );
  }
  ApplyIrxEnable() {
    GameQualitySettingsManager_1.GameQualitySettingsManager.IsPWSDKDevice() &&
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Game", 41, "ApplyIrxEnable", [
          "IrxEnable",
          this.IrxEnable,
        ]),
      this.IrxEnable);
  }
  ApplyBloomEnable() {
    UE.KismetSystemLibrary.ExecuteConsoleCommand(
      GlobalData_1.GlobalData.World,
      "r.Kuro.KuroBloomEnable " + this.BloomEnable,
    ),
      PerfSightController_1.PerfSightController.IsEnable &&
        UE.PerfSightHelper.PostEvent(811, this.BloomEnable.toString());
  }
  ApplyNpcDensity() {
    GameQualitySettingsManager_1.GameQualitySettingsManager.IsLowMemoryDevice() &&
      1 < this.NpcDensity &&
      (this.NpcDensity = 1),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Game", 41, "ApplyNpcDensity", [
          "NpcDensity",
          this.NpcDensity,
        ]),
      ControllerHolder_1.ControllerHolder.CreatureController.RefreshDensityLevel(),
      PerfSightController_1.PerfSightController.IsEnable &&
        UE.PerfSightHelper.PostEvent(806, this.NpcDensity.toString());
  }
  GetFrameRate() {
    return this.Sve;
  }
  GetFrameSeconds() {
    return this.Ive;
  }
  SetResolution(e) {
    this.PcScreenResolution = e;
  }
  SetPcFullScreenMode(e) {
    this.PcFullScreenMode = e;
  }
  SetBrightness(e) {
    this.Brightness = e;
  }
  SetShadowQuality(e) {
    this.ShadowQuality = e;
  }
  SetNiagaraQuality(e) {
    this.NiagaraQuality = e;
  }
  SetImageDetail(e) {
    this.ImageDetail = e;
  }
  SetAntiAliasing(e) {
    this.AntiAliasing = e;
  }
  SetSceneAo(e) {
    this.SceneAo = e;
  }
  SetVolumeFog(e) {
    this.VolumeFog = e;
  }
  SetVolumeLight(e) {
    this.VolumeLight = e;
  }
  SetMotionBlur(e) {
    this.MotionBlur = e;
  }
  SetPcVsync(e) {
    this.PcVsync = e;
  }
  SetMobileResolution(e) {
    this.MobileResolution = e;
  }
  SetSuperResolution(e) {
    this.SuperResolution = e;
  }
  SetNvidiaSuperSamplingEnable(e) {
    this.NvidiaSuperSamplingEnable = e;
  }
  SetNvidiaSuperSamplingFrameGenerate(e) {
    this.NvidiaSuperSamplingFrameGenerate = e;
  }
  SetNvidiaSuperSamplingMode(e) {
    this.NvidiaSuperSamplingMode = e;
  }
  SetNvidiaSuperSamplingSharpness(e) {
    this.NvidiaSuperSamplingSharpness = e;
  }
  SetNvidiaReflex(e) {
    this.NvidiaReflex = e;
  }
  SetFsrEnable(e) {
    this.FsrEnable = e;
  }
  SetXessEnable(e) {
    this.XessEnable = e;
  }
  SetXessQuality(e) {
    this.XessQuality = e;
  }
  SetMetalFxEnable(e) {
    this.MetalFxEnable = e;
  }
  SetIrxEnable(e) {
    this.IrxEnable = e;
  }
  SetBloomEnable(e) {
    this.BloomEnable = e;
  }
  SetNpcDensity(e) {
    this.NpcDensity = e;
  }
  SetHorizontalViewSensitivity(e) {
    this.HorizontalViewSensitivity = e;
  }
  ApplyHorizontalViewSensitivity() {
    ModelManager_1.ModelManager.CameraModel.SetCameraBaseYawSensitivity(
      this.HorizontalViewSensitivity,
    );
  }
  SetVerticalViewSensitivity(e) {
    this.VerticalViewSensitivity = e;
  }
  ApplyVerticalViewSensitivity() {
    ModelManager_1.ModelManager.CameraModel.SetCameraBasePitchSensitivity(
      this.VerticalViewSensitivity,
    );
  }
  SetAimHorizontalViewSensitivity(e) {
    this.AimHorizontalViewSensitivity = e;
  }
  ApplyAimHorizontalViewSensitivity() {
    ModelManager_1.ModelManager.CameraModel.SetCameraAimingYawSensitivity(
      this.AimHorizontalViewSensitivity,
    );
  }
  SetAimVerticalViewSensitivity(e) {
    this.AimVerticalViewSensitivity = e;
  }
  ApplyAimVerticalViewSensitivity() {
    ModelManager_1.ModelManager.CameraModel.SetCameraAimingPitchSensitivity(
      this.AimVerticalViewSensitivity,
    );
  }
  SetCameraShakeStrength(e) {
    let t = 0;
    switch (e) {
      case 0:
        t = ModelManager_1.ModelManager.MenuModel.LowShake;
        break;
      case 1:
        t = ModelManager_1.ModelManager.MenuModel.MiddleShake;
        break;
      case 2:
        t = ModelManager_1.ModelManager.MenuModel.HighShake;
    }
    this.CameraShakeStrength = t;
  }
  ApplyCameraShakeStrength() {
    ModelManager_1.ModelManager.CameraModel.SetCameraShakeModify(
      this.CameraShakeStrength,
    );
  }
  SetMobileHorizontalViewSensitivity(e) {
    this.MobileHorizontalViewSensitivity = e;
  }
  ApplyMobileHorizontalViewSensitivity() {
    ModelManager_1.ModelManager.CameraModel.SetCameraBaseYawSensitivity(
      this.MobileHorizontalViewSensitivity,
    );
  }
  SetMobileVerticalViewSensitivity(e) {
    this.MobileVerticalViewSensitivity = e;
  }
  ApplyMobileVerticalViewSensitivity() {
    ModelManager_1.ModelManager.CameraModel.SetCameraBasePitchSensitivity(
      this.MobileVerticalViewSensitivity,
    );
  }
  SetMobileAimHorizontalViewSensitivity(e) {
    this.MobileAimHorizontalViewSensitivity = e;
  }
  ApplyMobileAimHorizontalViewSensitivity() {
    ModelManager_1.ModelManager.CameraModel.SetCameraAimingYawSensitivity(
      this.MobileAimHorizontalViewSensitivity,
    );
  }
  SetMobileAimVerticalViewSensitivity(e) {
    this.MobileAimVerticalViewSensitivity = e;
  }
  ApplyMobileAimVerticalViewSensitivity() {
    ModelManager_1.ModelManager.CameraModel.SetCameraAimingPitchSensitivity(
      this.MobileAimVerticalViewSensitivity,
    );
  }
  SetMobileCameraShakeStrength(e) {
    this.MobileCameraShakeStrength = e;
  }
  ApplyMobileCameraShakeStrength() {
    ModelManager_1.ModelManager.CameraModel.SetCameraShakeModify(
      this.MobileCameraShakeStrength,
    );
  }
  SetCommonSpringArmLength(e) {
    this.CommonSpringArmLength = e;
  }
  ApplyCommonSprintArmLength() {
    ModelManager_1.ModelManager.CameraModel.CameraSettingNormalAdditionArmLength =
      this.CommonSpringArmLength;
  }
  SetFightSpringArmLength(e) {
    this.FightSpringArmLength = e;
  }
  ApplyFightSpringArmLength() {
    ModelManager_1.ModelManager.CameraModel.CameraSettingFightAdditionArmLength =
      this.FightSpringArmLength;
  }
  SetResetFocusEnable(e) {
    this.IsResetFocusEnable = e;
  }
  ApplyResetFocusEnable() {
    ModelManager_1.ModelManager.CameraModel.IsEnableResetFocus =
      1 === this.IsResetFocusEnable;
  }
  SetIsSidestepCameraEnable(e) {
    this.IsSidestepCameraEnable = e;
  }
  ApplyIsSidestepCameraEnable() {
    ModelManager_1.ModelManager.CameraModel.IsEnableSidestepCamera =
      1 === this.IsSidestepCameraEnable;
  }
  SetIsSoftLockCameraEnable(e) {
    this.IsSoftLockCameraEnable = e;
  }
  ApplyIsSoftLockCameraEnable() {
    ModelManager_1.ModelManager.CameraModel.IsEnableSoftLockCamera =
      1 === this.IsSoftLockCameraEnable;
  }
  SetJoystickShakeStrength(e) {
    this.JoystickShakeStrength = e;
  }
  SetJoystickShakeType(e) {
    this.JoystickShakeType = e;
  }
  ApplyJoystickShake() {
    UE.BasePlayerController.SetKuroForceFeedbackConfig(
      this.JoystickShakeType,
      this.JoystickShakeStrength,
    );
  }
  SetWalkOrRunRate(e) {
    this.WalkOrRunRate = e;
  }
  ApplyWalkOrRunRate() {
    RoleGaitStatic_1.RoleGaitStatic.SetWalkOrRunRateForRocker(
      this.WalkOrRunRate,
    );
  }
  SetJoystickMode(e) {
    this.JoystickMode = e;
  }
  ApplyJoystickMode() {
    ModelManager_1.ModelManager.BattleUiModel.SetIsDynamicJoystick(
      1 === this.JoystickMode,
    );
  }
  SetAutoSwitchSkillButtonMode(e) {
    this.IsAutoSwitchSkillButtonMode = e;
  }
  ApplyAutoSwitchSkillButtonMode() {
    ModelManager_1.ModelManager.BattleUiModel.SetIsAutoSwitchSkillButtonMode(
      0 === this.IsAutoSwitchSkillButtonMode,
    );
  }
  SetAimAssistEnable(e) {
    this.AimAssistEnable = e;
  }
  ApplyAimAssistEnable() {
    ModelManager_1.ModelManager.CameraModel?.SetAimAssistEnable(
      1 === this.AimAssistEnable,
    );
  }
  SetKeyboardLockEnemyMode(e) {
    this.KeyboardLockEnemyMode = e;
  }
  ApplyKeyboardLockEnemyMode() {
    FormationDataController_1.FormationDataController.SetKeyboardLockEnemyMode(
      this.KeyboardLockEnemyMode,
    );
  }
  SetHorizontalViewRevert(e) {
    this.HorizontalViewRevert = e;
  }
  ApplyHorizontalViewRevert() {
    var e,
      t =
        ConfigManager_1.ConfigManager.MenuBaseConfig?.GetAxisRevertConfigListByRevertType(
          0,
        );
    t && ((e = 1 === this.HorizontalViewRevert), this.mea(e, t));
  }
  SetVerticalViewRevert(e) {
    this.VerticalViewRevert = e;
  }
  ApplyVerticalViewRevert() {
    var e,
      t =
        ConfigManager_1.ConfigManager.MenuBaseConfig?.GetAxisRevertConfigListByRevertType(
          1,
        );
    t && ((e = 1 === this.VerticalViewRevert), this.mea(e, t));
  }
  mea(t, e) {
    for (const h of e) {
      var i = h.AxisName,
        i = InputSettingsManager_1.InputSettingsManager.GetAxisBinding(i);
      if (i) {
        var a = new Map(),
          o = h.RevertInfo,
          r = i.GetInputAxisKeyMap();
        if (r) {
          for (var [l, s] of o) {
            var n = r.get(l);
            if (n) {
              let e = 0;
              n = n.Scale;
              0 === s && (e = t ? (0 < n ? -n : n) : 0 < n ? n : -n),
                1 === s && (e = t ? (0 < n ? n : -n) : 0 < n ? -n : n),
                a.set(l, e);
            }
          }
          if (a.size <= 0) return;
          i.SetKeys(a);
        }
      }
    }
  }
  SetSkillLockEnemyMode(e) {
    this.SkillLockEnemyMode = e;
  }
  SetGamepadLockEnemyMode(e) {
    this.GamepadLockEnemyMode = e;
  }
  ApplyGamepadLockEnemyMode() {
    FormationDataController_1.FormationDataController.SetGamepadLockEnemyMode(
      this.GamepadLockEnemyMode,
    );
  }
  SetEnemyHitDisplayMode(e) {
    this.EnemyHitDisplayMode = e;
  }
  ApplyEnemyHitDisplayMode() {
    ModelManager_1.ModelManager.BulletModel.OpenHitMaterial =
      1 === this.EnemyHitDisplayMode;
  }
  Load(e) {
    this.Eve = this.LoadFromLocal(
      LocalStorageDefine_1.ELocalStorageGlobalKey.GameQualityLevel,
    );
    var t = this.LoadFromLocal(
        LocalStorageDefine_1.ELocalStorageGlobalKey.CustomFrameRate,
        this.wga(
          LocalStorageDefine_1.ELocalStorageGlobalKey.CustomFrameRate,
          30,
        ),
      ),
      t =
        (this.SetFrameRate(t),
        (this.ShadowQuality = this.LoadFromLocal(
          LocalStorageDefine_1.ELocalStorageGlobalKey.ShadowQuality,
          this.wga(
            LocalStorageDefine_1.ELocalStorageGlobalKey.ShadowQuality,
            2,
          ),
        )),
        (this.NiagaraQuality = this.LoadFromLocal(
          LocalStorageDefine_1.ELocalStorageGlobalKey.NiagaraQuality,
          this.wga(
            LocalStorageDefine_1.ELocalStorageGlobalKey.NiagaraQuality,
            1,
          ),
        )),
        (this.ImageDetail = this.LoadFromLocal(
          LocalStorageDefine_1.ELocalStorageGlobalKey.ImageDetail,
          this.wga(LocalStorageDefine_1.ELocalStorageGlobalKey.ImageDetail, 2),
        )),
        (this.AntiAliasing = this.LoadFromLocal(
          LocalStorageDefine_1.ELocalStorageGlobalKey.AntiAliasing,
          this.wga(LocalStorageDefine_1.ELocalStorageGlobalKey.AntiAliasing, 1),
        )),
        (this.SceneAo = this.LoadFromLocal(
          LocalStorageDefine_1.ELocalStorageGlobalKey.SceneAo,
          this.wga(LocalStorageDefine_1.ELocalStorageGlobalKey.SceneAo, 1),
        )),
        (this.VolumeFog = this.LoadFromLocal(
          LocalStorageDefine_1.ELocalStorageGlobalKey.VolumeFog,
          this.wga(LocalStorageDefine_1.ELocalStorageGlobalKey.VolumeFog, 1),
        )),
        (this.VolumeLight = this.LoadFromLocal(
          LocalStorageDefine_1.ELocalStorageGlobalKey.VolumeLight,
          this.wga(LocalStorageDefine_1.ELocalStorageGlobalKey.VolumeLight, 1),
        )),
        (this.MotionBlur = this.LoadFromLocal(
          LocalStorageDefine_1.ELocalStorageGlobalKey.MotionBlur,
          this.wga(LocalStorageDefine_1.ELocalStorageGlobalKey.MotionBlur, 1),
        )),
        (this.StreamLevel = this.LoadFromLocal(
          LocalStorageDefine_1.ELocalStorageGlobalKey.StreamLevel,
          this.wga(LocalStorageDefine_1.ELocalStorageGlobalKey.StreamLevel, 1),
        )),
        (this.PcVsync = this.LoadFromLocal(
          LocalStorageDefine_1.ELocalStorageGlobalKey.PcVsync,
          this.wga(LocalStorageDefine_1.ELocalStorageGlobalKey.PcVsync, 0),
        )),
        (this.MobileResolution = this.LoadFromLocal(
          LocalStorageDefine_1.ELocalStorageGlobalKey.MobileResolution,
          this.wga(
            LocalStorageDefine_1.ELocalStorageGlobalKey.MobileResolution,
            0.85,
          ),
        )),
        (this.SuperResolution = this.LoadFromLocal(
          LocalStorageDefine_1.ELocalStorageGlobalKey.SuperResolution,
          this.wga(
            LocalStorageDefine_1.ELocalStorageGlobalKey.SuperResolution,
            2,
          ),
        )),
        this.LoadFromLocal(
          LocalStorageDefine_1.ELocalStorageGlobalKey.PcResolutionWidth,
          this.wga(
            LocalStorageDefine_1.ELocalStorageGlobalKey.PcResolutionWidth,
            e?.X,
          ),
        )),
      e = this.LoadFromLocal(
        LocalStorageDefine_1.ELocalStorageGlobalKey.PcResolutionHeight,
        this.wga(
          LocalStorageDefine_1.ELocalStorageGlobalKey.PcResolutionHeight,
          e?.Y,
        ),
      );
    (this.PcScreenResolution = new UE.IntPoint(t, e)),
      (this.PcFullScreenMode = this.LoadFromLocal(
        LocalStorageDefine_1.ELocalStorageGlobalKey.PcWindowMode,
        this.wga(LocalStorageDefine_1.ELocalStorageGlobalKey.PcWindowMode, 1),
      )),
      (this.Brightness = this.LoadFromLocal(
        LocalStorageDefine_1.ELocalStorageGlobalKey.Brightness,
        this.wga(LocalStorageDefine_1.ELocalStorageGlobalKey.Brightness, 0),
      )),
      (this.NvidiaSuperSamplingEnable = this.LoadFromLocal(
        LocalStorageDefine_1.ELocalStorageGlobalKey.NvidiaSuperSamplingEnable,
        this.wga(
          LocalStorageDefine_1.ELocalStorageGlobalKey.NvidiaSuperSamplingEnable,
          GameQualitySettingsManager_1.GameQualitySettingsManager.IsDlssGpuDevice()
            ? 1
            : 0,
        ),
      )),
      (this.NvidiaSuperSamplingFrameGenerate = this.LoadFromLocal(
        LocalStorageDefine_1.ELocalStorageGlobalKey
          .NvidiaSuperSamplingFrameGenerate,
        this.wga(
          LocalStorageDefine_1.ELocalStorageGlobalKey
            .NvidiaSuperSamplingFrameGenerate,
          1,
        ),
      )),
      (this.NvidiaSuperSamplingMode = this.LoadFromLocal(
        LocalStorageDefine_1.ELocalStorageGlobalKey.NvidiaSuperSamplingMode,
        this.wga(
          LocalStorageDefine_1.ELocalStorageGlobalKey.NvidiaSuperSamplingMode,
          1,
        ),
      )),
      (this.NvidiaSuperSamplingSharpness = this.LoadFromLocal(
        LocalStorageDefine_1.ELocalStorageGlobalKey
          .NvidiaSuperSamplingSharpness,
        this.wga(
          LocalStorageDefine_1.ELocalStorageGlobalKey
            .NvidiaSuperSamplingSharpness,
          0,
        ),
      )),
      (this.NvidiaReflex = this.LoadFromLocal(
        LocalStorageDefine_1.ELocalStorageGlobalKey.NvidiaReflex,
        this.wga(LocalStorageDefine_1.ELocalStorageGlobalKey.NvidiaReflex, 1),
      )),
      (this.FsrEnable = this.LoadFromLocal(
        LocalStorageDefine_1.ELocalStorageGlobalKey.FsrEnable,
        this.wga(
          LocalStorageDefine_1.ELocalStorageGlobalKey.FsrEnable,
          GameQualitySettingsManager_1.GameQualitySettingsManager.IsDlssGpuDevice()
            ? 0
            : 1,
        ),
      )),
      (this.HorizontalViewSensitivity = this.LoadFromLocal(
        LocalStorageDefine_1.ELocalStorageGlobalKey.HorizontalViewSensitivity,
        this.wga(
          LocalStorageDefine_1.ELocalStorageGlobalKey.HorizontalViewSensitivity,
          1,
        ),
      )),
      (this.VerticalViewSensitivity = this.LoadFromLocal(
        LocalStorageDefine_1.ELocalStorageGlobalKey.VerticalViewSensitivity,
        this.wga(
          LocalStorageDefine_1.ELocalStorageGlobalKey.VerticalViewSensitivity,
          1,
        ),
      )),
      (this.AimHorizontalViewSensitivity = this.LoadFromLocal(
        LocalStorageDefine_1.ELocalStorageGlobalKey
          .AimHorizontalViewSensitivity,
        this.wga(
          LocalStorageDefine_1.ELocalStorageGlobalKey
            .AimHorizontalViewSensitivity,
          1,
        ),
      )),
      (this.AimVerticalViewSensitivity = this.LoadFromLocal(
        LocalStorageDefine_1.ELocalStorageGlobalKey.AimVerticalViewSensitivity,
        this.wga(
          LocalStorageDefine_1.ELocalStorageGlobalKey
            .AimVerticalViewSensitivity,
          1,
        ),
      )),
      (this.CameraShakeStrength = this.LoadFromLocal(
        LocalStorageDefine_1.ELocalStorageGlobalKey.CameraShakeStrength,
        this.wga(
          LocalStorageDefine_1.ELocalStorageGlobalKey.CameraShakeStrength,
          1,
        ),
      )),
      (this.MobileHorizontalViewSensitivity = this.LoadFromLocal(
        LocalStorageDefine_1.ELocalStorageGlobalKey
          .MobileHorizontalViewSensitivity,
        this.wga(
          LocalStorageDefine_1.ELocalStorageGlobalKey
            .MobileHorizontalViewSensitivity,
          1,
        ),
      )),
      (this.MobileVerticalViewSensitivity = this.LoadFromLocal(
        LocalStorageDefine_1.ELocalStorageGlobalKey
          .MobileVerticalViewSensitivity,
        this.wga(
          LocalStorageDefine_1.ELocalStorageGlobalKey
            .MobileVerticalViewSensitivity,
          1,
        ),
      )),
      (this.MobileAimHorizontalViewSensitivity = this.LoadFromLocal(
        LocalStorageDefine_1.ELocalStorageGlobalKey
          .MobileAimHorizontalViewSensitivity,
        this.wga(
          LocalStorageDefine_1.ELocalStorageGlobalKey
            .MobileAimHorizontalViewSensitivity,
          1,
        ),
      )),
      (this.MobileAimVerticalViewSensitivity = this.LoadFromLocal(
        LocalStorageDefine_1.ELocalStorageGlobalKey
          .MobileAimVerticalViewSensitivity,
        this.wga(
          LocalStorageDefine_1.ELocalStorageGlobalKey
            .MobileAimVerticalViewSensitivity,
          1,
        ),
      )),
      (this.MobileCameraShakeStrength = this.LoadFromLocal(
        LocalStorageDefine_1.ELocalStorageGlobalKey.MobileCameraShakeStrength,
        this.wga(
          LocalStorageDefine_1.ELocalStorageGlobalKey.MobileCameraShakeStrength,
          1,
        ),
      )),
      (this.CommonSpringArmLength = this.LoadFromLocal(
        LocalStorageDefine_1.ELocalStorageGlobalKey.CommonSpringArmLength,
        this.wga(
          LocalStorageDefine_1.ELocalStorageGlobalKey.CommonSpringArmLength,
          0,
        ),
      )),
      (this.FightSpringArmLength = this.LoadFromLocal(
        LocalStorageDefine_1.ELocalStorageGlobalKey.FightSpringArmLength,
        this.wga(
          LocalStorageDefine_1.ELocalStorageGlobalKey.FightSpringArmLength,
          0,
        ),
      )),
      (this.IsResetFocusEnable = this.LoadFromLocal(
        LocalStorageDefine_1.ELocalStorageGlobalKey.IsResetFocusEnable,
        this.wga(
          LocalStorageDefine_1.ELocalStorageGlobalKey.IsResetFocusEnable,
          1,
        ),
      )),
      (this.IsSidestepCameraEnable = this.LoadFromLocal(
        LocalStorageDefine_1.ELocalStorageGlobalKey.IsSidestepCameraEnable,
        this.wga(
          LocalStorageDefine_1.ELocalStorageGlobalKey.IsSidestepCameraEnable,
          1,
        ),
      )),
      (this.IsSoftLockCameraEnable = this.LoadFromLocal(
        LocalStorageDefine_1.ELocalStorageGlobalKey.IsSoftLockCameraEnable,
        this.wga(
          LocalStorageDefine_1.ELocalStorageGlobalKey.IsSoftLockCameraEnable,
          1,
        ),
      )),
      (this.JoystickShakeStrength = this.LoadFromLocal(
        LocalStorageDefine_1.ELocalStorageGlobalKey.JoystickShakeStrength,
        this.wga(
          LocalStorageDefine_1.ELocalStorageGlobalKey.JoystickShakeStrength,
          50,
        ),
      )),
      (this.JoystickShakeType = this.LoadFromLocal(
        LocalStorageDefine_1.ELocalStorageGlobalKey.JoystickShakeType,
        this.wga(
          LocalStorageDefine_1.ELocalStorageGlobalKey.JoystickShakeType,
          0,
        ),
      )),
      (this.WalkOrRunRate = this.LoadFromLocal(
        LocalStorageDefine_1.ELocalStorageGlobalKey.WalkOrRunRate,
        this.wga(
          LocalStorageDefine_1.ELocalStorageGlobalKey.WalkOrRunRate,
          0.3,
        ),
      )),
      (this.JoystickMode = this.LoadFromLocal(
        LocalStorageDefine_1.ELocalStorageGlobalKey.JoystickMode,
        this.wga(LocalStorageDefine_1.ELocalStorageGlobalKey.JoystickMode, 0),
      )),
      (this.IsAutoSwitchSkillButtonMode = this.LoadFromLocal(
        LocalStorageDefine_1.ELocalStorageGlobalKey.IsAutoSwitchSkillButtonMode,
        this.wga(
          LocalStorageDefine_1.ELocalStorageGlobalKey
            .IsAutoSwitchSkillButtonMode,
          0,
        ),
      )),
      (this.AimAssistEnable = this.LoadFromLocal(
        LocalStorageDefine_1.ELocalStorageGlobalKey.AimAssistEnable,
        this.wga(
          LocalStorageDefine_1.ELocalStorageGlobalKey.AimAssistEnable,
          0,
        ),
      )),
      (this.XessEnable = this.LoadFromLocal(
        LocalStorageDefine_1.ELocalStorageGlobalKey.XessEnable,
        this.wga(LocalStorageDefine_1.ELocalStorageGlobalKey.XessEnable, 1),
      )),
      (this.XessQuality = this.LoadFromLocal(
        LocalStorageDefine_1.ELocalStorageGlobalKey.XessQuality,
        this.wga(LocalStorageDefine_1.ELocalStorageGlobalKey.XessQuality, 1),
      )),
      (this.MetalFxEnable = this.LoadFromLocal(
        LocalStorageDefine_1.ELocalStorageGlobalKey.MetalFxEnable,
        this.wga(LocalStorageDefine_1.ELocalStorageGlobalKey.MetalFxEnable, 1),
      )),
      (this.IrxEnable = this.LoadFromLocal(
        LocalStorageDefine_1.ELocalStorageGlobalKey.IrxEnable,
        this.wga(LocalStorageDefine_1.ELocalStorageGlobalKey.IrxEnable, 1),
      )),
      (this.BloomEnable = this.LoadFromLocal(
        LocalStorageDefine_1.ELocalStorageGlobalKey.BloomEnable,
        this.wga(LocalStorageDefine_1.ELocalStorageGlobalKey.BloomEnable, 1),
      )),
      (this.NpcDensity = this.LoadFromLocal(
        LocalStorageDefine_1.ELocalStorageGlobalKey.NpcDensity,
        this.wga(LocalStorageDefine_1.ELocalStorageGlobalKey.NpcDensity, 0),
      )),
      (this.KeyboardLockEnemyMode = this.LoadFromLocal(
        LocalStorageDefine_1.ELocalStorageGlobalKey.KeyboardLockEnemyMode,
        this.wga(
          LocalStorageDefine_1.ELocalStorageGlobalKey.KeyboardLockEnemyMode,
          0,
        ),
      )),
      (this.HorizontalViewRevert = this.LoadFromLocal(
        LocalStorageDefine_1.ELocalStorageGlobalKey.HorizontalViewRevert,
        this.wga(
          LocalStorageDefine_1.ELocalStorageGlobalKey.HorizontalViewRevert,
          0,
        ),
      )),
      (this.VerticalViewRevert = this.LoadFromLocal(
        LocalStorageDefine_1.ELocalStorageGlobalKey.VerticalViewRevert,
        this.wga(
          LocalStorageDefine_1.ELocalStorageGlobalKey.VerticalViewRevert,
          0,
        ),
      )),
      (this.SkillLockEnemyMode = this.LoadFromLocal(
        LocalStorageDefine_1.ELocalStorageGlobalKey.SkillLockEnemyMode,
        this.wga(
          LocalStorageDefine_1.ELocalStorageGlobalKey.SkillLockEnemyMode,
          0,
        ),
      )),
      (this.GamepadLockEnemyMode = this.LoadFromLocal(
        LocalStorageDefine_1.ELocalStorageGlobalKey.GamepadLockEnemyMode,
        this.wga(
          LocalStorageDefine_1.ELocalStorageGlobalKey.GamepadLockEnemyMode,
          0,
        ),
      )),
      (this.EnemyHitDisplayMode = this.LoadFromLocal(
        LocalStorageDefine_1.ELocalStorageGlobalKey.EnemyHitDisplayMode,
        this.wga(
          LocalStorageDefine_1.ELocalStorageGlobalKey.EnemyHitDisplayMode,
          0,
        ),
      )),
      this.Okn();
  }
  Save() {
    this.SaveByKey(
      LocalStorageDefine_1.ELocalStorageGlobalKey.GameQualityLevel,
    ),
      this.SaveByKey(
        LocalStorageDefine_1.ELocalStorageGlobalKey.CustomFrameRate,
      ),
      this.SaveByKey(LocalStorageDefine_1.ELocalStorageGlobalKey.ShadowQuality),
      this.SaveByKey(
        LocalStorageDefine_1.ELocalStorageGlobalKey.NiagaraQuality,
      ),
      this.SaveByKey(LocalStorageDefine_1.ELocalStorageGlobalKey.ImageDetail),
      this.SaveByKey(LocalStorageDefine_1.ELocalStorageGlobalKey.AntiAliasing),
      this.SaveByKey(LocalStorageDefine_1.ELocalStorageGlobalKey.SceneAo),
      this.SaveByKey(LocalStorageDefine_1.ELocalStorageGlobalKey.VolumeFog),
      this.SaveByKey(LocalStorageDefine_1.ELocalStorageGlobalKey.VolumeLight),
      this.SaveByKey(LocalStorageDefine_1.ELocalStorageGlobalKey.MotionBlur),
      this.SaveByKey(LocalStorageDefine_1.ELocalStorageGlobalKey.StreamLevel),
      this.SaveByKey(LocalStorageDefine_1.ELocalStorageGlobalKey.PcVsync),
      this.SaveByKey(
        LocalStorageDefine_1.ELocalStorageGlobalKey.MobileResolution,
      ),
      this.SaveByKey(
        LocalStorageDefine_1.ELocalStorageGlobalKey.SuperResolution,
      ),
      this.SaveByKey(
        LocalStorageDefine_1.ELocalStorageGlobalKey.PcResolutionWidth,
      ),
      this.SaveByKey(
        LocalStorageDefine_1.ELocalStorageGlobalKey.PcResolutionHeight,
      ),
      this.SaveByKey(LocalStorageDefine_1.ELocalStorageGlobalKey.PcWindowMode),
      this.SaveByKey(LocalStorageDefine_1.ELocalStorageGlobalKey.Brightness),
      this.SaveByKey(
        LocalStorageDefine_1.ELocalStorageGlobalKey.NvidiaSuperSamplingEnable,
      ),
      this.SaveByKey(
        LocalStorageDefine_1.ELocalStorageGlobalKey
          .NvidiaSuperSamplingFrameGenerate,
      ),
      this.SaveByKey(
        LocalStorageDefine_1.ELocalStorageGlobalKey.NvidiaSuperSamplingMode,
      ),
      this.SaveByKey(
        LocalStorageDefine_1.ELocalStorageGlobalKey
          .NvidiaSuperSamplingSharpness,
      ),
      this.SaveByKey(LocalStorageDefine_1.ELocalStorageGlobalKey.NvidiaReflex),
      this.SaveByKey(LocalStorageDefine_1.ELocalStorageGlobalKey.FsrEnable),
      this.SaveByKey(
        LocalStorageDefine_1.ELocalStorageGlobalKey.HorizontalViewSensitivity,
      ),
      this.SaveByKey(
        LocalStorageDefine_1.ELocalStorageGlobalKey.VerticalViewSensitivity,
      ),
      this.SaveByKey(
        LocalStorageDefine_1.ELocalStorageGlobalKey
          .AimHorizontalViewSensitivity,
      ),
      this.SaveByKey(
        LocalStorageDefine_1.ELocalStorageGlobalKey.AimVerticalViewSensitivity,
      ),
      this.SaveByKey(
        LocalStorageDefine_1.ELocalStorageGlobalKey.CameraShakeStrength,
      ),
      this.SaveByKey(
        LocalStorageDefine_1.ELocalStorageGlobalKey
          .MobileHorizontalViewSensitivity,
      ),
      this.SaveByKey(
        LocalStorageDefine_1.ELocalStorageGlobalKey
          .MobileVerticalViewSensitivity,
      ),
      this.SaveByKey(
        LocalStorageDefine_1.ELocalStorageGlobalKey
          .MobileAimHorizontalViewSensitivity,
      ),
      this.SaveByKey(
        LocalStorageDefine_1.ELocalStorageGlobalKey
          .MobileAimVerticalViewSensitivity,
      ),
      this.SaveByKey(
        LocalStorageDefine_1.ELocalStorageGlobalKey.MobileCameraShakeStrength,
      ),
      this.SaveByKey(
        LocalStorageDefine_1.ELocalStorageGlobalKey.CommonSpringArmLength,
      ),
      this.SaveByKey(
        LocalStorageDefine_1.ELocalStorageGlobalKey.FightSpringArmLength,
      ),
      this.SaveByKey(
        LocalStorageDefine_1.ELocalStorageGlobalKey.IsResetFocusEnable,
      ),
      this.SaveByKey(
        LocalStorageDefine_1.ELocalStorageGlobalKey.IsSidestepCameraEnable,
      ),
      this.SaveByKey(
        LocalStorageDefine_1.ELocalStorageGlobalKey.IsSoftLockCameraEnable,
      ),
      this.SaveByKey(
        LocalStorageDefine_1.ELocalStorageGlobalKey.JoystickShakeType,
      ),
      this.SaveByKey(
        LocalStorageDefine_1.ELocalStorageGlobalKey.JoystickShakeStrength,
      ),
      this.SaveByKey(LocalStorageDefine_1.ELocalStorageGlobalKey.WalkOrRunRate),
      this.SaveByKey(LocalStorageDefine_1.ELocalStorageGlobalKey.JoystickMode),
      this.SaveByKey(
        LocalStorageDefine_1.ELocalStorageGlobalKey.IsAutoSwitchSkillButtonMode,
      ),
      this.SaveByKey(
        LocalStorageDefine_1.ELocalStorageGlobalKey.AimAssistEnable,
      ),
      this.SaveByKey(LocalStorageDefine_1.ELocalStorageGlobalKey.XessEnable),
      this.SaveByKey(LocalStorageDefine_1.ELocalStorageGlobalKey.XessQuality),
      this.SaveByKey(LocalStorageDefine_1.ELocalStorageGlobalKey.MetalFxEnable),
      this.SaveByKey(LocalStorageDefine_1.ELocalStorageGlobalKey.IrxEnable),
      this.SaveByKey(LocalStorageDefine_1.ELocalStorageGlobalKey.BloomEnable),
      this.SaveByKey(LocalStorageDefine_1.ELocalStorageGlobalKey.NpcDensity),
      this.SaveByKey(
        LocalStorageDefine_1.ELocalStorageGlobalKey.KeyboardLockEnemyMode,
      ),
      this.SaveByKey(
        LocalStorageDefine_1.ELocalStorageGlobalKey.HorizontalViewRevert,
      ),
      this.SaveByKey(
        LocalStorageDefine_1.ELocalStorageGlobalKey.VerticalViewRevert,
      ),
      this.SaveByKey(
        LocalStorageDefine_1.ELocalStorageGlobalKey.SkillLockEnemyMode,
      ),
      this.SaveByKey(
        LocalStorageDefine_1.ELocalStorageGlobalKey.GamepadLockEnemyMode,
      ),
      this.SaveByKey(
        LocalStorageDefine_1.ELocalStorageGlobalKey.EnemyHitDisplayMode,
      );
  }
  GetDataByStorageKey(e) {
    return this.Gkn.get(e);
  }
  LoadFromLocal(e, t) {
    return LocalStorage_1.LocalStorage.GetGlobal(e, t ?? 0);
  }
  SaveToLocal(e, t) {
    void 0 === t
      ? LocalStorage_1.LocalStorage.DeleteGlobal(e)
      : LocalStorage_1.LocalStorage.SetGlobal(e, t);
  }
  SaveByKey(e) {
    var t = this.GetDataByStorageKey(e);
    this.SaveToLocal(e, t);
  }
}
((exports.GameQualityInfo = GameQualityInfo).Dve = [124, 138, 146, 152]),
  (GameQualityInfo.Lve = [0.49, 0.64, 0.7225, 1]),
  (GameQualityInfo.Rve = [0, 6, 10, 12]),
  (GameQualityInfo.Uve = [0, 4]),
  (GameQualityInfo.Ave = [0, 3, 6]),
  (GameQualityInfo.Pve = [0, 6]),
  (GameQualityInfo.xve = [0, 10]),
  (GameQualityInfo.wve = [0, 10]),
  (GameQualityInfo.Bve = [0, 2]),
  (GameQualityInfo.bve = [0, 6]),
  (GameQualityInfo.qve = [0, 10]);
//# sourceMappingURL=GameQualityInfo.js.map
