"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRecallAreaSubView = void 0);
const ModelManager_1 = require("../../../../../Manager/ModelManager"),
  ActivityRecallDefine_1 = require("../ActivityRecallDefine"),
  ActivityRecallTabGroupPanel_1 = require("../Panels/ActivityRecallTabGroupPanel"),
  ActivityRecallAreaActivityInfoPanel_1 = require("./ActivityRecallAreaActivityInfoPanel");
class ActivityRecallAreaSubView extends ActivityRecallDefine_1.ActivityMainSubViewBase {
  constructor() {
    super(...arguments),
      (this.u_a = void 0),
      (this.c_a = void 0),
      (this.m_a = void 0),
      (this.Wwn = (e) => {
        e = this.m_a[e].Config;
        this.c_a.RefreshByData(e), this.InvokePassRecallBaseCallBack(e, 1);
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos =
      ActivityRecallDefine_1.activityRecallMainViewComponentsInfo;
  }
  async OnBeforeStartAsync() {
    var e = this.GetItem(6).GetOwner();
    (this.c_a =
      new ActivityRecallAreaActivityInfoPanel_1.ActivityRecallAreaActivityInfoPanel()),
      await this.c_a.CreateThenShowByActorAsync(e);
  }
  OnStart() {
    super.OnStart();
    var e = this.GetHorizontalLayout(0),
      t = this.GetItem(5);
    (this.u_a = new ActivityRecallTabGroupPanel_1.ActivityRecallTabGroupPanel(
      e,
      t,
      this.Wwn,
    )),
      this.u_a.Init(),
      this.GetItem(3).SetUIActive(!1);
  }
  OnBeforeDestroy() {
    this.u_a.Destroy(), (this.u_a = void 0);
  }
  OnRefreshByData(e, t) {
    let i =
      ModelManager_1.ModelManager.ActivityRecallModel.GetRecallBaseConfigsByEntryType(
        2,
      ).filter((e) => e.ShowCondition);
    (i = i.slice(0, 3)).sort((e, t) => t.Id - e.Id),
      (this.m_a = []),
      i.forEach((e) => {
        var t =
          new ActivityRecallDefine_1.ActivityRecallTabSwitchItemCommonData();
        (t.RecallEntryType = 2),
          (t.Config = e),
          (t.Title = e.Title),
          this.m_a.push(t);
      }),
      this.GetItem(7).SetUIActive(1 < this.m_a.length),
      this.u_a.RefreshByData(this.m_a, t);
  }
}
exports.ActivityRecallAreaSubView = ActivityRecallAreaSubView;
//# sourceMappingURL=ActivityRecallAreaSubView.js.map
