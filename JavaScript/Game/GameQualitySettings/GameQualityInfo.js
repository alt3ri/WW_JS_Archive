"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameQualityInfo = void 0);
const UE = require("ue"),
  Log_1 = require("../../Core/Common/Log"),
  MathUtils_1 = require("../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../Common/Event/EventDefine"),
  EventSystem_1 = require("../Common/Event/EventSystem"),
  GlobalData_1 = require("../GlobalData"),
  InputSettingsManager_1 = require("../InputSettings/InputSettingsManager"),
  ConfigManager_1 = require("../Manager/ConfigManager"),
  ControllerHolder_1 = require("../Manager/ControllerHolder"),
  ModelManager_1 = require("../Manager/ModelManager"),
  RoleGaitStatic_1 = require("../NewWorld/Character/Role/Component/Define/RoleGaitStatic"),
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
    (this.PcScreenResolution = void 0),
      (this.PcFullScreenMode = 1),
      (this.Brightness = 0),
      (this.ShadowQuality = 0),
      (this.NiagaraQuality = 0),
      (this.ImageDetail = 0),
      (this.AntiAliasing = 0),
      (this.SceneAo = 0),
      (this.VolumeFog = 0),
      (this.VolumeLight = 0),
      (this.MotionBlur = 0),
      (this.StreamLevel = 1),
      (this.PcVsync = 0),
      (this.MobileResolution = 0),
      (this.SuperResolution = 0),
      (this.NvidiaSuperSamplingEnable = 0),
      (this.NvidiaSuperSamplingFrameGenerate = 0),
      (this.NvidiaSuperSamplingMode = 0),
      (this.NvidiaSuperSamplingSharpness = 0),
      (this.NvidiaReflex = 0),
      (this.FsrEnable = 0),
      (this.XessEnable = 0),
      (this.XessQuality = 0),
      (this.MetalFxEnable = 0),
      (this.IrxEnable = 0),
      (this.BloomEnable = 0),
      (this.NpcDensity = 0),
      (this.HorizontalViewSensitivity = 0),
      (this.VerticalViewSensitivity = 0),
      (this.AimHorizontalViewSensitivity = 0),
      (this.AimVerticalViewSensitivity = 0),
      (this.CameraShakeStrength = 0),
      (this.MobileHorizontalViewSensitivity = 0),
      (this.MobileVerticalViewSensitivity = 0),
      (this.MobileAimHorizontalViewSensitivity = 0),
      (this.MobileAimVerticalViewSensitivity = 0),
      (this.MobileCameraShakeStrength = 0),
      (this.CommonSpringArmLength = 0),
      (this.FightSpringArmLength = 0),
      (this.IsResetFocusEnable = 0),
      (this.IsSidestepCameraEnable = 0),
      (this.IsSoftLockCameraEnable = 0),
      (this.JoystickShakeStrength = 0),
      (this.JoystickShakeType = 0),
      (this.WalkOrRunRate = 0),
      (this.PerformanceLimitRunning = new Map()),
      (this.JoystickMode = 0),
      (this.IsAutoSwitchSkillButtonMode = 0),
      (this.AimAssistEnable = 0),
      (this.HorizontalViewRevert = 0),
      (this.VerticalViewRevert = 0),
      (this.Sve = void 0),
      (this.Eve = 0),
      (this.yve = 0),
      (this.Ive = -0),
      (this.Tve = new Set());
  }
  Initialize(
    e,
    t,
    a,
    i,
    r,
    l,
    s,
    n,
    o,
    h,
    m,
    S,
    M,
    _,
    g,
    p,
    y,
    u,
    E,
    c,
    G,
    d,
    L,
    A,
    F,
    b,
    I,
    C,
    Q,
    R,
    U,
    D,
    f,
    v,
    T,
    w,
    V,
    P,
    O,
    N,
    W,
    q,
    k,
    x,
    B,
    X,
    H,
    z,
    K,
    J,
    j,
    Y,
  ) {
    (this.Sve = e),
      this.SetFrameRate(t),
      (this.ShadowQuality = a),
      (this.NiagaraQuality = i),
      (this.ImageDetail = r),
      (this.AntiAliasing = l),
      (this.SceneAo = s),
      (this.VolumeFog = n),
      (this.VolumeLight = o),
      (this.MotionBlur = h),
      (this.StreamLevel = m),
      (this.PcVsync = S),
      (this.MobileResolution = M),
      (this.SuperResolution = _),
      (this.PcScreenResolution = g),
      (this.PcFullScreenMode = p),
      (this.Brightness = y),
      (this.NvidiaSuperSamplingEnable = u),
      (this.NvidiaSuperSamplingFrameGenerate = E),
      (this.NvidiaSuperSamplingMode = c),
      (this.NvidiaSuperSamplingSharpness = G),
      (this.NvidiaReflex = d),
      (this.FsrEnable = L),
      (this.XessEnable = A),
      (this.XessQuality = F),
      (this.MetalFxEnable = b),
      (this.IrxEnable = I),
      (this.BloomEnable = C),
      (this.NpcDensity = Q),
      (this.HorizontalViewSensitivity = R),
      (this.VerticalViewSensitivity = U),
      (this.AimHorizontalViewSensitivity = D),
      (this.AimVerticalViewSensitivity = f),
      (this.CameraShakeStrength = v),
      (this.MobileHorizontalViewSensitivity = T),
      (this.MobileVerticalViewSensitivity = w),
      (this.MobileAimHorizontalViewSensitivity = V),
      (this.MobileAimVerticalViewSensitivity = P),
      (this.MobileCameraShakeStrength = O),
      (this.CommonSpringArmLength = N),
      (this.FightSpringArmLength = W),
      (this.IsResetFocusEnable = q),
      (this.IsSidestepCameraEnable = k),
      (this.IsSoftLockCameraEnable = x),
      (this.JoystickShakeStrength = B),
      (this.JoystickShakeType = X),
      (this.WalkOrRunRate = H),
      (this.JoystickMode = z),
      (this.IsAutoSwitchSkillButtonMode = K),
      (this.AimAssistEnable = J),
      (this.HorizontalViewRevert = j),
      (this.VerticalViewRevert = Y),
      this.CancelAllPerformanceLimit();
  }
  Copy() {
    var e = new GameQualityInfo();
    return (
      e.Initialize(
        this.Sve,
        this.Eve,
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
        this.HorizontalViewRevert,
        this.VerticalViewRevert,
      ),
      e
    );
  }
  GetGameQualitySettingLevel() {
    return this.Sve;
  }
  GetQualitySettingScore() {
    var e =
      GameQualitySettingsManager_1.GameQualitySettingsManager.IsPcPlatform();
    let t = 0;
    t = e
      ? (this.PcScreenResolution.X * this.PcScreenResolution.Y) / 2073600
      : GameQualityInfo.Lve[this.MobileResolution];
    e = this.Eve / 30;
    return (
      (GameQualityInfo.Dve[this.Sve] +
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
  GetFrameRateTemporary() {
    return this.yve;
  }
  SetFrameRate(e) {
    (this.Eve = MathUtils_1.MathUtils.Clamp(e, 24, 120)),
      (this.Ive = 1 / this.Eve);
  }
  ApplyFrameRate() {
    var e = UE.GameUserSettings.GetGameUserSettings();
    let t = this.Eve;
    0 < this.yve && (t = this.yve),
      e.SetFrameRateLimit(t),
      e.ApplySettings(!0),
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
      ? 45 < this.Eve && (this.SetFrameRateTemploary(30), this.ApplyFrameRate())
      : GameQualitySettingsManager_1.GameQualitySettingsManager.IsAndroidPlatform() &&
        40 < this.Eve &&
        (this.SetFrameRateTemploary(30), this.ApplyFrameRate()),
      (GameQualitySettingsManager_1.GameQualitySettingsManager.IsIosPlatform() ||
        GameQualitySettingsManager_1.GameQualitySettingsManager.IsAndroidPlatform()) &&
        this.TryReduceCsmUpdateFrequency("Plot");
  }
  CancleSequenceFrameRateLimit() {
    this.CancelFrameRateTemploary(),
      this.ApplyFrameRate(),
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
      );
  }
  Nve() {
    UE.KismetSystemLibrary.ExecuteConsoleCommand(
      GlobalData_1.GlobalData.World,
      "r.Shadow.CSMMode3EnableUpdateIntervalOverride 0",
    );
  }
  CancelFrameRateTemploary() {
    (this.yve = 0), (this.Ive = 1 / this.Eve);
  }
  RefreshPerformanceLimit(e) {
    let a = 0,
      i = 0;
    this.PerformanceLimitRunning.forEach((e, t) => {
      e.FrameLimit && a++, e.CacheWorldFrame && i++;
    }),
      0 < a ? this.SetFrameRateTemploary(30) : this.CancelFrameRateTemploary(),
      this.ApplyFrameRate(),
      1 === i
        ? (UE.KismetSystemLibrary.ExecuteConsoleCommand(
            GlobalData_1.GlobalData.World,
            "r.Mobile.StartCacheSceneColorOptimise",
          ),
          UE.KismetSystemLibrary.ExecuteConsoleCommand(
            GlobalData_1.GlobalData.World,
            "r.Mobile.EnableCacheSceneColorOptimise 1",
          ),
          (GameQualitySettingsManager_1.GameQualitySettingsManager.InCacheSceneColorMode = 1))
        : 0 === i &&
          (UE.KismetSystemLibrary.ExecuteConsoleCommand(
            GlobalData_1.GlobalData.World,
            "r.Mobile.EnableCacheSceneColorOptimise 0",
          ),
          UE.KismetSystemLibrary.ExecuteConsoleCommand(
            GlobalData_1.GlobalData.World,
            "r.Mobile.StopCacheSceneColorOptimise",
          ),
          (GameQualitySettingsManager_1.GameQualitySettingsManager.InCacheSceneColorMode = 0)),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Game",
          48,
          "performanceControl:RefreshPerformanceLimit result",
          ["reason", e],
          ["frameLimit", a],
          ["cacheWorldFrame", i],
        );
  }
  ApplyPerformanceLimit(e) {
    var t;
    performanceLimitConfigs.has(e) &&
      !GameQualitySettingsManager_1.GameQualitySettingsManager.IsPcPlatform() &&
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
    GameQualitySettingsManager_1.GameQualitySettingsManager.IsPcPlatform() ||
      (this.PerformanceLimitRunning.delete(e) &&
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Game",
            48,
            "performanceControl:CancelPerformanceLimit",
            ["source", e],
          ),
        this.RefreshPerformanceLimit(e)));
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
    e.SetScreenResolution(this.PcScreenResolution), e.ApplySettings(!0);
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
    GameQualitySettingsManager_1.GameQualitySettingsManager.IsPcPlatform()
      ? UE.KismetSystemLibrary.ExecuteConsoleCommand(
          GlobalData_1.GlobalData.World,
          "sg.ShadowQuality " +
            (0 === this.ShadowQuality ? 1 : this.ShadowQuality),
        )
      : UE.KismetSystemLibrary.ExecuteConsoleCommand(
          GlobalData_1.GlobalData.World,
          "sg.ShadowQuality " + this.ShadowQuality,
        );
  }
  ApplyNiagaraQuality() {
    var e,
      t = UE.GameUserSettings.GetGameUserSettings();
    GameQualitySettingsManager_1.GameQualitySettingsManager.IsPcPlatform()
      ? UE.KismetSystemLibrary.ExecuteConsoleCommand(
          GlobalData_1.GlobalData.World,
          "fx.Niagara.QualityLevel " + Math.max(this.NiagaraQuality + 1, 2),
        )
      : ((e =
          3 === this.Sve &&
          GameQualitySettingsManager_1.GameQualitySettingsManager.IsIosAndAndroidHighDevice()),
        UE.KismetSystemLibrary.ExecuteConsoleCommand(
          GlobalData_1.GlobalData.World,
          "r.DisableDistortion " + (0 !== this.NiagaraQuality && e ? 0 : 1),
        ),
        UE.KismetSystemLibrary.ExecuteConsoleCommand(
          GlobalData_1.GlobalData.World,
          "fx.Niagara.QualityLevel " + Math.max(this.NiagaraQuality, 1),
        )),
      t.ApplySettings(!0);
  }
  ApplyImageDetail() {
    var e;
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
          GameQualitySettingsManager_1.GameQualitySettingsManager.IsAndroidPlatformScreenBetter()),
        UE.KismetSystemLibrary.ExecuteConsoleCommand(
          GlobalData_1.GlobalData.World,
          "r.Mobile.SceneObjMobileSSR " + (1 < this.ImageDetail && e ? 1 : 0),
        ),
        (e = 3 === this.Sve && e),
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
      );
  }
  ApplySceneAo() {
    var e;
    GameQualitySettingsManager_1.GameQualitySettingsManager.IsPcPlatform()
      ? (UE.KismetSystemLibrary.ExecuteConsoleCommand(
          GlobalData_1.GlobalData.World,
          "r.AmbientOcclusionLevels " + -this.SceneAo,
        ),
        RenderDataManager_1.RenderDataManager.Get().SetGrassAo(this.SceneAo))
      : ((e =
          GameQualitySettingsManager_1.GameQualitySettingsManager.IsIosAndAndroidHighDevice()
            ? this.SceneAo
            : 0),
        UE.KismetSystemLibrary.ExecuteConsoleCommand(
          GlobalData_1.GlobalData.World,
          "r.Mobile.SSAO " + e,
        ),
        this.ApplyMaterialParameterCollectionAO(e),
        RenderDataManager_1.RenderDataManager.Get().SetGrassAo(e));
  }
  ApplyVolumeFog() {
    GameQualitySettingsManager_1.GameQualitySettingsManager.Get().IsEnableVolumeFog() &&
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "r.volumetricfog " + this.VolumeFog,
      );
  }
  ApplyVolumeLight() {
    var e;
    GameQualitySettingsManager_1.GameQualitySettingsManager.IsPcPlatform()
      ? UE.KismetSystemLibrary.ExecuteConsoleCommand(
          GlobalData_1.GlobalData.World,
          "r.lightShaftQuality " + this.VolumeLight,
        )
      : ((e =
          GameQualitySettingsManager_1.GameQualitySettingsManager.IsIosAndAndroidHighDevice()),
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
      1 ===
        GameQualitySettingsManager_1.GameQualitySettingsManager
          .InCacheSceneColorMode &&
        UE.KismetSystemLibrary.ExecuteConsoleCommand(
          GlobalData_1.GlobalData.World,
          "r.Mobile.StartCacheSceneColorOptimise",
        );
      let e = this.GetMobileResolutionByDeviceType();
      var t = UE.KismetSystemLibrary.GetConsoleVariableFloatValue(
          "r.MobileContentScaleFactor",
        ),
        a = UE.KismetSystemLibrary.GetConsoleVariableFloatValue(
          "r.SecondaryScreenPercentage.GameViewport",
        );
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Game", 17, "分辨率参数获取", [
          "r.MobileContentScaleFactor",
          t,
        ]),
        GameQualitySettingsManager_1.GameQualitySettingsManager.Get().GetDefaultScreenResolution()
          .Y < 750 &&
          a < 70 &&
          (e = Math.min(1.5 * e, 100)),
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
      GameQualitySettingsManager_1.GameQualitySettingsManager.IsDlssGpuDevice() &&
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
        this.ApplyPcVsync());
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
      UE.DLSSLibrary.SetDLSSMode(this.NvidiaSuperSamplingMode);
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
          ? UE.KismetSystemLibrary.ExecuteConsoleCommand(
              GlobalData_1.GlobalData.World,
              "r.FidelityFX.FSR.PrimaryUpscale 1",
            )
          : UE.KismetSystemLibrary.ExecuteConsoleCommand(
              GlobalData_1.GlobalData.World,
              "r.FidelityFX.FSR.PrimaryUpscale 0",
            ));
  }
  ApplyXessEnable() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Game", 41, "ApplyXessEnable", [
        "XessEnable",
        this.XessEnable,
      ]);
  }
  ApplyXessQuality() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Game", 41, "ApplyXessQuality", [
        "XessQuality",
        this.XessQuality,
      ]);
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
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Game", 41, "ApplyIrxEnable", [
        "IrxEnable",
        this.IrxEnable,
      ]);
  }
  ApplyBloomEnable() {
    UE.KismetSystemLibrary.ExecuteConsoleCommand(
      GlobalData_1.GlobalData.World,
      "r.Kuro.KuroBloomEnable " + this.BloomEnable,
    );
  }
  ApplyNpcDensity() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Game", 41, "ApplyNpcDensity", [
        "NpcDensity",
        this.NpcDensity,
      ]),
      ControllerHolder_1.ControllerHolder.CreatureController.RefreshDensityLevel();
  }
  GetFrameRate() {
    return this.Eve;
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
  SetHorizontalViewRevert(e) {
    this.HorizontalViewRevert = e;
  }
  ApplyHorizontalViewRevert() {
    var e,
      t =
        ConfigManager_1.ConfigManager.MenuBaseConfig?.GetAxisRevertConfigListByRevertType(
          0,
        );
    t && ((e = 1 === this.HorizontalViewRevert), this.b9s(e, t));
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
    t && ((e = 1 === this.VerticalViewRevert), this.b9s(e, t));
  }
  b9s(t, e) {
    for (const h of e) {
      var a = h.AxisName,
        a = InputSettingsManager_1.InputSettingsManager.GetAxisBinding(a);
      if (a) {
        var i = new Map(),
          r = h.RevertInfo,
          l = a.GetInputAxisKeyMap();
        if (l) {
          for (var [s, n] of r) {
            var o = l.get(s);
            if (o) {
              let e = 0;
              o = o.Scale;
              0 === n && (e = t ? (0 < o ? -o : o) : 0 < o ? o : -o),
                1 === n && (e = t ? (0 < o ? o : -o) : 0 < o ? -o : o),
                i.set(s, e);
            }
          }
          if (i.size <= 0) return;
          a.SetKeys(i);
        }
      }
    }
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
