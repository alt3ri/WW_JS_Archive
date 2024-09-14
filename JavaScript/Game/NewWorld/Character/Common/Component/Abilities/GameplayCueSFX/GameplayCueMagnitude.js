"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameplayCueMagnitude = void 0);
const Log_1 = require("../../../../../../../Core/Common/Log"),
  GameplayTagUtils_1 = require("../../../../../../../Core/Utils/GameplayTagUtils"),
  MathUtils_1 = require("../../../../../../../Core/Utils/MathUtils"),
  CharacterAttributeTypes_1 = require("../CharacterAttributeTypes"),
  GameplayCueBase_1 = require("./GameplayCueBase");
class GameplayCueMagnitude extends GameplayCueBase_1.GameplayCueBase {
  constructor() {
    super(...arguments),
      (this.Y$o = !1),
      (this.J$o = void 0),
      (this.$te = void 0),
      (this.Xte = void 0),
      (this.m1t = void 0),
      (this.z$o = void 0),
      (this.one = 0),
      (this.rne = 0),
      (this.Xe = 0),
      (this.Z$o = 0),
      (this._yo = (t, i, s) => {
        t === this.z$o ? (this.rne = i) : (this.Xe = i), this.eYo(this.Xe);
      }),
      (this.tYo = (t) => {
        this.eYo(t);
      });
  }
  OnInit() {
    var t = this.EntityHandle.Entity;
    (this.$te = t.CheckGetComponent(158)),
      (this.m1t = t.CheckGetComponent(194)),
      (this.Xte = t.CheckGetComponent(190)),
      (this.one = this.CueConfig.Min),
      (this.rne = this.CueConfig.Max);
  }
  OnTick(t) {
    super.OnTick(t),
      this.Z$o && ((t = this.iYo()), this.eYo(t, !1), t || (this.Z$o = 0));
  }
  OnCreate() {
    this.UseMagnitude() && (this.Y$o = this.oYo());
  }
  OnDestroy() {
    this.Y$o && this.rYo();
  }
  OnSetMagnitude(t) {}
  UseMagnitude() {
    return 0 !== this.CueConfig.Magni && !this.IsInstant;
  }
  oYo() {
    let t = 0;
    switch (this.CueConfig.Magni) {
      case 1:
        if (!this.Ii(this.CueConfig.AttrId, "属性Id没填！")) return !1;
        (this.z$o = CharacterAttributeTypes_1.attributeIdsWithMax.get(
          this.CueConfig.AttrId,
        )),
          this.CueConfig.bListenAttr &&
            (this.$te.AddListener(
              this.CueConfig.AttrId,
              this._yo,
              "GameplayCueMagnitude",
            ),
            this.z$o) &&
            this.$te.AddListener(this.z$o, this._yo, "GameplayCueMagnitudeMax"),
          (t = this.$te.GetCurrentValue(this.CueConfig.AttrId)),
          this.z$o && (this.rne = this.$te.GetCurrentValue(this.z$o));
        break;
      case 2:
        if (!this.Ii(this.CueConfig.Tag, "Tag没填！")) return !1;
        var i = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(
          this.CueConfig.Tag,
        );
        this.CueConfig.bListenAttr &&
          (this.J$o = this.Xte.ListenForTagAnyCountChanged(i, this.tYo)),
          (t = this.Xte.GetTagCount(i));
        break;
      case 3:
        t = this.m1t.GetBuffByHandle(this.ActiveHandleId)?.Level ?? 1;
        break;
      case 4:
        this.CueConfig.bListenAttr && (this.Z$o = this.ActiveHandleId),
          (t = this.iYo());
        break;
      default:
        return !1;
    }
    return this.eYo(t);
  }
  rYo() {
    switch (this.CueConfig.Magni) {
      case 1:
        this.CueConfig.bListenAttr &&
          (this.$te.RemoveListener(this.CueConfig.AttrId, this._yo),
          this.z$o) &&
          this.$te.RemoveListener(this.z$o, this._yo);
        break;
      case 2:
        this.CueConfig.bListenAttr &&
          this.J$o &&
          (this.J$o.EndTask(), (this.J$o = void 0));
        break;
      case 3:
        break;
      case 4:
        this.CueConfig.bListenAttr && (this.Z$o = 0);
    }
  }
  eYo(t, i = !0) {
    if (!this.Ii(this.rne >= this.one, "Buff特效表Min>Max！有问题")) return !1;
    this.Xe = t;
    t = this.nYo();
    return (
      i &&
        Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Battle",
          29,
          "Buff特效幅度",
          ["BuffId", this.BuffId],
          ["CueId", this.CueConfig.Id],
          ["EntityId", this.EntityHandle.Id],
          ["Value", t],
        ),
      this.OnSetMagnitude(t),
      !0
    );
  }
  nYo() {
    return this.Z$o
      ? this.Xe
      : this.one === this.rne
        ? 0
        : (MathUtils_1.MathUtils.Clamp(this.Xe, this.one, this.rne) -
            this.one) /
          (this.rne - this.one);
  }
  Ii(t, i) {
    return (
      !!t ||
      (Log_1.Log.CheckError() &&
        Log_1.Log.Error("Battle", 29, i, ["CueId", this.CueConfig.Id]),
      !1)
    );
  }
  iYo() {
    var t =
        this.m1t.GetBuffByHandle(this.ActiveHandleId)?.GetRemainDuration() ?? 0,
      i = this.m1t.GetBuffByHandle(this.ActiveHandleId)?.Duration ?? 1;
    return 0 < i ? t / i : 0;
  }
}
exports.GameplayCueMagnitude = GameplayCueMagnitude;
//# sourceMappingURL=GameplayCueMagnitude.js.map
