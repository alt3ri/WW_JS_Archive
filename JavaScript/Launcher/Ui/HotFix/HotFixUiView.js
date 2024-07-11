"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HotFixUiView = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  BaseConfigController_1 = require("../../BaseConfig/BaseConfigController"),
  LauncherLanguageLib_1 = require("../../Util/LauncherLanguageLib"),
  LauncherResourceLib_1 = require("../../Util/LauncherResourceLib"),
  LaunchComponentsAction_1 = require("../LaunchComponentsAction"),
  LaunchUtil_1 = require("../LaunchUtil"),
  SdkProtocolView_1 = require("../SdkView/SdkProtocolView"),
  HotFixManager_1 = require("./HotFixManager"),
  HotFixPopupRepairView_1 = require("./HotFixPopupRepairView"),
  HotFixPopupUiView_1 = require("./HotFixPopupUiView");
class HotFixUiView extends LaunchComponentsAction_1.LaunchComponentsAction {
  constructor() {
    super(...arguments),
      (this.UiRoot = void 0),
      (this.WorldContext = void 0),
      (this.xvi = void 0),
      (this.yyr = void 0),
      (this.Iyr = void 0),
      (this.Tyr = void 0),
      (this.Cve = void 0),
      (this.Lyr = void 0),
      (this.Dyr = void 0),
      (this.Ryr = void 0),
      (this.Uyr = void 0),
      (this.Ayr = void 0),
      (this.Pyr = void 0),
      (this.xyr = "WutheringWave_"),
      (this.wyr = (t) => {
        this.UiRoot = t;
      }),
      (this.Byr = (t) => {
        this.SetRootActorLaunchComponentsAction(t),
          this.SetContainerItemActive(!1);
      }),
      (this.OnPressActionCallback = () => {
        this.Ryr.InputTrigger(this.Ayr.bPress, 0);
      }),
      (this.OnTouchActionCallback = () => {
        this.Uyr.InputTouchTrigger(
          this.Ayr.bPress,
          this.Ayr.TouchIndex,
          this.Ayr.TouchPosition,
        );
      }),
      (this.OnTouchMovedActionCallback = () => {
        this.Uyr.InputTouchMoved(this.Ayr.TouchIndex, this.Ayr.TouchPosition);
      }),
      (this.byr = (t) => {
        (this.Pyr = UE.GameplayStatics.GetPlayerController(
          this.WorldContext,
          0,
        )),
          (this.Lyr = t),
          (this.Ryr = this.Lyr.GetComponentByClass(
            UE.LGUI_StandaloneInputModule.StaticClass(),
          )),
          (this.Uyr = this.Lyr.GetComponentByClass(
            UE.LGUI_TouchInputModule.StaticClass(),
          )),
          this.InitActionHandle();
      });
  }
  async InitAsync(t) {
    (this.WorldContext = t),
      this.InitInputSettings(),
      await this.InitRuntimeEventSystemActor(),
      await LaunchUtil_1.LaunchUtil.LoadResourceAsync(
        LaunchUtil_1.LaunchUtil.UiRootPath,
        this.WorldContext,
        void 0,
        this.wyr,
      ),
      await LaunchUtil_1.LaunchUtil.LoadResourceAsync(
        "/Game/Aki/UI/Module/HotFix/Prefab/UiView_HotFix.UiView_HotFix",
        this.WorldContext,
        this.UiRoot.RootComponent,
        this.Byr,
      ),
      await this.LoadResourceAsync(),
      (this.Cve = new UE.KuroTickManager(
        this.WorldContext,
        "HotFixUiTickManager",
      )),
      this.OnShow();
  }
  async ShowProtocolView(t) {
    var i = new SdkProtocolView_1.SdkProtocolView();
    i.SetViewData(t),
      await i.Init(this.WorldContext, this.UiRoot.RootComponent);
  }
  async InitRuntimeEventSystemActor() {
    const e = new UE.Transform();
    await new Promise((i) => {
      LauncherResourceLib_1.LauncherResourceLib.LoadAsync(
        "/Game/Aki/UI/Module/HotFix/HotFixLGUIEventSystemActor.HotFixLGUIEventSystemActor_C",
        UE.Class,
        (t) => {
          t = UE.GameplayStatics.BeginSpawningActorFromClass(
            this.WorldContext,
            t,
            e,
          );
          UE.GameplayStatics.FinishSpawningActor(t, e),
            t.AddComponentByClass(
              UE.LGUI_StandaloneInputModule.StaticClass(),
              !1,
              e,
              !1,
            ),
            t.AddComponentByClass(
              UE.LGUI_TouchInputModule.StaticClass(),
              !1,
              e,
              !1,
            ),
            this.byr(t),
            i();
        },
      );
    });
  }
  InitInputSettings() {
    var t = UE.InputSettings.GetInputSettings(),
      i = new UE.FName("UI左键点击"),
      e = new UE.FName("LeftMouseButton"),
      e = new UE.Key(e),
      i = new UE.InputActionKeyMapping(i, !1, !1, !1, !1, e);
    t.AddActionMapping(i);
  }
  async LoadResourceAsync() {
    await this.AttachElementAsyncFromPath(
      100,
      "/Game/Aki/UI/Module/HotFix/Prefab/UiView_HotFixPopup.UiView_HotFixPopup",
      HotFixPopupUiView_1.HotFixPopupUiView,
    ),
      this.SetConfirmationItemActive(!1),
      await this.AttachElementAsyncFromPath(
        101,
        "/Game/Aki/UI/Module/HotFix/Prefab/UiView_HotFixPopup.UiView_HotFixPopup",
        HotFixPopupRepairView_1.HotFixPopupRepairView,
      ),
      this.qyr(!1),
      await this.Gyr();
  }
  async Gyr() {
    let e = new Map(),
      t =
        (await new Promise((i) => {
          LauncherResourceLib_1.LauncherResourceLib.LoadAsync(
            "/Game/Aki/HotPatch/Splash/SplashTable.SplashTable",
            UE.DataTable,
            (t) => {
              (e = LaunchUtil_1.LaunchUtil.GetDataTableMap(t, "Path")),
                i(void 0);
            },
          );
        }),
        e.get(
          this.xyr +
            LauncherLanguageLib_1.LauncherLanguageLib.GetPackageLanguage(),
        ));
    (t = t || e.get(this.xyr + LauncherLanguageLib_1.ENGLISH_ISO639_1)),
      await new Promise((i) => {
        LauncherResourceLib_1.LauncherResourceLib.LoadAsync(
          t,
          UE.Texture,
          (t) => {
            this.GetTexture(6).SetTexture(t), i(void 0);
          },
        );
      });
  }
  OnBeforeDestroy() {
    this.Cve && (this.Cve = void 0),
      this.xvi && (this.xvi = void 0),
      this.yyr && (this.yyr = void 0),
      this.Iyr && (this.Iyr = void 0),
      this.Tyr && (this.Tyr = void 0);
  }
  SetWindowCursorStyle() {
    var t = new UE.Vector2D(0, 0),
      i = this.WorldContext;
    let e = void 0,
      s = void 0,
      o = void 0;
    (o = UE.KuroStaticLibrary.IsEditor(i)
      ? ((e = new UE.FName("Aki/UI/Module/Cursor/SourceResource/CursorNor")),
        (s = new UE.FName("Aki/UI/Module/Cursor/SourceResource/CursorHi")),
        new UE.FName("Aki/UI/Module/Cursor/SourceResource/CursorPre"))
      : ((e = new UE.FName("Aki/Cursor/CursorNor")),
        (s = new UE.FName("Aki/Cursor/CursorHi")),
        new UE.FName("Aki/Cursor/CursorPre"))),
      UE.WidgetBlueprintLibrary.SetHardwareCursor(i, 1, e, t),
      UE.WidgetBlueprintLibrary.SetHardwareCursor(i, 16, s, t),
      UE.WidgetBlueprintLibrary.SetHardwareCursor(i, 15, o, t);
  }
  InitActionHandle() {
    LauncherResourceLib_1.LauncherResourceLib.LoadAsync(
      "/Game/Aki/HotPatch/TsHotFixActionHandle.TsHotFixActionHandle_C",
      UE.Class,
      (t) => {
        switch (
          ((this.Ayr = UE.NewObject(
            UE.TsHotFixActionHandle_C.StaticClass(),
            this.WorldContext,
          )),
          UE.GameplayStatics.GetPlatformName())
        ) {
          case "IOS":
          case "Android":
            (this.Dyr = this.Uyr), this.RegisterMobileInput();
            break;
          default:
            (this.Dyr = this.Ryr),
              this.SetWindowCursorStyle(),
              this.RegisterPcInput();
        }
        this.Dyr.Activate(!1);
      },
    );
  }
  RegisterPcInput() {
    this.Ayr.OnPressActionCallback.Add(this.OnPressActionCallback),
      this.Ayr.AddPressBinding("UI左键点击", this.Pyr),
      this.Ayr.AddReleaseBinding("UI左键点击", this.Pyr);
  }
  RegisterMobileInput() {
    this.Ayr.OnTouchActionCallback.Add(this.OnTouchActionCallback),
      this.Ayr.OnTouchMovedActionCallback.Add(this.OnTouchMovedActionCallback),
      this.Ayr.AddTouchPressBinding(this.Pyr),
      this.Ayr.AddTouchReleaseBinding(this.Pyr),
      this.Ayr.AddTouchMoveBinding(this.Pyr);
  }
  OnShow() {
    (this.xvi = this.GetText(4)),
      (this.yyr = this.GetText(8)),
      (this.Iyr = this.GetText(7)),
      (this.Tyr = this.GetTexture(3)),
      this.ShowAppInfoText(this.WorldContext),
      this.SetRepairButtonText("PatchClearbutton"),
      this.SetRepairButtonEnable(!1),
      this.SetRepairButtonCallBack(() => {
        this.qyr(!0);
      });
  }
  SetContainerItemActive(t) {
    var i = this.GetItem(0);
    t && t !== i.IsUIActiveSelf() && this.SequencePlayer.PlaySequence("Start"),
      this.GetItem(0).SetUIActive(t);
  }
  UpdateProgressRate(t) {
    this.SetProgressActive(!0), this.Tyr.SetFillAmount(t);
  }
  SetProgressActive(t) {
    this.GetTexture(2).SetUIActive(t), this.Tyr.SetUIActive(t);
  }
  SetConfirmationItemActive(t) {
    this.GetElement(100).SetActive(t);
  }
  qyr(t) {
    this.GetElement(101).SetActive(t);
  }
  SetProgressLeftTips(t, ...i) {
    HotFixManager_1.HotFixManager.SetLocalText(this.xvi, t, ...i),
      this.yyr.SetText(""),
      this.Iyr.SetText("");
  }
  SetProgressText(t, ...i) {
    HotFixManager_1.HotFixManager.SetLocalText(this.xvi, t, ...i);
  }
  SetPatchText(t, ...i) {
    HotFixManager_1.HotFixManager.SetLocalText(this.yyr, t, ...i);
  }
  SetSpeedText(t, ...i) {
    HotFixManager_1.HotFixManager.SetLocalText(this.Iyr, t, ...i);
  }
  SetProgressLeftActive(t) {
    this.xvi.SetUIActive(t), this.yyr.SetUIActive(t), this.Iyr.SetUIActive(t);
  }
  SetProgressRightTips(t) {
    HotFixManager_1.HotFixManager.SetLocalText(this.GetText(5), t);
  }
  SetProgressRightActive(t) {
    this.GetText(5).SetUIActive(t);
  }
  SetConfirmationTitle(t) {
    this.GetElement(100).SetConfirmationTitle(t);
  }
  SetConfirmationContent(t, ...i) {
    this.GetElement(100).SetConfirmationContent(t, ...i);
  }
  SetConfirmationLeftButtonCallBack(t) {
    this.GetElement(100).SetConfirmationLeftButtonCallBack(t);
  }
  SetConfirmationRightButtonCallBack(t) {
    this.GetElement(100).SetConfirmationRightButtonCallBack(t);
  }
  SetConfirmationLeftButtonText(t) {
    this.GetElement(100).SetConfirmationLeftButtonText(t);
  }
  SetConfirmationRightButtonText(t) {
    this.GetElement(100).SetConfirmationRightButtonText(t);
  }
  SetConfirmationLeftButtonActive(t) {
    this.GetElement(100).SetConfirmationLeftButtonActive(t);
  }
  SetConfirmationRightButtonActive(t) {
    this.GetElement(100).SetConfirmationRightButtonActive(t);
  }
  SetConfirmationMiddleButtonCallBack(t) {
    this.GetElement(100).SetConfirmationMiddleButtonCallBack(t);
  }
  SetConfirmationMiddleButtonText(t) {
    this.GetElement(100).SetConfirmationMiddleButtonText(t);
  }
  SetConfirmationMiddleButtonActive(t) {
    this.GetElement(100).SetConfirmationMiddleButtonActive(t);
  }
  SetConfirmationCloseButtonCallBack(t) {
    this.GetElement(100).SetConfirmationCloseButtonCallBack(t);
  }
  SetConfirmationCloseButtonActive(t) {
    this.GetElement(100).SetConfirmationCloseButtonActive(t);
  }
  SetMaskButtonCallBack(t) {
    this.GetButton(10).OnClickCallBack.Unbind(),
      this.GetButton(10).OnClickCallBack.Bind(t);
  }
  SetRepairButtonText(t) {
    HotFixManager_1.HotFixManager.SetLocalText(this.GetText(11), t);
  }
  SetRepairButtonEnable(t) {
    this.GetButton(9).SetSelfInteractive(t);
  }
  SetRepairButtonCallBack(t) {
    this.GetButton(9).OnClickCallBack.Unbind(),
      this.GetButton(9).OnClickCallBack.Bind(t);
  }
  ShowAppInfoText(t) {
    this.GetText(1).SetText(
      BaseConfigController_1.BaseConfigController.GetVersionString(),
    );
  }
  SetNextFrameCallback(i, t) {
    const e = (t) => {
      i(),
        this.Cve.RemoveTick(0),
        (0, puerts_1.releaseManualReleaseDelegate)(e);
    };
    this.Cve.AddTick(0, (0, puerts_1.toManualReleaseDelegate)(e));
  }
  async Hide() {
    await new Promise((t) => {
      this.SequencePlayer.StopSequence("Start", !0),
        this.SequencePlayer.PlaySequence("Close", () => {
          t(void 0);
        });
    });
  }
  Destroy() {
    super.Destroy(),
      this.UiRoot &&
        (UE.LGUIBPLibrary.DestroyActorWithHierarchy(this.UiRoot, !0),
        (this.UiRoot = void 0)),
      this.Pyr && (this.Ayr.ClearActionBinding(this.Pyr), (this.Pyr = void 0)),
      this.Lyr &&
        (this.Lyr.PreDestroy(),
        UE.LGUIBPLibrary.DestroyActorWithHierarchy(this.Lyr, !0),
        UE.KismetSystemLibrary.CollectGarbage(),
        (this.Lyr = void 0),
        (this.Dyr = void 0),
        (this.Ryr = void 0),
        (this.Uyr = void 0)),
      this.Ayr &&
        (this.Ayr.OnPressActionCallback.Clear(),
        this.Ayr.OnTouchActionCallback.Clear(),
        (this.Ayr = void 0)),
      this.WorldContext && (this.WorldContext = void 0);
  }
}
exports.HotFixUiView = HotFixUiView;
//# sourceMappingURL=HotFixUiView.js.map
