"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExploreMissionView = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView"),
  ExploreAreaMissionData_1 = require("../ExploreAreaMissionData"),
  ExploreMissionItem_1 = require("./ExploreMissionItem");
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
    var e =
      ConfigManager_1.ConfigManager.ExploreProgressConfig.GetAreaMissionConfigByAreaId(
        this.c8e,
      );
    if (e) {
      for (const r of e) {
        var s = new ExploreAreaMissionData_1.ExploreAreaMissionData(r);
        this.BTn.push(s);
      }
      this.BTn.sort((i, e) => {
        var s = i.QuestType;
        return s !== e.QuestType
          ? 2 === s
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
      for (const t of this.BTn) 3 === t.QuestStatus && i++;
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
//# sourceMappingURL=ExploreMissionView.js.map
