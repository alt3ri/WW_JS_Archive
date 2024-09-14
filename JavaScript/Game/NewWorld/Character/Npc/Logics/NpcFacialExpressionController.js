"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NpcFacialExpressionController = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  EntitySystem_1 = require("../../../../../Core/Entity/EntitySystem"),
  ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
  ObjectUtils_1 = require("../../../../../Core/Utils/ObjectUtils"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  CharacterNameDefines_1 = require("../../Common/CharacterNameDefines"),
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
      (this.z0a = !0),
      (this.Z0a = !1),
      (this.Ter = void 0),
      (this.Rga = void 0),
      (this.Aga = void 0),
      (this.Uga = 1),
      (this.Ler = void 0),
      (this.D7a = ResourceSystem_1.ResourceSystem.InvalidId),
      (this.wga = void 0),
      (this.lVa = new Set()),
      (this.Pga = (t, i) => {
        t?.IsValid() &&
          this.wga === t &&
          (this.oRe?.MainAnimInstance?.OnMontageEnded.Remove(this.Pga),
          this.xga(1, "Montage播放完成"),
          this.hVa());
      }),
      (this.E0 = t);
    t = EntitySystem_1.EntitySystem.Get(this.E0);
    (this.wDe = t?.GetComponent(0)?.GetPbDataId()),
      (this.oRe = t?.GetComponent(37));
  }
  YLe() {
    return this.wDe === PLAYER_USED_ID;
  }
  bga(t, i = "") {
    var e;
    this.z0a !== t &&
      (e = EntitySystem_1.EntitySystem.Get(this.E0)?.GetComponent(
        2,
      )?.Owner)?.IsValid() &&
      ((e.CanUpdateTextureFace = t), (this.z0a = t), Log_1.Log.CheckDebug()) &&
      Log_1.Log.Debug(
        "NPC",
        51,
        "切换NPC贴图表情控制权",
        ["PbDataId", this.wDe],
        ["IsAnimUpdate", t],
        ["Reason", i],
      );
  }
  Bga(t) {
    if (t)
      return ConfigManager_1.ConfigManager.FaceExpressionConfig?.GetFaceExpressionConfig(
        t,
      )?.FaceExpression.Type;
  }
  qga(t) {
    return (
      !!t &&
      ((this.Ter = t),
      (this.Rga =
        ConfigManager_1.ConfigManager.FaceExpressionConfig?.GetFaceExpressionConfig(
          this.Ter,
        )?.FaceExpression),
      (this.Aga = this.Rga?.Type),
      !!this.Rga ||
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
  Oga(t) {
    this.E0 &&
      !this.YLe() &&
      this.qga(t) &&
      ("Texture" === this.Aga
        ? ((t = this.Rga), (this.Z0a = !1), this.Der(t.FaceIndex))
        : "Morph" === this.Aga
          ? ((this.Z0a = !0),
            (t = this.Rga),
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
            this.Rer(t.MorphData))
          : "AnimSequence" === this.Aga &&
            ((t = this.Rga),
            StringUtils_1.StringUtils.IsEmpty(t.Path) ||
              (this.D7a = ResourceSystem_1.ResourceSystem.LoadAsync(
                t.Path,
                UE.AnimSequence,
                (t) => {
                  this.D7a = ResourceSystem_1.ResourceSystem.InvalidId;
                  t =
                    this.oRe?.MainAnimInstance?.PlaySlotAnimationAsDynamicMontage(
                      t,
                      CharacterNameDefines_1.CharacterNameDefines.FACE_SLOT,
                      0.5,
                      0.5,
                      1,
                      1,
                      -1,
                      0,
                      !1,
                    );
                  ObjectUtils_1.ObjectUtils.IsValid(t) &&
                    this.oRe?.MainAnimInstance?.Montage_SetNextSection(
                      CharacterNameDefines_1.CharacterNameDefines
                        .DEFAULT_SECTION_NAME,
                      CharacterNameDefines_1.CharacterNameDefines
                        .DEFAULT_SECTION_NAME,
                      t,
                    );
                },
              ))));
  }
  Rer(t) {
    if (!t) return !1;
    var i = this.Uer();
    if (!i?.IsValid()) return !1;
    for (const r of t.split(",")) {
      var e = r.split(":"),
        s = e[0].trim(),
        e = Number(e[1].trim());
      i.SetMorphTarget(new UE.FName(s), e);
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
          : (Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "NPC",
                51,
                "FaceMesh未配置或错误配置FaceAniMap贴图",
                ["PbDataId", this.wDe],
                ["ExpressionId", t],
                ["MatName", i.GetName()],
                ["Montage", this.wga?.GetName() ?? "None"],
              ),
            1))
      )
    );
  }
  Uer() {
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
                var h = s.Get(t);
                if ("Face" === h.GetName()) {
                  i = h;
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
  Aer() {
    var t = this.Uer(),
      t = t?.GetMaterial(t.GetMaterialIndex(this.yer));
    if (t?.IsValid()) return t;
  }
  xga(t, i = "") {
    if (this.Uga !== t)
      switch ((this.Uga = t)) {
        case 1:
          this.bga(!0, i);
          break;
        case 2:
        case 3:
          this.bga(!1, i);
          break;
        case 4:
          this.bga(!0, i);
      }
  }
  ChangeFaceForMouthMontage(t) {
    var i;
    t &&
      this.E0 &&
      (i = this.oRe?.MainAnimInstance) &&
      ((this.wga = t),
      this.xga(4, "开始播放口型Montage"),
      i.OnMontageEnded.Add(this.Pga));
  }
  ChangeFaceForExpression(t, i) {
    var e = this.Bga(i);
    e &&
      ("Texture" === e && 3 < this.Uga
        ? Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "NPC",
            51,
            "当前正在说话，切换表情失败",
            ["PbDataId", this.wDe],
            ["FaceId", i],
          )
        : (this.Oga(i),
          (this.wga = t),
          this.xga(3, "切换表情"),
          this.oRe.MainAnimInstance.OnMontageEnded.Add(this.Pga)));
  }
  ChangeFaceForExpressionFromAnimNotify(t, i) {
    var e = this.Bga(t);
    e &&
      ("Texture" === e && 2 < this.Uga
        ? Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "NPC",
            51,
            "当前具有口型或来自于TD数据的表情，切换表情失败",
            ["PbDataId", this.wDe],
            ["FaceId", t],
          )
        : this.lVa.has(i) ||
          (this.lVa.add(i), this.Oga(t), this.xga(2, "通过ANS切换表情")));
  }
  ResetFaceForExpressionFromAnimNotify(t) {
    this.lVa.delete(t) &&
      !this.lVa.size &&
      (this.xga(1, "切换表情贴图ANS结束"), this.hVa());
  }
  ResetFacialExpressionOuter() {
    this.oRe?.MainAnimInstance?.OnMontageEnded.Remove(this.Pga),
      this.xga(1, "强制清除"),
      this.hVa();
  }
  hVa() {
    if (this.E0 && !this.YLe()) {
      if (
        (this.D7a !== ResourceSystem_1.ResourceSystem.InvalidId &&
          (ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.D7a),
          (this.D7a = ResourceSystem_1.ResourceSystem.InvalidId)),
        this.oRe?.MainAnimInstance?.StopSlotAnimation(
          0.5,
          CharacterNameDefines_1.CharacterNameDefines.FACE_SLOT,
        ),
        this.Z0a)
      ) {
        if (!this.Ler) return;
        let t = "";
        for (const e of this.Ler.split(",")) {
          var i = e.split(":")[0].trim();
          t += i + ":0,";
        }
        "" !== t && (t = t.slice(0, -1)), this.Rer(t), (this.Ler = void 0);
      } else this.Der(1);
      (this.Ter = void 0), (this.Rga = void 0), (this.Uga = 1);
    }
  }
  Dispose() {
    var t = EntitySystem_1.EntitySystem.Get(this.E0)?.GetComponent(2)?.Owner;
    return (
      t?.IsValid() && (t.CanUpdateTextureFace = !0),
      this.oRe?.MainAnimInstance?.OnMontageEnded.Remove(this.Pga),
      !0
    );
  }
}
exports.NpcFacialExpressionController = NpcFacialExpressionController;
//# sourceMappingURL=NpcFacialExpressionController.js.map
