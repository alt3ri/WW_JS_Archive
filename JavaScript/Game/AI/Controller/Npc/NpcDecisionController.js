"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NpcDecisionController = void 0);
const UE = require("ue"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem");
class NpcDecisionController {
  constructor() {
    (this.bre = void 0),
      (this.qre = void 0),
      (this.CheckPlayerImpact = !1),
      (this.CheckPlayerAttack = !1),
      (this.CheckDayState = !1),
      (this.CheckWeatherState = !1),
      (this.Gre = (t, e) => {
        !this.bre ||
          (e !== Protocol_1.Aki.Protocol.kMs.Gms &&
            e !== Protocol_1.Aki.Protocol.kMs.Proto_Finish) ||
          (this.qre &&
            this.qre.has(t) &&
            (e = this.bre.TsAiController) &&
            UE.KuroStaticLibrary.IsImplementInterface(
              e.GetClass(),
              UE.BPI_NpcEcological_C.StaticClass(),
            ) &&
            e.HandleQuestChanged());
      }),
      (this.Nre = () => {
        var t;
        this.CheckDayState &&
          this.bre &&
          (t = this.bre.TsAiController) &&
          UE.KuroStaticLibrary.IsImplementInterface(
            t.GetClass(),
            UE.BPI_NpcEcological_C.StaticClass(),
          ) &&
          t.HandleDayStateChanged();
      });
  }
  Init(t) {
    t &&
      ((this.bre = t.CharAiDesignComp), this.bre) &&
      ((this.qre = new Set()), this.Ore());
  }
  Ore() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.DayStateChange,
      this.Nre,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnQuestStateChange,
        this.Gre,
      );
  }
  kre() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.DayStateChange,
      this.Nre,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnQuestStateChange,
        this.Gre,
      );
  }
  AddQuestToCheckList(t) {
    this.qre && this.qre.add(t);
  }
  Destroy() {
    this.kre(), (this.bre = void 0);
  }
}
exports.NpcDecisionController = NpcDecisionController;
//# sourceMappingURL=NpcDecisionController.js.map
