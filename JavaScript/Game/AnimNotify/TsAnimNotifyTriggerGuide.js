"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Log_1 = require("../../Core/Common/Log"),
  GuideFromMontageByEventGroupId_1 = require("../../Core/Define/ConfigQuery/GuideFromMontageByEventGroupId"),
  IAction_1 = require("../../UniverseEditor/Interface/IAction"),
  LevelGeneralContextDefine_1 = require("../LevelGamePlay/LevelGeneralContextDefine"),
  ControllerHolder_1 = require("../Manager/ControllerHolder");
class TsAnimNotifyTriggerGuide extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments), (this.EventGroupId = 0);
  }
  K2_Notify(e, r) {
    var o = this.ParseEventGroupId2GuideGroupId(this.EventGroupId),
      t = [
        {
          Name: "GuideTrigger",
          Params: {
            Type: IAction_1.EGuideTriggerType.BeginnerGuide,
            GuideId: o,
          },
        },
      ];
    return (
      ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsNew(
        t,
        LevelGeneralContextDefine_1.EntityContext.Create(),
      ),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Guide",
          65,
          "由蒙太奇触发的引导",
          ["EventGroupId", this.EventGroupId],
          ["GuideGroupId", o],
        ),
      !0
    );
  }
  GetNotifyName() {
    return "执行行为组事件";
  }
  ParseEventGroupId2GuideGroupId(e) {
    return (
      GuideFromMontageByEventGroupId_1.configGuideFromMontageByEventGroupId.GetConfig(
        e,
      )?.GuideGroupId ?? 0
    );
  }
}
exports.default = TsAnimNotifyTriggerGuide;
//# sourceMappingURL=TsAnimNotifyTriggerGuide.js.map
