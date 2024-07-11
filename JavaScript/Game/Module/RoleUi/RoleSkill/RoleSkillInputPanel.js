"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleSkillInputPanel = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  FormationDataController_1 = require("../../Abilities/FormationDataController"),
  ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
  InstanceDungeonController_1 = require("../../InstanceDungeon/InstanceDungeonController"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  GenericScrollView_1 = require("../../Util/ScrollView/GenericScrollView"),
  RoleSkillInputItem_1 = require("./RoleSkillInputItem");
class RoleSkillInputPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Wst = void 0),
      (this.CFe = void 0),
      (this.Tmo = void 0),
      (this.fFe = (e, r, o) => {
        r = new RoleSkillInputItem_1.RoleSkillInputItem(r);
        return r.Update(e), r.SetBgActive(o % 2 == 0), { Key: o, Value: r };
      }),
      (this.Lmo = () => {
        if (
          ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()
        )
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
            "RoleGuideNotice01",
          );
        else if (
          FormationDataController_1.FormationDataController.GlobalIsInFight
        )
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
            "RoleGuideNotice06",
          );
        else if (ModelManager_1.ModelManager.GameModeModel.IsMulti)
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
            "RoleGuideNotice05",
          );
        else {
          var e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
              this.Wst.GetRoleId(),
            ),
            r = ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(e.Name);
          const i = e.RoleGuide;
          0 === i
            ? ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                "RoleGuideNotice02",
                r,
              )
            : ((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(94)).SetTextArgs(
                r,
              ),
              e.FunctionMap.set(2, () => {
                var e =
                    ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
                      i,
                    ).FightFormationId,
                  e =
                    ConfigManager_1.ConfigManager.EditBattleTeamConfig.GetFightFormationConfig(
                      e,
                    )?.AutoRole;
                if (0 < (e?.length ?? 0)) {
                  var r = new Array();
                  for (const o of e)
                    r.push(
                      ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleIdConfigByGroupId(
                        o,
                      ),
                    );
                  InstanceDungeonController_1.InstanceDungeonController.PrewarTeamFightRequest(
                    i,
                    r,
                  );
                } else
                  Log_1.Log.CheckError() &&
                    Log_1.Log.Error("Role", 44, "未配置出战人物");
              }),
              ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
                e,
              ));
        }
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIScrollViewWithScrollbarComponent],
      [1, UE.UITexture],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UIItem],
      [5, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[5, this.Lmo]]);
  }
  OnStart() {
    (this.CFe = new GenericScrollView_1.GenericScrollView(
      this.GetScrollViewWithScrollbar(0),
      this.fFe,
    )),
      (this.Tmo = []),
      this.Tmo.push(this.GetText(2)),
      this.Tmo.push(this.GetText(3));
  }
  RefreshUi(e) {
    this.Wst = e;
    var r =
      ConfigManager_1.ConfigManager.RoleSkillConfig.GetRoleSkillInputConfigById(
        e.GetRoleId(),
      );
    if (r) {
      var o = r.SkillInputIdList;
      this.CFe.RefreshByData(o);
      const l = this.GetTexture(1);
      l.SetUIActive(!1),
        this.SetTextureByPath(r.Icon, this.GetTexture(1), void 0, () => {
          l.SetUIActive(!0);
        });
      var o = e.IsTrialRole(),
        i = (this.GetItem(4).SetUIActive(!o), r.DescList);
      for (let e = 0; e < this.Tmo.length; e++) {
        var n = this.Tmo[e];
        e < i.length
          ? (n.SetUIActive(!0), LguiUtil_1.LguiUtil.SetLocalTextNew(n, i[e]))
          : n.SetUIActive(!1);
      }
      (e = ModelManager_1.ModelManager.FunctionModel.IsShow(10043)),
        (r = ModelManager_1.ModelManager.FunctionModel.IsOpen(10043));
      e && r
        ? this.GetItem(4).SetUIActive(!o)
        : this.GetItem(4).SetUIActive(!1);
    }
  }
}
exports.RoleSkillInputPanel = RoleSkillInputPanel;
//# sourceMappingURL=RoleSkillInputPanel.js.map
