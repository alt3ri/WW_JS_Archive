"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DailyTaskModel = void 0);
const ModelBase_1 = require("../../../../Core/Framework/ModelBase"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem");
class DailyTaskModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), (this.$oo = void 0);
  }
  OnInit() {
    return (this.$oo = new Map()), !0;
  }
  OnClear() {
    return this.$oo?.clear(), !(this.$oo = void 0);
  }
  GetAllDailyQuest() {
    return this.$oo;
  }
  GetDailyTaskCorrelativeEntities() {
    const t = new Array();
    for (var [, e] of this.$oo)
      e.GetCurrentCorrelativeEntities()?.forEach((e) => {
        t.push(e);
      });
    return t;
  }
  AddDailyQuest(e) {
    e &&
      (this.$oo.set(e.Id, e),
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.DailyTaskChange));
  }
  RemoveDailyQuest(e) {
    this.$oo.delete(e);
  }
}
exports.DailyTaskModel = DailyTaskModel;
//# sourceMappingURL=DailyTaskModel.js.map
