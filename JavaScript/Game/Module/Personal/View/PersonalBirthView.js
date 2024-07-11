"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PersonalBirthView = void 0);
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const CircleAttachView_1 = require("../../AutoAttach/CircleAttachView");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const LguiUtil_1 = require("../../Util/LguiUtil");
const PersonalController_1 = require("../Controller/PersonalController");
const PersonalBirthAttachItem_1 = require("./PersonalBirthAttachItem");
const SHOW_GAP = 2;
const MONTH_COUNT = 12;
class PersonalBirthView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.P4i = void 0),
      (this.x4i = void 0),
      (this.w4i = void 0),
      (this.B4i = void 0),
      (this.b4i = [1, 3, 5, 7, 8, 10, 12]),
      (this.q4i = 31),
      (this.G4i = 30),
      (this.N4i = 29),
      (this.O4i = !1),
      (this.k4i = !1),
      (this.m7t = () => {
        const i =
          ConfigManager_1.ConfigManager.TextConfig.GetTextById(
            "SetBirthSuccess",
          );
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(i),
          this.CloseMe();
      }),
      (this.OnLeftButtonClicked = () => {
        this.CloseMe();
      }),
      (this.OnRightButtonClicked = () => {
        let i;
        this.IsSetBirth()
          ? this.CloseMe()
          : ((i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
              109,
            )).FunctionMap.set(2, () => {
              PersonalController_1.PersonalController.SendBirthdayInitRequest(
                100 * this.w4i + this.B4i,
              );
            }),
            ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
              i,
            ));
      }),
      (this.OnMonthButtonClick = () => {
        this.IsSetBirth() ||
          (this.GetButton(10).OnPointDownCallBack.Unbind(),
          this.F4i(),
          (this.O4i = !0));
      }),
      (this.OnDayButtonClick = () => {
        this.IsSetBirth() ||
          (this.O4i &&
            (this.GetButton(11).OnPointDownCallBack.Unbind(),
            this.V4i(),
            (this.k4i = !0)));
      }),
      (this.CloseClick = () => {
        this.CloseMe();
      }),
      (this.H4i = (i, t, e) => {
        i = new PersonalBirthAttachItem_1.PersonalBirthAttachItem(i);
        return i.BindOnSelected(this.j4i), i;
      }),
      (this.j4i = (i) => {
        (this.w4i = i),
          this.GetText(6).SetText(String(i)),
          this.k4i &&
            (void 0 !== this.B4i &&
              (this.GetButton(5).SetSelfInteractive(!0),
              this.GetInteractionGroup(14).SetInteractable(!0),
              (this.B4i = 1),
              this.GetText(7).SetText(String(this.B4i))),
            this.V4i());
      }),
      (this.W4i = (i, t, e) => {
        i = new PersonalBirthAttachItem_1.PersonalBirthAttachItem(i);
        return i.BindOnSelected(this.K4i), i;
      }),
      (this.K4i = (i) => {
        (this.B4i = i),
          void 0 !== this.w4i &&
            (this.GetButton(5).SetSelfInteractive(!0),
            this.GetInteractionGroup(14).SetInteractable(!0)),
          this.GetText(7).SetText(String(i));
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
      this.m7t,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnBirthChange,
      this.m7t,
    );
  }
  IsSetBirth() {
    const i = ModelManager_1.ModelManager.PersonalModel.GetBirthday();
    return !(!i || i === 0);
  }
  OnStart() {
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(8), "AcquireCancel"),
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(9), "AcquireConfirm");
    const i = this.GetText(6);
    const t = (i.SetUIActive(!0), this.GetText(7));
    var e =
      (t.SetUIActive(!0),
      this.IsSetBirth()
        ? ((r = ModelManager_1.ModelManager.PersonalModel.GetBirthday()),
          (e = Math.floor(r / 100)),
          (r = r % 100),
          i.SetText(String(e)),
          t.SetText(String(r)),
          this.GetButton(5).SetSelfInteractive(!0),
          this.GetInteractionGroup(14).SetInteractable(!0),
          LguiUtil_1.LguiUtil.SetLocalText(
            this.GetText(12),
            "BirthIsSetCanNotChange",
          ))
        : (i.SetText("--"),
          t.SetText("--"),
          this.GetButton(5).SetSelfInteractive(!1),
          this.GetInteractionGroup(14).SetInteractable(!1),
          LguiUtil_1.LguiUtil.SetLocalText(
            this.GetText(12),
            "SetBirthCanNotChange",
          )),
      this.GetButton(10).OnPointDownCallBack.Bind(this.OnMonthButtonClick),
      this.GetButton(11).OnPointDownCallBack.Bind(this.OnDayButtonClick),
      ModelManager_1.ModelManager.PersonalModel.GetBirthdayDisplay());
    var r = e ? 1 : 0;
    this.GetExtendToggle(13)?.SetToggleState(r);
  }
  F4i() {
    const i = this.GetItem(0);
    const t = this.GetItem(1);
    const e =
      ((this.P4i = new CircleAttachView_1.CircleAttachView(i.GetOwner())),
      this.P4i.CreateItems(t.GetOwner(), SHOW_GAP, this.H4i, 1),
      []);
    for (let i = 1; i <= MONTH_COUNT; i++) e.push(i);
    this.P4i.ReloadView(e.length, e), t.SetUIActive(!1);
  }
  V4i() {
    const i = this.GetItem(2);
    const t = this.GetItem(3);
    const e =
      (this.x4i ||
        ((this.x4i = new CircleAttachView_1.CircleAttachView(i.GetOwner())),
        this.x4i.CreateItems(t.GetOwner(), SHOW_GAP, this.W4i, 1)),
      this.Q4i(this.w4i));
    const r = [];
    for (let i = 1; i <= e; i++) r.push(i);
    this.x4i.ReloadView(r.length, r), t.SetUIActive(!1);
  }
  Q4i(t) {
    if (t === 2) return this.N4i;
    const e = this.b4i.length;
    for (let i = 0; i < e; i++) if (this.b4i[i] === t) return this.q4i;
    return this.G4i;
  }
  OnTick(i) {
    super.OnTick(i);
  }
  OnAfterShow() {}
  OnBeforeHide() {
    const i = this.GetExtendToggle(13)?.GetToggleState() === 1;
    i !== ModelManager_1.ModelManager.PersonalModel.GetBirthdayDisplay() &&
      PersonalController_1.PersonalController.SendBirthdayShowSetRequest(i);
  }
  OnBeforeDestroy() {
    this.P4i?.Clear(), this.x4i?.Clear();
  }
}
exports.PersonalBirthView = PersonalBirthView;
// # sourceMappingURL=PersonalBirthView.js.map
