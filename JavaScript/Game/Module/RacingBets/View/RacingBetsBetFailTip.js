"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RacingBetsBetFailTip = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  DangoManager_1 = require("../../Dango/DangoLogic/DangoManager"),
  RacingBetsController_1 = require("../RacingBetsController"),
  RacingBetsCostItem_1 = require("./Item/RacingBetsCostItem");
class RacingBetsBetFailTip extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.x_1 = 0),
      (this.I01 = void 0),
      (this.sOt = () => {
        this.CloseMe();
      }),
      (this.kvc = () => {
        var e =
          ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsSeasonData();
        e &&
          e.GetLegMatchData(this.x_1) &&
          (RacingBetsController_1.RacingBetsController.RacingBetMatchActionRequest(
            e.Id,
            this.x_1,
          ),
          this.CloseMe());
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIArtText],
      [1, UE.UITexture],
      [2, UE.UIText],
      [3, UE.UITexture],
      [4, UE.UIItem],
      [5, UE.UIButtonComponent],
      [6, UE.UIButtonComponent],
      [7, UE.UITexture],
      [8, UE.UIArtText],
      [9, UE.UIText],
    ]),
      (this.BtnBindInfo = [
        [5, this.sOt],
        [6, this.kvc],
      ]);
  }
  async OnBeforeStartAsync() {
    (this.I01 = new RacingBetsCostItem_1.RacingBetsCostItem()),
      await this.I01.CreateThenShowByActorAsync(this.GetItem(4).GetOwner());
  }
  OnBeforeShow() {
    var e,
      i,
      t,
      s,
      a,
      n = this.OpenParam;
    void 0 === n
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "RacingBets",
          58,
          "RacingBetsFailTip OnBeforeShow matchResult is undefined",
        )
      : ((e = (s =
          ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsSeasonData()).GetLegMatchData(
          n.mJ_,
        )),
        (this.x_1 = n.mJ_),
        this.GetArtText(0).SetText(n.A6c.toString()),
        (i = DangoManager_1.DangoManager.GetDangoData(n.L6c)),
        this.SetTextureShowUntilLoaded(i.Icon, this.GetTexture(1)),
        (t =
          ConfigManager_1.ConfigManager.RacingBetsConfig.GetRacingBetConversionRate(
            n.A6c,
          )),
        (s = s.GetCurrencyItemId()),
        (a =
          ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(s)),
        this.SetTextureShowUntilLoaded(a.Icon, this.GetTexture(3)),
        this.GetText(2).SetText(n.R6c + " x " + t / 100),
        this.I01.RefreshUi(s, n.DS_),
        (a = DangoManager_1.DangoManager.GetDangoData(n.w6c)),
        this.SetTextureShowUntilLoaded(a.IconAttack, this.GetTexture(7)),
        this.SetTextureShowUntilLoaded(i.IconDamageLarge, this.GetTexture(1)),
        this.GetText(9).ShowTextNew(e?.Name ?? ""));
  }
}
exports.RacingBetsBetFailTip = RacingBetsBetFailTip;
//# sourceMappingURL=RacingBetsBetFailTip.js.map
