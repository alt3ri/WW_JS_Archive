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
class AnimNotifyAddMeshMaterialControllerDataGroup extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments),
      (this.MaterialAssetData = void 0),
      (this.HideMeshAfterPlay = !1);
  }
  Constructor() {}
  K2_NotifyBegin(e, r, t) {
    if (GlobalData_1.GlobalData.World)
      if (UE.KismetSystemLibrary.IsValid(e)) {
        if ((e.SetHiddenInGame(!1), this.IsAllValid(e, r))) {
          var a = e.GetOwner(),
            o =
              (a instanceof UE.TsBaseCharacter_C &&
                Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn(
                  "RenderCharacter",
                  25,
                  "材质控制器不应该在角色蓝图上使用此动画通知，请检查动画",
                  ["Actor", e?.GetOwner()?.GetName()],
                  ["动画", r?.GetName()],
                  ["材质控制器", this.MaterialAssetData?.GetName()],
                ),
              new MaterialControllerData());
          (a instanceof TsEffectActor_1.default ||
            a?.IsA(UE.EffectSystemActor.StaticClass())) &&
            ((o.CharRenderingComponent = a.GetComponentByClass(
              UE.CharRenderingComponent_C.StaticClass(),
            )),
            o.CharRenderingComponent ||
              ((o.CharRenderingComponent = a.AddComponentByClass(
                UE.CharRenderingComponent_C.StaticClass(),
                !1,
                new UE.Transform(),
                !1,
              )),
              o.CharRenderingComponent.Init(8))),
            o.CharRenderingComponent ||
              ((o.RenderActor =
                UE.KuroRenderingRuntimeBPPluginBPLibrary.D_SpawnActorFromClass(
                  e,
                  UE.BP_MaterialControllerRenderActor_C.StaticClass(),
                  a.D_GetTransform(),
                )),
              (o.RenderActor.RefActor = a),
              (o.CharRenderingComponent = o.RenderActor.CharRenderingComponent),
              o.CharRenderingComponent.Init(7),
              o.CharRenderingComponent.AddComponentByCase(0, e)),
            o.CharRenderingComponent.SetLogicOwner(a),
            (o.HandleId =
              o.CharRenderingComponent.AddMaterialControllerDataGroup(
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
            13,
            "错误：动画Mesh不合法",
            ["Actor", e?.GetOwner()],
            ["动画", r?.GetName()],
          );
    return !1;
  }
  IsAllValid(t, e) {
    return UE.KismetSystemLibrary.IsValid(this.MaterialAssetData)
      ? !(!t || !UE.KismetSystemLibrary.IsValid(t)) ||
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "RenderCharacter",
              13,
              "错误：动画Mesh不合法",
              ["Actor", t?.GetOwner()?.GetName()],
              ["动画", e?.GetName()],
            ),
          !1)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "RenderCharacter",
            13,
            "错误：特效DA不合法",
            ["Actor", t?.GetOwner()?.GetName()],
            ["动画", e?.GetName()],
          ),
        !1);
  }
  K2_NotifyEnd(t, e) {
    var r, a;
    return (
      !!GlobalData_1.GlobalData.World &&
      ((r = materialControllerStateHandleMap.get(t)) &&
        (a = r.get(this)) &&
        (r.delete(this),
        r.size || materialControllerStateHandleMap.delete(t),
        a.CharRenderingComponent &&
          0 <= a.HandleId &&
          a.CharRenderingComponent.RemoveMaterialControllerDataGroup(
            a.HandleId,
          ),
        a.RenderActor &&
          (a.CharRenderingComponent.Destroy(), a.RenderActor.K2_DestroyActor()),
        this.HideMeshAfterPlay) &&
        t.SetHiddenInGame(!0),
      !0)
    );
  }
  GetNotifyName() {
    var t = this.MaterialAssetData.GetName();
    return t
      ? "召唤物/NPC材质控制器组:" +
          UE.BlueprintPathsLibrary.GetBaseFilename(t, !0)
      : "召唤物/NPC材质控制器组";
  }
}
exports.default = AnimNotifyAddMeshMaterialControllerDataGroup;
//# sourceMappingURL=AnimNotifyAddMeshMaterialControllerDataGroup.js.map
