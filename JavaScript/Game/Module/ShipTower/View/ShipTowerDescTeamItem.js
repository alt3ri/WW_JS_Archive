"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ShipTowerDescTeamItem = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  SmallItemGrid_1 = require("../../Common/SmallItemGrid/SmallItemGrid"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  ShipTowerDefine_1 = require("../ShipTowerDefine"),
  ShipTowerRoleItem_1 = require("./ShipTowerRoleItem"),
  ShipTowerWordItem_1 = require("./ShipTowerWordItem");
class ShipTowerDescTeamItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.fGt = void 0),
      (this.tFe = void 0),
      (this.GG_ = void 0),
      (this.fDo = void 0),
      (this.RoleClickCallBack = void 0),
      (this.BuffClickCallBack = void 0),
      (this.MechanismClickCallBack = void 0),
      (this.ks_ = () => {
        this.MechanismClickCallBack?.(this.fGt);
      }),
      (this.IA_ = () => {
        this.RoleClickCallBack?.(this.fGt);
      }),
      (this.Os_ = () => {
        this.fDo.SetSelected(!1, !0), this.BuffClickCallBack?.(this.fGt);
      }),
      (this.uyi = () => {
        return new ShipTowerRoleItem_1.ShipTowerRoleItem();
      }),
      (this.KHe = () => {
        return new ShipTowerWordItem_1.ShipTowerWordItem();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UIButtonComponent],
      [5, UE.UIVerticalLayout],
      [6, UE.UISprite],
      [7, UE.UISprite],
      [8, UE.UITexture],
      [9, UE.UIText],
      [10, UE.UIHorizontalLayout],
      [11, UE.UIItem],
      [12, UE.UIExtendToggle],
      [14, UE.UIMultiTemplateLayout],
      [13, UE.UIText],
      [15, UE.UIItem],
      [16, UE.UIText],
    ]),
      (this.BtnBindInfo = [
        [4, this.ks_],
        [12, this.IA_],
      ]);
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
    var e = this.GetHorizontalLayout(10),
      i = this.GetMultiTemplateLayout(14),
      t = this.GetItem(15).GetOwner();
    (this.tFe = new GenericLayout_1.GenericLayout(e, this.uyi)),
      (this.GG_ = new GenericLayout_1.GenericLayout(i, this.KHe, t)),
      (this.fDo = new SmallItemGrid_1.SmallItemGrid()),
      this.fDo.Initialize(this.GetItem(11).GetOwner()),
      this.fDo.BindOnExtendToggleClicked(this.Os_),
      this.fDo.BindEmptySlotButtonCallback(this.Os_),
      this.fDo.BindOnCanExecuteChange(() => !1),
      (this.GetExtendToggle(12).bLockStateOnSelect = !0),
      this.SetTeamToggleIsSelect(!1);
  }
  OnBeforeCreate() {}
  OnStart() {}
  OnBeforeDestroy() {}
  Refresh(e) {
    var i = (this.fGt = e).GetInstanceDungeonCfg(),
      t = e.GetShipTowerStageCfg(),
      r = ModelManager_1.ModelManager.ShipTowerModel.GetRecommendLevelByInstId(
        e.InstId,
      ),
      e =
        (this.GetText(0).ShowTextNew(e.TeamInstName),
        this.GetText(16).ShowTextNew(e.TeamName),
        this.GetText(1).SetText(e.CurrentScore.toString()),
        this.Gs_(t?.BuffId ?? []),
        this.GetText(3).ShowTextNew("GhostShipMonster_Text1"),
        this.GetText(13).ShowTextNew(i.DungeonDesc),
        this.SetTextureByPath(i.DifficultyIcon, this.GetTexture(8)),
        this.GetText(9));
    LguiUtil_1.LguiUtil.SetLocalTextNew(
      e,
      ShipTowerDefine_1.shipTowerTextKey.RecommendLevel,
      r,
    ),
      this.UpdateRoleList(),
      this.UpdateBuff(),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("ShipTower", 69, this.constructor.name, [
          "Refresh",
          this.fGt,
        ]);
  }
  SetTeamToggleIsSelect(e) {
    e = e ? 1 : 0;
    this.GetExtendToggle(12)?.SetToggleStateForce(e);
  }
  Gs_(e) {
    var i = ShipTowerDefine_1.shipTowerTextKey.WordTitle;
    let t = ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(i, i);
    e.length ||
      ((i = ShipTowerDefine_1.shipTowerTextKey.WordNull),
      (e = ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(i, i)),
      (t = t + "  " + e)),
      this.GetText(2).SetText(t),
      this.GG_.RefreshByData(this.fGt.GetWordInfoList());
  }
  UpdateRoleList() {
    this.tFe.RefreshByData(this.fGt.GetUseRoleList());
  }
  UpdateBuff() {
    var e = this.fGt.BuffDataEdit?.ItemId ?? 0;
    0 < e
      ? ((e = { Data: this.fGt, Type: 4, ItemConfigId: e }), this.fDo.Apply(e))
      : this.fDo.Apply({ Type: 1 });
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    let i = void 0;
    switch (e[0]) {
      case "Desc":
        i = this.GetText(13)?.GetParentAsUIItem();
        break;
      case "Item":
        i = this.fDo.GetRootItem();
        break;
      case "TeamAndItem":
        i = this.GetGuideUiItem("1");
        break;
      case "TeamAndItemOuter":
        i = this.GetExtendToggle(12)?.GetRootComponent();
    }
    return i ? [i, i] : void 0;
  }
}
exports.ShipTowerDescTeamItem = ShipTowerDescTeamItem;
//# sourceMappingURL=ShipTowerDescTeamItem.js.map
