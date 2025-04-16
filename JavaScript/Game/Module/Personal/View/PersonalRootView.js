"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PersonalRootView = void 0);
const UE = require("ue"),
  AudioSystem_1 = require("../../../../Core/Audio/AudioSystem"),
  Log_1 = require("../../../../Core/Common/Log"),
  Time_1 = require("../../../../Core/Common/Time"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  BackgroundCardById_1 = require("../../../../Core/Define/ConfigQuery/BackgroundCardById"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  FNameUtil_1 = require("../../../../Core/Utils/FNameUtil"),
  Platform_1 = require("../../../../Launcher/Platform/Platform"),
  PlatformSdkManagerNew_1 = require("../../../../Launcher/Platform/PlatformSdk/PlatformSdkManagerNew"),
  CameraController_1 = require("../../../Camera/CameraController"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  RedDotController_1 = require("../../../RedDot/RedDotController"),
  RenderModuleController_1 = require("../../../Render/Manager/RenderModuleController"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  UiLayer_1 = require("../../../Ui/UiLayer"),
  UiManager_1 = require("../../../Ui/UiManager"),
  CommonInputViewController_1 = require("../../Common/InputView/Controller/CommonInputViewController"),
  PlayerTitleItem_1 = require("../../Common/PlayerTitleItem"),
  GachaScanView_1 = require("../../Gacha/GachaResultView/GachaScanView"),
  QuickRoleSelectView_1 = require("../../RoleSelect/QuickRoleSelectView"),
  ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
  UiModelResourcesManager_1 = require("../../UiComponent/UiModelResourcesManager"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  WorldLevelController_1 = require("../../WorldLevel/WorldLevelController"),
  PersonalController_1 = require("../Controller/PersonalController"),
  PersonalDefine_1 = require("../Model/PersonalDefine"),
  PersonalUtil_1 = require("../Model/PersonalUtil"),
  PersonalRoleDisplayMediumItem_1 = require("./PersonalRoleDisplayMediumItem");
class PersonalRootView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.hVi = void 0),
      (this.lVi = void 0),
      (this._Vi = []),
      (this.nVi = 0),
      (this.cVi = new Map()),
      (this.Vha = new Map()),
      (this.p5i = void 0),
      (this.Qma = void 0),
      (this.Kma = void 0),
      (this.gKt = void 0),
      (this.Hha = void 0),
      (this.L6e = 0),
      (this.C4_ = !1),
      (this.gLt = void 0),
      (this.nFe = () => {
        var e =
          new PersonalRoleDisplayMediumItem_1.PersonalRoleDisplayMediumItem();
        return e.BindClickItemCallBack(this.OnRoleItemClick), e;
      }),
      (this.jha = () => {
        ModelManager_1.ModelManager.PlayerInfoModel.GetId() ===
        this.p5i.PlayerId
          ? ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
              "CopiedMyUid",
            )
          : ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
              "CopyOtherUID",
            ),
          UE.LGUIBPLibrary.ClipBoardCopy(this.p5i.PlayerId.toString());
      }),
      (this.OnWorldLevelChange = () => {
        this.yVi();
      }),
      (this.OnSignChange = () => {
        this.pVi();
      }),
      (this.OnNameChange = () => {
        this.vVi();
      }),
      (this.OnBirthChange = () => {
        this.CVi();
      }),
      (this.OnRoleShowListChange = () => {}),
      (this.OnHeadIconChange = () => {
        this.MVi();
      }),
      (this.OnCardChange = () => {
        this.RefreshCard();
      }),
      (this.OnPlayerTitleChange = () => {
        this.RefreshPlayerTitle();
      }),
      (this.OnClickDetailButton = () => {
        this.p5i.IsOtherData ||
          UiManager_1.UiManager.OpenView("PersonalOptionView");
      }),
      (this.OnClickSignButton = () => {
        this.p5i.IsOtherData ||
          CommonInputViewController_1.CommonInputViewController.OpenPersonalSignInputView();
      }),
      (this.OnClickWorldLevelTipsButton = () => {
        WorldLevelController_1.WorldLevelController.OpenWorldLevelInfoView();
      }),
      (this.OnClickCloseButton = () => {
        this.CloseMe();
      }),
      (this.OnClickRenameButton = () => {
        CommonInputViewController_1.CommonInputViewController.OpenSetRoleNameInputView();
      }),
      (this.OnClickShowViewToggle = (e) => {
        1 === e
          ? (this.UiViewSequence.StopPrevSequence(!0),
            this.PlaySequence("CloseView", () => {
              this.GetItem(20)?.SetUIActive(!1);
            }))
          : (this.UiViewSequence.StopPrevSequence(!0),
            this.PlaySequence("StartView"),
            this.GetItem(20).SetUIActive(!0));
      }),
      (this.OnCanShowToggleExecuteChange = () =>
        !this.UiViewSequence.IsInSequence()),
      (this.OnClickPersonalCardButton = () => {
        UiManager_1.UiManager.OpenView("PersonalCardView", this.p5i);
      }),
      (this.OnClickExchangePreviewRoleButton = () => {
        var e;
        UiManager_1.UiManager.IsViewOpen("QuickRoleSelectView") ||
          (ModelManager_1.ModelManager.PersonalModel.SetPersonalTipState(!1),
          this.BNe(),
          (e = ModelManager_1.ModelManager.RoleModel.GetRoleList()),
          ((e = new QuickRoleSelectView_1.QuickRoleSelectViewData(
            5,
            this._Vi,
            e,
          )).OnWaitLoadingConfirm = this.OnWaitLoadingConfirmCallBack),
          (e.OnRoleSelectFull = this.OnRoleSelectFull),
          (e.OnBack = this.y5t),
          UiManager_1.UiManager.OpenView("PersonalQuickRoleSelectView", e));
      }),
      (this.OnWaitLoadingConfirmCallBack = async (e) => {
        (await PersonalController_1.PersonalController.SendRoleShowListUpdateRequestAsync(
          e,
        )) && (await this.Wha(e), this.RefreshRoleShowList(e, !1), this.BNe());
      }),
      (this.y5t = () => {
        this.BNe();
      }),
      (this.OnRoleItemClick = (t) => {
        var e;
        this.nVi !== t &&
          this.CheckClickInterval() &&
          ((this.nVi = t),
          (e = this._Vi.findIndex((e) => e === t)),
          this.hVi.SelectGridProxy(e),
          this.gVi(t, !1),
          (this.L6e = Time_1.Time.Now));
      }),
      (this.OnRoleSelectFull = () => {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
          "DisplayFull_text",
        );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIText],
      [2, UE.UIButtonComponent],
      [3, UE.UITexture],
      [4, UE.UITexture],
      [5, UE.UIText],
      [6, UE.UIText],
      [7, UE.UIText],
      [8, UE.UIText],
      [9, UE.UIText],
      [10, UE.UIHorizontalLayout],
      [11, UE.UIButtonComponent],
      [12, UE.UIButtonComponent],
      [13, UE.UIButtonComponent],
      [14, UE.UIButtonComponent],
      [15, UE.UIItem],
      [16, UE.UIExtendToggle],
      [17, UE.UIButtonComponent],
      [18, UE.UIButtonComponent],
      [19, UE.UIItem],
      [20, UE.UIItem],
      [21, UE.UIItem],
      [22, UE.UIText],
      [23, UE.UIItem],
      [24, UE.UISprite],
      [25, UE.UISprite],
      [26, UE.UIItem],
      [27, UE.UITexture],
      [28, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [0, this.jha],
        [2, this.OnClickDetailButton],
        [11, this.OnClickSignButton],
        [12, this.OnClickWorldLevelTipsButton],
        [13, this.OnClickCloseButton],
        [14, this.OnClickRenameButton],
        [16, this.OnClickShowViewToggle],
        [17, this.OnClickPersonalCardButton],
        [18, this.OnClickExchangePreviewRoleButton],
      ]);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnSignChange,
      this.OnSignChange,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnNameChange,
        this.OnNameChange,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRoleShowListChange,
        this.OnRoleShowListChange,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnHeadIconChange,
        this.OnHeadIconChange,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnCardChange,
        this.OnCardChange,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnBirthChange,
        this.OnBirthChange,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CurWorldLevelChange,
        this.OnWorldLevelChange,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnPlayerTitleChange,
        this.OnPlayerTitleChange,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnSignChange,
      this.OnSignChange,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnNameChange,
        this.OnNameChange,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRoleShowListChange,
        this.OnRoleShowListChange,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnHeadIconChange,
        this.OnHeadIconChange,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnCardChange,
        this.OnCardChange,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnBirthChange,
        this.OnBirthChange,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CurWorldLevelChange,
        this.OnWorldLevelChange,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnPlayerTitleChange,
        this.OnPlayerTitleChange,
      );
  }
  async OnBeforeStartAsync() {
    (this.C4_ =
      0 ===
      UE.KismetSystemLibrary.GetConsoleVariableIntValue(
        "r.SkyBlending.AllowSettingLerpPerFrame",
      )),
      this.C4_ &&
        UE.KuroSequencePerformanceManager.SimpleExecuteCommand(
          "r.SkyBlending.AllowSettingLerpPerFrame 1",
        ),
      (this.p5i = this.OpenParam);
    var e = [];
    for (const t of this.p5i.RoleShowList) e.push(t.Q6n);
    await this.Wha(e),
      (this.gLt = new PlayerTitleItem_1.PlayerTitleItem()),
      await this.gLt.CreateThenShowByActorAsync(this.GetItem(26).GetOwner());
  }
  async Wha(e) {
    var t = [];
    for (const i of e)
      0 < i &&
        !this.cVi.has(i) &&
        t.push(
          PersonalUtil_1.PersonalUtil.PreloadRoleSequence(
            i,
            this.cVi,
            this.Vha,
          ),
        );
    await Promise.all(t);
  }
  OnStart() {
    (this.hVi = new GenericLayout_1.GenericLayout(
      this.GetHorizontalLayout(10),
      this.nFe,
    )),
      Platform_1.Platform.IsPs5Platform() &&
        (this.GetButton(0)?.SetSelfInteractive(!1),
        this.GetSprite(24)?.SetUIActive(!1),
        this.GetSprite(25)?.SetUIActive(!1)),
      this.SVi(),
      this.yVi(),
      this.IVi(),
      this.CVi(),
      this.vVi(),
      this.pVi(),
      this.MVi(),
      this.RefreshCard(),
      this.RefreshPlayerTitle(),
      this.Nxa(),
      this.RefreshButtonState(),
      this.BNe(),
      this.GetExtendToggle(16).CanExecuteChange.Bind(
        this.OnCanShowToggleExecuteChange,
      );
  }
  OnHandleLoadScene() {
    (this.gKt = CameraController_1.CameraController.Model.CurrentCameraActor),
      (this.Qma = UE.KuroCollectActorComponent.GetActorWithTag(
        FNameUtil_1.FNameUtil.GetDynamicFName("SceneCamera1"),
        0,
      )),
      (this.Kma = UE.KuroCollectActorComponent.GetActorWithTag(
        FNameUtil_1.FNameUtil.GetDynamicFName("personal"),
        0,
      )),
      (this.Hha = UE.KuroCollectActorComponent.GetActorWithTag(
        FNameUtil_1.FNameUtil.GetDynamicFName("UpdateInteractBP"),
        0,
      )),
      this.Hha.SetTickableWhenPaused(!0);
  }
  OnBeforeShow() {
    var e = [];
    for (const t of this.p5i.RoleShowList) e.push(t.Q6n);
    this.RefreshRoleShowList(e, !0), this.K8e();
  }
  RefreshRoleShowList(t, e) {
    var i,
      r = CommonParamById_1.configCommonParamById.GetIntConfig(
        "role_show_list_max_count",
      );
    this._Vi = [];
    for (let e = 0; e < r; e++)
      e < t.length ? ((i = t[e]), this._Vi.push(i)) : this._Vi.push(-1);
    var s = [];
    for (const n of this._Vi) {
      var o =
        new PersonalRoleDisplayMediumItem_1.PersonalRoleDisplayContentData();
      (o.RoleId = n), (o.IfOtherData = this.p5i.IsOtherData), s.push(o);
    }
    this.hVi.RefreshByData(s, () => {
      0 < this._Vi.length && 0 < this._Vi[0]
        ? ((this.nVi = this._Vi[0]),
          this.hVi.SelectGridProxy(0),
          this.gVi(this.nVi, e),
          this.GetItem(15).SetUIActive(!1))
        : (this.lVi &&
            (this.lVi.Pause(),
            this.lVi.GoToEndAndStop(0),
            AudioSystem_1.AudioSystem.PostEvent(
              PersonalDefine_1.STOP_AUDIO_EVENT_NAME,
            )),
          this.Hha?.UpdateGachaShowItem(3, 4),
          CameraController_1.CameraController.SetViewTarget(
            this.Kma,
            "RoleNewJoinView.SceneEmptyCamera",
          ),
          this.GetItem(15).SetUIActive(!0));
    });
  }
  OnBeforeHide() {
    this.Ovt();
  }
  OnBeforeDestroy() {
    this.lVi &&
      (this.lVi.Pause(),
      this.lVi.GoToEndAndStop(0),
      AudioSystem_1.AudioSystem.PostEvent(
        PersonalDefine_1.STOP_AUDIO_EVENT_NAME,
      )),
      this.Hha?.EndGachaScene(),
      CameraController_1.CameraController.SetViewTarget(
        this.gKt,
        "PersonalRootView.OnBeforeDestroy",
      );
    for (const e of this.cVi.values()) UE.KuroActorManager.DestroyActor(e);
    this.cVi.clear();
    for (const t of this.Vha.values())
      UiModelResourcesManager_1.UiModelResourcesManager.ReleaseMeshesComponentsBundleStreaming(
        t,
      );
    this.Vha.clear(),
      UE.KuroSequencePerformanceManager.CloseKuroPerformanceMode(),
      this.C4_ &&
        UE.KuroSequencePerformanceManager.SimpleExecuteCommand(
          "r.SkyBlending.AllowSettingLerpPerFrame 0",
        ),
      this.gLt?.Destroy();
  }
  gVi(t, e) {
    if (t && !(t <= 0)) {
      const i = this.cVi.get(t);
      i
        ? this.lVi
          ? (UiLayer_1.UiLayer.SetShowMaskLayer("RoleRootView", !0),
            AudioSystem_1.AudioSystem.PostEvent(
              PersonalDefine_1.STOP_AUDIO_EVENT_NAME,
              void 0,
              {
                CallbackMask: 1,
                CallbackHandler: (e) => {
                  0 === e &&
                    (this.lVi?.Pause(),
                    this.lVi?.GoToEndAndStop(0),
                    TimerSystem_1.TimerSystem.Next(() => {
                      this.Kba(t, i),
                        UiLayer_1.UiLayer.SetShowMaskLayer("RoleRootView", !1);
                    }));
                },
              },
            ))
          : this.Kba(t, i)
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Personal",
            58,
            "PersonalRootView 未找到SequenceActor",
            ["roleId", t.toString()],
          );
    }
  }
  Kba(e, t) {
    var i = ConfigManager_1.ConfigManager.GachaConfig.GetGachaTextureInfo(e);
    if (i) {
      var r = t.GetSequence(),
        r =
          (UE.KuroSequencePerformanceManager.CloseKuroPerformanceMode(),
          UE.KuroSequencePerformanceManager.OpenKuroPerformanceMode(r),
          CameraController_1.CameraController.SetViewTarget(
            this.Qma,
            "RoleNewJoinView.SceneSequenceCamera",
          ),
          (t.bOverrideInstanceData = !0),
          t.SetTickableWhenPaused(
            !ModelManager_1.ModelManager.GameModeModel.IsMulti,
          ),
          t.AddBindingByTag(GachaScanView_1.SCENE_CAMERA_TAG, this.Qma, !1, !0),
          t.DefaultInstanceData);
      const s = UE.KismetMathLibrary.Conv_TransformDoubleToTransform(
        RenderModuleController_1.RenderModuleController.GetKuroCurrentUiSceneTransform(),
      );
      if (((r.TransformOrigin = s), 0 < i.BindPoint?.length))
        r.TransformOriginActor = UE.KuroCollectActorComponent.GetActorWithTag(
          FNameUtil_1.FNameUtil.GetDynamicFName(i.BindPoint),
          1,
        );
      else {
        i = UE.KuroCollectActorComponent.GetActorWithTag(
          FNameUtil_1.FNameUtil.GetDynamicFName("KuroUiSceneRoot"),
          1,
        );
        const s = UE.KismetMathLibrary.Conv_TransformDoubleToTransform(
          i.D_GetTransform(),
        );
        r.TransformOrigin = s;
      }
      (i = ConfigManager_1.ConfigManager.GachaConfig.GetRoleInfoById(e)),
        (r =
          (this.Hha?.UpdateGachaShowItem(e, i.QualityId),
          (this.lVi = t.SequencePlayer),
          this.lVi.GetStartTime().Time));
      this.lVi.SetPlaybackPosition(
        new UE.MovieSceneSequencePlaybackParams(r, 0, "", 0, 1),
      ),
        this.lVi.PlayTo(
          new UE.MovieSceneSequencePlaybackParams(r, 0, "A", 2, 0),
        );
    }
  }
  yVi() {
    var e = this.p5i.IsOtherData
      ? this.p5i.WorldLevel
      : ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel;
    e && LguiUtil_1.LguiUtil.SetLocalText(this.GetText(8), "WorldLevelNum", e);
  }
  IVi() {
    var e = this.p5i.IsOtherData
      ? this.p5i.Level
      : ModelManager_1.ModelManager.FunctionModel.GetPlayerLevel();
    e && LguiUtil_1.LguiUtil.SetLocalText(this.GetText(9), "PlayerLevelNum", e);
  }
  CVi() {
    var e,
      t,
      i,
      r = this.GetText(7);
    (this.p5i.IsOtherData && !this.p5i.IsBirthdayDisplay) ||
    ((e = this.p5i.Birthday), (t = Math.floor(e / 100)), (i = e % 100), 0 === e)
      ? LguiUtil_1.LguiUtil.SetLocalText(r, "BirthDay", "--", "--")
      : LguiUtil_1.LguiUtil.SetLocalText(r, "BirthDay", t, i);
  }
  vVi() {
    var e = this.p5i.IsOtherData
      ? this.p5i.Name
      : ModelManager_1.ModelManager.FunctionModel.GetPlayerName();
    e && this.GetText(5).SetText(e);
  }
  pVi() {
    var e = this.p5i.Signature,
      t = this.p5i.IsOtherData,
      i = this.GetText(6);
    e || t
      ? i.SetText(e)
      : LguiUtil_1.LguiUtil.SetLocalText(i, "ClickToSetSign");
  }
  MVi() {
    var e = this.GetTexture(4),
      t = this.p5i.HeadPhotoId,
      i = ModelManager_1.ModelManager.PersonalModel.GetPlayerHeadData(t, !1);
    i
      ? (this.SetTextureByPath(i.GetRoleHeadIconCircle(), e), e.SetUIActive(!0))
      : 0 < t &&
        ((i = ConfigManager_1.ConfigManager.RoleConfig.GetRoleHeadIcon(t)),
        this.SetRoleIcon(i, e, t));
  }
  SVi() {
    LguiUtil_1.LguiUtil.SetLocalText(
      this.GetText(1),
      "UserId",
      (this.p5i.IsOtherData
        ? this.p5i
        : ModelManager_1.ModelManager.FunctionModel
      ).PlayerId,
    );
  }
  RefreshCard() {
    var e = this.p5i.CurCardId;
    e &&
      (e = BackgroundCardById_1.configBackgroundCardById.GetConfig(e)) &&
      this.SetTextureByPath(e.FunctionViewCardPath, this.GetTexture(3));
  }
  Nxa() {
    var e;
    PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.NeedShowThirdPartyId()
      ? ((e =
          "" !==
          (this.p5i.IsOtherData
            ? this.p5i?.PsnUserId
            : ModelManager_1.ModelManager.PlayerInfoModel.GetThirdPartyUserId())),
        this.GetItem(21)?.SetUIActive(e),
        this.GetTexture(27)?.SetUIActive(e),
        this.GetItem(28)?.SetUIActive(!e),
        e &&
          ((e = this.p5i.IsOtherData
            ? (this.p5i?.PsnOnlineId ?? "")
            : ModelManager_1.ModelManager.PlayerInfoModel.GetThirdPartyOnlineId()),
          this.GetText(22)?.SetText(e)))
      : (this.GetItem(21)?.SetUIActive(!1),
        this.GetTexture(27)?.SetUIActive(!1),
        this.GetItem(28)?.SetUIActive(!1));
  }
  RefreshButtonState() {
    var e = !this.p5i.IsOtherData;
    this.GetButton(11).SetSelfInteractive(e),
      this.GetButton(2).SetSelfInteractive(e),
      this.GetButton(12).RootUIComp.SetUIActive(e),
      this.GetButton(14).RootUIComp.SetUIActive(e),
      this.GetButton(18).RootUIComp.SetUIActive(e);
  }
  BNe() {
    var e =
      ModelManager_1.ModelManager.PersonalModel.CheckCanShowPersonalTip() &&
      !this.p5i.IsOtherData;
    this.GetItem(23).SetUIActive(e);
  }
  K8e() {
    this.p5i.IsOtherData ||
      RedDotController_1.RedDotController.BindRedDot(
        "PersonalCard",
        this.GetItem(19),
      );
  }
  Ovt() {
    this.p5i.IsOtherData ||
      RedDotController_1.RedDotController.UnBindGivenUi(
        "PersonalCard",
        this.GetItem(19),
      );
  }
  CheckClickInterval() {
    var e = CommonParamById_1.configCommonParamById.GetIntConfig(
      "IndividualizationRoleSwitchIntervalTime",
    );
    return Time_1.Time.Now - this.L6e >= e;
  }
  RefreshPlayerTitle() {
    var e = this.p5i.CurPlayerTitleId,
      t = this.p5i.CurPlayerTitleLevel,
      i = this.p5i.Sex;
    this.gLt?.Refresh(e, t, i);
  }
}
exports.PersonalRootView = PersonalRootView;
//# sourceMappingURL=PersonalRootView.js.map
