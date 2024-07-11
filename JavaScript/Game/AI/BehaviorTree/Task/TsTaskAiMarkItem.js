"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log");
const EntitySystem_1 = require("../../../../Core/Entity/EntitySystem");
const GlobalData_1 = require("../../../GlobalData");
const BlackboardController_1 = require("../../../World/Controller/BlackboardController");
const TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskAiMarkItem extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments),
      (this.ItemBlackboardKey = ""),
      (this.SearchFilterIsMarkByAi = !1),
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
    let s;
    let r;
    let i;
    let o = t.AiController;
    o
      ? (this.InitTsVariables(),
        (s = (o = o.CharActorComp).Entity.GetComponent(69)),
        (r = BlackboardController_1.BlackboardController.GetIntValueByEntity(
          o.Entity.Id,
          this.TsItemBlackboardKey,
        )),
        s.AiItemMarkId !== 0 && this.TsSearchFilterIsMarkByAi
          ? s.AiItemMarkId === r
            ? this.FinishExecute(!0)
            : this.FinishExecute(!1)
          : !(r = EntitySystem_1.EntitySystem.Get(r)) ||
              !(i = r.GetComponent(128)) ||
              i.IsSearchByOther(o.Entity.Id)
            ? this.FinishExecute(!1)
            : (this.TsSearchFilterIsMarkByAi
                ? ((s.AiItemMarkId = r.Id), i.SetSearched(o.Entity))
                : ((s.AiItemMarkId = 0), i.SetUnSearched()),
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
// # sourceMappingURL=TsTaskAiMarkItem.js.map
