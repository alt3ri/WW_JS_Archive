"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoguelikeSelectSpecialView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiManager_1 = require("../../../Ui/UiManager"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  RoguelikeDefine_1 = require("../Define/RoguelikeDefine"),
  RoguelikeController_1 = require("../RoguelikeController"),
  ElementPanel_1 = require("./ElementPanel"),
  RoguelikeSelectSpecialItem_1 = require("./RoguelikeSelectSpecialItem"),
  RogueSelectBaseView_1 = require("./RogueSelectBaseView"),
  TopPanel_1 = require("./TopPanel"),
  RogueSelectResult_1 = require("../Define/RogueSelectResult");
class RoguelikeSelectSpecialView extends RogueSelectBaseView_1.RogueSelectBaseView {
  constructor() {
    super(...arguments),
      (this.Aho = void 0),
      (this.llo = void 0),
      (this._lo = void 0),
      (this.ulo = void 0),
      (this.clo = void 0),
      (this.mlo = void 0),
      (this.OnDescModelChange = () => {
        this.flo();
      }),
      (this.Pho = () =>
        new RoguelikeSelectSpecialItem_1.RoguelikeSelectSpecialItem(this.xho)),
      (this.dlo = () => {
        this.ulo.UseTime >= this.ulo.MaxTime ||
          RoguelikeController_1.RoguelikeController.RoguelikeRefreshGainRequest(
            this.ulo.Index,
          );
      }),
      (this.sOt = () => {
        (ModelManager_1.ModelManager.RoguelikeModel.CurrentRogueGainEntry =
          this._lo),
          RoguelikeController_1.RoguelikeController.RogueChooseDataResultRequest(
            8,
          );
      }),
      (this.xho = (e, i) => {
        this.llo === e
          ? ((this.llo = void 0),
            e.SetSelect(!1),
            (this._lo = void 0),
            this.mlo.Refresh(void 0))
          : (void 0 !== this.llo && this.llo.SetSelect(!1),
            (this.llo = e).SetSelect(!0),
            (this._lo = i),
            this.mlo.Refresh(i)),
          this.Clo();
      }),
      (this.RoguelikeChooseDataResult = (e, i, t, s, o) => {
        t &&
          s === this.ulo?.Index &&
          UiManager_1.UiManager.CloseAndOpenView(
            this.Info.Name,
            "RoguelikeSpecialDetailView",
            [
              e,
              RoguelikeController_1.RoguelikeController.CreateCloseViewCallBack(
                o,
                () => {
                  var e = new RogueSelectResult_1.RogueSelectResult(
                    ModelManager_1.ModelManager.RoguelikeModel.RogueInfo?.PhantomEntry,
                    i,
                    void 0,
                  );
                  e.GetNewUnlockAffixEntry().size <= 0 ||
                    UiManager_1.UiManager.OpenView("CommonSelectResultView", e);
                },
              ),
            ],
          );
      }),
      (this.RoguelikeRefreshGain = (e) => {
        ModelManager_1.ModelManager.RoguelikeModel.CurrentRogueGainEntry =
          void 0;
        e =
          ModelManager_1.ModelManager.RoguelikeModel.GetRoguelikeChooseDataById(
            e,
          );
        (this.ulo = e), (this.llo = void 0), (this._lo = void 0), this.Hqe();
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
        [3, this.dlo],
        [4, this.sOt],
      ]);
  }
  async OnBeforeStartAsync() {
    (this.clo = new TopPanel_1.TopPanel()),
      (this.clo.CloseCallback = this.CloseMySelf),
      this.AddChild(this.clo),
      await this.clo.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()),
      (this.mlo = new ElementPanel_1.ElementPanel()),
      await this.mlo.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()),
      await this.clo.RefreshCurrency([RoguelikeDefine_1.INSIDE_CURRENCY_ID]);
  }
  OnStart() {
    (this.ulo = this.OpenParam),
      void 0 === this.ulo
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error("Roguelike", 59, "RoguelikeSelectSpecialView无效输入")
        : ((this.Aho = new GenericLayout_1.GenericLayout(
            this.GetHorizontalLayout(2),
            this.Pho,
          )),
          (ModelManager_1.ModelManager.RoguelikeModel.CurrentRogueGainEntry =
            void 0),
          (this.clo.CloseCallback = this.CloseMySelf),
          this.Hqe());
  }
  Hqe() {
    this.glo(), this.flo(), this.Clo();
  }
  flo() {
    var e = this.ulo.RogueGainEntryList;
    this.Aho.RefreshByData(e);
  }
  glo() {
    this.mlo.Refresh();
  }
  Clo() {
    var e,
      i = this.ulo.MaxTime,
      t = i - this.ulo.UseTime,
      s = this.GetText(7),
      s =
        (t <= 0
          ? LguiUtil_1.LguiUtil.SetLocalTextNew(
              s,
              "RoguelikeView_29_Text",
              t,
              i,
            )
          : LguiUtil_1.LguiUtil.SetLocalTextNew(
              s,
              "RoguelikeView_28_Text",
              t,
              i,
            ),
        this.GetButton(3).RootUIComp.SetUIActive(0 < i),
        this.GetButton(4).SetSelfInteractive(void 0 !== this._lo),
        this.ulo.CostCurrency);
    0 < s.length &&
      ((i = s[0]),
      (e = (s =
        ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
          i.s5n,
        ) >= i.m9n)
        ? "RogueSpecialRefreshCost"
        : "RogueSpecialRefreshCost_Not"),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), e, i.m9n),
      (e = ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueCurrencyConfig(
        i.s5n,
      )),
      this.SetTextureByPath(e.IconSmall, this.GetTexture(5)),
      this.GetButton(3).SetSelfInteractive(0 < t && s));
  }
}
exports.RoguelikeSelectSpecialView = RoguelikeSelectSpecialView;
//# sourceMappingURL=RoguelikeSelectSpecialView.js.map
