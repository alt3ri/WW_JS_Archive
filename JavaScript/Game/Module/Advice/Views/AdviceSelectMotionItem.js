"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AdviceSelectMotionItem = void 0);
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GenericScrollView_1 = require("../../Util/ScrollView/GenericScrollView");
class AdviceSelectMotionItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.F7e = void 0),
      (this.OnClickBtnBtnCall = () => {}),
      (this.V7e = () => {
        this.OnClickBtnBtnCall && this.OnClickBtnBtnCall();
      }),
      (this.Bqe = (e, t, i) => {
        t = new AdviceSelectMotionContent(t);
        return t.RefreshView(e), { Key: i, Value: t };
      }),
      this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIText],
      [2, UE.UIScrollViewWithScrollbarComponent],
    ]),
      (this.BtnBindInfo = [[0, this.V7e]]);
  }
  SetClickChangeRoleCall(e) {
    this.OnClickBtnBtnCall = e;
  }
  OnStart() {
    this.F7e = new GenericScrollView_1.GenericScrollView(
      this.GetScrollViewWithScrollbar(2),
      this.Bqe,
    );
  }
  RefreshView(e) {
    this.F7e.RefreshByData(e), this.H7e();
  }
  H7e() {
    let e;
    ModelManager_1.ModelManager.AdviceModel.PreSelectRoleId > 0
      ? ((e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(
          ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
            ModelManager_1.ModelManager.AdviceModel.PreSelectRoleId,
          ).Name,
        )),
        this.GetText(1).SetText(e))
      : this.GetText(1).SetText("");
  }
  OnBeforeDestroy() {
    this.F7e.ClearChildren();
  }
}
exports.AdviceSelectMotionItem = AdviceSelectMotionItem;
class AdviceSelectMotionContent extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.Pe = void 0),
      (this.r7e = () => {
        const e = this.Pe;
        var t = ConfigManager_1.ConfigManager.MotionConfig.GetMotionRoleId(
          e.GetIndex(),
        );
        var t = ModelManager_1.ModelManager.MotionModel.GetRoleMotionState(
          t,
          e.GetIndex(),
        );
        var t = t === 0 || t === 1;
        if (!t || e.GetIndex() === -1) {
          if (
            ModelManager_1.ModelManager.AdviceModel.PreSelectMotionId !==
            this.Pe.GetIndex()
          )
            return !0;
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnClickAdviceMotion,
          );
        }
        return !1;
      }),
      (this.j7e = () => {
        (ModelManager_1.ModelManager.AdviceModel.PreSelectMotionId =
          this.Pe.GetIndex()),
          (ModelManager_1.ModelManager.AdviceModel.CurrentSelectMotionId =
            this.Pe.GetIndex()),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnClickAdviceMotion,
          );
      }),
      (this.p9e = () => {
        this.Oqe();
      }),
      this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UISprite],
      [2, UE.UIText],
    ]),
      (this.BtnBindInfo = [[0, this.j7e]]);
  }
  OnStart() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnClickAdviceMotion,
      this.p9e,
    );
    const e = this.GetExtendToggle(0);
    e.CanExecuteChange.Unbind(), e.CanExecuteChange.Bind(this.r7e);
  }
  RefreshView(e) {
    let t = "";
    (this.Pe = e).GetIndex() ===
    ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceMotionDefaultConfigId()
      ? ((t =
          ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceSpecialParamsContent(
            e.GetIndex(),
          )),
        LguiUtil_1.LguiUtil.SetLocalText(this.GetText(2), "NoneMotion"))
      : ((t = ConfigManager_1.ConfigManager.MotionConfig.GetMotionTitle(
          e.GetIndex(),
        )),
        this.GetText(2).SetText(t)),
      this.W7e(),
      this.Oqe();
  }
  Oqe() {
    const e = this.GetExtendToggle(0).ToggleState;
    const t =
      ModelManager_1.ModelManager.AdviceModel.PreSelectMotionId ===
      this.Pe.GetIndex()
        ? 1
        : 0;
    e !== t && this.GetExtendToggle(0).SetToggleStateForce(t, !1);
  }
  W7e() {
    let e;
    let t = this.Pe;
    t.GetIndex() ===
    ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceMotionDefaultConfigId()
      ? this.GetSprite(1).SetUIActive(!1)
      : ((e = ConfigManager_1.ConfigManager.MotionConfig.GetMotionRoleId(
          t.GetIndex(),
        )),
        (t =
          (e = ModelManager_1.ModelManager.MotionModel.GetRoleMotionState(
            e,
            t.GetIndex(),
          )) === 0 || e === 1),
        this.GetSprite(1).SetUIActive(t));
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnClickAdviceMotion,
      this.p9e,
    );
  }
}
// # sourceMappingURL=AdviceSelectMotionItem.js.map
