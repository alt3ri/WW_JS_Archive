"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Log_1 = require("../../Core/Common/Log"),
  GameplayCueHookCommonItem_1 = require("../NewWorld/Character/Common/Component/Abilities/GameplayCueSFX/CommonItem/GameplayCueHookCommonItem");
class TsRecordGameplayCue extends UE.KuroRecordEffect {
  constructor() {
    super(...arguments), (this.Path = ""), (this.Position0 = new UE.Vector());
  }
  ReceiveEndPlay(e) {
    this.OnStop();
  }
  OnPlay() {
    Log_1.Log.CheckWarn() && Log_1.Log.Warn("Test", 6, "OnPlay"),
      GameplayCueHookCommonItem_1.GameplayCueHookCommonItem.StaticSpawnHookActorRecord(
        this.Path,
        this,
        this.Position0,
      );
  }
  OnStop() {
    Log_1.Log.CheckWarn() && Log_1.Log.Warn("Test", 6, "OnStop");
    var o = this.K2_GetComponentsByClass(UE.NiagaraComponent.StaticClass());
    for (let e = o.Num() - 1; 0 <= e; --e) this.K2_DestroyComponent(o.Get(e));
  }
}
exports.default = TsRecordGameplayCue;
//# sourceMappingURL=TsRecordGameplayCue.js.map
