"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SimpleNpcFlowLogic = void 0);
const UE = require("ue"),
  ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
  ObjectUtils_1 = require("../../../../../Core/Utils/ObjectUtils"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  Global_1 = require("../../../../Global"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  NpcIconComponent_1 = require("../../../../Module/NPC/NpcIconComponent"),
  SimpleNpcMultiplyLogic_1 = require("./SimpleNpcMultiplyLogic"),
  STOP_MONTAGE_BLEND_OUT_TIME = 0.3;
class SimpleNpcFlowLogic {
  constructor(t) {
    (this.sor = void 0),
      (this.aor = void 0),
      (this.hor = void 0),
      (this.lor = void 0),
      (this._or = 0),
      (this.hBe = !1),
      (this.uor = void 0),
      (this.cor = void 0),
      (this.mor = void 0),
      (this.dor = void 0),
      (this.sor = t),
      (this.dor = t.K2_GetActorLocation());
  }
  StartFlowLogic() {
    (this.aor = this.sor.GetComponentByClass(
      UE.SimpleNpcFlowComponent_C.StaticClass(),
    )),
      this.aor &&
        0 < this.aor.FlowList?.Num() &&
        ((this.lor = new SimpleNpcMultiplyLogic_1.SimpleNpcMultiplyLogic(
          this.aor,
        )),
        this.Cor(),
        this.gor());
  }
  Cor() {
    var t = this.aor.CheckRange;
    (this.cor = t.LowerBound.Value * t.LowerBound.Value),
      (this.mor = t.UpperBound.Value * t.UpperBound.Value);
  }
  async AddHeadView() {
    if (
      !this.hor &&
      ConfigManager_1.ConfigManager.NpcIconConfig &&
      this.sor?.Mesh
    ) {
      let t = 1500;
      var i = (t = this.aor ? this.aor.CheckRange.UpperBound.Value : t) + 500;
      (this.hor = new NpcIconComponent_1.NpcIconComponent(this)),
        this.hor.SetupCheckRange(i * i),
        await this.hor.AddNpcIconAsync(void 0),
        this.hor.SetCharacterIconLocation(),
        this.hor.SetHeadInfoNameState(!1),
        this.hor.HideDialogueText();
    }
  }
  ShowDialog(t, i) {
    this.hor?.SetDialogueText(t, i);
  }
  HideDialog() {
    this.hor?.HideDialogueText();
  }
  TryPlayMontage(t) {
    if (this.sor.Mesh && 1 !== this.sor.Mesh.AnimationMode) {
      const i = this.sor.Mesh.AnimScriptInstance;
      i &&
        (t = this.por(t)) &&
        ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.AnimMontage, (t) => {
          ObjectUtils_1.ObjectUtils.IsValid(t) &&
            i &&
            ((this._or = t.SequenceLength), i.Montage_Play(t));
        });
    }
    return !1;
  }
  vor() {
    if (!this.uor) {
      var i = this.sor.Mesh.AnimScriptInstance;
      if (i) {
        i = UE.KismetSystemLibrary.GetPathName(i);
        if (i) {
          let t = i.substr(0, i.lastIndexOf(StringUtils_1.SLASH_STRING));
          t = t.substr(0, t.lastIndexOf(StringUtils_1.SLASH_STRING));
          i = new Array();
          i.push(t),
            i.push("/Montage"),
            (this.uor = i.join(StringUtils_1.EMPTY_STRING));
        }
      }
    }
  }
  por(t) {
    return !t || t.includes("/")
      ? t
      : (this.vor(), this.uor ? this.uor + `/${t}.` + t : void 0);
  }
  Tick(t) {
    0 < this._or && ((this._or -= t), this._or < 0) && this.StopMontage(),
      this.lor && (this.gor(), this.lor.Tick(t));
  }
  StopMontage() {
    var t;
    (this._or = 0),
      this.sor &&
        this.sor.Mesh &&
        1 !== this.sor.Mesh.AnimationMode &&
        (t = this.sor.Mesh.AnimScriptInstance) &&
        t.IsAnyMontagePlaying() &&
        t.Montage_Stop(STOP_MONTAGE_BLEND_OUT_TIME);
  }
  gor() {
    var t = Global_1.Global.BaseCharacter;
    t &&
      ((t = t.CharacterActorComponent.ActorLocation),
      (t = UE.Vector.DistSquared2D(t, this.dor)) < this.cor
        ? (this.hBe ||
            (this.lor.IsPlaying || this.sor.IsHiding
              ? (this.lor.IsPause = !1)
              : this.lor.StartFlow()),
          (this.hBe = !0))
        : t < this.mor
          ? ((this.hBe = !1), (this.lor.IsPause = !0))
          : ((this.hBe = !1),
            (this.lor.IsPause = !0),
            this.lor.IsPlaying && this.lor.StopFlow()));
  }
  FilterFlowWorldState(t) {
    this.lor?.FilterFlowWorldState(t);
  }
  ForceStopFlow() {
    (this.hBe = !1), this.lor?.IsPlaying && this.lor.StopFlow();
  }
  Dispose() {
    (this.sor = void 0),
      (this.aor = void 0),
      (this.lor = void 0),
      this.hor?.Destroy();
  }
  GetSelfLocation() {
    return this.sor.SelfLocationProxy;
  }
  GetAttachToMeshComponent() {
    return this.sor.Mesh;
  }
  GetAttachToSocketName() {
    return ConfigManager_1.ConfigManager.NpcIconConfig.GetNpcIconSocketName();
  }
  GetAttachToLocation(t) {
    var i = this.sor.CapsuleCollision.CapsuleHalfHeight,
      s = this.sor.SelfLocationProxy;
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
//# sourceMappingURL=SimpleNpcFlowLogic.js.map
