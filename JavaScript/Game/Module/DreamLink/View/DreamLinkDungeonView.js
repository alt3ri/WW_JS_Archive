"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DreamLinkDungeonView = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../../Core/Common/Log"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  FNameUtil_1 = require("../../../../Core/Utils/FNameUtil"),
  Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  ObjectUtils_1 = require("../../../../Core/Utils/ObjectUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  Global_1 = require("../../../Global"),
  GlobalData_1 = require("../../../GlobalData"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
  PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem"),
  UiManager_1 = require("../../../Ui/UiManager"),
  EffectUtil_1 = require("../../../Utils/EffectUtil"),
  CommonItemSmallItemGrid_1 = require("../../Common/ItemGrid/CommonItemSmallItemGrid"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  HelpController_1 = require("../../Help/HelpController"),
  ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
  UiSceneManager_1 = require("../../UiComponent/UiSceneManager"),
  UiModelUtil_1 = require("../../UiModel/UiModelUtil"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  DreamLinkController_1 = require("../DreamLinkController"),
  DreamLinkDungeonRolePanel_1 = require("./DreamLinkDungeonRolePanel"),
  DreamLinkScoreRewardItem_1 = require("./DreamLinkScoreRewardItem"),
  DreamLinkCatProgressItem_1 = require("./SubView/DreamLinkCatProgressItem"),
  CameraController_1 = require("../../../Camera/CameraController"),
  BlackScreenController_1 = require("../../BlackScreen/BlackScreenController"),
  PER_PAGE_COUNT = 3,
  MAX_PAGE_COUNT = 2,
  DOOR_OPEN_SEQUENCE_PATH =
    "/Game/Aki/Map/UISceneLevel/UI_Scene/LevelSequence/Ani_Door.Ani_Door",
  DOOR_CLOSE_SEQUENCE_PATH =
    "/Game/Aki/Map/UISceneLevel/UI_Scene/LevelSequence/Ani_Door_close.Ani_Door_close",
  RED_WEATHER_SEQUENCE_PATH =
    "/Game/Aki/Map/UISceneLevel/UI_Scene/LevelSequence/Ani_UIMap_Roguelike_rad.Ani_UIMap_Roguelike_rad",
  BLUE_WEATHER_SEQUENCE_PATH =
    "/Game/Aki/Map/UISceneLevel/UI_Scene/LevelSequence/Ani_UIMap_Roguelike.Ani_UIMap_Roguelike",
  SELECT_WAVE_EFFECT_PATH =
    "/Game/Aki/Render/Shaders/PostProcess/WaterWave/M_WaterWave.M_WaterWave",
  SHAKE_CAMERA_SEQUENCE =
    "/Game/Aki/Map/UISceneLevel/UI_Scene/LevelSequence/Ani_UIMap_Roguelike_loop.Ani_UIMap_Roguelike_loop",
  SWITCH_SEQUENCE =
    "/Game/Aki/Map/UISceneLevel/UI_Scene/LevelSequence/Ani_UIMap_Roguelike_l.Ani_UIMap_Roguelike_l",
  UNLICK_SEQUNECE =
    "/Game/Aki/Map/UISceneLevel/UI_Scene/LevelSequence/Ani_UIMap_Roguelike_CamA.Ani_UIMap_Roguelike_CamA",
  DREAMLINK_DUNGEON_HELP_ID = 135;
class DreamLinkDungeonView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.lqe = void 0),
      (this.teh = void 0),
      (this.ieh = void 0),
      (this.RHt = void 0),
      (this.gTl = void 0),
      (this.xtl = void 0),
      (this.wcl = void 0),
      (this.aPl = void 0),
      (this.reh = 0),
      (this.eBo = 0),
      (this.AHt = void 0),
      (this.oeh = void 0),
      (this.neh = void 0),
      (this.seh = 0),
      (this._ih = void 0),
      (this.Ptl = []),
      (this.wtl = void 0),
      (this.qsi = void 0),
      (this.Ell = void 0),
      (this.Ill = void 0),
      (this.H3e = void 0),
      (this.lPl = !0),
      (this.Bcl = void 0),
      (this.bcl = void 0),
      (this.qcl = void 0),
      (this.z2l = void 0),
      (this.Gcl = new UE.FrameTime()),
      (this.OnSelectRoleDungeon = (e) => {
        var i, t;
        1 !== this._ih &&
          (i =
            DreamLinkController_1.DreamLinkController.GetCurrentActivityData()) &&
          ((this.reh = i.GetRoleInstDataIndex(e)),
          (t =
            ConfigManager_1.ConfigManager.DreamLinkConfig?.GetDreamLinkRoleDungeonConfig(
              e,
            )),
          this.LoadModel(t.RoleId, t.AnimationPath, e),
          this.PlaySelectWaveEffect(),
          this.RefreshReward(),
          this.RefreshEnterButton(),
          (i.GetRoleInstDataByIndex(this.reh)?.CM_
            ? (this.wcl?.SequencePlayer?.Stop(), this.aPl)
            : (this.aPl?.SequencePlayer?.Stop(), this.wcl)
          )?.SequencePlayer?.Play());
      }),
      (this.Qll = () => {
        this.GetExtendToggle(7)?.SetToggleState(0, !0);
      }),
      (this.Tll = () => {
        var e = 1 === this.GetExtendToggle(7)?.GetToggleState();
        this.GetItem(11)?.SetUIActive(e),
          e && this.RefreshReward(),
          this.GetButton(12)?.RootUIComp.SetUIActive(e);
      }),
      (this.heh = () => {
        this.eBo--,
          (this.eBo = Math.max(0, this.eBo)),
          (this.reh = this.eBo * PER_PAGE_COUNT),
          this.RefreshView(),
          this.RefreshEnvironment();
      }),
      (this.leh = () => {
        this.eBo++,
          (this.eBo = Math.min(MAX_PAGE_COUNT, this.eBo)),
          (this.reh = this.eBo * PER_PAGE_COUNT),
          this.RefreshView(),
          this.RefreshEnvironment();
      }),
      (this._eh = () => {
        var e,
          i =
            DreamLinkController_1.DreamLinkController.GetCurrentActivityData();
        i &&
          (1 === this._ih
            ? (e = i.GetActivityConfig()) &&
              !i.IsDreamLinkFunctionUnlock(3) &&
              UiManager_1.UiManager.OpenView(
                "QuestView",
                e.FirstWhiteCatQuestId,
              )
            : (e = i.GetRoleInstDataByIndex(this.reh)) &&
              (e.K6n
                ? e.CM_
                  ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                      "DreamLinkDungeonFinishedTips",
                    )
                  : (this.UiViewSequence?.PlaySequencePurely("FadeOut", !0),
                    DreamLinkController_1.DreamLinkController.RoguelikeRoleInstStartRequest(
                      this.reh,
                    ))
                : ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                    "DreamLinkDungeonUnlockTips",
                  )));
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UISprite],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIButtonComponent],
      [5, UE.UIButtonComponent],
      [6, UE.UIButtonComponent],
      [9, UE.UIItem],
      [8, UE.UIItem],
      [10, UE.UIHorizontalLayout],
      [11, UE.UIItem],
      [7, UE.UIExtendToggle],
      [12, UE.UIButtonComponent],
      [13, UE.UINiagara],
      [14, UE.UINiagara],
      [15, UE.UIText],
      [16, UE.UIItem],
      [17, UE.UIItem],
      [18, UE.UIItem],
      [19, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [4, this.heh],
        [5, this.leh],
        [6, this._eh],
        [7, this.Tll],
        [12, this.Qll],
      ]);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnSelectRoleDreamDungeon,
      this.OnSelectRoleDungeon,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnSelectRoleDreamDungeon,
      this.OnSelectRoleDungeon,
    );
  }
  async OnBeforeStartAsync() {
    var e,
      i,
      t,
      s = DreamLinkController_1.DreamLinkController.GetCurrentActivityData();
    s
      ? ((this.H3e = new GenericLayout_1.GenericLayout(
          this.GetHorizontalLayout(10),
          () => new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid(),
        )),
        (this.Ill = new LevelSequencePlayer_1.LevelSequencePlayer(
          this.GetButton(6).RootUIComp,
        )),
        (this.Ell = new DreamLinkCatProgressItem_1.DreamLinkCatProgressItem()),
        (e = this.Ell.CreateByActorAsync(this.GetItem(8).GetOwner())),
        this.AddChild(this.Ell),
        (this.lqe = new PopupCaptionItem_1.PopupCaptionItem()),
        this.lqe.SetCloseCallBack(() => {
          this.CloseMe();
        }),
        this.lqe.SetHelpCallBack(() => {
          HelpController_1.HelpController.OpenHelpById(
            DREAMLINK_DUNGEON_HELP_ID,
          );
        }),
        (i = this.lqe.CreateByActorAsync(this.GetItem(0).GetOwner())),
        this.AddChild(this.lqe),
        (this.ieh =
          new DreamLinkDungeonRolePanel_1.DreamLinkRoleInstancePanel()),
        (this.AHt = ModelManager_1.ModelManager.CameraModel.CurrentCameraActor),
        (t = this.ieh.CreateByActorAsync(this.GetItem(3).GetOwner())),
        this.AddChild(this.ieh),
        (this.qsi = new DreamLinkScoreRewardItem_1.DreamLinkScoreRewardItem(s)),
        (s = this.qsi.CreateByActorAsync(this.GetItem(9).GetOwner())),
        this.AddChild(this.qsi),
        UiSceneManager_1.UiSceneManager.HasDreamLinkRoleSkeletalHandle() ||
          UiSceneManager_1.UiSceneManager.InitDreamLinkRoleSkeletalHandle(),
        (this.teh =
          UiSceneManager_1.UiSceneManager.GetDreamLinkRoleSkeletalHandle()),
        await Promise.all([s, t, i, e]),
        this.InitDefaultSelectIndex(),
        (this.Gcl.FrameNumber.Value = 10))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "DreamLink",
          34,
          "DreamLinkDungeonView.OnBeforeStartAsync data is null",
        );
  }
  async OnBeforeShowAsyncImplementImplement() {
    const i = new CustomPromise_1.CustomPromise(),
      s =
        (ResourceSystem_1.ResourceSystem.LoadAsync(
          SELECT_WAVE_EFFECT_PATH,
          UE.MaterialInterface,
          (e) => {
            e &&
              ((this.neh =
                UE.KismetMaterialLibrary.CreateDynamicMaterialInstance(
                  this.RootActor,
                  e,
                )),
              (this.seh =
                UE.KuroRenderingRuntimeBPPluginBPLibrary.AddPostprocessMaterial(
                  this.RootActor,
                  this.neh,
                  1,
                  !0,
                )),
              i.SetResult(!0));
          },
        ),
        new CustomPromise_1.CustomPromise()),
      r =
        (ResourceSystem_1.ResourceSystem.LoadAsync(
          SHAKE_CAMERA_SEQUENCE,
          UE.LevelSequence,
          (e) => {
            var i, t;
            ObjectUtils_1.ObjectUtils.IsValid(e) &&
              ((e = e),
              (i = (0, puerts_1.$ref)(void 0)),
              UE.LevelSequencePlayer.CreateLevelSequencePlayer(
                GlobalData_1.GlobalData.World,
                e,
                new UE.MovieSceneSequencePlaybackSettings(),
                i,
              ),
              (i = (0, puerts_1.$unref)(i)),
              ((t = new UE.MovieSceneSequencePlaybackSettings()).bAutoPlay =
                !1),
              (i.PlaybackSettings = t),
              i.SetTickableWhenPaused(!0),
              i.SetSequence(e),
              UE.KuroSequenceRuntimeFunctionLibrary.SetSequenceInUiScene(e, !0),
              (this.xtl = i),
              s.SetResult(!0));
          },
        ),
        new CustomPromise_1.CustomPromise()),
      o =
        (ResourceSystem_1.ResourceSystem.LoadAsync(
          SWITCH_SEQUENCE,
          UE.LevelSequence,
          (e) => {
            var i, t;
            ObjectUtils_1.ObjectUtils.IsValid(e) &&
              ((e = e),
              UE.KuroSequencePerformanceManager.OpenKuroPerformanceMode(e),
              (i = (0, puerts_1.$ref)(void 0)),
              UE.LevelSequencePlayer.CreateLevelSequencePlayer(
                GlobalData_1.GlobalData.World,
                e,
                new UE.MovieSceneSequencePlaybackSettings(),
                i,
              ),
              (i = (0, puerts_1.$unref)(i)),
              ((t = new UE.MovieSceneSequencePlaybackSettings()).bAutoPlay =
                !1),
              (t.bPauseAtEnd = !0),
              (i.PlaybackSettings = t),
              i.SetTickableWhenPaused(!0),
              i.SetSequence(e),
              UE.KuroSequenceRuntimeFunctionLibrary.SetSequenceInUiScene(e, !0),
              (this.wcl = i),
              r.SetResult(!0));
          },
        ),
        new CustomPromise_1.CustomPromise()),
      t =
        (ResourceSystem_1.ResourceSystem.LoadAsync(
          UNLICK_SEQUNECE,
          UE.LevelSequence,
          (e) => {
            var i, t;
            ObjectUtils_1.ObjectUtils.IsValid(e) &&
              ((e = e),
              UE.KuroSequencePerformanceManager.OpenKuroPerformanceMode(e),
              (i = (0, puerts_1.$ref)(void 0)),
              UE.LevelSequencePlayer.CreateLevelSequencePlayer(
                GlobalData_1.GlobalData.World,
                e,
                new UE.MovieSceneSequencePlaybackSettings(),
                i,
              ),
              (i = (0, puerts_1.$unref)(i)),
              ((t = new UE.MovieSceneSequencePlaybackSettings()).bAutoPlay =
                !1),
              (t.bPauseAtEnd = !0),
              (i.PlaybackSettings = t),
              i.SetTickableWhenPaused(!0),
              i.SetSequence(e),
              UE.KuroSequenceRuntimeFunctionLibrary.SetSequenceInUiScene(e, !0),
              (this.aPl = i),
              o.SetResult(!0));
          },
        ),
        new CustomPromise_1.CustomPromise());
    var e = EffectUtil_1.EffectUtil.GetEffectPath(
      "DreamLinkLockMaterialController",
    );
    ResourceSystem_1.ResourceSystem.LoadAsync(
      e,
      UE.PD_CharacterControllerData_C,
      (e) => {
        e && t.SetResult(!0);
      },
    ),
      await Promise.all([
        r.Promise,
        t.Promise,
        o.Promise,
        i.Promise,
        s.Promise,
      ]);
  }
  OnBeforeShow() {
    this.xtl.bOverrideInstanceData = !0;
    var e = this.xtl.DefaultInstanceData,
      i = UE.KuroCollectActorComponent.GetActorWithTag(
        FNameUtil_1.FNameUtil.GetDynamicFName("KuroUiSceneRoot"),
        1,
      ),
      t = ((this.wcl.bOverrideInstanceData = !0), this.wcl.DefaultInstanceData),
      s = ((this.aPl.bOverrideInstanceData = !0), this.aPl.DefaultInstanceData),
      i = UE.KismetMathLibrary.Conv_TransformDoubleToTransform(
        i.D_GetTransform(),
      ),
      t =
        ((t.TransformOrigin = i),
        (e.TransformOrigin = i),
        (s.TransformOrigin = i),
        (this.wtl = UE.KuroCollectActorComponent.GetActorWithTag(
          FNameUtil_1.FNameUtil.GetDynamicFName("SequenceCamera"),
          1,
        )),
        (this.oeh = UE.KuroCollectActorComponent.GetActorWithTag(
          FNameUtil_1.FNameUtil.GetDynamicFName("DoorCamera"),
          1,
        )),
        this.RefreshView(),
        this.RefreshEnvironment(!0),
        this.RefreshRoleList(),
        DreamLinkController_1.DreamLinkController.GetCurrentActivityData());
    t &&
      (t.GetRoleInstDataByIndex(this.reh)?.CM_
        ? (this.aPl?.SequencePlayer?.Play(),
          this.lPl ||
            this.aPl?.SequencePlayer?.JumpToFrame(
              this.aPl.SequencePlayer.GetEndTime().Time,
            ))
        : (this.wcl?.SequencePlayer?.Play(),
          this.lPl ||
            this.wcl?.SequencePlayer?.JumpToFrame(
              this.wcl.SequencePlayer.GetEndTime().Time,
            )),
      (this.lPl = !1));
  }
  OnAfterShow() {
    this.InitProgressAnim();
  }
  OnAfterHide() {
    this.RHt?.IsValid() && (this.RHt.Stop(), (this.RHt = void 0)),
      this.qcl?.IsValid() && (this.qcl.Kill(), (this.qcl = void 0)),
      this.wcl?.IsValid() &&
        (this.wcl.SequencePlayer.Stop(),
        this.wcl.K2_DestroyActor(),
        (this.wcl = void 0)),
      this.xtl?.IsValid() &&
        (this.xtl.SequencePlayer.Stop(),
        this.xtl.K2_DestroyActor(),
        (this.xtl = void 0)),
      this.gTl?.IsValid() && (this.gTl.K2_DestroyActor(), (this.gTl = void 0)),
      this.ClearWaveEffect(),
      UE.KuroRenderingRuntimeBPPluginBPLibrary.RemovePostprocessMaterial(
        this.RootActor,
        this.seh,
      ),
      (this.neh = void 0),
      CameraController_1.CameraController.SetViewTarget(
        this.AHt,
        "DreamLinkDungeonView.OnBeforeDestroy",
      );
  }
  OnBeforeDestroy() {
    var e = this.teh?.Model?.CheckGetComponent(1);
    e?.MainMeshComponent?.IsValid() && (e.MainMeshComponent.ForcedLodModel = 0),
      this.Ptl.forEach((e) => {
        e = e.Model?.CheckGetComponent(1);
        e?.MainMeshComponent?.IsValid() &&
          (e.MainMeshComponent.ForcedLodModel = 0);
      }),
      UiSceneManager_1.UiSceneManager.DestroyDreamLinkRoleSkeletalHandle(),
      (this.teh = void 0),
      (this.Ptl = []),
      UiSceneManager_1.UiSceneManager.DestroyAllDreamLinkWeaponSkeletalHandle(),
      CameraController_1.CameraController.SetViewTarget(
        this.AHt,
        "DreamLinkDungeonView.OnBeforeDestroy",
      ),
      UE.KuroSequencePerformanceManager.CloseKuroPerformanceMode();
  }
  InitProgressAnim() {
    var e,
      i = DreamLinkController_1.DreamLinkController.GetCurrentActivityData();
    i &&
      i.DungeonProgressRecord !== i.GetCurrentCatProgress() &&
      ((i = i.GetLastFinishInst() % PER_PAGE_COUNT),
      (e = this.GetItem(8)),
      (this.Bcl = this.ieh.GetLocationByIndex(i)),
      this.GetUiNiagara(13).D_K2_SetWorldLocation(this.Bcl, !1, void 0, !1),
      (this.bcl = e
        ?.D_GetRelativeTransform()
        .GetLocation()
        .op_Addition(new UE.VectorDouble(e?.Width / 2, -e?.Height / 2, 0))),
      this.GetUiNiagara(13)?.SetUIActive(!0),
      (i = UE.KismetMathLibrary.Conv_VectorDoubleToVector(this.bcl)),
      (this.qcl = UE.LTweenBPLibrary.LocalPositionTo(
        this.GetUiNiagara(13),
        i,
        1,
        0,
        4,
      )),
      this.qcl?.OnCompleteCallBack.Bind(() => {
        this.GetUiNiagara(13)?.SetUIActive(!1),
          this.GetUiNiagara(14)?.SetUIActive(!0),
          this.Ell?.PlayAddProgressAnim();
      }));
  }
  InitDefaultSelectIndex() {
    var e = DreamLinkController_1.DreamLinkController.GetCurrentActivityData();
    e &&
      ((e =
        e.DungeonProgressRecord === e.GetCurrentCatProgress()
          ? e.GetLastUnlockInst()
          : e.GetLastFinishInst()),
      (this.eBo = Math.floor(e / PER_PAGE_COUNT)),
      (this.reh = e),
      this.eBo === MAX_PAGE_COUNT
        ? (this._ih = 1)
        : ((this._ih = 0), (this.reh = e)),
      this.eBo === MAX_PAGE_COUNT ? (this._ih = 1) : (this._ih = 0));
  }
  RefreshView() {
    this.RefreshPreNextButton(),
      this.RefreshDoorState(),
      this.RefreshEnterButton(),
      this.RefreshReward();
  }
  RefreshReward() {
    var e = DreamLinkController_1.DreamLinkController.GetCurrentActivityData();
    if (e) {
      const i = e.GetRoleInstDataByIndex(this.reh);
      i &&
        (e = ConfigManager_1.ConfigManager.InstanceDungeonConfig?.GetConfig(
          i.r6n,
        )) &&
        ((e =
          ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeRewardPreviewRewardList(
            e.FirstRewardId ?? 0,
          )),
        this.H3e?.RefreshByData(e, () => {
          this.H3e?.GetLayoutItemMap().forEach((e) => {
            e.SetReceivedVisible(i.CM_);
          });
        }));
    }
  }
  RefreshEnterButton() {
    var e,
      i,
      t = DreamLinkController_1.DreamLinkController.GetCurrentActivityData();
    t &&
      ((e = 0 === t.GetInstStage() ? 0 : 1),
      this.z2l !== e &&
        (0 == e
          ? ((this.z2l = 0), this.Ill?.PlayLevelSequenceByName("Blue"))
          : ((this.z2l = 1), this.Ill?.PlayLevelSequenceByName("Red"))),
      1 === this._ih
        ? (this.GetButton(6)?.RootUIComp.SetUIActive(
            !t.IsDreamLinkFunctionUnlock(8),
          ),
          this.GetItem(16).SetUIActive(!1),
          this.GetText(15).SetText(""))
        : (e = t.GetRoleInstDataByIndex(this.reh)) &&
          (i = ConfigManager_1.ConfigManager.InstanceDungeonConfig?.GetConfig(
            e.r6n,
          )) &&
          (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(15), i.MapName),
          this.GetButton(6)?.RootUIComp.SetUIActive(!e.CM_),
          this.GetItem(16).SetUIActive(!1),
          this.GetItem(18).SetUIActive(
            t.CheckDungeonRedDotStateByPage(this.eBo - 1, PER_PAGE_COUNT),
          ),
          this.GetItem(19).SetUIActive(
            t.CheckDungeonRedDotStateByPage(this.eBo + 1, PER_PAGE_COUNT),
          )));
  }
  RefreshEnvironment(e = !1) {
    if (0 !== this._ih || e) {
      const t =
        DreamLinkController_1.DreamLinkController.GetCurrentActivityData();
      var i;
      !t ||
        this.eBo >= MAX_PAGE_COUNT ||
        ((e = 1 === this._ih),
        (this._ih = 0),
        (i = () => {
          this.RHt && (this.RHt.Stop(), (this.RHt = void 0)),
            t.GetFinishInstCount() >= PER_PAGE_COUNT
              ? this.PlaySceneLevelSequence(RED_WEATHER_SEQUENCE_PATH)
              : this.PlaySceneLevelSequence(BLUE_WEATHER_SEQUENCE_PATH),
            this.RefreshRoleList(),
            this.GetItem(17)?.SetAlpha(1),
            CameraController_1.CameraController.SetViewTarget(
              this.wtl,
              "DreamLinkDungeonView.RefreshEnvironment",
            );
        }),
        e
          ? this.PlayBlackScreen(i, "DreamLinkDungeonView.RefreshEnvironment")
          : i());
    } else this.RefreshRoleList();
  }
  RefreshPreNextButton() {
    this.GetButton(4)?.RootUIComp.SetUIActive(0 < this.eBo);
    var e,
      i = DreamLinkController_1.DreamLinkController.GetCurrentActivityData();
    this.eBo === MAX_PAGE_COUNT - 1
      ? this.GetButton(5)?.RootUIComp.SetUIActive(i.IsAllInstFinished())
      : ((e = i.GetFinishInstCount()),
        (i = i.GetLastUnlockInst()),
        this.GetButton(5)?.RootUIComp.SetUIActive(
          (this.eBo + 1) * PER_PAGE_COUNT <= e &&
            this.eBo * PER_PAGE_COUNT <= i &&
            this.eBo !== MAX_PAGE_COUNT,
        ));
  }
  RefreshRoleList(e = !0) {
    var i;
    1 === this._ih
      ? this.GetItem(2)?.SetUIActive(!1)
      : (i =
          DreamLinkController_1.DreamLinkController.GetCurrentActivityData()) &&
        (0 < (i = i.GetInstListByPages(this.eBo, PER_PAGE_COUNT)).length
          ? (this.ieh.Refresh(i, e ? this.reh % PER_PAGE_COUNT : 0),
            this.PlaySelectWaveEffect(),
            this.GetItem(2)?.SetUIActive(!0))
          : this.GetItem(2)?.SetUIActive(!1));
  }
  RefreshDoorState() {
    this.eBo < MAX_PAGE_COUNT ||
      (DreamLinkController_1.DreamLinkController.GetCurrentActivityData() &&
        (this.GetItem(17)?.SetAlpha(0),
        this.RefreshRoleList(),
        (this._ih = 1),
        this.ClearWaveEffect(),
        this.PlayDoorSequence()));
  }
  async PlayDoorSequence() {
    await this.PlayBlackScreen(() => {
      CameraController_1.CameraController.SetViewTarget(
        this.oeh,
        "DreamLinkDungeonView.PlayDoorSequence",
      );
    }, "DreamLinkDungeonView.PlayDoorSequence");
    var e = DreamLinkController_1.DreamLinkController.GetCurrentActivityData();
    e &&
      (e = e.GetActivityConfig()) &&
      (ModelManager_1.ModelManager.InstanceDungeonEntranceModel?.CheckInstanceFinished(
        e.FirstWhiteCatDungeonId,
      )
        ? this.PlaySceneLevelSequence(DOOR_CLOSE_SEQUENCE_PATH, !0, !0)
        : this.PlaySceneLevelSequence(DOOR_OPEN_SEQUENCE_PATH, !0, !0));
  }
  async PlayBlackScreen(e, i) {
    await BlackScreenController_1.BlackScreenController.AddBlackScreenAsync(
      "Start",
      i,
    ),
      e(),
      BlackScreenController_1.BlackScreenController.RemoveBlackScreen(
        "Close",
        i,
      );
  }
  LoadModel(i, e, s) {
    const r = this.teh.Model?.CheckGetComponent(12);
    (r && r.RoleConfigId === i) ||
      (this.Ptl.forEach((e) => {
        e = e.Model?.CheckGetComponent(0);
        e && e.SetVisible(!1);
      }),
      ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.AnimationAsset, (t) => {
        var e;
        !t ||
          (r && r.RoleConfigId === i) ||
          ((e = this.teh.Model?.CheckGetComponent(13)) &&
            e.LoadModelByRoleConfigId(i, -1, !0, () => {
              var e = this.teh.Model?.CheckGetComponent(10),
                e =
                  (e && e.PlayAnimation(t, !0),
                  this.teh.Model?.CheckGetComponent(1)),
                e =
                  (e &&
                    (e.SetTransformByTag("RoleCase"),
                    e.MainMeshComponent?.IsValid()) &&
                    (e.MainMeshComponent.ForcedLodModel = 1),
                  this.teh.Model?.CheckGetComponent(5)),
                i = EffectUtil_1.EffectUtil.GetEffectPath(
                  "ChangeRoleMaterialController",
                ),
                i = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
                  i,
                  UE.PD_CharacterControllerData_C,
                ),
                i =
                  (e && i && e.AddRenderingMaterialByData(i),
                  UiModelUtil_1.UiModelUtil.PlayEffectOnRoot(
                    this.teh.Model,
                    "ChangeRoleEffect",
                  ),
                  DreamLinkController_1.DreamLinkController.GetCurrentActivityData());
              i &&
                (i.GetRoleInstDataByIndex(this.reh).CM_ ||
                  ((i = EffectUtil_1.EffectUtil.GetEffectPath(
                    "DreamLinkLockMaterialController",
                  )),
                  (i = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
                    i,
                    UE.PD_CharacterControllerData_C,
                  )),
                  e && i && e.AddRenderingMaterialByData(i)),
                this.LoadItemModel(s));
            }));
      }));
  }
  LoadItemModel(e) {
    const o =
      ConfigManager_1.ConfigManager.DreamLinkConfig?.GetDreamLinkRoleDungeonConfig(
        e,
      );
    if (o) {
      let i = 0;
      o.WeaponShowConfig.forEach((e, s) => {
        this.Ptl.length <= i &&
          this.Ptl.push(
            UiSceneManager_1.UiSceneManager.InitDreamLinkWeaponSkeletalHandle(),
          );
        const r = this.Ptl[i];
        i++,
          ResourceSystem_1.ResourceSystem.LoadAsync(
            e,
            UE.AnimationAsset,
            (t) => {
              var e;
              t &&
                (e = r.Model?.CheckGetComponent(2)) &&
                e.LoadModelByModelId(parseInt(s), !0, () => {
                  var e = r.Model?.CheckGetComponent(10),
                    e =
                      (e && e.PlayAnimation(t, !0),
                      r.Model?.CheckGetComponent(1)),
                    i = this.teh?.Model?.CheckGetComponent(1),
                    i =
                      (e?.MainMeshComponent?.IsValid() &&
                        (e.MainMeshComponent.ForcedLodModel = 1),
                      e &&
                        i &&
                        (o.WeaponShowCase.has(s)
                          ? (e.Actor?.K2_AttachToComponent(
                              i.MainMeshComponent,
                              new UE.FName(o.WeaponShowCase.get(s)),
                              0,
                              0,
                              0,
                              !1,
                            ),
                            e.Actor?.K2_SetActorRelativeTransform(
                              MathUtils_1.MathUtils.DefaultTransform,
                              !1,
                              void 0,
                              !1,
                            ))
                          : e.SetTransformByTag("RoleCase")),
                      r.Model?.CheckGetComponent(0)),
                    e =
                      (i && i.SetVisible(!0),
                      UiModelUtil_1.UiModelUtil.PlayEffectOnRoot(
                        r.Model,
                        "ChangeRoleEffect",
                      ),
                      DreamLinkController_1.DreamLinkController.GetCurrentActivityData());
                  e &&
                    ((i = r.Model?.CheckGetComponent(5)),
                    e.GetRoleInstDataByIndex(this.reh).CM_ ||
                      ((e = EffectUtil_1.EffectUtil.GetEffectPath(
                        "DreamLinkLockMaterialController",
                      )),
                      (e = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
                        e,
                        UE.PD_CharacterControllerData_C,
                      )),
                      i && e && i.AddRenderingMaterialByData(e)));
                });
            },
          );
      });
    }
  }
  PlaySceneLevelSequence(e, s = !1, r = !1, o = !0) {
    this.RHt && (this.RHt.Stop(), (this.RHt = void 0)),
      ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.LevelSequence, (e) => {
        var i, t;
        ObjectUtils_1.ObjectUtils.IsValid(e) &&
          ((e = e),
          (i = (0, puerts_1.$ref)(void 0)),
          UE.LevelSequencePlayer.CreateLevelSequencePlayer(
            GlobalData_1.GlobalData.World,
            e,
            new UE.MovieSceneSequencePlaybackSettings(),
            i,
          ),
          (i = (0, puerts_1.$unref)(i)),
          ((t = new UE.MovieSceneSequencePlaybackSettings()).bRestoreState = r),
          (t.bPauseAtEnd = s),
          (i.PlaybackSettings = t),
          i.SetTickableWhenPaused(!0),
          i.SetSequence(e),
          UE.KuroSequenceRuntimeFunctionLibrary.SetSequenceInUiScene(e, !0),
          this.xtl?.SequencePlayer?.PlayLooping(-1),
          i.SequencePlayer?.Play(),
          o &&
            ((i.bOverrideInstanceData = !0),
            (t = i.DefaultInstanceData),
            (e = UE.KuroCollectActorComponent.GetActorWithTag(
              FNameUtil_1.FNameUtil.GetDynamicFName("KuroUiSceneRoot"),
              1,
            )),
            (e = UE.KismetMathLibrary.Conv_TransformDoubleToTransform(
              e.D_GetTransform(),
            )),
            (t.TransformOrigin = e)),
          (this.RHt = i.SequencePlayer),
          (this.gTl = i));
      });
  }
  PlaySelectWaveEffect() {
    var e,
      i,
      t,
      s = this.ieh.GetScreenPositionByIndex(this.reh % 3);
    s &&
      ((t = Global_1.Global.CharacterController),
      (e = (0, puerts_1.$ref)(void 0)),
      (i = (0, puerts_1.$ref)(void 0)),
      t.GetViewportSize(e, i),
      (t = (0, puerts_1.$unref)(e)),
      (e = (0, puerts_1.$unref)(i)),
      (i = Vector2D_1.Vector2D.Create(t, e)),
      (t = UE.KismetMathLibrary.Divide_Vector2DVector2D(s, i.ToUeVector2D())),
      this.neh?.SetScalarParameterValue(
        FNameUtil_1.FNameUtil.GetDynamicFName("Center1X"),
        t?.X,
      ),
      this.neh?.SetScalarParameterValue(
        FNameUtil_1.FNameUtil.GetDynamicFName("Center1Y"),
        t?.Y,
      ),
      this.neh?.SetScalarParameterValue(
        FNameUtil_1.FNameUtil.GetDynamicFName("CommonStrength"),
        0.05,
      ));
  }
  ClearWaveEffect() {
    this.neh?.SetScalarParameterValue(
      FNameUtil_1.FNameUtil.GetDynamicFName("CommonStrength"),
      0,
    ),
      this.neh?.SetScalarParameterValue(
        FNameUtil_1.FNameUtil.GetDynamicFName("ClickStrength"),
        0,
      );
  }
}
exports.DreamLinkDungeonView = DreamLinkDungeonView;
//# sourceMappingURL=DreamLinkDungeonView.js.map
