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
      (this.V0a = !0),
      (this.$0a = !1),
      (this.Ter = void 0),
      (this.H0a = void 0),
      (this.j0a = void 0),
      (this.W0a = 1),
      (this.Ler = void 0),
      (this.RWa = ResourceSystem_1.ResourceSystem.InvalidId),
      (this.Qkc = void 0),
      (this.Kkc = void 0),
      (this.$7a = new Set()),
      (this.Xkc = (t, i) => {
        t?.IsValid() &&
          this.Qkc === t &&
          !this.oRe?.MainAnimInstance?.Montage_IsActive(t) &&
          ((this.Qkc = void 0),
          this.oRe?.MainAnimInstance?.OnMontageEnded.Remove(this.Xkc),
          this.X7a(),
          this.Ykc("表情Montage结束"));
      }),
      (this.zkc = (t, i) => {
        t?.IsValid() &&
          this.Kkc === t &&
          !this.oRe?.MainAnimInstance?.Montage_IsActive(t) &&
          ((this.Kkc = void 0),
          this.oRe?.MainAnimInstance?.OnMontageEnded.Remove(this.zkc),
          this.Ykc("说话Montage结束"));
      }),
      (this.E0 = t);
    t = EntitySystem_1.EntitySystem.Get(this.E0);
    (this.wDe = t?.GetComponent(0)?.GetPbDataId()),
      (this.oRe = t?.GetComponent(43));
  }
  YLe() {
    return this.wDe === PLAYER_USED_ID;
  }
  Y0a(t, i = "") {
    var s;
    this.V0a !== t &&
      (s = EntitySystem_1.EntitySystem.Get(this.E0)?.GetComponent(
        2,
      )?.Owner)?.IsValid() &&
      ((s.CanUpdateTextureFace = t), (this.V0a = t), Log_1.Log.CheckDebug()) &&
      Log_1.Log.Debug(
        "NPC",
        50,
        "切换NPC贴图表情控制权",
        ["PbDataId", this.wDe],
        ["IsAnimUpdate", t],
        ["Reason", i],
      );
  }
  J0a(t) {
    if (t)
      return ConfigManager_1.ConfigManager.FaceExpressionConfig?.GetFaceExpressionConfig(
        t,
      )?.FaceExpression.Type;
  }
  z0a(t) {
    return (
      !!t &&
      ((this.Ter = t),
      (this.H0a =
        ConfigManager_1.ConfigManager.FaceExpressionConfig?.GetFaceExpressionConfig(
          this.Ter,
        )?.FaceExpression),
      (this.j0a = this.H0a?.Type),
      !!this.H0a ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "NPC",
            50,
            "获取表情配置失败",
            ["FaceExpressionId", this.Ter],
            ["PbDataId", this.wDe],
          ),
        !1))
    );
  }
  Z0a(t) {
    this.E0 &&
      !this.YLe() &&
      this.z0a(t) &&
      ("Texture" === this.j0a
        ? ((t = this.H0a), (this.$0a = !1), this.Der(t.FaceIndex))
        : "Morph" === this.j0a
          ? ((this.$0a = !0),
            (t = this.H0a),
            this.Ler && this.Jkc(this.Ler),
            (this.Ler = t.MorphData),
            this.Rer(t.MorphData))
          : "AnimSequence" === this.j0a &&
            ((t = this.H0a),
            StringUtils_1.StringUtils.IsEmpty(t.Path) ||
              (this.RWa = ResourceSystem_1.ResourceSystem.LoadAsync(
                t.Path,
                UE.AnimSequence,
                (t) => {
                  this.RWa = ResourceSystem_1.ResourceSystem.InvalidId;
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
    for (const h of t.split(",")) {
      var s = h.split(":"),
        e = s[0].trim(),
        s = Number(s[1].trim());
      i.SetMorphTarget(new UE.FName(e), s);
    }
    return !0;
  }
  Jkc(t) {
    let i = "";
    for (const e of t.split(",")) {
      var s = e.split(":")[0].trim();
      i += s + ":0,";
    }
    "" !== i && (i = i.slice(0, -1)), this.Rer(i);
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
                50,
                "FaceMesh未配置或错误配置FaceAniMap贴图",
                ["PbDataId", this.wDe],
                ["ExpressionId", t],
                ["MatName", i.GetName()],
                ["Montage", this.Qkc?.GetName() ?? "None"],
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
    if (t?.IsValid() && t?.IsA(UE.MaterialInstanceDynamic.StaticClass()))
      return t;
  }
  X0a(t, i = "") {
    if (this.W0a !== t)
      switch ((this.W0a = t)) {
        case 1:
          this.Y0a(!0, i);
          break;
        case 2:
        case 3:
          this.Y0a(!1, i);
          break;
        case 4:
          this.Y0a(!0, i);
      }
  }
  ChangeFaceForMouthMontage(t) {
    var i;
    t &&
      this.E0 &&
      (i = this.oRe?.MainAnimInstance) &&
      ((this.Kkc = t),
      this.X0a(4, "开始播放口型Montage"),
      i.OnMontageEnded.Add(this.zkc));
  }
  ChangeFaceForExpression(t, i) {
    var s = this.J0a(i);
    s &&
      ("Texture" === s && 3 < this.W0a
        ? Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "NPC",
            50,
            "当前正在说话，切换表情失败",
            ["PbDataId", this.wDe],
            ["FaceId", i],
          )
        : (this.Z0a(i),
          (this.Qkc = t),
          this.X0a(3, "切换表情"),
          this.oRe.MainAnimInstance.OnMontageEnded.Add(this.Xkc)));
  }
  ChangeFaceForExpressionFromAnimNotify(t, i) {
    var s = this.J0a(t);
    s &&
      ("Texture" === s && 2 < this.W0a
        ? Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "NPC",
            50,
            "当前具有口型或来自于TD数据的表情，切换表情失败",
            ["PbDataId", this.wDe],
            ["FaceId", t],
          )
        : this.$7a.has(i) ||
          (this.$7a.add(i), this.Z0a(t), this.X0a(2, "通过ANS切换表情")));
  }
  ResetFaceForExpressionFromAnimNotify(t) {
    !this.$7a.delete(t) ||
      this.$7a.size ||
      this.Qkc ||
      (this.X7a(), this.Ykc("ANS表情结束"));
  }
  ResetFacialExpressionOuter() {
    this.oRe?.MainAnimInstance?.OnMontageEnded.Remove(this.Xkc),
      this.oRe?.MainAnimInstance?.OnMontageEnded.Remove(this.zkc),
      this.X0a(1, "强制清除"),
      this.X7a();
  }
  Ykc(t = "") {
    this.Kkc
      ? this.X0a(4, t)
      : this.Qkc
        ? (this.Z0a(this.Ter), this.X0a(3, t))
        : this.$7a.size && this.Ter
          ? (this.Z0a(this.Ter), this.X0a(2, t))
          : (this.X0a(1, t), this.X7a());
  }
  X7a() {
    this.E0 &&
      !this.YLe() &&
      (this.RWa !== ResourceSystem_1.ResourceSystem.InvalidId &&
        (ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.RWa),
        (this.RWa = ResourceSystem_1.ResourceSystem.InvalidId)),
      this.oRe?.MainAnimInstance?.StopSlotAnimation(
        0.5,
        CharacterNameDefines_1.CharacterNameDefines.FACE_SLOT,
      ),
      this.$0a ? this.Ler && this.Jkc(this.Ler) : this.Der(1),
      this.Zkc());
  }
  Zkc() {
    (this.Ter = void 0),
      (this.H0a = void 0),
      (this.Ler = void 0),
      (this.Qkc = void 0),
      this.X0a(1, "重置表情状态");
  }
  Dispose() {
    var t = EntitySystem_1.EntitySystem.Get(this.E0)?.GetComponent(2)?.Owner;
    return (
      t?.IsValid() && (t.CanUpdateTextureFace = !0),
      this.oRe?.MainAnimInstance?.OnMontageEnded.Remove(this.Xkc),
      this.oRe?.MainAnimInstance?.OnMontageEnded.Remove(this.zkc),
      !0
    );
  }
}
exports.NpcFacialExpressionController = NpcFacialExpressionController;
//# sourceMappingURL=NpcFacialExpressionController.js.map
