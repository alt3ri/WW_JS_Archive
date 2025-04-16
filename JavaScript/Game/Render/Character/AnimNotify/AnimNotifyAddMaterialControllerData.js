"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  EntitySystem_1 = require("../../../../Core/Entity/EntitySystem"),
  TsUiSceneRoleActor_1 = require("../../../Module/UiComponent/TsUiSceneRoleActor");
class AnimNotifyAddMaterialControllerData extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments),
      (this.MaterialAssetData = void 0),
      (this.RemoveWhenRevive = !1);
  }
  Constructor() {}
  IsAllValid(t, e) {
    return UE.KismetSystemLibrary.IsValid(this.MaterialAssetData)
      ? t && UE.KismetSystemLibrary.IsValid(t)
        ? UE.KismetSystemLibrary.IsValid(t.GetOwner())
          ? 0 === this.MaterialAssetData.DataType ||
            (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "RenderCharacter",
                13,
                "错误：特效DA不能是Runtime类型,Runtime类型请使用AnimNotifyStateAddMaterialControllerData",
                ["Actor", t?.GetOwner()?.GetName()],
                ["动画", e?.GetName()],
                ["DA", this.MaterialAssetData?.GetName()],
              ),
            !1)
          : (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "RenderCharacter",
                13,
                "错误：动画Owner不合法",
                ["Actor", t?.GetOwner()?.GetName()],
                ["动画", e?.GetName()],
              ),
            !1)
        : (Log_1.Log.CheckError() &&
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
  K2_Notify(e, r) {
    if (this.IsAllValid(e, r)) {
      var o,
        i,
        r = e.GetOwner();
      if (r) {
        if (r instanceof UE.TsBaseCharacter_C)
          return (
            r.CharRenderingComponent.CheckInit() ||
              r.CharRenderingComponent.Init(r.RenderType),
            (i =
              0 <=
              (o =
                r.CharRenderingComponent.AddMaterialControllerDataWithAnimObject(
                  this.MaterialAssetData,
                  e,
                  void 0,
                ))) &&
              this.RemoveWhenRevive &&
              EntitySystem_1.EntitySystem.GetComponent(
                r.EntityId,
                189,
              )?.AddMaterialHandle(o),
            i
          );
        if (r instanceof TsUiSceneRoleActor_1.default)
          return (
            0 <=
            r.Model.CheckGetComponent(5).AddRenderingMaterialByData(
              this.MaterialAssetData,
            )
          );
        let t = r.GetComponentByClass(
          UE.CharRenderingComponent_C.StaticClass(),
        );
        t ||
          ((t = r.AddComponentByClass(
            UE.CharRenderingComponent_C.StaticClass(),
            !1,
            new UE.Transform(),
            !1,
          )).Init(8),
          t.SetLogicOwner(r)),
          t.AddMaterialControllerDataWithAnimObject(
            this.MaterialAssetData,
            e,
            void 0,
          );
      }
    }
    return !1;
  }
  GetNotifyName() {
    var t = this.MaterialAssetData.GetName();
    return t
      ? "材质控制器:" + UE.BlueprintPathsLibrary.GetBaseFilename(t, !0)
      : "材质控制器";
  }
}
exports.default = AnimNotifyAddMaterialControllerData;
//# sourceMappingURL=AnimNotifyAddMaterialControllerData.js.map
