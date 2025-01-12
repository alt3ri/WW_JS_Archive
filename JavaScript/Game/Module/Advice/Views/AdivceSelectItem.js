"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AdviceSelectItem = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  SPRITEONE =
    "/Game/Aki/UI/UIResources/UiAdvice/Atlas/SP_AdviceBtnOne.SP_AdviceBtnOne",
  SPRITETWO =
    "/Game/Aki/UI/UIResources/UiAdvice/Atlas/SP_AdviceBtnTwo.SP_AdviceBtnTwo",
  SPRITETHREE =
    "/Game/Aki/UI/UIResources/UiAdvice/Atlas/SP_AdviceBtnThree.SP_AdviceBtnThree",
  SPRITEEXPRESSION =
    "/Game/Aki/UI/UIResources/UiAdvice/Atlas/SP_AdviceBtnbiaoqing.SP_AdviceBtnbiaoqing",
  SPRITECHANGE =
    "/Game/Aki/UI/UIResources/UiAdvice/Atlas/SP_AdviceBtnHuan.SP_AdviceBtnHuan",
  SPRITEADD =
    "/Game/Aki/UI/UIResources/UiAdvice/Atlas/SP_AdviceBtnJia.SP_AdviceBtnJia",
  SPRITEDECREASE =
    "/Game/Aki/UI/UIResources/UiAdvice/Atlas/SP_AdviceBtnJian.SP_AdviceBtnJian";
class AdviceSelectItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.J9e = new Array()),
      (this.z9e = new Array()),
      this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIScrollViewWithScrollbarComponent],
      [1, UE.UIVerticalLayout],
      [2, UE.UIItem],
      [3, UE.UIItem],
    ];
  }
  OnStart() {
    this.GetItem(2).SetUIActive(!1), this.GetItem(3).SetUIActive(!1);
  }
  RefreshView(e) {
    this.Z9e();
    let i = 0,
      s = 0;
    e.forEach((e) => {
      var t;
      4 !== e.GetIndex()
        ? ((t = this.e7e(i))
            .GetRootItem()
            .SetUIParent(this.GetScrollViewWithScrollbar(0).ContentUIItem),
          t.RefreshView(e),
          i++)
        : (this.t7e(s)
            .GetRootItem()
            .SetUIParent(this.GetScrollViewWithScrollbar(0).ContentUIItem),
          s++);
    });
  }
  Z9e() {
    this.J9e.forEach((e) => {
      e.GetRootItem().SetUIActive(!1),
        e.GetRootItem().SetUIParent(this.RootItem);
    }),
      this.z9e.forEach((e) => {
        e.GetRootItem().SetUIActive(!1),
          e.GetRootItem().SetUIParent(this.RootItem);
      });
  }
  e7e(e) {
    return this.J9e.length > e
      ? (this.J9e[e].GetRootItem().SetUIActive(!0), this.J9e[e])
      : ((e = LguiUtil_1.LguiUtil.CopyItem(
          this.GetItem(2),
          void 0,
        )).SetUIActive(!0),
        (e = new AdviceSelectBtnContentItem(e)),
        this.J9e.push(e),
        e);
  }
  t7e(e) {
    return this.z9e.length > e
      ? (this.z9e[e].GetRootItem().SetUIActive(!0), this.z9e[e])
      : ((e = LguiUtil_1.LguiUtil.CopyItem(
          this.GetItem(3),
          void 0,
        )).SetUIActive(!0),
        (e = new AdviceSelectLineContentItem(e)),
        this.z9e.push(e),
        e);
  }
}
exports.AdviceSelectItem = AdviceSelectItem;
class AdviceSelectBtnContentItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.Pe = void 0),
      (this.i7e = () => {
        var e;
        (0 !== this.Pe.GetIndex() && 2 !== this.Pe.GetIndex()) ||
          ((e = 0 === this.Pe.GetIndex() ? 0 : 1),
          0 <
          (e = ModelManager_1.ModelManager.AdviceModel.CurrentWordMap.get(e))
            ? ((e =
                ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceWordText(
                  e,
                )),
              this.GetText(1).SetText(e),
              (this.GetText(1).useChangeColor = !0))
            : (LguiUtil_1.LguiUtil.SetLocalText(
                this.GetText(1),
                "AdviceFunc_1",
              ),
              (this.GetText(1).useChangeColor = !1)));
      }),
      (this.o7e = () => {
        var e;
        1 === this.Pe.GetIndex() &&
          (0 <
          (e = ModelManager_1.ModelManager.AdviceModel.CurrentConjunctionId)
            ? ((e =
                ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceConjunctionText(
                  e,
                )),
              this.GetText(1).SetText(e),
              (this.GetText(1).useChangeColor = !0))
            : (LguiUtil_1.LguiUtil.SetLocalText(
                this.GetText(1),
                "AdviceFunc_1",
              ),
              (this.GetText(1).useChangeColor = !1)));
      }),
      (this.r7e = () => {
        this.n7e(), this.s7e();
      }),
      (this.a7e = () => {
        (ModelManager_1.ModelManager.AdviceModel.CurrentExpressionId = 0),
          this.s7e(),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnSelectAdviceExpression,
          );
      }),
      (this.h7e = () => {
        (ModelManager_1.ModelManager.AdviceModel.PreSelectAdviceItemId =
          this.Pe.GetIndex()),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnClickAdviceSelectItem,
          );
      }),
      this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIText],
      [2, UE.UISprite],
      [3, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [0, this.h7e],
        [3, this.a7e],
      ]);
  }
  OnStart() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnSelectAdviceExpression,
      this.r7e,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSelectAdviceWord,
        this.i7e,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnChangeAdviceWord,
        this.o7e,
      );
  }
  n7e() {
    var e = ModelManager_1.ModelManager.AdviceModel.CurrentExpressionId;
    3 === this.Pe.GetIndex() &&
      (0 !== e
        ? ((e =
            ConfigManager_1.ConfigManager.ChatConfig.GetExpressionConfig(e)),
          this.GetText(1).ShowTextNew(e.Name),
          (this.GetText(1).useChangeColor = !0))
        : (LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), "AdviceFunc_2"),
          (this.GetText(1).useChangeColor = !1)));
  }
  RefreshView(e) {
    (this.Pe = e),
      this.l7e(),
      this._7e(),
      this.u7e(),
      this.i7e(),
      this.o7e(),
      this.s7e();
  }
  s7e() {
    var e;
    3 === this.Pe.GetIndex()
      ? ((e = ModelManager_1.ModelManager.AdviceModel.CurrentExpressionId),
        this.GetButton(3).RootUIComp.SetUIActive(0 !== e))
      : this.GetButton(3).RootUIComp.SetUIActive(!1);
  }
  _7e() {
    var e = this.Pe.GetIndex();
    0 !== e && 1 !== e && 2 !== e && 5 !== e && 3 === e && this.n7e();
  }
  l7e() {
    var e = this.Pe.GetIndex();
    let t = "";
    0 === e || 1 === e || 2 === e
      ? (t = "AdviceFunc_1")
      : 5 === e
        ? (t = "AdviceFunc_3")
        : 3 === e
          ? (t = "AdviceFunc_2")
          : 6 === e &&
            (t =
              0 === ModelManager_1.ModelManager.AdviceModel.CurrentLineModel
                ? "AdviceFunc_4"
                : "AdviceFunc_5"),
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), t);
  }
  u7e() {
    var e = this.Pe.GetIndex();
    let t = "";
    0 === e
      ? (t = SPRITEONE)
      : 1 === e
        ? (t = SPRITETWO)
        : 2 === e
          ? (t = SPRITETHREE)
          : 5 === e
            ? (t = SPRITECHANGE)
            : 3 === e
              ? (t = SPRITEEXPRESSION)
              : 6 === e &&
                (t =
                  0 === ModelManager_1.ModelManager.AdviceModel.CurrentLineModel
                    ? SPRITEADD
                    : SPRITEDECREASE),
      this.SetSpriteByPath(t, this.GetSprite(2), !1);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnSelectAdviceExpression,
      this.r7e,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnSelectAdviceWord,
        this.i7e,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnChangeAdviceWord,
        this.o7e,
      );
  }
}
class AdviceSelectLineContentItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(), this.CreateThenShowByActor(e.GetOwner());
  }
}
//# sourceMappingURL=AdivceSelectItem.js.map
