"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  TsUiSceneRoleActor_1 = require("../../../Module/UiComponent/TsUiSceneRoleActor"),
  materialControllerStateHandleMap = new Map();
class AnimNotifyStateAddMaterialControllerData extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments), (this.MaterialAssetData = void 0);
  }
  K2_NotifyBegin(t, e, r) {
    let o = -1;
    if (
      (this.IsAllValid(t, e) &&
        ((e = t.GetOwner()) instanceof UE.TsBaseCharacter_C
          ? (e.CharRenderingComponent.CheckInit() ||
              e.CharRenderingComponent.Init(e.RenderType),
            (o = e.CharRenderingComponent.AddMaterialControllerData(
              this.MaterialAssetData,
            )))
          : e instanceof TsUiSceneRoleActor_1.default &&
            (o = e.Model.CheckGetComponent(5).AddRenderingMaterialByData(
              this.MaterialAssetData,
            ))),
      0 <= o)
    ) {
      let e = materialControllerStateHandleMap.get(t);
      return (
        e || ((e = new Map()), materialControllerStateHandleMap.set(t, e)),
        e.set(this, o),
        !0
      );
    }
    return !1;
  }
  K2_NotifyEnd(e, t) {
    var r = materialControllerStateHandleMap.get(e);
    if (!r) return !0;
    var o = r.get(this);
    if (!o) return !0;
    if (
      (r.delete(this),
      r.size || materialControllerStateHandleMap.delete(e),
      0 <= o)
    ) {
      r = e.GetOwner();
      if (r instanceof UE.TsBaseCharacter_C)
        return (
          r.CharRenderingComponent.RemoveMaterialControllerDataWithEnding(o), !0
        );
      if (r instanceof TsUiSceneRoleActor_1.default)
        return (
          r.Model.CheckGetComponent(5).RemoveRenderingMaterialWithEnding(o), !0
        );
    }
    return !1;
  }
  IsAllValid(e, t) {
    var r;
    return UE.KismetSystemLibrary.IsValid(this.MaterialAssetData)
      ? e && UE.KismetSystemLibrary.IsValid(e)
        ? UE.KismetSystemLibrary.IsValid(e.GetOwner())
          ? (r = e.GetOwner()) instanceof UE.TsBaseCharacter_C ||
            r instanceof TsUiSceneRoleActor_1.default ||
            (Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "RenderCharacter",
                14,
                "错误：必须是TsBaseCharacter或者TsUiSceneRoleActor及其派生类调用",
                ["Actor", e?.GetOwner()?.GetName()],
                ["动画", t?.GetName()],
              ),
            !1)
          : (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "RenderCharacter",
                14,
                "错误：动画Owner不合法",
                ["Actor", e?.GetOwner()?.GetName()],
                ["动画", t?.GetName()],
              ),
            !1)
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "RenderCharacter",
              14,
              "错误：动画Mesh不合法",
              ["Actor", e?.GetOwner()?.GetName()],
              ["动画", t?.GetName()],
            ),
          !1)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "RenderCharacter",
            14,
            "错误：特效DA不合法",
            ["Actor", e?.GetOwner()?.GetName()],
            ["动画", t?.GetName()],
          ),
        !1);
  }
  GetNotifyName() {
    var e = this.MaterialAssetData.GetName();
    return e && "" !== e
      ? "材质控制器:" + UE.BlueprintPathsLibrary.GetBaseFilename(e, !0)
      : "材质控制器";
  }
}
exports.default = AnimNotifyStateAddMaterialControllerData;
//# sourceMappingURL=AnimNotifyStateAddMaterialControllerData.js.map
