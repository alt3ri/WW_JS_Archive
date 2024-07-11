"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionIdentifyView = void 0);
const UE = require("ue");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiComponentsAction_1 = require("../../../../Ui/Base/UiComponentsAction");
const UiTabViewBase_1 = require("../../../../Ui/Base/UiTabViewBase");
const UiLayer_1 = require("../../../../Ui/UiLayer");
const ButtonItem_1 = require("../../../Common/Button/ButtonItem");
const MediumItemGrid_1 = require("../../../Common/MediumItemGrid/MediumItemGrid");
const NumberSelectComponent_1 = require("../../../Common/NumberSelect/NumberSelectComponent");
const RoleLevelUpSuccessController_1 = require("../../../RoleUi/RoleLevel/RoleLevelUpSuccessController");
const UiSceneManager_1 = require("../../../UiComponent/UiSceneManager");
const UiModelUtil_1 = require("../../../UiModel/UiModelUtil");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const VisionIdentifyComponent_1 = require("./VisionIdentifyComponent");
const VisionMainAttributeComponent_1 = require("./VisionMainAttributeComponent");
const VisionNameText_1 = require("./VisionNameText");
class VisionIdentifyView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments),
      (this.b7i = void 0),
      (this.q7i = void 0),
      (this.G7i = 0),
      (this.N7i = void 0),
      (this.O7i = !1),
      (this.v8i = void 0),
      (this.k7i = new Map()),
      (this.F7i = new Array()),
      (this.V7i = () => {
        this.g0t();
      }),
      (this.H7i = (e, t) => {
        this.j7i(e, t);
      }),
      (this.W7i = () => {
        this.K7i();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIText],
    ];
  }
  async OnBeforeStartAsync() {
    (this.b7i = new VisionIdentifyComponent_1.LevelUpIdentifyComponent(
      this.GetItem(2),
    )),
      await this.b7i.Init(this.GetViewName()),
      (this.q7i =
        new VisionMainAttributeComponent_1.VisionMainAttributeComponent()),
      await this.q7i.CreateByActorAsync(this.GetItem(0).GetOwner());
  }
  OnStart() {
    (this.N7i = new VisionIdentifyCostItem(this.GetItem(1))),
      this.N7i.Init(),
      this.N7i.SetOnChangeValueCallBack(this.V7i),
      (this.v8i = new VisionNameText_1.VisionNameText(this.GetText(3)));
  }
  OnBeforeShow() {
    this.mEe(), (this.G7i = this.ExtraParams), this.K7i(), this.Og();
  }
  mEe() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnVisionIdentify,
      this.W7i,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnVisionIdentifyDoAnimation,
        this.H7i,
      ),
      (this.O7i = !0);
  }
  dEe() {
    this.O7i &&
      ((this.O7i = !1),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnVisionIdentify,
        this.W7i,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnVisionIdentifyDoAnimation,
        this.H7i,
      ));
  }
  Og() {
    this.Q7i(), this.sbi(), this.C4e();
  }
  C4e() {
    const e =
      ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
        this.G7i,
      );
    this.v8i.Update(e);
  }
  async j7i(e, t) {
    UiLayer_1.UiLayer.SetShowMaskLayer("PhantomLevelUp", !0),
      this.X7i(),
      this.F7i?.length > 0 && (await this.b7i.PlayUpdateAnimation(this.F7i));
    const i =
      ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
        e,
      );
    UiModelUtil_1.UiModelUtil.SetRenderingMaterial(
      UiSceneManager_1.UiSceneManager.GetVisionSkeletalHandle().Model,
      "VisionChangeController",
    );
    e =
      ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionIdentifyDelay();
    TimerSystem_1.TimerSystem.Delay(() => {
      const e = i.GetNewSubPropSuccessData(t);
      RoleLevelUpSuccessController_1.RoleLevelUpSuccessController.OpenSuccessAttributeView(
        e,
      ),
        UiLayer_1.UiLayer.SetShowMaskLayer("PhantomLevelUp", !1);
    }, e),
      this.Og();
  }
  X7i() {
    let e, t;
    this.F7i.length > 0 &&
      ((e = (t =
        ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
          this.G7i,
        )).GetCurrentCanIdentifyCount()),
      (t = t.GetSubPropIdentifyPreviewData(
        t.GetPhantomLevel(),
        e === 0 ? 0 : this.N7i.CurrentConsumeSelectNum(),
      )).length > 0) &&
      this.b7i.Update(t, !0);
  }
  K7i() {
    this.F7i = [];
    const e =
      ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
        this.G7i,
      );
    const t = e.GetCurrentCanIdentifyCount();
    const i = e.GetSubPropIdentifyPreviewData(
      e.GetPhantomLevel(),
      t === 0 ? 0 : this.N7i.CurrentConsumeSelectNum(),
    );
    const s = i.length;
    if (s > 0)
      for (let e = 0; e < s; e++) {
        const r = this.k7i.get(e);
        (r !== 5 && r !== 1) ||
          r === i[e].SlotState ||
          i[e].SlotState !== 3 ||
          this.F7i.push(e);
      }
    for (let e = 0; e < s; e++) {
      const n = i[e].SlotState;
      this.k7i.set(e, n);
    }
  }
  sbi() {
    const e =
      ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
        this.G7i,
      );
    this.N7i.Update(e);
  }
  Q7i() {
    var e =
      ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
        this.G7i,
      );
    var e = e.GetLevelUpPreviewData(e.GetPhantomLevel());
    this.q7i.Update(e);
  }
  g0t() {
    var e =
      ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
        this.G7i,
      );
    var t = e.GetCurrentCanIdentifyCount();
    var e = e.GetSubPropIdentifyPreviewData(
      e.GetPhantomLevel(),
      t === 0 ? 0 : this.N7i.CurrentConsumeSelectNum(),
    );
    var t = e.length > 0;
    t && this.b7i.Update(e, !1), this.b7i.SetActive(t);
  }
  OnBeforeHide() {
    this.dEe(), UiLayer_1.UiLayer.SetShowMaskLayer("PhantomLevelUp", !1);
  }
  OnBeforeDestroy() {
    this.dEe(), this.b7i.Destroy(), this.q7i.Destroy(), this.N7i.Destroy();
  }
}
exports.VisionIdentifyView = VisionIdentifyView;
class VisionIdentifyCostItem extends UiComponentsAction_1.UiComponentsAction {
  constructor(e) {
    super(),
      (this.wqe = void 0),
      (this.WGe = void 0),
      (this.Pe = void 0),
      (this.$7i = void 0),
      (this.Y7i = void 0),
      (this.Jwt = void 0),
      (this.w$t = (e) => {
        this.Jwt?.SetSelected(!1, !0);
        const t = this.Pe.GetCurrentIdentifyCostId();
        const i =
          ModelManager_1.ModelManager.InventoryModel.GetItemDataBaseByConfigId(
            t,
          );
        let s = 0;
        void 0 !== (s = i.length > 0 ? i[0].GetUniqueId() : s) && s > 0
          ? ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemUid(
              s,
              t,
            )
          : ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
              t,
            );
      }),
      (this.J7i = () => {
        this.z7i(this.Pe)
          ? this.Pe.GetIfHaveEnoughIdentifyGold(this.CurrentConsumeSelectNum())
            ? this.Z7i()
            : ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                "IdentifyNotEnoughMoney",
              )
          : ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
              "LevelUpMaterialShort",
            );
      }),
      (this.KGe = (e) => {
        const t =
          ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
            "IdentifyCount",
          );
        return new LguiUtil_1.TableTextArgNew(t, e);
      }),
      (this.QGe = (e) => {
        this.Og(), this.Y7i?.();
      }),
      (this.wqe = e);
  }
  Init() {
    this.SetRootActor(this.wqe.GetOwner(), !0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIText],
      [6, UE.UIText],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UITexture],
      [10, UE.UIText],
      [11, UE.UIItem],
      [12, UE.UIItem],
      [13, UE.UIText],
    ];
  }
  OnStart() {
    (this.WGe = new NumberSelectComponent_1.NumberSelectComponent(
      this.GetItem(8),
    )),
      (this.$7i = new ButtonItem_1.ButtonItem(this.GetItem(11))),
      this.$7i.SetFunction(this.J7i),
      (this.Jwt = new MediumItemGrid_1.MediumItemGrid()),
      this.Jwt.Initialize(this.GetItem(12).GetOwner()),
      this.Jwt.BindOnExtendToggleStateChanged(this.w$t);
  }
  async Z7i() {
    UiLayer_1.UiLayer.SetShowMaskLayer("PhantomIdentify", !0),
      await ControllerHolder_1.ControllerHolder.PhantomBattleController.RequestPhantomIdentify(
        this.Pe.GetIncrId(),
        this.CurrentConsumeSelectNum(),
      ),
      UiLayer_1.UiLayer.SetShowMaskLayer("PhantomIdentify", !1);
  }
  eHi() {}
  tHi(e) {
    var t = e.GetCurrentIdentifyCostId();
    const i = {
      Type: 4,
      ItemConfigId: t,
      StarLevel:
        ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(t)
          .QualityId,
    };
    var e = e.GetCurrentIdentifyCostValue();
    var t =
      ModelManager_1.ModelManager.InventoryModel.GetItemDataBaseByConfigId(t);
    let s = 0;
    let r = (t.length > 0 && (s = t[0].GetCount()), 0);
    this.CurrentConsumeSelectNum() > 0 &&
      (r = e * this.CurrentConsumeSelectNum()),
      s >= e
        ? (i.BottomText = StringUtils_1.StringUtils.Format(
            MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
              "Text_CollectProgress_Text",
            ),
            s.toString(),
            r.toString(),
          ))
        : (i.BottomText = StringUtils_1.StringUtils.Format(
            MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
              "Text_ItemCostNotEnough_Text",
            ),
            s.toString(),
            r.toString(),
          )),
      this.Jwt.Apply(i);
  }
  iHi(e) {
    var e = e.GetCurrentCanIdentifyCount();
    const t = {
      MaxNumber: e,
      GetExchangeTableText: this.KGe,
      ValueChangeFunction: this.QGe,
    };
    this.WGe.SetMinValue(0),
      this.WGe.Init(t),
      this.WGe.SetAddReduceButtonActive(!0),
      this.WGe.SetMinTextShowState(!0),
      this.WGe.SetAddReduceButtonInteractive(e > 1),
      this.WGe.SetReduceButtonInteractive(this.CurrentConsumeSelectNum() > 1);
  }
  oHi(e) {
    var t = e.GetIdentifyCostItemId();
    var t = (this.SetItemIcon(this.GetTexture(9), t), this.GetText(10));
    t.SetText(
      (
        e.GetIdentifyCostItemValue() * this.CurrentConsumeSelectNum()
      ).toString(),
    ),
      t.SetChangeColor(
        !e.GetIfHaveEnoughIdentifyGold(this.CurrentConsumeSelectNum()),
        t.changeColor,
      );
  }
  rHi(e) {
    e = this.nHi(e);
    this.GetItem(3).SetUIActive(e);
  }
  nHi(e) {
    let t = !0;
    for (const i of e.GetLevelSubPropData(e.GetPhantomLevel()))
      if (i.SlotState !== 3) {
        t = !1;
        break;
      }
    return t;
  }
  H5e(e) {
    const t = this.sHi(e);
    this.GetItem(4).SetUIActive(t),
      t &&
        (e.GetIfHaveEnoughIdentifyConsumeItem(this.CurrentConsumeSelectNum())
          ? LguiUtil_1.LguiUtil.SetLocalText(
              this.GetText(5),
              "IdentifyNeedLevelText",
              e.GetNextIdentifyLevel(),
            )
          : this.GetText(5).SetText(
              MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
                "IdentifyNotEnough",
              ),
            ));
  }
  z7i(e) {
    return e.GetIfHaveEnoughIdentifyConsumeItem(this.CurrentConsumeSelectNum());
  }
  sHi(e) {
    const t = e.GetIfHaveEnoughIdentifyConsumeItem(
      this.CurrentConsumeSelectNum(),
    );
    const i = e.GetIfHaveUnIdentifySubProp();
    return !(this.nHi(e) || (i && t));
  }
  aHi(e) {
    const t = this.nHi(e);
    const i = this.sHi(e);
    let s = t || i;
    this.GetItem(7).SetUIActive(!s),
      this.GetItem(11).SetUIActive(!s),
      i &&
        ((s = e.GetIfHaveEnoughIdentifyConsumeItem(
          this.CurrentConsumeSelectNum(),
        )),
        this.GetItem(2).SetUIActive(!s)),
      t && this.GetItem(2).SetUIActive(!1),
      i || t || this.GetItem(2).SetUIActive(!0);
  }
  CurrentConsumeSelectNum() {
    return this.WGe.GetSelectNumber();
  }
  Update(e) {
    (this.Pe = e), this.iHi(this.Pe), this.Og();
  }
  SetOnChangeValueCallBack(e) {
    this.Y7i = e;
  }
  hHi(e) {
    e.GetIfHaveEnoughIdentifyConsumeItem(this.CurrentConsumeSelectNum()) ||
      this.CurrentConsumeSelectNum() !== 1 ||
      ((e =
        ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
          "IdentifyCount",
        )),
      (e = StringUtils_1.StringUtils.Format(
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e),
        "0",
      )),
      this.WGe.SetNumberSelectTipsText(e));
  }
  Og() {
    this.oHi(this.Pe),
      this.H5e(this.Pe),
      this.rHi(this.Pe),
      this.aHi(this.Pe),
      this.tHi(this.Pe),
      this.eHi(),
      this.hHi(this.Pe);
  }
}
// # sourceMappingURL=VisionIdentifyView.js.map
