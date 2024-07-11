"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleSkillEffectItem = void 0);
const UE = require("ue");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const StringBuilder_1 = require("../../../../../Core/Utils/StringBuilder");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class RoleSkillEffectItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(), this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIText],
    ];
  }
  UpdateItem(e, t) {
    const i =
      ConfigManager_1.ConfigManager.RoleSkillConfig.GetRoleSkillDescriptionConfigById(
        e.Id,
      );
    const r = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
      i.AttributeName,
    );
    this.GetText(0).SetText(r),
      this.GetText(1).SetText(this.GetAttrValueStr(i, e)),
      this.GetText(2).SetText(this.GetAttrValueStr(i, t));
  }
  GetAttrValueStr(e, t) {
    let i = "";
    if (e.Description)
      i = StringUtils_1.StringUtils.Format(
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Description),
        ...t.Desc,
      );
    else {
      const r = new StringBuilder_1.StringBuilder();
      const n = t.Desc.length;
      for (let e = 0; e < n; ++e) r.Append(t.Desc[e]);
      i = r.ToString();
    }
    return i;
  }
}
exports.RoleSkillEffectItem = RoleSkillEffectItem;
// # sourceMappingURL=RoleSkillEffectItem.js.map
