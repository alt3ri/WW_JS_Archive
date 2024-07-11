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
      (this.ETt = void 0),
      (this.NTt = (i) => {
        ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
          i,
        );
      }),
      (this.H5e = void 0),
      (this.j3 = void 0),
      (this.GFt = -1),
      (this.k0t = 1),
      (this.ToggleClick = (i) => {
        this.NTt && 1 === i && this.NTt(this.ETt);
      }),
      (this.TDe = () => {
        this.GFt <= 0
          ? (void 0 !== this.j3 && TimerSystem_1.TimerSystem.Remove(this.j3),
            (this.j3 = void 0),
            UiManager_1.UiManager.IsViewShow("UseReviveItemView") &&
              this.GetItem(14).SetUIActive(!1))
          : (this.GetText(15).SetText(
              TimeUtil_1.TimeUtil.GetCoolDown(this.GFt),
            ),
            this.GetSprite(16).SetFillAmount(this.GFt / this.k0t),
            (this.GFt -=
              TimerSystem_1.MIN_TIME /
              CommonDefine_1.MILLIONSECOND_PER_SECOND));
      }),
      this.CreateThenShowByActor(i.GetOwner());
  }
  ShowReviveItem(i, e) {
    (this.ETt = i),
      this.SetItemIcon(this.GetTexture(1), this.ETt),
      this.GetText(4).SetText("x" + e),
      this.SetItemQualityIcon(this.GetSprite(2), this.ETt),
      this.NFt();
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
    this.H5e = this.GetExtendToggle(9);
  }
  OnBeforeDestroy() {
    (this.ETt = void 0),
      (this.H5e = void 0) !== this.j3 &&
        TimerSystem_1.TimerSystem.Remove(this.j3),
      (this.j3 = void 0),
      (this.GFt = -1),
      (this.k0t = 1);
  }
  NFt() {
    var i = ModelManager_1.ModelManager.BuffItemModel.GetBuffItemRemainCdTime(
      this.ETt,
    );
    i <= 0 ||
      ((this.GFt = i),
      (this.k0t =
        ModelManager_1.ModelManager.BuffItemModel.GetBuffItemTotalCdTime(
          this.ETt,
        )),
      this.GetItem(14).SetUIActive(!0),
      this.GetText(15).SetText(TimeUtil_1.TimeUtil.GetCoolDown(this.GFt)),
      this.GetSprite(16).SetFillAmount(this.GFt / this.k0t),
      void 0 !== this.j3 && TimerSystem_1.TimerSystem.Remove(this.j3),
      (this.j3 = TimerSystem_1.TimerSystem.Forever(
        this.TDe,
        TimerSystem_1.MIN_TIME,
      )));
  }
  SetToggleState(i, e = !0) {
    this.H5e.SetToggleState(i ? 1 : 0, e);
  }
  BindClickCallback(i) {
    this.NTt = i;
  }
}
exports.ReviveItem = ReviveItem;
//# sourceMappingURL=ReviveItem.js.map
