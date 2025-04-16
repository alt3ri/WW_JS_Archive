"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueBattleRoleBuffSelectView = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  RoleController_1 = require("../../RoleUi/RoleController"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  RogueBattleRoleBuffItem_1 = require("../Component/RogueBattleRoleBuffItem"),
  RogueBattleTopPanel_1 = require("../Component/RogueBattleTopPanel");
class RogueBattleRoleBuffSelectView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.F4c = void 0),
      (this.clo = void 0),
      (this.ilo = () => {
        (ModelManager_1.ModelManager.MapRogueModel.GetOpData(
          this.OpenParam,
        ).OpExecuteClientId = this.F4c.GetSelectedGridIndex()),
          ModelManager_1.ModelManager.MapRogueModel.ExecuteOpData(
            this.OpenParam,
          );
      }),
      (this.nlo = () => {
        var e = ModelManager_1.ModelManager.MapRogueModel.GetOpData(
            this.OpenParam,
          ).Data.ap1.Ih1.Ld1,
          e =
            ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResBondRole(
              e,
            );
        e &&
          RoleController_1.RoleController.OpenRoleMainView(1, 0, [
            e.TrialRoleId,
          ]);
      }),
      (this.Xho = (e) => {
        e === this.F4c.GetSelectedGridIndex()
          ? (this.F4c?.DeselectCurrentGridProxy(),
            this.GetButton(4).SetSelfInteractive(!1))
          : (this.F4c?.SelectGridProxy(e),
            this.GetButton(4).SetSelfInteractive(!0));
      }),
      (this.UOe = (e) => {
        var t = ModelManager_1.ModelManager.MapRogueModel.GetOpData(
            this.OpenParam,
          ).GetGainDataList(),
          i = [];
        for (let e = 0; e < t.length; e++) {
          var a = t[e];
          a.Aac && i.push(a.Aac.v9n);
        }
        e = { Index: e, AffixIds: i };
        UiManager_1.UiManager.OpenView("RogueBattleRoleAffixDetailView", e);
      }),
      (this.Bqe = () => {
        var e = new RogueBattleRoleBuffItem_1.RogueBattleRoleBuffItem();
        return (
          (e.OnSelectCallback = this.Xho),
          (e.OnClickBtnDetailCallback = this.UOe),
          e
        );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UITexture],
      [2, UE.UIVerticalLayout],
      [3, UE.UIItem],
      [4, UE.UIButtonComponent],
      [5, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [4, this.ilo],
        [5, this.nlo],
      ]);
  }
  async OnBeforeStartAsync() {
    (this.F4c = new GenericLayout_1.GenericLayout(
      this.GetVerticalLayout(2),
      this.Bqe,
    )),
      (this.clo = new RogueBattleTopPanel_1.RogueBattleTopPanel());
    var t = ModelManager_1.ModelManager.MapRogueModel.GetOpData(this.OpenParam);
    if (t) {
      t.UpdateViewFunc = () => {
        var e = ModelManager_1.ModelManager.MapRogueModel.GetOpData(
          this.OpenParam,
        );
        this.F4c?.DeselectCurrentGridProxy(),
          this.F4c?.RefreshByDataAsync(e.GetGainDataList()),
          this.GetButton(4).SetSelfInteractive(!1);
      };
      var i = t.Data.ap1.Ih1.Ld1,
        a = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(i);
      let e =
        ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
          i,
        ).FormationRoleCard;
      a &&
        -1 !== (i = a.GetRoleSkinId()) &&
        ((a = ConfigManager_1.ConfigManager.SkinConfig.GetRoleSkinConfig(i)),
        (e = a.FormationRoleCard)),
        this.SetTextureByPath(e, this.GetTexture(1)),
        this.GetButton(4).SetSelfInteractive(!1),
        await Promise.all([
          this.F4c.RefreshByDataAsync(t.Data.ap1.uac.Dac),
          this.clo.CreateByActorAsync(this.GetItem(0).GetOwner()),
        ]),
        this.AddChild(this.clo),
        this.clo.SetCloseBtnActive(!1);
    }
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (0 !== e.length)
      return this.F4c?.GetLayoutItemByIndex(
        0,
      )?.GetGuideUiItemAndUiItemForShowEx(e);
  }
}
exports.RogueBattleRoleBuffSelectView = RogueBattleRoleBuffSelectView;
//# sourceMappingURL=RogueBattleRoleBuffSelectView.js.map
