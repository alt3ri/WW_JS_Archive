"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRegressMainLineSubView = void 0);
const ModelManager_1 = require("../../../../../Manager/ModelManager"),
  ActivityRegressDefine_1 = require("../ActivityRegressDefine"),
  ActivityRegressMainSubViewBase_1 = require("../Base/ActivityRegressMainSubViewBase"),
  ActivityRegressTabGroupPanel_1 = require("../Panels/ActivityRegressTabGroupPanel"),
  ActivityRegressMainLineActivityInfoPanel_1 = require("./ActivityRegressMainLineActivityInfoPanel");
class ActivityRegressMainLineSubView extends ActivityRegressMainSubViewBase_1.ActivityRegressMainSubViewBase {
  constructor() {
    super(...arguments),
      (this.Oda = void 0),
      (this.$da = void 0),
      (this.Gda = void 0),
      (this.Wwn = (e) => {
        e = this.Gda[e].Config;
        this.$da.RefreshByData(e),
          this.InvokePassRecallBaseCallBack(e, 0),
          this.SequencePlayer.PlaySequence("Start");
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos =
      ActivityRegressDefine_1.activityRegressMainViewComponentsInfo;
  }
  async OnBeforeStartAsync() {
    var e = this.GetItem(6).GetOwner();
    (this.$da =
      new ActivityRegressMainLineActivityInfoPanel_1.ActivityRegressMainLineActivityInfoPanel()),
      await this.$da.CreateThenShowByActorAsync(e);
  }
  OnStart() {
    super.OnStart();
    var e = this.GetHorizontalLayout(0),
      i = this.GetItem(5);
    (this.Oda = new ActivityRegressTabGroupPanel_1.ActivityRegressTabGroupPanel(
      e,
      i,
      this.Wwn,
    )),
      this.Oda.Init(),
      this.GetItem(3).SetUIActive(!1);
  }
  OnBeforeDestroy() {
    this.Oda.Destroy(), (this.Oda = void 0);
  }
  OnUpdate(e) {
    var i =
      ModelManager_1.ModelManager.ActivityRegressModel.GetLastestRegressBaseConfigList(
        1,
      );
    this.Gda = [];
    for (const s of i) {
      var t =
        new ActivityRegressDefine_1.ActivityRegressTabSwitchItemCommonData();
      (t.RecallEntryType = 1),
        (t.Config = s),
        (t.Title = s.Title),
        this.Gda.push(t);
    }
    this.GetItem(7).SetUIActive(1 < this.Gda.length),
      this.Oda.RefreshByData(this.Gda, e);
  }
}
exports.ActivityRegressMainLineSubView = ActivityRegressMainLineSubView;
//# sourceMappingURL=ActivityRegressMainLineSubView.js.map
