<template>
    <div class="category">
        <fieldset>
            <legend class="hEfect" @click="toggleShow()" style="text-align: left;">{{name}}</legend>
            <ul>
                <li class="list-elements" v-for="(item) in not_completed(todos)" :key="item.id">
                    <a class="hover_text" @click.prevent="$emit('catHandler','change',{_id: id,category:name, list: [item]})">{{item.title}}</a>
                    <!-- <div class="button-container"> -->
                    <button @click.prevent="$emit('catHandler','delete',[id, item])">Delete</button>
                    <!-- <button @click.prevent="$emit('catHandler','change',{_id: id,category:name, list: [item]})">Change</button> -->
                    <!-- </div> -->
                </li>
            </ul>
             <ul v-if="isShowingCompleted">
                 <!-- <div style="color: black; height: 1; width: 100%; border-color: black;"> </div -->
                <li class="list-elements" v-for="(item) in completed(todos)" :key="item.id">
                    <a style="text-decoration: line-through;" @click.prevent="$emit('catHandler','change',{_id: id,category:name, list: [item]})">{{item.title}}</a>
                    <!-- <div class="button-container"> -->
                    <button @click.prevent="$emit('catHandler','delete',[id, item])">Delete</button>
                    <!-- <button @click.prevent="$emit('catHandler','change',{_id: id,category:name, list: [item]})">Change</button> -->
                    <!-- </div> -->
                </li>
            </ul>
        </fieldset>
    </div>
</template>

<script>

export default{
    name: "Category",
    data(){
        return{
            isShowingCompleted: false,
        }
    },
    props:{
        todos: [],
        id: [],
        name: String,
    },
    methods:{
        not_completed(data){
            var tempCompleted = [];
            var tempNonCompleted = [];
            for(let i = 0; i < data.length; i++){
                if(data[i].completed){
                    tempCompleted.push(data[i]); 
                }else{
                    tempNonCompleted.push(data[i]); 
                }
            }
            console.log({tempNonCompleted,tempCompleted})
            return tempNonCompleted; 
        },
        completed(data){
            var tempCompleted = [];
            for(let i = 0; i < data.length; i++){
                if(data[i].completed){
                    tempCompleted.push(data[i]); 
                }
            }
            return tempCompleted; 
        },
        toggleShow(){
            this.isShowingCompleted = !this.isShowingCompleted;
        }
    },
    filters:{
    }
}
</script>

<style>
.hEfect:hover{
    cursor: pointer;
    text-decoration: underline;
}
a legend:hover{
        cursor: pointer;

}
.category button{
    float: right; 
}
.category fieldset{
    border-radius: 8px; 
}
.list-elements{
    text-align: left;
}
.hover_text:hover{
text-shadow: 1px 1px #4e4e4e85;
}
</style>
