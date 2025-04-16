"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SundialControlView = void 0);
const UE = require("ue"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  LguiUtil_1 = require("../../Module/Util/LguiUtil"),
  UiViewBase_1 = require("../../Ui/Base/UiViewBase"),
  TIPS_TEXT = "PrefabTextItem_2335089801_Text",
  RESET_TEXT = "PrefabTextItem_2335089802_Text",
  SWITCH_TEXT = "PrefabTextItem_2335089799_Text",
  ROTATE_TEXT = "PrefabTextItem_2335089800_Text",
  ringOneTips = [
    "PrefabTextItem_2335089803_Text",
    "PrefabTextItem_2335089814_Text",
    "PrefabTextItem_2335089813_Text",
    "PrefabTextItem_2335089812_Text",
    "PrefabTextItem_2335089811_Text",
    "PrefabTextItem_2335089810_Text",
    "PrefabTextItem_2335089809_Text",
    "PrefabTextItem_2335089808_Text",
    "PrefabTextItem_2335089807_Text",
    "PrefabTextItem_2335089806_Text",
    "PrefabTextItem_2335089805_Text",
    "PrefabTextItem_2335089804_Text",
  ],
  ringTwoTips = [
    "PrefabTextItem_2335089818_Text",
    "PrefabTextItem_2335089817_Text",
    "PrefabTextItem_2335089815_Text",
    "PrefabTextItem_2335089816_Text",
  ];
class SundialControlView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.Fxe = void 0),
      (this.Vxe = void 0),
      (this.Hxe = void 0),
      (this.jxe = void 0),
      (this.DPe = () => {
        this.Wxe();
      }),
      (this.Kxe = () => {
        ControllerHolder_1.ControllerHolder.SundialControlController.SwitchCurrentRing();
      }),
      (this.Qxe = () => {
        this.Xxe(!1),
          ControllerHolder_1.ControllerHolder.SundialControlController.StartRotate(
            () => {
              this.Xxe(!0);
            },
          );
      }),
      (this.LPe = () => {
        this.CloseMe();
      }),
      (this.$xe = (e, t) => {
        (e = 0 === e ? ringOneTips : ringTwoTips),
          (t = e[t % e.length]),
          (e = this.GetText(4));
        LguiUtil_1.LguiUtil.SetLocalTextNew(e, t);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIButtonComponent],
      [2, UE.UIButtonComponent],
      [3, UE.UIButtonComponent],
      [4, UE.UIText],
      [5, UE.UIText],
      [6, UE.UIText],
      [7, UE.UIText],
    ]),
      (this.BtnBindInfo = [
        [0, this.DPe],
        [1, this.Kxe],
        [3, this.LPe],
        [2, this.Qxe],
      ]);
  }
  OnStart() {
    (this.Fxe = this.GetButton(0)),
      (this.Vxe = this.GetButton(1)),
      (this.Hxe = this.GetButton(2)),
      (this.jxe = this.GetButton(3)),
      this.jxe.RootUIComp.SetUIActive(!1),
      this.Fxe.RootUIComp.SetUIActive(!1);
    var e = this.GetText(4),
      e = (LguiUtil_1.LguiUtil.SetLocalTextNew(e, TIPS_TEXT), this.GetText(5)),
      e = (LguiUtil_1.LguiUtil.SetLocalTextNew(e, RESET_TEXT), this.GetText(6)),
      e =
        (LguiUtil_1.LguiUtil.SetLocalTextNew(e, SWITCH_TEXT), this.GetText(7));
    LguiUtil_1.LguiUtil.SetLocalTextNew(e, ROTATE_TEXT),
      ControllerHolder_1.ControllerHolder.SundialControlController.SetOnFinishCallback(
        () => {
          this.Fxe.RootUIComp.SetUIActive(!1),
            this.Vxe.RootUIComp.SetUIActive(!1),
            this.Hxe.RootUIComp.SetUIActive(!1),
            this.jxe.RootUIComp.SetUIActive(!1);
        },
      ),
      this.Yxe(),
      TimerSystem_1.TimerSystem.Delay(() => {
        ControllerHolder_1.ControllerHolder.SundialControlController.GenerateModel(
          () => {
            this.Jxe();
          },
        );
      }, 100);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnNeedUpdateSundialTips,
      this.$xe,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnNeedUpdateSundialTips,
      this.$xe,
    );
  }
  async Yxe() {
    this.Xxe(!1),
      await this.HideAsync(),
      await ControllerHolder_1.ControllerHolder.LevelLoadingController.WaitOpenLoading(
        5,
        3,
      );
  }
  async Jxe() {
    await ControllerHolder_1.ControllerHolder.LevelLoadingController.WaitCloseLoading(
      5,
    ),
      await this.ShowAsync(),
      this.Xxe(!0),
      ControllerHolder_1.ControllerHolder.SundialControlController.UpdateViewTips();
  }
  OnBeforeDestroy() {
    ControllerHolder_1.ControllerHolder.SundialControlController.SetOnFinishCallback(
      void 0,
    ),
      ControllerHolder_1.ControllerHolder.SundialControlController.DestroyModel();
  }
  async Wxe() {
    this.Xxe(!1),
      await this.HideAsync(),
      await ControllerHolder_1.ControllerHolder.LevelLoadingController.WaitOpenLoading(
        5,
        3,
      ),
      ControllerHolder_1.ControllerHolder.SundialControlController.ResetAll(),
      await ControllerHolder_1.ControllerHolder.LevelLoadingController.WaitCloseLoading(
        5,
      ),
      await this.ShowAsync(),
      ControllerHolder_1.ControllerHolder.SundialControlController.UpdateViewTips(),
      this.Xxe(!0);
  }
  Xxe(e) {
    this.Fxe.SetSelfInteractive(e),
      this.Vxe.SetSelfInteractive(e),
      this.Hxe.SetSelfInteractive(e),
      this.jxe.SetSelfInteractive(e);
  }
}
exports.SundialControlView = SundialControlView;
//# sourceMappingURL=SundialControlView.js.map
