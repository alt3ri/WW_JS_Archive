"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GachaTagItem = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class GachaTagItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.Data = void 0),
      (this.SelectCallback = void 0),
      (this.CanExecuteChange = void 0),
      (this.ujt = () => {
        this.SelectCallback?.(this.GridIndex);
      });
  }
  get GachaId() {
    return this.Data.GachaInfo.Id;
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UISprite],
      [2, UE.UIItem],
      [3, UE.UIExtendToggle],
      [4, UE.UIItem],
      [5, UE.UISprite],
      [6, UE.UIText],
    ]),
      (this.BtnBindInfo = [[3, this.ujt]]);
  }
  OnStart() {
    this.GetExtendToggle(3).CanExecuteChange.Bind(
      () => !this.CanExecuteChange || this.CanExecuteChange(this.GridIndex),
    );
  }
  SetSelected(t) {
    t
      ? this.GetExtendToggle(3).SetToggleState(1)
      : this.GetExtendToggle(3).SetToggleState(0);
  }
  RefreshRedDot() {
    this.GetItem(2)?.SetUIActive(
      ModelManager_1.ModelManager.GachaModel.CheckNewGachaPoolById(
        this.GachaId,
      ),
    );
  }
  InitData() {
    var t, i;
    this.Data &&
      ((t = this.Data.PoolInfo.Id),
      (t = ConfigManager_1.ConfigManager.GachaConfig.GetGachaViewInfo(t))
        ? (this.SetSpriteByPath(
            t.TagNotSelectedSpritePath,
            this.GetSprite(0),
            !1,
          ),
          this.SetSpriteByPath(t.TagSelectedSpritePath, this.GetSprite(1), !1),
          this.GetItem(4).SetUIActive(!0),
          (t = t.Type),
          (i = (t =
            ConfigManager_1.ConfigManager.GachaConfig.GetGachaViewTypeConfig(t))
            .TagText) && !StringUtils_1.StringUtils.IsBlank(i)
            ? (this.GetItem(4).SetUIActive(!0),
              LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), t.TagText),
              (i = UE.Color.FromHex(t.TagColor)),
              this.GetSprite(5).SetColor(i))
            : this.GetItem(4).SetUIActive(!1))
        : Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Gacha",
            35,
            "获取抽卡界面信息失败，请检查GachaViewInfo表，GachaId:" +
              this.GachaId,
          ));
  }
  Refresh(t, i, e) {
    (this.Data = t),
      this.InitData(),
      this.RefreshRedDot(),
      i ? this.OnSelected(!1) : this.OnDeselected(!1);
  }
  GetKey(t, i) {
    return this.GachaId;
  }
  OnSelected(t) {
    this.SetSelected(!0);
  }
  OnDeselected(t) {
    this.SetSelected(!1);
  }
}
exports.GachaTagItem = GachaTagItem;
//# sourceMappingURL=GachaTagItem.js.map
