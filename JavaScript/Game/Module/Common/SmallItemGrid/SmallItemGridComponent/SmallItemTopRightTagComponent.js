"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SmallItemTopRightTagComponent = void 0);
const UE = require("ue"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  SmallItemGridComponent_1 = require("./SmallItemGridComponent");
class SmallItemTopRightTagComponent extends SmallItemGridComponent_1.SmallItemGridComponent {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIText],
    ];
  }
  OnRefresh(t) {
    var e = t.TopRightTextId,
      i = t.TopRightText,
      r = StringUtils_1.StringUtils.IsEmpty(e),
      o = StringUtils_1.StringUtils.IsEmpty(i),
      l = !r || !o;
    this.SetActive(l),
      l &&
        ((l = this.GetText(1)),
        e && !r
          ? ((r = t.TopRightTextParameter),
            LguiUtil_1.LguiUtil.SetLocalTextNew(l, e, r))
          : i && !o && l.SetText(i),
        (e = t.TopRightTextBgColor) &&
          this.GetSprite(0).SetColor(UE.Color.FromHex(e)),
        (r = t.TopRightTextColor)) &&
        this.GetText(1).SetColor(UE.Color.FromHex(r));
  }
  GetResourceId() {
    return "UiItem_ItemTopRightText";
  }
  GetLayoutLevel() {
    return 1;
  }
}
exports.SmallItemTopRightTagComponent = SmallItemTopRightTagComponent;
//# sourceMappingURL=SmallItemTopRightTagComponent.js.map
