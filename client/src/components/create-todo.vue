<template>
    <div class="create-todo">
        <input placeholder="Title" v-model="title">
        <input @keydown.tab.prevent="someFunction" list="categories" placeholder="Category" v-model="categoryValue">
        <datalist id="categories">
            <option v-for="(item) in categories" :key="item._id" :value="item.category"/>
        </datalist>
        <br>
        <textarea :key="categoryValue" style="width: 300px;" placeholder="Description" v-model="description">
        </textarea>
        <br>
        <button @click="createTodo">Create TODO </button>
    </div>
</template>

<script>
export default {
    name: "CreateTodo",
    data(){
        return{
            apiURL: 'http://localhost:3030/api/v1',
            title: "",
            description: "",
            categoryValue: "",
        }
    },
    props:{
        categories: [],
    },
    methods:{
        createTodo(){
            console.log("category val : ",this.categoryValue); 
            const Data = {
                category: this.categoryValue,
                list: [
                    {
                        title: this.title,
                        description: this.description,
                        timeTag: 5,
                    }
                ]
            }
            console.log(Data); 
            this.XHR(Data, 'POST', this.apiURL); 
            this.$emit('CTodoHandler',"reload"); 
        },
        XHR(data, type, url){
            var xhr = new XMLHttpRequest();
            xhr.open(type,url, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(data)); 
            this.resetForm();
        },
        resetForm(){
            this.title = "";
            this.description = "";
            this.categoryValue = "";        
        }
    },
}
</script>

<style scoped>
</style>