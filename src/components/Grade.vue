<template>
    <div>
        <div class="container-fluid px-4">
            <h1 class="mt-4">Grade</h1>
            <ol class="breadcrumb mb-4">
                <li class="breadcrumb-item"><a href="">Dashboard</a></li>
                <li class="breadcrumb-item active">Grade</li>
            </ol>

            <div class="card mb-4">
                <div class="card-header">
                    <i class="fas fa-table me-1"></i>
                    List Grade

                    <button @click="Add()" data-bs-toggle="modal" data-bs-target="#grade_modal" class="btn btn-primary btn-sm float-end"><i class="fas fa-plus fa-fw"></i> Add Grade</button>
                </div>
                <div class="card-body">
                    <table id="datatablesSimple" class="table table-hover table-striped">
                        <thead>
                            <tr>
                                <th>CLASS ID</th>
                                <th>CLASS NAME</th>
                                <th>GROUP</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th>CLASS ID</th>
                                <th>CLASS NAME</th>
                                <th>GROUP</th>
                                <th>ACTION</th>
                            </tr>
                        </tfoot>
                        <tbody>
                            <tr v-for="lg in list_grade" :key="lg">
                                <td>{{ lg.class_id }}</td>
                                <!-- <td><img :src="api_url2 + '/images/' + lb.image" width="150"></td> -->
                                <td>{{ lg.class_name }}</td>
                                <td>{{ lg.group }}</td>
                                
                                <td>
                                    <!-- <button class="btn btn-default" @click="Edit(lg)" data-bs-toggle="modal" data-bs-target="#bookcover_modal" ><i class="fas fa-image fa-fw"></i></button> -->
                                    <button class="btn btn-info" @click="Edit(lg)" data-bs-toggle="modal" data-bs-target="#grade_modal"><i class="fas fa-pencil-alt fa-fw"></i></button>
                                    <button class="btn btn-danger" @click="Delete(lg.class_id)"><i class="fas fa-trash-alt fa-fw"></i></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Modal -->
                <div class="modal fade" id="grade_modal" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Grade Data</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="class_name" class="form-label">Class Name</label>
                            <input type="text" class="form-control" id="class_name" v-model="class_name" placeholder="Class Name">
                        </div>

                        <div class="mb-3">
                            <label for="group" class="form-label">GROUP</label>
                            <input type="text" class="form-control" id="group" v-model="group" placeholder="Group">
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
        <!-- <div class="modal fade" id="bookcover_modal" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Book Cover</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">

                        <div class="mb-3">
                            <label for="book_cover" class="form-label">Book Cover</label>
                            <input type="file" class="form-control" id="book_cover" @change="uploadCover($event)">
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" @click="Upload(book_id)" data-bs-dismiss="modal">Submit</button>
                    </div>
                </div>
            </div>
        </div> -->
        <!-- penutup tambahan -->
    </div>
</template>
<script>
module.exports = {
    // state
    data : function(){
        return {
            class_id : "",
            class_name : "",
            group : "",
            action: "", //untuk membedakan di BE ini nanti post/put
            list_grade: [],
        }
    },
    methods: {
        getData: function(){
            // token
            let token = {
                headers: { "Authorization": "Bearer " + this.$cookies.get('Authorization') }
            }
            axios.get(api_url + "/Grade", token)
            .then(response => {
                this.list_grade = response.data;
            })
        }, 
        // Add book
        Add: function() {
            this.class_id = ""
            this.class_name = ""
            this.group = ""
            this.action = "insert"
        },
        Edit : function(lg){
            this.class_id = lg.class_id
            this.class_name = lg.class_name
            this.group = lg.group
            this.action = "update"
        },
        // uploadCover: function(e){
        //     this.book_cover=e.target.files[0]
        // },
        // Upload: function(id){
        //      let token ={
        //         headers : {"Authorization" : "Bearer " + this.$cookies.get("Authorization"),'Content-Type':'multipart/form-data'}
        //     }

        //     let form = new FormData()
        //     form.append('book_cover', this.book_cover)

        //     axios.post(api_url + '/Book/UploadCover/'+ id, form, token)
        //         .then(response => {
        //             alert(response.data.message)
        //         })
        //         this.getData()
        // },
        Save: function(){
            //mapping header token
            let token ={
                headers : {"Authorization" : "Bearer " + this.$cookies.get("Authorization")}
            }
            // mapping data
            let form = {
                //backend       //state
                'class_name': this.class_name,
                'group': this.group
                
            }
            if(this.action === 'insert'){ //post

                axios.post(api_url + '/Grade', form, token)
                .then(response => {
                    alert(response.data.message)
                    this.getData
                })
            }else{//put
            
                axios.put(api_url + '/Grade/' + this.class_id, form, token)
                .then(response => {
                    alert(response.data.message)
                    this.getData
                })
            }
            //this.getData()

        },
        Delete: function(class_id){
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
                    axios.delete(api_url + '/Grade/' + class_id, token)
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
