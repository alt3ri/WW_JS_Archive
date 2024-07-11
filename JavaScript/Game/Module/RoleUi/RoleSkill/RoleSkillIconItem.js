"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleSkillIconItem = void 0);
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class RoleSkillIconItem extends UiPanelBase_1.UiPanelBase {
  constructor(t, i = !1) {
    super(),
      (this.yco = i),
      (this.zke = 0),
      (this.Ico = 0),
      (this.pqe = void 0),
      (this.Yke = () => {
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
      this.yco
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
      (this.BtnBindInfo = [[0, this.Yke]]);
  }
  Update(t, i) {
    (this.zke = t), (this.Ico = i), this.Refresh();
  }
  SetId(t, i) {
    (this.zke = t), (this.Ico = i);
  }
  Refresh() {
    this.RefreshSkillIcon(), this.RefreshState();
  }
  RefreshState() {
    const t = ModelManager_1.ModelManager.RoleModel.GetRoleSkillTreeNodeLevel(
      this.zke,
      this.Ico,
    );
    this.GetItem(2)?.SetUIActive(t > 0);
    let i = this.yco ? this.GetTexture(1) : this.GetSprite(1);
    i?.SetChangeColor(t > 0, i.changeColor),
      (i = this.yco ? this.GetTexture(5) : this.GetSprite(5))?.SetChangeColor(
        t > 0,
        i.changeColor,
      ),
      (i = this.yco ? this.GetTexture(6) : this.GetSprite(6))?.SetChangeColor(
        t > 0,
        i.changeColor,
      );
    const s = ModelManager_1.ModelManager.RoleModel.GetRoleSkillTreeNodeState(
      this.zke,
      this.Ico,
    );
    this.GetItem(4)?.SetUIActive(s === 1),
      this.GetItem(3)?.SetUIActive(s !== 1 && t === 0);
  }
  RefreshSkillIcon() {
    const t = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNode(
      this.Ico,
    );
    const i = t.SkillId;
    let s = void 0;
    (s =
      i && i > 0
        ? ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillConfigById(i)
            ?.Icon
        : t.PropertyNodeIcon) && this.Tco(s);
  }
  Tco(t) {
    this.yco
      ? (this.Lco(1, t), this.Lco(5, t), this.Lco(6, t))
      : (this.Dco(1, t), this.Dco(5, t), this.Dco(6, t));
  }
  Lco(t, i) {
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
  Dco(t, i) {
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
    return this.zke;
  }
  GetSkillNodeId() {
    return this.Ico;
  }
  SetToggleCallBack(t) {
    this.pqe = t;
  }
  SetToggleState(t) {
    this.GetExtendToggle(0).SetToggleState(t);
  }
}
exports.RoleSkillIconItem = RoleSkillIconItem;
// # sourceMappingURL=RoleSkillIconItem.js.map
