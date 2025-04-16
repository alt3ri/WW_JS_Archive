"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  TsBaseCharacter_1 = require("../../../Character/TsBaseCharacter"),
  TsUiSceneRoleActor_1 = require("../../../Module/UiComponent/TsUiSceneRoleActor");
class MaterialControllerData {
  constructor() {
    (this.HandleId = -1), (this.CharRenderingComponent = void 0);
  }
}
const materialControllerStateHandleMap = new Map();
class AnimNotifyStateAddMaterialControllerData extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments), (this.MaterialAssetData = void 0);
  }
  Constructor() {}
  K2_NotifyBegin(r, a, e) {
    let o = -1;
    if (this.IsAllValid(r, a)) {
      a = r.GetOwner();
      if (a) {
        let t = void 0;
        if (a instanceof UE.TsBaseCharacter_C) {
          (t = a.CharRenderingComponent).CheckInit() || t.Init(a.RenderType);
          let e = void 0;
          var i = (e =
            a instanceof TsBaseCharacter_1.default
              ? a.CharacterActorComponent?.GetReplaceEffect(
                  UE.KismetSystemLibrary.GetPathName(this.MaterialAssetData),
                )
              : e)
            ? ResourceSystem_1.ResourceSystem.Load(
                e,
                UE.PD_CharacterControllerData_C,
              )
            : this.MaterialAssetData;
          o = t.AddMaterialControllerDataWithAnimObject(i, r, void 0);
        } else
          o =
            a instanceof TsUiSceneRoleActor_1.default
              ? a.Model.CheckGetComponent(5).AddRenderingMaterialByData(
                  this.MaterialAssetData,
                )
              : ((t = a.GetComponentByClass(
                  UE.CharRenderingComponent_C.StaticClass(),
                )) ||
                  ((t = a.AddComponentByClass(
                    UE.CharRenderingComponent_C.StaticClass(),
                    !1,
                    new UE.Transform(),
                    !1,
                  )).Init(8),
                  t.SetLogicOwner(a)),
                t.AddMaterialControllerDataWithAnimObject(
                  this.MaterialAssetData,
                  r,
                  void 0,
                ));
        if (0 <= o) {
          let e = materialControllerStateHandleMap.get(r);
          e || ((e = new Map()), materialControllerStateHandleMap.set(r, e));
          i = new MaterialControllerData();
          return (
            (i.HandleId = o), (i.CharRenderingComponent = t), e.set(this, i), !0
          );
        }
      }
    }
    return !1;
  }
  K2_NotifyEnd(e, t) {
    var r = materialControllerStateHandleMap.get(e);
    if (!r) return !0;
    var a = r.get(this);
    if (!a) return !0;
    r.delete(this), r.size || materialControllerStateHandleMap.delete(e);
    r = e.GetOwner();
    if (r)
      try {
        return (
          r instanceof TsUiSceneRoleActor_1.default
            ? r.Model.CheckGetComponent(5).RemoveRenderingMaterialWithEnding(
                a.HandleId,
              )
            : a.CharRenderingComponent?.RemoveMaterialControllerDataWithEnding(
                a.HandleId,
              ),
          !0
        );
      } catch {
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "RenderCharacter",
            25,
            "AnimNotifyStateAddMaterialControllerData移除材质控制器特效失败",
            ["Actor", e?.GetOwner()?.GetName()],
            ["动画", t?.GetName()],
            ["handleId", a.HandleId],
          );
      }
    return !1;
  }
  IsAllValid(e, t) {
    return UE.KismetSystemLibrary.IsValid(this.MaterialAssetData)
      ? e && UE.KismetSystemLibrary.IsValid(e)
        ? !!UE.KismetSystemLibrary.IsValid(e.GetOwner()) ||
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "RenderCharacter",
              13,
              "错误：动画Owner不合法",
              ["Actor", e?.GetOwner()?.GetName()],
              ["动画", t?.GetName()],
            ),
          !1)
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "RenderCharacter",
              13,
              "错误：动画Mesh不合法",
              ["Actor", e?.GetOwner()?.GetName()],
              ["动画", t?.GetName()],
            ),
          !1)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "RenderCharacter",
            13,
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
