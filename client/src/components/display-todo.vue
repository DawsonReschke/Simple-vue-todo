<template>
    <div class="display-todo">
        <div class="child" v-for="(item) in categories" :key="item._id">
            <Category @catHandler="catHandler" :name="item.category" :id="item._id" :todos="item.list"/>
        </div>
    </div>
</template>

<script>
import Category from './display-components/category.vue'

export default {
  components: { Category },
    name: "DisplayTodo",
    props: { 
        categories: [],
    },
    methods:{
        showCat(){
            console.log(this.categories)
        },
        catHandler(type, data){
            this.$emit("catHandler", type,data); 
        }
    }
}
</script>


<style scoped>
.child{
    width: 33.33%;
    float: left;
}
</style>