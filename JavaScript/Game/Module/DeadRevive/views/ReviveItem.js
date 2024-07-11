"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ReviveItem = void 0);
const UE = require("ue"),
  CommonDefine_1 = require("../../../../Core/Define/CommonDefine"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  UiManager_1 = require("../../../Ui/UiManager");
class ReviveItem extends UiPanelBase_1.UiPanelBase {
  constructor(i) {
    super(),
      (this.gIt = void 0),
      (this.wIt = (i) => {
        ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
          i,
        );
      }),
      (this.R4e = void 0),
      (this.j3 = void 0),
      (this.q2t = -1),
      (this.Rgt = 1),
      (this.ToggleClick = (i) => {
        this.wIt && 1 === i && this.wIt(this.gIt);
      }),
      (this.TDe = () => {
        this.q2t <= 0
          ? (void 0 !== this.j3 && TimerSystem_1.TimerSystem.Remove(this.j3),
            (this.j3 = void 0),
            UiManager_1.UiManager.IsViewShow("UseReviveItemView") &&
              this.GetItem(14).SetUIActive(!1))
          : (this.GetText(15).SetText(
              TimeUtil_1.TimeUtil.GetCoolDown(this.q2t),
            ),
            this.GetSprite(16).SetFillAmount(this.q2t / this.Rgt),
            (this.q2t -=
              TimerSystem_1.MIN_TIME /
              CommonDefine_1.MILLIONSECOND_PER_SECOND));
      }),
      this.CreateThenShowByActor(i.GetOwner());
  }
  ShowReviveItem(i, e) {
    (this.gIt = i),
      this.SetItemIcon(this.GetTexture(1), this.gIt),
      this.GetText(4).SetText("x" + e),
      this.SetItemQualityIcon(this.GetSprite(2), this.gIt),
      this.G2t();
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [1, UE.UITexture],
      [2, UE.UISprite],
      [4, UE.UIText],
      [9, UE.UIExtendToggle],
      [14, UE.UIItem],
      [15, UE.UIText],
      [16, UE.UISprite],
    ]),
      (this.BtnBindInfo = [[9, this.ToggleClick]]);
  }
  OnStart() {
    this.R4e = this.GetExtendToggle(9);
  }
  OnBeforeDestroy() {
    (this.gIt = void 0),
      (this.R4e = void 0) !== this.j3 &&
        TimerSystem_1.TimerSystem.Remove(this.j3),
      (this.j3 = void 0),
      (this.q2t = -1),
      (this.Rgt = 1);
  }
  G2t() {
    var i = ModelManager_1.ModelManager.BuffItemModel.GetBuffItemRemainCdTime(
      this.gIt,
    );
    i <= 0 ||
      ((this.q2t = i),
      (this.Rgt =
        ModelManager_1.ModelManager.BuffItemModel.GetBuffItemTotalCdTime(
          this.gIt,
        )),
      this.GetItem(14).SetUIActive(!0),
      this.GetText(15).SetText(TimeUtil_1.TimeUtil.GetCoolDown(this.q2t)),
      this.GetSprite(16).SetFillAmount(this.q2t / this.Rgt),
      void 0 !== this.j3 && TimerSystem_1.TimerSystem.Remove(this.j3),
      (this.j3 = TimerSystem_1.TimerSystem.Forever(
        this.TDe,
        TimerSystem_1.MIN_TIME,
      )));
  }
  SetToggleState(i, e = !0) {
    this.R4e.SetToggleState(i ? 1 : 0, e);
  }
  BindClickCallback(i) {
    this.wIt = i;
  }
}
exports.ReviveItem = ReviveItem;
//# sourceMappingURL=ReviveItem.js.map
