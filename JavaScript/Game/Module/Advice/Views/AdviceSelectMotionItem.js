"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AdviceSelectMotionItem = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  GenericScrollView_1 = require("../../Util/ScrollView/GenericScrollView");
class AdviceSelectMotionItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.ZHe = void 0),
      (this.OnClickBtnBtnCall = () => {}),
      (this.eje = () => {
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
      (this.BtnBindInfo = [[0, this.eje]]);
  }
  SetClickChangeRoleCall(e) {
    this.OnClickBtnBtnCall = e;
  }
  OnStart() {
    this.ZHe = new GenericScrollView_1.GenericScrollView(
      this.GetScrollViewWithScrollbar(2),
      this.Bqe,
    );
  }
  RefreshView(e) {
    this.ZHe.RefreshByData(e), this.tje();
  }
  tje() {
    var e;
    0 < ModelManager_1.ModelManager.AdviceModel.PreSelectRoleId
      ? ((e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(
          ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
            ModelManager_1.ModelManager.AdviceModel.PreSelectRoleId,
          ).Name,
        )),
        this.GetText(1).SetText(e))
      : this.GetText(1).SetText("");
  }
  OnBeforeDestroy() {
    this.ZHe.ClearChildren();
  }
}
exports.AdviceSelectMotionItem = AdviceSelectMotionItem;
class AdviceSelectMotionContent extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.Pe = void 0),
      (this.pHe = () => {
        var e = this.Pe,
          t = ConfigManager_1.ConfigManager.MotionConfig.GetMotionRoleId(
            e.GetIndex(),
          ),
          t = ModelManager_1.ModelManager.MotionModel.GetRoleMotionState(
            t,
            e.GetIndex(),
          ),
          t = 0 === t || 1 === t;
        if (!t || -1 === e.GetIndex()) {
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
      (this.ije = () => {
        (ModelManager_1.ModelManager.AdviceModel.PreSelectMotionId =
          this.Pe.GetIndex()),
          (ModelManager_1.ModelManager.AdviceModel.CurrentSelectMotionId =
            this.Pe.GetIndex()),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnClickAdviceMotion,
          );
      }),
      (this.x7e = () => {
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
      (this.BtnBindInfo = [[0, this.ije]]);
  }
  OnStart() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnClickAdviceMotion,
      this.x7e,
    );
    var e = this.GetExtendToggle(0);
    e.CanExecuteChange.Unbind(), e.CanExecuteChange.Bind(this.pHe);
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
      this.oje(),
      this.Oqe();
  }
  Oqe() {
    var e = this.GetExtendToggle(0).ToggleState,
      t =
        ModelManager_1.ModelManager.AdviceModel.PreSelectMotionId ===
        this.Pe.GetIndex()
          ? 1
          : 0;
    e !== t && this.GetExtendToggle(0).SetToggleStateForce(t, !1);
  }
  oje() {
    var e,
      t = this.Pe;
    t.GetIndex() ===
    ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceMotionDefaultConfigId()
      ? this.GetSprite(1).SetUIActive(!1)
      : ((e = ConfigManager_1.ConfigManager.MotionConfig.GetMotionRoleId(
          t.GetIndex(),
        )),
        (t =
          0 ===
            (e = ModelManager_1.ModelManager.MotionModel.GetRoleMotionState(
              e,
              t.GetIndex(),
            )) || 1 === e),
        this.GetSprite(1).SetUIActive(t));
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnClickAdviceMotion,
      this.x7e,
    );
  }
}
//# sourceMappingURL=AdviceSelectMotionItem.js.map
