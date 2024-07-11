"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DamageSequenceHandle = void 0);
const UE = require("ue");
const ActorSystem_1 = require("../../../Core/Actor/ActorSystem");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const ObjectUtils_1 = require("../../../Core/Utils/ObjectUtils");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
class DamageSequenceHandle {
  constructor() {
    (this.Bkt = void 0),
      (this.Gft = void 0),
      (this.n8 = ""),
      (this.GPe = UE.NewArray(UE.Actor));
  }
  Initialize(t) {
    this.n8 = t;
  }
  Destroy() {
    if (this.Bkt) {
      const t = this.Bkt;
      TimerSystem_1.TimerSystem.Next(() => {
        ActorSystem_1.ActorSystem.Put(t);
      }),
        (this.Bkt = void 0),
        (this.Gft = void 0);
    }
  }
  Reset() {
    this.Stop(), this.ResetSequenceBinding(), this.Gft.OnFinished.Clear();
  }
  Play() {
    this.Gft?.IsValid() && this.Gft.Play();
  }
  Stop() {
    this.Gft?.IsValid() && this.Gft.IsPlaying() && this.Gft.Stop();
  }
  SetSequenceBindingByTag(t, e) {
    this.Bkt?.IsValid() &&
      e &&
      (this.GPe.Empty(),
      this.GPe.Add(e),
      (e = FNameUtil_1.FNameUtil.GetDynamicFName(t)),
      this.Bkt.SetBindingByTag(e, this.GPe, !1));
  }
  AddSequenceBindingByTag(t, e) {
    this.Bkt?.IsValid() &&
      e &&
      ((t = FNameUtil_1.FNameUtil.GetDynamicFName(t)),
      this.Bkt.AddBindingByTag(t, e));
  }
  ResetSequenceBinding() {
    this.Bkt?.IsValid() && this.Bkt.ResetBindings();
  }
  AddOnFinished(t) {
    this.Gft?.IsValid() && this.Gft.OnFinished.Add(t);
  }
  SpawnSequence(e = void 0) {
    StringUtils_1.StringUtils.IsEmpty(this.n8) ||
      ResourceSystem_1.ResourceSystem.LoadAsync(
        this.n8,
        UE.LevelSequence,
        (t) => {
          ObjectUtils_1.ObjectUtils.IsValid(t) &&
            ((this.Bkt = ActorSystem_1.ActorSystem.Get(
              UE.LevelSequenceActor.StaticClass(),
              MathUtils_1.MathUtils.DefaultTransform,
              void 0,
              !1,
            )),
            this.Bkt.SetSequence(t),
            (this.Gft = this.Bkt.SequencePlayer),
            e) &&
            e(this);
        },
      );
  }
  GetPath() {
    return this.n8;
  }
}
exports.DamageSequenceHandle = DamageSequenceHandle;
// # sourceMappingURL=DamageSequenceHandle.js.map
