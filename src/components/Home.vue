<script setup>
import { reactive, ref, onMounted, watch } from 'vue';
import { useData } from "../http/data";
import Datepicker from '@vuepic/vue-datepicker';
import Swal from 'sweetalert2';
import '@vuepic/vue-datepicker/dist/main.css';

const data = useData();
const skills = ref([]);
const jobs = ref([]);

const formLamaran = reactive({
  name: "",
  jobsId: "",
  phone: "",
  email: "",
  skill: [],
  year: new Date().getFullYear(),
});

const fetchData = async () => {
  const skillsData = await data.getSkills();
  const jobsData = await data.getJobs();
  skills.value = skillsData.data;
  jobs.value = jobsData.data;

  initSelect2();
}

const resetForm = () => {
  formLamaran.name = "";
  formLamaran.jobsId = "";
  formLamaran.phone = "";
  formLamaran.email = "";
  formLamaran.skill = [];
  formLamaran.year = new Date().getFullYear();
};

const submitForm = async () => {
  try {
    if (
      !formLamaran.name ||
      !formLamaran.jobsId ||
      !formLamaran.phone ||
      !formLamaran.email
    ) {
      Swal.fire("Error", "Please fill in all required fields", "error");
      return;
    }

    const res = await data.storeData(formLamaran);
    if (res.status === 201) {
      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Lamaran berhasil dikirim'
      });

      resetForm();
    }
    if (res.status === 400) {
      Swal.fire({
        icon: 'info',
        title: 'Gagal!',
        text: 'Email yang anda masukkan sudah pernah melamar dijabatan tersebut, silahkan memilih jabatan yang lain.'
      });
    };
  } catch (err) {
    Swal.fire({
      icon: 'error',
      title: 'Gagal!',
      text: 'Silahkan coba kembali'
    });
  }
};

const initSelect2 = () => {
  $('.select2bs4').select2({ theme: 'bootstrap4' });
};

onMounted(() => {
  fetchData();
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

          <form @submit.prevent="submitForm">
            <div class="form-group">
              <label for="name">Nama Lengkap</label>
              <input type="name" name="name" class="form-control" id="name" v-model="formLamaran.name"
                placeholder="Cth: Jhonatan Akbar" required>
            </div>
            <div class="form-group">
              <label>Jabatan</label>
              <select class="form-control select2bs4" style="width: 100%;" v-model="formLamaran.jobsId" required>
                <option selected="selected" disabled>Pilih Jabatan</option>
                <option v-for="(job, index) in jobs" :key="index" :value="job.id">{{ job.name }}</option>
              </select>
            </div>
            <div class="form-group">
              <label for="telp">Telepon</label>
              <input type="number" name="telp" class="form-control" id="telp" v-model="formLamaran.phone"
                placeholder="Cth: 0893239851289" required>
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" name="email" class="form-control" id="email" v-model="formLamaran.email"
                placeholder="Cth: test@example.com" required>
            </div>
            <div class="form-group">
              <label for="tl">Tahun Lahir</label>
              <Datepicker v-model="formLamaran.year" year-picker required />
            </div>
            <div class="form-group">
              <label>Skill Set</label>
              <select class="form-control select2bs4" multiple="multiple" v-model="formLamaran.skill"
                style="width: 100%;">
                <option v-for="(skill, index) in skills" :key="index" :value="skill.id">{{ skill.name }}</option>
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
