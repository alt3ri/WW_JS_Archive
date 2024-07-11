"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PersonalBirthView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
  CircleAttachView_1 = require("../../AutoAttach/CircleAttachView"),
  ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
  ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  PersonalController_1 = require("../Controller/PersonalController"),
  PersonalBirthAttachItem_1 = require("./PersonalBirthAttachItem"),
  SHOW_GAP = 2,
  MONTH_COUNT = 12;
class PersonalBirthView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.A5i = void 0),
      (this.P5i = void 0),
      (this.x5i = void 0),
      (this.w5i = void 0),
      (this.B5i = [1, 3, 5, 7, 8, 10, 12]),
      (this.b5i = 31),
      (this.q5i = 30),
      (this.G5i = 29),
      (this.N5i = !1),
      (this.O5i = !1),
      (this.mHt = () => {
        var t =
          ConfigManager_1.ConfigManager.TextConfig.GetTextById(
            "SetBirthSuccess",
          );
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(t),
          this.CloseMe();
      }),
      (this.OnLeftButtonClicked = () => {
        this.CloseMe();
      }),
      (this.OnRightButtonClicked = () => {
        var t;
        this.IsSetBirth()
          ? this.CloseMe()
          : ((t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
              109,
            )).FunctionMap.set(2, () => {
              PersonalController_1.PersonalController.SendBirthdayInitRequest(
                100 * this.x5i + this.w5i,
              );
            }),
            ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
              t,
            ));
      }),
      (this.OnMonthButtonClick = () => {
        this.IsSetBirth() ||
          (this.GetButton(10).OnPointDownCallBack.Unbind(),
          this.k5i(),
          (this.N5i = !0));
      }),
      (this.OnDayButtonClick = () => {
        this.IsSetBirth() ||
          (this.N5i &&
            (this.GetButton(11).OnPointDownCallBack.Unbind(),
            this.F5i(),
            (this.O5i = !0)));
      }),
      (this.CloseClick = () => {
        this.CloseMe();
      }),
      (this.V5i = (t, i, e) => {
        t = new PersonalBirthAttachItem_1.PersonalBirthAttachItem(t);
        return t.BindOnSelected(this.H5i), t;
      }),
      (this.H5i = (t) => {
        (this.x5i = t),
          this.GetText(6).SetText(String(t)),
          this.O5i &&
            (void 0 !== this.w5i &&
              (this.GetButton(5).SetSelfInteractive(!0),
              this.GetInteractionGroup(14).SetInteractable(!0),
              (this.w5i = 1),
              this.GetText(7).SetText(String(this.w5i))),
            this.F5i());
      }),
      (this.j5i = (t, i, e) => {
        t = new PersonalBirthAttachItem_1.PersonalBirthAttachItem(t);
        return t.BindOnSelected(this.W5i), t;
      }),
      (this.W5i = (t) => {
        (this.w5i = t),
          void 0 !== this.x5i &&
            (this.GetButton(5).SetSelfInteractive(!0),
            this.GetInteractionGroup(14).SetInteractable(!0)),
          this.GetText(7).SetText(String(t));
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
      [6, UE.UIText],
      [7, UE.UIText],
      [8, UE.UIText],
      [9, UE.UIText],
      [10, UE.UIButtonComponent],
      [11, UE.UIButtonComponent],
      [12, UE.UIText],
      [13, UE.UIExtendToggle],
      [14, UE.UIInteractionGroup],
    ]),
      (this.BtnBindInfo = [
        [4, this.OnLeftButtonClicked],
        [5, this.OnRightButtonClicked],
      ]);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnBirthChange,
      this.mHt,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnBirthChange,
      this.mHt,
    );
  }
  IsSetBirth() {
    var t = ModelManager_1.ModelManager.PersonalModel.GetBirthday();
    return !(!t || 0 === t);
  }
  OnStart() {
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(8), "AcquireCancel"),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(9),
        "PrefabTextItem_1541715829_Text",
      );
    var t = this.GetText(6),
      i = (t.SetUIActive(!0), this.GetText(7)),
      e =
        (i.SetUIActive(!0),
        this.IsSetBirth()
          ? ((r = ModelManager_1.ModelManager.PersonalModel.GetBirthday()),
            (e = Math.floor(r / 100)),
            (r = r % 100),
            t.SetText(String(e)),
            i.SetText(String(r)),
            this.GetButton(5).SetSelfInteractive(!0),
            this.GetInteractionGroup(14).SetInteractable(!0),
            LguiUtil_1.LguiUtil.SetLocalText(
              this.GetText(12),
              "BirthIsSetCanNotChange",
            ))
          : (t.SetText("--"),
            i.SetText("--"),
            this.GetButton(5).SetSelfInteractive(!1),
            this.GetInteractionGroup(14).SetInteractable(!1),
            LguiUtil_1.LguiUtil.SetLocalText(
              this.GetText(12),
              "SetBirthCanNotChange",
            )),
        this.GetButton(10).OnPointDownCallBack.Bind(this.OnMonthButtonClick),
        this.GetButton(11).OnPointDownCallBack.Bind(this.OnDayButtonClick),
        ModelManager_1.ModelManager.PersonalModel.GetBirthdayDisplay()),
      r = e ? 1 : 0;
    this.GetExtendToggle(13)?.SetToggleState(r);
  }
  k5i() {
    var t = this.GetItem(0),
      i = this.GetItem(1),
      e =
        ((this.A5i = new CircleAttachView_1.CircleAttachView(t.GetOwner())),
        this.A5i.CreateItems(i.GetOwner(), SHOW_GAP, this.V5i, 1),
        []);
    for (let t = 1; t <= MONTH_COUNT; t++) e.push(t);
    this.A5i.ReloadView(e.length, e), i.SetUIActive(!1);
  }
  F5i() {
    var t = this.GetItem(2),
      i = this.GetItem(3),
      e =
        (this.P5i ||
          ((this.P5i = new CircleAttachView_1.CircleAttachView(t.GetOwner())),
          this.P5i.CreateItems(i.GetOwner(), SHOW_GAP, this.j5i, 1)),
        this.K5i(this.x5i)),
      r = [];
    for (let t = 1; t <= e; t++) r.push(t);
    this.P5i.ReloadView(r.length, r), i.SetUIActive(!1);
  }
  K5i(i) {
    if (2 === i) return this.G5i;
    var e = this.B5i.length;
    for (let t = 0; t < e; t++) if (this.B5i[t] === i) return this.b5i;
    return this.q5i;
  }
  OnTick(t) {
    super.OnTick(t);
  }
  OnAfterShow() {}
  OnBeforeHide() {
    var t = 1 === this.GetExtendToggle(13)?.GetToggleState();
    t !== ModelManager_1.ModelManager.PersonalModel.GetBirthdayDisplay() &&
      PersonalController_1.PersonalController.SendBirthdayShowSetRequest(t);
  }
  OnBeforeDestroy() {
    this.A5i?.Clear(), this.P5i?.Clear();
  }
}
exports.PersonalBirthView = PersonalBirthView;
//# sourceMappingURL=PersonalBirthView.js.map
