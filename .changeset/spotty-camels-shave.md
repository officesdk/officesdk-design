---
'@officesdk/design': patch
---

feat(NumberInput): add valueMap, selectAllOnFocus, and blurOnEscape support

- Add valueMap prop to NumberInput for piecewise non-linear stepping,
  using changeByStep/snapToStep from Slider's valueMap utilities.
- Add valueMap prop to SpinButton and pass through to both Slider and
  NumberInput for consistent non-linear behavior.
- Add selectAllOnFocus prop to NumberInput to auto-select text on focus.
- Add blurOnEscape prop to NumberInput to blur input on Escape key press.
- Update stories for NumberInput and SpinButton with new prop examples.

