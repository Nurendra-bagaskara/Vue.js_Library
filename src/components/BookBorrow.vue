<template>
    <div>
    <div class="container-fluid px-4">
      <h1 class="mt-4">Book Borrow</h1>
      <ol class="breadcrumb mb-4">
        <li class="breadcrumb-item"><a href="">Dashboard</a></li>
        <li class="breadcrumb-item active">Book Borrow</li>
      </ol>

      <div class="card mb-4">
        <div class="card-header"><i class="fas fa-table me-1"></i>
          List Book
          <button @click="Add()" data-bs-toggle="modal" data-bs-target="#borrow_modal" class="btn btn-primary btn-sm float-end"><i class="fas fa-plus fa-fw"></i> Add Borrow</button>
        </div>
        <div class="card-body">
          <table id="datatablesSimple" class="table table-hover table-striped">
            <thead>
              <tr>
                <th>BOOK BORROW ID </th>
                <th>STUDENT NAME</th>
                <th>GRADE NAME</th>
                <th>BORROW DATE</th>
                <th>RETURN DATE</th>
                <!-- <th>STATUS</th> -->
                <th>ACTION</th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <th>BOOK BORROW ID</th>
                <th>STUDENT NAME</th>
                <th>GRADE NAME</th>
                <th>BORROW DATE</th>
                <th>RETURN DATE</th>
                <!-- <th>STATUS</th> -->
                <th>ACTION</th>
              </tr>
            </tfoot>
            <tbody>
              <tr v-for="lbr in list_borrow" :key="lbr">
                <td>{{ lbr.book_borrow_id }}</td>
                <td>{{ lbr.student_name }}</td>
                <td>{{ lbr.class_name }}</td>
                <td>{{ lbr.date_of_borrowing }}</td>
                <td>{{ lbr.date_of_returning }}</td>
                <td>
                  <button class="btn btn-secondary" v-on:click="borrowDetail(lbr.book_borrow_id)" data-bs-toggle="modal" data-bs-target="#detail_modal">
                    <i class="fas fa-clipboard"></i></button
                  >&nbsp;
                  <button class="btn btn-info" v-on:click="returnData(lbr.book_borrow_id)" data-bs-toggle="modal" data-bs-target="#return_modal">
                    <i class="fas fa-solid fa-check"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- modal borrow -->
      <div class="modal fade" id="borrow_modal" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">Borrow Data</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-md-3">
                  <div class="card">
                    <div class="card-body">
                      <div class="mb-3">
                        <label for="student_id" class="form-label"
                          >Student</label
                        >
                        <select class="form-control" id="student_id" v-model="student_id">
                          <option value="" disabled>-- Choose Student --</option>
                          <option v-for="lm in list_member" :key="lm" v-bind:value="lm.student_id">
                            {{ lm.student_name }}
                          </option>
                        </select>
                      </div>

                      <div class="mb-3">
                        <label for="born" class="form-label"><h6>The return date of the book will be automatically filled in 7 days after the borrowing date</h6></label>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-md-9">
                  <div class="card">
                    <div class="card-body">
                      <button @click="AddItem" class="btn btn-sm btn-primary text-white">
                        <i class="mdi mdi-plus btn-icon-prepend"></i>Add Item
                      </button>
                      <br /><br />
                      <div class="row" v-for="(detail, counter) in transaction_detail" :key="counter">
                        <br /><br />
                        <div class="col-md-8">
                          <div class="form-group">
                            <select
                              class="form-control"
                              v-model="detail.book_id"
                            >
                              <option value="" disabled>
                                -- Choose Book --
                              </option>
                              <option v-for="lb in list_book" :key="lb.book_id" :value="lb.book_id">
                                {{ lb.book_name }} - {{ lb.author }}
                              </option>
                            </select>
                          </div>
                        </div>
                        <div class="col-md-3">
                          <div class="form-group">
                            <input class="form-control" placeholder="Qty" type="number" v-model="detail.qty"/>
                          </div>
                        </div>
                        <div class="col-md-1">
                          <button class="btn btn-danger btn-sm" @click="DeleteItem(counter)">
                            -
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                Cancel
              </button>
              <button class="btn btn-primary" @click="Save()" data-bs-dismiss="modal">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- modal detail -->
    <div class="modal fade" id="detail_modal" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="card mb-4">
          <div class="card-body">
            <table id="datatablesSimple" class="table table-hover table-striped">
              <thead>
                <tr>
                  <th>ID DETAIL</th>
                  <th>BOOK NAME</th>
                  <th>AUTHOR</th>
                  <th>BOOK COVER</th>
                  <th>QTY</th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th>ID DETAIL</th>
                  <th>BOOK NAME</th>
                  <th>AUTHOR</th>
                  <th>BOOK COVER</th>
                  <th>QTY</th>
                </tr>
              </tfoot>
              <tbody>
                <tr v-for="detail in list_detail_borrow" :key="detail">
                  <td>{{ detail.book_borrow_detail_id }}</td>
                  <td>{{ detail.book_name }}</td>
                  <td>{{ detail.author }}</td>
                  <td>
                    <img :src="api_url2 + '/images/' + detail.image" width="100"/>
                  </td>
                  <td>{{ detail.qty }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- modal return -->
    <div
      class="modal fade"
      id="return_modal"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="card mb-4">
          <div class="card-body">
            <table
              id="datatablesSimple"
              class="table table-hover table-striped"
            >
              <thead>
                <tr>
                  <th>ID BORROW</th>
                  <th>DATE OF RETURN</th>
                  <th>FINE</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th>ID BORROW</th>
                  <th>DATE OF RETURN</th>
                  <th>FINE</th>
                  <th>ACTION</th>
                </tr>
              </tfoot>
              <tbody>
                <tr v-for="lr in list_return" :key="lr">
                  <td>{{ lr.id_borrowing_book }}</td>
                  <td>{{ lr.dateOfReturn }}</td>
                  <td>{{ lr.fine }}</td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-secondary btn-sm"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      v-on:click="returnBook(lr.id_borrowing_book)"
                      class="btn btn-primary btn-sm"
                      data-dismiss="modal"
                    >
                      Return Book
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <!-- closing modal -->
  </div>
  <!-- </div>
    </div> -->
</template>
<script>
module.exports = {
  data: function () {
    return {
      list_borrow: [],
      list_member: [],
      list_grade: [],
      list_book: [],
      list_detail_borrow: [],
      list_return: [],
      transaction_detail: [],
      // v-model
      student_id: "",
      student_name: "",
      class_name: "",
      date_of_borrowing: "",
      date_of_returning: "",
      book_borrow_detail_id: "",
      book_borrow_id: "",
      detail: "",
      book_id: "",
      book_name: "",
      author: "",
      image: "",
      qty: "",
      Return: [],
      Return: "",
    };
  },
  methods: {
    getData: function () {
      let token = {
        headers: {
          Authorization: "Bearer " + this.$cookies.get("Authorization"),
        },
      };
      axios.get(api_url + "/BookBorrow", token).then((response) => {
        this.list_borrow = response.data;
        console.log(this.list_borrow);
      });
      axios.get(api_url + "/Students", token).then((response) => {
        this.list_member = response.data;
      });
      axios.get(api_url + "/Book", token).then((response) => {
        this.list_book = response.data;
      });
      axios.get(api_url + "/Grade", token).then((response) => {
        this.list_grade = response.data;
      });
      axios.get(api_url + "/BookBorrowDetails", token).then((response) => {
        this.list_detail_borrow = response.data;
      });
      axios.get(api_url + "/BookReturn", token).then((response) => {
        this.list_return = response.data;
      });
    },
    Add: function () {
      (this.student_id = ""),
      (this.student_name = ""),
      (this.borrow_date = ""),
      (this.return_date = ""),
      (this.action = "insert");
    },
    AddDetail: function (data) {
      this.student_id = data.student_id;
      this.borrow_date = data.borrow_date;
      this.return_date = data.return_date;
    },
    // ADD DETAIL BORROWING BOOK
    AddItem() {
      this.transaction_detail.push({
        book_id: "",
        qty: "",
      });
    },
    DeleteItem(counter) {
      this.transaction_detail.splice(counter, 1);
    },
    Save: function () {
      let token = {
        headers: {
          Authorization: "Bearer " + this.$cookies.get("Authorization"),
        },
      };
      //mapping data
      let form = {
        //backend       //state
        student_id: this.student_id,
        student_name: this.student_name,
        date_of_returning: this.date_of_returning,
        detail: this.transaction_detail,
      };
      if (this.action == "insert") {
        axios.post(api_url + "/BookBorrow", form, token).then((response) => {
          Swal.fire({
            tittle: "Success!",
            text: response.data.message,
            icon: "success",
            confirmButtonText: "OK!",
          });
        });
        this.getData();
      } else {
      }
    },
    borrowDetail(book_borrow_detail_id) {
      let token = {
        headers: {
          Authorization: "Bearer " + this.$cookies.get("Authorization"),
        },
      };
      // console.log(id);
      axios
        .get(api_url + "/BookBorrowDetails/" + book_borrow_detail_id, token)
        .then((response) => {
          this.list_detail_borrow = response.data;
        });
    },
    returnBook(id_borrowing_book) {
      let token = {
        headers: {
          Authorization: "Bearer " + this.$cookies.get("Authorization"),
        },
      };
      let form = {
        id_borrowing_book: id_borrowing_book,
      };
      axios.post(api_url + "/return" + form, token).then((response) => {
        Swal.fire({
          tittle: "Success!",
          text: response.data.message,
          icon: "success",
          confirmButtonText: "OK!",
        });
        this.getData();
      });
    },
    returnData(id_borrowing_book) {
      let token = {
        headers: {
          Authorization: "Bearer " + this.$cookies.get("Authorization"),
        },
      };
      axios
        .get(api_url + "/return/{book_id_return}/" + id_borrowing_book, token)
        .then((response) => {
          this.list_return = response.data;
        });
    },
    isDisabled() {
      return true;
    },
  },
  mounted() {
    this.getData();
    this.isDisabled();
  },
};
</script>
