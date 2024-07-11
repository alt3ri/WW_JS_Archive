"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  TsEffectActor_1 = require("../../../Effect/TsEffectActor"),
  GlobalData_1 = require("../../../GlobalData");
class MaterialControllerData {
  constructor() {
    (this.HandleId = -1),
      (this.RenderActor = void 0),
      (this.CharRenderingComponent = void 0);
  }
}
const materialControllerStateHandleMap = new Map();
class AnimNotifyAddMeshMaterialControllerData extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments),
      (this.MaterialAssetData = void 0),
      (this.HideMeshAfterPlay = !1);
  }
  K2_NotifyBegin(e, a, t) {
    if (GlobalData_1.GlobalData.World)
      if (UE.KismetSystemLibrary.IsValid(e)) {
        if ((e.SetHiddenInGame(!1), this.IsAllValid(e, a))) {
          var r = e.GetOwner(),
            o =
              (r instanceof UE.TsBaseCharacter_C &&
                Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn(
                  "RenderCharacter",
                  41,
                  "除特殊情况外，TsBaseCharacter及其派生类应该使用AnimNotifyStateAddMaterialControllerData通知",
                  ["Actor", e?.GetOwner()?.GetName()],
                  ["动画", a?.GetName()],
                ),
              new MaterialControllerData());
          r instanceof TsEffectActor_1.default &&
            ((o.CharRenderingComponent = r.GetComponentByClass(
              UE.CharRenderingComponent_C.StaticClass(),
            )),
            o.CharRenderingComponent ||
              ((o.CharRenderingComponent = r.AddComponentByClass(
                UE.CharRenderingComponent_C.StaticClass(),
                !1,
                new UE.Transform(),
                !1,
              )),
              o.CharRenderingComponent.Init(7))),
            o.CharRenderingComponent ||
              ((o.RenderActor =
                UE.KuroRenderingRuntimeBPPluginBPLibrary.SpawnActorFromClass(
                  e,
                  UE.BP_MaterialControllerRenderActor_C.StaticClass(),
                  r.GetTransform(),
                )),
              (o.CharRenderingComponent = o.RenderActor.CharRenderingComponent),
              o.CharRenderingComponent.Init(7)),
            GlobalData_1.GlobalData.IsUiSceneOpen &&
              ++o.CharRenderingComponent.IsUiUpdate,
            o.CharRenderingComponent.SetLogicOwner(r),
            o.CharRenderingComponent.AddComponentByCase(0, e),
            (o.HandleId = o.CharRenderingComponent.AddMaterialControllerData(
              this.MaterialAssetData,
            ));
          let t = materialControllerStateHandleMap.get(e);
          return (
            t || ((t = new Map()), materialControllerStateHandleMap.set(e, t)),
            t.set(this, o),
            !0
          );
        }
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "RenderCharacter",
            14,
            "错误：动画Mesh不合法",
            ["Actor", e?.GetOwner()],
            ["动画", a?.GetName()],
          );
    return !1;
  }
  IsAllValid(t, e) {
    return UE.KismetSystemLibrary.IsValid(this.MaterialAssetData)
      ? !(!t || !UE.KismetSystemLibrary.IsValid(t)) ||
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "RenderCharacter",
              14,
              "错误：动画Mesh不合法",
              ["Actor", t?.GetOwner()?.GetName()],
              ["动画", e?.GetName()],
            ),
          !1)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "RenderCharacter",
            14,
            "错误：特效DA不合法",
            ["Actor", t?.GetOwner()?.GetName()],
            ["动画", e?.GetName()],
          ),
        !1);
  }
  K2_NotifyEnd(t, e) {
    var a, r;
    return (
      !!GlobalData_1.GlobalData.World &&
      ((a = materialControllerStateHandleMap.get(t)) &&
        (r = a.get(this)) &&
        (a.delete(this),
        a.size || materialControllerStateHandleMap.delete(t),
        r.CharRenderingComponent &&
          (0 <= r.HandleId &&
            r.CharRenderingComponent.RemoveMaterialControllerData(r.HandleId),
          GlobalData_1.GlobalData.IsUiSceneOpen) &&
          --r.CharRenderingComponent.IsUiUpdate,
        r.RenderActor &&
          (r.CharRenderingComponent.Destroy(), r.RenderActor.K2_DestroyActor()),
        this.HideMeshAfterPlay) &&
        t.SetHiddenInGame(!0),
      !0)
    );
  }
  GetNotifyName() {
    var t = this.MaterialAssetData.GetName();
    return t
      ? "召唤物/NPC材质控制器:" +
          UE.BlueprintPathsLibrary.GetBaseFilename(t, !0)
      : "召唤物/NPC材质控制器";
  }
}
exports.default = AnimNotifyAddMeshMaterialControllerData;
//# sourceMappingURL=AnimNotifyAddMeshMaterialControllerData.js.map
