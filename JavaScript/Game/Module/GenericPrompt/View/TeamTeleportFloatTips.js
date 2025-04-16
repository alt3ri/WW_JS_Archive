"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TeamTeleportFloatTips = void 0);
const CommonDefine_1 = require("../../../../Core/Define/CommonDefine"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  GenericPromptFloatTipsBase_1 = require("./GenericPromptFloatTipsBase");
class TeamTeleportFloatTips extends GenericPromptFloatTipsBase_1.GenericPromptFloatTipsBase {
  OnStart() {
    (this.TickDuration =
      (this.OpenParam.Duration ?? 0) * CommonDefine_1.MILLIONSECOND_PER_SECOND),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.MainText,
        "TeamTeleport_Tips",
        TimeUtil_1.TimeUtil.GetRemainTimeDataFormat3(this.TickDuration),
      );
  }
  SetMainText() {}
  SetExtraText() {}
  OnTick(e) {
    this.TickTime >= this.TickDuration
      ? this.CloseMe()
      : ((this.TickTime += e),
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.MainText,
          "TeamTeleport_Tips",
          TimeUtil_1.TimeUtil.GetRemainTimeDataFormat3(
            this.TickDuration - this.TickTime,
          ),
        ));
  }
}
exports.TeamTeleportFloatTips = TeamTeleportFloatTips;
//# sourceMappingURL=TeamTeleportFloatTips.js.map
