"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleSkillTreeAttributeItem = void 0);
const UE = require("ue"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class RoleSkillTreeAttributeItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(), (this.iaa = 0), this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UIItem],
      [5, UE.UIItem],
    ];
  }
  OnStart() {
    (this.iaa = this.GetItem(5)?.GetWidth() ?? 0), this.SetNextLevelItem(!1);
  }
  Refresh(e, t) {
    var i = this.GetText(0),
      s = this.GetText(1),
      r =
        (i.SetWidth(this.iaa),
        s.SetWidth(this.iaa),
        e.AttrBaseValue && s.SetText(e.AttrBaseValue),
        e.AttrNameText && i.SetText(e.AttrNameText),
        i.GetTextRenderSize().X),
      o = s.GetTextRenderSize().X,
      a =
        CommonParamById_1.configCommonParamById.GetIntConfig(
          "RoleSkillTreeAttributeSpace",
        ) ?? 0,
      a = this.iaa - a,
      l = a / 2;
    r + o < a
      ? (i.SetWidth(r), s.SetWidth(o))
      : l <= r && l <= o
        ? (i.SetWidth(l), s.SetWidth(l))
        : l <= r
          ? (i.SetWidth(a - o), s.SetWidth(o))
          : (i.SetWidth(r), s.SetWidth(a - r)),
      t &&
        t.AttrBaseValue &&
        ((l = this.GetText(3)).SetText(t.AttrBaseValue),
        (o = t.AttrBaseValue !== e.AttrBaseValue),
        l.SetChangeColor(o, l.changeColor),
        this.GetItem(4).SetUIActive(o));
  }
  SetNextLevelItem(e) {
    this.GetItem(2).SetUIActive(e);
  }
}
exports.RoleSkillTreeAttributeItem = RoleSkillTreeAttributeItem;
//# sourceMappingURL=RoleSkillTreeAttributeItem.js.map
