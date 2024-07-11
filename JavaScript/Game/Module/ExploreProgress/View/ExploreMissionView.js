"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExploreMissionView = void 0);
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const ExploreAreaMissionData_1 = require("../ExploreAreaMissionData");
const ExploreMissionItem_1 = require("./ExploreMissionItem");
class ExploreMissionView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.c8e = 0),
      (this.BTn = []),
      (this.qTn = void 0),
      (this.z9e = () => {
        return new ExploreMissionItem_1.ExploreMissionItem();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UILoopScrollViewComponent],
      [1, UE.UIItem],
      [2, UE.UIText],
    ];
  }
  OnStart() {
    this.c8e = this.OpenParam;
    const e =
      ConfigManager_1.ConfigManager.ExploreProgressConfig.GetAreaMissionConfigByAreaId(
        this.c8e,
      );
    if (e) {
      for (const r of e) {
        const s = new ExploreAreaMissionData_1.ExploreAreaMissionData(r);
        this.BTn.push(s);
      }
      this.BTn.sort((i, e) => {
        const s = i.QuestType;
        return s !== e.QuestType
          ? s === 2
            ? 1
            : -1
          : i.SortIndex - e.SortIndex;
      }),
        (this.qTn = new LoopScrollView_1.LoopScrollView(
          this.GetLoopScrollViewComponent(0),
          this.GetItem(1)?.GetOwner(),
          this.z9e,
        )),
        this.qTn.RefreshByData(this.BTn);
      let i = 0;
      for (const t of this.BTn) t.QuestStatus === 3 && i++;
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(2),
        "ExploreMissionProgress",
        i,
        this.BTn.length,
      );
    }
  }
  OnBeforeDestroy() {
    (this.c8e = 0), (this.BTn.length = 0);
  }
}
exports.ExploreMissionView = ExploreMissionView;
// # sourceMappingURL=ExploreMissionView.js.map
