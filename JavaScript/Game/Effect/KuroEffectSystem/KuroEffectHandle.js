"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.KuroEffectHandle = void 0);
const cpp_1 = require("cpp"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  EffectSystem_1 = require("../EffectSystem");
class KuroEffectHandle {
  constructor() {
    (this.Id = 0),
      (this.IsLoop = !1),
      (this.age = void 0),
      (this.tlc = void 0),
      (this.ilc = void 0),
      (this.rlc = void 0),
      (this.olc = void 0),
      (this.nx = void 0),
      (this.OnCustomCheckOwner = void 0),
      (this.nlc = !1),
      (this.zCe = !1),
      (this.slc = !1),
      (this.alc = () => {
        this.slc && this.hlc();
      }),
      (this.gfn = (t) => {
        if (t === this.Id || 0 === this.Id) {
          if (this.age) for (const i of this.age) i(t);
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.FinishEffect,
            this.Id,
            "KuroEffectHandle.OnAfterFinish",
            !0,
          ),
            EffectSystem_1.EffectSystem.RemoveKuroEffectHandle(this.Id);
        }
      }),
      (this.OnBeforeInitCallback = (t) => {
        (t !== this.Id && 0 !== this.Id) || (this.tlc && this.tlc(t));
      }),
      (this.OnEffectInitCallback = (t, i) => {
        (i !== this.Id && 0 !== this.Id) || (this.ilc && this.ilc(t, i));
      }),
      (this.OnBeforePlayCallback = (t) => {
        (t !== this.Id && 0 !== this.Id) ||
          ((this.nlc = !0),
          this.rlc && this.rlc(t),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.BeforePlayEffect,
            this.Id,
            "KuroEffectHandle.OnBeforePlay",
          ));
      }),
      (this.OnInitCallbackClear = () => {
        (this.tlc = void 0), (this.ilc = void 0), (this.rlc = void 0);
      }),
      (this.OnDynamicEffectInitCallback = (t, i) => {
        (i !== this.Id && 0 !== this.Id) || (this.olc && this.olc(t, i));
      }),
      (this.llc = () => {
        this.olc = void 0;
      });
  }
  Init(t, i, s, h) {
    (this.nx = t), (this.tlc = i), (this.ilc = s), (this.rlc = h);
  }
  OnAfterSpawn(t) {
    (this.Id = t),
      (this.IsLoop = cpp_1.FEffectSystem.EffectIsLoop(t)),
      this.RegisterFinishCallback();
  }
  Clear() {
    this.hlc(),
      (this.tlc = void 0),
      (this.ilc = void 0),
      (this.rlc = void 0),
      (this.olc = void 0),
      (this.nx = void 0),
      (this.OnCustomCheckOwner = void 0);
  }
  CheckOwner() {
    if (this.OnCustomCheckOwner) return this.OnCustomCheckOwner(this.Id);
    if (this.nx) {
      if (this.nx.EntityId)
        if (!EntitySystem_1.EntitySystem.Get(this.nx.EntityId)?.Valid)
          return !1;
      if (this.nx.SourceObject && !this.nx.SourceObject.IsValid()) return !1;
    }
    return !0;
  }
  IsDone() {
    return this.nlc;
  }
  SetNotRecord(t) {
    this.zCe = t;
  }
  GetNotRecord() {
    return this.zCe;
  }
  RegisterFinishCallback() {
    this.slc ||
      ((this.slc = !0),
      cpp_1.FEffectSystem.AddFinishCallback(this.Id, this.gfn, this.alc, this));
  }
  hlc() {
    this.slc &&
      ((this.slc = !1),
      cpp_1.FEffectSystem.RemoveFinishCallback(this.Id),
      this.age) &&
      this.age.clear();
  }
  AddFinishCallback(t) {
    t &&
      (this.age || (this.age = new Set()), this.age.has(t) || this.age.add(t));
  }
  RemoveFinishCallback(t) {
    return !!t && !!this.age && this.age.delete(t);
  }
  RegisterDynamicEffectInitCallback(t) {
    (this.olc = t),
      cpp_1.FEffectSystem.DynamicRegisterSpawnCallback(
        this.Id,
        this.OnDynamicEffectInitCallback,
        this.llc,
        this,
      );
  }
}
exports.KuroEffectHandle = KuroEffectHandle;
//# sourceMappingURL=KuroEffectHandle.js.map
