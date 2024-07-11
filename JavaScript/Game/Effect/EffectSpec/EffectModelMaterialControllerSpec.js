"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EffectModelMaterialControllerSpec = void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  TsBaseCharacter_1 = require("../../Character/TsBaseCharacter"),
  GlobalData_1 = require("../../GlobalData"),
  CharRenderingComponent_1 = require("../../Render/Character/Manager/CharRenderingComponent"),
  SkeletalMeshEffectContext_1 = require("../EffectContext/SkeletalMeshEffectContext"),
  EffectSpec_1 = require("./EffectSpec");
class EffectModelMaterialControllerSpec extends EffectSpec_1.EffectSpec {
  constructor() {
    super(...arguments),
      (this.RenderActor = void 0),
      (this.RenderComp = void 0),
      (this.MaterialControllerHandle = void 0),
      (this.MaterialControllerGroupHandle = void 0);
  }
  GetOrCreateRenderingComponent() {
    var e = this.Handle?.GetContext();
    if (e?.EntityId) {
      var t = EntitySystem_1.EntitySystem.Get(e.EntityId)?.GetComponent(
        3,
      )?.Owner;
      if (t instanceof TsBaseCharacter_1.default)
        return t.CharRenderingComponent;
    }
    if (e?.SourceObject instanceof TsBaseCharacter_1.default)
      return e.SourceObject.CharRenderingComponent;
    let i = void 0;
    return (
      e &&
        (e instanceof SkeletalMeshEffectContext_1.SkeletalMeshEffectContext
          ? (i = e.SkeletalMeshComp)
          : e.SourceObject instanceof UE.SkeletalMeshComponent &&
            (i = e.SourceObject)),
      (i =
        void 0 === i &&
        (t =
          this.Handle.GetSureEffectActor()?.RootComponent?.GetAttachParent()) &&
        t.IsA(UE.SkeletalMeshComponent.StaticClass())
          ? t
          : i)
        ? (e = i.GetOwner()) instanceof TsBaseCharacter_1.default
          ? e.CharRenderingComponent
          : ((t = e.GetComponentByClass(
              CharRenderingComponent_1.default.StaticClass(),
            )) ||
              ((this.RenderActor =
                UE.KuroRenderingRuntimeBPPluginBPLibrary.SpawnActorFromClass(
                  i,
                  UE.BP_MaterialControllerRenderActor_C.StaticClass(),
                  new UE.Transform(),
                )),
              (t = this.RenderActor.CharRenderingComponent),
              GlobalData_1.GlobalData.IsUiSceneOpen ? t.Init(5) : t.Init(7),
              t.SetLogicOwner(e),
              t.AddComponentByCase(0, i)),
            t)
        : void 0
    );
  }
  OnInit() {
    return (
      this.EffectModel.MaterialControllerData ||
        this.EffectModel.MaterialControllerGroupData ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "RenderEffect",
            26,
            "EffectModelMaterialController未配置材质控制器或材质控制器组",
            ["EffectModelData", this.EffectModel.GetName()],
          )),
      !0
    );
  }
  OnPlay() {
    (this.MaterialControllerHandle = void 0),
      (this.MaterialControllerGroupHandle = void 0),
      (this.RenderComp = this.GetOrCreateRenderingComponent()),
      this.RenderComp ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "RenderEffect",
            26,
            "EffectModelMaterialController播放失败，找不到渲染组件或骨骼网格体",
            ["EffectModelData", this.EffectModel.GetName()],
          )),
      this.EffectModel.MaterialControllerData &&
        (this.MaterialControllerHandle =
          this.RenderComp?.AddMaterialControllerData(
            this.EffectModel.MaterialControllerData,
          )),
      this.EffectModel.MaterialControllerGroupData &&
        (this.MaterialControllerGroupHandle =
          this.RenderComp?.AddMaterialControllerData(
            this.EffectModel.MaterialControllerGroupData,
          ));
  }
  OnTick(e) {}
  OnStop() {
    this.MaterialControllerHandle &&
      (this.RenderComp?.RemoveMaterialControllerData(
        this.MaterialControllerHandle,
      ),
      (this.MaterialControllerHandle = void 0)),
      this.MaterialControllerGroupHandle &&
        (this.RenderComp?.RemoveMaterialControllerData(
          this.MaterialControllerGroupHandle,
        ),
        (this.MaterialControllerGroupHandle = void 0)),
      this.RenderActor &&
        (this.RenderComp.Destroy(),
        this.RenderActor.K2_DestroyActor(),
        (this.RenderActor = void 0)),
      (this.RenderComp = void 0);
  }
}
exports.EffectModelMaterialControllerSpec = EffectModelMaterialControllerSpec;
//# sourceMappingURL=EffectModelMaterialControllerSpec.js.map
