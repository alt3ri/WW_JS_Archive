"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueBattleBuyRoleItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiAsyncTask_1 = require("../../../Ui/Base/UiAsyncTask"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  RogueBattleFetterIconItem_1 = require("./RogueBattleFetterIconItem"),
  RogueBattleTokenElement_1 = require("./RogueBattleTokenElement");
class RogueBattleBuyRoleItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.Pe = void 0),
      (this.aho = void 0),
      (this.nm1 = void 0),
      (this.OnSelectCallback = void 0),
      (this.sm1 = () => {
        this.OnSelectCallback?.(this.GridIndex, this.Pe);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIItem],
      [2, UE.UIVerticalLayout],
      [3, UE.UIText],
      [4, UE.UIItem],
      [5, UE.UIExtendToggle],
      [6, UE.UIItem],
      [7, UE.UISprite],
      [8, UE.UIText],
      [9, UE.UIText],
      [10, UE.UIItem],
      [11, UE.UIItem],
      [12, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[5, this.sm1]]);
  }
  async OnBeforeStartAsync() {
    (this.aho = new RogueBattleTokenElement_1.RogueBattleTokenElement()),
      (this.nm1 = new GenericLayout_1.GenericLayout(
        this.GetVerticalLayout(2),
        () => new RogueBattleFetterIconItem_1.RogueBattleFetterIconItem(),
      )),
      await this.aho.CreateThenShowByActorAsync(this.GetItem(1).GetOwner());
  }
  Refresh(e, t, i) {
    this.Pe = e;
    var s = ConfigManager_1.ConfigManager.RoleConfig?.GetRoleConfig(e.Uac.Ud1);
    if (s) {
      this.GetExtendToggle(5).SetToggleState(t ? 1 : 0, !1),
        this.SetTextureShowUntilLoaded(s.RoleHeadIconLarge, this.GetTexture(0)),
        this.aho?.Refresh(s.ElementId, !1, 0);
      var r = this.GetText(3),
        a =
          (r.SetText(e.Uac.qN_.toString()),
          ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
            e.Uac.L8n,
          ));
      r.SetChangeColor(a < e.Uac.qN_, r.changeColor),
        this.GetItem(4).SetUIActive(e.Uac.O2s),
        this.GetItem(12).SetUIActive(!e.Uac.O2s);
      const o =
        ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResBondRole(
          s.Id,
        );
      o &&
        ((a = new UiAsyncTask_1.UiAsyncTask(
          "RogueBattleBuyRoleItem.Refresh",
          async () => {
            await this.nm1?.RefreshByDataAsync(o.BondIds);
          },
        )),
        this.RunAsyncTask(a));
      r = ModelManager_1.ModelManager.RogueBattleModel?.GetRoleInfoById(
        e.Uac.Ud1,
      );
      r
        ? (this.GetText(8).SetText(r.F6n.toString()),
          this.GetText(9).SetText(
            Math.min(
              r.F6n + e.Uac.F6n,
              ModelManager_1.ModelManager.RogueBattleModel.MaxRoleStar,
            ).toString(),
          ),
          this.GetItem(11).SetUIActive(
            r.F6n < ModelManager_1.ModelManager.RogueBattleModel.MaxRoleStar &&
              e.Uac.O2s,
          ))
        : (this.GetText(8).SetText("0"),
          this.GetText(9).SetText(e.Uac.F6n.toString()),
          this.GetItem(11).SetUIActive(t)),
        this.GetItem(10).SetUIActive(!e.Uac.O2s);
    }
  }
  OnSelected(e) {
    this.GetExtendToggle(5).SetToggleState(1, !1),
      this.GetItem(11).SetUIActive(!0);
  }
  OnDeselected(e) {
    this.GetExtendToggle(5).SetToggleState(0, !1),
      this.GetItem(11).SetUIActive(!1);
  }
}
exports.RogueBattleBuyRoleItem = RogueBattleBuyRoleItem;
//# sourceMappingURL=RogueBattleBuyRoleItem.js.map
