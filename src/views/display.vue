<template>
    <div>
        <Button type="primary" @click="tologin">To login</Button>
    </div>
</template>
<script>
    export default{
        name:"display",
        methods:{
            tologin(){
                this.$router.push("/login");
            }
        }
    }
</script>
