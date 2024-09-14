"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionSkinView = void 0);
const UE = require("ue"),
  MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem"),
  UiSceneManager_1 = require("../../../UiComponent/UiSceneManager"),
  UiModelUtil_1 = require("../../../UiModel/UiModelUtil"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView"),
  VisionSkinItem_1 = require("./VisionSkinItem");
class VisionSkinView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.lqe = void 0),
      (this.aji = -1),
      (this.V1i = -1),
      (this.Xji = 0),
      (this.jJs = 0),
      (this.$ji = void 0),
      (this.Yji = void 0),
      (this.Jji = !1),
      (this.tHi = void 0),
      (this.zji = void 0),
      (this.Zji = 0),
      (this.eWi = () => {
        (this.Jji = !this.Jji), this.GetItem(2).SetUIActive(this.Jji);
      }),
      (this.tWi = () => {
        var i =
          ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemById(
            this.Xji,
          );
        ControllerHolder_1.ControllerHolder.PhantomBattleController.PhantomSkinChangeRequest(
          this.aji,
          0 < i?.ParentMonsterId ? this.Xji : 0,
          this.Jji,
        ),
          this.EHi();
      }),
      (this.Awe = () => {
        this.CloseMe();
      }),
      (this.iWi = () => {
        ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
          this.Xji,
        );
      }),
      (this.oWi = () => {
        var i = new VisionSkinItem_1.VisionSkinItem();
        return (
          i.SetClickToggleEvent(this.g7i),
          i.BindCanToggleExecuteChange(this.Bpt),
          i
        );
      }),
      (this.g7i = (i, t) => {
        this.zji?.SetToggleStateForce(0), (this.zji = t);
        var t =
            ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemById(
              i,
            ),
          e =
            (this.rWi(
              !!t.ParentMonsterId &&
                !ModelManager_1.ModelManager.PhantomBattleModel.GetSkinIsUnlock(
                  i,
                ),
            ),
            t.MonsterName);
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), e),
          this.Zji ? this.nWi(i !== this.Zji) : this.nWi(!!t.ParentMonsterId),
          this._7i(i);
      }),
      (this.Bpt = (i) => this.Xji !== i),
      (this.sWi = () => {
        var t =
          ModelManager_1.ModelManager.PhantomBattleModel.GetMonsterSkinListByMonsterId(
            this.V1i,
          );
        if (t) {
          this.Zji =
            ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
              this.aji,
            ).SkinId;
          let i = 0;
          -1 === (i = this.Zji ? t.indexOf(this.Zji) : 0) && (i = 0),
            this.Yji?.SetCurrentEquipmentVisible(!1),
            (this.Yji = this.$ji?.UnsafeGetGridProxy(i)),
            this.Yji?.SetCurrentEquipmentVisible(!0),
            this.nWi(!1);
        }
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIButtonComponent],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UIButtonComponent],
      [5, UE.UIText],
      [6, UE.UILoopScrollViewComponent],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [1, this.eWi],
        [4, this.tWi],
        [9, this.iWi],
      ]);
  }
  OnStart() {
    (this.Jji = !1),
      this.GetItem(2).SetUIActive(!1),
      (this.tHi = UiSceneManager_1.UiSceneManager.GetVisionSkeletalHandle()),
      (this.aji = this.OpenParam);
    var i,
      t,
      e =
        ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
          this.aji,
        );
    e &&
      ((this.V1i = e.GetConfig()?.MonsterId),
      (this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
      this.lqe.SetCloseCallBack(this.Awe),
      this.lqe.SetTitleByTextIdAndArgNew("VisionSkinTitleText"),
      this.lqe.SetHelpBtnActive(!1),
      (i = e.GetSkinConfig().MonsterName),
      (t = e.GetConfig().MonsterName),
      (t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t)),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(3),
        "ChangeDefaultVisionSkinText",
        t,
      ),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), i),
      (this.$ji = new LoopScrollView_1.LoopScrollView(
        this.GetLoopScrollViewComponent(6),
        this.GetItem(7).GetOwner(),
        this.oWi,
      )),
      (this.Zji = e.SkinId));
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnVisionSkinEquip,
      this.sWi,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnVisionSkinEquip,
      this.sWi,
    );
  }
  OnBeforeShow() {
    const t =
      ModelManager_1.ModelManager.PhantomBattleModel.GetMonsterSkinListByMonsterId(
        this.V1i,
      );
    if (t) {
      let i = 0;
      -1 === (i = this.Zji ? t.indexOf(this.Zji) : 0) && (i = 0),
        this.$ji?.RefreshByData(t, !1, () => {
          this.$ji?.SelectGridProxy(i),
            (this.Yji = this.$ji?.UnsafeGetGridProxy(i)),
            (this.zji = this.Yji?.GetItemGridExtendToggle()),
            this.Yji?.SetCurrentEquipmentVisible(!0),
            (this.Xji = t[i]),
            (this.jJs = this.Xji);
        }),
        this.rWi(!1),
        this.nWi(!1);
    }
  }
  _7i(i) {
    this.Xji === i
      ? this.EHi()
      : (this.SHi(),
        ControllerHolder_1.ControllerHolder.PhantomBattleController.SetMeshShow(
          i,
          () => {
            this.EHi();
          },
          this.tHi,
          !1,
        ),
        (this.Xji = i));
  }
  EHi() {
    var i;
    this.tHi &&
      ((i = this.tHi.Model),
      UiModelUtil_1.UiModelUtil.PlayEffectOnRoot(i, "VisionLevelUpEffect"),
      UiModelUtil_1.UiModelUtil.SetRenderingMaterial(
        i,
        "VisionStepupController",
      ));
  }
  SHi() {
    UiSceneManager_1.UiSceneManager.HasVisionSkeletalHandle() ||
      UiSceneManager_1.UiSceneManager.InitVisionSkeletalHandle(),
      (this.tHi = UiSceneManager_1.UiSceneManager.GetVisionSkeletalHandle());
  }
  rWi(i) {
    this.GetItem(8)?.SetUIActive(i),
      this.GetButton(9)?.RootUIComp.SetUIActive(i),
      this.GetButton(4)?.RootUIComp.SetUIActive(!i);
  }
  nWi(i) {
    this.GetButton(4)?.SetSelfInteractive(i);
  }
  OnAfterDestroy() {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.VisionSkinViewClose,
      this.Xji !== this.jJs,
    );
  }
}
exports.VisionSkinView = VisionSkinView;
//# sourceMappingURL=VisionSkinView.js.map
