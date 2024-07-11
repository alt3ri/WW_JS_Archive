"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRecallRoleSubView = void 0);
const Log_1 = require("../../../../../../Core/Common/Log"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  GachaDefine_1 = require("../../../../Gacha/GachaDefine"),
  UpRoleGachaPoolItem_1 = require("../../../../Gacha/GachaMainView/UpRoleGachaPoolItem"),
  RoleController_1 = require("../../../../RoleUi/RoleController"),
  ActivityRoleDescribeComponent_1 = require("../../UniversalComponents/ActivityRoleDescribeComponent"),
  ActivityRecallDefine_1 = require("../ActivityRecallDefine"),
  ActivityRecallHelper_1 = require("../Misc/ActivityRecallHelper"),
  ActivityRecallTabGroupPanel_1 = require("../Panels/ActivityRecallTabGroupPanel"),
  ActivityRecallRoleActivityInfoPanel_1 = require("./ActivityRecallRoleActivityInfoPanel");
class ActivityRecallRoleSubView extends ActivityRecallDefine_1.ActivityMainSubViewBase {
  constructor() {
    super(...arguments),
      (this.R_a = void 0),
      (this.u_a = void 0),
      (this.U_a = void 0),
      (this.m_a = void 0),
      (this.y_a = void 0),
      (this.n_a = void 0),
      (this.tca = void 0),
      (this.Wwn = (i) => {
        var e,
          t,
          i = this.m_a[i].Config,
          l =
            (this.U_a.RefreshByData(i),
            ModelManager_1.ModelManager.GachaModel.GetGachaInfo(i.GachaId));
        void 0 === l
          ? Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "ActivityRecall",
              64,
              "[回流活动]ActivityRecallRoleSubView->TabCallBack 不存在该抽卡数据",
              ["GachaId: ", i.GachaId],
            )
          : void 0 ===
              (e =
                0 < (t = l.UsePoolId)
                  ? l.GetPoolInfo(t)
                  : l.GetFirstValidPool())
            ? Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "ActivityRecall",
                64,
                "[回流活动]ActivityRecallRoleSubView->TabCallBack 不存在该卡池数据",
                ["GachaId: ", i.GachaId],
                ["usePoolId: ", t],
              )
            : ((t = new GachaDefine_1.GachaPoolData(l, e)),
              this.tca.Update(t),
              this.tca.PlayStartSeqAsync(),
              (this.n_a = i),
              (l = ActivityRecallHelper_1.ActivityRecallHelper.GetGachaRoleId(
                i.GachaId,
              )),
              this.R_a.Update(l),
              this.InvokePassRecallBaseCallBack(i, 2),
              this.SequencePlayer.PlaySequence("Start"));
      }),
      (this.x_a = () => {
        var i = ActivityRecallHelper_1.ActivityRecallHelper.GetGachaTrialRoleId(
          this.n_a.GachaId,
        );
        RoleController_1.RoleController.OpenRoleMainView(1, 0, [i]);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos =
      ActivityRecallDefine_1.activityRecallMainViewComponentsInfo),
      (this.BtnBindInfo = [[2, this.x_a]]);
  }
  async OnBeforeStartAsync() {
    (this.y_a = this.OpenParam),
      (this.tca = new UpRoleGachaPoolItem_1.UpRoleGachaPoolItem(2));
    var i = this.GetItem(4);
    await this.tca.CreateThenShowByResourceIdAsync("UiItem_LuckdrawPixF", i),
      this.tca.SetDescUiActive(!1);
    i = this.GetItem(1).GetOwner();
    (this.R_a =
      new ActivityRoleDescribeComponent_1.ActivityRoleDescribeComponent()),
      await this.R_a.CreateThenShowByActorAsync(i, void 0, !0);
    i = this.GetItem(6).GetOwner();
    (this.U_a =
      new ActivityRecallRoleActivityInfoPanel_1.ActivityRecallRoleActivityInfoPanel()),
      await this.U_a.CreateThenShowByActorAsync(i);
  }
  OnStart() {
    super.OnStart();
    var i = this.GetHorizontalLayout(0),
      e = this.GetItem(5);
    (this.u_a = new ActivityRecallTabGroupPanel_1.ActivityRecallTabGroupPanel(
      i,
      e,
      this.Wwn,
    )),
      this.u_a.Init(),
      this.GetItem(3).SetUIActive(!0);
  }
  OnBeforeDestroy() {
    this.u_a.Destroy(), (this.u_a = void 0);
  }
  OnRefreshByData(i, e) {
    var t =
        ActivityRecallHelper_1.ActivityRecallHelper.GetSortedOpenRecallBaseConfigList(),
      l = t[0],
      t = t[1],
      a =
        ((this.m_a = []),
        new ActivityRecallDefine_1.ActivityRecallTabSwitchItemCommonData()),
      l =
        ((a.RecallEntryType = this.y_a),
        (a.Config = l),
        ActivityRecallHelper_1.ActivityRecallHelper.GetRoleConfigByGachaId(
          l.GachaId,
        ));
    (a.Title = l.Name),
      this.m_a.push(a),
      void 0 !== t &&
        (((l =
          new ActivityRecallDefine_1.ActivityRecallTabSwitchItemCommonData()).RecallEntryType =
          this.y_a),
        (l.Config = t),
        (a = ActivityRecallHelper_1.ActivityRecallHelper.GetRoleConfigByGachaId(
          t.GachaId,
        )),
        (l.Title = a.Name),
        this.m_a.push(l)),
      this.GetItem(7).SetUIActive(1 < this.m_a.length),
      this.u_a.RefreshByData(this.m_a, e);
  }
}
exports.ActivityRecallRoleSubView = ActivityRecallRoleSubView;
//# sourceMappingURL=ActivityRecallRoleSubView.js.map
