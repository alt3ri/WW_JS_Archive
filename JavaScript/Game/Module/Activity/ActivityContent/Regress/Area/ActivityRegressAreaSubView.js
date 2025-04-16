"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRegressAreaSubView = void 0);
const ModelManager_1 = require("../../../../../Manager/ModelManager"),
  ActivityRegressDefine_1 = require("../ActivityRegressDefine"),
  ActivityRegressMainSubViewBase_1 = require("../Base/ActivityRegressMainSubViewBase"),
  ActivityRegressTabGroupPanel_1 = require("../Panels/ActivityRegressTabGroupPanel"),
  ActivityRegressAreaActivityInfoPanel_1 = require("./ActivityRegressAreaActivityInfoPanel");
class ActivityRegressAreaSubView extends ActivityRegressMainSubViewBase_1.ActivityRegressMainSubViewBase {
  constructor() {
    super(...arguments),
      (this.zh1 = void 0),
      (this.Jh1 = void 0),
      (this.Gda = void 0),
      (this.Wwn = (e) => {
        e = this.Gda[e].Config;
        this.Jh1.RefreshByData(e),
          this.InvokePassRecallBaseCallBack(e, 1),
          this.SequencePlayer.PlaySequence("Start");
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos =
      ActivityRegressDefine_1.activityRegressMainViewComponentsInfo;
  }
  async OnBeforeStartAsync() {
    var e = this.GetItem(6).GetOwner();
    (this.Jh1 =
      new ActivityRegressAreaActivityInfoPanel_1.ActivityRegressAreaActivityInfoPanel()),
      await this.Jh1.CreateThenShowByActorAsync(e);
  }
  OnStart() {
    super.OnStart();
    var e = this.GetHorizontalLayout(0),
      i = this.GetItem(5);
    (this.zh1 = new ActivityRegressTabGroupPanel_1.ActivityRegressTabGroupPanel(
      e,
      i,
      this.Wwn,
    )),
      this.zh1.Init(),
      this.GetItem(3).SetUIActive(!1);
  }
  OnBeforeDestroy() {
    this.zh1.Destroy(), (this.zh1 = void 0);
  }
  OnUpdate(e) {
    var i =
      ModelManager_1.ModelManager.ActivityRegressModel.GetLastestRegressBaseConfigList(
        2,
      );
    (this.Gda = []),
      i.forEach((e) => {
        var i =
          new ActivityRegressDefine_1.ActivityRegressTabSwitchItemCommonData();
        (i.RecallEntryType = 2),
          (i.Config = e),
          (i.Title = e.Title),
          this.Gda.push(i);
      }),
      this.GetItem(7).SetUIActive(1 < this.Gda.length),
      this.zh1.RefreshByData(this.Gda, e);
  }
}
exports.ActivityRegressAreaSubView = ActivityRegressAreaSubView;
//# sourceMappingURL=ActivityRegressAreaSubView.js.map
