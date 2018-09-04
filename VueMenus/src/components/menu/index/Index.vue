<template>
  <div class="error">
    <div v-html="error"></div>
  </div>
</template>

<script>
    export default {
          data(){
            return {
                error:(this.$store.state.error=="" && this.$store.state.status<0)?"~孕小二走神了~":this.$store.state.error
            }
          },
         beforeCreate(){
             let currentStatus = this.$store.state.status;
             let currentError = this.$store.state.error;
             let errorDiv = this.$store.state.alertDiv;
             if(!currentStatus && currentStatus<0){
                 errorDiv(currentError)
                 return false;
             }
             if(currentStatus == 0){
                 this.$router.push('pregnancy')
             }
             if(currentStatus == 1){
                 this.$router.push('pregnancyMother')
             }

         }
    }
</script>
