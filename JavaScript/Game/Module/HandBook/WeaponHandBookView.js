"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WeaponHandBookView = void 0);
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CommonTabTitleData_1 = require("../Common/TabComponent/CommonTabTitleData"),
  CommonTabItemBase_1 = require("../Common/TabComponent/TabItem/CommonTabItemBase"),
  UiCameraAnimationManager_1 = require("../UiCameraAnimation/UiCameraAnimationManager"),
  UiSceneManager_1 = require("../UiComponent/UiSceneManager"),
  HandBookBaseView_1 = require("./HandBookBaseView"),
  HandBookCommonItem_1 = require("./HandBookCommonItem"),
  HandBookController_1 = require("./HandBookController"),
  HandBookDefine_1 = require("./HandBookDefine");
class WeaponHandBookView extends HandBookBaseView_1.HandBookBaseView {
  constructor() {
    super(...arguments),
      (this.wZt = []),
      (this.BZt = []),
      (this.bZt = void 0),
      (this.OnHandBookRead = (e, n) => {
        if (3 === e) {
          var t = this.BZt.length;
          for (let e = 0; e < t; e++) {
            var a = this.BZt[e];
            if (a.GetData().Config.Id === n) {
              a.SetNewFlagVisible(!1);
              break;
            }
          }
        }
      }),
      (this.InitHandBookCommonItem = () => {
        var e = new HandBookCommonItem_1.HandBookCommonItem();
        return (
          e.BindOnExtendToggleStateChanged(this.OnToggleClick),
          this.BZt.push(e),
          e
        );
      }),
      (this.OnToggleClick = (e) => {
        var n,
          t = e.Data,
          e = e.MediumItemGrid.GridIndex;
        this.ScrollViewCommon.DeselectCurrentGridProxy(),
          this.ScrollViewCommon.SelectGridProxy(e),
          this.ScrollViewCommon.RefreshGridProxy(e),
          t.IsLock
            ? this.SetLockState(!0)
            : (this.SetLockState(!1),
              (e = t.Config),
              (n = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(
                3,
                e.Id,
              )) && this.SetDateText(n.CreateTime),
              t.IsNew &&
                HandBookController_1.HandBookController.SendIllustratedReadRequest(
                  3,
                  e.Id,
                ),
              (n =
                ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(
                  e.Id,
                )),
              (t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
                n.WeaponName,
              )),
              this.SetNameText(t),
              (t = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponTypeName(
                n.WeaponType,
              )),
              this.SetTypeText(t),
              this.RefreshContentItemLayout(e),
              this.RefreshAttributeItemLayout(e),
              HandBookController_1.HandBookController.SetWeaponMeshShow(
                e.Id,
                this.qZt,
              ));
      }),
      (this.Refresh = () => {
        this.wZt =
          ConfigManager_1.ConfigManager.HandBookConfig.GetWeaponHandBookConfigList();
        var n = [],
          t = this.wZt.length;
        for (let e = 0; e < t; e++) {
          var a = this.wZt[e],
            i = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(
              3,
              a.Id,
            ),
            o = void 0 === i,
            i = void 0 !== i && !i.IsRead,
            r = new HandBookDefine_1.HandBookCommonItemData(),
            s =
              ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(
                a.Id,
              );
          (r.Icon = s.IconSmall),
            (r.QualityId = s.QualityId),
            (r.ConfigId = a.Id),
            (r.Config = a),
            (r.IsLock = o),
            (r.IsNew = i),
            n.push(r);
        }
        this.InitScrollViewByCommonItem(n);
        var e =
          ConfigManager_1.ConfigManager.HandBookConfig.GetHandBookEntranceConfig(
            3,
          );
        this.InitCommonTabTitle(
          e.TitleIcon,
          new CommonTabTitleData_1.CommonTabTitleData(e.Name),
        ),
          this.RefreshCollectText();
      }),
      (this.qZt = void 0);
  }
  OnStart() {
    this.SetDefaultState(), this.Refresh(), this.RefreshLockText();
  }
  OnAfterShow() {
    this.bZt =
      UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandleByHandleName(
        "1060",
      );
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnHandBookDataInit,
      this.Refresh,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnHandBookDataUpdate,
        this.Refresh,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnHandBookRead,
        this.OnHandBookRead,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnHandBookDataInit,
      this.Refresh,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnHandBookDataUpdate,
        this.Refresh,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnHandBookRead,
        this.OnHandBookRead,
      );
  }
  RefreshCollectText() {
    var e = HandBookController_1.HandBookController.GetCollectProgress(3);
    this.SetCollectText(e[0], e[1]);
  }
  RefreshLockText() {
    var e =
      ConfigManager_1.ConfigManager.TextConfig.GetTextById(
        "WeaponHandBookLock",
      );
    this.SetLockText(e);
  }
  RefreshAttributeItemLayout(e) {
    var n = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(
        e.Id,
      ),
      t = [],
      a = ModelManager_1.ModelManager.WeaponModel.GetCurveValue(
        n.FirstCurve,
        n.FirstPropId.Value,
        e.Level,
        e.Breach,
      ),
      a = {
        Id: n.FirstPropId.Id,
        IsRatio: n.FirstPropId.IsRatio,
        CurValue: a,
        BgActive: !0,
      },
      e = ModelManager_1.ModelManager.WeaponModel.GetCurveValue(
        n.SecondCurve,
        n.SecondPropId.Value,
        e.Level,
        e.Breach,
      ),
      n = {
        Id: n.SecondPropId.Id,
        IsRatio: n.SecondPropId.IsRatio,
        CurValue: e,
        BgActive: !0,
      };
    t.push(a, n), this.InitAttributeLayout(t);
  }
  RefreshContentItemLayout(e) {
    var n = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(
        e.Id,
      ),
      t = [],
      a =
        ConfigManager_1.ConfigManager.TextConfig.GetTextById(
          "WeaponDescrtption",
        ),
      i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
        n.AttributesDescription,
      ),
      o =
        ConfigManager_1.ConfigManager.TextConfig.GetTextById(
          "EffectDescrtption",
        ),
      e = ModelManager_1.ModelManager.WeaponModel.GetWeaponConfigDescParams(
        n,
        e.Resonance,
      ),
      n = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(n.Desc),
      n = StringUtils_1.StringUtils.Format(n, ...e);
    t.push(
      new HandBookDefine_1.HandBookContentItemData(a, i),
      new HandBookDefine_1.HandBookContentItemData(o, n),
    ),
      this.InitContentItemLayout(t);
  }
  GetTabItemData(e) {
    var n = new Array(),
      t = this.TabList.length;
    for (let e = 0; e < t; e++) {
      var a = new CommonTabItemBase_1.CommonTabItemData();
      (a.Index = e), (a.Data = this.TabList[e]), n.push(a);
    }
    return n;
  }
  OnBeforePlayCloseSequence() {
    UiCameraAnimationManager_1.UiCameraAnimationManager.PopCameraHandle(
      this.bZt,
    );
  }
  OnBeforeCreate() {
    this.qZt = UiSceneManager_1.UiSceneManager.InitWeaponObserver();
  }
  OnBeforeDestroy() {
    UiSceneManager_1.UiSceneManager.DestroyWeaponObserver(this.qZt),
      (this.qZt = void 0),
      (this.wZt = []),
      (this.BZt = []);
  }
}
exports.WeaponHandBookView = WeaponHandBookView;
//# sourceMappingURL=WeaponHandBookView.js.map
