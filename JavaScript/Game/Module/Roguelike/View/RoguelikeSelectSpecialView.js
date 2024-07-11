"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoguelikeSelectSpecialView = void 0);
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const RoguelikeDefine_1 = require("../Define/RoguelikeDefine");
const RoguelikeController_1 = require("../RoguelikeController");
const ElementPanel_1 = require("./ElementPanel");
const RoguelikeSelectSpecialItem_1 = require("./RoguelikeSelectSpecialItem");
const RogueSelectBaseView_1 = require("./RogueSelectBaseView");
const TopPanel_1 = require("./TopPanel");
class RoguelikeSelectSpecialView extends RogueSelectBaseView_1.RogueSelectBaseView {
  constructor() {
    super(...arguments),
      (this.Bao = void 0),
      (this.cho = void 0),
      (this.mho = void 0),
      (this.dho = void 0),
      (this.Cho = void 0),
      (this.gho = void 0),
      (this.OnDescModelChange = () => {
        this.Mho();
      }),
      (this.bao = () =>
        new RoguelikeSelectSpecialItem_1.RoguelikeSelectSpecialItem(this.qao)),
      (this.fho = () => {
        this.dho.UseTime >= this.dho.MaxTime ||
          RoguelikeController_1.RoguelikeController.RoguelikeRefreshGainRequest(
            this.dho.Index,
          );
      }),
      (this.nNt = () => {
        (ModelManager_1.ModelManager.RoguelikeModel.CurrentRogueGainEntry =
          this.mho),
          RoguelikeController_1.RoguelikeController.RogueChooseDataResultRequest(
            8,
          );
      }),
      (this.qao = (e, i) => {
        this.cho === e
          ? ((this.cho = void 0),
            e.SetSelect(!1),
            (this.mho = void 0),
            this.gho.Refresh(void 0))
          : (void 0 !== this.cho && this.cho.SetSelect(!1),
            (this.cho = e).SetSelect(!0),
            (this.mho = i),
            this.gho.Refresh(i)),
          this.pho();
      }),
      (this.RoguelikeChooseDataResult = (e, i, t, s) => {
        t &&
          s === this.dho?.Index &&
          UiManager_1.UiManager.CloseAndOpenView(
            this.Info.Name,
            "RoguelikeSpecialDetailView",
            e,
          );
      }),
      (this.RoguelikeRefreshGain = (e) => {
        ModelManager_1.ModelManager.RoguelikeModel.CurrentRogueGainEntry =
          void 0;
        e =
          ModelManager_1.ModelManager.RoguelikeModel.GetRoguelikeChooseDataById(
            e,
          );
        (this.dho = e), (this.cho = void 0), (this.mho = void 0), this.Hqe();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIHorizontalLayout],
      [3, UE.UIButtonComponent],
      [4, UE.UIButtonComponent],
      [5, UE.UITexture],
      [6, UE.UIText],
      [7, UE.UIText],
    ]),
      (this.BtnBindInfo = [
        [3, this.fho],
        [4, this.nNt],
      ]);
  }
  async OnBeforeStartAsync() {
    (this.Cho = new TopPanel_1.TopPanel()),
      (this.Cho.CloseCallback = this.CloseMySelf),
      this.AddChild(this.Cho),
      await this.Cho.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()),
      (this.gho = new ElementPanel_1.ElementPanel()),
      await this.gho.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()),
      await this.Cho.RefreshCurrency([RoguelikeDefine_1.INSIDE_CURRENCY_ID]);
  }
  OnStart() {
    (this.dho = this.OpenParam),
      void 0 === this.dho
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error("Roguelike", 59, "RoguelikeSelectSpecialView无效输入")
        : ((this.Bao = new GenericLayout_1.GenericLayout(
            this.GetHorizontalLayout(2),
            this.bao,
          )),
          (ModelManager_1.ModelManager.RoguelikeModel.CurrentRogueGainEntry =
            void 0),
          (this.Cho.CloseCallback = this.CloseMySelf),
          this.Hqe());
  }
  Hqe() {
    this.vho(), this.Mho(), this.pho();
  }
  Mho() {
    const e = this.dho.RogueGainEntryList;
    this.Bao.RefreshByData(e);
  }
  vho() {
    this.gho.Refresh();
  }
  pho() {
    let e;
    let i = this.dho.MaxTime;
    const t = i - this.dho.UseTime;
    var s = this.GetText(7);
    var s =
      (t <= 0
        ? LguiUtil_1.LguiUtil.SetLocalTextNew(s, "RoguelikeView_29_Text", t, i)
        : LguiUtil_1.LguiUtil.SetLocalTextNew(s, "RoguelikeView_28_Text", t, i),
      this.GetButton(3).RootUIComp.SetUIActive(i > 0),
      this.GetButton(4).SetSelfInteractive(void 0 !== this.mho),
      this.dho.CostCurrency);
    s.length > 0 &&
      ((i = s[0]),
      (e = (s =
        ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
          i.Ekn,
        ) >= i.I5n)
        ? "RogueSpecialRefreshCost"
        : "RogueSpecialRefreshCost_Not"),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), e, i.I5n),
      (e = ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueCurrencyConfig(
        i.Ekn,
      )),
      this.SetTextureByPath(e.IconSmall, this.GetTexture(5)),
      this.GetButton(3).SetSelfInteractive(t > 0 && s));
  }
}
exports.RoguelikeSelectSpecialView = RoguelikeSelectSpecialView;
// # sourceMappingURL=RoguelikeSelectSpecialView.js.map
