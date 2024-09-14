"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DarkCoastDeliveryLevelUpView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  DarkCoastDeliveryLevelUpItem_1 = require("./DarkCoastDeliveryLevelUpItem");
class DarkCoastDeliveryLevelUpView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.SHa = void 0),
      (this.yHa = () =>
        new DarkCoastDeliveryLevelUpItem_1.DarkCoastDeliveryLevelUpItem()),
      (this.Jvt = () => {
        this.CloseMe();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UITexture],
      [2, UE.UITexture],
      [3, UE.UIHorizontalLayout],
    ]),
      (this.BtnBindInfo = [[0, this.Jvt]]);
  }
  async OnBeforeStartAsync() {
    var e,
      i = this.OpenParam;
    void 0 === i
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error("MingSuTi", 59, "DarkCoastDeliveryLevelUpView 无效输入")
      : ((this.SHa = new GenericLayout_1.GenericLayout(
          this.GetHorizontalLayout(3),
          this.yHa,
        )),
        (e = i.GetLevelDataList()),
        await this.SHa.RefreshByDataAsync(e),
        (e = i.GetLevelTexture(i.PreLevel)),
        (i = i.GetLevelTexture(i.CurLevel)),
        this.SetTextureShowUntilLoaded(e, this.GetTexture(1)),
        this.SetTextureShowUntilLoaded(i, this.GetTexture(2)));
  }
}
exports.DarkCoastDeliveryLevelUpView = DarkCoastDeliveryLevelUpView;
//# sourceMappingURL=DarkCoastDeliveryLevelUpView.js.map
