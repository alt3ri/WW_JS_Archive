"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log"),
  EntitySystem_1 = require("../../../../Core/Entity/EntitySystem"),
  GlobalData_1 = require("../../../GlobalData"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskAiMarkItem extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments),
      (this.ItemBlackboardKey = ""),
      (this.SearchFilterIsMarkByAi = !1),
      (this.IsInitTsVariables = !1),
      (this.TsItemBlackboardKey = ""),
      (this.TsSearchFilterIsMarkByAi = !1);
  }
  Constructor() {
    super.Constructor(),
      (this.IsInitTsVariables = !1),
      (this.TsItemBlackboardKey = ""),
      (this.TsSearchFilterIsMarkByAi = !1);
  }
  InitTsVariables() {
    (this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
      ((this.IsInitTsVariables = !0),
      (this.TsItemBlackboardKey = this.ItemBlackboardKey),
      (this.TsSearchFilterIsMarkByAi = this.SearchFilterIsMarkByAi));
  }
  ReceiveExecuteAI(t, e) {
    var s,
      i,
      r,
      o = t.AiController;
    o
      ? (this.InitTsVariables(),
        (s = (o = o.CharActorComp).Entity.GetComponent(79)),
        (i =
          ControllerHolder_1.ControllerHolder.BlackboardController.GetIntValueByEntity(
            o.Entity.Id,
            this.TsItemBlackboardKey,
          )),
        0 !== s.AiItemMarkId && this.TsSearchFilterIsMarkByAi
          ? s.AiItemMarkId === i
            ? this.FinishExecute(!0)
            : this.FinishExecute(!1)
          : !(i = EntitySystem_1.EntitySystem.Get(i)) ||
              !(r = i.GetComponent(142)) ||
              r.IsSearchByOther(o.Entity.Id)
            ? this.FinishExecute(!1)
            : (this.TsSearchFilterIsMarkByAi
                ? ((s.AiItemMarkId = i.Id), r.SetSearched(o.Entity))
                : ((s.AiItemMarkId = 0), r.SetUnSearched()),
              this.FinishExecute(!0)))
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
            "Type",
            t.GetClass().GetName(),
          ]),
        this.FinishExecute(!1));
  }
}
exports.default = TsTaskAiMarkItem;
//# sourceMappingURL=TsTaskAiMarkItem.js.map
