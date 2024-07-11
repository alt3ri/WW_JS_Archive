"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TsEntityBase = exports.getTsEntityClass = void 0);
const UE = require("ue"),
  ue_1 = require("ue"),
  Init_1 = require("../../Interface/Init"),
  TS_ENTITY_PATH =
    "/Game/Aki/TypeScript/UniverseEditor/Common/TsEntity/TsEntityBase.TsEntityBase_C";
function getTsEntityClass() {
  return ue_1.Class.Load(TS_ENTITY_PATH);
}
exports.getTsEntityClass = getTsEntityClass;
class TsEntityBase extends UE.KuroEffectActor {
  constructor() {
    super(...arguments), (this.Id = 0);
  }
  EditorInit() {
    super.EditorInit(),
      (this.bSetActorComponentTickEnabledByFocus = !0),
      this.EditorSetActorComponentsTickEnabled(!1);
  }
  ReceiveBeginPlay() {
    super.ReceiveBeginPlay(), (0, Init_1.isUe5)() || this.K2_DestroyActor();
  }
}
(exports.TsEntityBase = TsEntityBase), (exports.default = TsEntityBase);
//# sourceMappingURL=TsEntityBase.js.map
