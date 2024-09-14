"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CalabashCollectTabView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiTabViewBase_1 = require("../../../../Ui/Base/UiTabViewBase"),
  UiLayerType_1 = require("../../../../Ui/Define/UiLayerType"),
  UiLayer_1 = require("../../../../Ui/UiLayer"),
  FilterEntrance_1 = require("../../../Common/FilterSort/Filter/View/FilterEntrance"),
  SortEntrance_1 = require("../../../Common/FilterSort/Sort/View/SortEntrance"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  VisionCameraInputItem_1 = require("../../../Phantom/Vision/View/VisionCameraInputItem"),
  RoleModelLoadingItem_1 = require("../../../RoleUi/Component/RoleModelLoadingItem"),
  UiCameraControlRotationComponent_1 = require("../../../UiCamera/UiCameraComponent/UiCameraControlRotationComponent"),
  UiCameraManager_1 = require("../../../UiCamera/UiCameraManager"),
  UiCameraAnimationManager_1 = require("../../../UiCameraAnimation/UiCameraAnimationManager"),
  UiModelResourcesManager_1 = require("../../../UiComponent/UiModelResourcesManager"),
  UiSceneManager_1 = require("../../../UiComponent/UiSceneManager"),
  LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView"),
  CalabashCollectDetailItem_1 = require("./CalabashCollectDetailItem"),
  CalabashCollectGridItem_1 = require("./CalabashCollectGridItem");
class CalabashCollectTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments),
      (this.vpt = void 0),
      (this.Mpt = void 0),
      (this.Ept = void 0),
      (this.Spt = void 0),
      (this.ypt = void 0),
      (this.Ipt = void 0),
      (this.Tpt = void 0),
      (this.Dpt = 0),
      (this.Rpt = 0),
      (this.Upt = ResourceSystem_1.ResourceSystem.InvalidId),
      (this.ENn =
        UiModelResourcesManager_1.UiModelResourcesManager.StreamingInvalidValue),
      (this.Apt = !1),
      (this.SPe = void 0),
      (this.Ppt = () => {
        ModelManager_1.ModelManager.CalabashModel.GetIfSimpleState()
          ? this.Ept.PlayDetailShowSequence()
          : this.Ept.PlayDetailHideSequence();
      }),
      (this.xpt = () => {
        this.wpt();
      }),
      (this.w7 = () => {
        var e = new CalabashCollectGridItem_1.CalabashCollectGridItem();
        return (e.OnToggleClick = this.N8e), (e.CanToggleChange = this.Bpt), e;
      }),
      (this.N8e = (e) => {
        this.Spt.SelectGridProxy(e), this.bpt();
      }),
      (this.Bpt = (e) => this.Spt?.GetSelectedGridIndex() !== e),
      (this.qpt = (e, i, t) => {
        (this.ypt = e),
          this.Spt.RefreshByData(this.ypt, !1, this.Gpt, !0),
          this.ypt.length <= 0 ||
            (1 === t && (this.Rpt = this.ypt[0].DevelopRewardData.MonsterId));
      }),
      (this.Gpt = () => {
        let i = 0,
          e =
            (0 < this.Dpt
              ? ((i = this.Dpt), (this.Dpt = 0))
              : 0 < this.Rpt && (i = this.Rpt),
            0);
        0 < i &&
          (e = this.ypt.findIndex((e) => e.DevelopRewardData.MonsterId === i)),
          (e = Math.max(0, e)),
          this.Spt.SelectGridProxy(e),
          this.Spt.ScrollToGridIndex(e),
          this.bpt();
      }),
      (this.Npt = () => {
        if (this.Apt)
          Log_1.Log.CheckError() &&
            Log_1.Log.Error("Calabash", 44, "重复进入声骸图鉴的内部界面");
        else {
          (this.Apt = !0), this.SPe?.PlayLevelSequenceByName("Enter", !0);
          const i =
            UiCameraManager_1.UiCameraManager.Get().GetUiCameraComponent(
              UiCameraControlRotationComponent_1.UiCameraControlRotationComponent,
            );
          var e =
            ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashDevelopRewardByMonsterId(
              this.Rpt,
            );
          const t =
            ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterBodyTypeConfig(
              e.MonsterBodyType,
            );
          ResourceSystem_1.ResourceSystem.LoadAsync(
            t.MoveForwardCurvePath,
            UE.CurveFloat,
            (e) => {
              e &&
                i.DoMoveForward(
                  t.MoveForwardDistance,
                  t.MoveForwardDuration,
                  e,
                );
            },
          ),
            (this.Ipt.CanPitchInput = !0),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.CalabashEnterInternalView,
            );
        }
      }),
      (this.Opt = (e, i) => {
        this.Ept.UpdateSkinInfo(e),
          (this.Rpt = e),
          this.kpt(),
          this.GetItem(6)?.SetUIActive(i),
          i || this.Fpt();
      }),
      (this.wpt = () => {
        if (this.Apt) {
          (this.Apt = !1), this.SPe?.PlayLevelSequenceByName("Back", !0);
          const t =
            UiCameraManager_1.UiCameraManager.Get().GetUiCameraComponent(
              UiCameraControlRotationComponent_1.UiCameraControlRotationComponent,
            );
          var e =
            ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashDevelopRewardByMonsterId(
              this.Rpt,
            );
          const a =
            ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterBodyTypeConfig(
              e.MonsterBodyType,
            );
          ResourceSystem_1.ResourceSystem.LoadAsync(
            a.MoveForwardCurvePath,
            UE.CurveFloat,
            (e) => {
              var i;
              e &&
                (i = UiSceneManager_1.UiSceneManager.GetHandBookVision()) &&
                i.IsValid() &&
                (t.SetArmLength(i.CameraArmLength),
                t.SetArmRotationByDefaultCamera(),
                t.StartFade(a.MoveForwardDuration, e, !0, !0, !0, !0));
            },
          ),
            (this.Ipt.CanPitchInput = !1),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.CalabashQuitInternalView,
            );
        } else
          Log_1.Log.CheckError() &&
            Log_1.Log.Error("Calabash", 44, "重复退出声骸图鉴的内部界面");
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UILoopScrollViewComponent],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIText],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[9, this.xpt]]);
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.ChangeCalabashCollectSimplyState,
      this.Ppt,
    );
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.ChangeCalabashCollectSimplyState,
      this.Ppt,
    );
  }
  async OnBeforeStartAsync() {
    (this.Apt = !1),
      (this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(
        this.GetRootItem(),
      )),
      (this.Ipt = new VisionCameraInputItem_1.VisionCameraInputItem()),
      await this.Ipt.OnlyCreateByActorAsync(this.GetItem(7).GetOwner()),
      this.AddChild(this.Ipt),
      (this.Spt = new LoopScrollView_1.LoopScrollView(
        this.GetLoopScrollViewComponent(0),
        this.GetItem(1).GetOwner(),
        this.w7,
        !0,
      )),
      (this.Tpt = new RoleModelLoadingItem_1.RoleModelLoadingItem()),
      await this.Tpt.CreateThenShowByResourceIdAsync(
        "UiItem_Loading_Prefab",
        UiLayer_1.UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.Pop),
      ).finally(() => {
        this.Tpt.SetLoadingActive(!1);
      }),
      (this.vpt = new FilterEntrance_1.FilterEntrance(
        this.GetItem(2),
        this.qpt,
      )),
      (this.Mpt = new SortEntrance_1.SortEntrance(this.GetItem(3), this.qpt));
    var e = this.ExtraParams;
    0 < e && (this.Dpt = e),
      this.Vpt(),
      (this.Ept = new CalabashCollectDetailItem_1.CalabashCollectDetailItem()),
      (this.Ept.OnLookOverBtnClick = this.Npt),
      (this.Ept.OnMonsterSkinBtnClickCallBack = this.Opt),
      await this.Ept.CreateThenShowByActorAsync(this.GetItem(4).GetOwner());
  }
  OnBeforeShow() {
    this.vpt.UpdateData(
      15,
      ModelManager_1.ModelManager.CalabashModel.GetCalabashDevelopRewardSortData(),
    ),
      this.Mpt.UpdateData(
        15,
        ModelManager_1.ModelManager.CalabashModel.GetCalabashDevelopRewardSortData(),
      ),
      this.Ept.RefreshDetailState(),
      this.GetButton(9).RootUIComp.SetActive(this.Apt);
  }
  OnBeforeHide() {
    (this.Dpt = this.Rpt), this.Tpt.SetLoadingActive(!1), this.Hpt();
  }
  OnBeforeDestroy() {
    this.kpt(), this.Tpt.Destroy();
  }
  bpt() {
    var e = this.Spt.GetSelectedGridIndex(),
      e = this.ypt[e];
    this.Ept.Update(e),
      (this.Rpt = e.DevelopRewardData.MonsterId),
      this.kpt(),
      e.UnlockData
        ? (this.GetItem(6)?.SetUIActive(!1), this.Fpt())
        : this.GetItem(6)?.SetUIActive(!0);
  }
  Fpt() {
    if (
      this.Upt !== ResourceSystem_1.ResourceSystem.InvalidId ||
      void 0 !== UiSceneManager_1.UiSceneManager.GetHandBookVision()
    )
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("Calabash", 44, "声骸模型重复加载");
    else {
      this.Tpt.SetLoadingActive(!0);
      const i = this.Rpt;
      var e =
        ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashDevelopRewardByMonsterId(
          i,
        );
      this.Upt = ResourceSystem_1.ResourceSystem.LoadAsync(
        e.HandBookBp + "_C",
        UE.Class,
        (e) => {
          this.jpt(i, e);
        },
      );
    }
  }
  jpt(e, i) {
    UiSceneManager_1.UiSceneManager.CreateHandBookVision(i);
    var i = UiSceneManager_1.UiSceneManager.GetHandBookVision(),
      t = (i.SetActorHiddenInGame(!0), UE.NewArray(UE.SkeletalMesh)),
      a = UE.NewArray(UE.StaticMesh),
      s = i.K2_GetComponentsByClass(UE.SkeletalMeshComponent.StaticClass()),
      r = i.K2_GetComponentsByClass(UE.StaticMeshComponent.StaticClass());
    if (s)
      for (let e = 0; e < s.Num(); e++) {
        var n = s.Get(e);
        n.SetForcedLOD(1), t.Add(n.SkeletalMesh);
      }
    if (r)
      for (let e = 0; e < r.Num(); e++) {
        var o = r.Get(e);
        o.SetForcedLodModel(1), a.Add(o.StaticMesh);
      }
    this.ENn =
      UiModelResourcesManager_1.UiModelResourcesManager.LoadMeshesComponentsBundleStreaming(
        t,
        a,
        () => {
          this.Kpt(e);
        },
      );
  }
  Kpt(e) {
    var i = UiCameraManager_1.UiCameraManager.Get().GetUiCameraComponent(
        UiCameraControlRotationComponent_1.UiCameraControlRotationComponent,
      ),
      t = UiSceneManager_1.UiSceneManager.GetHandBookVision();
    t
      ? t.CameraArmLength <= 0
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error("Calabash", 44, "相机臂长配置为空")
        : ((e =
            ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashDevelopRewardByMonsterId(
              e,
            )),
          UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandleByHandleName(
            e.HandBookCamera,
            !1,
            !1,
          ),
          i.SetArmLength(t.CameraArmLength),
          t?.SetActorHiddenInGame(!1),
          t?.PlayStart(),
          this.Tpt?.SetLoadingActive(!1))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Calabash", 44, "声骸模型为空");
  }
  kpt() {
    this.Upt !== ResourceSystem_1.ResourceSystem.InvalidId &&
      (ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.Upt),
      (this.Upt = ResourceSystem_1.ResourceSystem.InvalidId)),
      this.ENn !==
        UiModelResourcesManager_1.UiModelResourcesManager
          .StreamingInvalidValue &&
        (UiModelResourcesManager_1.UiModelResourcesManager.ReleaseMeshesComponentsBundleStreaming(
          this.ENn,
        ),
        (this.ENn =
          UiModelResourcesManager_1.UiModelResourcesManager.StreamingInvalidValue)),
      UiSceneManager_1.UiSceneManager.GetHandBookVision() &&
        UiSceneManager_1.UiSceneManager.DestroyHandBookVision();
  }
  Vpt() {
    var e = ModelManager_1.ModelManager.CalabashModel.GetCalabashAllSchedule(),
      i = ModelManager_1.ModelManager.CalabashModel.GetCalabashOwnSchedule();
    this.GetText(5)?.SetText(i + "/" + e);
  }
  Hpt() {
    (this.Rpt = 0), this.Spt?.DeselectCurrentGridProxy(), this.kpt();
  }
}
exports.CalabashCollectTabView = CalabashCollectTabView;
//# sourceMappingURL=CalabashCollectTabView.js.map
