<script setup>
import { ref, onMounted } from 'vue';
import { useData } from "../http/data";
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';


const data = useData();
const skills = ref([]);
const jobs = ref([]);
const selectedJob = ref('');
const selectedSkill = ref([]);

const fetchData = async () => {
  const skillsData = await data.getSkills();
  const jobsData = await data.getJobs();
  skills.value = skillsData.data;
  jobs.value = jobsData.data;
}

const year = ref(new Date().getFullYear());
const initSelect2 = () => {
  $('.select2bs4').select2({ theme: 'bootstrap4' });
};

onMounted(() => {
  fetchData();
  initSelect2();
});
</script>

<template>
  <body class="hold-transition register-page">
    <div class="register-box">
      <div class="register-logo">
        <img src="../assets/img/energeek2.png" width="200px" alt="logo">
      </div>

      <div class="card">
        <div class="card-body register-card-body">
          <h5 class="login-box-msg">Apply Lamaran</h5>

          <form method="post">
            <div class="form-group">
              <label for="name">Nama Lengkap</label>
              <input type="name" name="name" class="form-control" id="name" placeholder="Cth: Jhonatan Akbar">
            </div>
            <div class="form-group">
              <label>Jabatan</label>
              <select class="form-control select2bs4" style="width: 100%;">
                <option selected="selected" disabled>Pilih Jabatan</option>
                <option v-for="(job, index) in jobs" :key="index">{{ job.name }}</option>
              </select>
            </div>
            <div class="form-group">
              <label for="telp">Telepon</label>
              <input type="telp" name="telp" class="form-control" id="telp" placeholder="Cth: 0893239851289">
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" name="email" class="form-control" id="email" placeholder="Cth: 0893239851289">
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <Datepicker v-model="year" year-picker />
            </div>
            <div class="form-group">
              <label>Skill Set</label>
              <select class="form-control select2bs4" multiple="multiple" style="width: 100%;">
                <option disabled>Pilih Jabatan</option>
                <option v-for="(skill, index) in skills" :key="index">{{ skill.name }}</option>
              </select>
            </div>
            <div class="row">
              <!-- /.col -->
              <div class="col-12">
                <button type="submit" class="btn btn-success btn-block">
                  Apply
                </button>
              </div>
              <!-- /.col -->
            </div>
          </form>
        </div>
        <!-- /.form-box -->
      </div>
      <!-- /.card -->
    </div>
    <!-- /.register-box -->
  </body>
</template>
