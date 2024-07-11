"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleNewJoinView = void 0);
const UE = require("ue");
const ActorSystem_1 = require("../../../../Core/Actor/ActorSystem");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../Core/Common/Log");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const FNameUtil_1 = require("../../../../Core/Utils/FNameUtil");
const CameraController_1 = require("../../../Camera/CameraController");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RenderModuleController_1 = require("../../../Render/Manager/RenderModuleController");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const BlackScreenController_1 = require("../../BlackScreen/BlackScreenController");
const GachaDefine_1 = require("../../Gacha/GachaDefine");
const GachaScanView_1 = require("../../Gacha/GachaResultView/GachaScanView");
const UiCameraAnimationManager_1 = require("../../UiCameraAnimation/UiCameraAnimationManager");
const UiModelResourcesManager_1 = require("../../UiComponent/UiModelResourcesManager");
const SimpleGenericLayout_1 = require("../../Util/Layout/SimpleGenericLayout");
const RoleController_1 = require("../RoleController");
class RoleNewJoinView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.zke = 0),
      (this.EPe = void 0),
      (this.UiCameraHandleData = void 0),
      (this.Bkt = void 0),
      (this.eWt = void 0),
      (this.tWt = void 0),
      (this.iWt = void 0),
      (this.oWt = void 0),
      (this.exe = void 0),
      (this.hWt = void 0),
      (this.$be = void 0),
      (this.aGn =
        UiModelResourcesManager_1.UiModelResourcesManager.StreamingInvalidValue),
      (this.lWt = 0),
      (this.cgo = !1),
      (this.OnSequenceEventByStringParam = (e) => {
        switch (e) {
          case "Flash1":
            this.eWt.NiagaraComponent.ReinitializeSystem();
            break;
          case "Flash2":
            this.lWt === 5
              ? (this.tWt.SetActorHiddenInGame(!1),
                this.tWt?.NiagaraComponent.ReinitializeSystem())
              : this.lWt === 4
                ? (this.iWt.SetActorHiddenInGame(!1),
                  this.iWt?.NiagaraComponent.ReinitializeSystem())
                : this.lWt === 3 &&
                  (this.oWt.SetActorHiddenInGame(!1),
                  this.oWt?.NiagaraComponent.ReinitializeSystem());
        }
      }),
      (this.CloseViewEvent = () => {
        this.wWt();
      }),
      (this.wWt = () => {
        this.BWt(!0);
      }),
      (this.BWt = (e) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Gacha", 28, "GachaScene被关闭"),
          e &&
            (UiManager_1.UiManager.IsViewShow(this.Info.Name) && this.CloseMe(),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.AfterCloseGachaScene,
            ));
      }),
      (this.mgo = () => {
        this.$ne();
      }),
      (this.vao = () => {
        this.cgo || ((this.cgo = !0), this.dgo());
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIItem],
      [2, UE.UITexture],
      [3, UE.UITexture],
      [4, UE.UIHorizontalLayout],
      [5, UE.UIText],
      [6, UE.UIButtonComponent],
      [7, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [6, this.vao],
        [7, this.mgo],
      ]);
  }
  OnBeforeCreate() {
    (this.zke = this.OpenParam),
      (this.lWt = ConfigManager_1.ConfigManager.GachaConfig.GetRoleInfoById(
        this.zke,
      ).QualityId);
  }
  async OnCreateAsync() {
    await Promise.all([
      ModelManager_1.ModelManager.GachaModel.PreloadGachaSequence([this.zke]),
      BlackScreenController_1.BlackScreenController.AddBlackScreenAsync(
        "Start",
        "RoleNewJoinView",
      ),
    ]);
  }
  async OnBeforeStartAsync() {
    await this.lGn();
  }
  async lGn() {
    var e = this.zke;
    var e = ConfigManager_1.ConfigManager.GachaConfig.GetGachaTextureInfo(e);
    var e =
      ConfigManager_1.ConfigManager.GachaConfig.GetGachaSequenceConfigById(
        e.ShowSequence,
      );
    var e = ModelManager_1.ModelManager.GachaModel.GetLoadedSequence(
      e.SequencePath,
    );
    const i =
      ((this.Bkt = ActorSystem_1.ActorSystem.Get(
        UE.LevelSequenceActor.StaticClass(),
        new UE.Transform(),
        void 0,
        !1,
      )),
      this.Bkt.SetSequence(e),
      UE.NewArray(UE.SkeletalMesh));
    const t = new CustomPromise_1.CustomPromise();
    const s = this.Bkt.GetBindingByTagInTemplate(
      GachaScanView_1.SCENE_ROLE_TAG,
      !0,
    );
    for (let e = 0; e < s.Num(); e++) {
      const r = s.Get(e);
      if (r) {
        const a = r.K2_GetComponentsByClass(
          UE.SkeletalMeshComponent.StaticClass(),
        );
        for (let e = 0; e < a.Num(); e++) {
          const o = a.Get(e);
          i.Add(o.SkeletalMesh);
        }
      }
    }
    i.Num() <= 0 ||
      ((this.aGn =
        UiModelResourcesManager_1.UiModelResourcesManager.LoadMeshesComponentsBundleStreaming(
          i,
          void 0,
          () => {
            t.SetResult();
          },
        )),
      await t.Promise);
  }
  OnStart() {
    this.$be = new SimpleGenericLayout_1.SimpleGenericLayout(
      this.GetHorizontalLayout(4),
    );
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.PlaySequenceEventByStringParam,
      this.OnSequenceEventByStringParam,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CloseGachaSceneView,
        this.CloseViewEvent,
      );
  }
  OnAfterShow() {
    (this.cgo = !1), this.bl();
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.PlaySequenceEventByStringParam,
      this.OnSequenceEventByStringParam,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CloseGachaSceneView,
        this.CloseViewEvent,
      );
  }
  OnBeforeDestroy() {
    UiCameraAnimationManager_1.UiCameraAnimationManager.PopCameraHandle(
      this.UiCameraHandleData,
      GachaDefine_1.GACHA_BLEND_CAMERA,
    ),
      this.aGn ===
        UiModelResourcesManager_1.UiModelResourcesManager
          .StreamingInvalidValue &&
        (UiModelResourcesManager_1.UiModelResourcesManager.ReleaseMeshesComponentsBundleStreaming(
          this.aGn,
        ),
        (this.aGn =
          UiModelResourcesManager_1.UiModelResourcesManager.StreamingInvalidValue)),
      this.DWt(),
      this.hWt?.EndGachaScene(),
      ModelManager_1.ModelManager.GachaModel.ReleaseLoadGachaSequence();
  }
  OnHandleLoadScene() {
    (this.exe = UE.KuroCollectActorComponent.GetActorWithTag(
      FNameUtil_1.FNameUtil.GetDynamicFName("SceneCamera1"),
      0,
    )),
      (this.eWt = UE.KuroCollectActorComponent.GetActorWithTag(
        FNameUtil_1.FNameUtil.GetDynamicFName("Flash1"),
        0,
      )),
      (this.tWt = UE.KuroCollectActorComponent.GetActorWithTag(
        FNameUtil_1.FNameUtil.GetDynamicFName("BurstGold"),
        0,
      )),
      (this.iWt = UE.KuroCollectActorComponent.GetActorWithTag(
        FNameUtil_1.FNameUtil.GetDynamicFName("BurstPurple"),
        0,
      )),
      (this.oWt = UE.KuroCollectActorComponent.GetActorWithTag(
        FNameUtil_1.FNameUtil.GetDynamicFName("BurstWhite"),
        0,
      )),
      (this.hWt = UE.KuroCollectActorComponent.GetActorWithTag(
        FNameUtil_1.FNameUtil.GetDynamicFName("UpdateInteractBP"),
        0,
      )),
      this.hWt.SetTickableWhenPaused(!0),
      this.eWt.K2_AttachToActor(this.exe, void 0, 2, 2, 2, !1),
      this.tWt.K2_AttachToActor(this.exe, void 0, 2, 2, 2, !1),
      this.iWt.K2_AttachToActor(this.exe, void 0, 2, 2, 2, !1),
      this.oWt.K2_AttachToActor(this.exe, void 0, 2, 2, 2, !1);
    const e = new UE.Vector(200, 0, 0);
    var i = new UE.Vector(60, 0, 0);
    const t = new UE.Rotator(0, 90, 0);
    var i =
      (this.eWt.K2_SetActorRelativeLocation(i, !1, void 0, !1),
      this.tWt.K2_SetActorRelativeLocation(e, !1, void 0, !1),
      this.iWt.K2_SetActorRelativeLocation(e, !1, void 0, !1),
      this.oWt.K2_SetActorRelativeLocation(e, !1, void 0, !1),
      this.eWt.K2_SetActorRelativeRotation(t, !1, void 0, !1),
      this.tWt.K2_SetActorRelativeRotation(t, !1, void 0, !1),
      this.iWt.K2_SetActorRelativeRotation(t, !1, void 0, !1),
      this.oWt.K2_SetActorRelativeRotation(t, !1, void 0, !1),
      UE.KuroCollectActorComponent.GetActorWithTag(
        FNameUtil_1.FNameUtil.GetDynamicFName("GachaBP"),
        0,
      ));
    i.TSInitParameters(this.lWt),
      i.Timeline_0?.Stop(),
      (i.IsSkip = !0),
      i.WhiteScreenOff(),
      i.EndGachaSequence(),
      (this.UiCameraHandleData =
        UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandleByHandleName(
          GachaDefine_1.GACHA_WEAPON_CAMERA,
          !0,
          !0,
          GachaDefine_1.GACHA_BLEND_CAMERA,
        ));
  }
  bl() {
    this.yWt(),
      this.Og(),
      this.RefreshModel(),
      this.UiViewSequence.StopPrevSequence(!1),
      this.UiViewSequence.PlaySequence("Show", !0);
  }
  Og() {
    let e;
    var i = this.zke;
    var i = ConfigManager_1.ConfigManager.GachaConfig.GetRoleInfoById(i);
    let t = ConfigManager_1.ConfigManager.CommonConfig.GetElementConfig(
      i.ElementId,
    );
    t &&
      (this.GetTexture(3).SetColor(UE.Color.FromHex(t.ElementColor)),
      (e = this.GetTexture(2)),
      this.SetTextureByPath(t.Icon, e),
      (t = UE.Color.FromHex(t.ElementColor)),
      e.SetColor(t)),
      this.GetText(0).ShowTextNew(i.Name),
      this.GetText(5).ShowTextNew(i.Introduction),
      this.$be.RebuildLayout(this.lWt),
      BlackScreenController_1.BlackScreenController.RemoveBlackScreen(
        "Close",
        "RoleNewJoinView",
      );
  }
  RefreshModel() {
    let e;
    var i = this.zke;
    var i = ConfigManager_1.ConfigManager.GachaConfig.GetGachaTextureInfo(i);
    let t =
      (CameraController_1.CameraController.SetViewTarget(
        this.exe,
        "RoleNewJoinView.RefreshModel",
      ),
      new UE.MovieSceneSequencePlaybackSettings());
    (t.bRestoreState = !0),
      (t.bPauseAtEnd = !0),
      (this.Bkt.PlaybackSettings = t),
      this.Bkt.AddBindingByTag(GachaScanView_1.SCENE_CAMERA_TAG, this.exe),
      (this.EPe = this.Bkt.SequencePlayer),
      RenderModuleController_1.RenderModuleController.DebugNewUiSceneWorkflow
        ? i.BindPoint?.length > 0
          ? ((this.Bkt.bOverrideInstanceData = !0),
            (this.Bkt.DefaultInstanceData.TransformOriginActor =
              UE.KuroCollectActorComponent.GetActorWithTag(
                FNameUtil_1.FNameUtil.GetDynamicFName(i.BindPoint),
                1,
              )))
          : ((this.Bkt.bOverrideInstanceData = !0),
            (t = this.Bkt.DefaultInstanceData),
            (e = UE.KuroCollectActorComponent.GetActorWithTag(
              FNameUtil_1.FNameUtil.GetDynamicFName("KuroUiSceneRoot"),
              1,
            )),
            (t.TransformOrigin = e.GetTransform()))
        : i.BindPoint?.length > 0 &&
          ((this.Bkt.bOverrideInstanceData = !0),
          (this.Bkt.DefaultInstanceData.TransformOriginActor =
            UE.KuroCollectActorComponent.GetActorWithTag(
              FNameUtil_1.FNameUtil.GetDynamicFName(i.BindPoint),
              1,
            ))),
      this.EPe.PlayTo(
        new UE.MovieSceneSequencePlaybackParams(
          new UE.FrameTime(),
          0,
          "A",
          2,
          0,
        ),
      ),
      this.RWt();
  }
  RWt() {
    const e = ConfigManager_1.ConfigManager.GachaConfig.GetRoleInfoById(
      this.zke,
    );
    e.Id === 1302
      ? this.hWt?.Yinlin()
      : e.Id === 1404
        ? this.hWt?.Jiyan()
        : e.Id === 1203
          ? this.hWt?.Anke()
          : e.Id === 1503
            ? this.hWt?.Jueyuan()
            : e.Id === 1301
              ? this.hWt?.Kakaluo()
              : e.Id === 1603
                ? this.hWt?.Chun()
                : e.Id === 1104
                  ? this.hWt?.Awu()
                  : e.QualityId === 5
                    ? this.hWt?.CharacterGolden()
                    : e.QualityId === 4 && this.hWt?.CharacterPurple();
  }
  yWt() {
    this.tWt.SetActorHiddenInGame(!0),
      this.iWt.SetActorHiddenInGame(!0),
      this.oWt.SetActorHiddenInGame(!0),
      this.tWt.NiagaraComponent?.Deactivate(),
      this.iWt.NiagaraComponent?.Deactivate(),
      this.oWt.NiagaraComponent?.Deactivate();
  }
  DWt() {
    if (
      (this.EPe &&
        (this.EPe.OnStop.Clear(), this.EPe.Stop(), (this.EPe = void 0)),
      this.Bkt?.IsValid())
    ) {
      const e = this.Bkt;
      TimerSystem_1.TimerSystem.Next(() => {
        ActorSystem_1.ActorSystem.Put(e);
      }),
        (this.Bkt = void 0);
    }
  }
  $ne() {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.CloseGachaSceneView,
    );
  }
  async dgo() {
    await BlackScreenController_1.BlackScreenController.AddBlackScreenAsync(
      "Start",
      "RoleNewJoinView",
    );
    const e = [this.zke];
    RoleController_1.RoleController.CloseAndOpenRoleMainView(
      this.Info.Name,
      0,
      this.zke,
      e,
      void 0,
      () => {
        BlackScreenController_1.BlackScreenController.RemoveBlackScreen(
          "Close",
          "RoleNewJoinView",
        ),
          this.$ne();
      },
    );
  }
}
exports.RoleNewJoinView = RoleNewJoinView;
// # sourceMappingURL=RoleNewJoinView.js.map
