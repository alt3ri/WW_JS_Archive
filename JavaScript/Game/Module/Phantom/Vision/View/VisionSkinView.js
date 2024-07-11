"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionSkinView = void 0);
const UE = require("ue");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const UiSceneManager_1 = require("../../../UiComponent/UiSceneManager");
const UiModelUtil_1 = require("../../../UiModel/UiModelUtil");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView");
const VisionSkinItem_1 = require("./VisionSkinItem");
class VisionSkinView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.lqe = void 0),
      (this.lHi = -1),
      (this.Vli = -1),
      (this.YHi = 0),
      (this.K6s = 0),
      (this.JHi = void 0),
      (this.zHi = void 0),
      (this.ZHi = !1),
      (this.i7i = void 0),
      (this.eji = void 0),
      (this.tji = 0),
      (this.iji = () => {
        (this.ZHi = !this.ZHi), this.GetItem(2).SetUIActive(this.ZHi);
      }),
      (this.oji = () => {
        const i =
          ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemById(
            this.YHi,
          );
        ControllerHolder_1.ControllerHolder.PhantomBattleController.PhantomSkinChangeRequest(
          this.lHi,
          i?.ParentMonsterId > 0 ? this.YHi : 0,
          this.ZHi,
        ),
          this.E7i();
      }),
      (this.Awe = () => {
        this.CloseMe();
      }),
      (this.rji = () => {
        ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
          this.YHi,
        );
      }),
      (this.nji = () => {
        const i = new VisionSkinItem_1.VisionSkinItem();
        return (
          i.SetClickToggleEvent(this.f9i),
          i.BindCanToggleExecuteChange(this.Eft),
          i
        );
      }),
      (this.f9i = (i, t) => {
        this.eji?.SetToggleStateForce(0), (this.eji = t);
        var t =
          ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemById(
            i,
          );
        const e =
          (this.sji(
            !!t.ParentMonsterId &&
              !ModelManager_1.ModelManager.PhantomBattleModel.GetSkinIsUnlock(
                i,
              ),
          ),
          t.MonsterName);
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), e),
          this.tji ? this.aji(i !== this.tji) : this.aji(!!t.ParentMonsterId),
          this.u9i(i);
      }),
      (this.Eft = (i) => this.YHi !== i),
      (this.hji = () => {
        const t =
          ModelManager_1.ModelManager.PhantomBattleModel.GetMonsterSkinListByMonsterId(
            this.Vli,
          );
        if (t) {
          this.tji =
            ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
              this.lHi,
            ).SkinId;
          let i = 0;
          (i = this.tji ? t.indexOf(this.tji) : 0) === -1 && (i = 0),
            this.zHi?.SetCurrentEquipmentVisible(!1),
            (this.zHi = this.JHi?.UnsafeGetGridProxy(i)),
            this.zHi?.SetCurrentEquipmentVisible(!0),
            this.aji(!1);
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
        [1, this.iji],
        [4, this.oji],
        [9, this.rji],
      ]);
  }
  OnStart() {
    (this.ZHi = !1),
      this.GetItem(2).SetUIActive(!1),
      (this.i7i = UiSceneManager_1.UiSceneManager.GetVisionSkeletalHandle()),
      (this.lHi = this.OpenParam);
    let i;
    let t;
    const e =
      ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
        this.lHi,
      );
    e &&
      ((this.Vli = e.GetConfig()?.MonsterId),
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
      (this.JHi = new LoopScrollView_1.LoopScrollView(
        this.GetLoopScrollViewComponent(6),
        this.GetItem(7).GetOwner(),
        this.nji,
      )),
      (this.tji = e.SkinId));
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnVisionSkinEquip,
      this.hji,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnVisionSkinEquip,
      this.hji,
    );
  }
  OnBeforeShow() {
    const t =
      ModelManager_1.ModelManager.PhantomBattleModel.GetMonsterSkinListByMonsterId(
        this.Vli,
      );
    if (t) {
      let i = 0;
      (i = this.tji ? t.indexOf(this.tji) : 0) === -1 && (i = 0),
        this.JHi?.RefreshByData(t, !1, () => {
          this.JHi?.SelectGridProxy(i),
            (this.zHi = this.JHi?.UnsafeGetGridProxy(i)),
            (this.eji = this.zHi?.GetItemGridExtendToggle()),
            this.zHi?.SetCurrentEquipmentVisible(!0),
            (this.YHi = t[i]),
            (this.K6s = this.YHi);
        }),
        this.sji(!1),
        this.aji(!1);
    }
  }
  u9i(i) {
    this.YHi === i
      ? this.E7i()
      : (this.y7i(),
        ControllerHolder_1.ControllerHolder.PhantomBattleController.SetMeshShow(
          i,
          () => {
            this.E7i();
          },
          this.i7i,
          !1,
        ),
        (this.YHi = i));
  }
  E7i() {
    let i;
    this.i7i &&
      ((i = this.i7i.Model),
      UiModelUtil_1.UiModelUtil.PlayEffectOnRoot(i, "VisionLevelUpEffect"),
      UiModelUtil_1.UiModelUtil.SetRenderingMaterial(
        i,
        "VisionStepupController",
      ));
  }
  y7i() {
    UiSceneManager_1.UiSceneManager.HasVisionSkeletalHandle() ||
      UiSceneManager_1.UiSceneManager.InitVisionSkeletalHandle(),
      (this.i7i = UiSceneManager_1.UiSceneManager.GetVisionSkeletalHandle());
  }
  sji(i) {
    this.GetItem(8)?.SetUIActive(i),
      this.GetButton(9)?.RootUIComp.SetUIActive(i),
      this.GetButton(4)?.RootUIComp.SetUIActive(!i);
  }
  aji(i) {
    this.GetButton(4)?.SetSelfInteractive(i);
  }
  OnAfterDestroy() {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.VisionSkinViewClose,
      this.YHi !== this.K6s,
    );
  }
}
exports.VisionSkinView = VisionSkinView;
// # sourceMappingURL=VisionSkinView.js.map
