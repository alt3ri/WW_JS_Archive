"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TowerRecommendItem = void 0);
const UE = require("ue"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiManager_1 = require("../../../Ui/UiManager"),
  MediumItemGrid_1 = require("../../Common/MediumItemGrid/MediumItemGrid"),
  EditBattleTeamController_1 = require("../../EditBattleTeam/EditBattleTeamController"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  GenericLayoutNew_1 = require("../../Util/Layout/GenericLayoutNew"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  PERCENT = 0.01;
class TowerRecommendItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(),
      (this.tFe = void 0),
      (this.tRo = void 0),
      (this.nFe = (e, t, r) => {
        var i = new MediumItemGrid_1.MediumItemGrid(),
          t =
            (i.Initialize(t.GetOwner()),
            ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e.Q6n)),
          t = {
            Type: 2,
            ItemConfigId: e.Q6n,
            BottomTextId: "Text_LevelShow_Text",
            BottomTextParameter: [e.F6n],
            ElementId: t.ElementId,
            IsDisable: !this.iRo(e),
          };
        return i.Apply(t), { Key: r, Value: i };
      }),
      (this.oRo = () => {
        EditBattleTeamController_1.EditBattleTeamController.SetEditBattleTeamByRoleId(
          this.tRo,
        ),
          UiManager_1.UiManager.CloseView("TowerRecommendView");
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIInteractionGroup],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UIHorizontalLayout],
    ]),
      (this.BtnBindInfo = [[0, this.oRo]]);
  }
  OnStart() {
    this.tRo = [];
  }
  Refresh(e, t, r) {
    this.GetText(2).SetText("" + (r + 1)),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(3),
        "Text_ExplorationDegree_Text",
        MathUtils_1.MathUtils.GetFloatPointFloorString(e.PGs * PERCENT, 2),
      ),
      (this.tFe = new GenericLayoutNew_1.GenericLayoutNew(
        this.GetHorizontalLayout(4),
        this.nFe,
      ));
    var i = [];
    for (const a of e.ajn) i.push(a);
    i.sort((e, t) => {
      var r, i;
      return e.F6n === t.F6n
        ? (r = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
            e.Q6n,
          ).QualityId) ===
          (i = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
            t.Q6n,
          ).QualityId)
          ? t.Q6n - e.Q6n
          : i - r
        : t.F6n - e.F6n;
    }),
      this.tFe.RebuildLayoutByDataNew(i);
  }
  iRo(e) {
    e = e.Q6n;
    if (ModelManager_1.ModelManager.RoleModel.IsMainRole(e)) {
      var t = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerRoleId();
      if (
        ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e)?.ElementId !==
        ModelManager_1.ModelManager.RoleModel.GetRoleDataById(
          t,
        )?.GetElementInfo()?.Id
      )
        return this.GetInteractionGroup(1).SetInteractable(!1), !1;
      this.tRo.push(t);
    } else {
      if (!ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e))
        return this.GetInteractionGroup(1).SetInteractable(!1), !1;
      this.tRo.push(e);
    }
    return !0;
  }
  OnBeforeDestroy() {
    (this.tRo.length = 0), (this.tFe = void 0);
  }
}
exports.TowerRecommendItem = TowerRecommendItem;
//# sourceMappingURL=TowerRecommendItem.js.map
