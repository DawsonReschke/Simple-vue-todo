<template>
    <div class="change-todo">
        <input v-model="title">
        <br>
        <textarea cols="50" rows="15" v-model="description">
        </textarea>
        <br>
        completed
        <input
             type="checkbox"
            v-model="completed"
        />
        <br> 
        <button @click.prevent="submitChanges"> Submit Changes </button>
        <button @click.prevent="cancelChanges"> Cancel Changes </button>
    </div>
</template>

<script>

export default {
    name:"ChangeTodo",
    data(){
        return{
            name: this.todo.category,
            title: this.todo.list[0].title,
            id: this.todo._id,
            completed: this.todo.list[0].completed,
            subID: this.todo.list[0].subID,
            timeTag: this.todo.list[0].timeTag,
            description: this.todo.list[0].description,
            // title: this.todo.list[0].title,
            // description: this.todolist[0].description,
            // subID: this.todolist[0].subID,
        }
    },
    props:{
        todo:[],
    },
    methods:{
        submitChanges(){
            console.log("completedVal: ", this.completed)
            // console.log("keys: ",Object.keys(this.todo))
            const data = {
                category: this.name,
                list: [
                    {
                        title: this.title,
                        timeTag: this.timeTag,
                        completed: this.completed == true ? true : false,
                        description: this.description,
                        subID: this.subID,
                    }
                ]
            }
            // console.log(data.list.completed); 
            // console.log('submitting changes: ', data, this.id); 
            this.$emit('changeTodoHandler','submitChanges',data,this.id);
        },
        cancelChanges(){
            this.$emit('changeTodoHandler','cancelChanges');
        }
    }
}
</script>
