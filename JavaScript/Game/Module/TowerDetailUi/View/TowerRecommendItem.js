"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TowerRecommendItem = void 0);
const UE = require("ue");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
const MediumItemGrid_1 = require("../../Common/MediumItemGrid/MediumItemGrid");
const EditBattleTeamController_1 = require("../../EditBattleTeam/EditBattleTeamController");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const GenericLayoutNew_1 = require("../../Util/Layout/GenericLayoutNew");
const LguiUtil_1 = require("../../Util/LguiUtil");
const PERCENT = 0.01;
class TowerRecommendItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(),
      (this.Nke = void 0),
      (this.rDo = void 0),
      (this.Hke = (e, t, r) => {
        const i = new MediumItemGrid_1.MediumItemGrid();
        var t =
          (i.Initialize(t.GetOwner()),
          ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e.l3n));
        var t = {
          Type: 2,
          ItemConfigId: e.l3n,
          BottomTextId: "Text_LevelShow_Text",
          BottomTextParameter: [e.r3n],
          ElementId: t.ElementId,
          IsDisable: !this.nDo(e),
        };
        return i.Apply(t), { Key: r, Value: i };
      }),
      (this.sDo = () => {
        EditBattleTeamController_1.EditBattleTeamController.SetEditBattleTeamByRoleId(
          this.rDo,
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
      (this.BtnBindInfo = [[0, this.sDo]]);
  }
  OnStart() {
    this.rDo = [];
  }
  Refresh(e, t, r) {
    this.GetText(2).SetText("" + (r + 1)),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(3),
        "Text_ExplorationDegree_Text",
        MathUtils_1.MathUtils.GetFloatPointFloorString(e.obs * PERCENT, 2),
      ),
      (this.Nke = new GenericLayoutNew_1.GenericLayoutNew(
        this.GetHorizontalLayout(4),
        this.Hke,
      ));
    const i = [];
    for (const a of e.SVn) i.push(a);
    i.sort((e, t) => {
      let r, i;
      return e.r3n === t.r3n
        ? (r = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
            e.l3n,
          ).QualityId) ===
          (i = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
            t.l3n,
          ).QualityId)
          ? t.l3n - e.l3n
          : i - r
        : t.r3n - e.r3n;
    }),
      this.Nke.RebuildLayoutByDataNew(i);
  }
  nDo(e) {
    e = e.l3n;
    if (ModelManager_1.ModelManager.RoleModel.IsMainRole(e)) {
      const t = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerRoleId();
      if (
        ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e)?.ElementId !==
        ModelManager_1.ModelManager.RoleModel.GetRoleDataById(
          t,
        )?.GetElementInfo()?.Id
      )
        return this.GetInteractionGroup(1).SetInteractable(!1), !1;
      this.rDo.push(t);
    } else {
      if (!ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e))
        return this.GetInteractionGroup(1).SetInteractable(!1), !1;
      this.rDo.push(e);
    }
    return !0;
  }
  OnBeforeDestroy() {
    (this.rDo.length = 0), (this.Nke = void 0);
  }
}
exports.TowerRecommendItem = TowerRecommendItem;
// # sourceMappingURL=TowerRecommendItem.js.map
