---
'@officesdk/design': patch
---

# Improve Loading, Modal, and Menu component behavior

- change standalone `Loading` to use an inline root while keeping fullscreen loading on a dedicated overlay container
- add `LoadingOverlay` for regional non-wrapper loading masks and support transparent masks for fullscreen and regional loading
- update related Modal and Menu behavior, stories, and tests to match the interaction changes in this release
