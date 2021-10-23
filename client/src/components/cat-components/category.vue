<template>
    <div class="category">
        <fieldset>
            <legend style="text-align: left">{{cat}}</legend>
            <ul>
                <li class="list-elements" v-for="(item,index) in getCompletedTodos(false)" :key="item.id">
                    {{item.title | maxWidth}} 
                    <button @click.prevent="$emit('deleteTodo', item)">Del</button>
                    <button @click.prevent="$emit('changeTodo', index)">Change</button>
                    <button @click.prevent="$emit('viewTodo', index)">View</button>
                </li>
            </ul>
        </fieldset>
    </div>
</template>

<script>

export default {
    name: "Category",
    data(){
        return{

        }
    },
    props:{
        todos: [],
        cat: String, 
    },
    computed:{
    },
    methods:{
        //isDone : true = done, false = not done; 
        getCompletedTodos(isDone){
            let temp = []; 
            for(let i = 0; i < this.todos.length; i++){
                if(this.todos[i].completed == isDone) {
                    temp.push(this.todos[i]);
                    temp.push(this.todos[i]);
                } 
            }
            return temp; 
        }
    },
    filters:{
        maxWidth(str){
            var w = window.innerWidth; 
            // Find how to calculate maxChar => :( too lazy right now 
            var maxChar = 29; 
            let temp = ""; 
                for(let i = 0; i < maxChar; i++){
                    temp += str.charAt(i); 
                }
            console.log(w); 
            console.log(temp, maxChar); 
            return temp;
        },
    }
}
</script>

<style scoped>
.category button{
    float: right; 
}
.category fieldset{
    border-radius: 8px; 
}
.list-elements{
    text-align: left;
}
</style>
