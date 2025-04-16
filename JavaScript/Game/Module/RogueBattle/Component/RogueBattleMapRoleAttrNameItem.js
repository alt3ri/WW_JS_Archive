"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueBattleMapRoleAttributeNameItem =
    exports.RougeBattleAttributeStarItem =
      void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout");
class RougeBattleAttributeStarItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
    ];
  }
  Refresh(e, t, r) {
    this.GetItem(1)?.SetUIActive(e);
  }
}
exports.RougeBattleAttributeStarItem = RougeBattleAttributeStarItem;
class RogueBattleMapRoleAttributeNameItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.$be = void 0),
      (this.Fao = () => new RougeBattleAttributeStarItem());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UITexture],
      [3, UE.UIText],
      [4, UE.UIHorizontalLayout],
      [5, UE.UIItem],
    ];
  }
  OnStart() {
    this.$be = new GenericLayout_1.GenericLayout(
      this.GetHorizontalLayout(4),
      this.Fao,
    );
  }
  OnBeforeDestroy() {
    this.$be = void 0;
  }
  Refresh(e) {
    var t = ModelManager_1.ModelManager.RoleModel?.GetRoleDataById(e);
    if (t) {
      this.GetText(0).SetText(t.GetName());
      var r = t.GetElementInfo(),
        a =
          ConfigManager_1.ConfigManager.ElementInfoConfig.GetElementInfoLocalName(
            r.Name,
          ),
        a =
          (this.GetText(3).SetText(a),
          this.SetElementIcon(
            r.Icon,
            this.GetTexture(2),
            t.GetRoleConfig().ElementId,
          ),
          ModelManager_1.ModelManager.RogueBattleModel.IsRoleGot(e));
      if (
        (this.GetText(1)?.SetUIActive(a),
        this.GetHorizontalLayout(4)?.RootUIComp.SetUIActive(a),
        a)
      ) {
        var r =
            ModelManager_1.ModelManager.RogueBattleModel.GetIncIdByRoleId(e),
          t = ModelManager_1.ModelManager.RogueBattleModel.GetRoleInfoById(r),
          a = ModelManager_1.ModelManager.MapRogueModel.GetRogueRoleLevel(),
          i =
            (this.GetText(1).SetText("Lv." + a),
            ModelManager_1.ModelManager.MapRogueModel.GetRogueRoleMaxStar()),
          o = t.F6n,
          s = new Array(i);
        for (let e = 0; e < i; e++) s[e] = e < o;
        this.$be?.RefreshByData(s);
      }
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("RogueBattle", 77, "没有角色数据", ["roleId", e]);
  }
}
exports.RogueBattleMapRoleAttributeNameItem =
  RogueBattleMapRoleAttributeNameItem;
//# sourceMappingURL=RogueBattleMapRoleAttrNameItem.js.map
