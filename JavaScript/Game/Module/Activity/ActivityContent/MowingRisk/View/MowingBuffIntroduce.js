"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MowingBuffIntroduce = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../../../Util/LguiUtil"),
  GRAY_ALPHA = 0.3;
class MowingBuffIntroduce extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), (this.kqe = () => {});
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UITexture],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UIText],
      [5, UE.UITexture],
      [6, UE.UINiagara],
      [9, UE.UINiagara],
      [10, UE.UINiagara],
      [7, UE.UISprite],
      [8, UE.UISprite],
    ]),
      (this.BtnBindInfo = [[0, this.kqe]]);
  }
  OnStart() {
    this.GetSprite(8)?.SetUIActive(!1);
  }
  RefreshByCustomData(i) {
    var t = this.GetText(2),
      s =
        (t?.SetUIActive(void 0 !== i.LevelTextId),
        i.LevelTextId &&
          LguiUtil_1.LguiUtil.SetLocalTextNew(
            t,
            i.LevelTextId,
            i.LevelTextArgs,
          ),
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), i.NameTextId),
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(4),
          i.TipsTextId,
          ...i.TipsArgs,
        ),
        this.GetTexture(1)),
      s =
        (s?.SetUIActive(void 0 !== i.BackgroundPath),
        i.BackgroundPath && this.SetTextureByPath(i.BackgroundPath, s),
        this.GetTexture(5));
    s?.SetUIActive(void 0 !== i.IconPath),
      i.IconPath && this.SetTextureByPath(i.IconPath, s),
      this.Nja(i.HexColor),
      this.GetSprite(7)?.SetUIActive(!i.IsUnlock),
      t?.SetChangeColor(!i.IsUnlock),
      s?.SetIsGray(!i.IsUnlock),
      s?.SetAlpha(i.IsUnlock ? 1 : GRAY_ALPHA);
  }
  Nja(i) {
    this.GetUiNiagara(6)?.SetUIActive("3E9DFFFF" === i),
      this.GetUiNiagara(9)?.SetUIActive("7645A3FF" === i),
      this.GetUiNiagara(10)?.SetUIActive("FFBD47FF" === i);
  }
}
exports.MowingBuffIntroduce = MowingBuffIntroduce;
//# sourceMappingURL=MowingBuffIntroduce.js.map
