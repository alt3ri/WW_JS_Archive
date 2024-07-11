"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CombineMeshTool = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  ObjectUtils_1 = require("../../../../../../Core/Utils/ObjectUtils");
class CombineMeshTool {
  static LoadDaConfig(t, e, i, s) {
    t &&
      i &&
      s &&
      (this.BWo(i, s),
      this.bWo(t, e, i, s.Skel_Hair, s),
      this.qWo(t, e, i, s.Skel_Face, s),
      1 === s.NpcSetupType
        ? (this.GWo(t, e, i, s.Skel_BodyUp, s),
          this.NWo(t, e, i, s.Skel_BodyDown, s))
        : this.OWo(t, e, i, s.Skel_Body, s),
      this.kWo(t, i, s.Hook_Arm, s.Hook_Arm_Socket, s),
      this.kWo(t, i, s.Hook_Back, s.Hook_Back_Socket, s),
      this.kWo(t, i, s.Hook_Leg, s.Hook_Leg_Socket, s),
      this.kWo(t, i, s.Hook_Waist, s.Hook_Waist_Socket, s),
      this.kWo(t, i, s.Hook_Weapon, s.Hook_Weapon_Socket, s),
      this.kWo(t, i, s.Hook_Head, s.Hook_Head_Socket, s));
  }
  static BWo(t, e) {
    t.SetSkeletalMesh(void 0),
      t.SetVisibility(!0, !1),
      (t.bRenderInMainPass = !1),
      (t.CastShadow = !0),
      ObjectUtils_1.ObjectUtils.IsValid(e.Skel_Main) &&
        t.SetSkeletalMesh(e.Skel_Main, !0);
  }
  static FWo(t, e, i, s, o, h, a = !1) {
    if (
      o &&
      ObjectUtils_1.ObjectUtils.IsValid(o) &&
      ObjectUtils_1.ObjectUtils.IsValid(e)
    ) {
      var r = e.AddComponentByClass(
        UE.SkeletalMeshComponent.StaticClass(),
        !0,
        i,
        !1,
        h,
      );
      if (ObjectUtils_1.ObjectUtils.IsValid(r)) {
        (r.bUseAttachParentBound = !0),
          (r.bUseBoundsFromMasterPoseComponent = !0),
          r.SetSkeletalMesh(o, !0),
          r.SetMasterPoseComponent(s, !1);
        o = r.K2_AttachToComponent(s, h, 2, 2, 0, !0);
        if (((r.CastShadow = !1), o))
          return (
            a && r.K2_SetRelativeTransform(i, !1, void 0, !1),
            r.ComponentTags.Add(this.VWo),
            r
          );
        r.K2_DestroyComponent(e);
      }
    }
  }
  static bWo(t, e, i, s, o) {
    t = this.FWo(o, t, e, i, s, this.HWo);
    t &&
      o.bDyeColor &&
      (((e = new UE.LinearColor(o.Skel_Hair_Color)).A = 1),
      this.jWo(t, o.SkinDyeColor, e));
  }
  static qWo(t, e, i, s, o) {
    e = this.FWo(o, t, e, i, s, this.WWo);
    e &&
      (t.IsA(UE.BP_BaseNPC_C.StaticClass()) && (t.CombineFaceMesh = e),
      o.bDyeColor) &&
      this.jWo(e, o.SkinDyeColor);
  }
  static GWo(t, e, i, s, o) {
    t = this.FWo(o, t, e, i, s, this.KWo);
    t &&
      o.bDyeColor &&
      (((e = new UE.LinearColor(o.Skel_BodyUp_Color)).A = 1),
      this.jWo(t, o.SkinDyeColor, e));
  }
  static NWo(t, e, i, s, o) {
    t = this.FWo(o, t, e, i, s, this.QWo);
    t &&
      o.bDyeColor &&
      (((e = new UE.LinearColor(o.Skel_BodyDown_Color)).A = 1),
      this.jWo(t, o.SkinDyeColor, e));
  }
  static OWo(t, e, i, s, o) {
    t = this.FWo(o, t, e, i, s, this.XWo);
    t &&
      o.bDyeColor &&
      (((e = new UE.LinearColor(o.Body_Dyecolor01)).A = 1),
      ((i = new UE.LinearColor(o.Body_Dyecolor02)).A = 1),
      this.jWo(t, o.SkinDyeColor, e, i));
  }
  static jWo(i, s, o, h) {
    var a = i.GetMaterials();
    for (let t = 0, e = a.Num(); t < e; t++) {
      var r = i.CreateDynamicMaterialInstance(t, a.Get(t));
      r &&
        (r.SetVectorParameterValue(this.$Wo, s),
        o && r.SetVectorParameterValue(this.YWo, o),
        h) &&
        r.SetVectorParameterValue(this.JWo, h);
    }
  }
  static kWo(i, s, o, h, a) {
    if (h && o && 0 !== o.Num())
      if (s.DoesSocketExist(h))
        for (let t = 0, e = o.Num(); t < e; t++) {
          var r = o.Get(t),
            n = r.Transform,
            r = r.Mesh;
          this.FWo(a, i, n, s, r, h, !0);
        }
      else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Level",
            30,
            "目标不存在挂点",
            ["Actor", i.GetName()],
            ["Socket", h],
          );
  }
}
((exports.CombineMeshTool = CombineMeshTool).VWo = new UE.FName(
  "PartMeshComp",
)),
  (CombineMeshTool.$Wo = new UE.FName("5BaseColorTint")),
  (CombineMeshTool.YWo = new UE.FName("1BaseColorTint")),
  (CombineMeshTool.JWo = new UE.FName("2BaseColorTint")),
  (CombineMeshTool.WWo = new UE.FName("Face")),
  (CombineMeshTool.HWo = new UE.FName("Hair")),
  (CombineMeshTool.XWo = new UE.FName("Body")),
  (CombineMeshTool.KWo = new UE.FName("BodyUp")),
  (CombineMeshTool.QWo = new UE.FName("BodyDown"));
//# sourceMappingURL=CombineMeshTool.js.map
