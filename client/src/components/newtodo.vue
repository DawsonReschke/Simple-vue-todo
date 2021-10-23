<template>
    <div class="new-todo">
        <input v-if="viewIndex == -1" placeholder="Title" v-model="currentTodoName">
        
        <br>
        <textarea style="float: center;" placeholder="Description" v-model="currentTodoDesc"></textarea>
        <br>    
        <button @click.prevent="submitTodo"> {{isNew ? ButtonStrs[1] : ButtonStrs[0]}} </button>
        <br>
        <div class="todo-list">
            <div class="cat-container">
                <div class="child">
                <Category class="category" :cat="'Vuejs'" :todos="todos"/>
                </div><div class="child">
                <Category class="category" :cat="'Nodejs'" :todos="todos"/>
                </div><div class="child">
                <Category class="category" :cat="'Processing'" :todos="todos"/>
                </div>
                
            </div>
            <!-- <ul> 
                <li class="todo-style" v-for="(item, index) in todos" :key="item.id">  
                    <a>
                        <sup>{{item.timeTag}}</sup><a  v-bind:class="getClass(item)"  @click="completeTodo(index)"> {{item.title}}</a>
                        <button @click="deleteTodo(index)"> delete   </button>
                        <button @click="changeTodo(index)"> change </button>
                     <h1 class="hidden-hover"> {{item.description}} </h1>
                    </a>
                </li>
            </ul> -->
        </div>
        <!-- <input type="textarea" v-model="currentTodoDesc"> -->
    </div>
</template>

<script>
import Category from "./cat-components/category.vue"

export default {
    name: "NewTodo",
    data() { 
        return{
            mainURL : 'http://localhost:3030/api/v1',
            isNew: true,
            ButtonStrs: ["submit changes", "create new Todo"],
            currentTodoName: "",
            currentTodoID: 0,
            currentTodoDesc: "",
            currentTodoTime: 5,
            todos: [],
        }
    },
    props:{
        viewIndex: Number,
    },
    components:{
        Category,
    },
    filters: {
    },
    computed:{
    },
    methods: {
        OrderBy(){
            let completed = []
            let temp = []; 
            for(let i = 0; i < this.todos.length; i++){
                if(this.todos[i].completed == true){
                    completed.push(this.todos[i]); 
                }else{
                    temp.push(this.todos[i]); 
                }
            }
            for(let k = 0; k < completed.length; k++){
                temp.push(completed[k]); 
            }
            return temp; 
        },
        getClass(val){
            return val.completed ? 'line-through' : ''; 
        },
        async getData() { 
            try{
                let response = await fetch(this.mainURL);
                this.todos = await response.json();
                this.todos = this.OrderBy(); 
                console.log(this.todos); 
            }catch(error){
                console.log(error); 
            }
        },
        deleteTodo(val){
            const id = this.todos[val]._id; 
            const URL = `${this.mainURL}/${id}`;
            const data = {}; 
            this.XHR(data,"DELETE",URL);
        },
        changeTodo(val){
            this.isNew = false; 
            this.setCurrentTodo(val);                      
        },
        completeTodo(val){
            this.setCurrentTodo(val); 
            this.currentTodoCompleted = !this.currentTodoCompleted;
            this.submitChangedTodo();
        },
        submitTodo() { 
            if(this.isNew){
                this.saveCurrentTodo(); 
            }else{
                this.submitChangedTodo(); 
            }
        },
        // function for changing the data in the todo 
        //such as title, description 
        submitChangedTodo(){
            const data = { 
                title: this.currentTodoName,
                description: this.currentTodoDesc,
                timeTag: this.currentTodoTime,
                completed: this.currentTodoCompleted,
            }
            console.log(this.currentTodoDesc)
            const URL = `${this.mainURL}/${this.currentTodoID} `
            this.XHR(data,"PUT", URL)
        },
        saveCurrentTodo() { 
            const data = { 
                title: this.currentTodoName,
                description: this.currentTodoDesc,
                timeTag: this.currentTodoTime
            }
            this.XHR(data, "POST", this.mainURL,)
        },
        setCurrentTodo(val){
            this.currentTodoName = this.todos[val].title;
            this.currentTodoDesc = this.todos[val].description;
            this.currentTodoCompleted = this.todos[val].completed;
            this.currentTodoID = this.todos[val]._id; 
        },
        resetForm(){
        // console.log("this form should reset"); 
            this.currentTodoName = ""; 
            this.currentTodoDesc = ""; 
            this.currentTodoTime = 5; 
            this.currentTodoCompleted = false; 
            this.currentTodoID = 0; 
    },
        XHR(data, type, url){
            var xhr = new XMLHttpRequest();
            xhr.open(type,url, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(data)); 
            setTimeout(this.getData, 500);
            this.resetForm();
        },
    },
    created() { 
        this.getData(); 
    }
}
</script>


<style scoped>

.line-through{
    text-decoration: line-through;
}

.hidden-hover{
    display: none;
}
.todo-list a:hover .hidden-hover{
    display: inline-block; 
    padding-inline: 410px;
    width: 600px; 
    text-align: left;
    }
.todo-style{
    text-align: left;
}

.child{
    float: left; 
    width: 33.33%;
}

.cat-container{
     /* border: 2px solid red; */
     float:center;
    padding: 10px;
}


</style>