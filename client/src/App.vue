<template>
  <div id="app">
    <!-- <NewTodo :isChangingTodo="isChangingTodo" :viewIndex="viewIndex"/> -->
    <div v-if="!loading && isChangingTodo" class="change-todo">
    <ChangeTodo @changeTodoHandler="changeTodoHandler" :todo="todoToChange"/>
    </div>
    <div v-if="!isChangingTodo" class="create-todo">
   <CreateTodo @CTodoHandler="CTodoHandler" :categories="categories"/>
    </div>
    <br>
    <DisplayTodo @catHandler="catHandler" :categories="categories"/>
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  </div>
</template>

<script>
  // import NewTodo from "./components/newtodo.vue"
  import CreateTodo from "./components/create-todo.vue"
  import DisplayTodo from "./components/display-todo.vue"
  import ChangeTodo from "./components/change-todo.vue"
export default {
  name: 'App',
  data(){
    return{
      apiURL: 'http://localhost:3030/api/v1', 
      categories: [],
      isChangingTodo: false,
      todoToChange: [],
      loading: true,
    }
  },
  created(){
    this.getData(); 
    console.log("created at");
  },
  components: {
    // NewTodo,
    CreateTodo,
    DisplayTodo,
    ChangeTodo,
  },
  methods:{
     async getData() { 
       console.log('getting data'); 
       try {
         let response = await fetch(this.apiURL); 
         this.categories = await response.json(); 
         console.log(this.categories); 
       } catch (error) {
         console.log(error);
       }
       this.loading = false; 
            // try{
            //     let response = await fetch(this.mainURL);
            //     this.categories = await response.json();
            //     console.log(response); 
            // }catch(error){
            //     console.log(error); 
            // } 
    },
    CTodoHandler(type){
      switch(type){
        case('reload'): 
        this.resetForm();
        break; 
      }
    },
    changeTodoHandler(type, todo,id){
      switch(type){
        case('submitChanges'):
        console.log("todo: ",todo, " id: ", id);
          //create put request (todo); 
          this.isChangingTodo = false; 
          this.todoToChange = [];
          /*
          data to send : {
            category: string,
            list: [{},{}]
          }
          */
         this.XHR(todo,'PUT',`${this.apiURL}/${id}`)
          setTimeout(250); 
          this.getData(); 
        break;
        case('cancelChanges'): 
          this.resetForm(); 
        break; 
      }
    },
    catHandler(type,todo){
      console.log("catHandler"); 
//if change : todo is now an integer: the todo index rather
      switch(type){
        case('complete'):/*creates a put request to swap complete to !complete*/ 
          console.log(todo);
          break;
        case('delete'):/*creates a delete request for {_id : todo.id}*/ 
        console.log(todo);
          this.XHR(todo[1],'DELETE',`${this.apiURL}/${todo[0]}`)
          break;
        case('change'):/*changes the createTodo to a changeTodo with todo = todos[todo]*/ 
            this.isChangingTodo = true;
            this.todoToChange = todo; 
            this.loading = true; 
            this.loading = false; 
            console.log(this.todoToChange);
          break;
        }
    },
    deleteTodo(todo){
      //make http request to delete todo with {_id : todo.id}
      console.log(todo); 
    },
    changeTodo(todoIndex){
      //make http put request to change todo with {_id : todo.id} to : {newTodo}
      this.viewIndex = todoIndex; 
      this.isChangingTodo = true; 
    },
    viewTodo(todoIndex){
      //update local varialbe "viewingIndex"
      //wait for emit from "newtodo" to clear these..
      this.viewIndex = todoIndex; 
    },
    completeTodo(todo){
      //creates a put request simply seting this todo to complete/incomplete 
      console.log(todo);
    },
    clearViewIndex(){
      this.viewIndex = -1; 
      this.isChangingTodo= false; 
    },
    XHR(data, type, url){
      var xhr = new XMLHttpRequest();
      xhr.open(type,url, true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify(data)); 
      setTimeout(this.getData, 250);
      this.resetForm();
    },
    resetForm(){
      this.loading = true; 
      setTimeout(this.getData,250);
      this.todoToChange = [];
      this.isChangingTodo = false; 
      this.loading = false; 
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
