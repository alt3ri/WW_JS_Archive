"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleIntroductionView = void 0);
const UE = require("ue"),
  MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  StringBuilder_1 = require("../../../../../Core/Utils/StringBuilder"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  BigElementItem_1 = require("../../../Common/BigElementItem"),
  RoleSkillInputItem_1 = require("../../../RoleUi/RoleSkill/RoleSkillInputItem"),
  SimpleGenericLayout_1 = require("../../../Util/Layout/SimpleGenericLayout"),
  GenericScrollView_1 = require("../../../Util/ScrollView/GenericScrollView");
class RoleIntroductionView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.dFe = 0),
      (this.CFe = void 0),
      (this.$be = void 0),
      (this.gFe = void 0),
      (this.fFe = (i, e, t) => {
        e = new RoleSkillInputItem_1.RoleSkillInputItem(e);
        return e.Update(i), e.SetBgActive(t % 2 == 0), { Key: t, Value: e };
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
    var i = this.GetItem(4);
    await this.gFe.CreateByActorAsync(i.GetOwner());
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
    var i =
        ConfigManager_1.ConfigManager.RoleSkillConfig.GetRoleSkillInputConfigById(
          this.dFe,
        ),
      e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(this.dFe);
    if (i && e) {
      const r = this.GetTexture(1),
        s =
          (r.SetUIActive(!1),
          this.SetRoleIcon(e.FormationRoleCard, r, this.dFe, void 0, () => {
            r.SetUIActive(!0);
          }),
          this.GetText(3).ShowTextNew(e.Name),
          this.gFe.Refresh(e.ElementId),
          this.gFe.SetUiActive(!0),
          this.$be.RebuildLayout(e.QualityId),
          this.GetTexture(5));
      s.SetUIActive(!1),
        this.SetTextureByPath(i.Icon, s, void 0, () => {
          s.SetUIActive(!0);
        });
      var e = i.DescList,
        t = new StringBuilder_1.StringBuilder();
      for (const n of e)
        t.Append(MultiTextLang_1.configMultiTextLang.GetLocalTextNew(n)),
          t.Append("\n");
      t.RemoveLast(1), this.GetText(6).SetText(t.ToString());
      (e = i.SkillInputIdList),
        (i =
          (this.CFe.RefreshByData(e),
          ConfigManager_1.ConfigManager.ActivityRoleTrialConfig.GetRoleTrialInfoConfigByRoleId(
            this.dFe,
          )));
      i &&
        (StringUtils_1.StringUtils.IsEmpty(i?.InstanceText)
          ? this.GetItem(9).SetUIActive(!1)
          : (this.GetText(8).ShowTextNew(i.InstanceText),
            this.GetItem(9).SetUIActive(!0)));
    }
  }
  OnBeforeDestroy() {
    this.CFe.ClearChildren();
  }
}
exports.RoleIntroductionView = RoleIntroductionView;
//# sourceMappingURL=RoleIntroductionView.js.map
