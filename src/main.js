//base URL API
var api_url= "http://localhost:8000/api";
var api_url2= "http://localhost:8000";

//Konfigurasi route
var router =[
    {
        path: "/",
        name: "Home",
        component: httpVueLoader("./src/components/Home.vue")
    },
    {
        path: "/book",
        name: "Book",
        component: httpVueLoader("./src/components/Book.vue")
    },
    {
        path: "/grade",
        name: "Grade",
        component: httpVueLoader("./src/components/Grade.vue")
    },
    {
        path: "/member",
        name: "Member",
        component: httpVueLoader("./src/components/Member.vue")
    },
    {
        path: "/bookBorrow",
        name: "BookBorrow",
        component: httpVueLoader("./src/components/BookBorrow.vue")
    },
];
// untuk mengedit url
var routers = new VueRouter({routes: router, base:"/" });

//instance vue
var app = new Vue({
    el: "#app", // element yang di vue kan
    components:{
        "login": httpVueLoader("./src/components/Login.vue"),
        "apps" : httpVueLoader("./src/components/App.vue")
    },
    data:{//state/variable global
        user:{
            id:"",
            name:"",
            email:"",
            type:""
        },
        mycomponent:"",
    },
    router: routers,
    methods:{
        CekToken : function(){
            //cek cookies,apakah sudah punya token?
            if(this.$cookies.isKey('Authorization')){
    
            //     //validasi token dulu
                let token = {
                    headers : { "Authorization" : "Bearer " + this.$cookies.get('Authorization')}
                }
                axios.get(api_url + '/Login_check', token)
                .then(response => {
                 //console.log(response)
                    if(response.data.status === 1){
                        //load component apps
                        this.mycomponent = "apps";
                    }else{
                        this.mycomponent = "login";
                    }
                })
            }else{
                //kalau tidak punya langsung ke login
                this.mycomponent = "login";
            } 
        }
    },
    mounted(){
        this.CekToken();
    }
});