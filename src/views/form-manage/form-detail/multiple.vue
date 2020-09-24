<template>
  <div class="handle-wrapper" draggable="true" id="form-multiple">
    <div class="result-list-wrapper">
      <div v-for="(item, index) in resultList" :key="index" class="result-item">
        <div class="result-pic">
            <div>{{item.label}}：</div>
          <template v-if="item.ele != 'group'">
            <img :src="item.pic" @click.stop="edit(item)" />
          </template>
          <template v-else>
            
            <ele-multiple
              :resultList.sync="item.multiple"
              class="group-wrapper"
              :isMultiple="true"
              @edit="edit"
            ></ele-multiple>
          </template>

          <i class="el-tag__close el-icon-close" @click="remove(index)"></i>
        </div>
        <div
          class="await-result"
          v-if="index != resultList.length - 1"
          @drop.stop="drop($event, resultList)"
          @dragover.stop="dragover($event)"
          @dragenter.stop="dragenter($event, 1, index)"
          @dragleave.stop="dragleave($event)"
        >
          <span class="line" v-if="index == currentIndex">-----------</span>
        </div>
      </div>
    </div>
    <div
      class="line-wrapper"
      @drop.stop="drop($event, resultList)"
      @dragover.stop="dragover($event)"
      @dragenter.stop="dragenter($event, 2, null)"
      @dragleave.stop="dragleave($event)"
    >
      <div class="await-result" v-if="haveEle">----------- -----------</div>
    </div>
  </div>
</template>


<script>
export default {
  name: "form-multiple",
  components: {
    "ele-multiple": () => import("./multiple.vue"),
  },
  props: {
    resultList: {
      type: Array,
      required: true,
    },
    isMultiple: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      haveEle: false,
      currentIndex: null,
    };
  },
  methods: {
    drop(e, arr) {
      e.preventDefault();
      try {
          var data = JSON.parse(e.dataTransfer.getData("Text"));
      } catch(e) {
          this.haveEle = false;
            this.currentIndex = null;
            return;
      }
      
      if (this.isMultiple && data.ele == "group") {
        this.haveEle = false;
        this.currentIndex = null;
        return;
      }
      if (this.currentIndex != null) {
        arr.splice(this.currentIndex + 1, 0, data);
      } else {
        arr.push(data);
      }

      this.haveEle = false;
      this.currentIndex = null;

    },
    dragover(e) {
      e.preventDefault();
    },

    //当被鼠标拖动的对象进入其容器范围内时触发此事件
    dragenter(e, type, index) {
      if (type == 2) {
        this.haveEle = true;
        this.currentIndex = null;
      } else {
        this.haveEle = false;
        this.currentIndex = index;
      }
    },
    //当被鼠标拖动的对象离开其容器范围内时触发此事件
    dragleave(e) {
      this.haveEle = false;
      this.currentIndex = null;
    },

    remove(index) {
        this.$emit('update:resultList', this.resultList.filter((item, idx) => idx != index))
    },

    edit(item) {
        this.$emit('edit', item)
    }


  },
};
</script>