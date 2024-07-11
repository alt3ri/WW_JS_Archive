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
      (this.PKo(i, s),
      this.xKo(t, e, i, s.Skel_Hair, s),
      this.wKo(t, e, i, s.Skel_Face, s),
      1 === s.NpcSetupType
        ? (this.BKo(t, e, i, s.Skel_BodyUp, s),
          this.bKo(t, e, i, s.Skel_BodyDown, s))
        : this.qKo(t, e, i, s.Skel_Body, s),
      this.GKo(t, i, s.Hook_Arm, s.Hook_Arm_Socket, s),
      this.GKo(t, i, s.Hook_Back, s.Hook_Back_Socket, s),
      this.GKo(t, i, s.Hook_Leg, s.Hook_Leg_Socket, s),
      this.GKo(t, i, s.Hook_Waist, s.Hook_Waist_Socket, s),
      this.GKo(t, i, s.Hook_Weapon, s.Hook_Weapon_Socket, s),
      this.GKo(t, i, s.Hook_Head, s.Hook_Head_Socket, s));
  }
  static PKo(t, e) {
    t.SetSkeletalMesh(void 0),
      t.SetVisibility(!0, !1),
      (t.bRenderInMainPass = !1),
      (t.CastShadow = !0),
      ObjectUtils_1.ObjectUtils.IsValid(e.Skel_Main) &&
        t.SetSkeletalMesh(e.Skel_Main, !0);
  }
  static NKo(t, e, i, s, o, h, a = !1) {
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
            r.ComponentTags.Add(this.OKo),
            r
          );
        r.K2_DestroyComponent(e);
      }
    }
  }
  static xKo(t, e, i, s, o) {
    t = this.NKo(o, t, e, i, s, this.kKo);
    t &&
      o.bDyeColor &&
      (((e = new UE.LinearColor(o.Skel_Hair_Color)).A = 1),
      this.FKo(t, o.SkinDyeColor, e));
  }
  static wKo(t, e, i, s, o) {
    e = this.NKo(o, t, e, i, s, this.VKo);
    e &&
      (t.IsA(UE.BP_BaseNPC_C.StaticClass()) && (t.CombineFaceMesh = e),
      o.bDyeColor) &&
      this.FKo(e, o.SkinDyeColor);
  }
  static BKo(t, e, i, s, o) {
    t = this.NKo(o, t, e, i, s, this.HKo);
    t &&
      o.bDyeColor &&
      (((e = new UE.LinearColor(o.Skel_BodyUp_Color)).A = 1),
      this.FKo(t, o.SkinDyeColor, e));
  }
  static bKo(t, e, i, s, o) {
    t = this.NKo(o, t, e, i, s, this.jKo);
    t &&
      o.bDyeColor &&
      (((e = new UE.LinearColor(o.Skel_BodyDown_Color)).A = 1),
      this.FKo(t, o.SkinDyeColor, e));
  }
  static qKo(t, e, i, s, o) {
    t = this.NKo(o, t, e, i, s, this.WKo);
    t &&
      o.bDyeColor &&
      (((e = new UE.LinearColor(o.Body_Dyecolor01)).A = 1),
      ((i = new UE.LinearColor(o.Body_Dyecolor02)).A = 1),
      this.FKo(t, o.SkinDyeColor, e, i));
  }
  static FKo(i, s, o, h) {
    var a = i.GetMaterials();
    for (let t = 0, e = a.Num(); t < e; t++) {
      var r = i.CreateDynamicMaterialInstance(t, a.Get(t));
      r &&
        (r.SetVectorParameterValue(this.KKo, s),
        o && r.SetVectorParameterValue(this.QKo, o),
        h) &&
        r.SetVectorParameterValue(this.XKo, h);
    }
  }
  static GKo(i, s, o, h, a) {
    if (h && o && 0 !== o.Num())
      if (s.DoesSocketExist(h))
        for (let t = 0, e = o.Num(); t < e; t++) {
          var r = o.Get(t),
            n = r.Transform,
            r = r.Mesh;
          this.NKo(a, i, n, s, r, h, !0);
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
((exports.CombineMeshTool = CombineMeshTool).OKo = new UE.FName(
  "PartMeshComp",
)),
  (CombineMeshTool.KKo = new UE.FName("5BaseColorTint")),
  (CombineMeshTool.QKo = new UE.FName("1BaseColorTint")),
  (CombineMeshTool.XKo = new UE.FName("2BaseColorTint")),
  (CombineMeshTool.VKo = new UE.FName("Face")),
  (CombineMeshTool.kKo = new UE.FName("Hair")),
  (CombineMeshTool.WKo = new UE.FName("Body")),
  (CombineMeshTool.HKo = new UE.FName("BodyUp")),
  (CombineMeshTool.jKo = new UE.FName("BodyDown"));
//# sourceMappingURL=CombineMeshTool.js.map
