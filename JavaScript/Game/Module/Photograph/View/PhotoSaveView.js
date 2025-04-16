"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PhotoSaveView = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Info_1 = require("../../../../Core/Common/Info"),
  Log_1 = require("../../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  ShareRewardById_1 = require("../../../../Core/Define/ConfigQuery/ShareRewardById"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  BaseConfigController_1 = require("../../../../Launcher/BaseConfig/BaseConfigController"),
  Platform_1 = require("../../../../Launcher/Platform/Platform"),
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
  Spring25SharePanel_1 = require("../../Activity/ActivityContent/Spring25/View/Spring25SharePanel"),
  VersionPreheatSharePanel_1 = require("../../Activity/ActivityContent/VersionPreheat/View/VersionPreheatSharePanel"),
  ChannelController_1 = require("../../Channel/ChannelController"),
  ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
  FragmentMemoryShareView_1 = require("../../FragmentMemory/FragmentMemoryShareView"),
  GachaShareOnePanel_1 = require("../../Gacha/GachaResultView/GachaShareOnePanel"),
  GachaShareTenPanel_1 = require("../../Gacha/GachaResultView/GachaShareTenPanel"),
  LoadingController_1 = require("../../Loading/LoadingController"),
  ScreenShotManager_1 = require("../../ScreenShot/ScreenShotManager"),
  RoleSkinShareView_1 = require("../../Skin/RoleSkinShareView"),
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
      (this.x4_ = !1),
      (this.KWi = ""),
      (this.QWi = void 0),
      (this.XWi = void 0),
      (this.tBn = void 0),
      (this.dyl = void 0),
      (this.aul = void 0),
      (this.o5l = void 0),
      (this.$Wi = 1),
      (this.IAr = 0),
      (this.TAr = 0),
      (this.LAr = void 0),
      (this.f5_ = 0),
      (this.g5_ = 0),
      (this.C5_ = void 0),
      (this.U4_ = void 0),
      (this.p5_ = !1),
      (this.YWi = () => {
        var e = new PhotoShareBtnItem_1.PhotoShareBtnItem();
        return e.SetClickCallBack(this.JWi), e;
      }),
      (this.JWi = (r, o) => {
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Photo", 58, "点击分享截图按钮"),
          this.zWi(!1, (e, t, i) => {
            var h = (0, puerts_1.$ref)(void 0),
              h =
                (UE.KuroGameScreenshotBPLibrary.CompressConvertColorsToBitmap(
                  e,
                  t,
                  i,
                  h,
                ),
                (0, puerts_1.$unref)(h));
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Photo",
                58,
                "截图完成，压缩截图结果进行分享",
                ["width", e],
                ["height", t],
                ["ColorSize", i?.Num()],
                ["bitMapSize", h?.Num()],
              ),
              ChannelController_1.ChannelController.ShareChannel(
                r,
                h,
                this.$Wi,
                o,
              );
          });
      }),
      (this.ZWi = () => {
        var e;
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Photo", 58, "点击保存截图按钮"),
          ControllerHolder_1.ControllerHolder.KuroSdkController.CheckPhotoPermission()
            ? this.zWi(!1, this.eKi, this.DAr, this.MJl)
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
        e ? this.zWi(!1, this.eKi, this.DAr) : this.tKi();
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
          (this.LAr
            ? this.p5_ &&
              ((this.LAr = this.C5_),
              (this.IAr = this.f5_),
              (this.TAr = this.g5_))
            : ((this.IAr = e), (this.TAr = t), (this.LAr = i)),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Photo",
              58,
              "截图完成，截图结果进行保存",
              ["width", e],
              ["height", t],
              ["ColorSize", i?.Num()],
            ),
          Info_1.Info.PlatformType)
        ) {
          case 2:
            var h = (0, puerts_1.$ref)(void 0),
              h =
                (UE.KuroGameScreenshotBPLibrary.ConvertColorsToBitmap(
                  this.IAr,
                  this.TAr,
                  this.LAr,
                  h,
                ),
                (0, puerts_1.$unref)(h));
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Photo", 58, "截图保存至Android相册", [
                "bitmapSize",
                h?.Num(),
              ]),
              UE.KuroGameScreenshotBPLibrary.SaveColorArrayToAndroidAlbum(
                this.IAr,
                this.TAr,
                h,
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
                    58,
                    "没有获得IOS相册权限，请求权限，请求完成后再次尝试截图",
                  ),
                void ScreenShotManager_1.ScreenShotManager.RequestIOSPhotoLibraryAuthorization()
              );
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Photo", 58, "截图保存IOS相册", [
                "colors",
                this.LAr?.Num(),
              ]),
              UE.KuroGameScreenshotBPLibrary.SaveColorArrayToIosAlbum(
                this.IAr,
                this.TAr,
                this.LAr,
              ),
              ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                "SaveGalleryPathTips",
              );
            break;
          case 8:
            break;
          default:
            (h = this.EJl()),
              (h =
                ((this.KWi = this.fKi(h)),
                UE.BlueprintPathsLibrary.ProjectUserDir())),
              (h = h + this.KWi);
            UE.KuroGameScreenshotBPLibrary.SaveScreenshot(
              h,
              this.IAr,
              this.TAr,
              this.LAr,
            ),
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("Photo", 58, "截图保存至游戏安装文件夹", [
                  "path",
                  this.KWi,
                ]),
              Platform_1.Platform.IsCloudGame() ||
                ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                  "SavePathTips",
                  this.KWi,
                );
        }
        this.oKi();
      }),
      (this.MJl = (e) => {
        var t;
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Photo", 58, "PS Test OnPhotoCompressed"),
          8 === Info_1.Info.PlatformType &&
            ((t = this.EJl()), UE.GameplayStatics.ExportPngPhotoFromData(e, t));
      }),
      (this.DAr = (e) => {
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Photo",
            58,
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
        PhotographController_1.PhotographController.UpdateMissionOptionToFinished(
          !1,
        ),
          this.CloseMe();
      }),
      (this.nKi = (e) => {
        LocalStorage_1.LocalStorage.SetGlobal(
          LocalStorageDefine_1.ELocalStorageGlobalKey
            .PhotoAndShareShowPlayerName,
          e,
        ),
          (this.p5_ = e),
          this.QWi?.SetUiActive(e);
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
          !PhotographController_1.PhotographController.CheckIfInEntityCamera() &&
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
      [37, UE.UITexture],
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
    this.GetItem(7)?.SetUIActive(!1);
    var e = this.OpenParam,
      t =
        ((this.WWi = void 0 === e.HandBookPhotoData),
        (this.x4_ = e.PrepareFullScreenShot),
        []),
      t =
        ((this.QWi = new PhotoSaveMarkItem_1.PhotoSaveMarkItem()),
        e.LogoConfigName && (this.QWi.LogoConfigName = e.LogoConfigName),
        e.DateText
          ? (this.GetItem(21).SetUIActive(!1),
            (this.QWi.DateText = e.DateText),
            t.push(
              this.QWi.CreateThenShowByResourceIdAsync(
                "UiItem_PhotoSharePlayerInfoNew",
                this.GetTexture(0),
              ),
            ))
          : t.push(
              this.QWi.CreateThenShowByActorAsync(
                this.GetItem(this.WWi ? 21 : 22).GetOwner(),
              ),
            ),
        e.GachaData && t.push(this._Ki(e.GachaData)),
        e.FragmentMemory && t.push(this.iBn(e.FragmentMemory)),
        e.RoleSkinData && t.push(this.Cyl(e.RoleSkinData)),
        e.VersionPreheat &&
          (await this.SetTextureAsync(
            e.VersionPreheat.PhotoPath,
            this.GetTexture(0),
          ),
          t.push(this.lul(e.VersionPreheat))),
        e.Spring25Data && t.push(this.n5l(e.Spring25Data)),
        await Promise.all(t),
        e.ExternalTexture),
      t =
        (t && t.IsValid()
          ? (this.GetTexture(37).SetUIActive(!0),
            this.GetTexture(37).SetTexture(t))
          : this.GetTexture(37).SetUIActive(!1),
        (this.p5_ = LocalStorage_1.LocalStorage.GetGlobal(
          LocalStorageDefine_1.ELocalStorageGlobalKey
            .PhotoAndShareShowPlayerName,
          !0,
        )),
        this.p5_ ? 1 : 0),
      i = this.WWi ? 34 : 35;
    this.GetExtendToggle(i)?.SetToggleState(t),
      e.ShareId && 0 < e.ShareId
        ? (this.$Wi = e.ShareId)
        : this.WWi
          ? e.GachaData
            ? 1 !== e.GachaData.length
              ? (this.$Wi = 5)
              : ((i = ConfigManager_1.ConfigManager.GachaConfig.GetItemIdType(
                  e.GachaData[0].e9n.L8n,
                )),
                (this.$Wi = 2 === i ? 4 : 3))
            : (this.$Wi = 1)
          : (this.$Wi = 2),
      e.Spring25Data
        ? this._U_()
        : this.WWi
          ? this.uKi()
          : this.cKi(e.HandBookPhotoData),
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
  async Cyl(e) {
    (this.dyl = new RoleSkinShareView_1.RoleSkinShareView()),
      (this.dyl.OpenParam = e);
    e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
      "UiItem_ObtainSkinShare",
    );
    await this.dyl.OnlyCreateByPathAsync(e, this.GetItem(36)),
      this.AddChild(this.dyl);
  }
  async lul(e) {
    (this.aul = new VersionPreheatSharePanel_1.VersionPreheatSharePanel()),
      (this.aul.OpenParam = e);
    e =
      ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
        "UiItem_MemoryShare",
      );
    await this.aul.OnlyCreateByPathAsync(e, this.GetItem(36)),
      this.AddChild(this.aul);
  }
  async n5l(e) {
    (this.o5l = new Spring25SharePanel_1.Spring25SharePanel()),
      (this.o5l.OpenParam = e);
    e =
      ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
        "UiItem_MemoryShare",
      );
    await this.o5l.OnlyCreateByPathAsync(e, this.GetItem(36)),
      this.AddChild(this.o5l);
  }
  uKi() {
    this.GetItem(14).SetUIActive(!0), this.GetItem(15).SetUIActive(!1);
    var e = this.GetItem(13),
      t = this.GetItem(7),
      i = this.GetText(10),
      h = UE.WidgetLayoutLibrary.GetViewportSize(GlobalData_1.GlobalData.World),
      r = UE.WidgetLayoutLibrary.GetViewportScale(
        GlobalData_1.GlobalData.World,
      );
    1 === this.$Wi
      ? (e.SetWidth(h.X / (r * PhotographDefine_1.SCREEN_SHOT_TEXTURE_SCALE)),
        e.SetHeight(h.Y / (r * PhotographDefine_1.SCREEN_SHOT_TEXTURE_SCALE)))
      : (e.SetWidth(PhotographDefine_1.DEFAULT_SHARE_WIDTH),
        e.SetHeight(PhotographDefine_1.DEFAULT_SHARE_HEIGHT)),
      PhotographController_1.PhotographController.CheckIfInNormalCamera()
        ? (i.SetUIActive(!1), t.SetUIActive(!1), this.mKi())
        : PhotographController_1.PhotographController.CheckIfInEntityCamera()
          ? (i.SetUIActive(!0), t.SetUIActive(!0), this.aKi())
          : PhotographController_1.PhotographController.CheckIfInTogetherCamera() &&
            (i.SetUIActive(!1), t.SetUIActive(!1), this.mKi()),
      this.vNn();
  }
  cKi(e) {
    this.GetItem(14).SetUIActive(!1),
      this.GetItem(15).SetUIActive(!0),
      this.GetItem(7).SetUIActive(!1),
      this.mKi(),
      this.vNn();
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
  D4_(e) {
    var t = this.GetItem(14),
      i =
        (t.SetUIActive(!0), this.GetItem(15).SetUIActive(!1), this.GetItem(13)),
      h = UE.WidgetLayoutLibrary.GetViewportSize(GlobalData_1.GlobalData.World),
      r = UE.WidgetLayoutLibrary.GetViewportScale(
        GlobalData_1.GlobalData.World,
      );
    e
      ? (i.SetWidth(h.X / r),
        i.SetHeight(h.Y / r),
        (this.U4_ = t.K2_GetComponentScale()),
        (e = new UE.Vector(1, 1, 1)),
        t.SetUIItemScale(e),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnPreparePhotoScreenShot,
          !1,
        ))
      : (i.SetWidth(h.X / (r * PhotographDefine_1.SCREEN_SHOT_TEXTURE_SCALE)),
        i.SetHeight(h.Y / (r * PhotographDefine_1.SCREEN_SHOT_TEXTURE_SCALE)),
        t.SetUIItemScale(this.U4_),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnPreparePhotoScreenShot,
          !0,
        ));
  }
  v5_(e) {
    e ? this.QWi?.SetUiActive(!this.p5_) : this.QWi?.SetUiActive(this.p5_);
  }
  _U_() {
    this.GetItem(14).SetUIActive(!0), this.GetItem(15).SetUIActive(!1);
    var e = this.GetItem(13),
      t = this.GetItem(7),
      i = this.GetText(10),
      h = UE.WidgetLayoutLibrary.GetViewportSize(GlobalData_1.GlobalData.World),
      r = UE.WidgetLayoutLibrary.GetViewportScale(
        GlobalData_1.GlobalData.World,
      );
    1 === this.$Wi
      ? (e.SetWidth(h.X / (r * PhotographDefine_1.SCREEN_SHOT_TEXTURE_SCALE)),
        e.SetHeight(h.Y / (r * PhotographDefine_1.SCREEN_SHOT_TEXTURE_SCALE)))
      : (e.SetWidth(PhotographDefine_1.DEFAULT_SHARE_WIDTH),
        e.SetHeight(PhotographDefine_1.DEFAULT_SHARE_HEIGHT)),
      i.SetUIActive(!1),
      t.SetUIActive(!1),
      this.mKi(),
      this.vNn();
  }
  dKi() {
    return !BaseConfigController_1.BaseConfigController.GetIosAuditFirstDownloadTip();
  }
  vNn() {
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
    this.x4_
      ? (this.D4_(!0),
        this.v5_(!0),
        TimerSystem_1.TimerSystem.Next(() => {
          this.B4_(!0, () => {
            this.v5_(!1),
              TimerSystem_1.TimerSystem.Next(() => {
                this.B4_(!1, () => {
                  this.D4_(!1), this.CKi();
                });
              });
          });
        }))
      : this.CKi();
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
      t = t.GetPositionInViewPort(!0),
      i = UE.WidgetLayoutLibrary.GetViewportSize(GlobalData_1.GlobalData.World);
    return [
      e.X < 0 ? 0 : e.X,
      e.Y < 0 ? 0 : e.Y,
      (t.X < i.X ? t : i).X,
      (t.Y < i.Y ? t : i).Y,
    ];
  }
  CKi() {
    this.UiViewSequence?.PlaySequence("ScreenShot");
  }
  EJl() {
    var e = TimeUtil_1.TimeUtil.GetServerTime();
    return TimeUtil_1.TimeUtil.DateFormatString2(e) + ".png";
  }
  B4_(h, r) {
    var e = this.gKi(),
      e = ScreenShotManager_1.ScreenShotManager.PrepareTakeScreenshot(
        "",
        e[0],
        e[1],
        e[2],
        e[3],
        !1,
      );
    e &&
      (e.OnTakeScreenshotCapturedDelegate.Clear(),
      e.OnTakeScreenshotCapturedDelegate.Add((e, t, i) => {
        (this.p5_ && h) || (!this.p5_ && !h)
          ? ((this.LAr = i), (this.IAr = e), (this.TAr = t))
          : ((this.C5_ = i), (this.f5_ = e), (this.g5_ = t)),
          r();
      }),
      e.TakeScreenshot());
  }
  zWi(e, t, i, h) {
    var r = this.EJl(),
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
      h && r.OnTakeScreenshotCompressedDelegate.Add(h),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Photo", 58, "开始截图", ["isSaveFile", e]),
      r.TakeScreenshot());
  }
  oKi() {
    PhotographController_1.PhotographController.CheckIfInEntityCamera()
      ? (UiManager_1.UiManager.CloseView("PhotoSaveView"),
        PhotographController_1.PhotographController.ClosePhotograph(!0))
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
