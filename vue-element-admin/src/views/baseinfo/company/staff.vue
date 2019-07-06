<template>
  <div class="app-container">
    <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">员工列表</el-menu-item>
      <el-menu-item index="2">待审核</el-menu-item>
    </el-menu>
    <div class="line" />
    <div v-if="activeIndex === '1'" style="display:flex; justify-content:space-between;">
      <!-- 左  style="float:left; width:25%; " -->
      <div class="expand" style="width:20%; ">
        <el-tree
          v-if="isLoadingTree"
          ref="expandMenuList"
          style="width: 100%"
          class="expand-tree"
          :data="setTree"
          node-key="id"
          highlight-current
          :props="defaultProps"
          :expand-on-click-node="false"
          :render-content="renderContent"
          :default-expanded-keys="defaultExpandKeys"
          @node-click="handleNodeClick"
        />
      </div>
      <el-table
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          prop="date"
          label="日期"
          width="150"
        />
        <el-table-column
          prop="name"
          label="姓名"
          width="120"
        />
        <el-table-column label="基础信息">
          <el-table-column
            prop="name"
            label="名字"
            width="120"
          />
          <el-table-column
            prop="phone"
            label="手机"
            width="120"
          />
          <el-table-column
            prop="email"
            label="邮箱"
            width="120"
          />
        </el-table-column>
        <el-table-column label="地址">
          <el-table-column
            prop="province"
            label="省份"
            width="120"
          />
          <el-table-column
            prop="city"
            label="市区"
            width="120"
          />
          <el-table-column
            prop="address"
            label="地址"
          />
          <el-table-column
            prop="zip"
            label="邮编"
            width="120"
          />
        </el-table-column>
      </el-table>
    </div>
    <div v-else>asdad</div>
  </div>
</template>
<!-- VUE饿了么树形控件添加增删改功能按钮 -->
<script>
import TreeRender from '@/components/Tree/treeRender'
import api from '@/api/tree-data'

export default {
  name: 'Tree',
  data() {
    return {
      activeIndex: '1',
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-08',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-06',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-07',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }],
      maxexpandId: api.maxexpandId, // 新增节点开始id
      non_maxexpandId: api.maxexpandId, // 新增节点开始id(不更改)
      isLoadingTree: false, // 是否加载节点树
      setTree: api.treelist, // 节点树数据
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      defaultExpandKeys: [] // 默认展开节点列表
    }
  },
  mounted() {
    console.log(api)
    this.initExpand()
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
      this.activeIndex = key
    },
    initExpand() {
      this.setTree.map(a => {
        this.defaultExpandKeys.push(a.id)
      })
      this.isLoadingTree = true
    },
    handleNodeClick(data, node, s) {
      // 点击节点
      console.log(data, node, s)
      data.isEdit = false // 放弃编辑状态
    },
    renderContent(h, { node, data, store }) {
      // 加载节点
      const that = this
      return h(TreeRender, {
        props: {
          DATA: data,
          NODE: node,
          STORE: store,
          maxexpandId: that.non_maxexpandId
        },
        on: {
          nodeAdd: (s, d, n) => that.handleAdd(s, d, n),
          nodeEdit: (s, d, n) => that.handleEdit(s, d, n),
          nodeDel: (s, d, n) => that.handleDelete(s, d, n)
        }
      })
    },
    handleAddTop() {
      this.setTree.push({
        id: ++this.maxexpandId,
        name: '新增节点',
        pid: '',
        isEdit: false,
        children: []
      })
    },
    handleAdd(s, d, n) {
      // 增加节点
      console.log(s, d, n)
      if (n.level >= 6) {
        this.$message.error('最多只支持五级！')
        return false
      }
      // 添加数据
      d.children.push({
        id: ++this.maxexpandId,
        name: '新增节点',
        pid: d.id,
        isEdit: false,
        children: []
      })
      // 展开节点
      if (!n.expanded) {
        n.expanded = true
      }
    },
    handleEdit(s, d, n) {
      // 编辑节点
      console.log(s, d, n)
    },
    handleDelete(s, d, n) {
      // 删除节点
      console.log(s, d, n)
      const that = this
      // 有子级不删除
      if (d.children && d.children.length !== 0) {
        this.$message.error('此节点有子级，不可删除！')
        return false
      } else {
        // 新增节点直接删除，否则要询问是否删除
        const delNode = () => {
          const list = n.parent.data.children || n.parent.data // 节点同级数据
          let _index = 99999 // 要删除的index
          /* if(!n.parent.data.children){//删除顶级节点，无children
                    list = n.parent.data
                  }*/
          list.map((c, i) => {
            if (d.id === c.id) {
              _index = i
            }
          })
          const k = list.splice(_index, 1)
          // console.log(_index,k)
          this.$message.success('删除成功！')
        }
        const isDel = () => {
          that
            .$confirm('是否删除此节点？', '提示', {
              confirmButtonText: '确认',
              cancelButtonText: '取消',
              type: 'warning'
            })
            .then(() => {
              delNode()
            })
            .catch(() => {
              return false
            })
        }
        // 判断是否新增
        d.id > this.non_maxexpandId ? delNode() : isDel()
      }
    }
  }
}
</script>

<style>
  .expand {
    width: 100%;
    height: 100%;
    max-width: 230px;
    overflow: hidden;
  }

  .expand > div {
    height: 85%;
    float: left;
    overflow-y: auto;
  }

  .expand > div::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 5px;
  }

  .expand > div::-webkit-scrollbar-thumb {
    background-color: rgba(50, 65, 87, 0.5);
    outline: 1px solid slategrey;
    border-radius: 5px;
  }

  .expand > div::-webkit-scrollbar {
    width: 10px;
  }

  .expand-tree {
    border: none;
  }

  .expand-tree .el-tree-node.is-current,
  .expand-tree .el-tree-node:hover {
    overflow: hidden;
  }

  .expand-tree .is-current > .el-tree-node__content .tree-btn,
  .expand-tree .el-tree-node__content:hover .tree-btn {
    display: inline-block;
  }

  .expand-tree .is-current > .el-tree-node__content .tree-label {
    font-weight: 600;
    white-space: normal;
  }
</style>
