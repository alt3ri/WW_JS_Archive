"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PersonalOptionView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  PlayerHeadItem_1 = require("../../Common/PlayerHeadItem"),
  GenericLayoutNew_1 = require("../../Util/Layout/GenericLayoutNew"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  PersonalOptionItem_1 = require("./PersonalOptionItem");
class PersonalOptionView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.H8t = void 0),
      (this.g8t = void 0),
      (this.J8t = (e, t, i) => {
        t = new PersonalOptionItem_1.PersonalOptionItem(t);
        return t.Refresh(e, !1, i), { Key: i, Value: t };
      }),
      (this.mHt = () => {
        this.RefreshOptions();
      }),
      (this.lHt = () => {
        this.Kbe();
      }),
      (this.XAt = () => {
        this.K7e();
      }),
      (this.$At = () => {
        this.r9t();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UISprite],
      [2, UE.UIText],
      [3, UE.UIItem],
      [4, UE.UIText],
      [5, UE.UIText],
      [6, UE.UIButtonComponent],
      [7, UE.UIText],
      [8, UE.UIItem],
      [9, UE.UIGridLayout],
      [10, UE.UIText],
      [11, UE.UIText],
    ];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnBirthChange,
      this.mHt,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnHeadIconChange,
        this.lHt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnNameChange,
        this.XAt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSignChange,
        this.$At,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnBirthChange,
      this.mHt,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnHeadIconChange,
        this.lHt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnNameChange,
        this.XAt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnSignChange,
        this.$At,
      );
  }
  OnStart() {
    (this.g8t = new PlayerHeadItem_1.PlayerHeadItem(
      this.GetItem(0).GetOwner(),
    )),
      this.RefreshOptions(),
      this.K7e(),
      this.r9t();
    var e = ModelManager_1.ModelManager.FunctionModel.GetPlayerLevel();
    e && this.GetText(5).SetText(String(e)),
      this.Kbe(),
      this.GetText(4).SetText(""),
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(10), "SetPersonalData");
  }
  OnAfterShow() {}
  Kbe() {
    var e = ModelManager_1.ModelManager.PlayerInfoModel.GetHeadIconId();
    this.g8t.RefreshByRoleId(e);
  }
  K7e() {
    var e = ModelManager_1.ModelManager.FunctionModel.GetPlayerName();
    e && this.GetText(2).SetText(e);
  }
  r9t() {
    var e = ModelManager_1.ModelManager.PersonalModel.GetSignature(),
      t = this.GetText(11);
    e && "" !== e
      ? t.SetText(e)
      : LguiUtil_1.LguiUtil.SetLocalText(t, "EmptySign");
  }
  RefreshOptions() {
    var e = [];
    e.push(6),
      ModelManager_1.ModelManager.FunctionModel.IsOpen(10061) && e.push(7),
      e.push(8),
      e.push(9),
      e.push(10),
      e.push(11),
      this.H8t ||
        (this.H8t = new GenericLayoutNew_1.GenericLayoutNew(
          this.GetGridLayout(9),
          this.J8t,
        )),
      this.H8t.ClearChildren(),
      this.H8t.RebuildLayoutByDataNew(e);
  }
  OnBeforeDestroy() {
    this.H8t && (this.H8t.ClearChildren(), (this.H8t = void 0));
  }
}
exports.PersonalOptionView = PersonalOptionView;
//# sourceMappingURL=PersonalOptionView.js.map
