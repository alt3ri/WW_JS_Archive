"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueBattleRoleBuffItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class RogueBattleRoleBuffItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.OnSelectCallback = void 0),
      (this.OnClickBtnDetailCallback = void 0),
      (this.BBl = () => {
        this.OnSelectCallback?.(this.GridIndex);
      }),
      (this.JC1 = () => {
        this.OnClickBtnDetailCallback?.(this.GridIndex);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIText],
      [2, UE.UISprite],
      [3, UE.UIText],
      [4, UE.UIItem],
      [5, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [0, this.BBl],
        [5, this.JC1],
      ]);
  }
  Refresh(t, e, i) {
    var r =
      ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResCharacterBuff(
        t.Aac.v9n,
      );
    r &&
      (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), r.AffixTitle),
      0 === ModelManager_1.ModelManager.RogueBattleModel.DescMode
        ? LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(1),
            r.AffixDescSimple,
          )
        : LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(1),
            r.AffixDesc,
            ...r.AffixDescParam,
          ),
      this.GetSprite(2).SetUIActive(!1),
      this.SetSpriteByPath(r.AffixIcon, this.GetSprite(2), !1, void 0, (t) => {
        t && this.GetSprite(2).SetUIActive(!0);
      }),
      this.GetItem(4).SetUIActive(t.Aac.dws));
  }
  OnSelected(t) {
    this.GetExtendToggle(0).SetToggleState(1, !1);
  }
  OnDeselected(t) {
    this.GetExtendToggle(0).SetToggleState(0, !1);
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    return 0 !== t.length && "FirstBuffDetail" === t[0] && (t = this.GetItem(5))
      ? [t, t]
      : void 0;
  }
}
exports.RogueBattleRoleBuffItem = RogueBattleRoleBuffItem;
//# sourceMappingURL=RogueBattleRoleBuffItem.js.map
