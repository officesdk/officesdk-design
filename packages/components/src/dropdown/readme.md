## 需求
- 实现下拉菜单

## 思考
- 下拉菜单需要考虑到多场景，可能触发菜单的只是个文本或者图标都有可能
- 需要进行组件拆分，将整个下拉效果的实现拆成 dropdown、menu以及嵌入dropdown的组件，然后将这些组件组合起来实现下拉菜单的效果。
- 实现组件：Dropdown、DropdownButton、Menu
- dropdownButton: 只是作为其一个比较常用的children， 所以dropdownButton 不用实现 variant 为input的情况。 另外size 当前只有large和medium。 
- dropdown 要考虑的问题
  - 弹出区域是否处于边界，需要自动调整
- menu 
  - 虚拟渲染以及滚动问题
  - group分组处理
  - divider的实现
  - 下级菜单的弹出问题
  - 搜索匹配
- 疑问：怎么将嵌入的组件组件和dropdown以及menu关联起来？ 
- 疑问：dropdown是否可基于rc-dropdown进行开发？


