"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ItemView = void 0);
const UE = require("ue");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../Util/LguiUtil");
class ItemView extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(),
      (this.rmi = void 0),
      (this.EPe = void 0),
      (this.nmi = void 0),
      (this.s_i = (e) => {
        this.nmi && this.nmi(this.rmi);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIItem],
      [2, UE.UISprite],
      [3, UE.UIText],
      [4, UE.UIText],
      [5, UE.UIExtendToggle],
      [6, UE.UISprite],
      [7, UE.UISprite],
      [8, UE.UISprite],
      [9, UE.UISprite],
      [10, UE.UISprite],
      [11, UE.UISprite],
      [12, UE.UISprite],
      [13, UE.UISprite],
      [14, UE.UIItem],
      [15, UE.UITexture],
      [16, UE.UIItem],
      [17, UE.UISprite],
      [18, UE.UIText],
    ]),
      (this.BtnBindInfo = [[5, this.s_i]]);
  }
  OnStart() {
    this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  OnBeforeDestroy() {
    (this.nmi = void 0), this.EPe.Clear(), (this.EPe = void 0);
  }
  BindOnItemButtonClickedCallback(e) {
    this.nmi = e;
  }
  Refresh(e, t, i) {
    this.RefreshItemViewByItemData(e), this.SetSelected(t);
  }
  OnSelected(e) {
    this.SetSelected(!0);
  }
  OnDeselected(e) {
    this.SetSelected(!1);
  }
  RefreshItemViewByItemData(e) {
    var e = (this.rmi = e).GetItemViewInfo();
    const t = e.QualityId;
    const i = e.IsLock;
    const s = e.IsNewItem;
    var e = e.ItemDataType;
    switch (
      (this.Odi(),
      this.kdi(t),
      this.Fdi(i),
      this.SetIsNewItem(s),
      this.RefreshCdTimeDisplay(),
      e)
    ) {
      case 0:
        var r = this.rmi.GetCount();
        this.Vdi(r);
        break;
      case 2:
        (r = this.rmi.GetItemDataBase().GetUniqueId()),
          (r =
            ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
              r,
            ).GetLevel());
        this.Hdi(r);
        break;
      case 3:
        (r = this.rmi.GetItemDataBase().GetUniqueId()),
          (r =
            ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
              r,
            ).GetPhantomLevel());
        this.Hdi(r);
        break;
      default:
        r = this.rmi.GetCount();
        this.Vdi(r);
    }
  }
  Odi() {
    const e = this.GetTexture(0);
    this.SetItemIcon(e, this.rmi.GetConfigId());
  }
  kdi(e) {
    const t = this.GetSprite(2);
    t && this.SetItemQualityIcon(t, this.rmi.GetConfigId());
  }
  SetSelected(e) {
    const t = this.GetExtendToggle(5);
    e ? t.SetToggleState(1, !1) : t.SetToggleState(0, !1);
  }
  Fdi(e) {
    const t = this.GetSprite(6);
    t && t.SetUIActive(e);
  }
  SetIsNewItem(e) {
    this.GetSprite(7).SetUIActive(e);
  }
  Vdi(e) {
    const t = this.GetText(4);
    t &&
      (t.SetText(e.toString()), t.SetUIActive(!0), (e = this.GetText(3))) &&
      e.SetUIActive(!1);
  }
  Hdi(e) {
    const t = this.GetText(3);
    t &&
      (LguiUtil_1.LguiUtil.SetLocalText(t, "LevelShow", e),
      t.SetUIActive(!0),
      (e = this.GetText(4))) &&
      e.SetUIActive(!1);
  }
  SetRoleHeadVisible(e) {
    this.GetItem(14).SetUIActive(e);
  }
  jdi(e) {
    const t = this.GetItem(16);
    t.bIsUIActive !== e &&
      (t.SetUIActive(e), e) &&
      this.EPe.PlayLevelSequenceByName("EnterCd");
  }
  RefreshCdTimeDisplay() {
    const e = this.rmi.GetConfigId();
    let t = ModelManager_1.ModelManager.BuffItemModel;
    const i = t.GetBuffItemRemainCdTime(e);
    i <= 0
      ? this.jdi(!1)
      : ((t = t.GetBuffItemTotalCdTime(e)), this.Wdi(i, t), this.jdi(!0));
  }
  Wdi(e, t) {
    var e = Math.ceil(e);
    const i = this.GetSprite(17);
    const s = this.GetText(18);
    i.SetFillAmount(e / t), s.SetText(e.toString());
  }
}
exports.ItemView = ItemView;
// # sourceMappingURL=ItemView.js.map
