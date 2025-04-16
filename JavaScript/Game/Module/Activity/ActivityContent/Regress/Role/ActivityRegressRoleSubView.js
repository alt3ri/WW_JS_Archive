"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRegressRoleSubView = void 0);
const Log_1 = require("../../../../../../Core/Common/Log"),
  StringUtils_1 = require("../../../../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  GachaDefine_1 = require("../../../../Gacha/GachaDefine"),
  SpineRoleGachaPoolItem_1 = require("../../../../Gacha/GachaMainView/SpineRoleGachaPoolItem"),
  UpRoleGachaPoolItem_1 = require("../../../../Gacha/GachaMainView/UpRoleGachaPoolItem"),
  RoleController_1 = require("../../../../RoleUi/RoleController"),
  ActivityRoleDescribeComponent_1 = require("../../UniversalComponents/ActivityRoleDescribeComponent"),
  ActivityRegressDefine_1 = require("../ActivityRegressDefine"),
  ActivityRegressMainSubViewBase_1 = require("../Base/ActivityRegressMainSubViewBase"),
  ActivityRegressTabGroupPanel_1 = require("../Panels/ActivityRegressTabGroupPanel"),
  ActivityRegressRoleActivityInfoPanel_1 = require("./ActivityRegressRoleActivityInfoPanel");
class ActivityRegressRoleSubView extends ActivityRegressMainSubViewBase_1.ActivityRegressMainSubViewBase {
  constructor() {
    super(...arguments),
      (this.tma = void 0),
      (this.Oda = void 0),
      (this.ima = void 0),
      (this.Gda = void 0),
      (this.Xda = void 0),
      (this.Lo = void 0),
      (this.oCa = void 0),
      (this.$Ql = void 0),
      (this.XQl = 0),
      (this.Wwn = (e) => {
        var i,
          t,
          e = this.Gda[e].Config,
          s =
            (this.ima.RefreshData(e),
            ModelManager_1.ModelManager.GachaModel.GetGachaInfo(e.GachaId));
        void 0 === s
          ? Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "ActivityRecall",
              63,
              "回流活动->ActivityRecallRoleSubView.TabCallBack 不存在该抽卡数据",
              ["GachaId: ", e.GachaId],
            )
          : void 0 ===
              (i =
                0 < (t = s.UsePoolId)
                  ? s.GetPoolInfo(t)
                  : s.GetFirstValidPool())
            ? Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "ActivityRecall",
                63,
                "[回流活动]ActivityRecallRoleSubView->TabCallBack 不存在该卡池数据",
                ["GachaId: ", e.GachaId],
                ["usePoolId: ", t],
              )
            : (this.YQl(s, i),
              (this.Lo = e),
              (t =
                ModelManager_1.ModelManager.ActivityRegressModel.GetGachaRoleId(
                  e.GachaId,
                )),
              this.tma.Update(t),
              this.InvokePassRecallBaseCallBack(e, 2),
              this.SequencePlayer.PlaySequence("Start"));
      }),
      (this.rma = () => {
        var e =
          ModelManager_1.ModelManager.ActivityRegressModel.GetGachaTrialRoleId(
            this.Lo.GachaId,
          );
        RoleController_1.RoleController.OpenRoleMainView(1, 0, [e]);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos =
      ActivityRegressDefine_1.activityRegressMainViewComponentsInfo),
      (this.BtnBindInfo = [[2, this.rma]]);
  }
  async OnBeforeStartAsync() {
    this.Xda = this.OpenParam;
    var e = this.GetItem(4);
    this.XQl = e.GetAnchorOffsetX();
    e = this.GetItem(1).GetOwner();
    (this.tma =
      new ActivityRoleDescribeComponent_1.ActivityRoleDescribeComponent()),
      await this.tma.CreateThenShowByActorAsync(e, void 0, !0);
    e = this.GetItem(6).GetOwner();
    (this.ima =
      new ActivityRegressRoleActivityInfoPanel_1.ActivityRegressRoleActivityInfoPanel()),
      await this.ima.CreateThenShowByActorAsync(e);
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
      this.GetItem(3).SetUIActive(!0);
  }
  OnBeforeDestroy() {
    this.Oda.Destroy(), (this.Oda = void 0);
  }
  OnUpdate(e) {
    var i =
        ConfigManager_1.ConfigManager.ActivityRegressConfig.GetSortedOpenRegressBaseConfigList(),
      t = i[0],
      i = i[1],
      s =
        ((this.Gda = []),
        new ActivityRegressDefine_1.ActivityRegressTabSwitchItemCommonData()),
      t =
        ((s.RecallEntryType = this.Xda),
        (s.Config = t),
        ModelManager_1.ModelManager.ActivityRegressModel.GetRoleConfigByGachaId(
          t.GachaId,
        ));
    (s.Title = t.Name),
      this.Gda.push(s),
      void 0 !== i &&
        (((t =
          new ActivityRegressDefine_1.ActivityRegressTabSwitchItemCommonData()).RecallEntryType =
          this.Xda),
        (t.Config = i),
        (s =
          ModelManager_1.ModelManager.ActivityRegressModel.GetRoleConfigByGachaId(
            i.GachaId,
          )),
        (t.Title = s.Name),
        this.Gda.push(t)),
      this.GetItem(7).SetUIActive(1 < this.Gda.length),
      this.Oda.RefreshByData(this.Gda, e);
  }
  OnParentShow() {
    super.OnParentShow(), this.oCa?.PlayStartSeqAsync();
  }
  async YQl(e, i) {
    var t,
      e = new GachaDefine_1.GachaPoolData(e, i),
      i = i.Id,
      i = ConfigManager_1.ConfigManager.GachaConfig.GetGachaViewInfo(i);
    StringUtils_1.StringUtils.IsBlank(i.SpinePrefabResource)
      ? 0 !== this.$Ql &&
        (await this.oCa?.DestroyAsync(),
        (this.oCa = void 0),
        (this.oCa = new UpRoleGachaPoolItem_1.UpRoleGachaPoolItem(2)),
        (t = this.GetItem(4)),
        await this.oCa.CreateThenShowByResourceIdAsync(
          "UiItem_LuckdrawPixF",
          t,
        ),
        (this.$Ql = 0))
      : (await this.oCa?.DestroyAsync(),
        (this.oCa = new SpineRoleGachaPoolItem_1.SpineRoleGachaPoolItem(2)),
        (t = i.SpinePrefabResource),
        (i = this.GetItem(8)),
        await this.oCa.CreateThenShowByResourceIdAsync(t, i),
        this.oCa.GetRootItem().SetAnchorOffsetX(this.XQl),
        (this.$Ql = 1)),
      this.oCa.SetDescUiActive(!1),
      this.oCa.Update(e),
      this.oCa.PlayStartSeqAsync();
  }
}
exports.ActivityRegressRoleSubView = ActivityRegressRoleSubView;
//# sourceMappingURL=ActivityRegressRoleSubView.js.map
