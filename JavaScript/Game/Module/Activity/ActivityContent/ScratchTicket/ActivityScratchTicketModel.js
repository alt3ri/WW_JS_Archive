"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityScratchTicketModel = void 0);
const ModelBase_1 = require("../../../../../Core/Framework/ModelBase"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem");
class ActivityScratchTicketModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), (this.Lol = void 0);
  }
  GetScratchTicketData() {
    return this.Lol;
  }
  SetScratchTicketData(e) {
    this.Lol = e;
  }
  GetScratchRoundData(e) {
    if (void 0 !== this.Lol) return this.Lol.GetRoundDataById(e);
  }
  OnScratchCardCountInfoNotify(e) {
    void 0 !== this.Lol &&
      (this.Lol.UpdateAllRoundState(),
      this.Lol.RefreshConditionData(e.IM_),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnScratchTicketConditionRefresh,
      ));
  }
  OnScratchCardRewardResponse(e, t, i, s) {
    var r;
    void 0 !== this.Lol &&
      void 0 !== (r = this.Lol.GetRoundDataById(t)) &&
      ((e = r.GetRewardResultList(e, i.vjn)),
      this.Lol.UpdateCellReward(t, i),
      (r = r.GetRewardDataList(i._vs)),
      s(i.vjn, t, e, r),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        this.Lol.Id,
      ));
  }
}
exports.ActivityScratchTicketModel = ActivityScratchTicketModel;
//# sourceMappingURL=ActivityScratchTicketModel.js.map
