"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DangoAbyssTagItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../../Util/LguiUtil");
class DangoAbyssTagItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), (this.GetValueByAddType = !1);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIText],
      [2, UE.UIText],
    ];
  }
  Refresh(e, r, t) {
    var i =
        ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoPluginPropDescById(
          e.TagId,
        ),
      i =
        (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), i.Name),
        UE.Color.FromHex(i.BgColor)),
      i =
        (this.GetSprite(0).SetColor(i),
        ModelManager_1.ModelManager.DangoAbyssModel.GetFormatAttributeValueByTagId(
          e.Value,
          e.TagId,
          this.GetValueByAddType,
        ));
    this.GetText(2).SetText(i);
  }
}
exports.DangoAbyssTagItem = DangoAbyssTagItem;
//# sourceMappingURL=DangoAbyssTagItem.js.map
