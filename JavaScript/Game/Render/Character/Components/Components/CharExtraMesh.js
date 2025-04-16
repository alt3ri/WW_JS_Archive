"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharExtraMesh = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  RenderConfig_1 = require("../../../Config/RenderConfig"),
  RenderDataManager_1 = require("../../../Data/RenderDataManager"),
  CharRenderBase_1 = require("../../Manager/CharRenderBase");
class ExtraMeshInfo {
  constructor(e, t, r) {
    (this.Name = ""),
      (this.SourceComponent = void 0),
      (this.Component = void 0),
      (this.UsageCount = 0),
      (this.SourceComponent = e),
      (this.Component = t),
      (this.Name = r),
      t.K2_AttachToComponent(e, void 0, 0, 0, 0, !1),
      t.SetSkeletalMesh(e.SkeletalMesh),
      t.SetVisibility(!1),
      t.SetComponentTickEnabled(!1),
      t.SetCollisionEnabled(0);
    var s = this.Component.GetNumMaterials();
    for (let e = 0; e < s; ++e)
      this.Component.SetMaterial(
        e,
        RenderDataManager_1.RenderDataManager.Get().GetEmptyMaterial(),
      );
  }
  AddUsage() {
    0 === this.UsageCount &&
      (this.Component.SetVisibility(!0),
      this.Component.SetComponentTickEnabled(!0),
      this.Component.SetMasterPoseComponent(this.SourceComponent)),
      ++this.UsageCount;
  }
  RemoveUsage() {
    this.UsageCount <= 0
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "RenderCharacter",
          25,
          "ExtraMeshInfo UsageCount计数错误",
          ["Name", this.Name],
          ["UsageCount", this.UsageCount],
        )
      : (--this.UsageCount,
        0 === this.UsageCount &&
          (this.Component.SetVisibility(!1),
          this.Component.SetComponentTickEnabled(!1),
          this.Component.SetMasterPoseComponent(void 0)));
  }
}
class CharExtraMesh extends CharRenderBase_1.CharRenderBase {
  constructor() {
    super(...arguments), (this.ExtraMeshes = new Map());
  }
  Start() {
    this.OnInitSuccess();
  }
  EnsureExtraMesh(e) {
    var t, r, s;
    this.ExtraMeshes.has(e) ||
      ((s = this.RenderComponent.GetSkeletalMeshComponent(
        RenderConfig_1.RenderConfig.MaterialControlBodyCaseArray[0],
      ))
        ? ((t = RenderConfig_1.RenderConfig.GenerateExtraMeshName(e)),
          (r = this.GetRenderingComponent()
            .GetCachedOwner()
            .AddComponentByClass(
              UE.SkeletalMeshComponent.StaticClass(),
              !1,
              void 0,
              !1,
              new UE.FName(t),
            )),
          (s = new ExtraMeshInfo(s, r, t)),
          this.ExtraMeshes.set(e, s),
          this.RenderComponent?.AddComponentWithEmptyMaterial(s.Name, r))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "RenderCharacter",
            25,
            "EnsureExtraMesh未找到源骨骼网格体组件",
            ["SourceSkeletalName", e],
          ));
  }
  AddExtraSkeletalMeshUsage(e) {
    this.ExtraMeshes.has(e)
      ? this.ExtraMeshes.get(e).AddUsage()
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("RenderCharacter", 25, "找不到ExtraMesh", [
          "SourceSkeletalName",
          e,
        ]);
  }
  RemoveExtraSkeletalMeshUsage(e) {
    this.ExtraMeshes.has(e)
      ? this.ExtraMeshes.get(e).RemoveUsage()
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("RenderCharacter", 25, "找不到ExtraMesh", [
          "SourceSkeletalName",
          e,
        ]);
  }
  GetComponentId() {
    return RenderConfig_1.RenderConfig.IdExtraMesh;
  }
  GetStatName() {
    return "CharExtraMesh";
  }
}
exports.CharExtraMesh = CharExtraMesh;
//# sourceMappingURL=CharExtraMesh.js.map
