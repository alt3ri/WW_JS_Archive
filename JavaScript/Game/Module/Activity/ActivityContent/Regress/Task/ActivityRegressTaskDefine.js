"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.taskSubViewTabDataMap = exports.ActivityRegressTaskDynamicData =
    void 0);
class ActivityRegressTaskDynamicData {
  constructor() {
    (this.ItemType = 1), (this.TaskType = 0), (this.Config = void 0);
  }
}
(exports.ActivityRegressTaskDynamicData = ActivityRegressTaskDynamicData),
  (exports.taskSubViewTabDataMap = new Map([
    [
      0,
      {
        TitleKey: "RecallActivity_Task_Title",
        IconName: "SP_IconCircumfluence1",
        Type: 0,
        RedDotName: "ActivityRegressConstantTask",
      },
    ],
    [
      1,
      {
        TitleKey: "Recall_Cultivation_Task_Title",
        IconName: "SP_IconCircumfluence2",
        Type: 1,
        RedDotName: "ActivityRegressCultivate",
      },
    ],
    [
      2,
      {
        TitleKey: "Recall_Double_Reward_Title",
        IconName: "SP_IconCircumfluence3",
        Type: 2,
        RedDotName: "ActivityRegressDoubleDrop",
      },
    ],
  ]));
//# sourceMappingURL=ActivityRegressTaskDefine.js.map
