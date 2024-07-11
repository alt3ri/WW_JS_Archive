"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleSkillIconItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class RoleSkillIconItem extends UiPanelBase_1.UiPanelBase {
  constructor(t, i = !1) {
    super(),
      (this.vmo = i),
      (this.dFe = 0),
      (this.Mmo = 0),
      (this.pqe = void 0),
      (this.cFe = () => {
        this.pqe && this.pqe();
      }),
      this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [3, UE.UIItem],
      [2, UE.UIItem],
      [4, UE.UIItem],
    ]),
      this.vmo
        ? (this.ComponentRegisterInfos.push([1, UE.UITexture]),
          this.ComponentRegisterInfos.push([5, UE.UITexture]),
          this.ComponentRegisterInfos.push([6, UE.UITexture]),
          this.ComponentRegisterInfos.push([
            7,
            UE.UIExtendToggleTextureTransition,
          ]))
        : (this.ComponentRegisterInfos.push([1, UE.UISprite]),
          this.ComponentRegisterInfos.push([5, UE.UISprite]),
          this.ComponentRegisterInfos.push([6, UE.UISprite]),
          this.ComponentRegisterInfos.push([
            7,
            UE.UIExtendToggleSpriteTransition,
          ])),
      (this.BtnBindInfo = [[0, this.cFe]]);
  }
  Update(t, i) {
    (this.dFe = t), (this.Mmo = i), this.Refresh();
  }
  SetId(t, i) {
    (this.dFe = t), (this.Mmo = i);
  }
  Refresh() {
    this.RefreshSkillIcon(), this.RefreshState();
  }
  RefreshState() {
    var t = ModelManager_1.ModelManager.RoleModel.GetRoleSkillTreeNodeLevel(
      this.dFe,
      this.Mmo,
    );
    this.GetItem(2)?.SetUIActive(0 < t);
    let i = this.vmo ? this.GetTexture(1) : this.GetSprite(1);
    i?.SetChangeColor(0 < t, i.changeColor),
      (i = this.vmo ? this.GetTexture(5) : this.GetSprite(5))?.SetChangeColor(
        0 < t,
        i.changeColor,
      ),
      (i = this.vmo ? this.GetTexture(6) : this.GetSprite(6))?.SetChangeColor(
        0 < t,
        i.changeColor,
      );
    var s = ModelManager_1.ModelManager.RoleModel.GetRoleSkillTreeNodeState(
      this.dFe,
      this.Mmo,
    );
    this.GetItem(4)?.SetUIActive(1 === s),
      this.GetItem(3)?.SetUIActive(1 !== s && 0 === t);
  }
  RefreshSkillIcon() {
    var t = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNode(
        this.Mmo,
      ),
      i = t.SkillId;
    let s = void 0;
    (s =
      i && 0 < i
        ? ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillConfigById(i)
            ?.Icon
        : t.PropertyNodeIcon) && this.Emo(s);
  }
  Emo(t) {
    this.vmo
      ? (this.Smo(1, t), this.Smo(5, t), this.Smo(6, t))
      : (this.ymo(1, t), this.ymo(5, t), this.ymo(6, t));
  }
  Smo(t, i) {
    const s = this.GetTexture(t);
    if (s) {
      const e = this.GetUiExtendToggleTextureTransition(7);
      let t = void 0;
      e &&
        (t = () => {
          e?.SetAllTransitionStateTexture(s.GetTexture());
        }),
        this.SetTextureByPath(i, s, void 0, t);
    }
  }
  ymo(t, i) {
    const s = this.GetSprite(t);
    if (s) {
      const e = this.GetUiExtendToggleSpriteTransition(7);
      let t = void 0;
      e &&
        (t = () => {
          e?.SetAllStateSprite(s.GetSprite());
        }),
        this.SetSpriteByPath(i, s, !1, void 0, t);
    }
  }
  GetRoleId() {
    return this.dFe;
  }
  GetSkillNodeId() {
    return this.Mmo;
  }
  SetToggleCallBack(t) {
    this.pqe = t;
  }
  SetToggleState(t) {
    this.GetExtendToggle(0).SetToggleState(t);
  }
}
exports.RoleSkillIconItem = RoleSkillIconItem;
//# sourceMappingURL=RoleSkillIconItem.js.map
