"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueIllustratedView = void 0);
const UE = require("ue"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem"),
  UiManager_1 = require("../../../Ui/UiManager"),
  RogueOutButtonItem_1 = require("./RogueOutButtonItem");
class RogueIllustratedView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.lqe = void 0),
      (this.B5c = void 0),
      (this.k5c = void 0),
      (this.O5c = void 0),
      (this._5e = () => {
        this.CloseMe();
      }),
      (this.q5c = () => {
        UiManager_1.UiManager.OpenView("RogueTokenIllustratedView");
      }),
      (this.G5c = () => {
        UiManager_1.UiManager.OpenView("RogueEventIllustratedView", !0);
      }),
      (this.F5c = () => {
        UiManager_1.UiManager.OpenView("RogueEventIllustratedView", !1);
      }),
      (this.N5c = () => {}),
      (this.QOe = () => {}),
      (this.V5c = () => {
        this.UnbindRedDot(), this.BindRedDot(), this.RefreshBtn();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIButtonComponent],
      [5, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [4, this.N5c],
        [5, this.QOe],
      ]);
  }
  async OnBeforeStartAsync() {
    (this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
      this.lqe.SetCloseCallBack(this._5e),
      this.lqe.SetHelpBtnActive(!1);
    var t = [];
    (this.B5c = new RogueOutButtonItem_1.RogueButtonItemCollection()),
      this.B5c.SetOnClickCall(this.q5c),
      t.push(this.B5c.CreateThenShowByActorAsync(this.GetItem(1).GetOwner())),
      (this.k5c = new RogueOutButtonItem_1.RogueButtonItemCollection()),
      this.k5c.SetOnClickCall(this.G5c),
      t.push(this.k5c.CreateThenShowByActorAsync(this.GetItem(2).GetOwner())),
      (this.O5c = new RogueOutButtonItem_1.RogueButtonItemCollection()),
      this.O5c.SetOnClickCall(this.F5c),
      t.push(this.O5c.CreateThenShowByActorAsync(this.GetItem(3).GetOwner())),
      await Promise.all(t);
  }
  OnStart() {
    this.GetButton(4).RootUIComp.SetUIActive(!1),
      this.GetButton(5).RootUIComp.SetUIActive(!1);
  }
  OnBeforeShow() {
    this.RefreshBtn(), this.BindRedDot();
  }
  OnBeforeHide() {
    this.UnbindRedDot();
  }
  OnBeforeDestroy() {
    (this.lqe = void 0),
      (this.B5c = void 0),
      (this.k5c = void 0),
      (this.O5c = void 0);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.PermanentRogueRewardUpdate,
      this.V5c,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.PermanentRogueRewardUpdate,
      this.V5c,
    );
  }
  RefreshBtn() {
    var t =
        ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetTypeIllustratedCountInfo(),
      e = ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(
        "Rogue_Collection_Progress",
        "Rogue_Collection_Progress",
      ),
      i = t.get(0),
      s = StringUtils_1.StringUtils.Format(
        e ?? "",
        i ? i[0].toString() : "0",
        i ? i[1].toString() : "0",
      ),
      s =
        (this.B5c?.SetNum(s),
        this.B5c?.SetButtonDone(!i || i[0] === i[1]),
        t.get(1)),
      i = StringUtils_1.StringUtils.Format(
        e ?? "",
        s ? s[0].toString() : "0",
        s ? s[1].toString() : "0",
      ),
      i =
        (this.k5c?.SetNum(i),
        this.k5c?.SetButtonDone(!s || s[0] === s[1]),
        t.get(2)),
      s = StringUtils_1.StringUtils.Format(
        e ?? "",
        i ? i[0].toString() : "0",
        i ? i[1].toString() : "0",
      );
    this.O5c?.SetNum(s), this.O5c?.SetButtonDone(!i || i[0] === i[1]);
  }
  BindRedDot() {
    this.B5c?.BindRedDot("RogueResIllustratedTokenTab", 0),
      this.k5c?.BindRedDot("RogueResIllustratedNormalTab", 0),
      this.O5c?.BindRedDot("RogueResIllustratedMapTab", 0);
  }
  UnbindRedDot() {
    this.B5c.UnBindRedDot(), this.k5c.UnBindRedDot(), this.O5c.UnBindRedDot();
  }
}
exports.RogueIllustratedView = RogueIllustratedView;
//# sourceMappingURL=RogueIllustratedMainVIew.js.map
