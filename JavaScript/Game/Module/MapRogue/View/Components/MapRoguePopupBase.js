"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapRoguePopupBase = void 0);
const UE = require("ue"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  MapRoguePanelFetter_1 = require("./MapRoguePanelFetter"),
  MapRoguePanelLv_1 = require("./MapRoguePanelLv"),
  LV_CHANGE_DELAY = 500;
class MapRoguePopupBase extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.LevelSequencePlayer = void 0),
      (this.CaptionItem = void 0),
      (this.PanelLv = void 0),
      (this.PanelFetter = void 0),
      (this.OnMaskClick = void 0),
      (this.B6e = () => {
        ControllerHolder_1.ControllerHolder.MapRogueController.OpenExploreEnd();
      }),
      (this.XTt = () => {
        this.OnMaskClick?.();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[4, this.XTt]]);
  }
  async OnBeforeStartAsync() {
    var e = [];
    (this.CaptionItem = new PopupCaptionItem_1.PopupCaptionItem()),
      e.push(
        this.CaptionItem.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()),
      ),
      this.CaptionItem.SetCloseCallBack(this.B6e),
      e.push(
        this.CaptionItem.SetCurrencyItemList([
          ModelManager_1.ModelManager.MapRogueModel.GetRogueCurrencyItemId(),
        ]),
      ),
      (this.PanelLv = new MapRoguePanelLv_1.MapRoguePanelLv()),
      e.push(
        this.PanelLv.CreateThenShowByActorAsync(this.GetItem(2).GetOwner()),
      ),
      (this.PanelFetter = new MapRoguePanelFetter_1.MapRoguePanelFetter()),
      e.push(
        this.PanelFetter.CreateThenShowByActorAsync(this.GetItem(3).GetOwner()),
      ),
      await Promise.all(e),
      (this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
        this.RootItem,
      )),
      this.SetMaskButtonVisible(!1);
  }
  OnBeforeShow() {
    var e = ModelManager_1.ModelManager.MapRogueModel.GameInfo;
    if (e) {
      var t = e.TeamLvAnim;
      this.PanelLv.SetLv(t, !1);
      const i = e.TeamLv;
      t !== i &&
        TimerSystem_1.TimerSystem.Delay(() => {
          this.PanelLv.SetLv(i, !0);
        }, LV_CHANGE_DELAY);
    }
  }
  SetMaskButtonVisible(e) {
    this.GetButton(4).RootUIComp.SetUIActive(e);
  }
  SetPanelFetterVisible(e) {
    this.PanelFetter?.SetActive(e);
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (0 !== e.length)
      return this.PanelFetter?.GetGuideUiItemAndUiItemForShowEx(e);
  }
}
exports.MapRoguePopupBase = MapRoguePopupBase;
//# sourceMappingURL=MapRoguePopupBase.js.map
