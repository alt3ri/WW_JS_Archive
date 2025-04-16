"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DamageSequenceHandle = void 0);
const UE = require("ue"),
  ActorSystem_1 = require("../../../Core/Actor/ActorSystem"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  ObjectUtils_1 = require("../../../Core/Utils/ObjectUtils"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils");
class DamageSequenceHandle {
  constructor() {
    (this.b2t = void 0),
      (this.$pt = void 0),
      (this.n8 = ""),
      (this.GPe = UE.NewArray(UE.Actor));
  }
  Initialize(e) {
    this.n8 = e;
  }
  Destroy() {
    if (this.b2t) {
      const e = this.b2t;
      TimerSystem_1.TimerSystem.Next(() => {
        ActorSystem_1.ActorSystem.Put("DamageSequenceHandle.Destroy", e);
      }),
        (this.b2t = void 0),
        (this.$pt = void 0);
    }
  }
  Reset() {
    this.Stop(), this.ResetSequenceBinding(), this.$pt.OnFinished.Clear();
  }
  Play() {
    this.$pt?.IsValid() && this.$pt.Play();
  }
  Stop() {
    this.$pt?.IsValid() && this.$pt.IsPlaying() && this.$pt.Stop();
  }
  SetSequenceBindingByTag(e, t) {
    this.b2t?.IsValid() &&
      t &&
      (this.GPe.Empty(),
      this.GPe.Add(t),
      (t = FNameUtil_1.FNameUtil.GetDynamicFName(e)),
      this.b2t.SetBindingByTag(t, this.GPe, !1));
  }
  AddSequenceBindingByTag(e, t) {
    this.b2t?.IsValid() &&
      t &&
      ((e = FNameUtil_1.FNameUtil.GetDynamicFName(e)),
      this.b2t.AddBindingByTag(e, t));
  }
  ResetSequenceBinding() {
    this.b2t?.IsValid() && this.b2t.ResetBindings();
  }
  AddOnFinished(e) {
    this.$pt?.IsValid() && this.$pt.OnFinished.Add(e);
  }
  SpawnSequence(t = void 0) {
    StringUtils_1.StringUtils.IsEmpty(this.n8) ||
      ResourceSystem_1.ResourceSystem.LoadAsync(
        this.n8,
        UE.LevelSequence,
        (e) => {
          ObjectUtils_1.ObjectUtils.IsValid(e) &&
            ((this.b2t = ActorSystem_1.ActorSystem.Get(
              UE.LevelSequenceActor.StaticClass(),
              MathUtils_1.MathUtils.DefaultTransformDouble,
              void 0,
              !1,
            )),
            this.b2t.SetSequence(e),
            (this.$pt = this.b2t.SequencePlayer),
            t) &&
            t(this);
        },
      );
  }
  GetPath() {
    return this.n8;
  }
}
exports.DamageSequenceHandle = DamageSequenceHandle;
//# sourceMappingURL=DamageSequenceHandle.js.map
