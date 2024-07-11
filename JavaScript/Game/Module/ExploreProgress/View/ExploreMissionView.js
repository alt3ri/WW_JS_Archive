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
      (this.L9e = 0),
      (this.VHs = []),
      (this.HHs = void 0),
      (this.cHe = () => {
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
    this.L9e = this.OpenParam;
    var e =
      ConfigManager_1.ConfigManager.ExploreProgressConfig.GetAreaMissionConfigByAreaId(
        this.L9e,
      );
    if (e) {
      for (const r of e) {
        var s = new ExploreAreaMissionData_1.ExploreAreaMissionData(r);
        this.VHs.push(s);
      }
      this.VHs.sort((i, e) => {
        var s = i.IsQuestVisible();
        return s !== e.IsQuestVisible()
          ? s
            ? -1
            : 1
          : (s = i.QuestStatus) !== e.QuestStatus
            ? 3 === s
              ? 1
              : -1
            : (s = i.IsBranchQuest()) !== e.IsBranchQuest()
              ? s
                ? 1
                : -1
              : i.QuestId - e.QuestId;
      }),
        (this.HHs = new LoopScrollView_1.LoopScrollView(
          this.GetLoopScrollViewComponent(0),
          this.GetItem(1)?.GetOwner(),
          this.cHe,
        )),
        this.HHs.RefreshByData(this.VHs);
      let i = 0;
      for (const t of this.VHs) 3 === t.QuestStatus && i++;
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(2),
        "ExploreMissionProgress",
        i,
        this.VHs.length,
      );
    }
  }
  OnBeforeDestroy() {
    (this.L9e = 0), (this.VHs.length = 0);
  }
}
exports.ExploreMissionView = ExploreMissionView;
//# sourceMappingURL=ExploreMissionView.js.map
