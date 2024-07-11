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
    (this.Mer = new UE.FName("AniSwitch_Face")),
      (this.Eer = new UE.FName("UseFaceAniMap")),
      (this.Ser = new UE.FName("FaceAniMap")),
      (this.yer = new UE.FName("MI_Face")),
      (this.E0 = void 0),
      (this.oRe = void 0),
      (this.wDe = void 0),
      (this.Zda = !0),
      (this.lma = !1),
      (this.Ter = void 0),
      (this._ma = void 0),
      (this.uma = void 0),
      (this.cma = 1),
      (this.Ler = void 0),
      (this.dma = void 0),
      (this.mma = (t, i) => {
        this.dma === t &&
          (this.oRe?.MainAnimInstance?.OnMontageEnded.Remove(this.mma),
          this.Cma(1, "Montage播放完成"),
          this.ResetFacialExpression());
      }),
      (this.E0 = t);
    t = EntitySystem_1.EntitySystem.Get(this.E0);
    (this.wDe = t?.GetComponent(0)?.GetPbDataId()),
      (this.oRe = t?.GetComponent(36));
  }
  YLe() {
    return this.wDe === PLAYER_USED_ID;
  }
  gma(t, i = "") {
    var s;
    this.Zda !== t &&
      (s = EntitySystem_1.EntitySystem.Get(this.E0)?.GetComponent(
        2,
      )?.Owner)?.IsValid() &&
      ((s.CanUpdateTextureFace = t), (this.Zda = t), Log_1.Log.CheckDebug()) &&
      Log_1.Log.Debug(
        "NPC",
        51,
        "切换NPC贴图表情控制权",
        ["PbDataId", this.wDe],
        ["IsAnimUpdate", t],
        ["Reason", i],
      );
  }
  fma(t) {
    if (t)
      return ConfigManager_1.ConfigManager.FaceExpressionConfig?.GetFaceExpressionConfig(
        t,
      )?.FaceExpression.Type;
  }
  vma(t) {
    return (
      !!t &&
      ((this.Ter = t),
      (this._ma =
        ConfigManager_1.ConfigManager.FaceExpressionConfig?.GetFaceExpressionConfig(
          this.Ter,
        )?.FaceExpression),
      (this.uma = this._ma?.Type),
      !!this._ma ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "NPC",
            51,
            "获取表情配置失败",
            ["FaceExpressionId", this.Ter],
            ["PbDataId", this.wDe],
          ),
        !1))
    );
  }
  pma(t) {
    this.E0 &&
      !this.YLe() &&
      this.vma(t) &&
      ("Texture" === this.uma
        ? ((t = this._ma), (this.lma = !1), this.Der(t.FaceIndex))
        : "Morph" === this.uma &&
          ((this.lma = !0),
          (t = this._ma),
          this.Ler &&
            Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Plot",
              51,
              "通过变形器设置新表情时，前个表情未正确重置",
              ["PreExpressionInfo", this.Ler],
              ["CurExpressionInfo", t.MorphData],
            ),
          (this.Ler = t.MorphData),
          this.Rer(t.MorphData)));
  }
  Rer(t) {
    if (!t) return !1;
    var i = this.Uer();
    if (!i?.IsValid()) return !1;
    for (const h of t.split(",")) {
      var s = h.split(":"),
        e = s[0].trim(),
        s = Number(s[1].trim());
      i.SetMorphTarget(new UE.FName(e), s);
    }
    return !0;
  }
  Der(t) {
    var i;
    return (
      !!this.E0 &&
      !!(i = EntitySystem_1.EntitySystem.Get(this.E0))?.Valid &&
      !(
        !i?.GetComponent(2).Owner?.IsValid() ||
        !(i = this.Aer())?.IsValid() ||
        (i.K2_GetScalarParameterValue(this.Eer) ||
          i.SetScalarParameterValue(this.Eer, 1),
        i.K2_GetTextureParameterValue(this.Ser)?.IsValid()
          ? (i.SetScalarParameterValue(this.Mer, t), 0)
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
  Uer() {
    if (this.E0) {
      var t = EntitySystem_1.EntitySystem.Get(this.E0);
      if (t?.Valid) {
        var s = t?.GetComponent(2).Owner;
        if (s?.IsValid()) {
          var e = s.K2_GetComponentsByClass(
              UE.SkeletalMeshComponent.StaticClass(),
            ),
            h = e.Num();
          if (h) {
            let i = void 0;
            s = t
              .GetComponent(0)
              ?.GetModelConfig()
              ?.DA.AssetPathName?.toString();
            if (s?.length && "None" !== s)
              for (let t = 0; t < h; ++t) {
                var r = e.Get(t);
                if ("Face" === r.GetName()) {
                  i = r;
                  break;
                }
              }
            else i = e.Get(0);
            if (i?.IsValid()) return i;
          }
        }
      }
    }
  }
  Aer() {
    var t = this.Uer(),
      t = t?.GetMaterial(t.GetMaterialIndex(this.yer));
    if (t?.IsValid()) return t;
  }
  Cma(t, i = "") {
    if (this.cma !== t)
      switch ((this.cma = t)) {
        case 1:
          this.gma(!0, i);
          break;
        case 2:
          this.gma(!1, i);
          break;
        case 3:
          this.gma(!0, i);
      }
  }
  ChangeFaceForMouthMontage(t) {
    var i;
    t &&
      this.E0 &&
      (i = this.oRe?.MainAnimInstance) &&
      ((this.dma = t),
      this.Cma(3, "开始播放口型Montage"),
      i.OnMontageEnded.Add(this.mma));
  }
  ChangeFaceForExpression(t, i) {
    var s = this.fma(i);
    s &&
      ("Texture" === s && 2 < this.cma
        ? Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "NPC",
            51,
            "当前正在说话，切换表情失败",
            ["PbDataId", this.wDe],
            ["FaceId", i],
          )
        : (this.pma(i),
          (this.dma = t),
          this.Cma(2, "切换表情"),
          this.oRe.MainAnimInstance.OnMontageEnded.Add(this.mma)));
  }
  ResetFacialExpression() {
    if (this.E0 && !this.YLe()) {
      if (this.lma) {
        if (!this.Ler) return;
        let t = "";
        for (const s of this.Ler.split(",")) {
          var i = s.split(":")[0].trim();
          t += i + ":0,";
        }
        "" !== t && (t = t.slice(0, -1)), this.Rer(t), (this.Ler = void 0);
      } else this.Der(1);
      (this.Ter = void 0), (this._ma = void 0), (this.cma = 1);
    }
  }
}
exports.NpcFacialExpressionController = NpcFacialExpressionController;
//# sourceMappingURL=NpcFacialExpressionController.js.map
