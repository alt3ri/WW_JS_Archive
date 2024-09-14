"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRecallRoleSubView = void 0);
const CustomPromise_1 = require("../../../../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../../../../Core/Common/Log"),
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
      (this.Nda = void 0),
      (this.Eda = void 0),
      (this.Fda = void 0),
      (this.Ida = void 0),
      (this.bda = void 0),
      (this.gda = void 0),
      (this.rCa = void 0),
      (this.Wwn = (e) => {
        var i,
          t,
          e = this.Ida[e].Config,
          l =
            (this.Fda.RefreshByData(e),
            ModelManager_1.ModelManager.GachaModel.GetGachaInfo(e.GachaId));
        void 0 === l
          ? Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "ActivityRecall",
              64,
              "[回流活动]ActivityRecallRoleSubView->TabCallBack 不存在该抽卡数据",
              ["GachaId: ", e.GachaId],
            )
          : void 0 ===
              (t =
                0 < (i = l.UsePoolId)
                  ? l.GetPoolInfo(i)
                  : l.GetFirstValidPool())
            ? Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "ActivityRecall",
                64,
                "[回流活动]ActivityRecallRoleSubView->TabCallBack 不存在该卡池数据",
                ["GachaId: ", e.GachaId],
                ["usePoolId: ", i],
              )
            : ((i = new GachaDefine_1.GachaPoolData(l, t)),
              this.rCa.Update(i),
              this.rCa.PlayStartSeqAsync(),
              (this.gda = e),
              (l = ActivityRecallHelper_1.ActivityRecallHelper.GetGachaRoleId(
                e.GachaId,
              )),
              this.Nda.Update(l),
              this.InvokePassRecallBaseCallBack(e, 2),
              this.SequencePlayer.StopSequenceByKey("Start"),
              (t = new CustomPromise_1.CustomPromise()),
              this.SequencePlayer.PlaySequenceAsync("Start", t));
      }),
      (this.Vda = () => {
        var e = ActivityRecallHelper_1.ActivityRecallHelper.GetGachaTrialRoleId(
          this.gda.GachaId,
        );
        RoleController_1.RoleController.OpenRoleMainView(1, 0, [e]);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos =
      ActivityRecallDefine_1.activityRecallMainViewComponentsInfo),
      (this.BtnBindInfo = [[2, this.Vda]]);
  }
  async OnBeforeStartAsync() {
    (this.bda = this.OpenParam),
      (this.rCa = new UpRoleGachaPoolItem_1.UpRoleGachaPoolItem(2));
    var e = this.GetItem(4);
    await this.rCa.CreateThenShowByResourceIdAsync("UiItem_LuckdrawPixF", e),
      this.rCa.SetDescUiActive(!1);
    e = this.GetItem(1).GetOwner();
    (this.Nda =
      new ActivityRoleDescribeComponent_1.ActivityRoleDescribeComponent()),
      await this.Nda.CreateThenShowByActorAsync(e, void 0, !0);
    e = this.GetItem(6).GetOwner();
    (this.Fda =
      new ActivityRecallRoleActivityInfoPanel_1.ActivityRecallRoleActivityInfoPanel()),
      await this.Fda.CreateThenShowByActorAsync(e);
  }
  OnStart() {
    super.OnStart();
    var e = this.GetHorizontalLayout(0),
      i = this.GetItem(5);
    (this.Eda = new ActivityRecallTabGroupPanel_1.ActivityRecallTabGroupPanel(
      e,
      i,
      this.Wwn,
    )),
      this.Eda.Init(),
      this.GetItem(3).SetUIActive(!0);
  }
  OnBeforeDestroy() {
    this.Eda.Destroy(), (this.Eda = void 0);
  }
  OnRefreshByData(e, i) {
    var t =
        ActivityRecallHelper_1.ActivityRecallHelper.GetSortedOpenRecallBaseConfigList(),
      l = t[0],
      t = t[1],
      a =
        ((this.Ida = []),
        new ActivityRecallDefine_1.ActivityRecallTabSwitchItemCommonData()),
      l =
        ((a.RecallEntryType = this.bda),
        (a.Config = l),
        ActivityRecallHelper_1.ActivityRecallHelper.GetRoleConfigByGachaId(
          l.GachaId,
        ));
    (a.Title = l.Name),
      this.Ida.push(a),
      void 0 !== t &&
        (((l =
          new ActivityRecallDefine_1.ActivityRecallTabSwitchItemCommonData()).RecallEntryType =
          this.bda),
        (l.Config = t),
        (a = ActivityRecallHelper_1.ActivityRecallHelper.GetRoleConfigByGachaId(
          t.GachaId,
        )),
        (l.Title = a.Name),
        this.Ida.push(l)),
      this.GetItem(7).SetUIActive(1 < this.Ida.length),
      this.Eda.RefreshByData(this.Ida, i);
  }
  OnParentShow() {
    super.OnParentShow(), this.rCa?.PlayStartSeqAsync();
  }
}
exports.ActivityRecallRoleSubView = ActivityRecallRoleSubView;
//# sourceMappingURL=ActivityRecallRoleSubView.js.map
