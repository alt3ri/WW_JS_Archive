"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DangoAbyssEntranceView = exports.DangoAbyssEntraceViewData = void 0);
const UE = require("ue"),
  ActorSystem_1 = require("../../../../../Core/Actor/ActorSystem"),
  ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
  FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil"),
  ObjectUtils_1 = require("../../../../../Core/Utils/ObjectUtils"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  RenderModuleController_1 = require("../../../../Render/Manager/RenderModuleController"),
  UiTickViewBase_1 = require("../../../../Ui/Base/UiTickViewBase"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  ActivityControllerHolder_1 = require("../../../Activity/ActivityControllerHolder"),
  UiCameraAnimationController_1 = require("../../../UiCameraAnimation/UiCameraAnimationController"),
  UiCameraAnimationManager_1 = require("../../../UiCameraAnimation/UiCameraAnimationManager"),
  AbyssButtonItem_1 = require("./AbyssButtonItem"),
  DangoWorldQuestItem_1 = require("./DangoWorldQuestItem"),
  STARTCAMERAPOS = "DangoAbyssStart",
  ENTRANCELOOP = "DangoAbyssLoop";
class DangoAbyssEntraceViewData {
  constructor() {
    this.ActivityId = 0;
  }
}
exports.DangoAbyssEntraceViewData = DangoAbyssEntraceViewData;
class DangoAbyssEntranceView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.$8i = void 0),
      (this.Ofc = void 0),
      (this.qfc = void 0),
      (this.Gfc = void 0),
      (this.Ffc = void 0),
      (this.$pt = void 0),
      (this.b2t = void 0),
      (this.df1 = void 0),
      (this.AMo = () => {
        var e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
        ConfigManager_1.ConfigManager.DangoAbyssConfig.GetSmallWorldInsIdList()?.includes(
          e,
        )
          ? (ModelManager_1.ModelManager.BattleUiModel.ChildViewData?.SetChildVisible(
              9,
              5,
              !0,
            ),
            ModelManager_1.ModelManager.BattleUiModel.ChildViewData?.SetChildVisible(
              9,
              7,
              !0,
            ),
            ModelManager_1.ModelManager.BattleUiModel.ChildViewData?.SetChildVisible(
              9,
              8,
              !0,
            ),
            ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.LeaveInstanceDungeon())
          : this.CloseMe();
      }),
      (this.zbc = () => {
        var e;
        ModelManager_1.ModelManager.DangoAbyssModel.CheckIfInSmallWorldInstance() ||
        ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()
          ? this.CloseMe()
          : 0 !==
              (e =
                ConfigManager_1.ConfigManager.DangoAbyssConfig.GetWorldTeleportId()) &&
            ControllerHolder_1.ControllerHolder.TeleportController.SendTeleportTransferRequest(
              e,
            );
      }),
      (this.Nfc = () => {
        var e = this.$8i.ActivityId;
        ControllerHolder_1.ControllerHolder.DangoAbyssController.OpenAbyssSelectViewByActivityId(
          e,
        );
      }),
      (this.tC1 = () => {
        ModelManager_1.ModelManager.DangoAbyssModel.GetDangoUpAvailable() &&
          ActivityControllerHolder_1.ActivityControllerHolder.DangoAbyssActivityController.OpenCurrentRoleUpView();
      }),
      (this.iyi = () => {
        ModelManager_1.ModelManager.DangoAbyssModel.GetShopAvailable() &&
          UiManager_1.UiManager.OpenView("DangoAbyssShopView");
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIButtonComponent],
      [2, UE.UIText],
      [3, UE.UIButtonComponent],
      [4, UE.UIText],
      [6, UE.UIItem],
      [5, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIScrollViewWithScrollbarComponent],
      [10, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [3, this.Nfc],
        [1, this.zbc],
        [0, this.AMo],
      ]);
  }
  GetLoopAudioEventSwitch() {
    return !ModelManager_1.ModelManager.DangoAbyssModel.CheckIfInSmallWorldInstance();
  }
  async OnBeforeStartAsync() {
    this.$8i = this.OpenParam;
    var e = [];
    (this.Ofc = new AbyssButtonItem_1.AbyssButtonItem()),
      e.push(this.Ofc.CreateThenShowByActorAsync(this.GetItem(5).GetOwner())),
      this.Ofc.BindClickCallBack(() => {
        ControllerHolder_1.ControllerHolder.DangoAbyssController.OpenAbyssLimitRewardView();
      }),
      (this.qfc = new AbyssButtonItem_1.AbyssButtonItem()),
      e.push(this.qfc.CreateThenShowByActorAsync(this.GetItem(6).GetOwner())),
      this.qfc.BindClickCallBack(() => {
        ControllerHolder_1.ControllerHolder.DangoAbyssController.OpenAbyssRewardView();
      }),
      (this.Gfc = new AbyssButtonItem_1.AbyssButtonItem()),
      e.push(this.Gfc.CreateThenShowByActorAsync(this.GetItem(7).GetOwner())),
      this.Gfc.BindClickCallBack(this.tC1),
      (this.Ffc = new AbyssButtonItem_1.AbyssButtonItem()),
      e.push(this.Ffc.CreateThenShowByActorAsync(this.GetItem(8).GetOwner())),
      this.Ffc.BindClickCallBack(this.iyi),
      await Promise.all(e),
      (this.df1 = new DangoWorldQuestItem_1.DangoWorldQuestItem()),
      this.df1.Init(this.GetScrollViewWithScrollbar(9), this.GetItem(10));
  }
  PushCameraHandle(e, t, i) {
    UiCameraAnimationController_1.UiCameraAnimationController.PushCameraHandle(
      STARTCAMERAPOS,
      t,
      i,
    ),
      UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandleByHandleName(
        ENTRANCELOOP,
        !0,
        !0,
        "1001",
      );
  }
  PopCameraHandle(e, t, i, r) {
    UiCameraAnimationController_1.UiCameraAnimationController.PopCameraHandle(
      STARTCAMERAPOS,
      t,
      i,
      r,
    );
  }
  OnHandleLoadScene() {
    var e =
      ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
        "Ani_Tuanzi_Start0",
      );
    this.tGc(e, !1, () => {
      var e =
        ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
          "Ani_Tuanzi_Loop",
        );
      this.tGc(e, !0);
    });
  }
  OnBeforeShow() {
    this.PushCameraHandle(ENTRANCELOOP, this.GetViewId(), !0);
    var e = this.Wgc();
    this.it1(e), this.Og(), this.RefreshRedDot(), this.Pu1(e), this.iC1();
  }
  iC1() {
    var e = ModelManager_1.ModelManager.DangoAbyssModel.GetDangoUpAvailable(),
      e =
        (this.Gfc.SetUiActive(e),
        ModelManager_1.ModelManager.DangoAbyssModel.GetShopAvailable());
    this.Ffc.SetUiActive(e);
  }
  RefreshRedDot() {
    this.Ofc?.BindRedDot("RedDotDangoLimitReward", this.$8i?.ActivityId),
      this.qfc?.BindRedDot("RedDotDangoCommonReward", this.$8i?.ActivityId),
      this.Ffc?.BindRedDot("RedDotDangoPayShop", this.$8i?.ActivityId),
      this.Gfc?.BindRedDot("RedDotDangoDevelop");
  }
  W8e() {
    this.Ofc?.UnBindRedDot(),
      this.qfc?.UnBindRedDot(),
      this.Ffc?.UnBindRedDot(),
      this.Gfc?.UnBindRedDot();
  }
  tGc(e, i, r) {
    const s =
      ConfigManager_1.ConfigManager.DangoAbyssConfig.GetAbyssActivityData(
        this.$8i.ActivityId,
      ).SceneActor.split(",");
    ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.LevelSequence, (e) => {
      var t;
      ObjectUtils_1.ObjectUtils.IsValid(e) &&
        (this.b2t ||
          ((t = ActorSystem_1.ActorSystem.Spawn(
            UE.LevelSequenceActor.StaticClass(),
            new UE.TransformDouble(),
            void 0,
          )),
          (this.b2t = t)),
        this.b2t.SetSequence(e),
        s.forEach((e) => {
          var e = FNameUtil_1.FNameUtil.GetDynamicFName(e),
            t = UE.KuroCollectActorComponent.GetActorWithTag(e, 1);
          t && this.b2t?.AddBindingByTag(e, t);
        }),
        ((t = new UE.MovieSceneSequencePlaybackSettings()).bRestoreState = !0),
        (t.bPauseAtEnd = !0),
        (this.b2t.PlaybackSettings = t),
        this.b2t.SetTickableWhenPaused(!0),
        UE.KuroSequenceRuntimeFunctionLibrary.SetSequenceInUiScene(e, !0),
        (this.$pt = this.b2t.SequencePlayer),
        (this.b2t.bOverrideInstanceData = !0),
        (t = this.b2t.DefaultInstanceData),
        (e = UE.KismetMathLibrary.Conv_TransformDoubleToTransform(
          RenderModuleController_1.RenderModuleController.GetKuroCurrentUiSceneTransform(),
        )),
        (t.TransformOrigin = e),
        this.$pt.OnFinished.Add(() => {
          r?.();
        }),
        i ? this.$pt.PlayLooping() : this.$pt.Play());
    });
  }
  OnBeforeHide() {
    this.W8e();
  }
  OnBeforeDestroy() {
    this.$pt?.IsValid() && (this.$pt?.Stop(), (this.$pt = void 0)),
      this.b2t?.IsValid() && (this.b2t?.K2_DestroyActor(), (this.b2t = void 0)),
      this.df1?.Clear();
  }
  Og() {
    this.df1?.Refresh();
    var e = this.Wgc();
    this.Vfc(e), this.jfc(e), this.Hfc(e), this.KFc(e), this.g6c(e);
  }
  Pu1(e) {
    e = e.GetCurrentLastFinishChallengeId();
    0 !== e &&
      ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoAbyssInstById(e)
        .AbyssShowCake.split(",")
        .forEach((e) => {
          e = UE.KuroCollectActorComponent.GetActorWithTag(
            FNameUtil_1.FNameUtil.GetDynamicFName(e),
            1,
          );
          e?.IsValid() && e.SetActorHiddenInGame(!1);
        });
  }
  Wgc() {
    return ModelManager_1.ModelManager.ActivityModel.GetActivityById(
      this.$8i.ActivityId,
    );
  }
  it1(e) {
    var t = UE.KuroCollectActorComponent.GetActorWithTag(
      FNameUtil_1.FNameUtil.GetDynamicFName("shenyuan"),
      1,
    );
    t?.IsValid() &&
      0 !== (e = e.GetFirstUnlockChallengeId()) &&
      ((e =
        ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoAbyssInstById(
          e,
        ).AbyssColor),
      (e = UE.LinearColor.FromSRGBColor(UE.Color.FromHex(e))),
      t
        .GetComponentByClass(UE.NiagaraComponent.StaticClass())
        .SetNiagaraVariableLinearColor("Color", e));
  }
  KFc(e) {
    var t = e.CheckInLimitTime();
    this.GetItem(5).SetUIActive(t),
      t && ((t = e.GetRemainTimeText()), this.Ofc?.SetNumText(t));
  }
  Vfc(e) {}
  jfc(e) {
    e = e.GetAbyssWorldProgressText();
    this.GetText(2).SetText(e);
  }
  Hfc(e) {
    e = e.GetAbyssProgressText();
    this.GetText(4).SetText(e);
  }
  g6c(e) {
    e = e.GetRewardFinishProgressText();
    this.qfc?.SetNumText(e);
  }
  OnTick(e) {
    this.df1?.Tick();
  }
}
exports.DangoAbyssEntranceView = DangoAbyssEntranceView;
//# sourceMappingURL=DangoAbyssEntranceView.js.map
