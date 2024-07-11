"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PhantomBattleFettersView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  PhantomBattleFettersViewItem_1 = require("./PhantomBattleFettersViewItem");
class PhantomBattleFettersView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.kvt = void 0),
      (this.n6t = void 0),
      (this.dFe = 0),
      (this._Dt = 0),
      (this.z6i = () => {
        ModelManager_1.ModelManager.PhantomBattleModel.CurrentSelectFetterGroupId =
          this.kvt.GetCurrentSelectGroupId();
        var e = UiManager_1.UiManager.GetViewByName("VisionEquipmentView");
        e
          ? (UiManager_1.UiManager.CloseView(this.Info.Name),
            e.SetActive(!0),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.VisionFilterMonster,
            ))
          : UiManager_1.UiManager.CloseAndOpenView(
              this.Info.Name,
              "VisionEquipmentView",
              this.dFe,
            );
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    var e = this.OpenParam;
    void 0 === e
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error("Phantom", 59, "PhantomBattleFettersView无效输入")
      : ((this._Dt = e[0]),
        (this.dFe = e[1]),
        (this.kvt =
          new PhantomBattleFettersViewItem_1.PhantomBattleFettersViewItem()),
        this.kvt.SetSelectRoleId(this.dFe),
        (this.kvt.OnFastFilter = this.z6i),
        await this.kvt.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()),
        (this.n6t = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
        this.n6t.SetCloseCallBack(() => {
          this.CloseMe();
        }));
  }
  OnBeforeShow() {
    0 < this._Dt && this.kvt.SelectByFetterId(this._Dt);
  }
  async OnPlayingStartSequenceAsync() {
    await this.kvt?.PlayStartSequence();
  }
  async OnPlayingCloseSequenceAsync() {
    await this.kvt?.PlayHideSequence();
  }
}
exports.PhantomBattleFettersView = PhantomBattleFettersView;
//# sourceMappingURL=PhantomBattleFettersView.js.map
