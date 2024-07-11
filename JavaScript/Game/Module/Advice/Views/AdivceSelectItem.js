"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AdviceSelectItem = void 0);
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const SPRITEONE =
  "/Game/Aki/UI/UIResources/UiAdvice/Atlas/SP_AdviceBtnOne.SP_AdviceBtnOne";
const SPRITETWO =
  "/Game/Aki/UI/UIResources/UiAdvice/Atlas/SP_AdviceBtnTwo.SP_AdviceBtnTwo";
const SPRITETHREE =
  "/Game/Aki/UI/UIResources/UiAdvice/Atlas/SP_AdviceBtnThree.SP_AdviceBtnThree";
const SPRITEEXPRESSION =
  "/Game/Aki/UI/UIResources/UiAdvice/Atlas/SP_AdviceBtnbiaoqing.SP_AdviceBtnbiaoqing";
const SPRITECHANGE =
  "/Game/Aki/UI/UIResources/UiAdvice/Atlas/SP_AdviceBtnHuan.SP_AdviceBtnHuan";
const SPRITEADD =
  "/Game/Aki/UI/UIResources/UiAdvice/Atlas/SP_AdviceBtnJia.SP_AdviceBtnJia";
const SPRITEDECREASE =
  "/Game/Aki/UI/UIResources/UiAdvice/Atlas/SP_AdviceBtnJian.SP_AdviceBtnJian";
class AdviceSelectItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.G8e = new Array()),
      (this.N8e = new Array()),
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
    this.O8e();
    let i = 0;
    let s = 0;
    e.forEach((e) => {
      let t;
      e.GetIndex() !== 4
        ? ((t = this.k8e(i))
            .GetRootItem()
            .SetUIParent(this.GetScrollViewWithScrollbar(0).ContentUIItem),
          t.RefreshView(e),
          i++)
        : (this.F8e(s)
            .GetRootItem()
            .SetUIParent(this.GetScrollViewWithScrollbar(0).ContentUIItem),
          s++);
    });
  }
  O8e() {
    this.G8e.forEach((e) => {
      e.GetRootItem().SetUIActive(!1),
        e.GetRootItem().SetUIParent(this.RootItem);
    }),
      this.N8e.forEach((e) => {
        e.GetRootItem().SetUIActive(!1),
          e.GetRootItem().SetUIParent(this.RootItem);
      });
  }
  k8e(e) {
    return this.G8e.length > e
      ? (this.G8e[e].GetRootItem().SetUIActive(!0), this.G8e[e])
      : ((e = LguiUtil_1.LguiUtil.CopyItem(
          this.GetItem(2),
          void 0,
        )).SetUIActive(!0),
        (e = new AdviceSelectBtnContentItem(e)),
        this.G8e.push(e),
        e);
  }
  F8e(e) {
    return this.N8e.length > e
      ? (this.N8e[e].GetRootItem().SetUIActive(!0), this.N8e[e])
      : ((e = LguiUtil_1.LguiUtil.CopyItem(
          this.GetItem(3),
          void 0,
        )).SetUIActive(!0),
        (e = new AdviceSelectLineContentItem(e)),
        this.N8e.push(e),
        e);
  }
}
exports.AdviceSelectItem = AdviceSelectItem;
class AdviceSelectBtnContentItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.Pe = void 0),
      (this.V8e = () => {
        let e;
        (this.Pe.GetIndex() !== 0 && this.Pe.GetIndex() !== 2) ||
          ((e = this.Pe.GetIndex() === 0 ? 0 : 1),
          (e = ModelManager_1.ModelManager.AdviceModel.CurrentWordMap.get(e)) >
          0
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
      (this.H8e = () => {
        let e;
        this.Pe.GetIndex() === 1 &&
          ((e = ModelManager_1.ModelManager.AdviceModel.CurrentConjunctionId) >
          0
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
      (this.j8e = () => {
        this.W8e(), this.K8e();
      }),
      (this.Q8e = () => {
        (ModelManager_1.ModelManager.AdviceModel.CurrentExpressionId = 0),
          this.K8e(),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnSelectAdviceExpression,
          );
      }),
      (this.X8e = () => {
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
        [0, this.X8e],
        [3, this.Q8e],
      ]);
  }
  OnStart() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnSelectAdviceExpression,
      this.j8e,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSelectAdviceWord,
        this.V8e,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnChangeAdviceWord,
        this.H8e,
      );
  }
  W8e() {
    let e = ModelManager_1.ModelManager.AdviceModel.CurrentExpressionId;
    this.Pe.GetIndex() === 3 &&
      (e !== 0
        ? ((e =
            ConfigManager_1.ConfigManager.ChatConfig.GetExpressionConfig(e)),
          this.GetText(1).ShowTextNew(e.Name),
          (this.GetText(1).useChangeColor = !0))
        : (LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), "AdviceFunc_2"),
          (this.GetText(1).useChangeColor = !1)));
  }
  RefreshView(e) {
    (this.Pe = e),
      this.$8e(),
      this.Y8e(),
      this.J8e(),
      this.V8e(),
      this.H8e(),
      this.K8e();
  }
  K8e() {
    let e;
    this.Pe.GetIndex() === 3
      ? ((e = ModelManager_1.ModelManager.AdviceModel.CurrentExpressionId),
        this.GetButton(3).RootUIComp.SetUIActive(e !== 0))
      : this.GetButton(3).RootUIComp.SetUIActive(!1);
  }
  Y8e() {
    const e = this.Pe.GetIndex();
    e !== 0 && e !== 1 && e !== 2 && e !== 5 && e === 3 && this.W8e();
  }
  $8e() {
    const e = this.Pe.GetIndex();
    let t = "";
    e === 0 || e === 1 || e === 2
      ? (t = "AdviceFunc_1")
      : e === 5
        ? (t = "AdviceFunc_3")
        : e === 3
          ? (t = "AdviceFunc_2")
          : e === 6 &&
            (t =
              ModelManager_1.ModelManager.AdviceModel.CurrentLineModel === 0
                ? "AdviceFunc_4"
                : "AdviceFunc_5"),
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), t);
  }
  J8e() {
    const e = this.Pe.GetIndex();
    let t = "";
    e === 0
      ? (t = SPRITEONE)
      : e === 1
        ? (t = SPRITETWO)
        : e === 2
          ? (t = SPRITETHREE)
          : e === 5
            ? (t = SPRITECHANGE)
            : e === 3
              ? (t = SPRITEEXPRESSION)
              : e === 6 &&
                (t =
                  ModelManager_1.ModelManager.AdviceModel.CurrentLineModel === 0
                    ? SPRITEADD
                    : SPRITEDECREASE),
      this.SetSpriteByPath(t, this.GetSprite(2), !1);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnSelectAdviceExpression,
      this.j8e,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnSelectAdviceWord,
        this.V8e,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnChangeAdviceWord,
        this.H8e,
      );
  }
}
class AdviceSelectLineContentItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(), this.CreateThenShowByActor(e.GetOwner());
  }
}
// # sourceMappingURL=AdivceSelectItem.js.map
