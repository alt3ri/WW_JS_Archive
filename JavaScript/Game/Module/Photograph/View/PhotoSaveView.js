"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PhotoSaveView = void 0);
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const ShareRewardById_1 = require("../../../../Core/Define/ConfigQuery/ShareRewardById");
const BaseConfigController_1 = require("../../../../Launcher/BaseConfig/BaseConfigController");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const GlobalData_1 = require("../../../GlobalData");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiLayerType_1 = require("../../../Ui/Define/UiLayerType");
const UiLayer_1 = require("../../../Ui/UiLayer");
const UiManager_1 = require("../../../Ui/UiManager");
const ChannelController_1 = require("../../Channel/ChannelController");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const FragmentMemoryShareView_1 = require("../../FragmentMemory/FragmentMemoryShareView");
const GachaShareOnePanel_1 = require("../../Gacha/GachaResultView/GachaShareOnePanel");
const GachaShareTenPanel_1 = require("../../Gacha/GachaResultView/GachaShareTenPanel");
const LoadingController_1 = require("../../Loading/LoadingController");
const ScreenShotManager_1 = require("../../ScreenShot/ScreenShotManager");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const PhotographController_1 = require("../PhotographController");
const PhotographDefine_1 = require("../PhotographDefine");
const PhotoSaveMarkItem_1 = require("./PhotoSaveMarkItem");
const PhotoShareBtnItem_1 = require("./PhotoShareBtnItem");
class PhotoSaveView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.Kji = void 0),
      (this.Qji = !0),
      (this.Xji = ""),
      (this.$ji = void 0),
      (this.Yji = void 0),
      (this.yxn = void 0),
      (this.Jji = 1),
      (this.cAr = 0),
      (this.mAr = 0),
      (this.dAr = void 0),
      (this.zji = () => {
        const e = new PhotoShareBtnItem_1.PhotoShareBtnItem();
        return e.SetClickCallBack(this.Zji), e;
      }),
      (this.Zji = (o) => {
        Log_1.Log.CheckInfo() && Log_1.Log.Info("Photo", 8, "点击分享截图按钮"),
          this.eWi(!1, (e, t, i) => {
            var r = (0, puerts_1.$ref)(void 0);
            var r =
              (UE.KuroGameScreenshotBPLibrary.CompressConvertColorsToBitmap(
                e,
                t,
                i,
                r,
              ),
              (0, puerts_1.$unref)(r));
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Photo",
                8,
                "截图完成，压缩截图结果进行分享",
                ["width", e],
                ["height", t],
                ["ColorSize", i?.Num()],
                ["bitMapSize", r?.Num()],
              ),
              ChannelController_1.ChannelController.ShareChannel(
                o,
                r,
                this.Jji,
              );
          });
      }),
      (this.tWi = () => {
        let e;
        Log_1.Log.CheckInfo() && Log_1.Log.Info("Photo", 8, "点击保存截图按钮"),
          ControllerHolder_1.ControllerHolder.KuroSdkController.CheckPhotoPermission()
            ? ((e =
                ModelManager_1.ModelManager.PlatformModel?.IsMobileSource()),
              this.eWi(!e, this.iWi, this.CAr))
            : ((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
                169,
              )).FunctionMap.set(1, this.oWi),
              e.FunctionMap.set(2, () => {
                PhotographController_1.PhotographController.CouldRequestPhotoPermission()
                  ? (LocalStorage_1.LocalStorage.SetGlobal(
                      LocalStorageDefine_1.ELocalStorageGlobalKey
                        .RequestPhotoPermissionMinTime,
                      TimeUtil_1.TimeUtil.GetServerTime() +
                        CommonParamById_1.configCommonParamById.GetIntConfig(
                          "PermissionRequestsTimeId",
                        ),
                    ),
                    ControllerHolder_1.ControllerHolder.KuroSdkController.RequestPhotoPermission(
                      this.rWi,
                    ))
                  : this.oWi();
              }),
              ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
                e,
              ));
      }),
      (this.rWi = (e) => {
        e ? this.eWi(!0, this.iWi, this.CAr) : this.oWi();
      }),
      (this.oWi = () => {
        switch (ModelManager_1.ModelManager.PlatformModel.SourcePlatformType) {
          case 2:
            ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
              "Privilege_album_Android",
            );
            break;
          case 1:
            ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
              "Privilege_album_IOS",
            );
        }
      }),
      (this.iWi = (e, t, i) => {
        switch (
          ((this.cAr = e),
          (this.mAr = t),
          (this.dAr = i),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Photo",
              8,
              "截图完成，截图结果进行保存",
              ["width", e],
              ["height", t],
              ["ColorSize", i?.Num()],
            ),
          ModelManager_1.ModelManager.PlatformModel.SourcePlatformType)
        ) {
          case 2:
            var r = (0, puerts_1.$ref)(void 0);
            var r =
              (UE.KuroGameScreenshotBPLibrary.ConvertColorsToBitmap(e, t, i, r),
              (0, puerts_1.$unref)(r));
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Photo", 8, "截图保存至Android相册", [
                "bitmapSize",
                r?.Num(),
              ]),
              UE.KuroGameScreenshotBPLibrary.SaveColorArrayToAndroidAlbum(
                e,
                t,
                r,
              ),
              ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                "SaveGalleryPathTips",
              );
            break;
          case 1:
            if (!UE.KuroGameScreenshotBPLibrary.IsPhotoLibraryAuthorized())
              return (
                Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "Photo",
                    8,
                    "没有获得IOS相册权限，请求权限，请求完成后再次尝试截图",
                  ),
                void ScreenShotManager_1.ScreenShotManager.RequestIOSPhotoLibraryAuthorization()
              );
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Photo", 8, "截图保存至IOS相册", [
                "colors",
                i?.Num(),
              ]),
              UE.KuroGameScreenshotBPLibrary.SaveColorArrayToIosAlbum(e, t, i),
              ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                "SaveGalleryPathTips",
              );
            break;
          default:
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Photo", 8, "截图保存至游戏安装文件夹", [
                "path",
                this.Xji,
              ]),
              ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                "SavePathTips",
                this.Xji,
              );
        }
        this.nWi();
      }),
      (this.CAr = (e) => {
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Photo",
            8,
            "允许权限后重新截图",
            ["isGranted", e],
            ["width", this.cAr],
            ["height", this.mAr],
            ["colorsSize", this.dAr?.Num()],
          ),
          !e ||
            this.cAr <= 0 ||
            this.mAr <= 0 ||
            !this.dAr ||
            (UE.KuroGameScreenshotBPLibrary.SaveColorArrayToIosAlbum(
              this.cAr,
              this.mAr,
              this.dAr,
            ),
            ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
              "SaveGalleryPathTips",
            )),
          this.nWi();
      }),
      (this.ACt = () => {
        this.Qji ? this.nWi() : this.CloseMe();
      }),
      (this.sWi = () => {
        this.CloseMe();
      }),
      (this.aWi = (e) => {
        LocalStorage_1.LocalStorage.SetGlobal(
          LocalStorageDefine_1.ELocalStorageGlobalKey
            .PhotoAndShareShowPlayerName,
          e,
        ),
          this.$ji?.RefreshNameVisible();
      }),
      (this.hWi = (e) => {
        PhotographController_1.PhotographController.CheckIfInMission()
          ? e
            ? (this.GetItem(7).SetUIActive(!0),
              this.GetSprite(9).SetUIActive(!0),
              this.GetSprite(8).SetUIActive(!1),
              LguiUtil_1.LguiUtil.SetLocalText(
                this.GetText(10),
                "FindAllConditionsTrue",
              ),
              this.lWi())
            : (this.GetItem(7).SetUIActive(!0),
              this.GetSprite(9).SetUIActive(!1),
              this.GetSprite(8).SetUIActive(!0),
              LguiUtil_1.LguiUtil.SetLocalText(
                this.GetText(10),
                "FindAllConditionsFalse",
              ),
              this._Wi())
          : (this.GetItem(7).SetUIActive(!1),
            this.GetSprite(9).SetUIActive(!1),
            this.GetSprite(8).SetUIActive(!1));
      }),
      (this.uWi = () => {
        var e =
          PhotographController_1.PhotographController.CameraCaptureType !== 1 &&
          ModelManager_1.ModelManager.ChannelModel.CouldGetShareReward(
            this.Jji,
          );
        if ((this.GetItem(this.Qji ? 27 : 28).SetUIActive(e), e)) {
          var [e, t] = [
            ...ShareRewardById_1.configShareRewardById.GetConfig(this.Jji)
              .ShareReward,
          ][0];
          var e =
            ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(
              e,
            ).IconSmall;
          const i = this.GetTexture(this.Qji ? 32 : 33);
          i.SetUIActive(!1),
            this.SetTextureByPath(e, i, void 0, () => {
              i.SetUIActive(!0);
            }),
            this.GetText(this.Qji ? 25 : 26).SetText(String(t));
        }
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIItem],
      [2, UE.UIButtonComponent],
      [3, UE.UISprite],
      [4, UE.UIItem],
      [5, UE.UIHorizontalLayout],
      [6, UE.UIButtonComponent],
      [7, UE.UIItem],
      [8, UE.UISprite],
      [9, UE.UISprite],
      [10, UE.UIText],
      [11, UE.UIItem],
      [12, UE.UIItem],
      [13, UE.UIItem],
      [14, UE.UIItem],
      [15, UE.UIItem],
      [16, UE.UIText],
      [17, UE.UIText],
      [18, UE.UIText],
      [19, UE.UITexture],
      [20, UE.UIText],
      [21, UE.UIItem],
      [22, UE.UIItem],
      [23, UE.UIItem],
      [24, UE.UIItem],
      [25, UE.UIText],
      [26, UE.UIText],
      [27, UE.UIItem],
      [28, UE.UIItem],
      [29, UE.UIButtonComponent],
      [30, UE.UIItem],
      [31, UE.UIItem],
      [32, UE.UITexture],
      [33, UE.UITexture],
      [34, UE.UIExtendToggle],
      [35, UE.UIExtendToggle],
      [36, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [6, this.tWi],
        [2, this.ACt],
        [29, this.sWi],
        [34, this.aWi],
        [35, this.aWi],
      ]);
  }
  async OnBeforeStartAsync() {
    const e = this.OpenParam;
    var t =
      ((this.Qji = void 0 === e.HandBookPhotoData),
      (this.$ji = new PhotoSaveMarkItem_1.PhotoSaveMarkItem()),
      this.AddChild(this.$ji),
      [
        this.$ji.OnlyCreateByActorAsync(
          this.GetItem(this.Qji ? 21 : 22).GetOwner(),
        ),
      ]);
    var t =
      (e.GachaData && t.push(this.cWi(e.GachaData)),
      e.FragmentMemory && t.push(this.Ixn(e.FragmentMemory)),
      await Promise.all(t),
      LocalStorage_1.LocalStorage.GetGlobal(
        LocalStorageDefine_1.ELocalStorageGlobalKey.PhotoAndShareShowPlayerName,
        !0,
      ));
    var t = t ? 1 : 0;
    let i = this.Qji ? 34 : 35;
    this.GetExtendToggle(i)?.SetToggleState(t),
      this.Qji
        ? e.GachaData
          ? e.GachaData.length !== 1
            ? (this.Jji = 5)
            : ((i = ConfigManager_1.ConfigManager.GachaConfig.GetItemIdType(
                e.GachaData[0].u5n.G3n,
              )),
              (this.Jji = i === 2 ? 4 : 3))
          : (this.Jji = 1)
        : (this.Jji = 2),
      this.Qji ? this.mWi() : this.dWi(e.HandBookPhotoData),
      this.uWi(),
      e.ScreenShot &&
        UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSceneColorShotNow();
  }
  async cWi(e) {
    const t = e.length === 1;
    var e =
      ((this.Yji = new (
        t
          ? GachaShareOnePanel_1.GachaShareOnePanel
          : GachaShareTenPanel_1.GachaShareTenPanel
      )()),
      (this.Yji.OpenParam = t ? e[0] : e),
      ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
        t ? "UiItem_ShareInfo" : "UiView_SettlementShare",
      ));
    await this.Yji.OnlyCreateByPathAsync(e, this.GetItem(36)),
      this.AddChild(this.Yji);
  }
  async Ixn(e) {
    (this.yxn = new FragmentMemoryShareView_1.FragmentMemoryShareView()),
      (this.yxn.OpenParam = e);
    e =
      ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
        "UiItem_MemoryShare",
      );
    await this.yxn.OnlyCreateByPathAsync(e, this.GetItem(36)),
      this.AddChild(this.yxn);
  }
  mWi() {
    this.GetItem(14).SetUIActive(!0), this.GetItem(15).SetUIActive(!1);
    const e = this.GetItem(13);
    const t = this.GetItem(7);
    const i = this.GetText(10);
    const r = UE.WidgetLayoutLibrary.GetViewportSize(
      GlobalData_1.GlobalData.World,
    );
    const o = UE.WidgetLayoutLibrary.GetViewportScale(
      GlobalData_1.GlobalData.World,
    );
    this.Jji === 1
      ? (e.SetWidth(r.X / (o * PhotographDefine_1.SCREEN_SHOT_TEXTURE_SCALE)),
        e.SetHeight(r.Y / (o * PhotographDefine_1.SCREEN_SHOT_TEXTURE_SCALE)))
      : (e.SetWidth(PhotographDefine_1.DEFAULT_SHARE_WIDTH),
        e.SetHeight(PhotographDefine_1.DEFAULT_SHARE_HEIGHT)),
      PhotographController_1.PhotographController.CameraCaptureType === 0
        ? (i.SetUIActive(!1), t.SetUIActive(!1), this.CWi())
        : PhotographController_1.PhotographController.CameraCaptureType === 1 &&
          (i.SetUIActive(!0), t.SetUIActive(!0), this.lWi()),
      this.sGn();
  }
  dWi(e) {
    this.GetItem(14).SetUIActive(!1),
      this.GetItem(15).SetUIActive(!0),
      this.GetItem(7).SetUIActive(!1),
      this.CWi(),
      this.sGn();
    const t = e.Index;
    this.GetText(18).SetUIActive(void 0 !== e.DateText),
      e.DateText &&
        LguiUtil_1.LguiUtil.SetLocalText(
          this.GetText(18),
          "DateOfAcquisition",
          e.DateText[t],
        ),
      this.GetText(17).SetUIActive(void 0 !== e.NameText),
      e.NameText && this.GetText(17).SetText(e.NameText[t]),
      this.GetText(16).SetUIActive(void 0 !== e.TypeText),
      e.TypeText && this.GetText(16).SetText(e.TypeText[t]),
      this.GetText(20).SetUIActive(void 0 !== e.DescrtptionText),
      e.DescrtptionText && this.GetText(20).SetText(e.DescrtptionText[t]),
      this.GetTexture(19).SetUIActive(void 0 !== e.TextureList),
      e.TextureList &&
        this.SetTextureByPath(e.TextureList[t], this.GetTexture(19));
  }
  gWi() {
    return !BaseConfigController_1.BaseConfigController.GetIosAuditFirstDownloadTip();
  }
  sGn() {
    const e =
      ControllerHolder_1.ControllerHolder.PhotographController.CheckHasSpecifiedFeatureForSave();
    this.GetButton(6)?.RootUIComp.SetUIActive(!e);
  }
  CWi() {
    this.GetItem(31).SetUIActive(!0),
      this.GetButton(29).RootUIComp.SetUIActive(!1),
      this.GetHorizontalLayout(5).RootUIComp.SetUIActive(this.gWi());
    const e = ChannelController_1.ChannelController.GetOpenedShareIds();
    (this.Kji = new GenericLayout_1.GenericLayout(
      this.GetHorizontalLayout(5),
      this.zji,
    )),
      this.Kji.RefreshByData(e),
      this.GetItem(30).SetUIActive(e.length > 0);
  }
  _Wi() {
    this.GetItem(31).SetUIActive(!1),
      this.GetItem(30).SetUIActive(!0),
      this.GetButton(29).RootUIComp.SetUIActive(!0),
      this.GetHorizontalLayout(5).RootUIComp.SetUIActive(!1);
  }
  lWi() {
    this.GetItem(30).SetUIActive(!1),
      this.GetButton(29).RootUIComp.SetUIActive(!1),
      this.GetHorizontalLayout(5).RootUIComp.SetUIActive(!1);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnEntityCameraFinished,
      this.hWi,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnFirstShare,
        this.uWi,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnEntityCameraFinished,
      this.hWi,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnFirstShare,
        this.uWi,
      );
  }
  OnAfterShow() {
    this.fWi();
  }
  OnBeforeDestroy() {
    UE.KuroRenderingRuntimeBPPluginBPLibrary.ReleaseGetSceneColorShotBefore(),
      this.Kji?.ClearChildren(),
      (this.Kji = void 0),
      this.av();
  }
  pWi() {
    var e = this.GetItem(this.Qji ? 11 : 23);
    var t = this.GetItem(this.Qji ? 12 : 24);
    var e = e.GetPositionInViewPort(!0);
    var t = t.GetPositionInViewPort(!0);
    return [e.X, e.Y, t.X, t.Y];
  }
  fWi() {
    this.UiViewSequence?.PlaySequence("ScreenShot");
  }
  eWi(e, t, i) {
    var r = TimeUtil_1.TimeUtil.GetServerTime();
    var r = TimeUtil_1.TimeUtil.DateFormatString2(r) + ".png";
    const o = this.pWi();
    var r =
      ((this.Xji = this.vWi(r)), UE.BlueprintPathsLibrary.ProjectUserDir());
    var r = r + this.Xji;
    var r = ScreenShotManager_1.ScreenShotManager.PrepareTakeScreenshot(
      r,
      o[0],
      o[1],
      o[2],
      o[3],
      e,
    );
    r &&
      (r.OnTakeScreenshotCapturedDelegate.Add(t),
      i && r.OnIOSPhotoLibraryAuthorizationCompletedDelegate.Add(i),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Photo", 8, "开始截图", ["isSaveFile", e]),
      r.TakeScreenshot());
  }
  nWi() {
    PhotographController_1.PhotographController.CheckIfInMission() &&
    PhotographController_1.PhotographController.CameraCaptureType === 1
      ? (PhotographController_1.PhotographController.IsLastChecked &&
          PhotographController_1.PhotographController.SubmitQuest(),
        UiManager_1.UiManager.CloseView("PhotoSaveView"),
        PhotographController_1.PhotographController.ClosePhotograph())
      : UiManager_1.UiManager.CloseView("PhotoSaveView");
  }
  vWi(e) {
    return "" + ModelManager_1.ModelManager.PhotographModel.SavePath + e;
  }
  av() {
    (this.cAr = 0),
      (this.mAr = 0),
      (this.dAr = void 0),
      UiLayer_1.UiLayer.SetLayerActive(UiLayerType_1.ELayerType.Float, !0),
      UiLayer_1.UiLayer.SetLayerActive(UiLayerType_1.ELayerType.Pop, !0),
      LoadingController_1.LoadingController.UpdateUidViewShow(),
      UiManager_1.UiManager.IsViewShow("PhotographView") ||
        UiLayer_1.UiLayer.SetLayerActive(UiLayerType_1.ELayerType.HUD, !0),
      ScreenShotManager_1.ScreenShotManager.ResetScreenShot();
  }
}
exports.PhotoSaveView = PhotoSaveView;
// # sourceMappingURL=PhotoSaveView.js.map
