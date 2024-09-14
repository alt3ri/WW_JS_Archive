"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HotFixUiView = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  BaseConfigController_1 = require("../../BaseConfig/BaseConfigController"),
  HotPatchEventSystem_1 = require("../../PlayerInput/HotPatchEventSystem"),
  HotPatchInputManager_1 = require("../../PlayerInput/HotPatchInputManager"),
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
      (this.ZOa = void 0),
      (this.xyr = "WutheringWave_"),
      (this.wyr = (t) => {
        this.UiRoot = t;
      }),
      (this.Byr = (t) => {
        this.SetRootActorLaunchComponentsAction(t),
          this.SetContainerItemActive(!1);
      });
  }
  async InitAsync(t) {
    (this.WorldContext = t),
      await Promise.all([
        HotPatchEventSystem_1.HotPatchEventSystem.InitRuntimeEventSystemActor(
          t,
        ),
        HotPatchInputManager_1.HotPatchInputManager.Init(t),
        LaunchUtil_1.LaunchUtil.LoadResourceAsync(
          LaunchUtil_1.LaunchUtil.UiRootPath,
          this.WorldContext,
          void 0,
          this.wyr,
        ),
      ]),
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
  SetProtocolViewViewState(t) {
    this.ZOa?.SetActive(t);
  }
  async ShowProtocolView(t) {
    (this.ZOa = new SdkProtocolView_1.SdkProtocolView()),
      this.ZOa.SetViewData(t),
      await this.ZOa.Init(this.WorldContext, this.UiRoot.RootComponent);
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
      HotPatchInputManager_1.HotPatchInputManager.Destroy(),
      HotPatchEventSystem_1.HotPatchEventSystem.Destroy(),
      this.WorldContext && (this.WorldContext = void 0);
  }
}
exports.HotFixUiView = HotFixUiView;
//# sourceMappingURL=HotFixUiView.js.map
