"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HotFixUiView = void 0);
const puerts_1 = require("puerts");
const UE = require("ue");
const BaseConfigController_1 = require("../../BaseConfig/BaseConfigController");
const LauncherLanguageLib_1 = require("../../Util/LauncherLanguageLib");
const LauncherResourceLib_1 = require("../../Util/LauncherResourceLib");
const LaunchComponentsAction_1 = require("../LaunchComponentsAction");
const LaunchUtil_1 = require("../LaunchUtil");
const HotFixManager_1 = require("./HotFixManager");
const HotFixPopupRepairView_1 = require("./HotFixPopupRepairView");
const HotFixPopupUiView_1 = require("./HotFixPopupUiView");
class HotFixUiView extends LaunchComponentsAction_1.LaunchComponentsAction {
  constructor() {
    super(...arguments),
      (this.UiRoot = void 0),
      (this.WorldContext = void 0),
      (this.xpi = void 0),
      (this.LEr = void 0),
      (this.DEr = void 0),
      (this.REr = void 0),
      (this.Cve = void 0),
      (this.UEr = void 0),
      (this.AEr = void 0),
      (this.PEr = void 0),
      (this.xEr = void 0),
      (this.wEr = void 0),
      (this.BEr = void 0),
      (this.bEr = "WutheringWave_"),
      (this.qEr = (t) => {
        this.UiRoot = t;
      }),
      (this.GEr = (t) => {
        this.SetRootActorLaunchComponentsAction(t),
          this.SetContainerItemActive(!1);
      }),
      (this.OnPressActionCallback = () => {
        this.PEr.InputTrigger(this.wEr.bPress, 0);
      }),
      (this.OnTouchActionCallback = () => {
        this.xEr.InputTouchTrigger(
          this.wEr.bPress,
          this.wEr.TouchIndex,
          this.wEr.TouchPosition,
        );
      }),
      (this.OnTouchMovedActionCallback = () => {
        this.xEr.InputTouchMoved(this.wEr.TouchIndex, this.wEr.TouchPosition);
      }),
      (this.NEr = (t) => {
        (this.BEr = UE.GameplayStatics.GetPlayerController(
          this.WorldContext,
          0,
        )),
          (this.UEr = t),
          (this.PEr = this.UEr.GetComponentByClass(
            UE.LGUI_StandaloneInputModule.StaticClass(),
          )),
          (this.xEr = this.UEr.GetComponentByClass(
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
        this.qEr,
      ),
      await LaunchUtil_1.LaunchUtil.LoadResourceAsync(
        "/Game/Aki/UI/Module/HotFix/Prefab/UiView_HotFix.UiView_HotFix",
        this.WorldContext,
        this.UiRoot.RootComponent,
        this.GEr,
      ),
      await this.LoadResourceAsync(),
      (this.Cve = new UE.KuroTickManager(
        this.WorldContext,
        "HotFixUiTickManager",
      )),
      this.OnShow();
  }
  async InitRuntimeEventSystemActor() {
    const s = new UE.Transform();
    await new Promise((i) => {
      LauncherResourceLib_1.LauncherResourceLib.LoadAsync(
        "/Game/Aki/UI/Module/HotFix/HotFixLGUIEventSystemActor.HotFixLGUIEventSystemActor_C",
        UE.Class,
        (t) => {
          t = UE.GameplayStatics.BeginSpawningActorFromClass(
            this.WorldContext,
            t,
            s,
          );
          UE.GameplayStatics.FinishSpawningActor(t, s),
            t.AddComponentByClass(
              UE.LGUI_StandaloneInputModule.StaticClass(),
              !1,
              s,
              !1,
            ),
            t.AddComponentByClass(
              UE.LGUI_TouchInputModule.StaticClass(),
              !1,
              s,
              !1,
            ),
            this.NEr(t),
            i();
        },
      );
    });
  }
  InitInputSettings() {
    const t = UE.InputSettings.GetInputSettings();
    var i = new UE.FName("UI左键点击");
    var s = new UE.FName("LeftMouseButton");
    var s = new UE.Key(s);
    var i = new UE.InputActionKeyMapping(i, !1, !1, !1, !1, s);
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
      this.OEr(!1),
      await this.kEr();
  }
  async kEr() {
    let s = new Map();
    let t =
      (await new Promise((i) => {
        LauncherResourceLib_1.LauncherResourceLib.LoadAsync(
          "/Game/Aki/HotPatch/Splash/SplashTable.SplashTable",
          UE.DataTable,
          (t) => {
            (s = LaunchUtil_1.LaunchUtil.GetDataTableMap(t, "Path")), i(void 0);
          },
        );
      }),
      s.get(
        this.bEr +
          LauncherLanguageLib_1.LauncherLanguageLib.GetPackageLanguage(),
      ));
    (t = t || s.get(this.bEr + LauncherLanguageLib_1.ENGLISH_ISO639_1)),
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
      this.xpi && (this.xpi = void 0),
      this.LEr && (this.LEr = void 0),
      this.DEr && (this.DEr = void 0),
      this.REr && (this.REr = void 0);
  }
  SetWindowCursorStyle() {
    const t = new UE.Vector2D(0, 0);
    const i = this.WorldContext;
    let s = void 0;
    let e = void 0;
    let o = void 0;
    (o = UE.KuroStaticLibrary.IsEditor(i)
      ? ((s = new UE.FName("Aki/UI/Module/Cursor/SourceResource/CursorNor")),
        (e = new UE.FName("Aki/UI/Module/Cursor/SourceResource/CursorHi")),
        new UE.FName("Aki/UI/Module/Cursor/SourceResource/CursorPre"))
      : ((s = new UE.FName("Aki/Cursor/CursorNor")),
        (e = new UE.FName("Aki/Cursor/CursorHi")),
        new UE.FName("Aki/Cursor/CursorPre"))),
      UE.WidgetBlueprintLibrary.SetHardwareCursor(i, 1, s, t),
      UE.WidgetBlueprintLibrary.SetHardwareCursor(i, 16, e, t),
      UE.WidgetBlueprintLibrary.SetHardwareCursor(i, 15, o, t);
  }
  InitActionHandle() {
    LauncherResourceLib_1.LauncherResourceLib.LoadAsync(
      "/Game/Aki/HotPatch/TsHotFixActionHandle.TsHotFixActionHandle_C",
      UE.Class,
      (t) => {
        switch (
          ((this.wEr = UE.NewObject(
            UE.TsHotFixActionHandle_C.StaticClass(),
            this.WorldContext,
          )),
          UE.GameplayStatics.GetPlatformName())
        ) {
          case "IOS":
          case "Android":
            (this.AEr = this.xEr), this.RegisterMobileInput();
            break;
          default:
            (this.AEr = this.PEr),
              this.SetWindowCursorStyle(),
              this.RegisterPcInput();
        }
        this.AEr.Activate(!1);
      },
    );
  }
  RegisterPcInput() {
    this.wEr.OnPressActionCallback.Add(this.OnPressActionCallback),
      this.wEr.AddPressBinding("UI左键点击", this.BEr),
      this.wEr.AddReleaseBinding("UI左键点击", this.BEr);
  }
  RegisterMobileInput() {
    this.wEr.OnTouchActionCallback.Add(this.OnTouchActionCallback),
      this.wEr.OnTouchMovedActionCallback.Add(this.OnTouchMovedActionCallback),
      this.wEr.AddTouchPressBinding(this.BEr),
      this.wEr.AddTouchReleaseBinding(this.BEr),
      this.wEr.AddTouchMoveBinding(this.BEr);
  }
  OnShow() {
    (this.xpi = this.GetText(4)),
      (this.LEr = this.GetText(8)),
      (this.DEr = this.GetText(7)),
      (this.REr = this.GetTexture(3)),
      this.ShowAppInfoText(this.WorldContext),
      this.SetRepairButtonText("PatchClearbutton"),
      this.SetRepairButtonEnable(!1),
      this.SetRepairButtonCallBack(() => {
        this.OEr(!0);
      });
  }
  SetContainerItemActive(t) {
    const i = this.GetItem(0);
    t && t !== i.IsUIActiveSelf() && this.SequencePlayer.PlaySequence("Start"),
      this.GetItem(0).SetUIActive(t);
  }
  UpdateProgressRate(t) {
    this.SetProgressActive(!0), this.REr.SetFillAmount(t);
  }
  SetProgressActive(t) {
    this.GetTexture(2).SetUIActive(t), this.REr.SetUIActive(t);
  }
  SetConfirmationItemActive(t) {
    this.GetElement(100).SetActive(t);
  }
  OEr(t) {
    this.GetElement(101).SetActive(t);
  }
  SetProgressLeftTips(t, ...i) {
    HotFixManager_1.HotFixManager.SetLocalText(this.xpi, t, ...i),
      this.LEr.SetText(""),
      this.DEr.SetText("");
  }
  SetProgressText(t, ...i) {
    HotFixManager_1.HotFixManager.SetLocalText(this.xpi, t, ...i);
  }
  SetPatchText(t, ...i) {
    HotFixManager_1.HotFixManager.SetLocalText(this.LEr, t, ...i);
  }
  SetSpeedText(t, ...i) {
    HotFixManager_1.HotFixManager.SetLocalText(this.DEr, t, ...i);
  }
  SetProgressLeftActive(t) {
    this.xpi.SetUIActive(t), this.LEr.SetUIActive(t), this.DEr.SetUIActive(t);
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
    const s = (t) => {
      i(),
        this.Cve.RemoveTick(0),
        (0, puerts_1.releaseManualReleaseDelegate)(s);
    };
    this.Cve.AddTick(0, (0, puerts_1.toManualReleaseDelegate)(s));
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
      this.BEr && (this.wEr.ClearActionBinding(this.BEr), (this.BEr = void 0)),
      this.UEr &&
        (this.UEr.PreDestroy(),
        UE.LGUIBPLibrary.DestroyActorWithHierarchy(this.UEr, !0),
        UE.KismetSystemLibrary.CollectGarbage(),
        (this.UEr = void 0),
        (this.AEr = void 0),
        (this.PEr = void 0),
        (this.xEr = void 0)),
      this.wEr &&
        (this.wEr.OnPressActionCallback.Clear(),
        this.wEr.OnTouchActionCallback.Clear(),
        (this.wEr = void 0)),
      this.WorldContext && (this.WorldContext = void 0);
  }
}
exports.HotFixUiView = HotFixUiView;
// # sourceMappingURL=HotFixUiView.js.map
