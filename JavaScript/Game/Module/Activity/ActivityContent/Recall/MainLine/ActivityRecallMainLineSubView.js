"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRecallMainLineSubView = void 0);
const ModelManager_1 = require("../../../../../Manager/ModelManager"),
  ActivityRecallDefine_1 = require("../ActivityRecallDefine"),
  ActivityRecallTabGroupPanel_1 = require("../Panels/ActivityRecallTabGroupPanel"),
  ActivityRecallMainLineActivityInfoPanel_1 = require("./ActivityRecallMainLineActivityInfoPanel");
class ActivityRecallMainLineSubView extends ActivityRecallDefine_1.ActivityMainSubViewBase {
  constructor() {
    super(...arguments),
      (this.u_a = void 0),
      (this.f_a = void 0),
      (this.m_a = void 0),
      (this.Wwn = (i) => {
        i = this.m_a[i].Config;
        this.f_a.RefreshByData(i),
          this.InvokePassRecallBaseCallBack(i, 0),
          this.SequencePlayer.PlaySequence("Start");
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos =
      ActivityRecallDefine_1.activityRecallMainViewComponentsInfo;
  }
  async OnBeforeStartAsync() {
    var i = this.GetItem(6).GetOwner();
    (this.f_a =
      new ActivityRecallMainLineActivityInfoPanel_1.ActivityRecallMainLineActivityInfoPanel()),
      await this.f_a.CreateThenShowByActorAsync(i);
  }
  OnStart() {
    super.OnStart();
    var i = this.GetHorizontalLayout(0),
      t = this.GetItem(5);
    (this.u_a = new ActivityRecallTabGroupPanel_1.ActivityRecallTabGroupPanel(
      i,
      t,
      this.Wwn,
    )),
      this.u_a.Init(),
      this.GetItem(3).SetUIActive(!1);
  }
  OnBeforeDestroy() {
    this.u_a.Destroy(), (this.u_a = void 0);
  }
  OnRefreshByData(i, t) {
    let e =
      ModelManager_1.ModelManager.ActivityRecallModel.GetRecallBaseConfigsByEntryType(
        1,
      ).filter((i) => i.ShowCondition);
    (e = e.slice(0, 3)).sort((i, t) => t.Id - i.Id),
      (this.m_a = []),
      e.forEach((i) => {
        var t =
          new ActivityRecallDefine_1.ActivityRecallTabSwitchItemCommonData();
        (t.RecallEntryType = 1),
          (t.Config = i),
          (t.Title = i.Title),
          this.m_a.push(t);
      }),
      this.GetItem(7).SetUIActive(1 < this.m_a.length),
      this.u_a.RefreshByData(this.m_a, t);
  }
}
exports.ActivityRecallMainLineSubView = ActivityRecallMainLineSubView;
//# sourceMappingURL=ActivityRecallMainLineSubView.js.map
