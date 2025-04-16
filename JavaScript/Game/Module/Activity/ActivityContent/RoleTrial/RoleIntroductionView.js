"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleIntroductionView = void 0);
const UE = require("ue"),
  MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  StringBuilder_1 = require("../../../../../Core/Utils/StringBuilder"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  BigElementItem_1 = require("../../../Common/BigElementItem"),
  RoleSkillInputItem_1 = require("../../../RoleUi/RoleSkill/RoleSkillInputItem"),
  SimpleGenericLayout_1 = require("../../../Util/Layout/SimpleGenericLayout"),
  GenericScrollView_1 = require("../../../Util/ScrollView/GenericScrollView"),
  RoleSkinTrialController_1 = require("../RoleSkinTrail/RoleSkinTrialController"),
  ActivityRoleTrialController_1 = require("./ActivityRoleTrialController");
class RoleIntroductionView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.dFe = 0),
      (this.CFe = void 0),
      (this.$be = void 0),
      (this.gFe = void 0),
      (this.fFe = (e, i, t) => {
        i = new RoleSkillInputItem_1.RoleSkillInputItem(i);
        return i.Update(e), i.SetBgActive(t % 2 == 0), { Key: t, Value: i };
      }),
      (this.pFe = () => {
        this.CloseMe();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UITexture],
      [2, UE.UIHorizontalLayout],
      [3, UE.UIText],
      [4, UE.UIItem],
      [5, UE.UITexture],
      [6, UE.UIText],
      [7, UE.UIScrollViewWithScrollbarComponent],
      [8, UE.UIText],
      [9, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.pFe]]);
  }
  async OnBeforeStartAsync() {
    this.gFe = new BigElementItem_1.BigElementItem();
    var e = this.GetItem(4);
    await this.gFe.CreateByActorAsync(e.GetOwner());
  }
  OnStart() {
    (this.CFe = new GenericScrollView_1.GenericScrollView(
      this.GetScrollViewWithScrollbar(7),
      this.fFe,
    )),
      (this.$be = new SimpleGenericLayout_1.SimpleGenericLayout(
        this.GetHorizontalLayout(2),
      )),
      (this.dFe = this.OpenParam),
      this.Refresh();
  }
  Refresh() {
    var e =
        ConfigManager_1.ConfigManager.RoleSkillConfig.GetRoleSkillInputConfigById(
          this.dFe,
        ),
      i = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(this.dFe);
    if (e && i) {
      const r = this.GetTexture(1),
        n =
          (r.SetUIActive(!1),
          this.SetRoleIcon(i.FormationRoleCard, r, this.dFe, void 0, () => {
            r.SetUIActive(!0);
          }),
          this.GetText(3).ShowTextNew(i.Name),
          this.gFe.Refresh(i.ElementId),
          this.gFe.SetUiActive(!0),
          this.$be.RebuildLayout(i.QualityId),
          this.GetTexture(5));
      n.SetUIActive(!1),
        this.SetTextureByPath(e.Icon, n, void 0, () => {
          n.SetUIActive(!0);
        });
      var i = e.DescList,
        t = new StringBuilder_1.StringBuilder();
      for (const o of i)
        t.Append(MultiTextLang_1.configMultiTextLang.GetLocalTextNew(o)),
          t.Append("\n");
      t.RemoveLast(1), this.GetText(6).SetText(t.ToString());
      i = e.SkillInputIdList;
      this.CFe.RefreshByData(i), this.C4e();
    }
  }
  C4e() {
    let e = "";
    if (
      !RoleSkinTrialController_1.RoleSkinTrialController.CheckIfInRoleSkinTrialInstance()
    ) {
      var i = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
      for (const r of ActivityRoleTrialController_1.ActivityRoleTrialController.GetCurrentActivityDataList()) {
        var t = r.GetConfigByRoleAndInstance(this.dFe, i);
        if (t) {
          e = t.InstanceText;
          break;
        }
      }
    }
    StringUtils_1.StringUtils.IsEmpty(e)
      ? this.GetItem(9).SetUIActive(!1)
      : (this.GetText(8).ShowTextNew(e), this.GetItem(9).SetUIActive(!0));
  }
  OnBeforeHide() {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.RoleIntroductionViewHide,
    );
  }
  OnBeforeDestroy() {
    this.CFe.ClearChildren(), this.A7l();
  }
  A7l() {
    RoleSkinTrialController_1.RoleSkinTrialController.CheckIfInRoleSkinTrialInstance()
      ? RoleSkinTrialController_1.RoleSkinTrialController.RequestRoleSkinTrialUiEndPush()
      : ActivityRoleTrialController_1.ActivityRoleTrialController.PushRoleIntroductionViewDone();
  }
}
exports.RoleIntroductionView = RoleIntroductionView;
//# sourceMappingURL=RoleIntroductionView.js.map
