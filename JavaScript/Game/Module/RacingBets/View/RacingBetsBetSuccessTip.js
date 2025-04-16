"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RacingBetsBetSuccessTip = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  DangoManager_1 = require("../../Dango/DangoLogic/DangoManager"),
  RacingBetsController_1 = require("../RacingBetsController"),
  RacingBetsCostItem_1 = require("./Item/RacingBetsCostItem");
class RacingBetsBetSuccessTip extends UiViewBase_1.UiViewBase {
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
      [7, UE.UIText],
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
      s,
      t,
      a = this.OpenParam;
    void 0 === a
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "RacingBets",
          58,
          "RacingBetsSuccessTip OnBeforeShow matchResult is undefined",
        )
      : ((e = (s =
          ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsSeasonData()).GetLegMatchData(
          a.mJ_,
        )),
        (this.x_1 = a.mJ_),
        this.GetArtText(0).SetText(a.A6c.toString()),
        (i = DangoManager_1.DangoManager.GetDangoData(a.L6c)),
        (s = s.GetCurrencyItemId()),
        (t =
          ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(s)),
        this.SetTextureShowUntilLoaded(t.Icon, this.GetTexture(3)),
        this.GetText(2).SetText(a.R6c + " x " + a.YZ_ / 100),
        this.I01.RefreshUi(s, a.DS_),
        this.SetTextureShowUntilLoaded(i.IconAttackLarge, this.GetTexture(1)),
        this.GetText(7).ShowTextNew(e.Name));
  }
}
exports.RacingBetsBetSuccessTip = RacingBetsBetSuccessTip;
//# sourceMappingURL=RacingBetsBetSuccessTip.js.map
