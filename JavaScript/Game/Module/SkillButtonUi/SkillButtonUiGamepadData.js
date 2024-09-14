"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkillButtonUiGamepadData = void 0);
const Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  Global_1 = require("../../Global"),
  InputEnums_1 = require("../../Input/InputEnums"),
  InputSettingsManager_1 = require("../../InputSettings/InputSettingsManager"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CharacterUnifiedStateTypes_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes"),
  InputMappingsDefine_1 = require("../../Ui/InputDistribute/InputMappingsDefine"),
  UiManager_1 = require("../../Ui/UiManager"),
  BehaviorButtonData_1 = require("./BehaviorButtonData"),
  mainKeys = [
    "Gamepad_FaceButton_Top",
    "Gamepad_FaceButton_Left",
    "Gamepad_FaceButton_Bottom",
    "Gamepad_FaceButton_Right",
  ],
  MAIN_HALF_NUM = 4,
  dPadKeys = [
    "Gamepad_DPad_Up",
    "Gamepad_DPad_Left",
    "Gamepad_DPad_Down",
    "Gamepad_DPad_Right",
  ],
  DPAD_KEY_NUM = 4,
  subKeys = [
    "Gamepad_LeftTrigger",
    "Gamepad_RightTrigger",
    "Gamepad_LeftShoulder",
    "Gamepad_RightShoulder",
  ],
  SUB_KEY_NUM = 3,
  actionNameToButtonTypeMap = new Map([
    [InputMappingsDefine_1.actionMappings.跳跃, 1],
    [InputMappingsDefine_1.actionMappings.攀爬, 2],
    [InputMappingsDefine_1.actionMappings.攻击, 4],
    [InputMappingsDefine_1.actionMappings.闪避, 5],
    [InputMappingsDefine_1.actionMappings.技能1, 6],
    [InputMappingsDefine_1.actionMappings.幻象1, 7],
    [InputMappingsDefine_1.actionMappings.大招, 8],
    [InputMappingsDefine_1.actionMappings.幻象2, 9],
    [InputMappingsDefine_1.actionMappings.瞄准, 101],
    [InputMappingsDefine_1.actionMappings.通用交互, 104],
    [InputMappingsDefine_1.actionMappings.任务追踪, 105],
  ]),
  initActionNames = [
    InputMappingsDefine_1.actionMappings.跳跃,
    InputMappingsDefine_1.actionMappings.攻击,
    InputMappingsDefine_1.actionMappings.闪避,
    InputMappingsDefine_1.actionMappings.技能1,
    InputMappingsDefine_1.actionMappings.幻象1,
    InputMappingsDefine_1.actionMappings.大招,
    InputMappingsDefine_1.actionMappings.幻象2,
    InputMappingsDefine_1.actionMappings.瞄准,
    InputMappingsDefine_1.actionMappings.通用交互,
  ],
  mainSecondButtonTypeSet = new Set([1, 2, 4, 5, 6, 8, 7, 9, 101]),
  climbingButtonTypeSet = new Set([1, 2, 4, 5, 7, 104]),
  inWaterButtonTypeSet = new Set([5, 7, 104]),
  subButtonTypeSet = new Set([1, 2, 4, 6, 8, 7, 9, 11, 101, 104]),
  phantomRoleButtonTypeSet = new Set([101, 104]);
class SkillButtonUiGamepadData {
  constructor() {
    (this.Byo = []),
      (this.byo = new Map()),
      (this.AllowChangeKeyReasonSet = new Set()),
      (this.Zza = new Set()),
      (this.NoneIcon = ""),
      (this.SwimIcon = ""),
      (this.ButtonKeyList = []),
      (this.qyo = new Map()),
      (this.Gyo = new Map()),
      (this.CurButtonTypeList = []),
      (this.CombineButtonKey = ""),
      (this.MainSkillButtonTypeList = []),
      (this.MainSkillCombineButtonTypeList = []),
      (this.DpadSkillButtonTypeList = []),
      (this.DpadSkillCombineButtonTypeList = []),
      (this.SubSkillButtonTypeList = []),
      (this.SubSkillCombineButtonTypeList = []),
      (this.SubAimSkillButtonTypeList = []),
      (this.Nyo = 1),
      (this.Oyo = void 0),
      (this.Fyo = void 0),
      (this.Vyo = void 0),
      (this.Hyo = void 0),
      (this.jyo = !1),
      (this.IsShowCombineButton = !1),
      (this.VRn = !1),
      (this.Wyo = !1),
      (this.Qyo = !1),
      (this.Xyo = !1),
      (this.Climbing = !1),
      (this.InWater = !1),
      (this.IsPhantomRole = !1),
      (this.PhantomRoleButtonTypeList = void 0),
      (this.ControlCameraByMoveAxis = !1);
  }
  Init() {
    (this.jyo = !1),
      this.$yo(),
      this.Yyo(),
      this.Jyo(),
      this.RefreshBaseConfigByUserSetting(),
      this.RefreshButtonData();
  }
  Clear() {
    this.ControlCameraByMoveAxis = !1;
  }
  $yo() {
    this.Byo.length = 0;
    for (var [t] of actionNameToButtonTypeMap) this.Byo.push(t);
    this.Byo.push(InputMappingsDefine_1.actionMappings.手柄主攻击),
      this.Byo.push(InputMappingsDefine_1.actionMappings.手柄副攻击);
  }
  GetAllActionNameList() {
    return this.Byo;
  }
  Yyo() {
    (this.NoneIcon =
      ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
        "SP_IconXboxNoneIcon",
      )),
      (this.SwimIcon =
        ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
          "SP_IconSwimming",
        ));
  }
  Jyo() {
    this.zyo(
      InputMappingsDefine_1.actionMappings.瞄准,
      InputEnums_1.EInputAction.瞄准,
    ),
      this.zyo(
        InputMappingsDefine_1.actionMappings.通用交互,
        InputEnums_1.EInputAction.通用交互,
      );
  }
  zyo(t, i) {
    var t = actionNameToButtonTypeMap.get(t),
      e = new BehaviorButtonData_1.BehaviorButtonData();
    return e.Refresh(t, i, void 0, void 0), this.byo.set(t, e), e;
  }
  RefreshBaseConfigByUserSetting() {
    this.CombineButtonKey = "Gamepad_LeftShoulder";
    let t = 0;
    for (const o of mainKeys) (this.ButtonKeyList[t] = o), t++;
    for (const r of dPadKeys) (this.ButtonKeyList[t] = r), t++;
    for (const p of subKeys)
      p !== this.CombineButtonKey &&
        ("Gamepad_RightTrigger" === p &&
          (this.Nyo = t - MAIN_HALF_NUM - DPAD_KEY_NUM),
        (this.ButtonKeyList[t] = p),
        t++);
    (this.ButtonKeyList[t] = "Gamepad_RightThumbstick"),
      (this.Oyo = void 0),
      (this.Fyo = void 0),
      (this.Vyo = void 0),
      (this.Hyo = void 0),
      this.qyo.clear();
    for (const _ of initActionNames) {
      var i = InputSettingsManager_1.InputSettingsManager.GetActionBinding(_);
      if (i) {
        var e = [];
        if ((i.GetKeyNameList(e), e)) {
          for (const u of e)
            this.ButtonKeyList.includes(u) &&
              (this.qyo.set(u, _), "Gamepad_RightTrigger" === u) &&
              ((this.Oyo = _),
              (this.Fyo = e.concat()),
              this.Fyo.splice(this.Fyo.indexOf(u), 1),
              this.Fyo.push("Gamepad_RightThumbstick"));
          _ === InputMappingsDefine_1.actionMappings.攻击 &&
            ((this.Vyo = e.concat()),
            (this.Hyo = this.Vyo.concat()),
            this.Hyo.push("Gamepad_RightTrigger"));
        }
      }
    }
    this.Gyo.clear();
    for (const f of initActionNames) {
      var s =
        InputSettingsManager_1.InputSettingsManager.GetCombinationActionBindingByActionName(
          f,
        );
      if (s) {
        var n,
          a,
          h = new Map();
        s.GetKeyMap(h);
        for ([n, a] of h)
          n === this.CombineButtonKey &&
            this.ButtonKeyList.includes(a) &&
            this.Gyo.set(a, f);
      }
    }
    this.Zyo(), this.eIo(), this.W7a();
  }
  Zyo() {
    var t = InputSettingsManager_1.InputSettingsManager.GetActionBinding(
        InputMappingsDefine_1.actionMappings.手柄主攻击,
      ),
      i = InputSettingsManager_1.InputSettingsManager.GetActionBinding(
        InputMappingsDefine_1.actionMappings.攻击,
      ),
      e = [],
      s = [];
    if (
      (t?.GetGamepadKeyNameList(e),
      i?.GetGamepadKeyNameList(s),
      !this.tIo(e, s))
    ) {
      let t = [];
      (t = t.concat(s))
        ? InputSettingsManager_1.InputSettingsManager.SetActionKeys(
            InputMappingsDefine_1.actionMappings.手柄主攻击,
            t,
          )
        : InputSettingsManager_1.InputSettingsManager.SetActionKeys(
            InputMappingsDefine_1.actionMappings.手柄主攻击,
            [],
          );
    }
    (t =
      InputSettingsManager_1.InputSettingsManager.GetCombinationActionBindingByActionName(
        InputMappingsDefine_1.actionMappings.手柄主攻击,
      )),
      (i =
        InputSettingsManager_1.InputSettingsManager.GetCombinationActionBindingByActionName(
          InputMappingsDefine_1.actionMappings.攻击,
        )),
      (e = new Map()),
      (s = new Map());
    if (
      (t?.GetGamepadKeyNameMap(e), i?.GetGamepadKeyNameMap(s), !this.iIo(e, s))
    ) {
      if (e)
        for (var [n, a] of e)
          InputSettingsManager_1.InputSettingsManager.RemoveCombinationActionKeyMap(
            InputMappingsDefine_1.actionMappings.手柄主攻击,
            n,
            a,
          );
      if (s)
        for (var [h, o] of s)
          InputSettingsManager_1.InputSettingsManager.AddCombinationActionKeyMap(
            InputMappingsDefine_1.actionMappings.手柄主攻击,
            h,
            o,
          );
    }
  }
  tIo(i, e) {
    if (i !== e) {
      if (!i || !e) return !1;
      if (i.length !== e.length) return !1;
      for (let t = 0; t < i.length; t++) if (i[t] !== e[t]) return !1;
    }
    return !0;
  }
  iIo(t, i) {
    if (t !== i) {
      if (!t || !i) return !1;
      if (t.size !== i.size) return !1;
      for (var [e, s] of t) if (i.get(e) !== s) return !1;
    }
    return !0;
  }
  eIo() {
    this.MainSkillButtonTypeList.length = MAIN_HALF_NUM;
    for (let t = 0; t < MAIN_HALF_NUM; t++)
      (this.MainSkillButtonTypeList[t] = this.oIo(t, !1)),
        (this.MainSkillCombineButtonTypeList[t] = this.oIo(t, !0));
    (this.DpadSkillButtonTypeList.length = DPAD_KEY_NUM),
      (this.DpadSkillCombineButtonTypeList.length = DPAD_KEY_NUM);
    for (let t = 0; t < DPAD_KEY_NUM; t++)
      (this.DpadSkillButtonTypeList[t] = this.oIo(MAIN_HALF_NUM + t, !1)),
        (this.DpadSkillCombineButtonTypeList[t] = this.oIo(
          MAIN_HALF_NUM + t,
          !0,
        ));
    this.SubSkillButtonTypeList.length = SUB_KEY_NUM;
    for (let t = 0; t < SUB_KEY_NUM; t++)
      (this.SubSkillButtonTypeList[t] = this.oIo(
        MAIN_HALF_NUM + DPAD_KEY_NUM + t,
        !1,
      )),
        (this.SubSkillCombineButtonTypeList[t] = this.oIo(
          MAIN_HALF_NUM + DPAD_KEY_NUM + t,
          !0,
        ));
    this.SubAimSkillButtonTypeList.length = SUB_KEY_NUM + 1;
    for (let t = 0; t < SUB_KEY_NUM; t++)
      this.SubAimSkillButtonTypeList[t] = this.SubSkillButtonTypeList[t];
    (this.SubAimSkillButtonTypeList[this.Nyo] = 11),
      (this.SubAimSkillButtonTypeList[SUB_KEY_NUM] =
        this.SubSkillButtonTypeList[this.Nyo]);
  }
  W7a() {
    for (const t of this.MainSkillCombineButtonTypeList)
      if (0 !== t) return void (this.IsShowCombineButton = !0);
    for (const i of this.SubSkillCombineButtonTypeList)
      if (0 !== i) return void (this.IsShowCombineButton = !0);
    this.IsShowCombineButton = !1;
  }
  oIo(t, i) {
    let e = void 0;
    t = this.ButtonKeyList[t];
    return (
      ((e = (i ? this.Gyo : this.qyo).get(t)) &&
        actionNameToButtonTypeMap.get(e)) ||
      0
    );
  }
  RefreshButtonData() {
    if ((this.rIo(), (this.CurButtonTypeList.length = 0), this.jyo)) {
      for (let t = 0; t < MAIN_HALF_NUM; t++) {
        var i = this.Q7a(this.MainSkillCombineButtonTypeList, t);
        0 !== this.MainSkillCombineButtonTypeList[t]
          ? this.CurButtonTypeList.push(i)
          : this.CurButtonTypeList.push(
              this.Q7a(this.MainSkillButtonTypeList, t),
            );
      }
      for (let t = 0; t < MAIN_HALF_NUM; t++)
        this.CurButtonTypeList.push(
          this.Q7a(this.MainSkillCombineButtonTypeList, t, !0),
        );
      for (let t = 0; t < DPAD_KEY_NUM; t++) {
        var e = this.Q7a(this.DpadSkillCombineButtonTypeList, t);
        0 !== this.DpadSkillCombineButtonTypeList[t]
          ? this.CurButtonTypeList.push(e)
          : this.CurButtonTypeList.push(
              this.Q7a(this.DpadSkillButtonTypeList, t),
            );
      }
      for (let t = 0; t < SUB_KEY_NUM; t++)
        this.aIo(this.SubSkillCombineButtonTypeList[t]);
    } else {
      for (let t = 0; t < MAIN_HALF_NUM; t++)
        this.CurButtonTypeList.push(this.Q7a(this.MainSkillButtonTypeList, t));
      for (let t = 0; t < MAIN_HALF_NUM; t++)
        this.CurButtonTypeList.push(
          this.Q7a(this.MainSkillCombineButtonTypeList, t, !0),
        );
      for (let t = 0; t < DPAD_KEY_NUM; t++)
        this.CurButtonTypeList.push(this.Q7a(this.DpadSkillButtonTypeList, t));
      if (this.Wyo)
        for (let t = 0; t < SUB_KEY_NUM + 1; t++)
          (this.jyo && 11 === this.SubAimSkillButtonTypeList[t]) ||
            this.aIo(this.SubAimSkillButtonTypeList[t]);
      else {
        for (let t = 0; t < SUB_KEY_NUM; t++)
          this.aIo(this.SubSkillButtonTypeList[t]);
        this.CurButtonTypeList.push(void 0);
      }
    }
    var t;
    this.Climbing &&
      -1 !== (t = this.CurButtonTypeList.indexOf(4)) &&
      (this.CurButtonTypeList[t] = 2),
      ModelManager_1.ModelManager.SkillButtonUiModel.GetButtonTypeList().includes(
        12,
      ) &&
        0 <= (t = this.CurButtonTypeList.indexOf(101)) &&
        (this.CurButtonTypeList[t] = 12),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Battle", 18, "RefreshGamepadButton", [
          "",
          this.CurButtonTypeList,
        ]);
  }
  Q7a(t, i, e = !1) {
    t = t[i];
    return (101 === t || this.nIo(t)) && this.sIo(t, e) ? t : 0;
  }
  sIo(t, i = !1) {
    return this.IsPhantomRole
      ? !(
          !phantomRoleButtonTypeSet.has(t) &&
          !this.PhantomRoleButtonTypeList?.includes(t)
        )
      : !(
          (this.Climbing && !climbingButtonTypeSet.has(t)) ||
          (this.InWater && !inWaterButtonTypeSet.has(t)) ||
          (i && !mainSecondButtonTypeSet.has(t))
        );
  }
  nIo(t) {
    var i;
    return (
      !!t &&
      ((i =
        ModelManager_1.ModelManager.SkillButtonUiModel.GetSkillButtonDataByButton(
          t,
        ))
        ? i.IsVisible()
        : this.GetBehaviorButtonDataByButtonType(t)?.IsVisible)
    );
  }
  aIo(t) {
    this.IsPhantomRole || this.Climbing || this.InWater
      ? this.sIo(t)
        ? this.CurButtonTypeList.push(t)
        : this.CurButtonTypeList.push(void 0)
      : subButtonTypeSet.has(t)
        ? this.CurButtonTypeList.push(t)
        : this.CurButtonTypeList.push(void 0);
  }
  rIo() {
    var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    t?.Valid &&
      ((t = t.Entity.CheckGetComponent(190)),
      (this.Climbing = t.HasTag(504239013)),
      (this.InWater = t.HasTag(855966206)));
  }
  GetButtonTypeByActionName(t) {
    return actionNameToButtonTypeMap.get(t);
  }
  IsAim() {
    return 1 === this.GetBehaviorButtonDataByButtonType(101)?.State || this.VRn;
  }
  SetIsPressCombineButton(t) {
    this.jyo !== t && ((this.jyo = t), this.RefreshButtonData());
  }
  GetIsPressCombineButton() {
    return this.jyo;
  }
  GetBehaviorButtonDataByButtonType(t) {
    return this.byo.get(t);
  }
  RefreshSkillButtonData(t) {
    1 === t &&
      (this.mHs(),
      this.RefreshAimButtonVisible(),
      this.hIo(),
      this.fEa(),
      this.ChangeSkillOnAimStateChange(),
      this.RefreshButtonData());
  }
  mHs() {
    this.IsPhantomRole = !1;
    var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    t?.Valid &&
      (t = t.Entity.GetComponent(0)) &&
      ((t = t.GetRoleConfig()),
      (this.IsPhantomRole = 2 === t.RoleType),
      this.IsPhantomRole) &&
      ((t = ModelManager_1.ModelManager.SkillButtonUiModel),
      (this.PhantomRoleButtonTypeList =
        t?.GetCurSkillButtonEntityData()?.SkillButtonIndexConfig?.DesktopButtonTypeList));
  }
  RefreshAimState() {
    var t = this.hIo() || this.fEa();
    return (
      t && (this.ChangeSkillOnAimStateChange(), this.RefreshButtonData()), t
    );
  }
  hIo() {
    var t,
      i,
      e = this.GetBehaviorButtonDataByButtonType(101);
    return (
      !!e &&
      !!(t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity)
        ?.Valid &&
      ((t = t.Entity.GetComponent(161).DirectionState),
      (i = e.State),
      t === CharacterUnifiedStateTypes_1.ECharDirectionState.AimDirection
        ? (e.State = 1)
        : (e.State = 0),
      i !== e.State)
    );
  }
  fEa() {
    var t =
      ModelManager_1.ModelManager.BattleUiModel.FormationData.GetFollowerAiming();
    return this.VRn !== t && ((this.VRn = t), !0);
  }
  RefreshAimButtonVisible() {
    var t,
      i = this.GetBehaviorButtonDataByButtonType(101);
    i &&
      ((t =
        ModelManager_1.ModelManager.SkillButtonUiModel.GetCurSkillButtonEntityData())
        ? i.RefreshIsVisible(t.GameplayTagComponent, t.RoleConfig)
        : (i.IsVisible = !1));
  }
  ChangeSkillOnAimStateChange() {
    this.IsAim() !== this.Wyo && this.lIo();
  }
  lIo() {
    if (!this.Xyo) {
      (this.Xyo = !0), (this.Wyo = !this.Wyo);
      var t = Global_1.Global.CharacterController;
      if (this.Wyo) {
        if (this.Oyo) {
          t.SetActionEnable(this.Oyo, !1);
          for (const i of this.Fyo.concat()) t.SetCustomAction(i, this.Oyo);
        } else
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Battle",
              18,
              "手柄RT没有绑定任何输入，瞄准时不需要更换原有按键绑定",
            );
        if (this.Hyo) {
          t.SetActionEnable(InputMappingsDefine_1.actionMappings.攻击, !1);
          for (const e of this.Hyo.concat())
            t.SetCustomAction(e, InputMappingsDefine_1.actionMappings.攻击);
        } else
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Battle",
              18,
              "攻击输入没有绑定任何按键，瞄准时使RT键生效",
            );
      } else {
        if (this.Oyo) {
          t.SetActionEnable(this.Oyo, !0);
          for (const s of this.Fyo.concat()) t.ResetAllCustomAction(s);
        }
        t.SetActionEnable(InputMappingsDefine_1.actionMappings.攻击, !0);
        for (const n of this.Hyo.concat()) t.ResetAllCustomAction(n);
      }
      this.Xyo = !1;
    }
  }
  RefreshInteractBehaviorData() {
    var t = this.GetBehaviorButtonDataByButtonType(104),
      i = UiManager_1.UiManager.IsViewOpen("InteractionHintView");
    t.IsEnable = i;
  }
  OnActionKeyChanged(t) {
    if (!(0 < this.AllowChangeKeyReasonSet.size))
      return 0 < this.Zza.size
        ? this.Qyo
          ? void 0
          : void (initActionNames.includes(t) && (this.Qyo = !0))
        : void (
            this.Xyo ||
            (initActionNames.includes(t) &&
              Log_1.Log.CheckError() &&
              Log_1.Log.Error("Battle", 18, "在未知情况下触发了改键"))
          );
  }
  AddChangeKeyReason(t) {
    0 === this.Zza.size && this.Wyo && this.lIo(),
      this.Zza.add(t),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Battle", 18, "添加手柄改键原因", [
          "EGamepadChangeKeyReason",
          t,
        ]);
  }
  RemoveChangeKeyReason(t) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Battle", 18, "移除手柄改键原因", [
        "EGamepadChangeKeyReason",
        t,
      ]),
      this.Zza.delete(t),
      0 === this.Zza.size &&
        (this.Qyo && ((this.Qyo = !1), this.RefreshBaseConfigByUserSetting()),
        this.IsAim() !== this.Wyo && this.lIo(),
        this.RefreshButtonData(),
        Info_1.Info.IsInGamepad()) &&
        ModelManager_1.ModelManager.SkillButtonUiModel?.GetCurSkillButtonEntityData()?.RefreshSkillButtonData(
          2,
        );
  }
}
exports.SkillButtonUiGamepadData = SkillButtonUiGamepadData;
//# sourceMappingURL=SkillButtonUiGamepadData.js.map
