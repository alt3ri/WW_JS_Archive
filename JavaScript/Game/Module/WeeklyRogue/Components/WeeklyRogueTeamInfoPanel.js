"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WeeklyRogueTeamInfoPanel = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  AttributeItem_1 = require("../../Common/AttributeItem"),
  RoleController_1 = require("../../RoleUi/RoleController"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  WeeklyRogueInfoViewRoleItem_1 = require("./WeeklyRogueInfoViewRoleItem");
class WeeklyRogueTeamInfoPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.RoleListLayout = void 0),
      (this.AttributeItemList = []),
      (this.uyi = () => {
        var e = new WeeklyRogueInfoViewRoleItem_1.WeeklyRogueInfoViewRoleItem();
        return (e.OnSelectedCallback = this.b5t), e;
      }),
      (this.b5t = (e) => {
        var t = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems();
        t.length <= 0
          ? Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "WeeklyRogue",
              34,
              "肉鸽属性展示面板, 找不到主控角色实体!",
            )
          : ((t = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(
              t[e].GetConfigId,
            )),
            RoleController_1.RoleController.OnSelectedRoleChange(
              t.GetRoleConfig().Id,
              t.GetRoleSkinId(),
            ),
            this.RoleListLayout?.SelectGridProxy(e, !1),
            this.UpdateAttribute());
      }),
      (this.nlo = () => {
        var e = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems();
        e.length <= 0
          ? Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "WeeklyRogue",
              34,
              "肉鸽属性展示面板, 找不到主控角色实体!",
            )
          : ((e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(
              e[this.RoleListLayout.GetSelectedGridIndex()].GetConfigId,
            )),
            UiManager_1.UiManager.OpenView(
              "RogueAttributeDetailView",
              e.GetShowAttrList(),
            ));
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIVerticalLayout],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIButtonComponent],
      [4, UE.UIText],
    ]),
      (this.BtnBindInfo = [[3, this.nlo]]);
  }
  async OnBeforeStartAsync() {
    this.RoleListLayout = new GenericLayout_1.GenericLayout(
      this.GetVerticalLayout(0),
      this.uyi,
    );
    var e = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems().map(
        (e) => e.GetConfigId,
      ),
      e =
        (await this.RoleListLayout.RefreshByDataAsync(e),
        await this.Uho(),
        this.RoleListLayout.SelectGridProxy(0, !0),
        ModelManager_1.ModelManager.WeeklyRogueModel?.ActivityData.GetCycleConfig());
    e &&
      0 !== e.BuffPR &&
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(4),
        e.BuffDesc,
        ...e.BuffDescParam,
      );
  }
  async Uho() {
    var i = CommonParamById_1.configCommonParamById.GetIntArrayConfig(
        "RoleAttributeDisplay6",
      ),
      o = this.GetItem(1),
      r = this.GetItem(2),
      a = [];
    const n = i.length;
    for (let t = 0; t < n; ++t) {
      let e = void 0;
      e = 0 === t ? r : LguiUtil_1.LguiUtil.CopyItem(r, o);
      const s = i[t],
        u = new AttributeItem_1.AttributeItem();
      var l = u.CreateThenShowByActorAsync(e.GetOwner()).then(() => {
        var e = {
          Id: s,
          IsRatio: !1,
          CurValue: 0,
          BgActive: 2 < n && t % 2 == 0,
        };
        u.Refresh(e, !1, t);
      });
      this.AttributeItemList.push(u), a.push(l);
    }
    await Promise.all(a);
  }
  UpdateAttribute() {
    var e = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems();
    if (e.length <= 0)
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "WeeklyRogue",
          34,
          "肉鸽属性展示面板, 找不到主控角色实体!",
        );
    else {
      var t = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(
          e[this.RoleListLayout.GetSelectedGridIndex()].GetConfigId,
        ),
        i = CommonParamById_1.configCommonParamById.GetIntArrayConfig(
          "RoleAttributeDisplay6",
        );
      for (let e = 0; e < this.AttributeItemList.length; ++e) {
        var o = this.AttributeItemList[e],
          r = i[e],
          r = t.GetShowAttributeValueById(r);
        o.SetCurrentValue(r), o.SetActive(!0);
      }
    }
  }
}
exports.WeeklyRogueTeamInfoPanel = WeeklyRogueTeamInfoPanel;
//# sourceMappingURL=WeeklyRogueTeamInfoPanel.js.map
