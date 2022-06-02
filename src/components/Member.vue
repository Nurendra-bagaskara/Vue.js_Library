<template>
    <div>
        <div class="container-fluid px-4">
            <h1 class="mt-4">Member</h1>
            <ol class="breadcrumb mb-4">
                <li class="breadcrumb-item"><a href="">Dashboard</a></li>
                <li class="breadcrumb-item active">Member</li>
            </ol>

            <div class="card mb-4">
                <div class="card-header">
                    <i class="fas fa-table me-1"></i>
                    List Member

                    <button @click="Add()" data-bs-toggle="modal" data-bs-target="#student_modal" class="btn btn-primary btn-sm float-end"><i class="fas fa-plus fa-fw"></i> Add Member</button>
                </div>
                <div class="card-body">
                    <table id="datatablesSimple" class="table table-hover table-striped">
                        <thead>
                            <tr>
                                <th>Student id</th>
                                <th>Foto</th>
                                <th>Student name</th>
                                <th>Date of birth</th>
                                <th>Gender</th>
                                <th>Address</th>
                                <th>Class Id</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th>Student id</th>
                                <th>Foto</th>
                                <th>Student name</th>
                                <th>Date of birth</th>
                                <th>Gender</th>
                                <th>Address</th>
                                <th>class Id</th>
                                <th>ACTION</th>
                            </tr>
                        </tfoot>
                        <tbody>
                            <tr v-for="lm in list_member" :key="lm">
                                <td>{{ lm.student_id }}</td>
                                <td><img :src="api_url2 + '/foto/' + lm.foto_student" width="150"></td>
                                <td>{{ lm.student_name }}</td>
                                <td>{{ lm.date_of_birth }}</td>
                                <td>{{ lm.gender }}</td>
                                <td>{{ lm.address }}</td>
                                <td>{{ lm.class_id }}</td>
                                <!-- <td>{{ lm.foto_student }}</td> -->
                            
                                <td>
                                    <button class="btn btn-default" @click="Edit(lm)" data-bs-toggle="modal" data-bs-target="#imageStudent_modal" ><i class="fas fa-image fa-fw"></i></button>
                                    <button class="btn btn-info" @click="Edit(lm)" data-bs-toggle="modal" data-bs-target="#student_modal"><i class="fas fa-pencil-alt fa-fw"></i></button>
                                    <button class="btn btn-danger" @click="Delete(lm.student_id)"><i class="fas fa-trash-alt fa-fw"></i></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Modal -->
                <div class="modal fade" id="student_modal" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Student Data</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="student_name" class="form-label">Student Name</label>
                            <input type="text" class="form-control" id="student_name" v-model="student_name" placeholder="Student Name">
                        </div>

                        <div class="mb-3">
                            <label for="date_of_birth" class="form-label">Student Birth</label>
                            <input type="date" class="form-control" id="date_of_birth" v-model="date_of_birth" placeholder="date_of_birth">
                        </div>

                        <div class="mb-3">
                            <label for="gender" class="form-label">Gender</label>
                            <select class="form-control" id="gender" v-model="gender" placeholder="Gender">
                                <option value="L">Laki-laki</option>
                                <option value="P">Perempuan</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="address" class="form-label">Address</label>
                            <input type="text" class="form-control" id="address" v-model="address" placeholder="Address">
                        </div>
                        <div>
                            <label for="class_id" class="form-label">Class</label>
                            <select class="form-control" id="class" v-model="class_id" required>
                                <option v-for="lg in list_grade" :key="lg" :value="lg.class_id">
                                    {{lg.class_name}} => {{lg.group}}
                                </option>
                            </select>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" @click="Save()" data-bs-dismiss="modal">Submit</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- tambahannya -->
        <div class="modal fade" id="imageStudent_modal" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Image Student</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">

                        <div class="mb-3">
                            <label for="image_student" class="form-label">Image Student</label>
                            <input type="file" class="form-control" id="image_student" @change="uploadCover($event)">
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" @click="Upload(student_id)" data-bs-dismiss="modal">Submit</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- penutup tambahan -->
    </div>
</template>

<script>
module.exports = {
    // state
    data : function(){
        return {
            student_id: "",
            student_name: "",
            date_of_birth: "",
            gender: "",
            address: "",
            class_id:"",
            image_student:"",
            action: "", //untuk membedakan di BE ini nanti post/put
            list_grade:[],
            list_member: [],
        }
    },
    methods: {
        getData: function(){
            // token
            let token = {
                headers: { "Authorization": "Bearer " + this.$cookies.get('Authorization') }
            }
            axios.get(api_url + "/Students", token)
            .then(response => {
                this.list_member = response.data;
            })
            axios.get(api_url + "/Grade", token)
            .then(response => {
                this.list_grade = response.data;
            })
        }, 
        // Add book
        Add: function() {
            this.student_id = ""
            this.student_name = ""
            this.date_of_birth = ""
            this.gender = ""
            this.address = ""
            this.class_id = ""
            this.action = "insert"
        },
        Edit : function(lm){
            this.student_id = lm.student_id
            this.student_name = lm.student_name
            this.date_of_birth = lm.date_of_birth
            this.gender = lm.gender
            this.address = lm.address
            this.class_id = lm.class_id
            this.action = "update"
        },
        uploadCover: function(e){
            this.foto_student=e.target.files[0]
        },
        Upload: function(id){
             let token ={
                headers : {"Authorization" : "Bearer " + this.$cookies.get("Authorization"),'Content-Type':'multipart/form-data'}
            }

            let form = new FormData()
            form.append('foto_student', this.foto_student)

            axios.post(api_url + '/Students/uploadfoto/'+ id, form, token)
                .then(response => {
                    alert(response.data.message)
                })
                this.getData()
        },
        Save: function(){
            //mapping header token
            let token ={
                headers : {"Authorization" : "Bearer " + this.$cookies.get("Authorization")}
            }
            // mapping data
            let form = {
                //backend       //state
                'student_name': this.student_name,
                'date_of_birth': this.date_of_birth,
                'gender' : this.gender,
                'address' : this.address,
                'class_id' : this.class_id 
                
            }
            if(this.action === 'insert'){ //post

                axios.post(api_url + '/Students', form, token)
                .then(response => {
                    alert(response.data.message)
                    this.getData
                })
            }else{//put
            
                axios.put(api_url + '/Students/' + this.student_id, form, token)
                .then(response => {
                    alert(response.data.message)
                    this.getData
                })
            }
            //this.getData()

        },
        Delete: function(student_id){
            //mapping header token
            let token = {
                headers : {"Authorization" : "Bearer " + this.$cookies.get("Authorization")}
            }

            Swal.fire({
                title: 'Apakah Kamu Yakin?',
                text: "Pikirkan Baik-baik!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Confirm',
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(api_url + '/Students/' + student_id, token)
                    .then(response => {
                        Swal.fire({
                            title: 'Berhasil!',
                            text: response.data.message,
                            icon: 'success',
                            confirmButtonText: 'ok'
                        })

                        this.getData()
                    })
                }else{
                    //alert("Data Tidak Jadi Dihapus.")
                    Swal.fire({
                        title: 'Batal!',
                        text: 'Data tidak jadi dihapus!!',
                        icon: 'error',
                        confirmButtonText: 'ok'
                    })
                }
            })
        }
    },
    mounted(){
        this.getData();
    }
}
</script>
