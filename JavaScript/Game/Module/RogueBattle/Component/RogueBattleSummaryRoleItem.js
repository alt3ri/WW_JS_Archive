"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueBattleSummaryRoleItem = void 0);
const UE = require("ue"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  AttributeItem_1 = require("../../Common/AttributeItem"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew"),
  RogueBattleMapRoleListGrid_1 = require("./RogueBattleMapRoleListGrid");
class RogueBattleSummaryRoleItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Spt = void 0),
      (this.AttributeItemList = []),
      (this.I2i = () => {
        return new RogueBattleMapRoleListGrid_1.RogueBattleMapRoleLayoutGrid();
      }),
      (this.vy1 = () => {
        var e = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems()[0],
          e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(
            e.GetConfigId,
          );
        UiManager_1.UiManager.OpenView(
          "RoleAttributeDetailView",
          e.GetShowAttrList(),
        );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIButtonComponent],
      [4, UE.UIItem],
      [5, UE.UIScrollViewWithScrollbarComponent],
      [6, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[3, this.vy1]]);
  }
  OnStart() {
    (this.Spt = new GenericScrollViewNew_1.GenericScrollViewNew(
      this.GetScrollViewWithScrollbar(5),
      this.I2i,
    )),
      this.Uho();
  }
  OnBeforeShow() {
    this.UpdateAttribute(), this.yy1();
  }
  OnBeforeHide() {}
  OnBeforeDestroy() {
    this.Spt = void 0;
    for (const e of this.AttributeItemList) e.Destroy();
    this.AttributeItemList = [];
  }
  yy1() {
    var t = [],
      i = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems(),
      r = [i[0].GetConfigId];
    for (let e = 1; e < i.length; e++) {
      var a = { ConfigId: i[e].GetConfigId, IsGain: !0, NeedLevel: !1 };
      t.push(a), r.push(i[e].GetConfigId);
    }
    (ModelManager_1.ModelManager.RogueBattleModel.SummaryRoleList = r),
      this.Spt?.RefreshByData(t);
  }
  Uho() {
    var t = CommonParamById_1.configCommonParamById.GetIntArrayConfig(
        "RoleAttributeDisplay6",
      ),
      i = this.GetItem(1),
      r = this.GetItem(2);
    let a = void 0;
    var o = t.length;
    for (let e = 0; e < o; ++e) {
      a = 0 === e ? r : LguiUtil_1.LguiUtil.CopyItem(r, i);
      var s = t[e],
        l = new AttributeItem_1.AttributeItem();
      l.CreateThenShowByActor(a.GetOwner()),
        l.UpdateParam(s, !1),
        2 < o && e % 2 == 0 ? l.SetBgActive(!0) : l.SetBgActive(!1),
        this.AttributeItemList.push(l);
    }
  }
  UpdateAttribute() {
    var t = CommonParamById_1.configCommonParamById.GetIntArrayConfig(
        "RoleAttributeDisplay6",
      ),
      e = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems()[0],
      i = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e.GetConfigId);
    for (let e = 0; e < this.AttributeItemList.length; ++e) {
      var r = this.AttributeItemList[e],
        a = t[e],
        a = i.GetShowAttributeValueById(a);
      r.SetCurrentValue(a), r.SetActive(!0);
    }
  }
}
exports.RogueBattleSummaryRoleItem = RogueBattleSummaryRoleItem;
//# sourceMappingURL=RogueBattleSummaryRoleItem.js.map
