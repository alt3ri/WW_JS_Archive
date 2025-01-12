"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ResonanceChainLockedItem =
    exports.ResonanceChainActivatedItem =
    exports.ResonanceChainBaseItem =
      void 0);
const UE = require("ue"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
class ResonanceChainBaseItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.ResonanceId = 0),
      (this.RoleId = 0),
      (this.Wai = !1),
      (this.pqe = void 0),
      (this.$pt = void 0),
      (this.ActivateSequenceName = void 0),
      (this.OnActivateSequenceEndCallBack = void 0),
      (this.wco = 0),
      (this.LoadPromise = void 0),
      (this.OnSequenceEndCallBack = (e) => {
        e === this.ActivateSequenceName &&
          this.OnActivateSequenceEndCallBack &&
          this.OnActivateSequenceEndCallBack();
      }),
      (this.Bco = () => {
        this.pqe && this.pqe(this.ResonanceId);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UINiagara],
      [1, UE.UIExtendToggle],
      [3, UE.UIItem],
      [2, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[1, this.Bco]]);
  }
  OnStart() {
    this.GetUiNiagara(0).SetTickableWhenPaused(!0);
  }
  OnStartImplement() {
    (this.$pt = new LevelSequencePlayer_1.LevelSequencePlayer(
      this.GetRootItem(),
    )),
      this.$pt.BindSequenceCloseEvent(this.OnSequenceEndCallBack);
  }
  Update(e, t) {
    (this.ResonanceId = t), (this.RoleId = e), this.Refresh();
  }
  async Refresh() {
    await this.LoadPromise,
      this.RefreshToggleState(this.Wai),
      this.Kbe(),
      this.RefreshRedDot();
  }
  async ShowItem() {
    this.SetActive(!0), await this.bco();
  }
  GetUiItemForGuide() {
    return this.GetExtendToggle(1)
      ?.GetOwner()
      .GetComponentByClass(UE.UIItem.StaticClass());
  }
  BindToggleCallBack(e) {
    this.pqe = e;
  }
  RefreshToggleState(e, t = !1) {
    this.SetSelectState(e);
    e = this.Wai ? 1 : 0;
    t
      ? this.GetExtendToggle(1).SetToggleStateForce(e)
      : this.GetExtendToggle(1).SetToggleState(e);
  }
  SetSelectState(e) {
    this.Wai = e;
  }
  async SetIconRotation(e) {
    (this.wco = e), await this.LoadPromise, this.qco();
  }
  qco() {
    (ResonanceChainBaseItem.Gco.Yaw = this.wco),
      this.GetItem(2).SetUIRelativeRotation(ResonanceChainBaseItem.Gco);
  }
  Kbe() {
    var e,
      t =
        ConfigManager_1.ConfigManager.RoleResonanceConfig.GetRoleResonanceById(
          this.ResonanceId,
        );
    t &&
      !StringUtils_1.StringUtils.IsBlank(t.NodeIcon) &&
      ((e = this.GetUiNiagara(0)),
      this.SetNiagaraTextureByPath(t.NodeIcon, e, "icon001", "Mask"));
  }
  RefreshRedDot() {}
  GetResonanceId() {
    return this.ResonanceId;
  }
  GetRedDotItem() {
    return this.GetItem(3);
  }
  async PlayActivateSequence(e) {
    (this.OnActivateSequenceEndCallBack = e),
      await this.LoadPromise,
      this.$pt.PlayLevelSequenceByName(this.ActivateSequenceName);
  }
  async bco() {
    await this.LoadPromise,
      this.$pt.StopSequenceByKey("Start"),
      this.$pt.PlayLevelSequenceByName("Start");
  }
}
(exports.ResonanceChainBaseItem = ResonanceChainBaseItem).Gco = new UE.Rotator(
  0,
  0,
  0,
);
class ResonanceChainActivatedItem extends ResonanceChainBaseItem {
  constructor(e) {
    super(),
      (this.ActivateSequenceName = "ClickIn"),
      (this.LoadPromise = this.CreateByResourceIdAsync(
        "UIItem_ResonanceChainActivatedItem",
        e,
      ));
  }
}
exports.ResonanceChainActivatedItem = ResonanceChainActivatedItem;
class ResonanceChainLockedItem extends ResonanceChainBaseItem {
  constructor(e) {
    super(),
      (this.ActivateSequenceName = "Click"),
      (this.LoadPromise = this.CreateByResourceIdAsync(
        "UIItem_ResonanceChainLockedItem",
        e,
      ));
  }
  RefreshRedDot() {
    var e =
        ConfigManager_1.ConfigManager.RoleResonanceConfig.GetRoleResonanceById(
          this.ResonanceId,
        ),
      e = ModelManager_1.ModelManager.RoleModel.RedDotResonanceTabHoleCondition(
        this.RoleId,
        e.GroupIndex,
      );
    this.GetItem(3)?.SetUIActive(e);
  }
}
exports.ResonanceChainLockedItem = ResonanceChainLockedItem;
//# sourceMappingURL=ResonanceChainItem.js.map
