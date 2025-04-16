"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ScratchTicketConditionData = void 0);
const Log_1 = require("../../../../../../Core/Common/Log"),
  MultiTextLang_1 = require("../../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  StringUtils_1 = require("../../../../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager");
class ScratchTicketConditionData {
  constructor() {
    (this.Id = 0),
      (this.Lo = void 0),
      (this.Aol = 1),
      (this.xXt = 0),
      (this.Rol = 0);
  }
  Init(t) {
    (this.Id = t.s5n),
      (this.Lo =
        ConfigManager_1.ConfigManager.ActivityScratchTicketConfig.GetScratchTicketConditionConfig(
          this.Id,
        )),
      void 0 !== this.Lo &&
        ((this.Aol = this.Lo.TaskType), this.RefreshCondition(t));
  }
  RefreshCondition(t) {
    (this.xXt = t.nvs), (this.Rol = t.nS_);
  }
  IsFinish() {
    return this.Rol >= this.Lo.RefreshTimesLimit;
  }
  GetConditionDesc() {
    var t,
      i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(this.Lo.TaskName);
    return 1 === this.Aol
      ? i
      : (t = this.Lo.TaskParams).length <= 0
        ? (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "ScratchTicket",
              58,
              "刮刮乐ScratchCardTimesRe参数TaskParams配置错误",
              ["Id", this.Id],
            ),
          StringUtils_1.EMPTY_STRING)
        : StringUtils_1.StringUtils.Format(
            i,
            t[0].toString(),
            this.xXt.toString(),
            this.Rol.toString(),
            this.Lo.RefreshTimesLimit.toString(),
          );
  }
  GetConditionTypeName() {
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
      this.Lo.TaskTypeName,
    );
  }
}
exports.ScratchTicketConditionData = ScratchTicketConditionData;
//# sourceMappingURL=ScratchTicketConditionData.js.map
