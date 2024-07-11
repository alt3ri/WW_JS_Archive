"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PhotoSaveView = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Info_1 = require("../../../../Core/Common/Info"),
  Log_1 = require("../../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  ShareRewardById_1 = require("../../../../Core/Define/ConfigQuery/ShareRewardById"),
  BaseConfigController_1 = require("../../../../Launcher/BaseConfig/BaseConfigController"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  LocalStorage_1 = require("../../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  GlobalData_1 = require("../../../GlobalData"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  UiLayerType_1 = require("../../../Ui/Define/UiLayerType"),
  UiLayer_1 = require("../../../Ui/UiLayer"),
  UiManager_1 = require("../../../Ui/UiManager"),
  ChannelController_1 = require("../../Channel/ChannelController"),
  ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
  FragmentMemoryShareView_1 = require("../../FragmentMemory/FragmentMemoryShareView"),
  GachaShareOnePanel_1 = require("../../Gacha/GachaResultView/GachaShareOnePanel"),
  GachaShareTenPanel_1 = require("../../Gacha/GachaResultView/GachaShareTenPanel"),
  LoadingController_1 = require("../../Loading/LoadingController"),
  ScreenShotManager_1 = require("../../ScreenShot/ScreenShotManager"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  PhotographController_1 = require("../PhotographController"),
  PhotographDefine_1 = require("../PhotographDefine"),
  PhotoSaveMarkItem_1 = require("./PhotoSaveMarkItem"),
  PhotoShareBtnItem_1 = require("./PhotoShareBtnItem");
class PhotoSaveView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.jWi = void 0),
      (this.WWi = !0),
      (this.KWi = ""),
      (this.QWi = void 0),
      (this.XWi = void 0),
      (this.tBn = void 0),
      (this.$Wi = 1),
      (this.IAr = 0),
      (this.TAr = 0),
      (this.LAr = void 0),
      (this.YWi = () => {
        var e = new PhotoShareBtnItem_1.PhotoShareBtnItem();
        return e.SetClickCallBack(this.JWi), e;
      }),
      (this.JWi = (o) => {
        Log_1.Log.CheckInfo() && Log_1.Log.Info("Photo", 8, "点击分享截图按钮"),
          this.zWi(!1, (e, t, i) => {
            var r = (0, puerts_1.$ref)(void 0),
              r =
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
                this.$Wi,
              );
          });
      }),
      (this.ZWi = () => {
        var e;
        Log_1.Log.CheckInfo() && Log_1.Log.Info("Photo", 8, "点击保存截图按钮"),
          ControllerHolder_1.ControllerHolder.KuroSdkController.CheckPhotoPermission()
            ? ((e = Info_1.Info.IsMobilePlatform()),
              this.zWi(!e, this.eKi, this.DAr))
            : ((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
                169,
              )).FunctionMap.set(1, this.tKi),
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
                      this.iKi,
                    ))
                  : this.tKi();
              }),
              ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
                e,
              ));
      }),
      (this.iKi = (e) => {
        e ? this.zWi(!0, this.eKi, this.DAr) : this.tKi();
      }),
      (this.tKi = () => {
        switch (Info_1.Info.PlatformType) {
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
      (this.eKi = (e, t, i) => {
        switch (
          ((this.IAr = e),
          (this.TAr = t),
          (this.LAr = i),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Photo",
              8,
              "截图完成，截图结果进行保存",
              ["width", e],
              ["height", t],
              ["ColorSize", i?.Num()],
            ),
          Info_1.Info.PlatformType)
        ) {
          case 2:
            var r = (0, puerts_1.$ref)(void 0),
              r =
                (UE.KuroGameScreenshotBPLibrary.ConvertColorsToBitmap(
                  e,
                  t,
                  i,
                  r,
                ),
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
                this.KWi,
              ]),
              ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                "SavePathTips",
                this.KWi,
              );
        }
        this.oKi();
      }),
      (this.DAr = (e) => {
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Photo",
            8,
            "允许权限后重新截图",
            ["isGranted", e],
            ["width", this.IAr],
            ["height", this.TAr],
            ["colorsSize", this.LAr?.Num()],
          ),
          !e ||
            this.IAr <= 0 ||
            this.TAr <= 0 ||
            !this.LAr ||
            (UE.KuroGameScreenshotBPLibrary.SaveColorArrayToIosAlbum(
              this.IAr,
              this.TAr,
              this.LAr,
            ),
            ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
              "SaveGalleryPathTips",
            )),
          this.oKi();
      }),
      (this.Vgt = () => {
        this.WWi ? this.oKi() : this.CloseMe();
      }),
      (this.rKi = () => {
        this.CloseMe();
      }),
      (this.nKi = (e) => {
        LocalStorage_1.LocalStorage.SetGlobal(
          LocalStorageDefine_1.ELocalStorageGlobalKey
            .PhotoAndShareShowPlayerName,
          e,
        ),
          this.QWi?.RefreshNameVisible();
      }),
      (this.sKi = (e) => {
        PhotographController_1.PhotographController.CheckIfInMission()
          ? e
            ? (this.GetItem(7).SetUIActive(!0),
              this.GetSprite(9).SetUIActive(!0),
              this.GetSprite(8).SetUIActive(!1),
              LguiUtil_1.LguiUtil.SetLocalText(
                this.GetText(10),
                "FindAllConditionsTrue",
              ),
              this.aKi())
            : (this.GetItem(7).SetUIActive(!0),
              this.GetSprite(9).SetUIActive(!1),
              this.GetSprite(8).SetUIActive(!0),
              LguiUtil_1.LguiUtil.SetLocalText(
                this.GetText(10),
                "FindAllConditionsFalse",
              ),
              this.hKi())
          : (this.GetItem(7).SetUIActive(!1),
            this.GetSprite(9).SetUIActive(!1),
            this.GetSprite(8).SetUIActive(!1));
      }),
      (this.lKi = () => {
        var e =
          1 !== PhotographController_1.PhotographController.CameraCaptureType &&
          ModelManager_1.ModelManager.ChannelModel.CouldGetShareReward(
            this.$Wi,
          );
        if ((this.GetItem(this.WWi ? 27 : 28).SetUIActive(e), e)) {
          var [e, t] = [
              ...ShareRewardById_1.configShareRewardById.GetConfig(this.$Wi)
                .ShareReward,
            ][0],
            e =
              ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(
                e,
              ).IconSmall;
          const i = this.GetTexture(this.WWi ? 32 : 33);
          i.SetUIActive(!1),
            this.SetTextureByPath(e, i, void 0, () => {
              i.SetUIActive(!0);
            }),
            this.GetText(this.WWi ? 25 : 26).SetText(String(t));
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
        [6, this.ZWi],
        [2, this.Vgt],
        [29, this.rKi],
        [34, this.nKi],
        [35, this.nKi],
      ]);
  }
  async OnBeforeStartAsync() {
    var e = this.OpenParam,
      t =
        ((this.WWi = void 0 === e.HandBookPhotoData),
        (this.QWi = new PhotoSaveMarkItem_1.PhotoSaveMarkItem()),
        this.AddChild(this.QWi),
        [
          this.QWi.OnlyCreateByActorAsync(
            this.GetItem(this.WWi ? 21 : 22).GetOwner(),
          ),
        ]),
      t =
        (e.GachaData && t.push(this._Ki(e.GachaData)),
        e.FragmentMemory && t.push(this.iBn(e.FragmentMemory)),
        await Promise.all(t),
        LocalStorage_1.LocalStorage.GetGlobal(
          LocalStorageDefine_1.ELocalStorageGlobalKey
            .PhotoAndShareShowPlayerName,
          !0,
        )),
      t = t ? 1 : 0,
      i = this.WWi ? 34 : 35;
    this.GetExtendToggle(i)?.SetToggleState(t),
      this.WWi
        ? e.GachaData
          ? 1 !== e.GachaData.length
            ? (this.$Wi = 5)
            : ((i = ConfigManager_1.ConfigManager.GachaConfig.GetItemIdType(
                e.GachaData[0].WVn.f8n,
              )),
              (this.$Wi = 2 === i ? 4 : 3))
          : (this.$Wi = 1)
        : (this.$Wi = 2),
      this.WWi ? this.uKi() : this.cKi(e.HandBookPhotoData),
      this.lKi(),
      e.ScreenShot &&
        UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSceneColorShotNow();
  }
  async _Ki(e) {
    var t = 1 === e.length,
      e =
        ((this.XWi = new (
          t
            ? GachaShareOnePanel_1.GachaShareOnePanel
            : GachaShareTenPanel_1.GachaShareTenPanel
        )()),
        (this.XWi.OpenParam = t ? e[0] : e),
        ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
          t ? "UiItem_ShareInfo" : "UiView_SettlementShare",
        ));
    await this.XWi.OnlyCreateByPathAsync(e, this.GetItem(36)),
      this.AddChild(this.XWi);
  }
  async iBn(e) {
    (this.tBn = new FragmentMemoryShareView_1.FragmentMemoryShareView()),
      (this.tBn.OpenParam = e);
    e =
      ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
        "UiItem_MemoryShare",
      );
    await this.tBn.OnlyCreateByPathAsync(e, this.GetItem(36)),
      this.AddChild(this.tBn);
  }
  uKi() {
    this.GetItem(14).SetUIActive(!0), this.GetItem(15).SetUIActive(!1);
    var e = this.GetItem(13),
      t = this.GetItem(7),
      i = this.GetText(10),
      r = UE.WidgetLayoutLibrary.GetViewportSize(GlobalData_1.GlobalData.World),
      o = UE.WidgetLayoutLibrary.GetViewportScale(
        GlobalData_1.GlobalData.World,
      );
    1 === this.$Wi
      ? (e.SetWidth(r.X / (o * PhotographDefine_1.SCREEN_SHOT_TEXTURE_SCALE)),
        e.SetHeight(r.Y / (o * PhotographDefine_1.SCREEN_SHOT_TEXTURE_SCALE)))
      : (e.SetWidth(PhotographDefine_1.DEFAULT_SHARE_WIDTH),
        e.SetHeight(PhotographDefine_1.DEFAULT_SHARE_HEIGHT)),
      0 === PhotographController_1.PhotographController.CameraCaptureType
        ? (i.SetUIActive(!1), t.SetUIActive(!1), this.mKi())
        : 1 === PhotographController_1.PhotographController.CameraCaptureType
          ? (i.SetUIActive(!0), t.SetUIActive(!0), this.aKi())
          : 2 ===
              PhotographController_1.PhotographController.CameraCaptureType &&
            (i.SetUIActive(!1), t.SetUIActive(!1), this.mKi()),
      this._Nn();
  }
  cKi(e) {
    this.GetItem(14).SetUIActive(!1),
      this.GetItem(15).SetUIActive(!0),
      this.GetItem(7).SetUIActive(!1),
      this.mKi(),
      this._Nn();
    var t = e.Index;
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
  dKi() {
    return !BaseConfigController_1.BaseConfigController.GetIosAuditFirstDownloadTip();
  }
  _Nn() {
    var e =
      ControllerHolder_1.ControllerHolder.PhotographController.CheckHasSpecifiedFeatureForSave();
    this.GetButton(6)?.RootUIComp.SetUIActive(!e);
  }
  mKi() {
    this.GetItem(31).SetUIActive(!0),
      this.GetButton(29).RootUIComp.SetUIActive(!1),
      this.GetHorizontalLayout(5).RootUIComp.SetUIActive(this.dKi());
    var e = ChannelController_1.ChannelController.GetOpenedShareIds();
    (this.jWi = new GenericLayout_1.GenericLayout(
      this.GetHorizontalLayout(5),
      this.YWi,
    )),
      this.jWi.RefreshByData(e),
      this.GetItem(30).SetUIActive(0 < e.length);
  }
  hKi() {
    this.GetItem(31).SetUIActive(!1),
      this.GetItem(30).SetUIActive(!0),
      this.GetButton(29).RootUIComp.SetUIActive(!0),
      this.GetHorizontalLayout(5).RootUIComp.SetUIActive(!1);
  }
  aKi() {
    this.GetItem(30).SetUIActive(!1),
      this.GetButton(29).RootUIComp.SetUIActive(!1),
      this.GetHorizontalLayout(5).RootUIComp.SetUIActive(!1);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnEntityCameraFinished,
      this.sKi,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnFirstShare,
        this.lKi,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnEntityCameraFinished,
      this.sKi,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnFirstShare,
        this.lKi,
      );
  }
  OnAfterShow() {
    this.CKi();
  }
  OnBeforeDestroy() {
    UE.KuroRenderingRuntimeBPPluginBPLibrary.ReleaseGetSceneColorShotBefore(),
      this.jWi?.ClearChildren(),
      (this.jWi = void 0),
      this.av();
  }
  gKi() {
    var e = this.GetItem(this.WWi ? 11 : 23),
      t = this.GetItem(this.WWi ? 12 : 24),
      e = e.GetPositionInViewPort(!0),
      t = t.GetPositionInViewPort(!0);
    return [e.X, e.Y, t.X, t.Y];
  }
  CKi() {
    this.UiViewSequence?.PlaySequence("ScreenShot");
  }
  zWi(e, t, i) {
    var r = TimeUtil_1.TimeUtil.GetServerTime(),
      r = TimeUtil_1.TimeUtil.DateFormatString2(r) + ".png",
      o = this.gKi(),
      r = ((this.KWi = this.fKi(r)), UE.BlueprintPathsLibrary.ProjectUserDir()),
      r = r + this.KWi,
      r = ScreenShotManager_1.ScreenShotManager.PrepareTakeScreenshot(
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
  oKi() {
    1 === PhotographController_1.PhotographController.CameraCaptureType
      ? (PhotographController_1.PhotographController.IsLastChecked &&
          PhotographController_1.PhotographController.SubmitQuest(),
        UiManager_1.UiManager.CloseView("PhotoSaveView"),
        PhotographController_1.PhotographController.ClosePhotograph())
      : UiManager_1.UiManager.CloseView("PhotoSaveView");
  }
  fKi(e) {
    return "" + ModelManager_1.ModelManager.PhotographModel.SavePath + e;
  }
  av() {
    (this.IAr = 0),
      (this.TAr = 0),
      (this.LAr = void 0),
      UiLayer_1.UiLayer.SetLayerActive(UiLayerType_1.ELayerType.Float, !0),
      UiLayer_1.UiLayer.SetLayerActive(UiLayerType_1.ELayerType.Pop, !0),
      LoadingController_1.LoadingController.UpdateUidViewShow(),
      UiManager_1.UiManager.IsViewShow("PhotographView") ||
        UiLayer_1.UiLayer.SetLayerActive(UiLayerType_1.ELayerType.HUD, !0),
      ScreenShotManager_1.ScreenShotManager.ResetScreenShot();
  }
}
exports.PhotoSaveView = PhotoSaveView;
//# sourceMappingURL=PhotoSaveView.js.map
