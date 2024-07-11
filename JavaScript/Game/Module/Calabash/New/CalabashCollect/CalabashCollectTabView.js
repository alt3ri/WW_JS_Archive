"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CalabashCollectTabView = void 0);
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiTabViewBase_1 = require("../../../../Ui/Base/UiTabViewBase");
const UiLayerType_1 = require("../../../../Ui/Define/UiLayerType");
const UiLayer_1 = require("../../../../Ui/UiLayer");
const FilterEntrance_1 = require("../../../Common/FilterSort/Filter/View/FilterEntrance");
const SortEntrance_1 = require("../../../Common/FilterSort/Sort/View/SortEntrance");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const VisionCameraInputItem_1 = require("../../../Phantom/Vision/View/VisionCameraInputItem");
const RoleModelLoadingItem_1 = require("../../../RoleUi/Component/RoleModelLoadingItem");
const UiCameraControlRotationComponent_1 = require("../../../UiCamera/UiCameraComponent/UiCameraControlRotationComponent");
const UiCameraManager_1 = require("../../../UiCamera/UiCameraManager");
const UiCameraAnimationManager_1 = require("../../../UiCameraAnimation/UiCameraAnimationManager");
const UiModelResourcesManager_1 = require("../../../UiComponent/UiModelResourcesManager");
const UiSceneManager_1 = require("../../../UiComponent/UiSceneManager");
const LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView");
const CalabashCollectDetailItem_1 = require("./CalabashCollectDetailItem");
const CalabashCollectGridItem_1 = require("./CalabashCollectGridItem");
class CalabashCollectTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments),
      (this.aft = void 0),
      (this.hft = void 0),
      (this.lft = void 0),
      (this._ft = void 0),
      (this.uft = void 0),
      (this.cft = void 0),
      (this.mft = void 0),
      (this.Cft = 0),
      (this.gft = 0),
      (this.fft = ResourceSystem_1.ResourceSystem.InvalidId),
      (this.aGn =
        UiModelResourcesManager_1.UiModelResourcesManager.StreamingInvalidValue),
      (this.pft = !1),
      (this.EPe = void 0),
      (this.vft = () => {
        ModelManager_1.ModelManager.CalabashModel.GetIfSimpleState()
          ? this.lft.PlayDetailShowSequence()
          : this.lft.PlayDetailHideSequence();
      }),
      (this.Mft = () => {
        this.Sft();
      }),
      (this.w7 = () => {
        const e = new CalabashCollectGridItem_1.CalabashCollectGridItem();
        return (e.OnToggleClick = this.I6e), (e.CanToggleChange = this.Eft), e;
      }),
      (this.I6e = (e) => {
        this._ft.SelectGridProxy(e), this.yft();
      }),
      (this.Eft = (e) => this._ft?.GetSelectedGridIndex() !== e),
      (this.Ift = (e) => {
        (this.uft = e), this._ft.RefreshByData(this.uft, !1, this.Tft, !0);
      }),
      (this.Tft = () => {
        let i = 0;
        let e =
          (this.Cft > 0
            ? ((i = this.Cft), (this.Cft = 0))
            : this.gft > 0 && (i = this.gft),
          0);
        i > 0 &&
          (e = this.uft.findIndex((e) => e.DevelopRewardData.MonsterId === i)),
          (e = Math.max(0, e)),
          this._ft.SelectGridProxy(e),
          this._ft.ScrollToGridIndex(e),
          this.yft();
      }),
      (this.Lft = () => {
        if (this.pft)
          Log_1.Log.CheckError() &&
            Log_1.Log.Error("Calabash", 44, "重复进入声骸图鉴的内部界面");
        else {
          (this.pft = !0), this.EPe?.PlayLevelSequenceByName("Enter", !0);
          const i =
            UiCameraManager_1.UiCameraManager.Get().GetUiCameraComponent(
              UiCameraControlRotationComponent_1.UiCameraControlRotationComponent,
            );
          const e =
            ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashDevelopRewardByMonsterId(
              this.gft,
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
            (this.cft.CanPitchInput = !0),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.CalabashEnterInternalView,
            );
        }
      }),
      (this.Dft = (e, i) => {
        this.lft.UpdateSkinInfo(e),
          (this.gft = e),
          this.Rft(),
          this.GetItem(6)?.SetUIActive(i),
          i || this.Uft();
      }),
      (this.Sft = () => {
        if (this.pft) {
          (this.pft = !1), this.EPe?.PlayLevelSequenceByName("Back", !0);
          const t =
            UiCameraManager_1.UiCameraManager.Get().GetUiCameraComponent(
              UiCameraControlRotationComponent_1.UiCameraControlRotationComponent,
            );
          const e =
            ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashDevelopRewardByMonsterId(
              this.gft,
            );
          const a =
            ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterBodyTypeConfig(
              e.MonsterBodyType,
            );
          ResourceSystem_1.ResourceSystem.LoadAsync(
            a.MoveForwardCurvePath,
            UE.CurveFloat,
            (e) => {
              let i;
              e &&
                (i = UiSceneManager_1.UiSceneManager.GetHandBookVision()) &&
                i.IsValid() &&
                (t.SetArmLength(i.CameraArmLength),
                t.SetArmRotationByDefaultCamera(),
                t.StartFade(a.MoveForwardDuration, e, !0, !0, !0, !0));
            },
          ),
            (this.cft.CanPitchInput = !1),
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
      (this.BtnBindInfo = [[9, this.Mft]]);
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.ChangeCalabashCollectSimplyState,
      this.vft,
    );
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.ChangeCalabashCollectSimplyState,
      this.vft,
    );
  }
  async OnBeforeStartAsync() {
    (this.pft = !1),
      (this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(
        this.GetRootItem(),
      )),
      (this.cft = new VisionCameraInputItem_1.VisionCameraInputItem()),
      await this.cft.OnlyCreateByActorAsync(this.GetItem(7).GetOwner()),
      this.AddChild(this.cft),
      (this._ft = new LoopScrollView_1.LoopScrollView(
        this.GetLoopScrollViewComponent(0),
        this.GetItem(1).GetOwner(),
        this.w7,
        !0,
      )),
      (this.mft = new RoleModelLoadingItem_1.RoleModelLoadingItem()),
      await this.mft
        .CreateThenShowByResourceIdAsync(
          "UiItem_Loading_Prefab",
          UiLayer_1.UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.Pop),
        )
        .finally(() => {
          this.mft.SetLoadingActive(!1);
        }),
      (this.aft = new FilterEntrance_1.FilterEntrance(
        this.GetItem(2),
        this.Ift,
      )),
      (this.hft = new SortEntrance_1.SortEntrance(this.GetItem(3), this.Ift));
    const e = this.ExtraParams;
    e > 0 && (this.Cft = e),
      this.Aft(),
      (this.lft = new CalabashCollectDetailItem_1.CalabashCollectDetailItem()),
      (this.lft.OnLookOverBtnClick = this.Lft),
      (this.lft.OnMonsterSkinBtnClickCallBack = this.Dft),
      await this.lft.CreateThenShowByActorAsync(this.GetItem(4).GetOwner());
  }
  OnBeforeShow() {
    this.aft.UpdateData(
      15,
      ModelManager_1.ModelManager.CalabashModel.GetCalabashDevelopRewardSortData(),
    ),
      this.hft.UpdateData(
        15,
        ModelManager_1.ModelManager.CalabashModel.GetCalabashDevelopRewardSortData(),
      ),
      this.lft.RefreshDetailState();
  }
  OnBeforeHide() {
    (this.Cft = this.gft), this.mft.SetLoadingActive(!1), this.Pft();
  }
  OnBeforeDestroy() {
    this.Rft(), this.mft.Destroy();
  }
  yft() {
    var e = this._ft.GetSelectedGridIndex();
    var e = this.uft[e];
    this.lft.Update(e),
      (this.gft = e.DevelopRewardData.MonsterId),
      this.Rft(),
      e.UnlockData
        ? (this.GetItem(6)?.SetUIActive(!1), this.Uft())
        : this.GetItem(6)?.SetUIActive(!0);
  }
  Uft() {
    if (
      this.fft !== ResourceSystem_1.ResourceSystem.InvalidId ||
      void 0 !== UiSceneManager_1.UiSceneManager.GetHandBookVision()
    )
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("Calabash", 44, "声骸模型重复加载");
    else {
      this.mft.SetLoadingActive(!0);
      const i = this.gft;
      const e =
        ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashDevelopRewardByMonsterId(
          i,
        );
      this.fft = ResourceSystem_1.ResourceSystem.LoadAsync(
        e.HandBookBp + "_C",
        UE.Class,
        (e) => {
          this.xft(i, e);
        },
      );
    }
  }
  xft(e, i) {
    UiSceneManager_1.UiSceneManager.CreateHandBookVision(i);
    var i = UiSceneManager_1.UiSceneManager.GetHandBookVision();
    const t = (i.SetActorHiddenInGame(!0), UE.NewArray(UE.SkeletalMesh));
    const a = UE.NewArray(UE.StaticMesh);
    const s = i.K2_GetComponentsByClass(UE.SkeletalMeshComponent.StaticClass());
    const r = i.K2_GetComponentsByClass(UE.StaticMeshComponent.StaticClass());
    if (s)
      for (let e = 0; e < s.Num(); e++) {
        const n = s.Get(e);
        n.SetForcedLOD(1), t.Add(n.SkeletalMesh);
      }
    if (r)
      for (let e = 0; e < r.Num(); e++) {
        const o = r.Get(e);
        o.SetForcedLodModel(1), a.Add(o.StaticMesh);
      }
    this.aGn =
      UiModelResourcesManager_1.UiModelResourcesManager.LoadMeshesComponentsBundleStreaming(
        t,
        a,
        () => {
          this.Bft(e);
        },
      );
  }
  Bft(e) {
    const i = UiCameraManager_1.UiCameraManager.Get().GetUiCameraComponent(
      UiCameraControlRotationComponent_1.UiCameraControlRotationComponent,
    );
    const t = UiSceneManager_1.UiSceneManager.GetHandBookVision();
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
          t.SetActorHiddenInGame(!1),
          t.PlayStart(),
          this.mft.SetLoadingActive(!1))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Calabash", 44, "声骸模型为空");
  }
  Rft() {
    this.fft !== ResourceSystem_1.ResourceSystem.InvalidId &&
      (ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.fft),
      (this.fft = ResourceSystem_1.ResourceSystem.InvalidId)),
      this.aGn !==
        UiModelResourcesManager_1.UiModelResourcesManager
          .StreamingInvalidValue &&
        (UiModelResourcesManager_1.UiModelResourcesManager.ReleaseMeshesComponentsBundleStreaming(
          this.aGn,
        ),
        (this.aGn =
          UiModelResourcesManager_1.UiModelResourcesManager.StreamingInvalidValue)),
      UiSceneManager_1.UiSceneManager.GetHandBookVision() &&
        UiSceneManager_1.UiSceneManager.DestroyHandBookVision();
  }
  Aft() {
    const e =
      ModelManager_1.ModelManager.CalabashModel.GetCalabashAllSchedule();
    const i =
      ModelManager_1.ModelManager.CalabashModel.GetCalabashOwnSchedule();
    this.GetText(5)?.SetText(i + "/" + e);
  }
  Pft() {
    (this.gft = 0), this._ft?.DeselectCurrentGridProxy(), this.Rft();
  }
}
exports.CalabashCollectTabView = CalabashCollectTabView;
// # sourceMappingURL=CalabashCollectTabView.js.map
