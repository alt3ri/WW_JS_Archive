"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NpcFacialExpressionController = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  EntitySystem_1 = require("../../../../../Core/Entity/EntitySystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  PLAYER_USED_ID = -1;
class NpcFacialExpressionController {
  constructor(t) {
    (this.yZo = new UE.FName("AniSwitch_Face")),
      (this.IZo = new UE.FName("UseFaceAniMap")),
      (this.TZo = new UE.FName("FaceAniMap")),
      (this.LZo = new UE.FName("MI_Face")),
      (this.E0 = void 0),
      (this.wDe = void 0),
      (this.DZo = !1),
      (this.RZo = void 0),
      (this.UZo = void 0),
      (this.E0 = t);
    t = EntitySystem_1.EntitySystem.Get(this.E0);
    this.wDe = t?.GetComponent(0)?.GetPbDataId();
  }
  YLe() {
    return this.wDe === PLAYER_USED_ID;
  }
  InitFaceExpressionData(t) {
    t && (this.RZo = t);
  }
  ChangeFacialExpression() {
    var t, i;
    this.E0 &&
      !this.YLe() &&
      this.RZo &&
      ((t = EntitySystem_1.EntitySystem.Get(this.E0)),
      (i =
        ConfigManager_1.ConfigManager.FaceExpressionConfig?.GetFaceExpressionConfig(
          this.RZo,
        )) && i.FaceExpression
        ? "Texture" === (i = i?.FaceExpression).Type
          ? ((this.DZo = !0), this.AZo(i.FaceIndex))
          : "Morph" === i.Type &&
            ((this.DZo = !1),
            (i = i),
            this.UZo &&
              Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Plot",
                51,
                "通过变形器设置新表情时，前个表情未正确重置",
                ["PreExpressionInfo", this.UZo],
                ["CurExpressionInfo", i.MorphData],
              ),
            (this.UZo = i.MorphData),
            this.PZo(i.MorphData))
        : ((i = t?.GetComponent(2)?.CreatureData?.GetPbDataId()),
          Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Plot",
              51,
              "获取表情配置失败",
              ["FaceExpressionId", this.RZo],
              ["PbDataId", i],
            )));
  }
  ResetFacialExpression() {
    if (this.E0 && !this.YLe() && this.RZo)
      if (this.DZo) this.AZo(1);
      else if (this.UZo) {
        let t = "";
        for (const e of this.UZo.split(",")) {
          var i = e.split(":")[0].trim();
          t += i + ":0,";
        }
        (t = t.slice(0, -1)), this.PZo(t), (this.UZo = void 0);
      }
  }
  PZo(t) {
    if (!t) return !1;
    var i = this.xZo();
    if (!i?.IsValid()) return !1;
    for (const r of t.split(",")) {
      var e = r.split(":"),
        s = e[0].trim(),
        e = Number(e[1].trim());
      i.SetMorphTarget(new UE.FName(s), e);
    }
    return !0;
  }
  AZo(t) {
    var i;
    return (
      !!this.E0 &&
      !!(i = EntitySystem_1.EntitySystem.Get(this.E0))?.Valid &&
      !(
        !i?.GetComponent(2).Owner?.IsValid() ||
        !(i = this.wZo())?.IsValid() ||
        (i.K2_GetScalarParameterValue(this.IZo) ||
          i.SetScalarParameterValue(this.IZo, 1),
        i.K2_GetTextureParameterValue(this.TZo)?.IsValid()
          ? (i.SetScalarParameterValue(this.yZo, t), 0)
          : (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "LevelEvent",
                51,
                "Face Mesh未配置或错误配置FaceAniMap贴图",
              ),
            1))
      )
    );
  }
  xZo() {
    if (this.E0) {
      var t = EntitySystem_1.EntitySystem.Get(this.E0);
      if (t?.Valid) {
        var e = t?.GetComponent(2).Owner;
        if (e?.IsValid()) {
          var s = e.K2_GetComponentsByClass(
              UE.SkeletalMeshComponent.StaticClass(),
            ),
            r = s.Num();
          if (r) {
            let i = void 0;
            e = t
              .GetComponent(0)
              ?.GetModelConfig()
              ?.DA.AssetPathName?.toString();
            if (e?.length && "None" !== e)
              for (let t = 0; t < r; ++t) {
                var a = s.Get(t);
                if ("Face" === a.GetName()) {
                  i = a;
                  break;
                }
              }
            else i = s.Get(0);
            if (i?.IsValid()) return i;
          }
        }
      }
    }
  }
  wZo() {
    var t = this.xZo(),
      t = t?.GetMaterial(t.GetMaterialIndex(this.LZo));
    if (t?.IsValid()) return t;
  }
}
exports.NpcFacialExpressionController = NpcFacialExpressionController;
//# sourceMappingURL=NpcFacialExpressionController.js.map
