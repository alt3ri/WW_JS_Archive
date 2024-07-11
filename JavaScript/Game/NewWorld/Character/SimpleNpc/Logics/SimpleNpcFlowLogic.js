"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SimpleNpcFlowLogic = void 0);
const UE = require("ue");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const ObjectUtils_1 = require("../../../../../Core/Utils/ObjectUtils");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const Global_1 = require("../../../../Global");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const NpcIconComponent_1 = require("../../../../Module/NPC/NpcIconComponent");
const SimpleNpcMultiplyLogic_1 = require("./SimpleNpcMultiplyLogic");
const STOP_MONTAGE_BLEND_OUT_TIME = 0.3;
class SimpleNpcFlowLogic {
  constructor(t) {
    (this.sir = void 0),
      (this.air = void 0),
      (this.hir = void 0),
      (this.lir = void 0),
      (this._ir = 0),
      (this.hBe = !1),
      (this.uir = void 0),
      (this.cir = void 0),
      (this.mir = void 0),
      (this.Cir = void 0),
      (this.sir = t),
      (this.Cir = t.K2_GetActorLocation());
  }
  StartFlowLogic() {
    (this.air = this.sir.GetComponentByClass(
      UE.SimpleNpcFlowComponent_C.StaticClass(),
    )),
      this.air &&
        this.air.FlowList?.Num() > 0 &&
        ((this.lir = new SimpleNpcMultiplyLogic_1.SimpleNpcMultiplyLogic(
          this.air,
        )),
        this.gir(),
        this.fir());
  }
  gir() {
    const t = this.air.CheckRange;
    (this.cir = t.LowerBound.Value * t.LowerBound.Value),
      (this.mir = t.UpperBound.Value * t.UpperBound.Value);
  }
  async AddHeadView() {
    if (
      !this.hir &&
      ConfigManager_1.ConfigManager.NpcIconConfig &&
      this.sir?.Mesh
    ) {
      let t = 1500;
      const i = (t = this.air ? this.air.CheckRange.UpperBound.Value : t) + 500;
      (this.hir = new NpcIconComponent_1.NpcIconComponent(this)),
        this.hir.SetupCheckRange(i * i),
        await this.hir.AddNpcIconAsync(void 0),
        this.hir.SetCharacterIconLocation(),
        this.hir.SetHeadInfoNameState(!1),
        this.hir.HideDialogueText();
    }
  }
  ShowDialog(t, i) {
    this.hir?.SetDialogueText(t, i);
  }
  HideDialog() {
    this.hir?.HideDialogueText();
  }
  TryPlayMontage(t) {
    if (this.sir.Mesh && this.sir.Mesh.AnimationMode !== 1) {
      const i = this.sir.Mesh.AnimScriptInstance;
      i &&
        (t = this.pir(t)) &&
        ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.AnimMontage, (t) => {
          ObjectUtils_1.ObjectUtils.IsValid(t) &&
            i &&
            ((this._ir = t.SequenceLength), i.Montage_Play(t));
        });
    }
    return !1;
  }
  vir() {
    if (!this.uir) {
      let i = this.sir.Mesh.AnimScriptInstance;
      if (i) {
        i = UE.KismetSystemLibrary.GetPathName(i);
        if (i) {
          let t = i.substr(0, i.lastIndexOf(StringUtils_1.SLASH_STRING));
          t = t.substr(0, t.lastIndexOf(StringUtils_1.SLASH_STRING));
          i = new Array();
          i.push(t),
            i.push("/Montage"),
            (this.uir = i.join(StringUtils_1.EMPTY_STRING));
        }
      }
    }
  }
  pir(t) {
    return !t || t.includes("/")
      ? t
      : (this.vir(), this.uir ? this.uir + `/${t}.` + t : void 0);
  }
  Tick(t) {
    this._ir > 0 && ((this._ir -= t), this._ir < 0) && this.StopMontage(),
      this.lir && (this.fir(), this.lir.Tick(t));
  }
  StopMontage() {
    let t;
    (this._ir = 0),
      this.sir &&
        this.sir.Mesh &&
        this.sir.Mesh.AnimationMode !== 1 &&
        (t = this.sir.Mesh.AnimScriptInstance) &&
        t.IsAnyMontagePlaying() &&
        t.Montage_Stop(STOP_MONTAGE_BLEND_OUT_TIME);
  }
  fir() {
    let t = Global_1.Global.BaseCharacter;
    t &&
      ((t = t.CharacterActorComponent.ActorLocation),
      (t = UE.Vector.DistSquared2D(t, this.Cir)) < this.cir
        ? (this.hBe ||
            (this.lir.IsPlaying || this.sir.IsHiding
              ? (this.lir.IsPause = !1)
              : this.lir.StartFlow()),
          (this.hBe = !0))
        : t < this.mir
          ? ((this.hBe = !1), (this.lir.IsPause = !0))
          : ((this.hBe = !1),
            (this.lir.IsPause = !0),
            this.lir.IsPlaying && this.lir.StopFlow()));
  }
  FilterFlowWorldState(t) {
    this.lir?.FilterFlowWorldState(t);
  }
  ForceStopFlow() {
    (this.hBe = !1), this.lir?.IsPlaying && this.lir.StopFlow();
  }
  Dispose() {
    (this.sir = void 0),
      (this.air = void 0),
      (this.lir = void 0),
      this.hir?.Destroy();
  }
  GetSelfLocation() {
    return this.sir.SelfLocationProxy;
  }
  GetAttachToMeshComponent() {
    return this.sir.Mesh;
  }
  GetAttachToSocketName() {
    return ConfigManager_1.ConfigManager.NpcIconConfig.GetNpcIconSocketName();
  }
  GetAttachToLocation(t) {
    const i = this.sir.CapsuleCollision.CapsuleHalfHeight;
    const s = this.sir.SelfLocationProxy;
    t.Set(s.X, s.Y, s.Z + i);
  }
  GetAddOffsetZ() {
    return 0;
  }
  IsShowNameInfo() {
    return !1;
  }
  IsShowQuestInfo() {
    return !1;
  }
  CanTick(t) {
    return !0;
  }
  IsInHeadItemShowRange(t, i, s) {
    return t < i && s < t;
  }
}
exports.SimpleNpcFlowLogic = SimpleNpcFlowLogic;
// # sourceMappingURL=SimpleNpcFlowLogic.js.map
