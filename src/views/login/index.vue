<template>
  <div class="login">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>欢迎登录</span>
      </div>
      <el-form :label-position="labelPosition" label-width="80px" :model="userForm" :rules="userFormRules" ref="userForm">
        <el-form-item label="用户名:" prop="username">
          <el-input v-model="userForm.username" prefix-icon="el-icon-user-solid"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input v-model="userForm.password" prefix-icon="el-icon-unlock"></el-input>
        </el-form-item>
          <el-button type="primary" class="submitBtn" @click="loginEvent">登陆</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>

export default {
  name: 'login',
  data() {
    return {
      labelPosition: 'right',
      userForm: {
        username: '',
        password: '',
      },
      userFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
      },
    };
  },
  
  methods: {
    loginEvent() {
      this.$refs.userForm.validate((valid) => {
          if (valid) {
            this.$message.success('登陆成功')
            location.href = '/wecome';
            // this.$router.push({
            //   path: '/wecome',
            //   name: 'wecome',
            //   query: {
            //     'b': 'c'
            //   },
            //   params: {
            //     q: 123
            //   },
            //   meta: {
            //     w: 10
            //   }
            // })
          }
        });
    }
  }
}
</script>

<style lang="scss" scope>
  .login {
    background: url('/image/login_bg.jpg') no-repeat;
    background-size: cover;
    background-position: center;
    height: 100%;

    .box-card {
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(50%, -30%);
      box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
    }
    .submitBtn {
      display: block;
      margin: 0 auto;
      width: 100px;
    }
  }
</style>