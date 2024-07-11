"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExitSkillTag = void 0);
const UE = require("ue"),
  SkillTagById_1 = require("../../../../../Core/Define/ConfigQuery/SkillTagById"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../../Util/LguiUtil");
class ExitSkillTag extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIText],
    ];
  }
  Refresh(i, e, r) {
    var i = SkillTagById_1.configSkillTagById.GetConfig(i);
    i &&
      (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), i.TagName),
      (i = UE.Color.FromHex(i.TagColor)),
      this.GetSprite(0).SetColor(i));
  }
}
exports.ExitSkillTag = ExitSkillTag;
//# sourceMappingURL=ExitSkillTag.js.map
