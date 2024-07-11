"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivitySubViewBeginnerBook = void 0);
const UE = require("ue"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  ActivityManager_1 = require("../../ActivityManager"),
  ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase"),
  ActivityBeginnerTargetItem_1 = require("./ActivityBeginnerTargetItem");
class ActivitySubViewBeginnerBook extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments),
      (this.mNe = void 0),
      (this.dNe = !0),
      (this.CNe = void 0),
      (this.gNe = void 0),
      (this.sGe = () => {
        return new ActivityBeginnerTargetItem_1.ActivityBeginnerTargetItem();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIVerticalLayout],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
    ];
  }
  OnSetData() {
    this.CNe = this.ActivityBaseData;
  }
  OnStart() {
    this.GetText(0).SetText(this.CNe.GetTitle()),
      (this.gNe = new GenericLayout_1.GenericLayout(
        this.GetVerticalLayout(2),
        this.sGe,
        this.GetItem(3).GetOwner(),
      ));
    var i = 0 === ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
    this.GetItem(4)?.SetUIActive(i),
      this.GetItem(5)?.SetUIActive(!i),
      (this.mNe = this.GetText(1)),
      (this.dNe = 0 !== this.CNe.EndShowTime),
      this.mNe.SetUIActive(0 !== this.CNe.EndShowTime),
      this.fNe();
  }
  async OnBeforeShowSelfAsync() {
    await ActivityManager_1.ActivityManager.GetActivityController(
      this.CNe.Type,
    ).NewJourneyRequest();
  }
  OnRefreshView() {
    this.gNe?.RefreshByData(this.CNe.AllBeginnerTargetList, () => {
      var i = this.gNe?.GetLayoutItemList(),
        t = this.ActivityBaseData;
      for (const e of i)
        e.SetEnableJump(t.GetEnableJump(e.DataId)),
          e.SetFinish(t.GetFinishState(e.DataId));
    });
  }
  pNe(i) {
    this.dNe !== i && ((this.dNe = i), this.mNe.SetUIActive(i));
  }
  fNe() {
    var [i, t] = this.GetTimeVisibleAndRemainTime();
    this.pNe(i), i && this.mNe.SetText(t);
  }
  OnTimer(i) {
    this.fNe();
  }
}
exports.ActivitySubViewBeginnerBook = ActivitySubViewBeginnerBook;
//# sourceMappingURL=ActivitySubViewBeginnerBook.js.map
