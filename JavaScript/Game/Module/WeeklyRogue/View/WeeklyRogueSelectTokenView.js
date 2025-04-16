"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WeeklyRogueSelectTokenView = void 0);
const UE = require("ue"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem"),
  UiManager_1 = require("../../../Ui/UiManager"),
  RoguelikeDefine_1 = require("../../Roguelike/Define/RoguelikeDefine"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  WeeklyRogueTokenItem_1 = require("../Components/WeeklyRogueTokenItem"),
  WeeklyRogueController_1 = require("../WeeklyRogueController");
class WeeklyRogueSelectTokenView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.lV_ = void 0),
      (this.lqe = void 0),
      (this.tV_ = () => {
        var e = new WeeklyRogueTokenItem_1.WeeklyRogueTokenItem();
        return (e.OnSelectedChange = this.ELt), e;
      }),
      (this.ELt = (e) => {
        void 0 === e
          ? (this.lV_?.DeselectCurrentGridProxy(),
            this.GetButton(1).SetSelfInteractive(!1))
          : (this.lV_?.SelectGridProxy(e),
            this.GetButton(1).SetSelfInteractive(!0));
      }),
      (this.ilo = () => {
        WeeklyRogueController_1.WeeklyRogueController.Instance?.SelectOptionRequest(),
          this.CloseMe();
      }),
      (this.tlo = () => {
        this.CloseMe();
      }),
      (this.Mlo = () => {
        UiManager_1.UiManager.OpenView("WeeklyRogueInfo");
      }),
      (this._V_ = () => {
        ModelManager_1.ModelManager.WeeklyRogueModel.ChangeDescMode();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIHorizontalLayout],
      [1, UE.UIButtonComponent],
      [2, UE.UIButtonComponent],
      [3, UE.UIButtonComponent],
      [4, UE.UIExtendToggle],
      [5, UE.UIText],
      [6, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [1, this.ilo],
        [2, this.tlo],
        [3, this.Mlo],
        [4, this._V_],
      ]);
  }
  async OnBeforeStartAsync() {
    this.lV_ = new GenericLayout_1.GenericLayout(
      this.GetHorizontalLayout(0),
      this.tV_,
    );
    var e = this.OpenParam,
      e =
        ((this.lqe = new PopupCaptionItem_1.PopupCaptionItem()),
        await Promise.all([
          this.lqe.CreateThenShowByActorAsync(this.GetItem(6).GetOwner()),
          this.lV_.RefreshByDataAsync(e.UN_),
        ]),
        await this.lqe.SetCurrencyItemList([
          RoguelikeDefine_1.INSIDE_CURRENCY_ID,
        ]),
        this.GetButton(1).SetSelfInteractive(!1),
        0 === ModelManager_1.ModelManager.WeeklyRogueModel.DescMode ? 1 : 0);
    this.GetExtendToggle(4).SetToggleState(e);
  }
}
exports.WeeklyRogueSelectTokenView = WeeklyRogueSelectTokenView;
//# sourceMappingURL=WeeklyRogueSelectTokenView.js.map
