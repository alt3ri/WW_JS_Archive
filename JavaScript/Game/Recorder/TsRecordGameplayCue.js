"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Log_1 = require("../../Core/Common/Log"),
  ResourceSystem_1 = require("../../Core/Resource/ResourceSystem"),
  MathUtils_1 = require("../../Core/Utils/MathUtils");
class TsRecordGameplayCue extends UE.KuroRecordEffect {
  constructor() {
    super(...arguments), (this.Path = ""), (this.Position0 = new UE.Vector());
  }
  ReceiveEndPlay(e) {
    this.OnStop();
  }
  OnPlay() {
    Log_1.Log.CheckWarn() && Log_1.Log.Warn("Test", 6, "OnPlay"),
      this.SpawnHookActorRecord(this.Path, this.Position0);
  }
  OnStop() {
    Log_1.Log.CheckWarn() && Log_1.Log.Warn("Test", 6, "OnStop");
    var s = this.K2_GetComponentsByClass(UE.NiagaraComponent.StaticClass());
    for (let e = s.Num() - 1; 0 <= e; --e) this.K2_DestroyComponent(s.Get(e));
  }
  SpawnHookActorRecord(e, s) {
    var t,
      e = ResourceSystem_1.ResourceSystem.Load(e, UE.NiagaraSystem);
    e?.IsValid() &&
      this.IsValid() &&
      ((t = this.AddComponentByClass(
        UE.NiagaraComponent.StaticClass(),
        !1,
        MathUtils_1.MathUtils.DefaultTransform,
        !1,
      )).SetAsset(e),
      t.SetNiagaraVariableVec3("End", s));
  }
}
exports.default = TsRecordGameplayCue;
//# sourceMappingURL=TsRecordGameplayCue.js.map
